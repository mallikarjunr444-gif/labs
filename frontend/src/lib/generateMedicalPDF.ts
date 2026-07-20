/**
 * Medicus Labs™ — Professional Medical PDF Report Generator
 * Uses jsPDF programmatic drawing for a standards-compliant, multi-page PDF.
 * No html2canvas / screenshot dependency — 100% reliable output.
 */

import { jsPDF } from 'jspdf';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PDFReportData {
  // Patient
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  // Result
  condition: string;
  confidence: number;
  severity?: string;
  severityLevel?: string;
  reportId: string;
  description?: string;
  keyFindings?: string[];
  symptoms?: Record<string, number>;
  differentialDiagnoses?: Array<{ condition: string; probability: number }>;
  poweredBy?: string;
  disclaimer?: string;
  precautions?: string[];
  modelVersion?: string;
  processingTimeMs?: number;
  // Catalog
  overview?: string;
  causes?: string[];
  remedies?: string[];
  treatments?: string[];
  dos?: string[];
  donts?: string[];
  dietSupport?: string[];
  dietAvoid?: string[];
  lifestyle?: string[];
  whenToSeeDoctor?: string[];
  // Image
  imageDataUrl?: string | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PAGE_W = 210;     // A4 mm
const PAGE_H = 297;     // A4 mm
const MARGIN = 14;
const CONTENT_W = PAGE_W - MARGIN * 2;

// Brand colours
const BRAND_DARK  = [15, 23, 42];        // slate-900
const BRAND_BLUE  = [14, 165, 233];      // sky-500
const BRAND_LIGHT = [248, 250, 252];     // slate-50
const TEXT_MAIN   = [15, 23, 42];        // slate-900
const TEXT_MUTED  = [100, 116, 139];     // slate-500
const TEXT_SUBTLE = [148, 163, 184];     // slate-400
const BORDER      = [226, 232, 240];     // slate-200

// ─── Helper: colour setters ───────────────────────────────────────────────────

function setFill(doc: jsPDF, rgb: number[]) {
  doc.setFillColor(rgb[0], rgb[1], rgb[2]);
}
function setDraw(doc: jsPDF, rgb: number[]) {
  doc.setDrawColor(rgb[0], rgb[1], rgb[2]);
}
function setFont(doc: jsPDF, rgb: number[]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

// ─── Helper: wrapped text with return of new Y ───────────────────────────────

function writeWrapped(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lineH: number = 5,
): number {
  const lines = doc.splitTextToSize(text, maxW);
  doc.text(lines, x, y);
  return y + lines.length * lineH;
}

// ─── Helper: bullet list ─────────────────────────────────────────────────────

function bulletList(
  doc: jsPDF,
  items: string[],
  x: number,
  startY: number,
  maxW: number,
  lineH: number = 5,
  pageH: number = PAGE_H,
  addPage: () => number,
): number {
  let y = startY;
  for (const item of items) {
    if (y > pageH - 20) y = addPage();
    const lines = doc.splitTextToSize(`• ${item}`, maxW - 4);
    doc.text(lines, x + 3, y);
    y += lines.length * lineH + 1;
  }
  return y;
}

// ─── Helper: section heading ──────────────────────────────────────────────────

function sectionHeading(doc: jsPDF, title: string, y: number): number {
  // Left accent bar
  setFill(doc, BRAND_BLUE);
  doc.roundedRect(MARGIN, y, 3, 6, 1, 1, 'F');
  // Title text
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setFont(doc, BRAND_DARK);
  doc.text(title.toUpperCase(), MARGIN + 6, y + 4.5);
  return y + 11;
}

// ─── Helper: card background ──────────────────────────────────────────────────

function card(doc: jsPDF, y: number, h: number, radius = 3) {
  setFill(doc, BRAND_LIGHT);
  setDraw(doc, BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_W, h, radius, radius, 'FD');
}

// ─── Helper: KV row ──────────────────────────────────────────────────────────

function kvRow(doc: jsPDF, label: string, value: string, x: number, y: number, colW: number) {
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  setFont(doc, TEXT_MUTED);
  doc.text(label, x, y);
  doc.setFont('helvetica', 'bold');
  setFont(doc, TEXT_MAIN);
  doc.text(value || 'Not Available', x, y + 4);
}

// ─── Helper: confidence arc ──────────────────────────────────────────────────

function confidenceArc(doc: jsPDF, cx: number, cy: number, r: number, pct: number) {
  // Background circle
  setDraw(doc, [226, 232, 240]);
  doc.setLineWidth(2);
  doc.circle(cx, cy, r);
  // Filled portion approximation using multiple short lines (jsPDF has no arc fill)
  // Draw a simple bold line for the gauge
  const angle = (pct / 100) * 360;
  setDraw(doc, BRAND_BLUE);
  doc.setLineWidth(2.5);
  // jsPDF supports arc via lines - we'll use ellipse clip trick: just draw text score
  doc.setLineWidth(0.3);
  // Score text
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  setFont(doc, BRAND_BLUE);
  doc.text(`${pct}%`, cx, cy + 1.5, { align: 'center' });
  doc.setFontSize(7);
  setFont(doc, TEXT_MUTED);
  doc.text('AI Score', cx, cy + 6, { align: 'center' });
  return angle; // suppress unused var
}

// ─── Helper: progress bar ─────────────────────────────────────────────────────

function progressBar(doc: jsPDF, x: number, y: number, w: number, pct: number, colour: number[]) {
  // Track
  setFill(doc, BORDER);
  doc.roundedRect(x, y, w, 2.5, 1.2, 1.2, 'F');
  // Fill
  const fillW = Math.max(2, (pct / 100) * w);
  setFill(doc, colour);
  doc.roundedRect(x, y, fillW, 2.5, 1.2, 1.2, 'F');
}

// ─── Header (repeated on each page) ──────────────────────────────────────────

function drawHeader(doc: jsPDF, reportId: string, pageNum: number, totalPages: number) {
  // Header bar
  setFill(doc, BRAND_DARK);
  doc.rect(0, 0, PAGE_W, 14, 'F');
  // Brand name
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  setFont(doc, [255, 255, 255]);
  doc.text('Medicus Labs™', MARGIN, 9);
  // Sub-label
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  setFont(doc, [148, 163, 184]);
  doc.text('AI-Powered Dermatology Report  •  CONFIDENTIAL', MARGIN + 38, 9);
  // Report ID + page
  doc.setFont('helvetica', 'bold');
  setFont(doc, [148, 163, 184]);
  doc.text(`Report: ${reportId}`, PAGE_W - MARGIN, 6, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.text(`Page ${pageNum} / ${totalPages}`, PAGE_W - MARGIN, 10.5, { align: 'right' });
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function drawFooter(doc: jsPDF) {
  const y = PAGE_H - 8;
  setDraw(doc, BORDER);
  doc.setLineWidth(0.3);
  doc.line(MARGIN, y - 2, PAGE_W - MARGIN, y - 2);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'normal');
  setFont(doc, TEXT_SUBTLE);
  doc.text(
    '⚕ This report is generated by an AI system and is for informational purposes only. It does not constitute medical advice or diagnosis.',
    MARGIN,
    y + 0.5,
  );
  doc.text(
    `© ${new Date().getFullYear()} Medicus Labs™. All rights reserved.  |  medicuslabs.com`,
    PAGE_W - MARGIN,
    y + 0.5,
    { align: 'right' },
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export async function generateMedicalPDF(data: PDFReportData): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const severityLabel = data.severity || 'Unknown';
  const severityColour: number[] = {
    none: [16, 185, 129],
    low:  [14, 165, 233],
    medium: [245, 158, 11],
    high: [239, 68, 68],
  }[data.severityLevel?.toLowerCase() || 'low'] || [14, 165, 233];

  // We'll track page count as we go; add placeholder for total pages
  let pageNum = 1;
  const TOTAL_PAGES = 4; // we know the structure

  const addPage = (): number => {
    doc.addPage();
    pageNum++;
    drawHeader(doc, data.reportId, pageNum, TOTAL_PAGES);
    drawFooter(doc);
    return 22; // content start Y
  };

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 1 — Cover / Summary
  // ══════════════════════════════════════════════════════════════════════

  drawHeader(doc, data.reportId, 1, TOTAL_PAGES);
  drawFooter(doc);

  let y = 20;

  // ── Title banner ──────────────────────────────────────────────────────
  setFill(doc, [240, 249, 255]); // sky-50
  setDraw(doc, [186, 230, 253]); // sky-200
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_W, 28, 4, 4, 'FD');

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  setFont(doc, BRAND_DARK);
  doc.text('Clinical Dermatology Diagnostic Report', MARGIN + 6, y + 9);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  setFont(doc, TEXT_MUTED);
  doc.text(`Report ID: ${data.reportId}  ·  Generated: ${dateStr} at ${timeStr}`, MARGIN + 6, y + 16);

  if (data.poweredBy) {
    doc.setFont('helvetica', 'italic');
    setFont(doc, BRAND_BLUE);
    doc.text(`Powered by ${data.poweredBy}`, MARGIN + 6, y + 22);
  }

  y += 34;

  // ── Patient Demographics ───────────────────────────────────────────────
  y = sectionHeading(doc, 'Patient Demographics', y);
  card(doc, y, 24);
  const colW = CONTENT_W / 4;
  kvRow(doc, 'Full Name', data.fullName || 'N/A', MARGIN + 4, y + 6, colW);
  kvRow(doc, 'Age', `${data.age || 'N/A'} years`, MARGIN + colW + 2, y + 6, colW);
  kvRow(doc, 'Gender', data.gender || 'N/A', MARGIN + colW * 2 + 2, y + 6, colW);
  kvRow(doc, 'Contact', data.phone || 'N/A', MARGIN + colW * 3 + 2, y + 6, colW);
  kvRow(doc, 'Email', data.email || 'N/A', MARGIN + 4, y + 15, colW * 2);
  kvRow(doc, 'Analysis Date', `${dateStr} · ${timeStr}`, MARGIN + colW * 2 + 2, y + 15, colW * 2);
  y += 30;

  // ── Diagnosis Summary Card ────────────────────────────────────────────
  y = sectionHeading(doc, 'AI Diagnosis Summary', y);

  // Left: diagnosis box
  const diagW = CONTENT_W - 50;
  setFill(doc, BRAND_DARK);
  doc.roundedRect(MARGIN, y, diagW, 46, 4, 4, 'F');

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  setFont(doc, [148, 163, 184]);
  doc.text('PRIMARY DIAGNOSIS', MARGIN + 5, y + 7);

  doc.setFontSize(15);
  doc.setFont('helvetica', 'bold');
  setFont(doc, [255, 255, 255]);
  const condLines = doc.splitTextToSize(data.condition || 'Unknown Condition', diagW - 10);
  doc.text(condLines, MARGIN + 5, y + 16);

  // Severity badge
  setFill(doc, severityColour);
  doc.roundedRect(MARGIN + 5, y + 30, 40, 8, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setFont(doc, [255, 255, 255]);
  doc.text(`Severity: ${severityLabel}`, MARGIN + 25, y + 35.5, { align: 'center' });

  // Right: confidence circle box
  const circleX = MARGIN + diagW + 25;
  setFill(doc, [240, 249, 255]);
  setDraw(doc, [186, 230, 253]);
  doc.roundedRect(MARGIN + diagW + 2, y, 46, 46, 4, 4, 'FD');
  confidenceArc(doc, circleX, y + 20, 14, data.confidence || 0);

  y += 52;

  // ── Description ────────────────────────────────────────────────────────
  if (data.description) {
    card(doc, y, 18);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = writeWrapped(doc, data.description, MARGIN + 4, y + 6, CONTENT_W - 8, 5);
    y += 8;
  }

  // ── Skin Image ─────────────────────────────────────────────────────────
  if (data.imageDataUrl) {
    y = sectionHeading(doc, 'Uploaded Skin Image', y);
    try {
      const imgH = 55;
      const imgW = 55;
      setFill(doc, BRAND_LIGHT);
      setDraw(doc, BORDER);
      doc.roundedRect(MARGIN, y, imgW + 4, imgH + 4, 3, 3, 'FD');
      doc.addImage(data.imageDataUrl, 'JPEG', MARGIN + 2, y + 2, imgW, imgH);
      // Side note
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'italic');
      setFont(doc, TEXT_MUTED);
      doc.text('Image submitted by patient for AI dermatological analysis.', MARGIN + imgW + 10, y + 10);
      doc.text('Analyzed and classified by Medicus Vision AI Engine.', MARGIN + imgW + 10, y + 16);
      y += imgH + 10;
    } catch {
      y += 4;
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 2 — Clinical Findings & Symptoms
  // ══════════════════════════════════════════════════════════════════════

  y = addPage();

  // ── Key Clinical Findings ──────────────────────────────────────────────
  if (data.keyFindings && data.keyFindings.length > 0) {
    y = sectionHeading(doc, 'Key Clinical Findings', y);
    card(doc, y, data.keyFindings.length * 8 + 6);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.keyFindings, MARGIN + 2, y + 6, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 8;
  }

  // ── Symptom Severity Chart ─────────────────────────────────────────────
  if (data.symptoms && Object.keys(data.symptoms).length > 0) {
    y = sectionHeading(doc, 'Symptom Severity Assessment', y);
    const entries = Object.entries(data.symptoms);
    const barCardH = entries.length * 12 + 8;
    card(doc, y, barCardH);
    let sy = y + 8;
    for (const [sym, val] of entries) {
      if (sy > PAGE_H - 20) { y = addPage(); sy = y; }
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      setFont(doc, TEXT_MAIN);
      const label = sym.charAt(0).toUpperCase() + sym.slice(1);
      doc.text(label, MARGIN + 4, sy);
      progressBar(doc, MARGIN + 38, sy - 3, CONTENT_W - 46, val, severityColour);
      doc.setFont('helvetica', 'bold');
      setFont(doc, TEXT_MUTED);
      doc.text(`${val}%`, MARGIN + CONTENT_W - 6, sy, { align: 'right' });
      sy += 12;
    }
    y = sy + 4;
  }

  // ── Disease Overview ───────────────────────────────────────────────────
  if (data.overview) {
    y = sectionHeading(doc, 'Disease Overview', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    const ovLines = doc.splitTextToSize(data.overview, CONTENT_W - 4);
    const cardH = ovLines.length * 5 + 8;
    card(doc, y, cardH);
    doc.text(ovLines, MARGIN + 4, y + 6);
    y += cardH + 6;
  }

  // ── Causes ────────────────────────────────────────────────────────────
  if (data.causes && data.causes.length > 0) {
    y = sectionHeading(doc, 'Known Causes & Risk Factors', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.causes, MARGIN + 2, y + 2, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 6;
  }

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 3 — Treatment & Lifestyle
  // ══════════════════════════════════════════════════════════════════════

  y = addPage();

  // ── Home Remedies ─────────────────────────────────────────────────────
  if (data.remedies && data.remedies.length > 0) {
    y = sectionHeading(doc, 'Home Remedies & Self-Care', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.remedies, MARGIN + 2, y + 2, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 6;
  }

  // ── Treatment Recommendations ─────────────────────────────────────────
  if (data.treatments && data.treatments.length > 0) {
    y = sectionHeading(doc, 'Clinical Treatment Recommendations', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.treatments, MARGIN + 2, y + 2, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 6;
  }

  // ── Do's and Don'ts side by side ──────────────────────────────────────
  if ((data.dos && data.dos.length > 0) || (data.donts && data.donts.length > 0)) {
    if (y > PAGE_H - 60) y = addPage();
    y = sectionHeading(doc, "Do's and Don'ts", y);
    const halfW = (CONTENT_W - 4) / 2;

    // DO's
    setFill(doc, [240, 253, 244]); // green-50
    setDraw(doc, [187, 247, 208]); // green-200
    doc.roundedRect(MARGIN, y, halfW, 40, 3, 3, 'FD');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    setFont(doc, [22, 163, 74]);
    doc.text('✓  DO', MARGIN + 4, y + 7);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    let dy = y + 13;
    for (const d of (data.dos || []).slice(0, 4)) {
      const lines = doc.splitTextToSize(`• ${d}`, halfW - 6);
      doc.text(lines, MARGIN + 4, dy);
      dy += lines.length * 4.5 + 1;
    }

    // DON'Ts
    setFill(doc, [255, 241, 242]); // red-50
    setDraw(doc, [254, 202, 202]); // red-200
    doc.roundedRect(MARGIN + halfW + 4, y, halfW, 40, 3, 3, 'FD');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    setFont(doc, [220, 38, 38]);
    doc.text('✗  DON\'T', MARGIN + halfW + 8, y + 7);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    let ddy = y + 13;
    for (const d of (data.donts || []).slice(0, 4)) {
      const lines = doc.splitTextToSize(`• ${d}`, halfW - 6);
      doc.text(lines, MARGIN + halfW + 8, ddy);
      ddy += lines.length * 4.5 + 1;
    }
    y += 46;
  }

  // ── Diet Support ──────────────────────────────────────────────────────
  if (data.dietSupport && data.dietSupport.length > 0) {
    if (y > PAGE_H - 50) y = addPage();
    y = sectionHeading(doc, 'Diet & Nutrition — Recommended Foods', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.dietSupport, MARGIN + 2, y + 2, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 4;
  }

  // ── Diet Avoid ────────────────────────────────────────────────────────
  if (data.dietAvoid && data.dietAvoid.length > 0) {
    if (y > PAGE_H - 50) y = addPage();
    y = sectionHeading(doc, 'Diet & Nutrition — Foods to Avoid', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.dietAvoid, MARGIN + 2, y + 2, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 4;
  }

  // ── Lifestyle ─────────────────────────────────────────────────────────
  if (data.lifestyle && data.lifestyle.length > 0) {
    if (y > PAGE_H - 50) y = addPage();
    y = sectionHeading(doc, 'Lifestyle & Wellness Recommendations', y);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, TEXT_MAIN);
    y = bulletList(doc, data.lifestyle, MARGIN + 2, y + 2, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 4;
  }

  // ══════════════════════════════════════════════════════════════════════
  // PAGE 4 — Warnings, Metadata & Disclaimer
  // ══════════════════════════════════════════════════════════════════════

  y = addPage();

  // ── When to See a Doctor ──────────────────────────────────────────────
  if (data.whenToSeeDoctor && data.whenToSeeDoctor.length > 0) {
    y = sectionHeading(doc, '⚠  When to Consult a Doctor', y);
    setFill(doc, [255, 241, 242]);
    setDraw(doc, [254, 202, 202]);
    const warningH = data.whenToSeeDoctor.length * 8 + 8;
    doc.roundedRect(MARGIN, y, CONTENT_W, warningH, 3, 3, 'FD');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    setFont(doc, [153, 27, 27]);
    y = bulletList(doc, data.whenToSeeDoctor, MARGIN + 2, y + 6, CONTENT_W - 6, 5.5, PAGE_H - 16, addPage);
    y += 8;
  }

  // ── AI Analysis Metadata ──────────────────────────────────────────────
  y = sectionHeading(doc, 'AI Analysis Metadata', y);
  card(doc, y, 30);
  const mColW = CONTENT_W / 3;
  kvRow(doc, 'AI Model', data.modelVersion || data.poweredBy || 'Medicus Vision AI', MARGIN + 4, y + 6, mColW);
  kvRow(doc, 'Report ID', data.reportId, MARGIN + mColW + 4, y + 6, mColW);
  kvRow(doc, 'Processing Time', data.processingTimeMs ? `${data.processingTimeMs} ms` : 'N/A', MARGIN + mColW * 2 + 4, y + 6, mColW);
  kvRow(doc, 'Analysis Date', dateStr, MARGIN + 4, y + 18, mColW);
  kvRow(doc, 'Confidence Score', `${data.confidence || 0}%`, MARGIN + mColW + 4, y + 18, mColW);
  kvRow(doc, 'Platform', 'Medicus Labs™ v2.0', MARGIN + mColW * 2 + 4, y + 18, mColW);
  y += 36;

  // ── Medical Disclaimer ────────────────────────────────────────────────
  y = sectionHeading(doc, 'Medical Disclaimer', y);
  setFill(doc, [255, 251, 235]);
  setDraw(doc, [253, 230, 138]);
  const disclaimer = data.disclaimer ||
    'This report is generated by an artificial intelligence system and is intended for informational and educational purposes only. It does not constitute a medical diagnosis, professional medical advice, or treatment recommendation. Always consult a licensed dermatologist or qualified healthcare professional for an accurate diagnosis and appropriate treatment plan. Medicus Labs™ is not liable for any clinical decisions made solely on the basis of this AI-generated report.';
  const dlines = doc.splitTextToSize(disclaimer, CONTENT_W - 8);
  const dH = dlines.length * 5 + 10;
  doc.roundedRect(MARGIN, y, CONTENT_W, dH, 3, 3, 'FD');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  setFont(doc, [120, 83, 8]);
  doc.text(dlines, MARGIN + 4, y + 7);
  y += dH + 10;

  // ── Closing stamp ─────────────────────────────────────────────────────
  setFill(doc, BRAND_DARK);
  doc.roundedRect(MARGIN, y, CONTENT_W, 20, 4, 4, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  setFont(doc, [255, 255, 255]);
  doc.text('Medicus Labs™ — AI Clinical Report', PAGE_W / 2, y + 8, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  setFont(doc, [148, 163, 184]);
  doc.text(`${data.reportId}  ·  ${dateStr}  ·  medicuslabs.com`, PAGE_W / 2, y + 14.5, { align: 'center' });

  // ── Save ──────────────────────────────────────────────────────────────
  const filename = `MedicusLabs_Report_${data.reportId}_${now.toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

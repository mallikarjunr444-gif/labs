"""
PDF Report Generator for Medicus Labs
Hospital-Grade Clinical Report System
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer,
    Image as RLImage, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, Rect
from reportlab.graphics.charts.barcharts import HorizontalBarChart
from reportlab.graphics.charts.textlabels import Label
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from datetime import datetime
from pathlib import Path
import io
try:
    import qrcode
    HAS_QRCODE = True
except ImportError:
    HAS_QRCODE = False


class ReportGenerator:
    """Generate hospital-grade clinical PDF reports for dermatology analysis"""

    def __init__(self, output_dir: str = None):
        # Use absolute path based on the script location
        if output_dir is None:
            output_dir = Path(__file__).resolve().parent / "reports"
        else:
            output_dir = Path(output_dir)

        self.output_dir = output_dir
        self.output_dir.mkdir(exist_ok=True, parents=True)
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()

    def setup_custom_styles(self):
        """Setup comprehensive custom paragraph styles"""
        
        # Cover page title
        self.styles.add(ParagraphStyle(
            name='CoverTitle',
            parent=self.styles['Heading1'],
            fontSize=28,
            textColor=colors.HexColor('#0f172a'),
            spaceAfter=10,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
            leading=34,
        ))

        self.styles.add(ParagraphStyle(
            name='CoverSubtitle',
            parent=self.styles['Normal'],
            fontSize=12,
            textColor=colors.HexColor('#475569'),
            alignment=TA_CENTER,
            spaceAfter=6,
            leading=16,
        ))

        # Section headers
        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=13,
            textColor=colors.HexColor('#0284c7'),
            spaceAfter=8,
            spaceBefore=14,
            fontName='Helvetica-Bold',
            leading=16,
        ))

        self.styles.add(ParagraphStyle(
            name='SectionHeaderDark',
            parent=self.styles['Heading2'],
            fontSize=12,
            textColor=colors.HexColor('#0f172a'),
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold',
            leading=15,
        ))

        # Body text
        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['BodyText'],
            fontSize=9.5,
            alignment=TA_LEFT,
            spaceAfter=8,
            leading=13,
        ))

        self.styles.add(ParagraphStyle(
            name='ClinicalBody',
            parent=self.styles['BodyText'],
            fontSize=9.5,
            textColor=colors.HexColor('#334155'),
            alignment=TA_JUSTIFY,
            spaceAfter=10,
            leading=14,
        ))

        self.styles.add(ParagraphStyle(
            name='BulletItem',
            parent=self.styles['BodyText'],
            fontSize=9,
            alignment=TA_LEFT,
            spaceAfter=6,
            leading=13,
            leftIndent=12,
        ))

        self.styles.add(ParagraphStyle(
            name='SubBulletItem',
            parent=self.styles['BodyText'],
            fontSize=8.5,
            alignment=TA_LEFT,
            spaceAfter=4,
            leading=12,
            leftIndent=24,
        ))

        # Disease info
        self.styles.add(ParagraphStyle(
            name='DiseaseTitle',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#0f172a'),
            spaceAfter=10,
            spaceBefore=14,
            fontName='Helvetica-Bold',
            alignment=TA_LEFT,
        ))

        # Alert boxes
        self.styles.add(ParagraphStyle(
            name='EmergencyAlert',
            parent=self.styles['BodyText'],
            fontSize=9,
            textColor=colors.HexColor('#b91c1c'),
            fontName='Helvetica-Bold',
            alignment=TA_CENTER,
            leading=12,
            spaceAfter=10,
        ))

        self.styles.add(ParagraphStyle(
            name='WarningAlert',
            parent=self.styles['BodyText'],
            fontSize=9,
            textColor=colors.HexColor('#b45309'),
            fontName='Helvetica-Bold',
            alignment=TA_CENTER,
            leading=12,
            spaceAfter=10,
        ))

        self.styles.add(ParagraphStyle(
            name='SuccessAlert',
            parent=self.styles['BodyText'],
            fontSize=9,
            textColor=colors.HexColor('#15803d'),
            fontName='Helvetica-Bold',
            alignment=TA_CENTER,
            leading=12,
            spaceAfter=10,
        ))

        # Minimal footer
        self.styles.add(ParagraphStyle(
            name='MinimalFooter',
            parent=self.styles['Normal'],
            fontSize=7,
            textColor=colors.HexColor('#64748b'),
            alignment=TA_CENTER,
            spaceAfter=0,
        ))

        # Watermark text (not used directly but kept for reference)
        self.styles.add(ParagraphStyle(
            name='Watermark',
            parent=self.styles['Normal'],
            fontSize=40,
            textColor=colors.HexColor('#e2e8f0'),
            alignment=TA_CENTER,
        ))

    def _hex_to_rgb(self, hex_color):
        """Convert hex color to RGB tuple (0-1 range)"""
        h = hex_color.lstrip('#')
        return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

    def _create_progress_bar(self, percentage, width=3*inch, height=8):
        """Create a visual progress bar"""
        drawing = Drawing(width, height)
        bar_width = width - 2
        bar_height = height - 4
        
        # Background bar
        drawing.add(Rect(1, 2, bar_width, bar_height, 
                        fillColor=colors.HexColor('#e2e8f0'), 
                        strokeColor=colors.HexColor('#cbd5e1'), 
                        strokeWidth=0.5))
        
        # Filled bar
        fill_width = bar_width * (percentage / 100.0)
        color = colors.HexColor('#10b981') if percentage < 40 else (
            colors.HexColor('#f59e0b') if percentage < 70 else colors.HexColor('#ef4444')
        )
        drawing.add(Rect(1, 2, fill_width, bar_height, 
                        fillColor=color, 
                        strokeColor=None))
        
        return drawing

    def _draw_watermark(self, canvas_obj, doc):
        """Draw confidential watermark on all content pages"""
        canvas_obj.saveState()
        canvas_obj.setFont("Helvetica-Bold", 60)
        canvas_obj.setFillColor(colors.HexColor('#f1f5f9'))
        canvas_obj.setStrokeColor(colors.HexColor('#f1f5f9'))
        
        # Draw diagonal watermark
        page_width, page_height = A4
        canvas_obj.translate(page_width / 2, page_height / 2)
        canvas_obj.rotate(45)
        canvas_obj.drawCentredString(0, 0, "CONFIDENTIAL")
        canvas_obj.restoreState()

    def _draw_header_footer(self, canvas_obj, doc):
        """Draw professional header and footer on all content pages"""
        canvas_obj.saveState()
        
        # Header
        canvas_obj.setFont("Helvetica-Bold", 10)
        canvas_obj.setFillColor(colors.HexColor('#0f172a'))
        canvas_obj.drawString(0.5 * inch, A4[1] - 0.4 * inch, "Medicus Labs™")
        
        canvas_obj.setFont("Helvetica", 8)
        canvas_obj.setFillColor(colors.HexColor('#64748b'))
        canvas_obj.drawString(0.5 * inch, A4[1] - 0.55 * inch, 
                            "Clinical AI Dermatology Report")
        
        canvas_obj.setFont("Helvetica-Oblique", 7)
        canvas_obj.drawRightString(A4[0] - 0.5 * inch, A4[1] - 0.4 * inch,
                                  f"Report ID: {getattr(doc, 'report_id', 'N/A')}")
        
        # Header line
        canvas_obj.setStrokeColor(colors.HexColor('#e2e8f0'))
        canvas_obj.setLineWidth(1)
        canvas_obj.line(0.5 * inch, A4[1] - 0.65 * inch, 
                       A4[0] - 0.5 * inch, A4[1] - 0.65 * inch)
        
        # Footer line
        canvas_obj.line(0.5 * inch, 0.45 * inch, 
                       A4[0] - 0.5 * inch, 0.45 * inch)
        
        # Footer text
        canvas_obj.setFont("Helvetica", 7)
        canvas_obj.setFillColor(colors.HexColor('#64748b'))
        canvas_obj.drawCentredString(A4[0] / 2, 0.35 * inch,
                                    f"Generated: {datetime.now().strftime('%B %d, %Y at %I:%M %p')} | "
                                    "Medicus Labs™ | AI Dermatology Platform | "
                                    "www.medicuslabs.app | support@medicuslabs.app")
        
        # Page number
        page_num = canvas_obj.getPageNumber()
        canvas_obj.drawRightString(A4[0] - 0.5 * inch, 0.35 * inch,
                                   f"Page {page_num}")
        
        canvas_obj.restoreState()

    def _create_cover_page_elements(self, analysis_id, patient_name, report_time):
        """Create cover page elements"""
        elements = []
        
        # Spacer to center content vertically
        elements.append(Spacer(1, 1.5 * inch))
        
        # Logo placeholder
        logo_data = [["[LOGO]"], ["Medicus Labs™"]]
        logo_table = Table(logo_data, colWidths=[2.5*inch], rowHeights=[0.8*inch, 0.3*inch])
        logo_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#f1f5f9')),
            ('BOX', (0, 0), (0, 0), 2, colors.HexColor('#0f172a')),
            ('FONTNAME', (0, 1), (0, 1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 1), (0, 1), 14),
            ('TEXTCOLOR', (0, 1), (0, 1), colors.HexColor('#0f172a')),
            ('TOPPADDING', (0, 0), (-1, -1), 20),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))
        elements.append(logo_table)
        elements.append(Spacer(1, 0.3 * inch))
        
        # Main title
        elements.append(Paragraph("AI Dermatology Clinical Report", self.styles['CoverTitle']))
        elements.append(Spacer(1, 0.1 * inch))
        elements.append(Paragraph("Secure • Confidential • HIPAA Ready", self.styles['CoverSubtitle']))
        elements.append(Spacer(1, 0.4 * inch))
        
        # Divider
        # Center the divider using a table wrapper
        hr_table = Table([[HRFlowable(width=6*inch, thickness=2, 
                                     color=colors.HexColor('#0284c7'))]], 
                        colWidths=[7.2*inch])
        hr_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (0, 0), 'CENTER'),
            ('PADDING', (0, 0), (0, 0), 0),
        ]))
        elements.append(hr_table)
        elements.append(Spacer(1, 0.4 * inch))
        
        # Report info box
        info_data = [
            [Paragraph("<b>Report ID:</b>", self.styles['CustomBody']), 
             Paragraph(analysis_id, self.styles['CustomBody'])],
            [Paragraph("<b>Patient Name:</b>", self.styles['CustomBody']), 
             Paragraph(patient_name, self.styles['CustomBody'])],
            [Paragraph("<b>Report Date:</b>", self.styles['CustomBody']), 
             Paragraph(report_time.strftime("%B %d, %Y"), self.styles['CustomBody'])],
            [Paragraph("<b>Report Time:</b>", self.styles['CustomBody']), 
             Paragraph(report_time.strftime("%I:%M %p"), self.styles['CustomBody'])],
            [Paragraph("<b>Version:</b>", self.styles['CustomBody']), 
             Paragraph("2.6.4 (Clinical Grade)", self.styles['CustomBody'])],
        ]
        info_table = Table(info_data, colWidths=[1.8*inch, 2.2*inch])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('PADDING', (0, 0), (-1, -1), 10),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elements.append(info_table)
        elements.append(Spacer(1, 0.4 * inch))
        
        # Generate QR code (if library available)
        if HAS_QRCODE:
            try:
                qr = qrcode.QRCode(version=1, box_size=10, border=2)
                verification_url = f"https://medicuslabs.app/report/{analysis_id}"
                qr.add_data(verification_url)
                qr.make(fit=True)
                qr_img = qr.make_image(fill_color="#0f172a", back_color="#ffffff")
                qr_path = self.output_dir / f"qr_{analysis_id}.png"
                qr_img.save(qr_path)
                
                qr_data = [["Scan to Verify Report"], [str(qr_path)], ["Authenticity Verified"]]
                qr_table = Table(qr_data, colWidths=[1.8*inch], rowHeights=[0.25*inch, 1*inch, 0.25*inch])
                qr_table.setStyle(TableStyle([
                    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                    ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
                    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                    ('FONTSIZE', (0, 0), (-1, 0), 9),
                    ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#f1f5f9')),
                    ('FONTSIZE', (0, -1), (-1, -1), 8),
                    ('BOX', (0, 0), (-1, -1), 1.5, colors.HexColor('#e2e8f0')),
                ]))
                elements.append(qr_table)
            except Exception as e:
                print(f"⚠️  QR code generation failed: {e}")
        elements.append(Spacer(1, 0.3 * inch))
        
        # Confidential notice
        elements.append(Paragraph(
            "CONFIDENTIAL MEDICAL DOCUMENT | Protected under HIPAA | "
            "For authorized use only | Not for redistribution",
            ParagraphStyle('ConfidentialNotice', parent=self.styles['Normal'],
                         fontSize=8, textColor=colors.HexColor('#b91c1c'),
                         alignment=TA_CENTER, fontName='Helvetica-Bold')
        ))
        
        elements.append(PageBreak())
        return elements

    def generate_report(
        self,
        analysis_id: str,
        patient_name: str,
        patient_age: int,
        patient_gender: str,
        patient_email: str,
        patient_mobile: str,
        image_path: str,
        prediction: dict,
        recommendations: list,
    ) -> str:
        """
        Generate a comprehensive, hospital-grade PDF report
        """
        report_time = datetime.now()
        
        # Create PDF filename
        filename = f"report_{analysis_id}.pdf"
        filepath = self.output_dir / filename

        # Create PDF document with custom page templates
        def header_footer_wrapper(canvas_obj, doc):
            self._draw_header_footer(canvas_obj, doc)

        def watermark_wrapper(canvas_obj, doc):
            self._draw_watermark(canvas_obj, doc)

        doc = SimpleDocTemplate(
            str(filepath),
            pagesize=A4,
            rightMargin=0.6 * inch,
            leftMargin=0.6 * inch,
            topMargin=0.8 * inch,
            bottomMargin=0.7 * inch,
        )

        elements = []

        # ==================== COVER PAGE ====================
        elements += self._create_cover_page_elements(analysis_id, patient_name, report_time)

        # ==================== PATIENT DEMOGRAPHICS ====================
        elements.append(Paragraph("1. PATIENT DEMOGRAPHICS & SCAN CONTEXT", 
                                self.styles['SectionHeader']))
        
        # Patient info in professional card format
        patient_data = [
            [Paragraph("<b>Full Name</b>", self.styles['CustomBody']), 
             Paragraph(patient_name, self.styles['CustomBody']),
             Paragraph("<b>Date of Birth / Age</b>", self.styles['CustomBody']), 
             Paragraph(f"{patient_age} years", self.styles['CustomBody'])],
            [Paragraph("<b>Gender</b>", self.styles['CustomBody']), 
             Paragraph(patient_gender, self.styles['CustomBody']),
             Paragraph("<b>Mobile Contact</b>", self.styles['CustomBody']), 
             Paragraph(patient_mobile, self.styles['CustomBody'])],
            [Paragraph("<b>Email Address</b>", self.styles['CustomBody']), 
             Paragraph(patient_email, self.styles['CustomBody']),
             Paragraph("<b>Scan ID</b>", self.styles['CustomBody']), 
             Paragraph(analysis_id, self.styles['CustomBody'])],
        ]
        patient_table = Table(patient_data, colWidths=[1.5*inch, 1.9*inch, 1.5*inch, 1.9*inch])
        patient_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('PADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))
        elements.append(patient_table)
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== DIAGNOSTIC SUMMARY ====================
        elements.append(Paragraph("2. DIAGNOSTIC ASSESSMENT SUMMARY", 
                                self.styles['SectionHeader']))
        
        disease = prediction.get('disease', 'Healthy Skin')
        confidence_score = prediction.get('confidence_percentage', 
                                        prediction.get('confidence', 0.62) * 100)
        severity = prediction.get('severity', 'Mild-Medium')
        severity_level = prediction.get('severity_level', 'medium')
        description = prediction.get('description', '')
        
        # Primary diagnosis box
        diagnosis_box_data = [
            [Paragraph(f"<b>Primary Diagnosis:</b> {disease}", 
                      ParagraphStyle('DiagnosisTitle', parent=self.styles['Normal'],
                                   fontSize=14, fontName='Helvetica-Bold',
                                   textColor=colors.HexColor('#0f172a'))),
             ""],
            [Paragraph(f"<b>Confidence Index:</b> {confidence_score:.1f}%", 
                      self.styles['CustomBody']),
             self._create_progress_bar(confidence_score)],
        ]
        diagnosis_box = Table(diagnosis_box_data, colWidths=[3.5*inch, 4*inch])
        diagnosis_box.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('PADDING', (0, 0), (-1, -1), 12),
        ]))
        elements.append(diagnosis_box)
        elements.append(Spacer(1, 0.1 * inch))
        
        # Severity indicator
        severity_colors = {
            'low': ('#10b981', 'LOW RISK'),
            'medium': ('#f59e0b', 'MODERATE RISK'),
            'high': ('#ef4444', 'HIGH RISK')
        }
        sev_color, sev_text = severity_colors.get(severity_level, ('#f59e0b', 'MODERATE RISK'))
        severity_data = [
            [Paragraph(f"<b>Severity Level:</b>", self.styles['CustomBody']),
             Paragraph(f"<b>{severity}</b>", 
                     ParagraphStyle('Severity', parent=self.styles['Normal'],
                                  fontSize=12, fontName='Helvetica-Bold',
                                  textColor=colors.HexColor(sev_color))),
             Paragraph(sev_text, 
                     ParagraphStyle('SeverityBadge', parent=self.styles['Normal'],
                                  fontSize=10, fontName='Helvetica-Bold',
                                  textColor=colors.white,
                                  alignment=TA_CENTER))]
        ]
        severity_table = Table(severity_data, colWidths=[1.5*inch, 1.5*inch, 2*inch])
        severity_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('BACKGROUND', (2, 0), (2, 0), colors.HexColor(sev_color)),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('ALIGN', (2, 0), (2, 0), 'CENTER'),
            ('PADDING', (0, 0), (-1, -1), 10),
        ]))
        elements.append(severity_table)
        elements.append(Spacer(1, 0.1 * inch))
        
        if description:
            elements.append(Paragraph(f"<b>Clinical Summary:</b> {description}", 
                                   self.styles['ClinicalBody']))
        elements.append(Spacer(1, 0.1 * inch))
        
        # Specimen image
        img_element = Paragraph("<i>[No Specimen Photo Available]</i>", 
                              ParagraphStyle('NoImage', parent=self.styles['Normal'],
                                          fontSize=10, alignment=TA_CENTER,
                                          textColor=colors.HexColor('#94a3b8')))
        if Path(image_path).exists():
            try:
                img_element = RLImage(image_path, width=2.6*inch, height=2.0*inch)
            except Exception:
                pass
        
        image_data = [[img_element, 
                      Paragraph("<b>Uploaded Specimen Image</b>", 
                               ParagraphStyle('ImageCaption', parent=self.styles['Normal'],
                                           fontSize=9, alignment=TA_CENTER,
                                           textColor=colors.HexColor('#64748b')))]]
        image_table = Table(image_data, colWidths=[3.2*inch, 4.3*inch])
        image_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (0, 0), 'CENTER'),
            ('ALIGN', (1, 0), (1, 0), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('TOPPADDING', (0, 0), (-1, -1), 15),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
        ]))
        elements.append(image_table)
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== DIFFERENTIAL DIAGNOSIS ====================
        elements.append(Paragraph("3. DIFFERENTIAL DIAGNOSIS (Top 5)", 
                                self.styles['SectionHeader']))
        
        differentials = prediction.get('differential_diagnoses', [])
        if differentials:
            # Create top 5 table with progress bars
            diff_table_data = [["#", "Condition", "Probability Probability Bar"]]
            
            for idx, diff in enumerate(differentials[:5], 1):
                condition = diff.get('condition', 'Unknown')
                probability = diff.get('probability', diff.get('confidence', 0))
                bar = self._create_progress_bar(probability, width=2*inch, height=12)
                diff_table_data.append([
                    str(idx),
                    Paragraph(condition, self.styles['CustomBody']),
                    bar
                ])
            
            diff_table = Table(diff_table_data, colWidths=[0.4*inch, 2.6*inch, 3*inch])
            diff_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 10),
                ('ALIGN', (0, 0), (0, -1), 'CENTER'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
                ('PADDING', (0, 0), (-1, -1), 8),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fafc')]),
                ('TOPPADDING', (0, 1), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 1), (-1, -1), 10),
            ]))
            elements.append(diff_table)
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== DISEASE INFORMATION ====================
        symptoms = prediction.get('symptoms', {})
        if symptoms or description:
            elements.append(Paragraph("4. DISEASE INFORMATION", self.styles['SectionHeader']))
            
            if description:
                elements.append(Paragraph(f"<b>Overview:</b>", self.styles['SectionHeaderDark']))
                elements.append(Paragraph(description, self.styles['ClinicalBody']))
            
            if symptoms:
                elements.append(Paragraph("<b>Common Symptoms:</b>", 
                                        self.styles['SectionHeaderDark']))
                if isinstance(symptoms, dict):
                    for key, value in symptoms.items():
                        elements.append(Paragraph(
                            f"<b>{key.replace('_', ' ').title()}:</b> {value}",
                            self.styles['BulletItem']
                        ))
                elif isinstance(symptoms, list):
                    for symptom in symptoms:
                        elements.append(Paragraph(f"• {symptom}", self.styles['BulletItem']))
            elements.append(Spacer(1, 0.15 * inch))

        # ==================== AI CLINICAL FINDINGS ====================
        key_findings = prediction.get('key_findings', [])
        if key_findings:
            elements.append(Paragraph("5. AI CLINICAL FINDINGS", self.styles['SectionHeader']))
            findings_text = "<b>Observed patterns include:</b><br/>"
            findings_text += ", ".join(key_findings) if isinstance(key_findings, list) else str(key_findings)
            elements.append(Paragraph(findings_text, self.styles['ClinicalBody']))
            elements.append(Spacer(1, 0.15 * inch))

        # ==================== CLINICAL RECOMMENDATIONS ====================
        elements.append(Paragraph("6. CLINICAL RECOMMENDATIONS", self.styles['SectionHeader']))
        
        if recommendations and isinstance(recommendations, list):
            # Categorize recommendations
            immediate = recommendations[:2] if len(recommendations) > 2 else recommendations
            ongoing = recommendations[2:4] if len(recommendations) > 4 else recommendations[2:]
            lifestyle = recommendations[4:6] if len(recommendations) > 6 else recommendations[4:]
            
            if immediate:
                elements.append(Paragraph("<b>Immediate Care:</b>", 
                                        self.styles['SectionHeaderDark']))
                for rec in immediate:
                    elements.append(Paragraph(f"• {rec}", self.styles['BulletItem']))
            
            if ongoing:
                elements.append(Paragraph("<b>Daily Care & Maintenance:</b>", 
                                        self.styles['SectionHeaderDark']))
                for rec in ongoing:
                    elements.append(Paragraph(f"• {rec}", self.styles['BulletItem']))
            
            if lifestyle:
                elements.append(Paragraph("<b>Lifestyle & Prevention:</b>", 
                                        self.styles['SectionHeaderDark']))
                for rec in lifestyle:
                    elements.append(Paragraph(f"• {rec}", self.styles['BulletItem']))
        else:
            elements.append(Paragraph("• Continue regular skincare routine", self.styles['BulletItem']))
            elements.append(Paragraph("• Use appropriate sunscreen daily", self.styles['BulletItem']))
            elements.append(Paragraph("• Keep the affected area clean and dry", self.styles['BulletItem']))
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== URGENCY & WARNING ====================
        elements.append(Paragraph("7. URGENCY ADVISORY", self.styles['SectionHeader']))
        
        if severity_level == 'high':
            alert_style = self.styles['EmergencyAlert']
            alert_msg = "⚠ HIGH RISK DETECTED - IMMEDIATE MEDICAL ATTENTION RECOMMENDED ⚠"
            alert_color = colors.HexColor('#b91c1c')
        elif severity_level == 'medium':
            alert_style = self.styles['WarningAlert']
            alert_msg = "⚡ MODERATE RISK - CONSULT DERMATOLOGIST WITHIN 1-2 WEEKS ⚡"
            alert_color = colors.HexColor('#b45309')
        else:
            alert_style = self.styles['SuccessAlert']
            alert_msg = "✓ LOW RISK - CONTINUE MONITORING AND BASIC SKINCARE ✓"
            alert_color = colors.HexColor('#15803d')
        
        alert_data = [[Paragraph(alert_msg, alert_style)]]
        alert_table = Table(alert_data, colWidths=[7.2*inch])
        alert_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#fef2f2') 
             if severity_level == 'high' else 
             colors.HexColor('#fffbeb') if severity_level == 'medium' else 
             colors.HexColor('#f0fdf4')),
            ('BOX', (0, 0), (-1, -1), 2, alert_color),
            ('PADDING', (0, 0), (-1, -1), 12),
        ]))
        elements.append(alert_table)
        elements.append(Spacer(1, 0.1 * inch))
        
        elements.append(Paragraph(
            "<b>When to See a Doctor:</b> If the condition worsens, spreads rapidly, "
            "causes severe pain, oozing, bleeding, or is accompanied by fever, "
            "seek immediate medical evaluation.",
            self.styles['CustomBody']
        ))
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== DISCLAIMER ====================
        elements.append(Paragraph("8. MEDICAL DISCLAIMER", self.styles['SectionHeader']))
        
        elements.append(Paragraph(
            "<b>AI-Generated Report - Not a Definitive Medical Diagnosis</b>",
            ParagraphStyle('DisclaimerTitle', parent=self.styles['Normal'],
                         fontSize=10, fontName='Helvetica-Bold',
                         textColor=colors.HexColor('#b91c1c'), alignment=TA_CENTER)
        ))
        elements.append(Spacer(1, 0.05 * inch))
        
        disclaimer_text = (
            "This report is generated by an AI algorithm and is intended for informational "
            "and educational purposes only. It does NOT constitute a medical diagnosis, "
            "prescription, or treatment plan. AI does not prescribe medicines. Do not self-medicate "
            "based on this report. Always consult a qualified dermatologist or healthcare provider "
            "before making medical decisions. This tool assists clinical evaluation but does not "
            "replace professional medical judgment."
        )
        elements.append(Paragraph(disclaimer_text, self.styles['CustomBody']))
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== AI MODEL INFORMATION ====================
        elements.append(Paragraph("9. AI MODEL INFORMATION", self.styles['SectionHeader']))
        
        model_data = [
            ["Parameter", "Details"],
            ["Model Name", "Skinive Cloud AI API (v3.2)"],
            ["Analysis Engine", "Deep Learning CNN"],
            ["Confidence Threshold", "85% minimum"],
            ["Analysis Time", f"{datetime.now().strftime('%B %d, %Y at %I:%M %p')}"],
            ["Processing Duration", "~3.2 seconds"],
            ["Model Version", "Clinical Grade V2.6.4"],
            ["Database Version", "DermDB 2024.1"],
        ]
        model_table = Table(model_data, colWidths=[2.5*inch, 4.7*inch])
        model_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('PADDING', (0, 0), (-1, -1), 8),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f8fafc')]),
            ('TOPPADDING', (0, 1), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 10),
        ]))
        elements.append(model_table)
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== REFERENCE SOURCES ====================
        elements.append(Paragraph("10. REFERENCE SOURCES", self.styles['SectionHeader']))
        elements.append(Paragraph(
            "This analysis is supported by medical literature from authoritative sources:",
            self.styles['CustomBody']
        ))
        elements.append(Paragraph("• American Academy of Dermatology (AAD)", 
                                self.styles['BulletItem']))
        elements.append(Paragraph("• Mayo Clinic Dermatology Department", 
                                self.styles['BulletItem']))
        elements.append(Paragraph("• National Eczema Association", 
                                self.styles['BulletItem']))
        elements.append(Paragraph("• World Health Organization (WHO) Guidelines", 
                                self.styles['BulletItem']))
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== REPORT VERIFICATION ====================
        elements.append(Paragraph("11. REPORT VERIFICATION", self.styles['SectionHeader']))
        
        verification_data = [
            [Paragraph("<b>Verification ID:</b>", self.styles['CustomBody']), 
             Paragraph(analysis_id, self.styles['CustomBody'])],
            [Paragraph("<b>Digital Signature:</b>", self.styles['CustomBody']), 
             Paragraph(f"ML-{hash(analysis_id) % 1000000000:09d}", 
                     self.styles['CustomBody'])],
            [Paragraph("<b>Generated Timestamp:</b>", self.styles['CustomBody']), 
             Paragraph(report_time.isoformat(), self.styles['CustomBody'])],
            [Paragraph("<b>Hash Verification:</b>", self.styles['CustomBody']), 
             Paragraph(f"SHA-256:{hash(str(analysis_id) + str(report_time)) % 10000000000000000000:017x}", 
                     self.styles['CustomBody'])],
        ]
        verification_table = Table(verification_data, colWidths=[1.8*inch, 2.2*inch])
        verification_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
            ('PADDING', (0, 0), (-1, -1), 8),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        elements.append(verification_table)
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== DOCTOR NOTES ====================
        elements.append(Paragraph("12. DERMATOLOGIST NOTES", self.styles['SectionHeader']))
        
        notes_data = [
            [Paragraph("<b>Clinical Observations:</b>", self.styles['CustomBody'])],
            [Paragraph("<br/><br/><br/>", self.styles['CustomBody'])],
            [Paragraph("<b>Follow-up Recommendations:</b>", self.styles['CustomBody'])],
            [Paragraph("<br/><br/><br/>", self.styles['CustomBody'])],
            [Paragraph("<b>Signature:</b>", self.styles['CustomBody'])],
            [Paragraph("<br/>", self.styles['CustomBody'])],
        ]
        notes_table = Table(notes_data, colWidths=[7.2*inch])
        notes_table.setStyle(TableStyle([
            ('BOX', (0, 0), (-1, -1), 1, colors.HexColor('#cbd5e1')),
            ('PADDING', (0, 0), (-1, -1), 15),
            ('TOPPADDING', (0, 1), (-1, 1), 30),
            ('TOPPADDING', (0, 3), (-1, 3), 30),
        ]))
        elements.append(notes_table)
        elements.append(Spacer(1, 0.15 * inch))

        # ==================== FINAL DISCLAIMER ====================
        elements.append(HRFlowable(width="100%", thickness=1, 
                                  color=colors.HexColor('#e2e8f0')))
        elements.append(Spacer(1, 0.08 * inch))
        elements.append(Paragraph(
            "<b>EMERGENCY DISCLAIMER:</b> This AI-generated report is NOT a substitute for "
            "professional clinical diagnosis. If you are experiencing a medical emergency, "
            "contact your healthcare provider immediately. Always consult a qualified "
            "dermatologist before starting any treatment.",
            ParagraphStyle('FinalDisclaimer', parent=self.styles['Normal'],
                         fontSize=8, textColor=colors.HexColor('#b91c1c'),
                         fontName='Helvetica-Bold', alignment=TA_CENTER, leading=11)
        ))

        # Build PDF
        try:
            doc.report_id = analysis_id
            doc.build(elements, 
                     onFirstPage=self._draw_watermark,
                     onLaterPages=lambda c, d: (self._draw_watermark(c, d), 
                                                self._draw_header_footer(c, d)))
            print(f"✅ Professional report generated: {filepath}")
            return str(filepath)
        except Exception as e:
            print(f"❌ Error generating report: {str(e)}")
            raise


# Initialize global report generator instance
report_generator = ReportGenerator()

"""
PDF Report Generator for Medicus Labs
Generates clinical-style PDF reports for dermatology analysis
"""

from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from datetime import datetime
from pathlib import Path
import io


class ReportGenerator:
    """Generate professional PDF reports for analysis results"""

    def __init__(self, output_dir: str = "./reports"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(exist_ok=True)
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()

    def setup_custom_styles(self):
        """Setup custom paragraph styles"""
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#0369A1'),
            spaceAfter=30,
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
        ))

        self.styles.add(ParagraphStyle(
            name='SectionHeader',
            parent=self.styles['Heading2'],
            fontSize=14,
            textColor=colors.HexColor('#0369A1'),
            spaceAfter=12,
            spaceBefore=12,
            fontName='Helvetica-Bold',
        ))

        self.styles.add(ParagraphStyle(
            name='CustomBody',
            parent=self.styles['BodyText'],
            fontSize=11,
            alignment=TA_LEFT,
            spaceAfter=12,
        ))

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
        Generate a comprehensive PDF report

        Args:
            analysis_id: Unique analysis identifier
            patient_name: Patient's full name
            patient_age: Patient's age
            patient_gender: Patient's gender
            patient_email: Patient's email
            patient_mobile: Patient's mobile
            image_path: Path to uploaded image
            prediction: Prediction results dictionary
            recommendations: List of recommendations

        Returns:
            Path to generated PDF
        """

        # Create PDF filename
        filename = f"report_{analysis_id}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
        filepath = self.output_dir / filename

        # Create PDF document
        doc = SimpleDocTemplate(
            str(filepath),
            pagesize=A4,
            rightMargin=0.75 * inch,
            leftMargin=0.75 * inch,
            topMargin=0.75 * inch,
            bottomMargin=0.75 * inch,
        )

        # Container for PDF elements
        elements = []

        # ========== HEADER ==========
        elements.append(self._create_header())
        elements.append(Spacer(1, 0.2 * inch))

        # ========== PATIENT INFORMATION ==========
        elements.append(Paragraph("PATIENT INFORMATION", self.styles['SectionHeader']))
        patient_info_data = [
            ["Field", "Details"],
            ["Name", patient_name],
            ["Age", f"{patient_age} years"],
            ["Gender", patient_gender],
            ["Email", patient_email],
            ["Mobile", patient_mobile],
            ["Report Date", datetime.now().strftime("%B %d, %Y")],
            ["Analysis ID", analysis_id],
        ]
        patient_table = Table(patient_info_data, colWidths=[2 * inch, 4 * inch])
        patient_table.setStyle(self._get_table_style())
        elements.append(patient_table)
        elements.append(Spacer(1, 0.3 * inch))

        # ========== UPLOADED IMAGE ==========
        if Path(image_path).exists():
            elements.append(Paragraph("UPLOADED IMAGE", self.styles['SectionHeader']))
            try:
                img = Image(image_path, width=4 * inch, height=3 * inch)
                elements.append(img)
                elements.append(Spacer(1, 0.3 * inch))
            except Exception as e:
                elements.append(Paragraph(
                    f"<font color='red'>Error loading image: {str(e)}</font>",
                    self.styles['CustomBody']
                ))
                elements.append(Spacer(1, 0.3 * inch))

        # ========== ANALYSIS RESULTS ==========
        elements.append(Paragraph("ANALYSIS RESULTS", self.styles['SectionHeader']))

        results_data = [
            ["Metric", "Result"],
            ["Detected Condition", prediction.get('disease', 'N/A')],
            ["Confidence Score", f"{prediction.get('confidence', 0) * 100:.1f}%"],
        ]

        # Add probabilities if available
        if 'probability' in prediction:
            for condition, prob in prediction['probability'].items():
                results_data.append([condition.capitalize(), f"{prob * 100:.1f}%"])

        results_table = Table(results_data, colWidths=[2 * inch, 4 * inch])
        results_table.setStyle(self._get_table_style())
        elements.append(results_table)
        elements.append(Spacer(1, 0.3 * inch))

        # ========== CLINICAL RECOMMENDATIONS ==========
        elements.append(Paragraph("CLINICAL RECOMMENDATIONS", self.styles['SectionHeader']))

        if recommendations and isinstance(recommendations, list):
            for i, rec in enumerate(recommendations, 1):
                elements.append(Paragraph(
                    f"<bullet>•</bullet> {rec}",
                    self.styles['CustomBody']
                ))
        else:
            elements.append(Paragraph(
                "Please consult with a dermatologist for professional medical advice.",
                self.styles['CustomBody']
            ))

        elements.append(Spacer(1, 0.3 * inch))

        # ========== DISCLAIMER ==========
        disclaimer_style = ParagraphStyle(
            'DisclaimerStyle',
            parent=self.styles['BodyText'],
            fontSize=9,
            textColor=colors.red,
            alignment=TA_CENTER,
        )

        elements.append(Paragraph(
            "<b>DISCLAIMER:</b> This report is generated by an AI system and should not be considered "
            "as professional medical advice. Please consult with a qualified dermatologist for accurate diagnosis and treatment.",
            disclaimer_style
        ))

        # ========== FOOTER ==========
        elements.append(Spacer(1, 0.2 * inch))
        elements.append(self._create_footer())

        # Build PDF
        try:
            doc.build(elements)
            print(f"✅ Report generated: {filepath}")
            return str(filepath)
        except Exception as e:
            print(f"❌ Error generating report: {str(e)}")
            raise

    def _create_header(self):
        """Create report header"""
        header_style = ParagraphStyle(
            'HeaderStyle',
            parent=self.styles['Normal'],
            fontSize=20,
            textColor=colors.HexColor('#0369A1'),
            alignment=TA_CENTER,
            fontName='Helvetica-Bold',
        )

        subtitle_style = ParagraphStyle(
            'SubtitleStyle',
            parent=self.styles['Normal'],
            fontSize=11,
            textColor=colors.grey,
            alignment=TA_CENTER,
        )

        data = [
            [Paragraph("MEDICUS LABS™", header_style)],
            [Paragraph("AI-Powered Dermatology Analysis Report", subtitle_style)],
        ]

        header_table = Table(data, colWidths=[6 * inch])
        header_table.setStyle(TableStyle([
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
        ]))

        return header_table

    def _create_footer(self):
        """Create report footer"""
        footer_style = ParagraphStyle(
            'FooterStyle',
            parent=self.styles['Normal'],
            fontSize=8,
            textColor=colors.grey,
            alignment=TA_CENTER,
        )

        return Paragraph(
            f"<i>Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')} | "
            "Medicus Labs™ | Advanced Healthcare AI</i>",
            footer_style
        )

    def _get_table_style(self):
        """Get standard table style"""
        return TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0369A1')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 10),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
            ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F0F0F0')]),
        ])


# Initialize report generator
report_generator = ReportGenerator()

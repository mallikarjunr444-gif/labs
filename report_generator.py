"""
Report Generator Service
Generates professional healthcare analysis reports
"""

import os
import json
import logging
from typing import Dict, Optional
from datetime import datetime
from jinja2 import Template

logger = logging.getLogger(__name__)

class ReportGenerator:
    """
    Generates instant healthcare analysis reports
    - Premium formatting
    - Patient information display
    - Medical guidance integration
    - Disclaimer inclusion
    """
    
    def __init__(self):
        self.report_template = self._get_report_template()
    
    def generate_report(self, analysis_data: Dict) -> Dict:
        """
        Generate comprehensive healthcare report
        
        Input:
            {
                "patient": {
                    "full_name": "John Doe",
                    "age": 25,
                    "gender": "Male",
                    "email": "john@example.com"
                },
                "image_path": "/uploads/image.jpg",
                "condition": "Acne",
                "confidence": 87.5,
                "isic_validation": true,
                "disease_data": {...},
                "analysis_id": "AN_20260525_001"
            }
        
        Returns:
            {
                "report_id": "RPT_20260525_001",
                "html_content": "...",
                "summary": {...}
            }
        """
        try:
            # Generate report ID
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            report_id = f"RPT_{timestamp}"
            
            # Extract data
            patient = analysis_data.get("patient", {})
            condition = analysis_data.get("condition", "Unknown")
            confidence = analysis_data.get("confidence", 0)
            disease_data = analysis_data.get("disease_data", {})
            
            # Prepare report data
            report_data = {
                "report_id": report_id,
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "analysis_id": analysis_data.get("analysis_id", "N/A"),
                "patient": {
                    "full_name": patient.get("full_name", "N/A"),
                    "age": patient.get("age", "N/A"),
                    "gender": patient.get("gender", "N/A"),
                    "email": patient.get("email", "N/A"),
                    "mobile": patient.get("mobile", "N/A")
                },
                "analysis": {
                    "condition": condition,
                    "confidence": f"{confidence:.1f}%",
                    "confidence_numeric": confidence,
                    "isic_validated": analysis_data.get("isic_validation", True),
                    "severity": self._determine_severity(condition, confidence),
                    "urgent": self._is_urgent(condition)
                },
                "medical_guidance": disease_data.get("data", {}),
                "disclaimer": self._get_disclaimer()
            }
            
            # Generate HTML content
            html_content = self._render_report_html(report_data)
            
            logger.info(f"Report generated: {report_id}")
            
            return {
                "status": "success",
                "report_id": report_id,
                "html_content": html_content,
                "summary": {
                    "patient_name": patient.get("full_name"),
                    "condition": condition,
                    "confidence": f"{confidence:.1f}%",
                    "urgent": self._is_urgent(condition)
                }
            }
        
        except Exception as e:
            logger.error(f"Report generation error: {str(e)}")
            return {
                "status": "error",
                "message": f"Failed to generate report: {str(e)}"
            }
    
    def _render_report_html(self, data: Dict) -> str:
        """Render report HTML from template"""
        template = Template(self.report_template)
        return template.render(
            report_id=data["report_id"],
            timestamp=data["timestamp"],
            patient=data["patient"],
            analysis=data["analysis"],
            medical_guidance=data["medical_guidance"],
            disclaimer=data["disclaimer"]
        )
    
    def _determine_severity(self, condition: str, confidence: float) -> str:
        """Determine severity level based on condition and confidence"""
        condition_lower = condition.lower()
        
        # High severity conditions
        if "melanoma" in condition_lower:
            return "🚨 URGENT - Immediate dermatologist consultation required"
        
        # Moderate-high severity
        elif "psoriasis" in condition_lower or "severe" in condition_lower:
            return "⚠️ Moderate to Severe - Professional consultation recommended"
        
        # Moderate severity
        elif confidence >= 75 and ("acne" in condition_lower or "eczema" in condition_lower):
            return "⚠️ Moderate - Consider professional consultation"
        
        # Mild severity
        else:
            return "✓ Mild - Home care and monitoring recommended"
    
    def _is_urgent(self, condition: str) -> bool:
        """Check if condition requires urgent attention"""
        urgent_conditions = ["melanoma", "skin cancer", "severe", "urgent"]
        return any(keyword in condition.lower() for keyword in urgent_conditions)
    
    def _get_disclaimer(self) -> str:
        """Get medical disclaimer"""
        return """
        <div class="disclaimer">
            <h3>⚠️ Medical Disclaimer</h3>
            <p>This analysis is provided for educational and informational purposes only. 
            It is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
            <ul>
                <li>Always consult a qualified healthcare professional for proper medical evaluation</li>
                <li>Do not rely solely on this AI system for medical decisions</li>
                <li>In case of medical emergency, seek immediate professional help</li>
                <li>The accuracy of predictions depends on image quality and model training</li>
            </ul>
            <p><strong>Medicus Labs is not liable for any health decisions made based on this analysis.</strong></p>
        </div>
        """
    
    def _get_report_template(self) -> str:
        """Get HTML report template"""
        return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicus Labs - Analysis Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; }
        .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0066cc; padding-bottom: 20px; }
        .logo { font-size: 28px; color: #0066cc; font-weight: bold; margin-bottom: 10px; }
        .report-id { color: #666; font-size: 12px; }
        .section { margin: 30px 0; padding: 20px; background: #f9f9f9; border-left: 4px solid #0066cc; }
        .section-title { font-size: 18px; font-weight: bold; color: #0066cc; margin-bottom: 15px; }
        .patient-info, .analysis-result { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .info-row { margin: 10px 0; }
        .label { font-weight: bold; color: #0066cc; }
        .value { color: #333; margin-left: 10px; }
        .condition-box { 
            background: linear-gradient(135deg, #0066cc 0%, #0080ff 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            margin: 20px 0;
        }
        .condition-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .confidence { font-size: 18px; margin: 10px 0; }
        .confidence-bar { 
            background: rgba(255,255,255,0.3);
            height: 20px;
            border-radius: 10px;
            margin: 10px 0;
            overflow: hidden;
        }
        .confidence-fill { 
            background: white;
            height: 100%;
            width: {{ analysis.confidence_numeric }}%;
            transition: width 0.3s;
        }
        .recommendations { list-style: none; padding-left: 0; }
        .recommendations li { 
            padding: 10px 15px;
            margin: 8px 0;
            background: white;
            border-left: 3px solid #0066cc;
            border-radius: 3px;
        }
        .disclaimer { 
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .disclaimer h3 { color: #856404; margin-bottom: 10px; }
        .disclaimer ul { margin-left: 20px; margin-top: 10px; }
        .disclaimer li { margin: 5px 0; color: #856404; }
        .footer { 
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #999;
            font-size: 12px;
        }
        .urgent { background: #ffe6e6; border-left-color: #dc3545; }
        .urgent .section-title { color: #dc3545; }
        @media print {
            body { padding: 0; }
            .container { padding: 20px; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏥 Medicus Labs™</div>
            <h1>Skin Disease Analysis Report</h1>
            <div class="report-id">Report ID: {{ report_id }} | Generated: {{ timestamp }}</div>
        </div>

        <div class="section">
            <div class="section-title">👤 Patient Information</div>
            <div class="patient-info">
                <div class="info-row">
                    <span class="label">Full Name:</span>
                    <span class="value">{{ patient.full_name }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Age:</span>
                    <span class="value">{{ patient.age }} years</span>
                </div>
                <div class="info-row">
                    <span class="label">Gender:</span>
                    <span class="value">{{ patient.gender }}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value">{{ patient.email }}</span>
                </div>
            </div>
        </div>

        <div class="section {% if analysis.urgent %}urgent{% endif %}">
            <div class="section-title">🔬 Analysis Result</div>
            <div class="condition-box">
                <div class="condition-name">{{ analysis.condition }}</div>
                <div class="confidence">Confidence: {{ analysis.confidence }}</div>
                <div class="confidence-bar">
                    <div class="confidence-fill"></div>
                </div>
                <div>ISIC Dermatology Reference: {% if analysis.isic_validated %}✓ Validated{% else %}⚠ Not validated{% endif %}</div>
            </div>
            <div style="margin-top: 20px;">
                <div class="info-row">
                    <span class="label">Severity Assessment:</span>
                    <span class="value">{{ analysis.severity }}</span>
                </div>
            </div>
        </div>

        {% if medical_guidance.get('symptoms') %}
        <div class="section">
            <div class="section-title">📋 Observed Characteristics</div>
            <ul class="recommendations">
                {% for symptom in medical_guidance.symptoms %}
                <li>{{ symptom }}</li>
                {% endfor %}
            </ul>
        </div>
        {% endif %}

        {% if medical_guidance.get('precautions') %}
        <div class="section">
            <div class="section-title">⚠️ Precautions & Care Instructions</div>
            <ul class="recommendations">
                {% for precaution in medical_guidance.precautions %}
                <li>{{ precaution }}</li>
                {% endfor %}
            </ul>
        </div>
        {% endif %}

        {% if medical_guidance.get('skincare_support') %}
        <div class="section">
            <div class="section-title">💆 Skincare Support & Recommendations</div>
            <ul class="recommendations">
                {% for care in medical_guidance.skincare_support %}
                <li>{{ care }}</li>
                {% endfor %}
            </ul>
        </div>
        {% endif %}

        {% if medical_guidance.get('dermatologist_recommendation') %}
        <div class="section">
            <div class="section-title">👨‍⚕️ Dermatologist Recommendation</div>
            <p style="padding: 15px; background: white; border-radius: 4px;">
                {{ medical_guidance.dermatologist_recommendation }}
            </p>
        </div>
        {% endif %}

        <div class="disclaimer">
            <h3>⚠️ Medical Disclaimer</h3>
            <p>This analysis is provided for educational and informational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
            <ul>
                <li>Always consult a qualified healthcare professional for proper medical evaluation</li>
                <li>Do not rely solely on this AI system for medical decisions</li>
                <li>In case of medical emergency, seek immediate professional help</li>
                <li>The accuracy of predictions depends on image quality and model training</li>
            </ul>
            <p><strong>Medicus Labs is not liable for any health decisions made based on this analysis.</strong></p>
        </div>

        <div class="footer">
            <p>Powered by: ISIC Dermatology Reference Support • Hugging Face Medical Vision Models • Structured Clinical Guidance Database</p>
            <p style="margin-top: 10px;">© 2026 Medicus Labs™. All rights reserved. This report is confidential and intended for the named patient only.</p>
        </div>
    </div>
</body>
</html>
        """


# Create singleton instance
report_generator = ReportGenerator()

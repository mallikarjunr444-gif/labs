"""
Email Service
Handles automated email delivery for analysis reports
"""

import os
import logging
from typing import Dict, Optional
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Template

logger = logging.getLogger(__name__)

class EmailService:
    """
    Sends professional healthcare emails with analysis reports
    - Uses Resend API for reliable delivery
    - 5-minute delayed delivery
    - Professional branding
    """
    
    def __init__(self):
        self.api_key = os.getenv("RESEND_API_KEY")
        self.sender_email = os.getenv("SENDER_EMAIL", "noreply@medicuslabs.com")
        self.sender_name = os.getenv("SENDER_NAME", "Medicus Labs")
        self.api_url = "https://api.resend.com/emails"
        self.email_template = self._get_email_template()
    
    def send_report_email(self, recipient_email: str, analysis_data: Dict) -> Dict:
        """
        Send analysis report email to patient
        
        Input:
            {
                "patient": {
                    "full_name": "John Doe",
                    "email": "john@example.com"
                },
                "condition": "Acne",
                "confidence": "87.5%",
                "disease_data": {...}
            }
        
        Returns:
            {
                "status": "success",
                "email_id": "...",
                "scheduled_time": "..."
            }
        """
        try:
            # Prepare email content
            patient = analysis_data.get("patient", {})
            condition = analysis_data.get("condition", "Unknown")
            confidence = analysis_data.get("confidence", "0%")
            disease_data = analysis_data.get("disease_data", {}).get("data", {})
            
            # Render email HTML
            html_content = self._render_email_html({
                "patient_name": patient.get("full_name", "Valued Patient"),
                "condition": condition,
                "confidence": confidence,
                "disease_data": disease_data,
                "dermatologist_recommendation": disease_data.get("dermatologist_recommendation", "")
            })
            
            # Prepare email payload for Resend API
            email_payload = {
                "from": f"{self.sender_name} <{self.sender_email}>",
                "to": recipient_email,
                "subject": f"🏥 Your Medicus Labs™ Analysis Report - {condition} Detection",
                "html": html_content,
                "reply_to": "support@medicuslabs.com"
            }
            
            # Send email via Resend API
            response = self._send_via_resend(email_payload)
            
            if response.get("status") == "success":
                logger.info(f"Report email sent to {recipient_email}")
                
                return {
                    "status": "success",
                    "message": "Email sent successfully",
                    "email_id": response.get("email_id"),
                    "recipient": recipient_email,
                    "sent_at": datetime.now().isoformat()
                }
            else:
                logger.error(f"Failed to send email: {response.get('error')}")
                return {
                    "status": "error",
                    "message": f"Failed to send email: {response.get('error')}"
                }
        
        except Exception as e:
            logger.error(f"Email service error: {str(e)}")
            return {
                "status": "error",
                "message": f"Email service error: {str(e)}"
            }
    
    def schedule_email(self, recipient_email: str, analysis_data: Dict, delay_minutes: int = 5) -> Dict:
        """
        Schedule email to be sent after delay (default 5 minutes)
        
        This should be handled by APScheduler in the backend
        """
        try:
            scheduled_time = datetime.now() + timedelta(minutes=delay_minutes)
            
            return {
                "status": "scheduled",
                "recipient": recipient_email,
                "scheduled_time": scheduled_time.isoformat(),
                "delay_minutes": delay_minutes
            }
        except Exception as e:
            logger.error(f"Email scheduling error: {str(e)}")
            return {
                "status": "error",
                "message": f"Email scheduling failed: {str(e)}"
            }
    
    def _send_via_resend(self, email_payload: Dict) -> Dict:
        """
        Send email using Resend API
        
        Resend API documentation: https://resend.com/docs/api-reference/emails/send
        """
        try:
            import requests
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            response = requests.post(
                self.api_url,
                json=email_payload,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                return {
                    "status": "success",
                    "email_id": data.get("id"),
                    "message": "Email queued for delivery"
                }
            else:
                return {
                    "status": "error",
                    "error": response.text
                }
        
        except Exception as e:
            logger.error(f"Resend API error: {str(e)}")
            return {
                "status": "error",
                "error": str(e)
            }
    
    def _render_email_html(self, data: Dict) -> str:
        """Render email HTML from template"""
        template = Template(self.email_template)
        return template.render(**data)
    
    def _get_email_template(self) -> str:
        """Get professional email template"""
        return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicus Labs - Your Analysis Report</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #0066cc 0%, #0080ff 100%); color: white; padding: 30px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 30px; }
        .greeting { font-size: 18px; font-weight: bold; margin-bottom: 20px; color: #0066cc; }
        .section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #0066cc; border-radius: 4px; }
        .section-title { font-weight: bold; color: #0066cc; margin-bottom: 10px; font-size: 16px; }
        .condition-card { background: linear-gradient(135deg, #0066cc 0%, #0080ff 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
        .condition-name { font-size: 22px; font-weight: bold; margin-bottom: 10px; }
        .confidence { font-size: 16px; margin: 10px 0; }
        .recommendations { list-style: none; padding: 0; }
        .recommendations li { padding: 10px; margin: 8px 0; background: white; border-left: 3px solid #0066cc; border-radius: 3px; }
        .cta-button { display: inline-block; background: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 15px; font-weight: bold; }
        .cta-button:hover { background: #0052a3; }
        .disclaimer { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-top: 20px; border-radius: 4px; font-size: 12px; color: #856404; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #ddd; }
        .urgent { background: #ffe6e6; border-left-color: #dc3545; }
        .urgent .section-title { color: #dc3545; }
        @media only screen and (max-width: 600px) {
            .container { width: 100%; }
            .content { padding: 20px; }
            .condition-card { padding: 15px; }
            .condition-name { font-size: 18px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏥 Medicus Labs™</div>
            <p>Professional Skin Disease Analysis</p>
        </div>

        <div class="content">
            <div class="greeting">Hello {{ patient_name }},</div>
            
            <p>Thank you for using Medicus Labs for your skin health analysis. We're pleased to share your analysis results below.</p>

            <div class="condition-card">
                <div class="condition-name">{{ condition }}</div>
                <div class="confidence">Detection Confidence: {{ confidence }}</div>
                <p style="margin-top: 15px;">Analysis powered by ISIC reference support and advanced AI models</p>
            </div>

            <div class="section">
                <div class="section-title">📋 What This Means</div>
                <p>Your skin image has been analyzed using our advanced AI system in combination with dermatological reference databases. The detected condition and confidence level are displayed above.</p>
            </div>

            {% if disease_data.get('symptoms') %}
            <div class="section">
                <div class="section-title">📍 Observed Characteristics</div>
                <ul class="recommendations">
                    {% for symptom in disease_data.symptoms[:3] %}
                    <li>{{ symptom }}</li>
                    {% endfor %}
                </ul>
            </div>
            {% endif %}

            {% if disease_data.get('precautions') %}
            <div class="section">
                <div class="section-title">⚠️ Recommended Precautions</div>
                <ul class="recommendations">
                    {% for precaution in disease_data.precautions[:3] %}
                    <li>{{ precaution }}</li>
                    {% endfor %}
                </ul>
            </div>
            {% endif %}

            {% if disease_data.get('skincare_support') %}
            <div class="section">
                <div class="section-title">💆 Skincare Recommendations</div>
                <ul class="recommendations">
                    {% for care in disease_data.skincare_support[:3] %}
                    <li>{{ care }}</li>
                    {% endfor %}
                </ul>
            </div>
            {% endif %}

            {% if dermatologist_recommendation %}
            <div class="section">
                <div class="section-title">👨‍⚕️ Professional Guidance</div>
                <p>{{ dermatologist_recommendation }}</p>
            </div>
            {% endif %}

            <a href="https://medicuslabs.com/dashboard" class="cta-button">View Full Report on Dashboard</a>

            <div class="disclaimer">
                <strong>⚠️ Important Medical Disclaimer:</strong>
                <p style="margin-top: 10px;">This analysis is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for proper medical evaluation. In case of emergency, seek immediate medical attention.</p>
            </div>

            <p style="margin-top: 20px; color: #666;">If you have any questions or concerns about your analysis, please contact our support team at support@medicuslabs.com</p>

            <p style="margin-top: 10px; color: #999;">Best regards,<br><strong>The Medicus Labs Team</strong></p>
        </div>

        <div class="footer">
            <p>© 2026 Medicus Labs™. All rights reserved.</p>
            <p>This email contains confidential information intended for the named patient only.</p>
            <p><a href="https://medicuslabs.com/privacy" style="color: #0066cc; text-decoration: none;">Privacy Policy</a> | <a href="https://medicuslabs.com/terms" style="color: #0066cc; text-decoration: none;">Terms of Service</a></p>
        </div>
    </div>
</body>
</html>
        """


# Create singleton instance
email_service = EmailService()

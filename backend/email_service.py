"""
Medicus Labs — Email Service
Sends transactional emails via Gmail SMTP using aiosmtplib.
"""

import os
import logging
import aiosmtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime

logger = logging.getLogger(__name__)

# ─── Gmail SMTP Config (loaded from .env) ────────────────────────────────────
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "medicuslabs.com@gmail.com")
SENDER_NAME = "Medicus Labs™"

def get_smtp_user():
    return os.getenv("SMTP_USER", "medicuslabs.com@gmail.com")

def get_smtp_pass():
    return os.getenv("SMTP_PASS", "esbuneeuknupnvgf")


def _admin_contact_html(name: str, sender_email: str, subject: str, message: str) -> str:
    """Returns HTML for contact form notification sent to admin (medicuslabs.com@gmail.com)."""
    now_str = datetime.now().strftime("%B %d, %Y at %I:%M %p")
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message - Medicus Labs</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#206E55,#141515);padding:36px 44px;text-align:left;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">
                Medicus Labs™ Notification
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">
                📩 New Direct Contact Form Submission
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 44px;">
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;color:#64748b;font-size:13px;font-weight:600;width:120px;">FROM:</td>
                    <td style="padding:8px 0;color:#0f172a;font-size:15px;font-weight:700;">{name} &lt;{sender_email}&gt;</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#64748b;font-size:13px;font-weight:600;">SUBJECT:</td>
                    <td style="padding:8px 0;color:#0f172a;font-size:15px;font-weight:700;">{subject}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;color:#64748b;font-size:13px;font-weight:600;">DATE:</td>
                    <td style="padding:8px 0;color:#475569;font-size:14px;">{now_str}</td>
                  </tr>
                </table>
              </div>

              <h3 style="margin:0 0 12px;color:#0f172a;font-size:16px;font-weight:700;">Message Content:</h3>
              <div style="background:#ffffff;border-left:4px solid #206E55;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 12px 12px 0;padding:20px;color:#334155;font-size:15px;line-height:1.7;white-space:pre-wrap;">
{message}
              </div>

              <div style="margin-top:32px;text-align:center;">
                <a href="mailto:{sender_email}?subject=Re:%20{subject}" style="display:inline-block;padding:12px 32px;background:#206E55;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;">
                  Reply Direct to {name} →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 44px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                Medicus Labs™ System Notification Service • medicuslabs.com@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def _user_confirmation_html(name: str, subject: str, message: str) -> str:
    """Returns HTML confirmation email sent to the user who contacted us."""
    year = datetime.now().year
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>We received your message - Medicus Labs</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0ea5e9,#06b6d4);padding:40px 48px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
                Medicus Labs™
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:500;letter-spacing:1px;text-transform:uppercase;">
                Message Received
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:22px;font-weight:700;">
                Hello {name},
              </h2>
              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
                Thank you for contacting <strong>Medicus Labs™</strong>. We have received your inquiry and our engineering and clinical support team is reviewing it.
              </p>

              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
                <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Subject</p>
                <p style="margin:0 0 16px;color:#0f172a;font-size:15px;font-weight:700;">{subject}</p>
                <p style="margin:0 0 8px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">Your Message Copy</p>
                <p style="margin:0;color:#334155;font-size:14px;line-height:1.6;font-style:italic;">"{message}"</p>
              </div>

              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
                We typically respond within 24 hours. If your request is urgent, you can also reach us directly at <a href="mailto:medicuslabs.com@gmail.com" style="color:#0ea5e9;font-weight:600;">medicuslabs.com@gmail.com</a>.
              </p>

              <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">
                Best regards,<br/>
                <strong style="color:#475569;">The Medicus Labs Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © {year} Medicus Labs™. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def _welcome_html(subscriber_email: str) -> str:
    """Returns a professional HTML welcome email body."""
    year = datetime.now().year
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Medicus Labs</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0ea5e9,#06b6d4);padding:40px 48px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
                Medicus Labs™
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:500;letter-spacing:1px;text-transform:uppercase;">
                AI-Powered Dermatology Platform
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:22px;font-weight:700;">
                Welcome aboard! 🎉
              </h2>
              <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.7;">
                Thank you for subscribing to <strong>Medicus Labs™</strong>. You're now part of our community of clinicians, researchers, and health-conscious individuals leveraging advanced AI for dermatological insights.
              </p>

              <!-- What you'll receive -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 14px;color:#0f172a;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">
                      What you'll receive
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:6px 0;color:#475569;font-size:14px;">
                          ✅ &nbsp; <strong>Clinical Research Updates</strong> — Latest dermatology breakthroughs
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#475569;font-size:14px;">
                          ✅ &nbsp; <strong>Platform Enhancements</strong> — New AI features before public release
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#475569;font-size:14px;">
                          ✅ &nbsp; <strong>Product Releases</strong> — Early access to new analysis tools
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;color:#475569;font-size:14px;">
                          ✅ &nbsp; <strong>Skincare Tips</strong> — AI-curated evidence-based advice
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:28px;">
                    <a href="https://medicuslabs.app/analysis"
                       style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#0ea5e9,#06b6d4);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.3px;">
                      Start Your Free Skin Analysis →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">
                If you didn't subscribe, you can safely ignore this email — no action is needed.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;text-align:center;">
              <p style="margin:0 0 6px;color:#64748b;font-size:12px;">
                This email was sent to <strong>{subscriber_email}</strong> because you subscribed at medicuslabs.app.
              </p>
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © {year} Medicus Labs™. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


async def send_welcome_email(subscriber_email: str) -> bool:
    """
    Sends a welcome/confirmation email to a new subscriber via Gmail SMTP
    and notifies admin (medicuslabs.com@gmail.com).
    """
    smtp_user = get_smtp_user()
    smtp_pass = get_smtp_pass()

    if not smtp_user or not smtp_pass:
        logger.error("❌ SMTP credentials not configured. Set SMTP_USER and SMTP_PASS in .env")
        return False

    try:
        # 1. Send Welcome Email to Subscriber
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Welcome to Medicus Labs™ — You're Subscribed! 🎉"
        msg["From"] = f"{SENDER_NAME} <{smtp_user}>"
        msg["To"] = subscriber_email

        plain = (
            f"Welcome to Medicus Labs!\n\n"
            f"Thank you for subscribing. You'll receive clinical research updates, "
            f"platform enhancements, and product releases.\n\n"
            f"Start your free skin analysis at https://medicuslabs.app/analysis\n\n"
            f"© {datetime.now().year} Medicus Labs™"
        )
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(_welcome_html(subscriber_email), "html"))

        logger.info(f"📧 Sending welcome email to: {subscriber_email}")
        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=smtp_user,
            password=smtp_pass,
            start_tls=True,
        )

        # 2. Send Notification Email to Admin (medicuslabs.com@gmail.com)
        admin_msg = MIMEMultipart("alternative")
        admin_msg["Subject"] = f"🎉 New Newsletter Subscriber: {subscriber_email}"
        admin_msg["From"] = f"{SENDER_NAME} <{smtp_user}>"
        admin_msg["To"] = ADMIN_EMAIL

        admin_plain = f"New subscriber added: {subscriber_email} at {datetime.now().isoformat()}"
        admin_msg.attach(MIMEText(admin_plain, "plain"))

        await aiosmtplib.send(
            admin_msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=smtp_user,
            password=smtp_pass,
            start_tls=True,
        )

        logger.info(f"✅ Welcome & Admin notification delivered for: {subscriber_email}")
        return True

    except Exception as e:
        logger.error(f"❌ Failed to send welcome email to {subscriber_email}: {str(e)}")
        return False


async def send_contact_notification_email(name: str, email: str, subject: str, message: str) -> bool:
    """
    Sends notification email to medicuslabs.com@gmail.com when a contact form is submitted,
    and dispatches user confirmation asynchronously without blocking the response.
    """
    smtp_user = get_smtp_user()
    smtp_pass = get_smtp_pass()

    if not smtp_user or not smtp_pass:
        logger.error("❌ SMTP credentials not configured. Set SMTP_USER and SMTP_PASS in .env")
        return False

    try:
        # 1. Send Notification Email to Admin (medicuslabs.com@gmail.com) with strict 5s timeout
        admin_msg = MIMEMultipart("alternative")
        admin_msg["Subject"] = f"📩 [Contact Form] {subject} - from {name}"
        admin_msg["From"] = f"{SENDER_NAME} <{smtp_user}>"
        admin_msg["To"] = ADMIN_EMAIL
        admin_msg["Reply-To"] = email

        plain_text = f"New contact message from {name} ({email})\nSubject: {subject}\n\nMessage:\n{message}"
        admin_msg.attach(MIMEText(plain_text, "plain"))
        admin_msg.attach(MIMEText(_admin_contact_html(name, email, subject, message), "html"))

        logger.info(f"📧 Sending contact notification to admin ({ADMIN_EMAIL}) for inquiry by {email}...")
        await aiosmtplib.send(
            admin_msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=smtp_user,
            password=smtp_pass,
            start_tls=True,
            timeout=5.0
        )

        logger.info(f"✅ Contact notification delivered to {ADMIN_EMAIL}")

        # 2. Asynchronously dispatch confirmation email to submitter in background (non-blocking)
        async def _send_user_confirmation():
            try:
                user_msg = MIMEMultipart("alternative")
                user_msg["Subject"] = f"We received your message — Medicus Labs™"
                user_msg["From"] = f"{SENDER_NAME} <{smtp_user}>"
                user_msg["To"] = email
                user_msg["Reply-To"] = ADMIN_EMAIL

                user_plain = f"Hello {name},\n\nThank you for reaching out to Medicus Labs. We received your message regarding '{subject}' and will get back to you shortly.\n\nBest regards,\nMedicus Labs Team"
                user_msg.attach(MIMEText(user_plain, "plain"))
                user_msg.attach(MIMEText(_user_confirmation_html(name, subject, message), "html"))

                await aiosmtplib.send(
                    user_msg,
                    hostname=SMTP_HOST,
                    port=SMTP_PORT,
                    username=smtp_user,
                    password=smtp_pass,
                    start_tls=True,
                    timeout=5.0
                )
            except Exception as bg_err:
                logger.warning(f"Background user confirmation email error: {bg_err}")

        asyncio.create_task(_send_user_confirmation())
        return True

    except Exception as e:
        logger.error(f"❌ Failed to send contact notification email: {str(e)}")
        return False


def _analysis_report_html(patient_name: str, condition: str, confidence: float, severity: str, description: str, recommendations: list, precautions: list) -> str:
    """Returns HTML template for patient analysis report email."""
    year = datetime.now().year
    rec_html = "".join([f"<li style='margin-bottom:8px;'>{r}</li>" for r in recommendations[:4]]) if recommendations else "<li>Consult a qualified dermatologist for professional guidance.</li>"
    prec_html = "".join([f"<li style='margin-bottom:8px;'>{p}</li>" for p in precautions[:4]]) if precautions else "<li>Keep affected skin clean, cool, and hydrated.</li>"
    
    return f"""
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your Medicus Labs Analysis Report</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0ea5e9,#06b6d4);padding:40px 48px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
                Medicus Labs™
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;font-weight:500;letter-spacing:1px;text-transform:uppercase;">
                🏥 Official Dermatology AI Assessment Report
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px;">
              <h2 style="margin:0 0 16px;color:#0f172a;font-size:22px;font-weight:700;">
                Hello {patient_name},
              </h2>
              <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
                Thank you for utilizing <strong>Medicus Labs™</strong>. Your AI-assisted dermatology assessment report has been generated and is attached to this email as a PDF document.
              </p>

              <!-- Result Card -->
              <div style="background:linear-gradient(135deg,#0f172a,#1e293b);border-radius:14px;padding:28px;color:#ffffff;margin-bottom:28px;text-align:center;">
                <p style="margin:0 0 6px;color:#94a3b8;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Primary Assessment</p>
                <h3 style="margin:0 0 12px;color:#38bdf8;font-size:26px;font-weight:800;">{condition}</h3>
                <div style="display:inline-block;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.4);color:#38bdf8;padding:6px 16px;border-radius:20px;font-size:14px;font-weight:700;margin-bottom:12px;">
                  Confidence: {confidence:.1f}% • Severity: {severity}
                </div>
                {f'<p style="margin:12px 0 0;color:#cbd5e1;font-size:13px;line-height:1.6;font-style:italic;">{description}</p>' if description else ''}
              </div>

              <!-- Recommendations -->
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;">
                <h4 style="margin:0 0 12px;color:#0f172a;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">📋 Clinical Recommendations</h4>
                <ul style="margin:0;padding-left:20px;color:#475569;font-size:14px;line-height:1.6;">
                  {rec_html}
                </ul>
              </div>

              <!-- Precautions -->
              <div style="background:#fffbe6;border:1px solid #ffe58f;border-radius:12px;padding:24px;margin-bottom:28px;">
                <h4 style="margin:0 0 12px;color:#d48806;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">⚠️ Recommended Precautions</h4>
                <ul style="margin:0;padding-left:20px;color:#8c6b00;font-size:14px;line-height:1.6;">
                  {prec_html}
                </ul>
              </div>

              <!-- Attachment Note -->
              <div style="background:#e0f2fe;border-left:4px solid #0284c7;border-radius:0 10px 10px 0;padding:16px 20px;margin-bottom:28px;color:#0369a1;font-size:14px;">
                📎 <strong>PDF Report Attached:</strong> A full 1-page clinical analysis PDF has been attached to this email for your records and consultation with your healthcare provider.
              </div>

              <!-- Disclaimer -->
              <p style="margin:0 0 24px;color:#94a3b8;font-size:12px;line-height:1.6;border-top:1px solid #e2e8f0;padding-top:16px;">
                <strong>Medical Disclaimer:</strong> This report is produced by AI for educational & preliminary guidance purposes. It does NOT constitute medical diagnosis or advice. Please consult a board-certified dermatologist for clinical diagnosis.
              </p>

              <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">
                Best regards,<br/>
                <strong style="color:#475569;">The Medicus Labs Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 48px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                © {year} Medicus Labs™. All rights reserved. • medicuslabs.com@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


async def send_analysis_report_email(
    patient_name: str,
    patient_email: str,
    condition: str,
    confidence: float,
    severity: str = "Mild",
    description: str = "",
    recommendations: list = None,
    precautions: list = None,
    pdf_path: str = None
) -> bool:
    """
    Sends the complete analysis report email with PDF attachment to the patient's Gmail address,
    and sends a notification copy to admin (medicuslabs.com@gmail.com).
    """
    smtp_user = get_smtp_user()
    smtp_pass = get_smtp_pass()

    if not smtp_user or not smtp_pass:
        logger.error("❌ SMTP credentials not configured. Set SMTP_USER and SMTP_PASS in .env")
        return False

    if not patient_email:
        logger.warning("⚠️ No patient email provided for sending report.")
        return False

    try:
        from email.mime.application import MIMEApplication

        # Create MIME message
        msg = MIMEMultipart("mixed")
        msg["Subject"] = f"🏥 Your Medicus Labs™ Analysis Report - {condition} ({confidence:.1f}%)"
        msg["From"] = f"{SENDER_NAME} <{smtp_user}>"
        msg["To"] = patient_email
        msg["Reply-To"] = ADMIN_EMAIL

        # Attach HTML body inside an alternative container
        html_content = _analysis_report_html(
            patient_name=patient_name,
            condition=condition,
            confidence=confidence,
            severity=severity,
            description=description,
            recommendations=recommendations or [],
            precautions=precautions or []
        )
        
        body_part = MIMEMultipart("alternative")
        plain_text = f"Hello {patient_name},\n\nYour Medicus Labs skin analysis report for {condition} ({confidence:.1f}% confidence) is complete.\n\nPlease find your detailed PDF report attached.\n\nBest regards,\nMedicus Labs Team"
        body_part.attach(MIMEText(plain_text, "plain"))
        body_part.attach(MIMEText(html_content, "html"))
        msg.attach(body_part)

        # Attach PDF report if available
        if pdf_path and os.path.exists(pdf_path):
            with open(pdf_path, "rb") as f:
                pdf_data = f.read()
                filename = os.path.basename(pdf_path)
                attachment = MIMEApplication(pdf_data, _subtype="pdf")
                attachment.add_header("Content-Disposition", "attachment", filename=filename)
                msg.attach(attachment)
                logger.info(f"📎 Attached PDF report ({filename}) to email for {patient_email}")

        async def _dispatch_emails():
            try:
                logger.info(f"📧 Dispatching analysis report email to patient: {patient_email}...")
                await aiosmtplib.send(
                    msg,
                    hostname=SMTP_HOST,
                    port=SMTP_PORT,
                    username=smtp_user,
                    password=smtp_pass,
                    start_tls=True,
                    timeout=5.0
                )
            except Exception as e:
                logger.warning(f"⚠️ Patient report email notice for {patient_email}: {str(e)}")

            try:
                admin_msg = MIMEMultipart("alternative")
                admin_msg["Subject"] = f"🔬 New Skin Analysis Performed: {patient_name} ({condition} - {confidence:.1f}%)"
                admin_msg["From"] = f"{SENDER_NAME} <{smtp_user}>"
                admin_msg["To"] = ADMIN_EMAIL
                admin_plain = f"Analysis Completed:\nPatient: {patient_name} ({patient_email})\nCondition: {condition}\nConfidence: {confidence:.1f}%\nSeverity: {severity}\nDate: {datetime.now().isoformat()}"
                admin_msg.attach(MIMEText(admin_plain, "plain"))

                await aiosmtplib.send(
                    admin_msg,
                    hostname=SMTP_HOST,
                    port=SMTP_PORT,
                    username=smtp_user,
                    password=smtp_pass,
                    start_tls=True,
                    timeout=5.0
                )
            except Exception as e:
                logger.warning(f"⚠️ Admin email notification notice: {str(e)}")

        import asyncio
        asyncio.create_task(_dispatch_emails())
        logger.info(f"✅ Analysis report email queued for {patient_email}")
        return True

    except Exception as e:
        logger.error(f"❌ Failed to queue analysis report email to {patient_email}: {str(e)}")
        return False


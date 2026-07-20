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
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("SMTP_USER", "")          # e.g. medicuslabs.com@gmail.com
SMTP_PASS = os.getenv("SMTP_PASS", "")          # Gmail App Password (16-char)
SENDER_NAME = "Medicus Labs™"


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
                    <a href="https://medicuslabs.com/analysis"
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
                This email was sent to <strong>{subscriber_email}</strong> because you subscribed at medicuslabs.com.
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
    Sends a welcome/confirmation email to a new subscriber via Gmail SMTP.
    Returns True on success, False on failure.
    """
    if not SMTP_USER or not SMTP_PASS:
        logger.error("❌ SMTP credentials not configured. Set SMTP_USER and SMTP_PASS in .env")
        return False

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Welcome to Medicus Labs™ — You're Subscribed! 🎉"
        msg["From"] = f"{SENDER_NAME} <{SMTP_USER}>"
        msg["To"] = subscriber_email

        # Plain-text fallback
        plain = (
            f"Welcome to Medicus Labs!\n\n"
            f"Thank you for subscribing. You'll receive clinical research updates, "
            f"platform enhancements, and product releases.\n\n"
            f"Start your free skin analysis at https://medicuslabs.com/analysis\n\n"
            f"© {datetime.now().year} Medicus Labs™"
        )
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(_welcome_html(subscriber_email), "html"))

        logger.info(f"📧 Sending welcome email to: {subscriber_email}")

        await aiosmtplib.send(
            msg,
            hostname=SMTP_HOST,
            port=SMTP_PORT,
            username=SMTP_USER,
            password=SMTP_PASS,
            start_tls=True,
        )

        logger.info(f"✅ Welcome email delivered to: {subscriber_email}")
        return True

    except Exception as e:
        logger.error(f"❌ Failed to send welcome email to {subscriber_email}: {str(e)}")
        return False

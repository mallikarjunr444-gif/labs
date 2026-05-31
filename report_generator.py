"""
Report Generator Service
Generates professional healthcare analysis reports
"""

import os
import json
import logging
import re
from typing import Dict, Optional
from datetime import datetime
from jinja2 import Environment, select_autoescape

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
            now = datetime.now()
            timestamp = now.strftime("%Y%m%d_%H%M%S")
            report_id = f"RPT_{timestamp}"
            
            # Extract data
            patient = analysis_data.get("patient", {})
            condition = analysis_data.get("condition", "Unknown")
            confidence = analysis_data.get("confidence", 0)
            disease_data = analysis_data.get("disease_data", {})
            medical_guidance = disease_data.get("data", {}) if isinstance(disease_data, dict) else {}

            personalized_sections = self._generate_personalized_sections(
                patient=patient,
                condition=condition,
                confidence=confidence,
                guidance=medical_guidance,
            )
            report_sections = self._build_report_sections(
                condition,
                confidence,
                report_id,
                now,
                medical_guidance,
                personalized_sections,
            )
            
            # Prepare report data
            report_data = {
                "report_id": report_id,
                "timestamp": now.strftime("%Y-%m-%d %H:%M:%S"),
                "report_version": "2.0",
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
                    "risk_level": self._determine_risk_level(condition, confidence),
                    "isic_validated": analysis_data.get("isic_validation", True),
                    "severity": self._determine_severity(condition, confidence),
                    "urgent": self._is_urgent(condition),
                    "analysis_datetime": now.strftime("%B %d, %Y at %I:%M %p"),
                },
                "medical_guidance": medical_guidance,
                "sections": report_sections,
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
                    "urgent": self._is_urgent(condition),
                    "risk_level": self._determine_risk_level(condition, confidence),
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
        env = Environment(autoescape=select_autoescape(enabled_extensions=("html", "xml"), default=True))
        template = env.from_string(self.report_template)
        return template.render(
            report_id=data["report_id"],
            timestamp=data["timestamp"],
            report_version=data["report_version"],
            patient=data["patient"],
            analysis=data["analysis"],
            medical_guidance=data["medical_guidance"],
            sections=data["sections"],
            disclaimer=data["disclaimer"]
        )

    def _determine_risk_level(self, condition: str, confidence: float) -> str:
        """Map the detected condition to a concise risk level."""
        condition_lower = condition.lower()

        if self._is_urgent(condition):
            return "High"

        if confidence >= 85 and any(keyword in condition_lower for keyword in ["acne", "eczema", "rosacea", "vitiligo", "dermatitis", "ringworm"]):
            return "Low"

        return "Moderate"
    
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
        <div class="disclaimer-card">
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

    def _generate_personalized_sections(self, patient: Dict, condition: str, confidence: float, guidance: Dict) -> Dict:
        """Optionally personalize report sections via Groq if an API key is configured."""
        api_key = os.getenv("GROQ_API_KEY") or os.getenv("GORK_API_KEY")
        if not api_key:
            return {}

        try:
            import requests

            first_name = (patient.get("full_name") or "Patient").strip().split(" ")[0]
            prompt = {
                "patient": {
                    "first_name": first_name,
                    "age": patient.get("age", "N/A"),
                    "gender": patient.get("gender", "N/A"),
                },
                "condition": condition,
                "confidence": round(confidence, 1),
                "guidance": {
                    "symptoms": guidance.get("symptoms", []),
                    "precautions": guidance.get("precautions", []),
                    "home_care": guidance.get("home_care", []),
                    "skincare_support": guidance.get("skincare_support", []),
                },
            }

            system_instruction = (
                "You are a clinical report assistant for Medicus Labs. "
                "Return only strict JSON with concise, patient-safe language. "
                "No diagnosis certainty claims. "
                "Use this schema exactly: "
                "{\"overview\": string[3], \"clinical_findings\": string[6], \"symptoms\": string[6], "
                "\"skin_care\": string[6], \"home_care\": string[6], \"lifestyle\": string[5], "
                "\"warning_signs\": string[6], \"follow_up\": string[4], \"prevention_tips\": string[4]}."
            )

            payload = {
                "model": "llama-3.1-8b-instant",
                "temperature": 0.3,
                "response_format": {"type": "json_object"},
                "messages": [
                    {"role": "system", "content": system_instruction},
                    {"role": "user", "content": json.dumps(prompt)},
                ],
            }

            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json=payload,
                timeout=12,
            )
            response.raise_for_status()

            content = response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
            parsed = self._extract_json_object(content)
            if not isinstance(parsed, dict):
                return {}

            return {
                "overview": self._sanitize_list(parsed.get("overview"), 3),
                "clinical_findings": self._sanitize_list(parsed.get("clinical_findings"), 6),
                "symptoms": self._sanitize_list(parsed.get("symptoms"), 6),
                "skin_care": self._sanitize_list(parsed.get("skin_care"), 6),
                "home_care": self._sanitize_list(parsed.get("home_care"), 6),
                "lifestyle": self._sanitize_list(parsed.get("lifestyle"), 5),
                "warning_signs": self._sanitize_list(parsed.get("warning_signs"), 6),
                "follow_up": self._sanitize_list(parsed.get("follow_up"), 4),
                "prevention_tips": self._sanitize_list(parsed.get("prevention_tips"), 4),
            }
        except Exception as e:
            logger.warning(f"Groq personalization unavailable, using defaults: {str(e)}")
            return {}

    def _extract_json_object(self, content: str):
        """Extract JSON object from model content robustly."""
        if not content:
            return {}

        try:
            return json.loads(content)
        except Exception:
            match = re.search(r"\{.*\}", content, flags=re.DOTALL)
            if not match:
                return {}
            try:
                return json.loads(match.group(0))
            except Exception:
                return {}

    def _sanitize_list(self, value, max_items: int) -> list:
        """Normalize model output into a bounded list of plain strings."""
        if isinstance(value, list):
            cleaned = [str(v).strip() for v in value if str(v).strip()]
            return cleaned[:max_items]
        return []

    def _build_report_sections(
        self,
        condition: str,
        confidence: float,
        report_id: str,
        now: datetime,
        guidance: Dict,
        personalized: Optional[Dict] = None,
    ) -> list:
        """Build the standardized report sections for any detected skin condition."""
        personalized = personalized or {}

        return [
            {
                "number": 1,
                "title": "AI Assessment Summary",
                "kind": "summary",
                "rows": [
                    ("Condition Detected", condition),
                    ("Risk Level", self._determine_risk_level(condition, confidence)),
                    ("AI Confidence Score", f"{confidence:.1f}%"),
                    ("Analysis Date & Time", now.strftime("%B %d, %Y at %I:%M %p")),
                    ("Report ID", report_id),
                ],
            },
            {
                "number": 2,
                "title": "Detailed Condition Overview",
                "kind": "bullets",
                "lede": condition,
                "items": personalized.get("overview") or self._build_condition_overview(condition, guidance),
            },
            {
                "number": 3,
                "title": "Clinical Findings",
                "kind": "bullets",
                "items": personalized.get("clinical_findings") or self._build_clinical_findings(condition),
            },
            {
                "number": 4,
                "title": "Symptoms Associated With This Condition",
                "kind": "bullets",
                "items": personalized.get("symptoms") or guidance.get("symptoms") or self._default_symptoms(condition),
            },
            {
                "number": 5,
                "title": "Skin Care Recommendations",
                "kind": "bullets",
                "items": personalized.get("skin_care") or guidance.get("skincare_support") or self._default_skincare_recommendations(),
            },
            {
                "number": 6,
                "title": "Home Care Recommendations",
                "kind": "bullets",
                "items": personalized.get("home_care") or guidance.get("home_care") or self._default_home_care(),
            },
            {
                "number": 7,
                "title": "Lifestyle Recommendations",
                "kind": "bullets",
                "items": personalized.get("lifestyle") or self._default_lifestyle_recommendations(),
            },
            {
                "number": 8,
                "title": "Warning Signs Requiring Immediate Medical Attention",
                "kind": "bullets",
                "items": personalized.get("warning_signs") or self._warning_signs(condition),
                "alert": True,
            },
            {
                "number": 9,
                "title": "Follow-Up Recommendations",
                "kind": "bullets",
                "items": personalized.get("follow_up") or self._follow_up_recommendations(condition),
            },
            {
                "number": 10,
                "title": "Educational Section",
                "kind": "subsection",
                "subtitle": "Prevention Tips",
                "items": personalized.get("prevention_tips") or self._prevention_tips(condition),
            },
            {
                "number": 11,
                "title": "Recommended Products Section",
                "kind": "products",
                "subtitle": "Skin Care Essentials",
                "items": self._recommended_products(),
            },
            {
                "number": 12,
                "title": "Report Footer",
                "kind": "footer",
            },
        ]

    def _build_condition_overview(self, condition: str, guidance: Dict) -> list:
        condition_lower = condition.lower()

        overview_map = {
            "melanoma": [
                "Melanoma is a serious type of skin cancer that develops from pigment-producing cells.",
                "Early detection significantly improves treatment outcomes.",
                "Further medical evaluation is recommended immediately.",
            ],
            "acne": [
                "Acne is a common inflammatory skin condition involving blocked pores, oil production, and bacteria.",
                "Mild to moderate acne often improves with a consistent skincare routine and medical guidance.",
                "Persistent or scarring acne should be reviewed by a dermatologist.",
            ],
            "eczema": [
                "Eczema is a chronic inflammatory condition that weakens the skin barrier and causes dryness and irritation.",
                "Flare-ups are often triggered by environmental irritants, stress, or harsh products.",
                "Moisturizing and trigger control are important parts of long-term management.",
            ],
            "psoriasis": [
                "Psoriasis is an immune-mediated skin condition that creates red, scaly plaques.",
                "It can fluctuate over time and may require ongoing medical management.",
                "A dermatologist should guide treatment when plaques are persistent or extensive.",
            ],
            "rosacea": [
                "Rosacea commonly affects the central face and can cause persistent redness and visible vessels.",
                "Triggers such as heat, alcohol, and spicy foods may worsen symptoms.",
                "Gentle skin care and medical review can reduce flares.",
            ],
            "vitiligo": [
                "Vitiligo causes loss of skin pigmentation in localized or widespread areas.",
                "It is usually not painful, but the cosmetic impact can be significant.",
                "Dermatology review can help confirm diagnosis and discuss treatment options.",
            ],
            "dermatitis": [
                "Dermatitis refers to skin inflammation that may be related to irritation, allergy, or barrier disruption.",
                "Symptoms usually improve when triggers are avoided and the skin barrier is restored.",
                "Repeated or widespread inflammation warrants medical evaluation.",
            ],
            "ringworm": [
                "Ringworm is a contagious fungal infection that often forms a circular rash.",
                "It generally responds well to targeted antifungal treatment.",
                "Good hygiene and avoiding shared personal items help limit spread.",
            ],
        }

        for key, lines in overview_map.items():
            if key in condition_lower:
                return lines

        condition_label = guidance.get("condition") or condition
        return [
            f"{condition_label} has been flagged by the AI screening workflow and should be interpreted in clinical context.",
            "The report combines AI prediction, dermatologic guidance, and safety recommendations for follow-up.",
            "If the lesion is changing, painful, bleeding, or unusual, a dermatologist should review it promptly.",
        ]

    def _build_clinical_findings(self, condition: str) -> list:
        condition_lower = condition.lower()

        if "melanoma" in condition_lower:
            return [
                "Lesion Color Analysis: Multiple shades or uneven pigmentation may be present.",
                "Border Analysis: Borders can appear irregular, blurred, or notched.",
                "Symmetry Assessment: Asymmetry is a common warning feature.",
                "Diameter Estimation: Lesions larger than 6 mm require careful review.",
                "Texture Characteristics: Surface may become elevated, crusted, or uneven.",
                "Suspicious Features Detected: Color change, bleeding, or rapid evolution.",
            ]

        if any(keyword in condition_lower for keyword in ["acne", "dermatitis", "eczema"]):
            return [
                "Lesion Color Analysis: Redness and inflammatory discoloration may be present.",
                "Border Analysis: Lesions are often diffuse or patchy rather than sharply circumscribed.",
                "Symmetry Assessment: Distribution may be bilateral or clustered across exposed areas.",
                "Diameter Estimation: Lesion size varies from small papules to larger patches.",
                "Texture Characteristics: Surface may feel rough, dry, bumpy, or irritated.",
                "Suspicious Features Detected: Spreading inflammation, excoriation, or secondary irritation.",
            ]

        if "psoriasis" in condition_lower:
            return [
                "Lesion Color Analysis: Erythematous plaques with silvery scale may be visible.",
                "Border Analysis: Lesions are often well-demarcated and plaque-like.",
                "Symmetry Assessment: Symmetric involvement is common on elbows, knees, or scalp.",
                "Diameter Estimation: Plaques can enlarge and merge over time.",
                "Texture Characteristics: Thickened scale and dry plaque texture are typical.",
                "Suspicious Features Detected: Fissuring, cracking, or extensive plaque burden.",
            ]

        if "rosacea" in condition_lower:
            return [
                "Lesion Color Analysis: Persistent facial erythema or flushing may be present.",
                "Border Analysis: Redness may fade gradually into surrounding skin.",
                "Symmetry Assessment: Central facial distribution is common.",
                "Diameter Estimation: Areas of involvement often expand across cheeks or nose.",
                "Texture Characteristics: Skin may feel sensitive, warm, or slightly rough.",
                "Suspicious Features Detected: Recurrent flushing or visible vascular changes.",
            ]

        if "vitiligo" in condition_lower:
            return [
                "Lesion Color Analysis: Well-defined depigmented or hypopigmented patches may be seen.",
                "Border Analysis: Borders are often sharp and clearly demarcated.",
                "Symmetry Assessment: Lesions may appear symmetric or segmental depending on subtype.",
                "Diameter Estimation: Patch size can vary from focal to widespread involvement.",
                "Texture Characteristics: Skin texture is usually preserved without scale.",
                "Suspicious Features Detected: New spreading patches or associated scalp involvement.",
            ]

        if "ringworm" in condition_lower:
            return [
                "Lesion Color Analysis: Annular erythematous patches may have a darker active edge.",
                "Border Analysis: Borders can be circular and more pronounced than the center.",
                "Symmetry Assessment: One or multiple ring-like lesions may be present.",
                "Diameter Estimation: Lesions can expand outward over time.",
                "Texture Characteristics: Scaling or flaky surface texture is common.",
                "Suspicious Features Detected: Spreading ring pattern or itching with satellite lesions.",
            ]

        return [
            "Lesion Color Analysis: AI detected a skin abnormality that should be reviewed in context.",
            "Border Analysis: Border clarity varies depending on the underlying condition.",
            "Symmetry Assessment: Symmetry and distribution should be compared across both sides of the body.",
            "Diameter Estimation: Lesion size should be documented and tracked over time.",
            "Texture Characteristics: Surface texture may indicate inflammation, scaling, or other changes.",
            "Suspicious Features Detected: Any rapid evolution, bleeding, or persistent pain should be escalated.",
        ]

    def _default_symptoms(self, condition: str) -> list:
        condition_lower = condition.lower()
        if "melanoma" in condition_lower:
            return ["Asymmetrical mole", "Irregular borders", "Multiple colors in one lesion", "Itching or bleeding"]
        return ["Itching", "Burning sensation", "Bleeding", "Rapid growth", "Color changes", "Pain or discomfort"]

    def _default_skincare_recommendations(self) -> list:
        return [
            "Use broad-spectrum SPF 50 sunscreen daily.",
            "Avoid direct sunlight between 10 AM and 4 PM.",
            "Use gentle skin cleansers.",
            "Apply dermatologist-approved moisturizer.",
            "Avoid harsh chemical products.",
            "Maintain proper skin hydration.",
        ]

    def _default_home_care(self) -> list:
        return [
            "Keep affected skin clean and dry.",
            "Wear protective clothing outdoors.",
            "Avoid scratching or irritating the area.",
            "Monitor changes weekly.",
            "Take photographs to track progression.",
            "Maintain healthy sleep and hydration.",
        ]

    def _default_lifestyle_recommendations(self) -> list:
        return [
            "Balanced diet rich in fruits and vegetables.",
            "Reduce smoking and alcohol consumption.",
            "Exercise regularly.",
            "Manage stress levels.",
            "Maintain healthy body weight.",
        ]

    def _warning_signs(self, condition: str) -> list:
        return [
            "Rapid increase in size",
            "Bleeding lesion",
            "Severe pain",
            "Multiple color changes",
            "Irregular borders",
            "Sudden skin changes",
        ]

    def _follow_up_recommendations(self, condition: str) -> list:
        return [
            "Self-examination every month.",
            "Dermatologist review within 1–4 weeks.",
            "Regular skin screening schedule.",
            "Compare with previous reports.",
        ]

    def _prevention_tips(self, condition: str) -> list:
        return [
            "Apply sunscreen every 2–3 hours.",
            "Wear hats and sunglasses.",
            "Avoid tanning beds.",
            "Protect skin during outdoor activities.",
        ]

    def _recommended_products(self) -> list:
        return [
            {"name": "SPF 50 Sunscreen", "url": "https://www.1mg.com/"},
            {"name": "Gentle Face Cleanser", "url": "https://www.apollopharmacy.in/"},
            {"name": "Moisturizing Cream", "url": "https://pharmeasy.in/"},
            {"name": "Vitamin C Serum", "url": "https://www.1mg.com/"},
            {"name": "Skin Barrier Repair Cream", "url": "https://www.apollopharmacy.in/"},
        ]
    
    def _get_report_template(self) -> str:
        """Get HTML report template"""
        return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicus Labs - Professional Dermatology Report</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; background: #f8fafc; }
        .container { max-width: 980px; margin: 0 auto; padding: 32px 20px 48px; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #0ea5e9 100%); color: #fff; border-radius: 24px; padding: 32px; margin-bottom: 22px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12); }
        .eyebrow { letter-spacing: 0.18em; text-transform: uppercase; font-size: 11px; font-weight: 700; opacity: 0.8; }
        .logo { font-size: 30px; font-weight: 800; margin: 10px 0 6px; }
        .subtitle { font-size: 15px; opacity: 0.9; max-width: 760px; line-height: 1.6; }
        .meta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }
        .meta-pill { background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.16); padding: 10px 14px; border-radius: 999px; font-size: 12px; font-weight: 600; }
        .condition-box { margin-top: 22px; background: rgba(255,255,255,0.12); border-radius: 20px; padding: 18px; border: 1px solid rgba(255,255,255,0.14); }
        .condition-name { font-size: 28px; font-weight: 800; margin-bottom: 8px; }
        .confidence { font-size: 17px; font-weight: 600; margin-bottom: 12px; }
        .confidence-bar { background: rgba(255,255,255,0.18); height: 12px; border-radius: 999px; overflow: hidden; }
        .confidence-fill { background: #fff; height: 100%; width: {{ analysis.confidence_numeric }}%; }
        .section { margin: 18px 0; padding: 24px; background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04); }
        .section-title { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 16px; }
        .section-title span { color: #0ea5e9; margin-right: 8px; }
        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; }
        .summary-item { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 14px 16px; }
        .summary-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 6px; font-weight: 700; }
        .summary-value { font-size: 15px; font-weight: 700; color: #0f172a; line-height: 1.4; }
        .lede { font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 14px; }
        .bullet-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
        .bullet-list li { display: flex; gap: 10px; font-size: 14px; line-height: 1.6; color: #334155; }
        .bullet-dot { color: #0ea5e9; font-size: 18px; line-height: 1; flex-shrink: 0; }
        .alert-box { background: #fff7ed; border: 1px solid #fed7aa; }
        .alert-box .section-title { color: #c2410c; }
        .subheading { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 14px; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
        .product-card { display: flex; flex-direction: column; justify-content: space-between; gap: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; min-height: 128px; }
        .product-name { font-weight: 800; color: #0f172a; line-height: 1.4; }
        .buy-buttons { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 18px; }
        .buy-button { display: inline-flex; align-items: center; gap: 8px; padding: 12px 16px; border-radius: 999px; background: linear-gradient(135deg, #0ea5e9, #2563eb); color: #fff; text-decoration: none; font-size: 13px; font-weight: 700; }
        .footer-card { background: linear-gradient(180deg, #f8fafc 0%, #eef6fb 100%); }
        .footer-card p { font-size: 14px; line-height: 1.7; color: #334155; margin-bottom: 10px; }
        .footer-version { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; font-size: 13px; font-weight: 700; color: #0f172a; }
        .disclaimer-card { background: #fff7ed; border: 1px solid #fdba74; border-radius: 16px; padding: 18px; margin-top: 16px; }
        .disclaimer-card h3 { color: #9a3412; margin-bottom: 10px; font-size: 16px; }
        .disclaimer-card p, .disclaimer-card li { color: #9a3412; line-height: 1.65; font-size: 13px; }
        .disclaimer-card ul { margin: 10px 0 12px 20px; }
        .footer { text-align: center; margin-top: 26px; color: #64748b; font-size: 12px; line-height: 1.6; }
        @media print {
            body { background: #fff; }
            .container { padding: 0; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="eyebrow">Clinical Dermatology Report</div>
            <div class="logo">🏥 Medicus Labs™</div>
            <div class="subtitle">Professional AI-assisted dermatology report designed for screening, patient education, and clinical review.</div>
            <div class="meta-row">
                <div class="meta-pill">Report ID: {{ report_id }}</div>
                <div class="meta-pill">Generated: {{ timestamp }}</div>
                <div class="meta-pill">Version: {{ report_version }}</div>
                <div class="meta-pill">Analysis Time: {{ analysis.analysis_datetime }}</div>
            </div>
            <div class="condition-box">
                <div class="condition-name">{{ analysis.condition }}</div>
                <div class="confidence">AI Confidence Score: {{ analysis.confidence }}</div>
                <div class="confidence-bar"><div class="confidence-fill"></div></div>
                <div style="margin-top: 12px; font-size: 13px; opacity: 0.95;">Risk Level: {{ analysis.risk_level }} | ISIC Validation: {% if analysis.isic_validated %}Validated{% else %}Pending{% endif %}</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title"><span>1.</span>AI Assessment Summary</div>
            <div class="summary-grid">
                {% for label, value in sections[0]['rows'] %}
                <div class="summary-item">
                    <div class="summary-label">{{ label }}</div>
                    <div class="summary-value">{{ value }}</div>
                </div>
                {% endfor %}
            </div>
        </div>

        {% for section in sections[1:11] %}
        <div class="section {% if section.alert %}alert-box{% endif %}">
            <div class="section-title"><span>{{ section.number }}.</span>{{ section.title }}</div>
            {% if section.kind == 'bullets' %}
            {% if section.lede %}<div class="lede">{{ section.lede }}</div>{% endif %}
            <ul class="bullet-list">
                {% for item in section['items'] %}
                <li><span class="bullet-dot">•</span><span>{{ item }}</span></li>
                {% endfor %}
            </ul>
            {% elif section.kind == 'subsection' %}
            <div class="subheading">{{ section.subtitle }}</div>
            <ul class="bullet-list">
                {% for item in section['items'] %}
                <li><span class="bullet-dot">•</span><span>{{ item }}</span></li>
                {% endfor %}
            </ul>
            {% elif section.kind == 'products' %}
            <div class="subheading">{{ section.subtitle }}</div>
            <div class="product-grid">
                {% for item in section['items'] %}
                <div class="product-card">
                    <div class="product-name">{{ item.name }}</div>
                    <a class="buy-button" href="{{ item.url }}" target="_blank" rel="noreferrer">🛒 Buy</a>
                </div>
                {% endfor %}
            </div>
            <div class="buy-buttons">
                <a class="buy-button" href="https://www.1mg.com/" target="_blank" rel="noreferrer">🛒 Buy from Tata 1mg</a>
                <a class="buy-button" href="https://www.apollopharmacy.in/" target="_blank" rel="noreferrer">🛒 Buy from Apollo Pharmacy</a>
                <a class="buy-button" href="https://pharmeasy.in/" target="_blank" rel="noreferrer">🛒 Buy from PharmEasy</a>
            </div>
            {% endif %}
        </div>
        {% endfor %}

        <div class="section footer-card">
            <div class="section-title"><span>12.</span>Report Footer</div>
            <p>This report is generated using Medicus Labs AI technology.</p>
            <p>This assessment is intended for screening and educational purposes only and should not replace consultation with a qualified healthcare professional.</p>
            <div class="footer-version">
                <div>Generated by Medicus Labs AI</div>
                <div>Report Version: 2.0</div>
            </div>
            {{ disclaimer | safe }}
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

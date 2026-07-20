"""
Groq Vision Integration Service
Handles AI-powered skin disease validation and analysis using Groq Qwen Vision API
"""

import os
import base64
import logging
import httpx
from typing import Dict, Optional
from pathlib import Path

logger = logging.getLogger(__name__)

# Condition database with severity and recommendations
CONDITIONS_DB = {
    "Acne Vulgaris": {
        "severity": "Mild-Variable",
        "severity_level": "low",
        "color": "#ec4899",
        "description": "Common skin condition with pimples, blackheads, and inflamed tissue.",
        "recommendations": [
            "Use a gentle salicylic acid cleanser twice daily",
            "Apply non-comedogenic moisturizer",
            "Avoid touching or picking at affected areas",
            "Consider OTC benzoyl peroxide treatment",
            "Consult a dermatologist if persistent or severe",
        ],
        "precautions": [
            "Avoid oily/greasy skincare products",
            "Change pillowcases frequently",
            "Manage stress levels",
            "Follow a balanced diet low in refined sugars",
        ],
    },
    "Melanoma": {
        "severity": "High",
        "severity_level": "high",
        "color": "#6b7280",
        "description": "Serious form of skin cancer requiring immediate medical attention. Characterized by unusual moles or pigmented spots.",
        "recommendations": [
            "Consult with a dermatologist IMMEDIATELY",
            "Avoid sun exposure completely",
            "Monitor the lesion for changes in size, shape, or color",
            "Do not attempt to remove or scratch the lesion",
            "Bring this analysis to your medical appointment",
        ],
        "precautions": [
            "Seek urgent medical evaluation",
            "Apply SPF 50+ sunscreen if going outside",
            "Document any changes with photos",
            "Check for ABCDE signs (Asymmetry, Border, Color, Diameter, Evolving)",
        ],
    },
    "Eczema": {
        "severity": "Medium",
        "severity_level": "medium",
        "color": "#f97316",
        "description": "Inflammatory condition causing itching, redness, and irritated skin patches.",
        "recommendations": [
            "Apply fragrance-free moisturizer frequently",
            "Use mild, non-soap cleansers",
            "Avoid known triggers and irritants",
            "Apply cool compresses to reduce itching",
            "Consult a dermatologist for prescription options",
        ],
        "precautions": [
            "Avoid hot showers and harsh soaps",
            "Wear soft, breathable fabrics",
            "Manage stress which can trigger flare-ups",
            "Keep nails short to avoid scratching damage",
        ],
    },
    "Psoriasis": {
        "severity": "Medium-High",
        "severity_level": "medium",
        "color": "#ef4444",
        "description": "Autoimmune disorder causing rapid skin cell buildup and scaling patches.",
        "recommendations": [
            "Apply moisturizer immediately after bathing",
            "Use medicated shampoos for scalp involvement",
            "Consider phototherapy under medical supervision",
            "Follow up with a dermatologist for treatment plan",
            "Track flare-ups to identify triggers",
        ],
        "precautions": [
            "Avoid skin injuries and infections",
            "Manage stress levels",
            "Limit alcohol consumption",
            "Be cautious with certain medications",
        ],
    },
    "Rosacea": {
        "severity": "Mild-Medium",
        "severity_level": "low",
        "color": "#a855f7",
        "description": "Chronic condition causing facial flushing and visible blood vessels.",
        "recommendations": [
            "Identify and avoid personal triggers",
            "Use gentle skincare products for sensitive skin",
            "Apply SPF 30+ sunscreen daily",
            "Consider prescription topical treatments",
            "Consult a dermatologist for management plan",
        ],
        "precautions": [
            "Avoid spicy foods, hot drinks, and alcohol",
            "Protect face from extreme weather",
            "Avoid harsh exfoliants",
            "Use lukewarm water for facial cleansing",
        ],
    },
    "Vitiligo": {
        "severity": "Mild",
        "severity_level": "low",
        "color": "#94a3b8",
        "description": "Pigment disorder causing loss of skin color in patches.",
        "recommendations": [
            "Apply broad-spectrum SPF 50+ sunscreen",
            "Consult a dermatologist about treatment options",
            "Consider cosmetic camouflage if desired",
            "Monitor for new patches",
            "Join support groups for emotional well-being",
        ],
        "precautions": [
            "Protect depigmented areas from sunburn",
            "Avoid skin trauma which may trigger new patches",
            "Be patient with treatment (results take time)",
            "Seek psychological support if needed",
        ],
    },
    "Dermatitis": {
        "severity": "Mild-Medium",
        "severity_level": "low",
        "color": "#eab308",
        "description": "Inflammatory skin reaction causing itching, rash, and irritation.",
        "recommendations": [
            "Identify and avoid the irritant or allergen",
            "Apply over-the-counter hydrocortisone cream",
            "Use cool, wet compresses on affected areas",
            "Apply fragrance-free moisturizer regularly",
            "Consult a dermatologist if persistent",
        ],
        "precautions": [
            "Avoid known allergens and irritants",
            "Wear protective gloves when handling chemicals",
            "Use hypoallergenic products",
            "Avoid scratching to prevent infection",
        ],
    },
    "Fungal Infection": {
        "severity": "Variable",
        "severity_level": "low",
        "color": "#22c55e",
        "description": "Infections caused by fungi with diverse skin manifestations including ringworm and athlete's foot.",
        "recommendations": [
            "Apply OTC antifungal cream (clotrimazole/terbinafine)",
            "Keep affected area clean and dry",
            "Avoid sharing personal items",
            "Complete the full course of treatment",
            "Consult a doctor if no improvement in 2 weeks",
        ],
        "precautions": [
            "Keep skin clean and dry",
            "Wear breathable footwear",
            "Change socks and underwear daily",
            "Avoid walking barefoot in public areas",
        ],
    },
    "Healthy Skin": {
        "severity": "None",
        "severity_level": "none",
        "color": "#22d3ee",
        "description": "No significant dermatological conditions detected. Skin appears healthy.",
        "recommendations": [
            "Continue regular skincare routine",
            "Apply SPF 30+ sunscreen daily",
            "Stay hydrated and maintain a balanced diet",
            "Schedule annual skin check-ups",
            "Monitor for any new or changing skin spots",
        ],
        "precautions": [
            "Protect skin from excessive sun exposure",
            "Avoid smoking and excessive alcohol",
            "Maintain a consistent skincare regimen",
            "Perform regular self-examinations",
        ],
    },
}


class GrokVisionService:
    """
    Sends skin images to Groq Vision API for dermatological analysis.
    Falls back to local heuristic checking when unavailable.
    """

    def __init__(self):
        # Default to the Groq API key supplied by the environment
        self.api_key = os.getenv("GROQ_API_KEY") or os.getenv("XAI_API_KEY")
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"
        self.model = "qwen/qwen3.6-27b"

    async def validate_skin_image(self, image_path: str) -> dict:
        """
        Verify if the uploaded image is actually human skin or a skin condition.
        Returns:
            dict: {"is_skin": bool, "reason": str}
        """
        if not self.api_key:
            return {"is_skin": True, "reason": "No API key configured. Skipping validation."}

        try:
            # Resize image to save tokens
            from PIL import Image
            import io
            
            img = Image.open(image_path)
            img.thumbnail((300, 300))
            
            buffered = io.BytesIO()
            img.save(buffered, format="JPEG", quality=85)
            image_data = base64.b64encode(buffered.getvalue()).decode("utf-8")

            prompt = (
                "You are a medical verification assistant. Check if the image shows human skin or a skin condition (acne, rash, mole, lesion, etc.). "
                "Respond ONLY with a JSON object inside markdown code block:\n"
                "```json\n"
                "{\n"
                '  "is_skin": true/false,\n'
                '  "reason": "Explain in 1 clear sentence why this is or is not human skin."\n'
                "}\n"
                "```"
            )

            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{image_data}"
                                }
                            }
                        ]
                    }
                ],
                "temperature": 0.0,
                "max_tokens": 400
            }

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }

            logger.info("Verifying image skin classification via Groq Vision API...")
            async with httpx.AsyncClient(timeout=25.0) as client:
                response = await client.post(self.api_url, json=payload, headers=headers)
                
            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                
                # Parse JSON
                import re
                import json
                
                json_match = re.search(r'```json\s*(\{.*?\}).*?```', content, re.DOTALL)
                if json_match:
                    parsed = json.loads(json_match.group(1))
                    return {
                        "is_skin": parsed.get("is_skin", True),
                        "reason": parsed.get("reason", "Verification complete.")
                    }
                
                brace_start = content.find('{')
                brace_end = content.rfind('}')
                if brace_start != -1 and brace_end != -1:
                    parsed = json.loads(content[brace_start:brace_end + 1])
                    return {
                        "is_skin": parsed.get("is_skin", True),
                        "reason": parsed.get("reason", "Verification complete.")
                    }
                    
            elif response.status_code == 429:
                logger.warning("Groq API rate limit during validation. Retrying once after short delay...")
                import asyncio
                await asyncio.sleep(3.0)
                async with httpx.AsyncClient(timeout=25.0) as client:
                    response = await client.post(self.api_url, json=payload, headers=headers)
                if response.status_code == 200:
                    content = response.json()["choices"][0]["message"]["content"]
                    json_match = re.search(r'```json\s*(\{.*?\}).*?```', content, re.DOTALL)
                    if json_match:
                        parsed = json.loads(json_match.group(1))
                        return {
                            "is_skin": parsed.get("is_skin", True),
                            "reason": parsed.get("reason", "Verification complete.")
                        }
            
            logger.error(f"Groq validation failed with status {response.status_code}. Defaulting to True.")
            return {"is_skin": True, "reason": "API error. Skipping validation."}

        except Exception as e:
            logger.error(f"Error during skin image validation: {str(e)}")
            return {"is_skin": True, "reason": f"Exception encountered: {str(e)}. Skipping validation."}

    async def analyze_skin_image(self, image_path: str) -> Dict:
        """
        Analyze a skin image using Groq Vision API.

        Returns a structured result with condition, confidence, severity, and recommendations.
        """
        import time
        start_time = time.time()
        logger.info(f"📁 Starting AI Inference pipeline for image: {image_path}")

        if not self.api_key:
            logger.error("❌ Groq API key is missing. Cannot perform image analysis.")
            raise RuntimeError("API key is not configured for Groq Vision service.")

        try:
            # 1. Preprocessing
            logger.info("⚙️ Preprocessing image: Loading with Pillow...")
            from PIL import Image
            import io
            
            img = Image.open(image_path)
            orig_w, orig_h = img.size
            logger.info(f"📸 Original image resolution: {orig_w}x{orig_h}, Format: {img.format}, Mode: {img.mode}")
            
            # Resizing to 500x500 standard dimensions while preserving aspect ratio
            img.thumbnail((500, 500))
            new_w, new_h = img.size
            logger.info(f"📐 Resized image to: {new_w}x{new_h} for model input compliance")
            
            buffered = io.BytesIO()
            img.save(buffered, format="JPEG", quality=85)
            resized_bytes = len(buffered.getvalue())
            logger.info(f"📦 Preprocessed image size: {resized_bytes / 1024:.2f} KB (JPEG encoded)")
            
            image_data = base64.b64encode(buffered.getvalue()).decode("utf-8")

            # 2. Model Inference Call
            logger.info(f"🧠 Initiating model inference with {self.model} model on Groq...")
            prompt = """You are a board-certified dermatologist AI assistant. Analyze this skin image and provide a clinical assessment.

IMPORTANT: Respond ONLY with a valid JSON block inside markdown code tags:
```json
{
  "condition": "One of: Acne Vulgaris, Melanoma, Eczema, Psoriasis, Rosacea, Vitiligo, Dermatitis, Fungal Infection, Healthy Skin",
  "confidence": <number between 0 and 100>,
  "severity": "One of: None, Mild, Mild-Medium, Medium, Medium-High, High, Variable",
  "description": "Brief clinical description of findings (1-2 sentences)",
  "key_findings": ["finding1", "finding2", "finding3"],
  "symptoms": {
    "redness": <0-100>,
    "scaling": <0-100>,
    "itching": <0-100>,
    "inflammation": <0-100>,
    "pigmentation": <0-100>
  },
  "differential_diagnoses": [
    {"condition": "name", "probability": <0-100>},
    {"condition": "name", "probability": <0-100>},
    {"condition": "name", "probability": <0-100>}
  ]
}
```

Analyze carefully. If the image does not show a clear skin condition or appears normal, classify as "Healthy Skin" with appropriate confidence. Do NOT default to Melanoma."""

            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{image_data}"
                                },
                            },
                        ],
                    }
                ],
                "temperature": 0.2,
                "max_tokens": 1000,
            }

            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json",
            }

            async with httpx.AsyncClient(timeout=45.0) as client:
                response = await client.post(
                    self.api_url,
                    json=payload,
                    headers=headers,
                )

            processing_time_ms = int((time.time() - start_time) * 1000)
            logger.info(f"⏱️ Model HTTP request completed in {processing_time_ms} ms. Status code: {response.status_code}")

            if response.status_code == 200:
                result = response.json()
                content = result["choices"][0]["message"]["content"]
                logger.info(f"📥 Received assistant output (length: {len(content)} chars)")

                # Parse JSON from response
                parsed = self._parse_grok_response(content)
                if parsed:
                    parsed["model_version"] = self.model
                    parsed["processing_time_ms"] = processing_time_ms
                    logger.info(f"✅ Prediction success: {parsed.get('condition')} ({parsed.get('confidence')}%)")
                    return parsed
                else:
                    logger.error("❌ Failed to parse JSON format from Groq vision assistant content.")
                    raise RuntimeError("Failed to parse visual prediction JSON output from AI model.")

            elif response.status_code == 429:
                logger.warning("⚠️ Groq API rate limit hit. Retrying once after 4s delay...")
                await asyncio.sleep(4.0)
                async with httpx.AsyncClient(timeout=45.0) as client:
                    response = await client.post(
                        self.api_url,
                        json=payload,
                        headers=headers,
                    )
                processing_time_ms = int((time.time() - start_time) * 1000)
                if response.status_code == 200:
                    result = response.json()
                    content = result["choices"][0]["message"]["content"]
                    parsed = self._parse_grok_response(content)
                    if parsed:
                        parsed["model_version"] = self.model
                        parsed["processing_time_ms"] = processing_time_ms
                        logger.info(f"✅ Prediction success on retry: {parsed.get('condition')} ({parsed.get('confidence')}%)")
                        return parsed
                
                logger.error(f"❌ Groq API error after rate limit retry: {response.status_code} - {response.text}")
                raise RuntimeError(f"AI Model rate limit exceeded: {response.text}")
            else:
                logger.error(f"❌ Groq API error status {response.status_code}: {response.text}")
                raise RuntimeError(f"AI Model inference error: {response.text}")

        except httpx.TimeoutException as te:
            logger.error("❌ Groq API connection timeout")
            raise RuntimeError(f"Connection timeout with AI prediction service: {str(te)}")
        except Exception as e:
            logger.error(f"❌ Exception in AI Inference pipeline: {str(e)}")
            raise RuntimeError(f"Dermatological prediction pipeline failed: {str(e)}")

    def _parse_grok_response(self, content: str) -> Optional[Dict]:
        """Parse the JSON response from Groq."""
        import json
        import re

        # Try to extract JSON from the response
        json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', content, re.DOTALL)
        if json_match:
            content = json_match.group(1)

        # Try direct JSON parse
        try:
            data = json.loads(content)
        except json.JSONDecodeError:
            # Try finding JSON object in the text
            brace_start = content.find('{')
            brace_end = content.rfind('}')
            if brace_start != -1 and brace_end != -1:
                try:
                    data = json.loads(content[brace_start:brace_end + 1])
                except json.JSONDecodeError:
                    return None
            else:
                return None

        # Validate and normalize the condition name
        condition = data.get("condition", "Healthy Skin")
        matched_condition = None
        for known in CONDITIONS_DB:
            if known.lower() in condition.lower():
                matched_condition = known
                break

        if not matched_condition:
            condition_lower = condition.lower()
            mappings = {
                "acne": "Acne Vulgaris",
                "melanoma": "Melanoma",
                "eczema": "Eczema",
                "atopic": "Eczema",
                "psoriasis": "Psoriasis",
                "rosacea": "Rosacea",
                "vitiligo": "Vitiligo",
                "dermatitis": "Dermatitis",
                "fungal": "Fungal Infection",
                "ringworm": "Fungal Infection",
                "tinea": "Fungal Infection",
                "healthy": "Healthy Skin",
                "normal": "Healthy Skin",
                "no condition": "Healthy Skin",
                "benign": "Healthy Skin",
            }
            for key, mapped in mappings.items():
                if key in condition_lower:
                    matched_condition = mapped
                    break

        if not matched_condition:
            matched_condition = "Healthy Skin"

        condition_info = CONDITIONS_DB[matched_condition]
        confidence = min(100, max(0, float(data.get("confidence", 50))))

        return {
            "condition": matched_condition,
            "confidence": confidence,
            "severity": data.get("severity", condition_info["severity"]),
            "severity_level": condition_info["severity_level"],
            "color": condition_info["color"],
            "description": data.get("description", condition_info["description"]),
            "key_findings": data.get("key_findings", []),
            "symptoms": data.get("symptoms", {
                "redness": 30, "scaling": 20, "itching": 25, "inflammation": 15, "pigmentation": 10
            }),
            "differential_diagnoses": data.get("differential_diagnoses", []),
            "recommendations": condition_info["recommendations"],
            "precautions": condition_info["precautions"],
        }

    def _fallback_analysis(self, image_path: str) -> Dict:
        """
        No fallback allowed. Raise an exception if inference fails.
        """
        logger.error(f"❌ AI Inference failed for image {image_path}. Fallbacks are disabled.")
        raise RuntimeError("The dermatology AI model failed to produce a prediction for this image.")


# Singleton instance
grok_service = GrokVisionService()

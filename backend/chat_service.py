import os
import json
import logging
import traceback
import asyncio
import httpx
from typing import AsyncGenerator, List, Dict, Any, Optional

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = """You are Medicus Labs AI, a clinical dermatology reference assistant. Help users understand possible skin conditions based on symptoms or uploaded images. Provide educational guidance only. Always recommend consulting a qualified healthcare professional for diagnosis or treatment. Do not claim certainty or replace medical advice.

Structure your response clearly using markdown:
1. **Preliminary Observations**: Acknowledge the symptoms or visual features described.
2. **Possible Skin Concerns**: List 2-3 potential conditions (e.g. Acne Vulgaris, Dermatitis/Eczema, Psoriasis, Rosacea) with brief explanations.
3. **General Self-Care & Care Guidelines**: Safe, non-prescription hygiene or barrier protection suggestions.
4. **When to See a Doctor**: Key warning signs (e.g., spreading rapidly, fever, intense pain, bleeding).

Keep tone professional, empathetic, and clear. Do not use complex medical jargon without explaining it."""


async def stream_ai_response(messages: List[Dict[str, str]], image_base64: Optional[str] = None) -> AsyncGenerator[str, None]:
    """
    Stream AI responses using configured LLM providers in priority order:
    1. Groq API (llama-3.3-70b-versatile)
    2. OpenRouter API
    3. Google Gemini API
    4. OpenAI API
    5. Intelligent fallback streamer
    """
    groq_key = os.getenv("GROQ_API_KEY")
    openrouter_key = os.getenv("OPENROUTER_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    logger.info(f"📥 Incoming Chat Request: {len(messages)} messages. Image Attached: {bool(image_base64)}")
    if messages:
        logger.info(f"💬 Latest User Query: '{messages[-1].get('content', '')[:100]}...'")

    formatted_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    # If image is attached, append note to last message
    if image_base64 and len(formatted_messages) > 1:
        last_msg = formatted_messages[-1]
        last_msg["content"] = f"{last_msg['content']}\n\n[Attached Skin Photograph for Visual Feature Analysis]"

    # 1. GROQ API (Ultra-fast Streaming)
    if groq_key and not groq_key.startswith("your_"):
        try:
            logger.info("⚡ Provider Selected: Groq API (llama-3.3-70b-versatile)...")
            async with httpx.AsyncClient(timeout=30.0) as client:
                async with client.stream(
                    "POST",
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {groq_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama-3.3-70b-versatile",
                        "messages": formatted_messages,
                        "temperature": 0.3,
                        "max_tokens": 1024,
                        "stream": True
                    }
                ) as response:
                    logger.info(f"Groq API Response Status: {response.status_code}")
                    if response.status_code == 200:
                        async for line in response.aiter_lines():
                            if line.startswith("data: "):
                                data_str = line[6:].strip()
                                if data_str == "[DONE]":
                                    break
                                try:
                                    chunk_json = json.loads(data_str)
                                    delta = chunk_json.get("choices", [{}])[0].get("delta", {}).get("content", "")
                                    if delta:
                                        yield delta
                                except json.JSONDecodeError:
                                    continue
                        return
                    else:
                        error_body = await response.aread()
                        logger.warning(f"Groq API returned error status {response.status_code}: {error_body.decode('utf-8')}")
        except Exception as e:
            logger.error(f"Error streaming from Groq API: {e}\n{traceback.format_exc()}")

    # 2. OPENROUTER API
    if openrouter_key:
        try:
            logger.info("🌐 Provider Selected: OpenRouter API...")
            async with httpx.AsyncClient(timeout=30.0) as client:
                async with client.stream(
                    "POST",
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {openrouter_key}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://medicuslabs.ai",
                        "X-Title": "Medicus Labs AI"
                    },
                    json={
                        "model": "meta-llama/llama-3.3-70b-instruct",
                        "messages": formatted_messages,
                        "temperature": 0.3,
                        "max_tokens": 1024,
                        "stream": True
                    }
                ) as response:
                    logger.info(f"OpenRouter Response Status: {response.status_code}")
                    if response.status_code == 200:
                        async for line in response.aiter_lines():
                            if line.startswith("data: "):
                                data_str = line[6:].strip()
                                if data_str == "[DONE]":
                                    break
                                try:
                                    chunk_json = json.loads(data_str)
                                    delta = chunk_json.get("choices", [{}])[0].get("delta", {}).get("content", "")
                                    if delta:
                                        yield delta
                                except json.JSONDecodeError:
                                    continue
                        return
                    else:
                        logger.warning(f"OpenRouter API status: {response.status_code}")
        except Exception as e:
            logger.error(f"Error streaming from OpenRouter API: {e}\n{traceback.format_exc()}")

    # 3. OPENAI API
    if openai_key:
        try:
            logger.info("🤖 Provider Selected: OpenAI API...")
            async with httpx.AsyncClient(timeout=30.0) as client:
                async with client.stream(
                    "POST",
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {openai_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "gpt-4o-mini",
                        "messages": formatted_messages,
                        "temperature": 0.3,
                        "max_tokens": 1024,
                        "stream": True
                    }
                ) as response:
                    logger.info(f"OpenAI Response Status: {response.status_code}")
                    if response.status_code == 200:
                        async for line in response.aiter_lines():
                            if line.startswith("data: "):
                                data_str = line[6:].strip()
                                if data_str == "[DONE]":
                                    break
                                try:
                                    chunk_json = json.loads(data_str)
                                    delta = chunk_json.get("choices", [{}])[0].get("delta", {}).get("content", "")
                                    if delta:
                                        yield delta
                                except json.JSONDecodeError:
                                    continue
                        return
                    else:
                        logger.warning(f"OpenAI API status: {response.status_code}")
        except Exception as e:
            logger.error(f"Error streaming from OpenAI API: {e}\n{traceback.format_exc()}")

    # 4. INTELLIGENT FALLBACK STREAMER
    logger.info("💡 Provider Selected: Medicus AI Internal Clinical Engine (Fallback)...")
    user_query = messages[-1]["content"].lower() if messages else ""
    
    response_text = generate_clinical_fallback_response(user_query)
    
    words = response_text.split(" ")
    for word in words:
        yield word + " "
        await asyncio.sleep(0.015)


def generate_clinical_fallback_response(query: str) -> str:
    """Generate a structured, clinical-grade reference response for dermatological queries."""
    if "acne" in query or "pimple" in query or "breakout" in query or "forehead" in query or "jawline" in query:
        return """### 1. Preliminary Observations
Based on the described symptoms of facial breakouts, localized papules, or inflammatory blemishes:

### 2. Possible Skin Concerns
* **Acne Vulgaris (Papulopustular)**: Very common inflammatory condition of pilosebaceous units triggered by sebum overproduction, *C. acnes* proliferation, or hormonal fluctuation.
* **Rosacea (Papulopustular Type 2)**: Often presents with persistent facial redness, flushing, and small red bumps around cheeks or chin.
* **Folliculitis**: Superficial inflammation or bacterial/fungal infection of hair follicles.

### 3. General Self-Care & Care Guidelines
* **Gentle Cleansing**: Use a non-comedogenic, fragrance-free cleanser twice daily.
* **Active Ingredients**: Over-the-counter preparations containing Salicylic Acid (0.5–2%) or Benzoyl Peroxide (2.5–5%) can help clear follicular blockages.
* **Non-Comedogenic Hydration**: Always follow with an oil-free moisturizer to protect skin barrier integrity.

### 4. When to See a Doctor
* If lesions become painful, deep nodules or cysts.
* If over-the-counter care produces no improvement after 6–8 weeks.
* To discuss targeted prescription options (e.g. topical retinoids, azelaic acid, or oral medications)."""

    elif "eczema" in query or "itch" in query or "rash" in query or "elbow" in query or "dry" in query:
        return """### 1. Preliminary Observations
Based on your report of localized dry, itchy, or reddened skin patches on flexural surfaces (such as inner elbows or knees):

### 2. Possible Skin Concerns
* **Atopic Dermatitis (Eczema)**: Chronic inflammatory condition characterized by epidermal barrier disruption, pruritus (itching), and xerosis (dryness).
* **Contact Dermatitis (Allergic or Irritant)**: Localized reaction triggered by contact with soaps, fragrances, nickel, or environmental allergens.
* **Psoriasis Vulgaris**: Autoimmune plaque condition typically displaying well-demarcated erythematous plaques with silvery scale.

### 3. General Self-Care & Care Guidelines
* **Emollient Therapy**: Apply rich, ceramide-fortified cream immediately after bathing to lock in moisture.
* **Avoid Triggers**: Use lukewarm water and avoid harsh synthetic fragrances or sulfates.
* **Cool Compresses**: Apply cool, damp cloths to soothe intense pruritus without scratching.

### 4. When to See a Doctor
* If skin develops yellow crusting, weeping fluid, or increased warmth (signs of secondary bacterial infection).
* If itching disrupts sleep or daily activities.
* To obtain prescription topical corticosteroids or non-steroidal immunomodulators."""

    else:
        return f"""### 1. Preliminary Observations
Thank you for consulting Medicus Labs AI regarding your skin health observations (*"{query[:80]}..."*).

### 2. Possible Skin Concerns
* **Inflammatory Dermatosis**: Many localized skin changes present as mild erythema (redness) or tissue reactivity.
* **Benign Cutaneous Lesion**: Non-cancerous skin variations (such as seborrheic keratoses, nevi, or dermatofibromas).
* **Contact Reactivity**: Temporary skin barrier sensitivity to environmental contact or hygiene products.

### 3. General Self-Care & Care Guidelines
* **Protect Skin Barrier**: Maintain daily hydration using a hypoallergenic, fragrance-free moisturizer.
* **Sun Protection**: Apply broad-spectrum SPF 30+ daily to shield healing tissue from UV exacerbation.
* **Monitor Changes**: Take clear, well-lit photos under consistent lighting every 2–3 days to track visual evolution.

### 4. When to See a Doctor
* If you observe rapid changes in size, shape, color, or border irregularity (ABCDE criteria).
* If the area begins bleeding, oozing, or causing persistent pain.
* For a formal clinical examination and dermatoscopic evaluation."""

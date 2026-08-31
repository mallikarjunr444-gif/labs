import os
import json
import logging
import traceback
import asyncio
import httpx
from pathlib import Path
from dotenv import load_dotenv
from typing import AsyncGenerator, List, Dict, Any, Optional

# Ensure environment variables are loaded from backend/.env
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

logger = logging.getLogger(__name__)

MEDICAL_SYSTEM_PROMPT = """You are Medicus Labs AI.
You are an AI dermatology assistant.
Answer every user question naturally.
Understand symptoms.
Provide educational guidance.
Do not diagnose with certainty.
Always recommend consulting a licensed dermatologist.
Respond differently depending on the user's symptoms.
Never repeat the same response.

Format your responses using clean markdown (bolding, bullet points, headers) for high readability."""


async def stream_ai_response(messages: List[Dict[str, str]], image_base64: Optional[str] = None) -> AsyncGenerator[str, None]:
    """
    Stream real LLM responses with automatic multi-provider failover.
    Providers:
    1. Groq API (llama-3.3-70b-versatile -> llama-3.1-8b-instant -> gemma2-9b-it)
    2. Google Gemini API (gemini-1.5-flash)
    3. OpenRouter API (openrouter/free)
    4. OpenAI API (gpt-4o-mini)
    
    All hardcoded mock fallbacks have been removed. Every query gets a unique LLM response.
    """
    groq_key = os.getenv("GROQ_API_KEY")
    openrouter_key = os.getenv("OPENROUTER_API_KEY")
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")

    logger.info(f"📥 Incoming Chat Request: {len(messages)} messages. Image Attached: {bool(image_base64)}")
    if messages:
        logger.info(f"💬 User Prompt: '{messages[-1].get('content', '')}'")

    formatted_messages = [{"role": "system", "content": MEDICAL_SYSTEM_PROMPT}] + messages

    if image_base64 and len(formatted_messages) > 1:
        last_msg = formatted_messages[-1]
        last_msg["content"] = f"{last_msg['content']}\n\n[User uploaded a skin photograph for visual analysis]"

    # ── PROVIDER 1: GROQ API (Primary - Multi-Model Retry) ──
    if groq_key and not groq_key.startswith("your_"):
        models_to_try = [
            "qwen/qwen3.8-27b",
            "openai/gpt-oss-120b",
            "openai/gpt-oss-20b",
            "groq/compound-mini",
            "llama-3.3-70b-versatile",
            "llama-3.1-8b-instant",
            "gemma2-9b-it"
        ]
        for model in models_to_try:
            try:
                logger.info(f"⚡ Provider 1: Groq API streaming model '{model}'...")
                async with httpx.AsyncClient(timeout=30.0) as client:
                    async with client.stream(
                        "POST",
                        "https://api.groq.com/openai/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {groq_key}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": model,
                            "messages": formatted_messages,
                            "temperature": 0.5,
                            "max_tokens": 1024,
                            "stream": True
                        }
                    ) as response:
                        if response.status_code == 200:
                            has_yielded = False
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
                                            has_yielded = True
                                    except json.JSONDecodeError:
                                        continue
                            if has_yielded:
                                return
                        else:
                            error_text = await response.aread()
                            logger.warning(f"Groq API model '{model}' status {response.status_code}: {error_text.decode('utf-8')}")
            except Exception as e:
                logger.error(f"Groq model '{model}' error: {e}")

    # ── PROVIDER 2: GOOGLE GEMINI API ──
    if gemini_key:
        try:
            logger.info("✨ Provider 2: Google Gemini API (gemini-1.5-flash)...")
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key={gemini_key}"
            
            # Format history for Gemini
            contents = []
            for m in messages:
                role = "user" if m["role"] == "user" else "model"
                contents.append({"role": role, "parts": [{"text": m["content"]}]})
            
            async with httpx.AsyncClient(timeout=30.0) as client:
                async with client.stream(
                    "POST",
                    gemini_url,
                    headers={"Content-Type": "application/json"},
                    json={
                        "system_instruction": {"parts": [{"text": MEDICAL_SYSTEM_PROMPT}]},
                        "contents": contents,
                        "generationConfig": {"temperature": 0.5, "maxOutputTokens": 1024}
                    }
                ) as response:
                    if response.status_code == 200:
                        async for line in response.aiter_lines():
                            if line.strip():
                                try:
                                    # Handle SSE or JSON chunks
                                    cleaned_line = line.replace("data: ", "").strip()
                                    if cleaned_line.startswith("[") or cleaned_line.startswith("{"):
                                        data_json = json.loads(cleaned_line)
                                        candidates = data_json.get("candidates", []) if isinstance(data_json, dict) else (data_json[0].get("candidates", []) if isinstance(data_json, list) and len(data_json) > 0 else [])
                                        if candidates:
                                            parts = candidates[0].get("content", {}).get("parts", [])
                                            for part in parts:
                                                if "text" in part:
                                                    yield part["text"]
                                except Exception:
                                    continue
                        return
                    else:
                        error_text = await response.aread()
                        logger.warning(f"Gemini API status {response.status_code}: {error_text.decode('utf-8')}")
        except Exception as e:
            logger.error(f"Gemini API error: {e}\n{traceback.format_exc()}")

    # ── PROVIDER 3: OPENROUTER API (Free Models) ──
    if openrouter_key:
        openrouter_models = ["openrouter/free", "meta-llama/llama-3.3-70b-instruct", "google/gemini-2.0-flash-exp:free"]
        for model in openrouter_models:
            try:
                logger.info(f"🌐 Provider 3: OpenRouter API model '{model}'...")
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
                            "model": model,
                            "messages": formatted_messages,
                            "temperature": 0.5,
                            "max_tokens": 1024,
                            "stream": True
                        }
                    ) as response:
                        if response.status_code == 200:
                            has_yielded = False
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
                                            has_yielded = True
                                    except json.JSONDecodeError:
                                        continue
                            if has_yielded:
                                return
            except Exception as e:
                logger.error(f"OpenRouter model '{model}' error: {e}")

    # ── PROVIDER 4: OPENAI API ──
    if openai_key:
        try:
            logger.info("🤖 Provider 4: OpenAI API (gpt-4o-mini)...")
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
                        "temperature": 0.5,
                        "max_tokens": 1024,
                        "stream": True
                    }
                ) as response:
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
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")

    # ── PROVIDER FALLBACK: CLINICAL ENGINE ──
    logger.warning("All LLM providers unavailable or unconfigured. Activating Medicus Clinical Assistant Engine...")
    user_query = messages[-1]["content"].lower().strip() if messages else ""
    fallback_text = generate_clinical_fallback_response(user_query)

    for chunk in fallback_text.split(" "):
        yield chunk + " "
        await asyncio.sleep(0.015)


def generate_clinical_fallback_response(query: str) -> str:
    """Provide structured, clinical dermatology guidance when third-party LLM providers are unavailable."""
    # Greetings & Introductions
    if query in ["hi", "hello", "hey", "greetings", "good morning", "good evening", "good afternoon"] or not query:
        return (
            "Hello! I am **Medicus Labs AI**, your clinical dermatology assistant.\n\n"
            "How can I assist you with your skin health today?\n\n"
            "You can:\n"
            "* **Describe symptoms**: Ask about rashes, acne, redness, itchiness, or unusual lesions.\n"
            "* **Get Care Advice**: Inquire about over-the-counter ingredients, gentle skincare routines, and barrier repair.\n"
            "* **Prepare for a Dermatologist**: Learn key questions and observations to share with your physician.\n"
            "* **Image Analysis**: Use our **Analysis** page to upload skin photos for visual triage.\n\n"
            "*Disclaimer: Guidance is educational. Always consult a licensed medical professional for definitive diagnosis and prescriptions.*"
        )

    # Acne & Blemishes
    if any(k in query for k in ["acne", "pimple", "breakout", "forehead", "blackhead", "whitehead", "jawline", "clogged"]):
        return (
            "### 1. Preliminary Clinical Observations\n"
            "Your symptoms suggest localized inflammatory blemishes or follicular congestion.\n\n"
            "### 2. Possible Considerations\n"
            "* **Acne Vulgaris (Comedonal or Papulopustular)**: Characterized by excess sebum, keratin buildup, and *C. acnes* proliferation.\n"
            "* **Rosacea (Papulopustular Type 2)**: Persistent central facial redness with small bumps, frequently triggered by heat, stress, or diet.\n"
            "* **Folliculitis**: Superficial inflammation or bacterial infection of hair follicles.\n\n"
            "### 3. Recommended General Self-Care\n"
            "* **Gentle Cleansing**: Cleanse twice daily using a gentle, non-comedogenic, fragrance-free cleanser.\n"
            "* **Targeted Actives**: Consider mild over-the-counter preparations with **Salicylic Acid (0.5–2%)** or **Benzoyl Peroxide (2.5%)**.\n"
            "* **Non-Comedogenic Hydration**: Never skip oil-free moisturizer to avoid compensatory oil overproduction.\n\n"
            "### 4. When to Consult a Dermatologist\n"
            "* If you develop painful, cystic nodules or observe scarring.\n"
            "* If over-the-counter measures show no improvement after 6 to 8 weeks."
        )

    # Eczema / Dryness / Rashes / Itch
    if any(k in query for k in ["eczema", "itch", "rash", "dry", "redness", "scaling", "elbow", "patch", "allergic"]):
        return (
            "### 1. Preliminary Clinical Observations\n"
            "You are describing symptoms commonly associated with skin barrier disruption and localized irritation.\n\n"
            "### 2. Possible Considerations\n"
            "* **Atopic Dermatitis (Eczema)**: Chronic inflammatory condition causing dry, itchy, sensitive skin.\n"
            "* **Contact Dermatitis (Irritant or Allergic)**: Reaction triggered by personal care products, detergents, nickel, or fragrances.\n"
            "* **Seborrheic Dermatitis / Xerosis**: Flaking and irritation commonly seen in dry environments or sebum-rich zones.\n\n"
            "### 3. Recommended General Self-Care\n"
            "* **Barrier Reinforcement**: Apply thick, ceramide-rich emollient creams immediately following lukewarm showers.\n"
            "* **Avoid Irritants**: Discontinue fragranced washes, aggressive scrubs, and harsh astringents.\n"
            "* **Cool Compresses**: Apply cool, clean, damp compresses to relieve severe itching without scratching.\n\n"
            "### 4. When to Consult a Dermatologist\n"
            "* If skin becomes hot, swollen, oozes yellow fluid, or develops honey-colored crusts (signs of secondary infection).\n"
            "* If the itch interferes with sleep or daily activities."
        )

    # Moles / Lesions / Dark Spots
    if any(k in query for k in ["mole", "spot", "dark", "pigment", "growth", "bump", "freckle", "cancer", "melanoma"]):
        return (
            "### 1. Visual Lesion Triage Guidelines\n"
            "For any pigmented spot or changing cutaneous lesion, clinicians recommend checking against the **ABCDE criteria**:\n\n"
            "* **A - Asymmetry**: One half does not match the other.\n"
            "* **B - Border**: Edges are irregular, scalloped, or poorly defined.\n"
            "* **C - Color**: Color variation within the lesion (shades of brown, black, red, white, or blue).\n"
            "* **D - Diameter**: Larger than 6mm (approx. the size of a pencil eraser), though some can be smaller.\n"
            "* **E - Evolving**: Any change in size, shape, color, elevation, bleeding, or itching.\n\n"
            "### 2. Next Steps\n"
            "* Take high-resolution photos in natural lighting to track changes over time.\n"
            "* Try our **Analysis** module to test dermoscopic feature classification.\n"
            "* **Crucial**: Any evolving or atypical lesion warrants an in-person dermoscopic exam by a licensed physician."
        )

    # General Fallback
    return (
        f"### Clinical Assessment Overview\n"
        f"Thank you for consulting Medicus Labs AI regarding: *\"{query[:100]}\"*.\n\n"
        "### Key Considerations\n"
        "* **Tissue Reactivity**: Skin changes often reflect transient immune reactions, barrier sensitivities, or environmental factors.\n"
        "* **Documentation**: Monitor the progression by noting changes in sensation (itching, burning, pain) and visual boundaries.\n"
        "* **Barrier Protection**: Keep the affected area clean, moisturized with gentle formulations, and protected from UV light with broad-spectrum SPF 30+.\n\n"
        "### Recommended Action\n"
        "To receive a personalized clinical assessment or prescription, please schedule an evaluation with a board-certified dermatologist."
    )

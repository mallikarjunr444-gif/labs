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
        models_to_try = ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "gemma2-9b-it"]
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

    # ── IF ALL PROVIDERS FAIL ──
    err_msg = "⚠️ **AI Service Error**: Unable to reach active LLM providers (Groq, Gemini, OpenRouter, OpenAI). Please verify your `.env` API keys."
    logger.error(err_msg)
    yield err_msg

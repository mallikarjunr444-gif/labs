import os
import httpx
from dotenv import load_dotenv

load_dotenv(dotenv_path="/Users/malikarjunr/labs/backend/.env")

api_key = os.getenv("GROQ_API_KEY")
print("API Key:", api_key)

url = "https://api.groq.com/openai/v1/chat/completions"
headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

# Test qwen/qwen3.6-27b
payload_qwen = {
    "model": "qwen/qwen3.6-27b",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
}

# Test llama-3.2-11b-vision-preview
payload_llama = {
    "model": "llama-3.2-11b-vision-preview",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 10
}

with httpx.Client() as client:
    try:
        r = client.post(url, json=payload_qwen, headers=headers)
        print("Qwen status:", r.status_code)
        print("Qwen response:", r.text)
    except Exception as e:
        print("Qwen error:", e)

    try:
        r = client.post(url, json=payload_llama, headers=headers)
        print("Llama status:", r.status_code)
        print("Llama response:", r.text)
    except Exception as e:
        print("Llama error:", e)

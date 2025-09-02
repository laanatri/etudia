import httpx

async def openai_generate_json(course_text: str, card_count: int, openai_model: str, openai_api_key: str, prompt_system: str, prompt_user: str, max_tokens: int = 1500, temperature: float = 0) -> str:

    payload = {
        "model": openai_model,
        "messages": [
            {"role": "system", "content": prompt_system},
            {"role": "user", "content": prompt_user.format(count=card_count, course_text=course_text)}
        ],
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    headers = {
        'Authorization': f"Bearer {openai_api_key}",
        "Content-Type": "application/json"
    }

    # Requete vers OpenAI
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]
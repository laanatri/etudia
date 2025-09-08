import httpx

async def download_course_text(course_url: str, timeout: int = 20) -> str:
    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(course_url)
    except httpx.RequestError as e:
        raise RuntimeError(f"Erreur réseau lors du téléchargement: {e}")

    if response.status_code != 200:
        raise RuntimeError(f"Téléchargement échoué (status_code={response.status_code})")
    
    return response.text
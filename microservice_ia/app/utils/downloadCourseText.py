import httpx

async def download_course_text(course_url: str) -> str:
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.get(course_url)
        if response.status.code != 200:
            raise RuntimeError(f"Téléchargement échoué ({response.status_code})")
        return response.text
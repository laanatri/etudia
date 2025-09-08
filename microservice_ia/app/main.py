import os

from fastapi import FastAPI, HTTPException, Header
from pydantic import HttpUrl, BaseModel, Field
from typing import Annotated, Optional
from dotenv import load_dotenv

from .utils.downloadCourseText import download_course_text
from .utils.openaiGenerateJson import openai_generate_json
from .utils.extractJson import extract_json
from .utils.normalizeFlashcards import normalize_flashcards

load_dotenv()

# Variables d'env
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MICROSERVICE_SHARED_KEY = os.getenv("MICROSERVICE_SHARED_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

app = FastAPI()

# Requete
class FlashcardsGenerateRequest(BaseModel):
    course_url: HttpUrl
    count: Annotated[int, Field(ge=1, le=200)] = 20

# Prompts
# Comportement de l'IA
SYSTEM_PROMPT = (
    "Tu es un générateur de flashcards. UTILISE UNIQUEMENT le contenu fourni. "
    "RÉPONDS STRICTEMENT et UNIQUEMENT par UN OBJET JSON BRUT, sans préface, sans explication, "
    "sans code fence (```) et sans guillemets entourant l'objet entier. Ne pas échapper les guillemets internes. "
    "Format EXACT attendu : "
    "{\"title\":\"...\",\"themes\":\"thème1, thème2, ...\",\"flashcards\":[{\"question\":\"...\",\"answer\":\"...\"}, ...]}. "
    "Ne renvoie rien d'autre."
)

# Tache à faire
USER_PROMPT_TEMPLATE = (
    "Génère exactement {count} flashcards à partir du texte ci‑dessous. "
    "RÉPONDS SEULEMENT avec UN OBJET JSON EXACTEMENT comme indiqué ci‑dessus, rien d'autre. "
    "Champs obligatoires : "
    "\"title\" (≤ 100 caractères), "
    "\"themes\" = chaîne de 1 à 3 thèmes séparés par des virgules, "
    "\"flashcards\" = tableau de {\"question\":\"...\",\"answer\":\"...\"} (question ≤ 200 caractères, answer ≤ 1000 caractères). "
    "Ne pas utiliser de markdown, pas de backticks, pas d'explications, pas d'exemples supplémentaires. "
    "Voici le texte du cours :\n\n{course_text}"
)

# Endpoint pour generer les flashcards
@app.post("/generate/flashcards")
async def generate_flashcards(request_payload: FlashcardsGenerateRequest, x_service_key: Optional[str] = Header(None)):

    # headers
    # "Content-Type: application/json"
    # "x-service-key: KEY..."

    # body
    # {
    #     "course_url": "http...",
    #     "count": 0...
    # }

    # Check la clé
    if MICROSERVICE_SHARED_KEY and x_service_key != MICROSERVICE_SHARED_KEY:
        raise HTTPException(status_code=401, detail="Clé de service invalide")
    
    # Download le test du cours
    try:
        course_text = await download_course_text(str(request_payload.course_url))
    except Exception as download_error:
        raise HTTPException(status_code=502, detail=f"Téléchargement du cours échoué: {download_error}")

    # Generer les flashcards
    try:
        openai_response = await openai_generate_json(course_text, request_payload.count, OPENAI_MODEL , OPENAI_API_KEY, SYSTEM_PROMPT, USER_PROMPT_TEMPLATE)
    except Exception as openai_error:
        raise HTTPException(status_code=502, detail=f"Génération OpenAI échouée: {openai_error}")

    # Extraire et normalizer
    try:
        flashcards_brut = extract_json(openai_response)
        flashcards_normalized = normalize_flashcards(flashcards_brut)
    except Exception as parse_error:
        raise HTTPException(status_code=502, detail=f"Réponse IA non conforme: {parse_error}")

    return {
        "flashcards": flashcards_normalized,
        "meta": {
            "requested_count": request_payload.count,
            "returned_count": len(flashcards_normalized)
        }
    }
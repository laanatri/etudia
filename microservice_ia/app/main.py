import os
import logging
import time

from fastapi import FastAPI, HTTPException, Header
from pydantic import HttpUrl, BaseModel, Field
from typing import Annotated, Optional
from dotenv import load_dotenv

from .utils.downloadCourseText import download_course_text
from .utils.openaiGenerateJson import openai_generate_json
from .utils.extractJson import extract_json
from .utils.normalizeFlashcards import normalize_flashcards

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("microservice_ia.log")
    ]
)

logger = logging.getLogger("microservice_ia")

load_dotenv()

# Variables d'env
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MICROSERVICE_SHARED_KEY = os.getenv("MICROSERVICE_SHARED_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

# Checker les variables d'environnement
logger.info(f"OPENAI_MODEL configuré: {OPENAI_MODEL}")
logger.info(f"OPENAI_API_KEY présente: {'Oui' if OPENAI_API_KEY else 'Non'}")
logger.info(f"MICROSERVICE_SHARED_KEY présente: {'Oui' if MICROSERVICE_SHARED_KEY else 'Non'}")

app = FastAPI()

# Requete
class FlashcardsGenerateRequest(BaseModel):
    course_url: HttpUrl
    count: Annotated[int, Field(ge=1, le=200)] = 20

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

    logger.info(f"Requête pour générer {request_payload.count} flashcards depuis le cours : {request_payload.course_url}")
    
    start_time = time.time()

    # Check la clé
    if MICROSERVICE_SHARED_KEY and x_service_key != MICROSERVICE_SHARED_KEY:
        logger.warning(f"Tentative d'accès avec x_service_key invalide: {x_service_key[:5]}...")
        raise HTTPException(status_code=401, detail="Clé x_service_key est invalide")
    
    # Download le text du cours
    try:
        logger.info(f"Téléchargement du cours depuis: {request_payload.course_url}")
        download_start = time.time()
        course_text = await download_course_text(str(request_payload.course_url))

        download_time = time.time() - download_start
        
        text_length = len(course_text)
        logger.info(f"Téléchargement réussi en {download_time:.2f}s : {text_length} caractères")
        
        # Check un morceau du texte
        preview = course_text[:200].replace('\n', ' ')
        logger.info(f"Aperçu du contenu : {preview}...")
        
    # Erreur de DL du cours
    except Exception as download_error:
        logger.error(f"Erreur de téléchargement : {str(download_error)}", exc_info=True)
        raise HTTPException(status_code=502, detail=f"Téléchargement du cours échoué : {download_error}")

    # Generer les flashcards
    try:
        logger.info(f"Génération des flashcards avec un cours de {len(course_text)} caractères et le modèle ia {OPENAI_MODEL}")
        openai_start = time.time()

        openai_response = await openai_generate_json(course_text, request_payload.count, OPENAI_MODEL , OPENAI_API_KEY)
    
        openai_time = time.time() - openai_start
        
        logger.info(f"Génération OpenAI réussie en {openai_time:.2f}s, réponse de {len(openai_response)} caractères")
        
        # Log la réponse
        response_preview = openai_response[:200].replace('\n', ' ')
        logger.info(f"Aperçu de la réponse: {response_preview}...")

    # Erreur à la génération par GPT
    except Exception as openai_error:
        logger.error(f"Génération OpenAI a échouée : {str(openai_error)}", exc_info=True)
        raise HTTPException(status_code=502, detail=f"Génération OpenAI a échouée : {openai_error}")

    # Extraire et normalizer
    try:
        logger.info("Début de l'extraction et normalisation du JSON")
        extract_start = time.time()

        flashcards_brut = extract_json(openai_response)
        flashcards_normalized = normalize_flashcards(flashcards_brut)

        extract_time = time.time() - extract_start
        
        logger.info(f"Extraction et normalisation réussies en {extract_time:.2f}s: {len(flashcards_normalized)} flashcards")

    # Probléme de parsing du json
    except Exception as parse_error:
        logger.error(f"Erreur de parsing JSON: {str(parse_error)}", exc_info=True)
        logger.error(f"JSON problématique: {openai_response[:500]}...")
        raise HTTPException(status_code=502, detail=f"Réponse IA non conforme: {parse_error}")
    
    total_time = time.time() - start_time
    logger.info(f"Génération des flashcards terminée en {total_time:.2f}s avec {len(flashcards_normalized)} flashcards générées")

    return {
        "flashcards": flashcards_normalized,
        "title": flashcards_brut.get("title", "Bloc de flashcards"),
        "themes": flashcards_brut.get("themes", ""),
        "meta": {
            "requested_count": request_payload.count,
            "returned_count": len(flashcards_normalized)
        }
    }
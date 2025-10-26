import os
import logging
import time

from fastapi import FastAPI, HTTPException, Header
from pydantic import HttpUrl, BaseModel, Field
from typing import Annotated, Optional
from dotenv import load_dotenv

from app.utils.downloadCourseText import download_course_text
from app.utils.openaiGenerateCapsules import openai_generate_capsules
from app.utils.extractJson import extract_json

from app.models.capsules_request_models import CapsulesGenerateRequest
from app.models.capsules_response_models import CapsulesResponse, CapsulesDatas, MetaDatas

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

# Variables d'environnement
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MICROSERVICE_SHARED_KEY = os.getenv("MICROSERVICE_SHARED_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

# Checker les variables d'environnement
logger.info(f"OPENAI_MODEL configuré: {OPENAI_MODEL}")
logger.info(f"OPENAI_API_KEY présente: {'Oui' if OPENAI_API_KEY else 'Non'}")
logger.info(f"MICROSERVICE_SHARED_KEY présente: {'Oui' if MICROSERVICE_SHARED_KEY else 'Non'}")

app = FastAPI()

@app.get("/")
def root():
    return {"status": "ok"}

# Endpoint pour generer les capsules
@app.post("/generate/capsules", response_model=CapsulesResponse)
async def generate_capsules(request_payload: CapsulesGenerateRequest, x_service_key: Optional[str] = Header(None)):

    # headers
    # "Content-Type: application/json"
    # "x-service-key: KEY..."

    # body
    # {
    #     "course_url": "http...",
    #     "capsules": {
    #         "bloc": {
    #             "create": "",
    #             "number": ""
    #         },
    #         "summary": {
    #             "create": ""
    #         },
    #         "quiz": {
    #             "create": "",
    #             "number": ""
    #         }
    #     }
    # }

    logger.info(f"Génération demandée: {f"un bloc de {request_payload.capsules.bloc.number} flashcards" if request_payload.capsules.bloc.create else ""}{", un résumé" if request_payload.capsules.summary.create else ""}{f", un quiz de {request_payload.capsules.quiz.number} questions" if request_payload.capsules.quiz.create else ""} depuis le cours {request_payload.course_url}")

    start_time = time.time()

    # Check la clé
    if MICROSERVICE_SHARED_KEY and x_service_key != MICROSERVICE_SHARED_KEY:
        logger.warning(f"Tentative d'accès avec x_service_key invalide: {x_service_key[:5]}...")
        raise HTTPException(status_code=401, detail="Clé x_service_key est invalide")
    
    # Download le text du cours
    try:
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

    # Generer les capsules
    try:
        logger.info(f"Génération des capsules avec un cours de {len(course_text)} caractères et le modèle ia {OPENAI_MODEL}")

        openai_start = time.time()
        gpt_response = await openai_generate_capsules(course_text, request_payload, OPENAI_MODEL , OPENAI_API_KEY)
        openai_response = gpt_response["content"]
        openai_time = time.time() - openai_start
        
        logger.info(f"Génération OpenAI réussie en {openai_time:.2f}s, réponse de {len(openai_response)} caractères")
        
        # Log la réponse
        # response_preview = openai_response[:200].replace('\n', ' ')
        # logger.info(f"Aperçu de la réponse: {response_preview}...")

        # log de la réponse complète pour checker
        logger.info(f"Aperçu de la réponse: {openai_response}")

    # Erreur à la génération par GPT
    except Exception as openai_error:
        logger.error(f"Génération OpenAI a échouée : {str(openai_error)}", exc_info=True)
        raise HTTPException(status_code=502, detail=f"Génération OpenAI a échouée : {openai_error}")

    # Extraire et normalizer
    try:
        logger.info("Début de l'extraction et normalisation du JSON")

        extract_start = time.time()
        capsules = extract_json(openai_response, request_payload)
        extract_time = time.time() - extract_start
        
        logger.info(f"Extraction et normalisation réussies en {extract_time:.2f}s")

    # Probléme de parsing du json
    except Exception as parse_error:
        logger.error(f"Erreur de parsing JSON: {str(parse_error)}", exc_info=True)
        logger.error(f"JSON problématique: {openai_response[:500]}...")
        raise HTTPException(status_code=502, detail=f"Réponse IA non conforme: {parse_error}")
    
    total_time = time.time() - start_time

    flashcards_count = len(capsules.flashcards) if capsules.flashcards else 0
    summary_length = len(capsules.summary) if capsules.summary else 0
    quiz_count = len(capsules.quiz) if capsules.quiz else 0

    logger.info(f"Génération des capsules terminée en {total_time:.2f}s")
    logger.info(f"Générées : {flashcards_count} flashcards, {quiz_count} questions quiz et résumé de {summary_length} charactères")

    return CapsulesResponse(
        title = capsules.title,
        themes = capsules.themes,
        capsules=CapsulesDatas(
            flashcards=[card.dict() for card in capsules.flashcards] if capsules.flashcards else None,
            summary=capsules.summary,
            quiz=[question.dict() for question in capsules.quiz] if capsules.quiz else None
        ),
        meta=MetaDatas(
            process_time=gpt_response.get("prompt_tokens"),
            prompt_tokens=gpt_response.get("prompt_tokens"),
            tokens_used=gpt_response.get("prompt_tokens")
        )
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
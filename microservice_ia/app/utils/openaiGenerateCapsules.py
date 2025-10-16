import httpx
import logging
import time

from typing import List

from ..models.capsules_request_models import CapsulesGenerateRequest
from .capsulesPromptsGenerator import system_prompt_generator, user_prompt_generator

logger = logging.getLogger("microservice_ia")

async def openai_generate_capsules(course_text: str, request: CapsulesGenerateRequest, openai_model: str, openai_api_key: str, max_tokens: int = 1500, temperature: float = 0) -> dict:
    
    # Prompts

    # Comportement de l'IA

    system_prompt: str = system_prompt_generator(request)

    # Tache à faire
    user_prompt: str = user_prompt_generator(course_text, request)

    payload = {
        "model": openai_model,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    headers = {
        'Authorization': f"Bearer {openai_api_key}",
        "Content-Type": "application/json"
    }

    try :
        logger.info(f"Envoi de la requête à OpenAI d'un texte de {len(course_text)} caractères")

        start_time = time.time()

        # Requete vers OpenAI
        async with httpx.AsyncClient(timeout=120) as client:
            resp = await client.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()

            generation_time = time.time() - start_time

            # {
            #   "id": "...",
            #   "model": "...",
            #   "choices": [
            #     {
            #       "message": {
            #         "role": "assistant",
            #         "content": "{\"title\":\"Architecture web\",\"themes\":\"réseaux\",\"flashcards\":[...]}"
            #       },
            #       "finish_reason": "stop"
            #     }
            #   ]
            # }

            content = data["choices"][0]["message"]["content"]
            logger.info(f"La réponse de GPT est de {len(content)} caractères")

            meta = data["usage"]

            return {
                "content": content,
                "prompt_tokens": meta["prompt_tokens"],
                "completion_tokens": meta["completion_tokens"],
                "generation_time": generation_time
            }
        
    # Status erreur de GPT
    except httpx.HTTPStatusError as error:
        logger.error(f"Erreur HTTP {error.response.status_code} d'OpenAI: {error.response.text}")
        raise ValueError(f"OpenAI erreur {error.response.status_code}: {error.response.text}")

    # Connexion à GPT erreur
    except httpx.RequestError as error:
        logger.error(f"Erreur de requête openAI est {str(error)}")
        raise ValueError(f"Erreur de connexion à OpenAI: {str(error)}")
    
    # Autres erreurs
    except Exception as error:
        logger.error(f"Autre erreur lors de l'appel à GPT {str(error)}", exc_info=True)
        raise
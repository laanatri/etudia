import httpx
import logging

logger = logging.getLogger("microservice_ia")

async def openai_generate_json(course_text: str, card_count: int, openai_model: str, openai_api_key: str, max_tokens: int = 1500, temperature: float = 0) -> str:
    
    # Prompts
    # Comportement de l'IA
    system_prompt = (
        "Tu es un générateur de flashcards. UTILISE UNIQUEMENT le contenu fourni. "
        "RÉPONDS STRICTEMENT et UNIQUEMENT par UN OBJET JSON BRUT, sans préface, sans explication, "
        "sans code fence (```) et sans guillemets entourant l'objet entier. Ne pas échapper les guillemets internes. "
        "Format EXACT attendu : "
        "{\"title\":\"...\",\"themes\":\"thème1, thème2, ...\",\"flashcards\":[{\"question\":\"...\",\"answer\":\"...\"}, ...]}. "
        "Ne renvoie rien d'autre."
    )

    # Tache à faire
    user_prompt = f"""Génère exactement {card_count} flashcards à partir du texte ci‑dessous. 
        RÉPONDS SEULEMENT avec UN OBJET JSON EXACTEMENT comme indiqué ci‑dessus, rien d'autre. 
        Champs obligatoires : 
        "title" (≤ 100 caractères), 
        "themes" = chaîne de 1 à 3 thèmes séparés par des virgules, 
        "flashcards" = tableau de {{"question":"...","answer":"..."}} (question ≤ 200 caractères, answer ≤ 1000 caractères). 
        Ne pas utiliser de markdown, pas de backticks, pas d'explications, pas d'exemples supplémentaires. 
        Voici le texte du cours :

        {course_text}"""

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

        # Requete vers OpenAI
        async with httpx.AsyncClient(timeout=120) as client:
            resp = await client.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
            resp.raise_for_status()
            data = resp.json()

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

            return content
        
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
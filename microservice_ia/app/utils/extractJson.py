import json
import re
import logging

from typing import Dict, Any
from validateCapsulesJson import validate_capsules_json
from ..models.capsules_request_models import CapsulesGenerateRequest

logger = logging.getLogger("microservice_ia")


def extract_json(text: str, payload: CapsulesGenerateRequest) -> Dict[str, Any]:

    logger.info("Début de l'extraction du JSON")

    # Nettoyage pour prédire les réponses possibles de chatGPT

    # regex pour nettoyer ce qu'il y aurait autour du json
    cleaned_text = re.sub(r"```(?:json)?\s*|\s*```", "", text).strip()
    logger.info(f"Le texte nettoyé fait {len(cleaned_text)} caractères")

    # parser le json
    try:
        parsed_json = json.loads(cleaned_text)
        logger.info("JSON parsé avec succès")

    except Exception as error:
        logger.warning(f"Si la parsing achoue : {error}")

        try:
            parsed_json = json.loads(cleaned_text.replace("'", '"'))
            logger.info("JSON parsé après remplacement des quotes")

        except Exception as err:
            logger.error(f"Échec du parsing JSON : {err}")
            raise ValueError(f"Réponse de GPT n'est pas un json : {err}")

    # si parsed_json est encore une string si double-encodé
    if isinstance(parsed_json, str):
        logger.info("si JSON est double-encodé")

        try:
            parsed_json = json.loads(parsed_json)
            logger.info("JSON double-encodé est bien décodé")

        except Exception as err:
            logger.error(f"Échec du décodage du JSON double-encodé : {err}")
            raise ValueError(f"JSON double-encodé est invalide : {err}")
        
    # lever des erreurs si ça ne correspond pas à la demande
    capsules = validate_capsules_json(parsed_json, payload)
        
    return capsules
from typing import List, Dict, Any
from ..models.capsules_request_models import CapsulesGenerateRequest
from ..models.capsules_output_models import CapsulesOutput
from pydantic import ValidationError

import logging

logger = logging.getLogger("microservice_ia")

def validate_capsules_json(parsed_json: Dict[str, Any], payload: CapsulesGenerateRequest) -> None:

    # lève une ValueError si ce n'est pas valide
    logger.info("Début de la validation du JSON")

    try:
        # grâce à pydantic, il check automatiquement toute la construction des capsules
        capsules = CapsulesOutput(**parsed_json)

        # capsules ?
        if payload.capsules.bloc.create and not capsules.flashcards:
            raise ValueError("Flashcards demandées mais absentes du JSON")
        
        if payload.capsules.summary.create and not capsules.summary:
            raise ValueError("résuné demandé mais absentes du JSON")
        
        if payload.capsules.quiz.create and not capsules.quiz:
            raise ValueError("Quiz demandé mais absentes du JSON")

        logger.info("Validation JSON réussie")
        return capsules

    except ValidationError as error:
        logger.error(f"Erreur de validation Pydantic : {error}")
        raise ValueError(f"Format JSON invalide : {error}")
    
    except Exception as exc:
        logger.error(f"Erreur de validation générale : {exc}")
        raise ValueError(f"Erreur de validation : {exc}")
import json
import re
from typing import List, Dict, Any

def extract_json(text: str) -> List[Dict[str, str]]:

    # Nettoyage pour prédire les réponses possibles de chatGPT

    # regex pour netoyer ce qu'il y aurait autour du json
    cleaned_text = re.sub(r"```(?:json)?\s*|\s*```", "", text).strip()

    # parser le json
    try:
        parsed: Any = json.loads(cleaned_text)
    except Exception:
        try:
            parsed = json.loads(cleaned_text.replace("'", '"'))
        except Exception:
            raise ValueError("Réponse IA non-JSON")

    # si parsed_json est encore une string si double-encodé
    if isinstance(parsed_json, str):
        try:
            parsed_json = json.loads(parsed_json)
        except Exception as err:
            raise ValueError(f"JSON double-encodé invalide: {err}")
        
    # lever des erreurs si ça ne correspond pas à la demande
    if not isinstance(parsed_json, dict):
        raise ValueError("Format invalide : attendu un objet JSON {\"title\",\"themes\",\"flashcards\"}.")
    
    if "title" not in parsed_json or "themes" not in parsed_json or "flashcards" not in parsed_json:
        raise ValueError("Objet JSON manquant 'title', 'themes' ou 'flashcards'.")
    
    if not isinstance(parsed_json["flashcards"], list):
        raise ValueError("Format inattendu")
        
    return parsed_json
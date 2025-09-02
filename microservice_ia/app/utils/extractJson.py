import json

from typing import List, Dict

def extract_json(text: str) -> List[Dict[str, str]]:
    try:
        parsed = json.loads(text)
        if isinstance(parsed, List):
            return parsed
    except Exception:
        pass
    raise ValueError("Aucun tableau JSON valide trouvé dans la réponse de l'IA")

import httpx
import logging
import re

logger = logging.getLogger("microservice_ia")

async def download_course_text(course_url: str, timeout: int = 30) -> str:
    try:
        logger.info(f"Téléchargement du cours depuis {course_url}")

        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(course_url)
            response.raise_for_status()
            content = response.text
            logger.info(f"le cours fait {len(content)} caractères")

        # Si c'est un fichier .rtf
        if course_url.lower().endswith(".rtf") or content.startswith('{\\rtf'):
            logger.info("C'est un format .rtf")
            text = extract_course_text_if_rtf(content)
            logger.info(f"Le cours .rtf fait {len(text)} caractères")
            return text

        return content

    # Status de l'erreur du supabase storage
    except httpx.HTTPStatusError as error:
        logger.error(f"Erreur HTTP {error.response.status_code} lors du téléchargement: {error.response.text}")
        raise RuntimeError(f"Téléchargement échoué (status_code={error.response.status_code}): {error.response.text}")
    
    # Probléme de connexion au serveur de suoabase storage
    except httpx.RequestError as error:
        logger.error(f"Erreur réseau lors du téléchargement: {str(error)}")
        raise RuntimeError(f"Erreur réseau lors du téléchargement: {error}")
    
    # Autres erreurs / code Bugs
    except Exception as error:
        logger.error(f"Erreur inattendue lors du téléchargement: {str(error)}", exc_info=True)
        raise RuntimeError(f"Erreur lors du téléchargement: {str(error)}")
    



def extract_course_text_if_rtf(text: str) -> str:

    # Supprime les commandes de formatage RTF (exemple \b pour gras ou \par pour new p)
    text_clean = re.sub(r"\\[a-z0-9]+", " ", text)
    
    # Supprimer les groupes de contrôle rtf (exemple {{xxx}})
    result = ""
    skip = False
    brace_level = 0
    
    for char in text_clean:
        if char == '{':
            brace_level += 1
            if brace_level > 1:
                skip = True
        elif char == '}':
            if brace_level > 0:
                brace_level -= 1
                if brace_level <= 1:
                    skip = False
        elif not skip and brace_level <= 1:
            result += char
    
    # Nettoyer les caractères spéciaux RTF
    result = re.sub(r'\\\'[0-9a-f]{2}', '', result)  # Caractères spéciaux
    result = re.sub(r'\\\n|\\\r|\\\r\n', '\n', result)  # Sauts de ligne
    result = re.sub(r'\s+', ' ', result)  # Espaces multiples
    
    return result.strip()
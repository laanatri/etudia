import httpx
import logging
import re

from fastapi import HTTPException

from striprtf.striprtf import rtf_to_text

logger = logging.getLogger("microservice_ia")

async def download_course_text(course_url: str, timeout: int = 30) -> str:
    
    try:
        logger.info(f"Téléchargement du cours depuis {course_url}")

        async with httpx.AsyncClient(timeout=timeout) as client:

            # check la taille du fichier avant de le télécharger
            head_response = await client.head(course_url)
            head_response.raise_for_status()

            content_length = head_response.headers.get("content-length")
            if content_length:

                # récupèrer la taille du fichier en KB
                file_size_in_bytes = int(content_length)
                file_size_in_kb = file_size_in_bytes / 1024
                
                # 100 KB = 100ko
                if file_size_in_kb > 100:
                    logger.error(f"Fichier trop volumineux: {file_size_in_kb:.0f} KB (max: 100 KB)")
                    raise HTTPException(
                        status_code=413,
                        detail=f"Fichier trop volumineux ({file_size_in_kb:.0f} KB). Taille maximum autorisée: 100 KB"
                    )
                
                logger.info(f"Taille du fichier vérifiée: {file_size_in_kb:.0f} KB")

            else:
                logger.warning("Impossible de connaitre la taille du fichier")

            # télécharger le fichier du cours
            response = await client.get(course_url)
            response.raise_for_status()


            # récupération du texte
            content = response.text

            logger.info(f"le cours fait {len(content)} caractères")


        # Si c'est un fichier .rtf
        if course_url.lower().endswith(".rtf") or content.strip().startswith('{\\rtf'):
            logger.info("C'est un format .rtf")

            text = rtf_to_text(content, encoding="latin-1")
            logger.info(f"Le cours .rtf fait {len(text)} caractères")

            return text
        

        
        return content
    
    # Status de l'erreur du supabase storage
    except httpx.HTTPStatusError as error:
        logger.error(f"Erreur HTTP {error.response.status_code} lors du téléchargement: {error.response.text}")
        raise RuntimeError(f"Téléchargement échoué (status_code={error.response.status_code}): {error.response.text}")
    
    # Probléme de connexion au serveur de supabase storage
    except httpx.RequestError as error:
        logger.error(f"Erreur réseau lors du téléchargement: {str(error)}")
        raise RuntimeError(f"Erreur réseau lors du téléchargement: {error}")
    
    # Autres erreurs / code Bugs
    except Exception as error:
        logger.error(f"Erreur inattendue lors du téléchargement: {str(error)}", exc_info=True)
        raise RuntimeError(f"Erreur lors du téléchargement: {str(error)}")
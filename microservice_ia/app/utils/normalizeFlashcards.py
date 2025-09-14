from typing import List, Dict
import logging

logger = logging.getLogger("microservice_ia")

def normalize_flashcards(data: Dict[str, str]) -> List[Dict[str, str]] :
    logger.info("Nomalisation des flashcards")

    if "flashcards" not in data:
        logger.error("il n'y a pas de key 'flashcards' dans data")
        raise ValueError("il n'y a pas de key 'flashcards' dans data")
    
    cards = data["flashcards"]
    logger.info(f"Nombre de flashcards: {len(cards) if isinstance(cards, list) else 'format invalide'}")

    if not isinstance(cards, list):
        logger.error(f"Format de flashcards invalide : {type(cards)}")
        raise ValueError("flashcards n'est pas une liste de card")

    valid_cards: List[Dict[str, str]] = []
    invalid_count = 0
    
    for i, card in enumerate(cards):
        question = card.get("question")
        answer = card.get("answer")
        
        # Si il n'y a pas de question / answer dans la card
        if not question or not answer:
            logger.warning(f"Flashcard #{i+1} est ignorée: question={bool(question)}, answer={bool(answer)}")
            invalid_count += 1
            continue
            
        question_str = str(question).strip()
        answer_str = str(answer).strip()
        
        # Si question ou answer est vide
        if not question_str or not answer_str:
            logger.warning(f"Flashcard #{i+1} ignorée: contenu vide après nettoyage")
            invalid_count += 1
            continue
            
        valid_cards.append({"question": question_str, "answer": answer_str})
        logger.debug(f"Flashcard #{i+1} validée: Q='{question_str[:30]}...' A='{answer_str[:30]}...'")
        

    logger.info(f"Normalisation terminée: {len(valid_cards)} cards valides, {invalid_count} cards ignorées")
    
    # si il n'y a pas de card valide
    if not valid_cards:
        logger.error("Aucune flashcard valide")
        raise ValueError("Aucune flashcard valide")
        
    return valid_cards
from typing import List, Dict

def normalize_flashcards(cards: List[Dict[str, str]]) -> List[Dict[str, str]] :
    valid_cards: List[Dict[str, str]] = []
    for card in cards:
        question = card.get("question")
        answer = card.get("answer")
        if not question or not answer:
            continue
        question_str = str(question).strip()
        answer_str = str(answer).strip()
        valid_cards.append({"question": question_str, "answer": answer_str})
    if not valid_cards:
        raise ValueError("Aucune flashcard valide après validation")
    return valid_cards
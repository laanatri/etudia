import pytest
from pydantic import ValidationError, HttpUrl
from app.utils.extractJson import extract_json    
from app.models.capsules_request_models import CapsulesGenerateRequest

    # pour lancer tout les tests
    # $ pytest 

class TestExtractJson:
    
    def test_extract_valid_json(self):
        json = """{
            "title": "Passage du MCD au MLD",
            "themes": "base de données, MCD, MLD",
            "flashcards": [
                {
                    "question": "Qu'est-ce que le MLD ?",
                    "answer": "Le MLD est un modèle logique des données."
                }
            ],
            "summary": "Résumé du cours sur le passage MCD vers MLD.",
            "quiz": [
                {
                    "question": "Quel est le rôle d'une clé étrangère ?",
                    "answers": [
                    "Identifier un enregistrement",
                    "Référencer une autre table",
                    "Créer une nouvelle table",
                    "Aucune de ces réponses"
                    ],
                    "correct_answer": 1
                }
            ]
        }"""

        request = {
            "course_url": "https://yydyzkwmmyhlvhlrhsbx.supabase.co/storage/v1/object/public/courses/Passage%20du%20MCD%20au%20MLD.txt",
            "capsules": {
                "bloc": {
                    "create": True,
                    "number": 1
                },
                "summary": {
                    "create": True
                },
                "quiz": {
                    "create": True,
                    "number": 1
                }
            }
        }
        payload = CapsulesGenerateRequest(**request)


        result = extract_json(json, payload)

        assert result.title == "Passage du MCD au MLD"
        assert result.themes == "base de données, MCD, MLD"
        assert len(result.flashcards) == 1
        assert result.flashcards[0].question == "Qu'est-ce que le MLD ?"
        assert len(result.summary) >= 1
        assert len(result.quiz) == 1
        assert result.quiz[0].question == "Quel est le rôle d'une clé étrangère ?"
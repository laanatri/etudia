import pytest
from pydantic import ValidationError
from app.models.capsules_output_models import CapsulesOutput, Flashcard

# pour lancer tout les tests
# $ pytest 

class TestCapsulesOutput:

    # Flashcards

    def test_valid_flashcard(self):

        data = {
            "question": "Qu'est-ce qu'une clé primaire ?",
            "answer": "La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles."
        }

        flashcard = Flashcard(**data)
        assert flashcard.question == "Qu'est-ce qu'une clé primaire ?"
        assert flashcard.answer == "La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles."
        assert len(flashcard.question) <= 150
        assert len(flashcard.answer) <= 500



    def test_question_to_long(self):

        data = {
            "question": "La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles. La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles.",
            "answer": "La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles."
        }
        with pytest.raises(ValidationError):
            Flashcard(**data)



    def test_empty_question(self):

        data = {
            "question": "",
            "answer": "La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles."
        }
        with pytest.raises(ValidationError):
            Flashcard(**data)



    def test_answer_to_long(self):

        data = {
            "question": "Qu'est-ce qu'une clé primaire ?",
            "answer": "La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles. La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles. La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles. La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles. La clé primaire est un identifiant unique pour chaque enregistrement dans une table, et ses valeurs sont non nulles."
        }
        with pytest.raises(ValidationError):
            Flashcard(**data)



    def test_empty_answer(self):

        data = {
            "question": "Qu'est-ce qu'une clé primaire ?",
            "answer": ""
        }
        with pytest.raises(ValidationError):
            Flashcard(**data)


    
    # Summary

    def test_summary_valid(self):

        summary_content = "<span className=\"bold\">Le passage du MCD au MLD</span> est une étape cruciale dans la conception des bases de données. Le <span className=\"keyword\">Modèle Conceptuel de Données (MCD)</span> doit être transformé en <span className=\"keyword\">Modèle Logique de Données (MLD)</span> pour être implanté dans une base de données relationnelle. <ul className=\"bullet-list\"><li>Le MLD est également connu sous d'autres abréviations comme MLDR, MRD, et MLRD.</li><li>Le MCD ne peut pas être directement implanté sans modifications.</li><li>Les règles de passage sont essentielles pour garantir l'intégrité des données.</li></ul> <span className=\"underline\">Règle numéro 1</span>: Une entité du MCD devient une relation, c'est-à-dire une table. Chaque table est composée de lignes (enregistrements) et de colonnes (attributs). La clé primaire est définie pour identifier de manière unique chaque enregistrement. <span className=\"underline\">Règle numéro 2</span>: Une association de type 1:N se traduit par une clé étrangère dans la relation de l'entité côté '1'. <span className=\"underline\">Règle numéro 3</span>: Une association de type N:N nécessite la création d'une nouvelle relation avec des clés étrangères. Les propriétés de l'association deviennent des attributs de cette nouvelle relation. <span className=\"italic\">Exemples pratiques</span> illustrent ces règles, comme la relation entre un marin et un voilier, ou entre un appartement et une place de parking. Les associations réflexives et ternaires suivent également ces règles. En résumé, le passage du MCD au MLD est un processus structuré qui permet de préparer les données pour leur stockage efficace dans une base de données relationnelle."
        data = {
            "title": "Passage du MCD au MLD",
            "themes": "base de données, MCD, MLD",
            "flashcards": None,
            "summary": summary_content,
            "quiz": None
        }
        capsules = CapsulesOutput(**data)
        assert capsules.summary == summary_content
        assert len(capsules.summary) <= 5000



    def test_summary_invalid(self):

        summary_content = "s" * 5001
        data = {
            "title": "Passage du MCD au MLD",
            "themes": "base de données, MCD, MLD",
            "flashcards": None,
            "summary": summary_content,
            "quiz": None
        }
        with pytest.raises(ValidationError):
            CapsulesOutput(**data)


    # Quiz

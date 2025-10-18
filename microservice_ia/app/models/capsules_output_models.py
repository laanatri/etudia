from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Annotated, List, Optional

# BaseModel : modéle de donnée avec validation auto
# lève une Exception si non conforme

class Flashcard(BaseModel):
    question: Annotated[str, Field(min_length=1, max_length=150)]
    answer: Annotated[str, Field(min_length=1, max_length=500)]

class QuizQuestion(BaseModel):
    question: Annotated[str, Field(min_length=1, max_length=120)]
    answers: Annotated[List[str], Field(min_length=4, max_length=4)]
    correct_answer: Annotated[int, Field(ge=0, le=3)]

# ce que je reçois de GPT
class CapsulesOutput(BaseModel):
    title: Annotated[str, Field(min_length=1, max_length=100)]
    themes: str
    flashcards: Optional[List[Flashcard]] = None
    summary: Optional[Annotated[str, Field(max_length=5000)]] = None
    quiz: Optional[List[QuizQuestion]] = None

    # pydantic lance auto la validation
    @field_validator('themes')
    @classmethod
    def validate_themes(classe, themes):
        theme_list = [themes.strip() for theme in themes.split(",")]
        if len(theme_list) > 3:
            raise ValueError("3 thèmes max autorisés")
        return themes
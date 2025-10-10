from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Annotated

# BaseModel : modéle de donnée avec validation auto
# lève une Exception si non conforme

class BlocConfig(BaseModel):
    create: bool
    number: Annotated[int, Field(ge=1, le=50)] = 20

class SummaryConfig(BaseModel):
    create: bool

class QuizConfig(BaseModel):
    create: bool
    number: Annotated[int, Field(ge=1, le=50)] = 20

class CapsulesConfig(BaseModel):
    bloc: BlocConfig
    summary: SummaryConfig
    quiz: QuizConfig

# ce que je reçois pour construire ma demande à GPT
class CapsulesGenerateRequest(BaseModel):
    course_url: HttpUrl
    capsules: CapsulesConfig

    # pydantic lance auto la validation
    @field_validator('capsules')
    @classmethod
    def validate_one_capsule_min(classe, capsules_config):
        if not any([capsules_config.bloc.create, capsules_config.summary.create, capsules_config.quiz.create]):
            raise ValueError("Au minimum une capsule doit être demandée")
        return capsules_config
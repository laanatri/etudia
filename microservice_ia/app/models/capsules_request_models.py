from pydantic import BaseModel, Field, HttpUrl, field_validator, model_validator
from typing import Annotated, Optional

# BaseModel : modéle de donnée avec validation auto
# lève une Exception si non conforme

class BlocConfig(BaseModel):
    create: bool
    number: Optional[int] = Field(default=20, ge=0, le=50)

    @model_validator(mode='after')
    def validate_create_and_number(self):
        if self.create is True and (self.number is None or self.number <= 0):
            raise ValueError("Si create=True, number doit être > 0")
        
        if self.create is False and self.number is not None and self.number > 0:
            raise ValueError("Si create=False, number doit être 0 ou None")
        
        return self
    
class SummaryConfig(BaseModel):
    create: bool

class QuizConfig(BaseModel):
    create: bool
    number: Optional[int] = Field(default=20, ge=0, le=50)

    @model_validator(mode='after')
    def validate_create_and_number(self):
        if self.create is True and (self.number is None or self.number <= 0):
            raise ValueError("Si create=True, number doit être > 0")
        
        if self.create is False and self.number is not None and self.number > 0:
            raise ValueError("Si create=False, number doit être 0 ou None")
        
        return self
    
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
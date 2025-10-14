from pydantic import BaseModel
from typing import Optional

class CapsulesDatas(BaseModel):
    flashcards: Optional[list] = None
    summary: Optional[str] = None
    quiz: Optional[list] = None

class MetaDatas(BaseModel):
    process_time: float
    prompt_tokens: Optional[int] = None
    tokens_used: Optional[int] = None

class CapsulesResponse(BaseModel):
    title: str
    themes: str
    capsules: CapsulesDatas
    meta: MetaDatas
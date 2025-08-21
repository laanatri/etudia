import os
import json
import requests
from fastapi import FastAPI, Query
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=API_KEY)

app = FastAPI()

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.get("/flashcards")
def create_flashcards(cours_url: str = Query(..., description="URL du fichier cours")):

    resp = requests.get(cours_url)
    if resp.status_code != 200:
        return {"error": f"Impossible de télécharger le fichier ({resp.status.code})"}
    cours_text = resp.text

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        temperature=0,
        max_tokens=300,
        messages=[
            {
                "role": "system",
                "content": (
                    "Tu es un générateur de flashcards. "
                    "Tu ne dois utiliser QUE le contenu fourni. "
                    "Si une réponse n'est pas clairement présente dans le texte, réponds 'Je ne sais pas'. "
                    "Réponds uniquement en JSON valide."
                )
            },
            {
                "role": "user",
                "content": f"""À partir de ce cours : {cours_text}

                Génère exactement 3 flashcards sous forme JSON.
                Format attendu :
                [
                {{"question": "Question 1 ?", "answer": "Réponse 1"}},
                {{"question": "Question 2 ?", "answer": "Réponse 2"}},
                {{"question": "Question 3 ?", "answer": "Réponse 3"}}
                ]"""
            }
        ]
    )

    content = response.choices[0].message.content.strip()

    try:
        flashcards = json.loads(content)
    except json.JSONDecodeError:
        flashcards = {"raw_response": content}

    return {"flashcards": flashcards}
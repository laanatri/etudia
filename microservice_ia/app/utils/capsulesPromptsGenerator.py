from ..models.capsules_request_models import CapsulesGenerateRequest
from typing import List

def system_prompt_generator(payload: CapsulesGenerateRequest) -> str:

    list_capsules: List[str] = [
        capsule for capsule, condition in [
            ("flashcards", payload.capsules.bloc.create),
            ("résumé", payload.capsules.summary.create), 
            ("questions en qcm (4 possibilités)", payload.capsules.quiz.create)
        ] if condition
    ]

    format_json: List[str] = ["\"title\":\"...\",\"themes\":\"thème1, thème2, ...\""]

    if payload.capsules.bloc.create:
        format_json.append("\"flashcards\":[{\"question\":\"...\",\"answer\":\"...\"}, ...]")
    if payload.capsules.summary.create:
        format_json.append("\"summary\":\"...\"")
    if payload.capsules.quiz.create:
        format_json.append("\"quiz\":[{\"question\":\"...\",\"answers\":[\"A\",\"B\",\"C\",\"D\"],\"correct_answer\":0}]")

    system_prompt = f"""
        Tu es un générateur de capsules éducatives ({', '.join(list_capsules)}). UTILISE UNIQUEMENT le contenu fourni.
        RÉPONDS STRICTEMENT et UNIQUEMENT par UN OBJET JSON BRUT, sans préface, sans explication,
        sans code fence (```) et sans guillemets entourant l'objet entier. Ne pas échapper les guillemets internes.
        Format EXACT du json attendu : {{{', '.join(format_json)}}}.
        Ne renvoie rien d'autre.
        """

    return system_prompt




def user_prompt_generator(course_text: str, payload: CapsulesGenerateRequest) -> str :

    list_capsules: List[str] = [
        capsule for capsule, condition in [
            (f"{payload.capsules.bloc.number} flashcards", payload.capsules.bloc.create),
            ("un résumé", payload.capsules.summary.create), 
            (f"{payload.capsules.quiz.number} questions qcm avec 4 réponses possibles)", payload.capsules.quiz.create)
        ] if condition
    ]

    specs_capsules: List[str] = []

    if payload.capsules.bloc.create:
        specs_capsules.append(f"\"flashcards\" = tableau de {payload.capsules.bloc.number} objets {{\"question\":\"...\",\"answer\":\"...\"}} (question ≤ 150 caractères, answer ≤ 500 caractères)")
    if payload.capsules.summary.create:
        specs_capsules.append("""
                                \"summary\" = résumé DÉTAILLÉ du cours (MINIMUM 1000 caractères, MAXIMUM 5000 caractères).
                                Le résumé doit couvrir les points principaux du cours de manière claire et structurée.
                                Adapte le contenu selon le type de cours (concepts, définitions, méthodes, exemples, etc.).
                                Format JSX avec classes CSS :
                                <span className="bold">texte gras</span>, 
                                <span className="italic">texte italique</span>, 
                                <span className="highlight">texte surligné</span>, 
                                <span className="underline">texte souligné</span>, 
                                <ul className="bullet-list"><li>points importants</li></ul>, 
                                <span className="keyword">mots-clés</span>
                            """)
    if payload.capsules.quiz.create:
        specs_capsules.append(f"\"quiz\" = tableau de {payload.capsules.quiz.number} objets {{\"question\":\"...\",\"answers\":[\"...\",\"...\",\"...\",\"...\"],\"correct_answer\":...}} (question ≤ 120 caractères, answers ≤ 80 caractères chacune)")

    user_prompt = f"""
        Génère exactement {', '.join(list_capsules)} à partir du texte ci‑dessous. 
        Pour le résumé : sois complet et informatif, couvre les éléments importants du cours.
        RÉPONDS SEULEMENT avec UN OBJET JSON EXACTEMENT comme indiqué ci‑dessus, rien d'autre. 
        Champs obligatoires : 
        "title" (≤ 100 caractères), 
        "themes" = chaîne de 1 à 3 thèmes séparés par des virgules (un à deux mots maximum par thème ou acronyme), 
        {chr(10).join(specs_capsules)}.
        Ne pas utiliser de markdown, pas de backticks, pas d'explications, pas d'exemples supplémentaires. 
        Voici le texte du cours : {course_text}
        """

    return user_prompt
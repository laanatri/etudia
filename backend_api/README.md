# API Étud IA – Documentation

Base URL (développement) :  
`http://localhost:8080`

Cette API permet de :
- gérer les utilisateurs,
- créer et lire les cours,
- générer du contenu pédagogique (capsules : résumé, quiz, flashcards),
- gérer les favoris,
- récupérer les statistiques liées aux révisions et aux quiz,
- s’authentifier pour obtenir un jeton JWT.

Certaines routes nécessitent un utilisateur authentifié (envoi d’un JWT dans l’en-tête `Authorization: Bearer <token>`).  
La route `/auth/generateToken` est publique et sert à obtenir ce jeton.

---

## Sommaire

1. [Authentification](#1-authentification)  
2. [Utilisateurs](#2-utilisateurs)  
3. [Cours](#3-cours)  
4. [Capsules IA (génération de contenu)](#4-capsules-ia-génération-de-contenu)  
5. [Quiz et questions](#5-quiz-et-questions)  
6. [Blocs / Flashcards / Résumés](#6-blocs--flashcards--résumés)  
7. [Lecture / Reading](#7-lecture--reading)  
8. [Schémas (modèles de données)](#8-schémas-modèles-de-données)

---

## 1. Authentification

### `POST /auth/generateToken`

Authentifie un utilisateur à partir d’un `username` et d’un `password`.  
Retourne un jeton JWT et les informations du profil si les identifiants sont valides.

**Body (AuthRequest) :**
```json
{
  "username": "string",
  "password": "string"
}
```

**Réponse 200 (OK) :**
```json
{
  "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 123,
  "username": "etudiant1",
  "email": "etu@example.com",
  "firstname": "Alice",
  "lastname": "Martin",
  "role": "ROLE_ETUDIANT"
}
```

**Réponse 401 (Unauthorized) :**
```json
{
  "message": "Pseudo ou mot de passe invalide."
}
```

---

## 2. Utilisateurs

### `POST /user/create`
Crée un nouvel utilisateur.

**Body (User) :**
```json
{
  "username": "etudiant1",
  "firstname": "Alice",
  "lastname": "Martin",
  "email": "etu@example.com",
  "password": "motDePasseEnClair",
  "role": "ROLE_ETUDIANT"
}
```

**Réponse 200 (OK) :**
Renvoie l’utilisateur créé, y compris son `id`, ses timestamps, etc.

```json
{
  "id": 123,
  "username": "etudiant1",
  "firstname": "Alice",
  "lastname": "Martin",
  "email": "etu@example.com",
  "role": "ROLE_ETUDIANT",
  "createdAt": "2025-10-29T10:15:00Z",
  "updatedAt": "2025-10-29T10:15:00Z"
}
```

> Remarque : côté base, le mot de passe est stocké haché (BCrypt), jamais en clair.

---

### `GET /user/read`
Retourne la liste de tous les utilisateurs.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 123,
    "username": "etudiant1",
    "firstname": "Alice",
    "lastname": "Martin",
    "email": "etu@example.com",
    "role": "ROLE_ETUDIANT",
    "createdAt": "2025-10-29T10:15:00Z",
    "updatedAt": "2025-10-29T10:15:00Z"
  }
]
```

---

### `PATCH /user/update/{id}`
Met à jour les informations d’un utilisateur.

**Path params :**
- `id` *(int)* : l’ID utilisateur.

**Body (User) :**
```json
{
  "username": "nouveauUsername",
  "firstname": "Alice",
  "lastname": "Martin",
  "email": "etu@example.com",
  "password": "nouveauMotDePasse",
  "role": "ROLE_ETUDIANT"
}
```

**Réponse 200 (OK) :**
```json
{
  "message": "User updated"
}
```

*(La spec renvoie `type: object`, donc le contenu exact dépend de l’implémentation.)*

---

### `DELETE /user/delete/{id}`
Supprime un utilisateur.

**Path params :**
- `id` *(int)* : l’ID utilisateur à supprimer.

**Réponse 200 (OK) :**
```json
"Utilisateur supprimé"
```

*(La spec indique un `string`.)*

---

## 3. Cours

### `POST /course/create`
Crée un cours et l’associe à un utilisateur.

**Body (Course) :**
```json
{
  "name": "Cours de biologie cellulaire",
  "courseUrl": "https://drive.google.com/mon-pdf",
  "user": {
    "id": 123
  }
}
```

**Réponse 200 (OK) :**
```json
{
  "id": 456,
  "name": "Cours de biologie cellulaire",
  "courseUrl": "https://drive.google.com/mon-pdf",
  "createdAt": "2025-10-29T10:15:00Z",
  "user": {
    "id": 123,
    "username": "etudiant1",
    "role": "ROLE_ETUDIANT"
  }
}
```

---

### `GET /course/user/{user_id}`
Retourne tous les cours créés par un utilisateur donné.

**Path params :**
- `user_id` *(int)* : ID de l’utilisateur.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 456,
    "name": "Cours de biologie cellulaire",
    "courseUrl": "https://drive.google.com/mon-pdf",
    "createdAt": "2025-10-29T10:15:00Z"
  }
]
```

*(Schéma `CourseDto`.)*

---

### `GET /course/read/{course_id}`
Récupère le détail d’un cours spécifique.

**Path params :**
- `course_id` *(int)* : ID du cours.

**Réponse 200 (OK) :**
```json
{
  "id": 456,
  "name": "Cours de biologie cellulaire",
  "courseUrl": "https://drive.google.com/mon-pdf",
  "createdAt": "2025-10-29T10:15:00Z"
}
```

---

## 4. Capsules IA (génération de contenu)

### `POST /capsule/create`
Génère des contenus pédagogiques (capsules) à partir d’un cours.  
Une “capsule” peut être : des flashcards, un résumé, un quiz.

**Body (CapsulesCreateRequest) :**
```json
{
  "user_id": 123,
  "course_id": 456,
  "course": {
    "name": "Cours de biologie cellulaire",
    "courseUrl": "https://drive.google.com/mon-pdf"
  },
  "capsules": {
    "flashcard": { "create": true, "number": 10 },
    "summary":   { "create": true },
    "quiz":      { "create": true, "number": 15 }
  }
}
```

- `flashcard.number` = combien de flashcards générer.  
- `quiz.number` = combien de questions de quiz générer.  
- `summary.create` = demander un résumé synthétique du cours.

**Réponse 200 (OK) :**
```json
true
```

*(booléen indiquant si la génération a été lancée avec succès.)*

---

## 5. Quiz et questions

### `GET /quiz/user/{user_id}`
Retourne les quiz d’un utilisateur.

**Path params :**
- `user_id` *(int)* : ID utilisateur.

**Query params :**
- `favorite` *(boolean, optionnel, défaut `false`)* : ne renvoyer que les quiz favoris si `true`.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 99,
    "name": "Quiz : Division cellulaire",
    "themes": "mitose, méiose",
    "createdAt": "2025-10-29T10:15:00Z",
    "isFavorite": true,
    "bestScore": 18
  }
]
```

*(Schéma `QuizDto`.)*

---

### `PATCH /quiz/favorite/{quiz_id}`
Bascule l’état “favori / pas favori” pour un quiz.

**Path params :**
- `quiz_id` *(int)* : ID du quiz.

**Réponse 200 (OK)**  
Pas de body dans la spec, juste confirmation.

---

### `GET /question/quiz/{quiz_id}`
Retourne les questions associées à un quiz.

**Path params :**
- `quiz_id` *(int)* : ID du quiz.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 1,
    "text": "Quelle est la fonction des mitochondries ?",
    "quizId": 99,
    "answers": [
      { "id": 10, "text": "Produire de l'énergie (ATP)", "isCorrect": true },
      { "id": 11, "text": "Stocker l'ADN", "isCorrect": false },
      { "id": 12, "text": "Synthétiser les protéines", "isCorrect": false },
      { "id": 13, "text": "Dégrader les toxines", "isCorrect": false }
    ]
  }
]
```

*(Schéma `QuestionDto`, avec `answers` = liste d’`AnswerDto`, 4 réponses par question.)*

---

## 6. Blocs / Flashcards / Résumés

Ces routes sont liées au contenu pédagogique consommable par l’utilisateur (blocs de révision, flashcards, résumés générés, favoris).

### `GET /flashcard/bloc/{bloc_id}`
Retourne toutes les flashcards associées à un bloc.

**Path params :**
- `bloc_id` *(int)* : ID du bloc.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 501,
    "question": "Qu'est-ce qu'une cellule eucaryote ?",
    "answer": "Cellule avec un noyau délimité.",
    "blocId": 42
  }
]
```

*(Schéma `FlashCardDto`.)*

---

### `GET /summary/user/{user_id}`
Retourne les résumés générés pour un utilisateur.

**Path params :**
- `user_id` *(int)* : ID utilisateur.

**Query params :**
- `favorite` *(boolean, optionnel)* : filtre sur les favoris.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 321,
    "name": "Résumé : La mitose",
    "themes": "cycle cellulaire",
    "summaryUrl": "https://cdn.exemple/resume-321.pdf",
    "createdAt": "2025-10-29T10:15:00Z",
    "isFavorite": true
  }
]
```

*(Schéma `SummaryDto`.)*

---

### `PATCH /summary/favorite/{summary_id}`
Ajoute ou retire un résumé des favoris.

**Path params :**
- `summary_id` *(int)* : ID du résumé.

**Réponse 200 (OK)**  
Pas de body dans la spec.

---

### `GET /bloc/user/{user_id}`
Retourne les blocs de révision pour un utilisateur (un “bloc” peut regrouper plusieurs contenus : flashcards, quiz, etc.).

**Path params :**
- `user_id` *(int)* : ID utilisateur.

**Query params :**
- `favorite` *(boolean, optionnel, défaut `false`)* : filtre favoris.

**Réponse 200 (OK) :**
```json
[
  {
    "id": 42,
    "name": "Bloc : Cycle cellulaire",
    "themes": "mitose, phases G1/S/G2",
    "createdAt": "2025-10-29T10:15:00Z",
    "isFavorite": true,
    "bestScore": 18
  }
]
```

*(Schéma `BlocDto`.)*

---

### `PATCH /bloc/favorite/{bloc_id}`
Bascule l’état “favori / pas favori” pour un bloc.

**Path params :**
- `bloc_id` *(int)* : ID du bloc.

**Réponse 200 (OK)**  
Pas de body dans la spec.

---

## 7. Lecture / Reading

Ces endpoints servent à suivre la progression de l’utilisateur : lecture d’un bloc de révision, score à un quiz, etc.

### `POST /reading/create`
Enregistre une session de lecture / révision effectuée par l’utilisateur sur un bloc.

**Body (ReadingRequestDto) :**
```json
{
  "score": 15,
  "blocId": 42
}
```

**Réponse 200 (OK) :**
```json
123
```

Ici la réponse est un entier (`int32`). Souvent : l’ID créé ou le code de suivi.

---

### `POST /game/create`
Enregistre un score de quiz / jeu pour l’utilisateur.

**Body (GameRequestDto) :**
```json
{
  "score": 18,
  "quizId": 99
}
```

**Réponse 200 (OK) :**
```json
456
```

Même principe : réponse = entier (`int32`), souvent l’ID du score.

---

## 8. Schémas (modèles de données)

### User
```json
{
  "id": 123,
  "username": "etudiant1",
  "firstname": "Alice",
  "lastname": "Martin",
  "email": "etu@example.com",
  "password": "******",
  "role": "ROLE_ETUDIANT",
  "createdAt": "2025-10-29T10:15:00Z",
  "updatedAt": "2025-10-29T10:15:00Z"
}
```

`role` peut être :
- `ROLE_ETUDIANT`
- `ROLE_ADMIN`

---

### Course / CourseDto / CourseInfos
```json
{
  "id": 456,
  "name": "Cours de biologie cellulaire",
  "courseUrl": "https://drive.google.com/mon-pdf",
  "createdAt": "2025-10-29T10:15:00Z"
}
```

`CourseInfos` est la version “légère” envoyée en entrée (nom + URL).

---

### CapsulesCreateRequest
```json
{
  "user_id": 123,
  "course_id": 456,
  "course": {
    "name": "Cours de biologie cellulaire",
    "courseUrl": "https://drive.google.com/mon-pdf"
  },
  "capsules": {
    "flashcard": { "create": true, "number": 10 },
    "summary":   { "create": true },
    "quiz":      { "create": true, "number": 15 }
  }
}
```

---

### QuizDto
```json
{
  "id": 99,
  "name": "Quiz : Division cellulaire",
  "themes": "mitose, méiose",
  "createdAt": "2025-10-29T10:15:00Z",
  "isFavorite": true,
  "bestScore": 18
}
```

---

### QuestionDto / AnswerDto
```json
{
  "id": 1,
  "text": "Quelle est la fonction des mitochondries ?",
  "quizId": 99,
  "answers": [
    { "id": 10, "text": "Produire de l'énergie (ATP)", "isCorrect": true },
    { "id": 11, "text": "Stocker l'ADN", "isCorrect": false },
    { "id": 12, "text": "Synthétiser les protéines", "isCorrect": false },
    { "id": 13, "text": "Dégrader les toxines", "isCorrect": false }
  ]
}
```

---

### SummaryDto
```json
{
  "id": 321,
  "name": "Résumé : La mitose",
  "themes": "cycle cellulaire",
  "summaryUrl": "https://cdn.exemple/resume-321.pdf",
  "createdAt": "2025-10-29T10:15:00Z",
  "isFavorite": true
}
```

---

### FlashCardDto
```json
{
  "id": 501,
  "question": "Qu'est-ce qu'une cellule eucaryote ?",
  "answer": "Cellule avec un noyau délimité.",
  "blocId": 42
}
```

---

### BlocDto
```json
{
  "id": 42,
  "name": "Bloc : Cycle cellulaire",
  "themes": "mitose, phases G1/S/G2",
  "createdAt": "2025-10-29T10:15:00Z",
  "isFavorite": true,
  "bestScore": 18
}
```

---

### ReadingRequestDto
```json
{
  "score": 15,
  "blocId": 42
}
```

---

### GameRequestDto
```json
{
  "score": 18,
  "quizId": 99
}
```

---

### Fin

Ce document est basé sur la spécification OpenAPI exposée par le backend Spring Boot (`/v3/api-docs`).  
Il peut être régénéré automatiquement et reste donc aligné avec le code réel de l’API.

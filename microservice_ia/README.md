# API Microservice IA – Documentation

Base URL (développement) :  
`http://localhost:8000`

Ce microservice IA génère des "capsules" pédagogiques (résumés, quiz, flashcards / blocs) à partir d'une source de cours.  
Il expose aussi un endpoint racine simple de statut.

FastAPI génère automatiquement :
- la spécification OpenAPI (`/openapi.json`),
- la doc Swagger (`/docs`),
- la doc ReDoc (`/redoc`).

---

## Sommaire

1. [Endpoints](#1-endpoints)  
   1.1 [`GET /`](#get-)  
   1.2 [`POST /generate/capsules`](#post-generatecapsules)  
2. [Modèles de requête et de réponse](#2-modèles-de-requête-et-de-réponse)  
   - `CapsulesGenerateRequest`  
   - `CapsulesResponse`  
   - `CapsulesConfig`, `BlocConfig`, `SummaryConfig`, `QuizConfig`  
   - `CapsulesDatas`  
   - `MetaDatas`  
3. [Erreurs de validation](#3-erreurs-de-validation)  
4. [Sécurité et accès](#4-sécurité-et-accès)

---

## 1. Endpoints

### `GET /`

**Résumé :**  
Endpoint racine. Sert de vérification simple que le service répond.

**Réponse 200 :**
```json
{}
```

(Aucune structure précise n'est imposée dans le schéma.)

---

### `POST /generate/capsules`

**Résumé :**  
Génère des capsules pédagogiques à partir d'une ressource de cours.  
Les capsules possibles incluent :
- un bloc de flashcards / questions-réponses,
- un résumé,
- un quiz.

Cet endpoint retourne à la fois le contenu généré et des métadonnées (temps de traitement, tokens utilisés, etc.).

**Headers optionnels :**
- `x-service-key: string`  
  Clé de service interne. Peut être utilisée pour sécuriser l'appel depuis un autre service backend.

**Body attendu (`CapsulesGenerateRequest`) :**
```json
{
  "course_url": "https://exemple.com/mon-cours.pdf",
  "capsules": {
    "bloc": {
      "create": true,
      "number": 20
    },
    "summary": {
      "create": true
    },
    "quiz": {
      "create": true,
      "number": 20
    }
  }
}
```

**Détails :**
- `course_url` (string, format URI, obligatoire)  
  URL de la ressource du cours à analyser (PDF, support, etc.).
- `capsules` (obligatoire)  
  Configuration de ce qu’on veut générer (bloc / résumé / quiz).  
  Chaque sous-partie a un booléen `create`, et éventuellement un `number`.

**Réponse 200 (`CapsulesResponse`) :**
```json
{
  "title": "Biologie Cellulaire : Cycle Cellulaire",
  "themes": "mitose; phases G1/S/G2",
  "capsules": {
    "flashcards": [
      /* tableau d'éléments générés pour l'apprentissage actif */
    ],
    "summary": "Texte de synthèse du contenu du cours...",
    "quiz": [
      /* tableau de questions/réponses générées */
    ]
  },
  "meta": {
    "process_time": 1.234,
    "prompt_tokens": 1234,
    "tokens_used": 5678
  }
}
```

**Réponse 422 (Validation Error) :**
```json
{
  "detail": [
    {
      "loc": ["body", "course_url"],
      "msg": "Field required",
      "type": "missing"
    }
  ]
}
```

> 422 est renvoyé automatiquement par FastAPI quand le corps de la requête ne correspond pas au schéma attendu  
> (champ manquant, mauvais type, valeur hors limites, etc.).

---

## 2. Modèles de requête et de réponse

Cette section décrit les schémas présents dans la spec OpenAPI.  
Tous ces modèles sont générés automatiquement par FastAPI / Pydantic.

---

### `CapsulesGenerateRequest`

Requête envoyée à `POST /generate/capsules`.

```json
{
  "course_url": "string (URL obligatoire)",
  "capsules": {
    "bloc": {
      "create": true,
      "number": 20
    },
    "summary": {
      "create": true
    },
    "quiz": {
      "create": true,
      "number": 20
    }
  }
}
```

Champs :
- `course_url` *(string, uri, obligatoire)*  
  Lien vers la ressource du cours.  
  - longueur min : 1  
  - longueur max : 2083  
  - doit être une URI valide

- `capsules` *(CapsulesConfig, obligatoire)*  
  Demande de génération pour chaque type de capsule.

---

### `CapsulesConfig`

Configuration détaillée de ce qu’on veut générer.

```json
{
  "bloc": {
    "create": true,
    "number": 20
  },
  "summary": {
    "create": true
  },
  "quiz": {
    "create": true,
    "number": 20
  }
}
```

Champs :
- `bloc` *(BlocConfig, obligatoire)*  
- `summary` *(SummaryConfig, obligatoire)*  
- `quiz` *(QuizConfig, obligatoire)*  

#### `BlocConfig`

```json
{
  "create": true,
  "number": 20
}
```

- `create` *(boolean, obligatoire)* : demander ou non la génération de ce bloc.  
- `number` *(integer ou null, optionnel)* : nombre d’éléments à générer.  
  - min : 0  
  - max : 50  
  - défaut : 20  

#### `SummaryConfig`

```json
{
  "create": true
}
```

- `create` *(boolean, obligatoire)* : générer un résumé du contenu.

#### `QuizConfig`

```json
{
  "create": true,
  "number": 20
}
```

- `create` *(boolean, obligatoire)* : générer un quiz.  
- `number` *(integer ou null, optionnel)* : nombre de questions souhaitées.  
  - min : 0  
  - max : 50  
  - défaut : 20  

---

### `CapsulesResponse`

Réponse renvoyée en cas de succès par `POST /generate/capsules`.

```json
{
  "title": "string",
  "themes": "string",
  "capsules": {
    "flashcards": [
      /* array | null */
    ],
    "summary": "string ou null",
    "quiz": [
      /* array | null */
    ]
  },
  "meta": {
    "process_time": 1.234,
    "prompt_tokens": 1234,
    "tokens_used": 5678
  }
}
```

Champs :
- `title` *(string, obligatoire)*  
  Titre global du contenu généré (ex: nom du chapitre).

- `themes` *(string, obligatoire)*  
  Thèmes ou sujets principaux extraits du cours.

- `capsules` *(CapsulesDatas, obligatoire)*  
  Regroupe les différents contenus générés.

- `meta` *(MetaDatas, obligatoire)*  
  Contient des informations techniques sur le traitement.

---

### `CapsulesDatas`

Contenu effectif généré.

```json
{
  "flashcards": [
    /* tableau de flashcards générées ou null */
  ],
  "summary": "Texte résumant le cours" ,
  "quiz": [
    /* tableau de questions/réponses ou null */
  ]
}
```

Champs :
- `flashcards` *(array ou null)*  
  Liste de flashcards générées (par ex. question / réponse courte).  
  Le schéma exact des éléments du tableau n’est pas détaillé dans la spec (`items: {}`).

- `summary` *(string ou null)*  
  Résumé textuel du cours.

- `quiz` *(array ou null)*  
  Liste d’éléments de quiz (souvent une question + ses propositions).  
  Le schéma exact des éléments du tableau n’est pas détaillé dans la spec (`items: {}`).

---

### `MetaDatas`

Métadonnées techniques renvoyées avec la réponse.

```json
{
  "process_time": 1.234,
  "prompt_tokens": 1234,
  "tokens_used": 5678
}
```

Champs :
- `process_time` *(number, obligatoire)*  
  Temps de traitement total (exécution IA + parsing), en secondes.

- `prompt_tokens` *(integer ou null, optionnel)*  
  Nombre de tokens envoyés au modèle IA.

- `tokens_used` *(integer ou null, optionnel)*  
  Nombre total de tokens consommés (prompt + génération).

Ces infos peuvent servir pour la supervision (coût, performance).

---

## 3. Erreurs de validation

### `HTTPValidationError`

En cas d'erreur d'entrée (mauvais type, champ manquant, etc.), FastAPI renvoie une réponse HTTP `422` avec un corps conforme à `HTTPValidationError`.

Exemple :

```json
{
  "detail": [
    {
      "loc": ["body", "capsules", "quiz", "number"],
      "msg": "Input should be greater than or equal to 0",
      "type": "value_error"
    }
  ]
}
```

Chaque élément de `detail` est un `ValidationError` :
- `loc` : où se trouve le problème (chemin dans l’objet envoyé),
- `msg` : message lisible,
- `type` : type d’erreur.

---

## 4. Sécurité et accès

### Header `x-service-key`

L’endpoint `POST /generate/capsules` accepte un header optionnel :

```http
x-service-key: <clé interne>
```

Ce header permet :
- soit de limiter l’accès à ce microservice à un autre service backend de confiance (par exemple le backend principal),
- soit de tracer l’origine de l’appel.

Schéma du header :
- `x-service-key` peut être une `string` ou `null`,
- il est marqué comme non obligatoire (`required: false`).

### Remarque importante

Le microservice n’expose pas directement une authentification utilisateur finale (JWT d’auth utilisateur).  
L’architecture attend en général que :
1. le frontend parle uniquement au backend principal (Spring),
2. le backend principal appelle ce microservice IA avec la clé interne (`x-service-key`) ou un autre mécanisme interne.

Cela évite d’exposer la génération IA directement au navigateur.

---

## Conclusion

Le microservice IA fournit :
- `GET /` pour vérifier qu’il est en ligne,
- `POST /generate/capsules` pour générer du contenu pédagogique à partir d’un cours.

Les schémas d’entrée/sortie sont stricts (Pydantic), ce qui permet :
- validation automatique des requêtes,
- documentation automatique (`/docs`, `/redoc`),
- export automatique au format OpenAPI (`/openapi.json`).

Cette documentation est dérivée directement de la spécification OpenAPI (version `3.1.0`) fournie par le service.

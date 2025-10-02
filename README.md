# ÉtudIA 🎓✨

ÉtudIA est une application d’apprentissage intelligent pensée pour les étudiants.
Elle combine révision interactive (flashcards, quiz, résumés) et IA générative (GPT-4o) pour transformer un cours en capsules de révision efficaces.

---

## 🚀 Fonctionnalités principales

- Création automatique de flashcards, résumés et quiz à partir de cours.
- Révision interactive et suivie (score, progression, statistiques).

---

## 🛠️ Technologies utilisées

### Front-end
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS + DaisyUI
- NextAuth.js
- Supabase Client

### Back-end
- Java 17
- Spring Boot 3
- Spring Security
- PostgreSQL
- Flyway
- Maven

### Microservice IA
- Python 3.13
- FastAPI
- OpenAI API (GPT-4o)

---

## 🛠️ Architecture

Le projet est organisé en trois parties :

- **Front-end** → `frontend_web/`  
  - Framework : React + Next.js  
  - Style : Tailwind CSS, DaisyUI  
  - Fonctionnalité : Progressive Web App (PWA)

- **Back-end** → `backend_api/`  
  - Langage : Java, Spring Boot  
  - Authentification : Spring Security + JWT  
  - Base de données : PostgreSQL (via Supabase)  
  - Migration : Flyway

- **Microservice IA** → `microservice_ia/`  
  - Langage : Python, FastAPI  
  - Fonctionnalité : Communication avec GPT-4o  
  - Usage : Génération de capsules

---

## 🗄️ Base de données

- **Technologie** : PostgreSQL (hébergé sur **Supabase**)  
- **Modélisation** : Relationnelle (schéma UML)  
- **Gestion des migrations** : Flyway

---

## ⚙️ Installation & lancement

### 1. Cloner le projet
```bash
git clone git@github.com:laanatri/etudia.git
cd etudia
```

### 2. Configurer les variables d'environnement

Créer les fichiers de configuration suivants :

#### Front-end (`.env.local` dans `frontend_web/`)
```env
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

#### Back-end (`.env` dans `backend_api/`)
```env
DATABASE_URL=...
AI_SERVICE_KEY=...
AI_SERVICE_URL=http://127.0.0.1:8000
```

#### Microservice IA (`.env` dans `microservice_ia/`)
```env
MICROSERVICE_SHARED_KEY=...
OPENAI_API_KEY=sk-...
```

### 3. Lancer chaque service

#### Front-end
```bash
cd frontend_web
pnpm install
pnpm run dev
```

#### Back-end
```bash
cd backend_api
./mvnw clean install
./mvnw -DskipTests spring-boot:run
```

#### Microservice IA
```bash
cd microservice_ia
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

## 🔒 Sécurité

- Authentification via JWT avec NextAuth.js  
- Sécurisation avec Spring Security  
- Chiffrement des mots de passe avec BCrypt  
- Communication sécurisée entre microservices  
- Respect des bonnes pratiques OWASP  

---

## 📊 Suivi qualité

- Tests unitaires et d’intégration  
- Vérification de l’accessibilité  
- Optimisation des performances et éco-conception

---

## 📌 Objectifs à venir

- Accès en ligne et hors-ligne (PWA).
- Ajout de plus de formats acceptés pour les cours.
- Optimisation des performances de l’IA.
- Ajout de la méthode de répétition espacée.
- Notifications push, rappels (PWA).
- Amélioration du suivi personnalisé (progression, statistiques).
- Ajout de fonctionnalités collaboratives.

---

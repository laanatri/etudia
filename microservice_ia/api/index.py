import sys
from pathlib import Path

# Ajouter microservice_ia au Python path
sys.path.insert(0, str(Path(__file__).parent.parent / "microservice_ia"))

# Importer l'app FastAPI
from main import app

# Vercel cherche automatiquement cette variable
handler = app
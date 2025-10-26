import sys
from pathlib import Path

# Le parent est maintenant microservice_ia (la racine configurée dans Vercel)
parent_path = Path(__file__).parent.parent
sys.path.insert(0, str(parent_path))

# Importer l'app depuis main.py qui est au même niveau que api/
from main import app
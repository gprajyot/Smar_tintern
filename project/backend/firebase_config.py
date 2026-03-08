import firebase_admin
import json
import os
from firebase_admin import credentials, firestore

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DEFAULT_CREDENTIALS_PATH = os.path.join(BASE_DIR, "firebase_key.json")
service_account_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")

if service_account_json:
    cred = credentials.Certificate(json.loads(service_account_json))
else:
    credentials_path = os.getenv("FIREBASE_CREDENTIALS_PATH", DEFAULT_CREDENTIALS_PATH)
    if not os.path.exists(credentials_path):
        raise FileNotFoundError(
            f"Firebase credentials file not found: {credentials_path}"
        )
    cred = credentials.Certificate(credentials_path)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()


ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID")
ADZUNA_APP_KEY = os.getenv("ADZUNA_APP_KEY")

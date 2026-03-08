# Deployment

## Render-only setup

This repository can be deployed entirely on Render with:

- one `web` service for the Flask backend
- one `static_site` service for the Vite frontend

The root Blueprint file is:

- [render.yaml](/d:/Downloads/project/ai/render.yaml)

## Backend

Render service type:

- `Web Service`

Required environment variables:

- `SECRET_KEY`
- `FRONTEND_URL`
- `FIREBASE_SERVICE_ACCOUNT_JSON`
- `EMAIL_ADDRESS`
- `EMAIL_PASSWORD`
- `ADZUNA_APP_ID`
- `ADZUNA_APP_KEY`
- `ENABLE_SCHEDULER`
- `FLASK_DEBUG`

Start command:

```bash
gunicorn app:app
```

Set `FIREBASE_SERVICE_ACCOUNT_JSON` to the full contents of your Firebase Admin SDK JSON key as a secret environment variable.

## Frontend

Render service type:

- `Static Site`

Set:

```bash
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

Build command:

```bash
npm run build
```

Output directory:

```bash
dist
```

## Deploy steps on Render

1. Push this repo to GitHub.
2. In Render, click `New +` -> `Blueprint`.
3. Connect the repository.
4. Render will detect [render.yaml](/d:/Downloads/project/ai/render.yaml) and create both services.
5. Fill in backend secrets:
   - `SECRET_KEY`
   - `FIREBASE_SERVICE_ACCOUNT_JSON`
   - `EMAIL_ADDRESS`
   - `EMAIL_PASSWORD`
   - `ADZUNA_APP_ID`
   - `ADZUNA_APP_KEY`
6. After Render creates the frontend URL, copy it into backend `FRONTEND_URL`.
7. Copy the backend URL into frontend `VITE_API_BASE_URL`.
8. Redeploy both services once so each side has the correct public URL.

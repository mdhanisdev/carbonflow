# CarbonFlow (Breathe ESG) — Prototype

This repository contains a Django REST backend and a React frontend prototype for the Breathe ESG technical assignment.

## Quick local run (development)

Backend:

```powershell
Set-Location 'C:\Users\anisx\Desktop\Carbonflow\server'
py -m pip install -r requirements.txt
py manage.py migrate
py manage.py runserver 127.0.0.1:8000
```

Frontend:

```powershell
Set-Location 'C:\Users\anisx\Desktop\Carbonflow\client'
npm install
npm run dev
```

## Deployment notes
- The assignment requires a deployed app. Recommended quick options: Railway, Render, or Heroku.
- For a simple deployment on Railway/Render:
  - Push this repo to GitHub.
  - Create a new service on Railway/Render and connect the repo.
  - Set the build commands and start command for the server to run migrations and launch Gunicorn:

```bash
py -m pip install -r server/requirements.txt
py server/manage.py migrate
gunicorn core.wsgi --bind 0.0.0.0:$PORT
```



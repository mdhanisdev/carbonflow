# CarbonFlow (Breathe ESG) — Prototype

This repository contains a Django REST backend and a React frontend prototype for the Breathe ESG technical assignment.

Live URL: (add deployed URL here)

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

- Frontend can be deployed on Vercel/Netlify or served statically; Vite build artifacts can be uploaded to static hosting.

## Submission checklist
- [ ] Deployed live URL filled above
- [ ] Shared repo access with: saurav@breatheesg.com, rahul@breatheesg.com, shivang@breatheesg.com
- [ ] `MODEL.md`, `DECISIONS.md`, `TRADEOFFS.md`, `SOURCES.md` completed (drafts provided)

---

If you want, I can:
- Create a GitHub repository and push these changes (you'll need to provide a GH token or confirm you want to do this locally).
- Prepare a Railway/Render deployment and provide exact config values.
- Improve the docs further and include example sample CSVs and a short demo account.

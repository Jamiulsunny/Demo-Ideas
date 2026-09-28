# AresGrid — Martian Map / Marswalk Planner

A professional NASA Space Apps Challenge 2026 prototype for **Interplanetary Survival Guide: Martian Map**.

> Plan safer. Walk smarter. Discover scientifically.

## What is included

- React + TypeScript + Vite frontend
- FastAPI Python backend
- Local demo dataset with explicit provenance labels
- Interactive Mars-style SVG map
- Layer controls: orbital, terrain, hazards, science, chemistry, mineralogy, subsurface, environment, AI lens
- Click-to-build Marswalk routes
- Route distance and prototype duration estimate
- Science opportunity detection along a route
- AI Science Lens demo mode with image upload
- Candidate Science Target workflow
- Science Explorer
- Dataset Explorer
- Data provenance panel
- Presentation / Demo Mode
- SQLite schema ready for future persistence
- NASA/PDS source documentation
- No fabricated NASA observations or measurements

## Important data note

The current prototype intentionally runs in **DEMO DATA** mode. NASA's public Mars Rover API is archived, so this project does not pretend that an old rover endpoint is live. The architecture instead points to current NASA/PDS resources and keeps live-data adapters modular.

Verified sources used in the project documentation include:
- NASA Planetary Data System (PDS)
- NASA Open Data AI4MARS
- NASA PDS Mars 2020 mission bundle
- NASA PDS data release pages

## Requirements

- Node.js 20+
- npm 10+
- Python 3.11+

## Run in VS Code

### 1. Frontend

Open a terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite, normally:

```text
http://localhost:5173
```

### 2. Backend

Open a second terminal:

```bash
cd backend
python -m venv .venv
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Windows CMD:

```cmd
.venv\Scripts\activate
```

Then:

```bash
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

Backend:
```text
http://localhost:8000
```

API docs:
```text
http://localhost:8000/docs
```

The frontend works without the backend for demo mode, but the backend is included for the intended full architecture.

## Project structure

```text
martian-map/
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ data/
│  │  ├─ pages/
│  │  ├─ services/
│  │  ├─ types/
│  │  ├─ App.tsx
│  │  ├─ main.tsx
│  │  └─ styles.css
│  └─ package.json
├─ backend/
│  ├─ app/
│  │  ├─ main.py
│  │  └─ data.py
│  └─ requirements.txt
├─ data/
│  ├─ demo/
│  ├─ metadata/
│  └─ models/
├─ docs/
│  ├─ architecture.md
│  ├─ data-sources.md
│  ├─ ai-methodology.md
│  ├─ scientific-methodology.md
│  └─ limitations.md
├─ database/
│  └─ schema.sql
├─ .env.example
└─ README.md
```

## Demo flow for judges

1. Open Dashboard.
2. Go to **Martian Map**.
3. Toggle terrain + science + hazards.
4. Click a science marker.
5. Open **AI Science Lens** and upload a Mars image.
6. Show the result as **Candidate Science Target**, not a discovery.
7. Add the candidate to the map.
8. Open **Marswalk Planner**.
9. Click several points to create a route.
10. Show distance, estimated time, hazards and science opportunities.
11. Open **Data Sources** to show provenance and limitations.

## Scientific honesty

The application distinguishes:

- `DEMO DATA` — local demonstration values
- `NASA / PDS SOURCE` — source reference only
- `MODEL-DERIVED` — calculated by the prototype
- `DEMO / SIMULATED AI` — not a scientific observation
- `CANDIDATE SCIENCE TARGET` — requires human/scientist verification

It never claims that the AI discovered life or that a route is astronaut-safe.

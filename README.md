# ALEI Frontend

React single-page application for the ALEI (Agentic Lead Engagement Intelligence) platform. Provides the marketing landing page (About, Solutions, Pricing, FAQ), the interactive demo flow, and the vendor dashboard.

## Tech Stack

- **Library:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Vanilla CSS (component-scoped)

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- The backend (`../final_backend`) running on `http://localhost:5000`
- A `.env` file in this directory (see below)

### Environment Variables

Create a `.env` file in `se_project_final/`:

```
VITE_API_URL=http://localhost:5000
VITE_WS_URL=ws://localhost:5000
VITE_ALEI_PUB_KEY=alei_pub_ea4555281c96e9de7def64d678974746
```

> `.env` is gitignored and should never be committed.

### Running Locally

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

---

## Deploying to Production (Google Cloud Run)

This is the **only** canonical production flow. The frontend and backend ship in **one** Docker image ([`Dockerfile`](../Dockerfile) at repo root). All commands below run from the **project root** (`LEAI/`), one directory above this folder.

**Prerequisites:** Docker; `gcloud` CLI; for push, run once per machine: `gcloud auth configure-docker us-central1-docker.pkg.dev`.

For releases, a **Cursor agent can run steps 1–2** when you ask to deploy (build + push from `LEAI/`). **Step 3** (`gcloud run deploy`) is usually run **locally** so your GCP credentials roll the service.

### 1. Build the Docker image

```bash
docker build \
  --build-arg VITE_API_URL=https://alei.ai \
  --build-arg VITE_WS_URL=wss://alei.ai \
  --build-arg VITE_ALEI_PUB_KEY=alei_pub_ea4555281c96e9de7def64d678974746 \
  -t us-central1-docker.pkg.dev/alei-prod/alei/app:latest .
```

### 2. Push the image to Artifact Registry

```bash
docker push us-central1-docker.pkg.dev/alei-prod/alei/app:latest
```

### 3. Deploy to Cloud Run

**Important (Windows):** use **Command Prompt**, **PowerShell**, or **Google Cloud SDK Shell**. `gcloud` may fail or hang from Git Bash.

```bash
gcloud run deploy alei --project=alei-prod --image=us-central1-docker.pkg.dev/alei-prod/alei/app:latest --region=us-central1 --platform=managed --allow-unauthenticated --port=8080
```

The live site: https://alei.ai

---

## Notes

- **`VITE_ALEI_PUB_KEY`** must match the `publishableKey` stored in the database for the ALEI business account. If it is regenerated in the admin dashboard, run a **new** `docker build` (step 1) before push and deploy.
- **Any code change** that should go live needs a **new image**: steps **1** and **2**, then step **3** to point Cloud Run at that image.
- The `Dockerfile` and `.dockerignore` live at the project root (`LEAI/`) and should not be moved.

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
VITE_ALEI_PUB_KEY=alei_pub_9f27f257515ece024c7a7336efe01858
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

The frontend is bundled with the backend into a single Docker image and deployed to Cloud Run. All three commands are run from the **project root** (`LEAI/`), one level above this folder.

### 1. Build the Docker image

```bash
docker build \
  --build-arg VITE_API_URL=https://alei.ai \
  --build-arg VITE_WS_URL=wss://alei.ai \
  --build-arg VITE_ALEI_PUB_KEY=alei_pub_9f27f257515ece024c7a7336efe01858 \
  -t us-central1-docker.pkg.dev/alei-prod/alei/app:latest .
```

### 2. Push the image to Artifact Registry

```bash
docker push us-central1-docker.pkg.dev/alei-prod/alei/app:latest
```

### 3. Deploy to Cloud Run

```bash
gcloud run deploy alei \
  --image us-central1-docker.pkg.dev/alei-prod/alei/app:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

The live site will be updated at: https://alei.ai

---

## Notes

- **`VITE_ALEI_PUB_KEY`** must match the `publishableKey` stored in the database for the ALEI business account. If the key is ever regenerated via the admin dashboard, a new build is required.
- **Backend-only changes** (routes, AI config, etc.) only require steps 2 and 3 — no frontend rebuild needed.
- **Frontend changes** always require all 3 steps.
- The `Dockerfile` and `.dockerignore` live at the project root (`LEAI/`) and should not be moved.

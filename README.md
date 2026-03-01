# LEAI Frontend

React single-page application for the LEAI Sales Discovery Assistant. Provides the marketing landing page (About, Solutions, Pricing, FAQ) and the interactive demo flow where users fill out a lead form and chat with the AI assistant.

## Github Pages Reviewer 
- Open Github pages URL [LINK](https://codyhagberg.github.io/se_project_final/)
- Download the Backend Directory [LINK](https://github.com/CodyHagberg/final_backend)
- Follow instruction in the README.md file of the backend to get the api key set up and have dipendencies installed. 
- Run the backend

## Tech Stack

- **Library:** React 19
- **Build Tool:** Vite 7
- **Routing:** React Router DOM 7
- **Styling:** Vanilla CSS (component-scoped)       

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- The [LEAI backend](../leai-backend) running on `http://localhost:5000`

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:5173`.

3. **Make sure the backend is running** — the frontend calls `http://localhost:5000` for all API requests. The base URL is configured in `src/utils/api.js` if you need to change it.


### Video
[LEAI Video](https://drive.google.com/file/d/1I3AyiIjxnq31sk7Bs7kqjdjjJenx0OML/view?usp=drive_link)


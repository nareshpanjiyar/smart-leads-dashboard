# Frontend — Smart Leads Dashboard

React, TypeScript, TailwindCSS, and Vite frontend for the Smart Leads Dashboard.

## Setup

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
```

Install and run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

For Vercel deployment, `vercel.json` rewrites all client routes to `index.html` so direct visits to `/login`, `/register`, and `/dashboard` work.

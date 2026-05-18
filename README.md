<<<<<<< HEAD
# smart-leads-dashboard
Smart Leads Dashboard – Full-stack MERN (React, Node, Express, MongoDB) lead management system with JWT auth, role-based access, advanced filtering, debounced search, pagination, CSV export, and Docker support. Built with TypeScript and TailwindCSS.
=======
# Smart Leads Dashboard

Full-stack Lead Management Dashboard (MERN + TypeScript) — a project built to meet a Full-Stack Internship assignment specification.

This repository contains two main folders:

- `backend/` — Node.js + Express + TypeScript API with Mongoose (MongoDB)
- `frontend/` — React + TypeScript + Vite + TailwindCSS client

This README explains how to run the project locally, the API endpoints, environment variables, and a short compliance checklist for the assignment.

---

## Quick status

- Backend: Express + TypeScript, JWT auth, role-based access (admin/sales), leads CRUD, pagination, CSV export, validation via Zod, centralized error handling.
- Frontend: React + TypeScript, TailwindCSS, responsive layout, debounced search, CSV export, dark mode support, role-aware UI.

---

## Prerequisites

- Node.js (v18+ recommended; project has been tested with Node 18–24)
- npm
- (Optional) Docker & Docker Compose if you want to run services in containers

---

## Environment files

Backend example: `backend/.env.example` (copy to `backend/.env`)

Required keys (example):

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```

Frontend example: create `frontend/.env` (the repository includes a `.env` to point to backend for dev):

```
VITE_API_URL=http://localhost:5001/api
```

---

## Run locally (development)

1) Install dependencies

```bash
# from repo root
cd backend
npm install

# in another terminal
cd frontend
npm install
```

2) Start backend (development)

```bash
cd backend
# run once
npx ts-node src/server.ts
# or install ts-node-dev for automatic reloads (recommended)
# npm install --save-dev ts-node-dev
# npx ts-node-dev --respawn --transpile-only src/server.ts
```

3) Start frontend (development)

```bash
cd frontend
npm run dev
# open http://localhost:5173
```

Notes:
- The backend falls back to an in-memory MongoDB (mongodb-memory-server) when `MONGO_URI` is not provided; that is useful for development but is ephemeral.
- Ensure `frontend/.env` points to the correct backend URL (VITE_API_URL). Vite reads `.env` at startup, so restart Vite after changes.

---

## API - Main endpoints

Base URL (dev): http://localhost:5001/api

### Auth

- POST /api/auth/register
  - Body: { name, email, password, role? }
  - Response: 201 Created with user object and `token`
  - Example:

```json
POST /api/auth/register
Content-Type: application/json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "role": "sales" // optional, default 'sales'
}
```

Success response (201):
```json
{
  "_id": "...",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "sales",
  "token": "<jwt>"
}
```

- POST /api/auth/login
  - Body: { email, password }
  - Response: 200 OK with user + token

- GET /api/auth/profile
  - Protected: requires `Authorization: Bearer <token>`
  - Response: current user info

### Leads

All leads routes are under `/api/leads` and require authentication. Some routes are restricted by role (admin only for create/update/delete).

- GET /api/leads
  - Query params (optional): status, source, search, sort (`latest`|`oldest`), page (default 1), limit (default 10)
  - Example: `/api/leads?status=Qualified&source=Instagram&search=Rahul&page=1&limit=10`
  - Response: { data: Lead[], pagination: { total, page, limit, totalPages } }

- GET /api/leads/:id
  - Get single lead (admin & sales)

- POST /api/leads
  - Admin only
  - Body: lead fields (name, email, status, source)

- PUT /api/leads/:id
  - Admin only
  - Body: partial lead update

- DELETE /api/leads/:id
  - Admin only

- GET /api/leads/export
  - Export CSV for current filters, returns text/csv

Notes:
- Pagination is implemented server-side using `skip` and `limit` with a default limit of 10.
- Filtering, search, and sort combine together on the server.

---

## Frontend notes

- API layer: `frontend/src/services/api.ts` creates an Axios instance with `baseURL` taken from `VITE_API_URL`.
- Auth context and protected routes: `frontend/src/contexts/AuthContext.tsx` and `App.tsx` (PrivateRoute wrapper).
- Debounced search: `frontend/src/hooks/useDebounce.ts` used in `DashboardPage.tsx`.
- CSV export: UI button triggers `frontend/src/services/leadService.exportLeads` which downloads a CSV blob.
- Dark mode: supported via `ThemeContext` and a floating toggle (persisted to localStorage).

---

## Assignment compliance checklist (summary)

Mandatory items implemented (Done):
- React + TypeScript + TailwindCSS (frontend)
- Node + Express + TypeScript + Mongoose (backend)
- JWT authentication, bcrypt hashing, protected routes
- Leads CRUD with fields specified
- Advanced filtering, search, sort
- Server-side pagination (limit 10 default)
- Debounced search
- CSV export
- Role-based access control (admin / sales)

Partial / recommended improvements to reach "perfect":
- Replace a few remaining `any` usages (csv parser wrapper and some service payload types). These are low-risk and I can fix them quickly.
- Add `docker-compose.yml` to orchestrate backend + Mongo + frontend preview for a single-command dev environment.
- Add API documentation (OpenAPI or Postman collection) for reviewers.
- Add a small CI (GitHub Actions) to run `tsc --noEmit` and `npm test` if tests are added.

---

## Quick troubleshooting

- If `npm run dev` fails in frontend: run `npm install` in `frontend`, ensure `.env` exists and `VITE_API_URL` is correct.
- If backend cannot connect to Mongo: set `MONGO_URI` to a running Mongo or rely on the in-memory fallback for development.

Useful commands

```bash
# typecheck (backend)
cd backend
npx tsc --noEmit

# typecheck (frontend)
cd frontend
npx tsc --noEmit
```

---

## Next improvements I can make for you (pick one or more)

- Replace remaining `any` types and run typecheck.
- Add `docker-compose.yml` to run the stack locally.
- Create an `API.md` or OpenAPI spec and Postman collection.
- Add consistent UI loading skeletons and toast notifications.
- Add unit/integration tests (Jest / supertest) for critical API endpoints.

If you want any of these, tell me which one to start and I will implement it and run a quick verification.

---

## Contact / submission

If you need to submit this assignment, the requested artifacts are included or can be added on request:
- GitHub repository URL — push the repo and share the link
- `.env.example` — `backend/.env.example` is present
- `README.md` — this file
- API documentation — can generate on request

Good luck — tell me which next improvement I should implement and I’ll do it now.
>>>>>>> 2c9d341 (chore: prepare project for submission (docs, docker-compose, env examples, UI improvements))

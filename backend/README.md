# Backend — Smart Leads Dashboard

This document explains how to run the backend (locally or via Docker), environment variables, and API endpoints.

## Quick start (local dev)

1. Install dependencies

```bash
cd backend
npm install
```

2. Create `.env` (copy from `.env.example`) and edit values.

3. Start server

```bash
# run directly
npx ts-node src/server.ts

# recommended: install ts-node-dev
npm install --save-dev ts-node-dev
npx ts-node-dev --respawn --transpile-only src/server.ts
```

## Quick start (Docker)

Make sure Docker and Docker Compose are installed.

From repo root:

```bash
cp .env.example .env
# Edit .env if needed
docker-compose up --build
```

This will start MongoDB (port 27017) and the backend (port 5001).

## Environment variables

Copy `backend/.env.example` to `backend/.env` and set the values.

Important:
- `MONGO_URI` should point to your Mongo server (for docker-compose use `mongodb://mongo:27017/smart-leads`).
- `JWT_SECRET` must be set for production.

## API Overview

See `API.md` at repo root for details of endpoints (auth, leads, filters, pagination, export).

## Tests

None included by default. Recommended additions: Jest + supertest for API routes.

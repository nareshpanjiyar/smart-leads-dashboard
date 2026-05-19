# Smart Leads Dashboard

Full-stack Lead Management Dashboard built for the MERN internship assignment.

## Tech Stack

- Frontend: React, TypeScript, TailwindCSS, Vite
- Backend: Node.js, Express.js, TypeScript
- Database: MongoDB Atlas with Mongoose
- Auth: JWT, bcrypt password hashing
- Deployment: Vercel frontend, Render backend
- Tooling: Docker, Docker Compose

## Features

- User registration and login
- JWT protected routes
- Password hashing with bcrypt
- Auth middleware and centralized error handling
- Role-based access control: `admin` and `sales`
- Leads CRUD with Mongoose models
- Admin-only create, update, and delete
- Sales/admin read access
- Combined filtering by status, source, and search term
- Search by name or email
- Sort by latest or oldest
- Backend pagination with `skip` and `limit`
- Debounced frontend search
- CSV export
- Responsive dashboard UI
- Reusable components
- Loading, empty, and error states
- Form validation
- Dark mode support

## Folder Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    types/
    utils/
frontend/
  src/
    components/
    contexts/
    hooks/
    pages/
    services/
    types/
    utils/
```

## Environment Variables

Copy the examples and fill in real values.

Backend: `backend/.env`

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/leads-dashboard?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
CLIENT_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
```

Frontend: `frontend/.env`

```env
VITE_API_URL=http://localhost:5001/api
```

## Local Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Run backend:

```bash
cd backend
npm run dev
```

Run frontend:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

## Docker Setup

From the repository root:

```bash
docker compose up
```

Use rebuild only after dependency or Dockerfile changes:

```bash
docker compose up --build
```

## API Summary

Base URL:

```text
http://localhost:5001/api
```

Auth:

- `POST /auth/register`
- `POST /auth/login`

Leads:

- `GET /leads`
- `GET /leads/:id`
- `POST /leads`
- `PUT /leads/:id`
- `DELETE /leads/:id`
- `GET /leads/export`

See [API.md](./API.md) for details.

## Useful Commands

Backend build:

```bash
cd backend
npm run build
```

Frontend lint and build:

```bash
cd frontend
npm run lint
npm run build
```

## Assignment Checklist

- React + TypeScript: done
- TailwindCSS: done
- Node + Express + TypeScript: done
- MongoDB + Mongoose: done
- JWT auth: done
- Password hashing: done
- Protected routes: done
- Request validation: done
- Centralized error handling: done
- Leads CRUD: done
- Advanced filters and search: done
- Backend pagination: done
- Debounced search: done
- CSV export: done
- Role-based access control: done
- Docker setup: done
- Dark mode: done
- `.env.example`: done
- API documentation: done

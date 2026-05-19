# Backend — Smart Leads Dashboard

Node.js, Express, TypeScript, MongoDB, and Mongoose API for the Smart Leads Dashboard.

## Setup

Copy the environment example:

```bash
cp .env.example .env
```

Required variables:

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/leads-dashboard?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
CLIENT_ORIGINS=http://localhost:5173,https://your-frontend-domain.com
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

## Docker

From the repository root:

```bash
docker compose up
```

The Docker Compose setup runs the backend in development watch mode and expects `MONGO_URI` to point to MongoDB Atlas or another reachable MongoDB instance.

## API

See the root [API.md](../API.md).

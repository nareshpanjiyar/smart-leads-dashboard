# Smart Leads Dashboard — API Documentation (Quick)

Base URL (dev): http://localhost:5001/api

## Auth

POST /api/auth/register
- Body: { name, email, password, role? }
- Response: 201 Created with user object and token

POST /api/auth/login
- Body: { email, password }
- Response: 200 OK with user + token

GET /api/auth/profile
- Protected (Authorization header required)
- Response: current user

## Leads

GET /api/leads
- Query params: status, source, search, sort, page, limit
- Response: { data: Lead[], pagination }

GET /api/leads/:id
- Returns single lead

POST /api/leads
- Admin only
- Body: { name, email, status, source }

PUT /api/leads/:id
- Admin only
- Body: partial update

DELETE /api/leads/:id
- Admin only

GET /api/leads/export
- Exports CSV for provided filters

## Error format

Errors are returned with a JSON shape:

```json
{ "message": "Description of error" }
```

## Pagination metadata

Responses that return lists include a `pagination` object:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

## Notes

- Use `Authorization: Bearer <token>` for protected endpoints.
- CSV export returns `text/csv` with `Content-Disposition: attachment; filename=leads.csv`.


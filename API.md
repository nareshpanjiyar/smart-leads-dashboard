# Smart Leads Dashboard API

Base URL:

```text
http://localhost:5001/api
```

For production, replace the host with the deployed backend URL.

## Auth

### Register

```http
POST /auth/register
```

Body:

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123",
  "role": "sales"
}
```

Response `201`:

```json
{
  "_id": "user_id",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "sales",
  "token": "jwt_token"
}
```

### Login

```http
POST /auth/login
```

Body:

```json
{
  "email": "alice@example.com",
  "password": "password123"
}
```

Response `200`:

```json
{
  "_id": "user_id",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "sales",
  "token": "jwt_token"
}
```

## Leads

All lead endpoints require:

```http
Authorization: Bearer <token>
```

### List Leads

```http
GET /leads?status=Qualified&source=Instagram&search=Rahul&sort=latest&page=1&limit=10
```

Query parameters:

- `status`: `New`, `Contacted`, `Qualified`, `Lost`
- `source`: `Website`, `Instagram`, `Referral`
- `search`: searches name and email
- `sort`: `latest` or `oldest`
- `page`: page number
- `limit`: records per page, default `10`

Response `200`:

```json
{
  "leads": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

### Get Single Lead

```http
GET /leads/:id
```

Allowed roles: `admin`, `sales`

### Create Lead

```http
POST /leads
```

Allowed roles: `admin`

Body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "status": "New",
  "source": "Website"
}
```

### Update Lead

```http
PUT /leads/:id
```

Allowed roles: `admin`

Body supports partial lead fields.

### Delete Lead

```http
DELETE /leads/:id
```

Allowed roles: `admin`

### Export Leads CSV

```http
GET /leads/export?status=Qualified&source=Instagram&search=Rahul&sort=latest
```

Allowed roles: `admin`, `sales`

Returns:

```http
Content-Type: text/csv
Content-Disposition: attachment; filename="leads.csv"
```

## Error Format

```json
{
  "message": "Description of error"
}
```

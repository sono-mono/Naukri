
# BlueLink

BlueLink is a hyperlocal job marketplace connecting blue-collar workers with employers.

This repository now includes:

- Frontend (Vite + React)
- Backend API server (Express + TypeScript)
- Database schema (Prisma)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template:

```bash
cp .env.example .env
```

3. Generate Prisma client and create local database:

```bash
npm run prisma:generate
npm run prisma:push
```

## Run

Run frontend only:

```bash
npm run dev:web
```

Run backend only:

```bash
npm run dev:api
```

Run both together:

```bash
npm run dev:full
```

Then open:

- Frontend: `http://localhost:5173`
- API health: `http://localhost:8787/health`

## Frontend Routes (Real Pages)

- `/` (Landing)
- `/auth` (Phone + OTP login)
- `/worker/profile`
- `/worker/feed`
- `/worker/applications`
- `/employer/profile`
- `/employer/jobs`
- `/employer/applicants`

## Implemented API Routes

- `POST /auth/request-otp`
- `POST /auth/verify-otp`
- `PUT /api/users/:id/profile`
- `POST /api/jobs`
- `GET /api/jobs/feed`
- `GET /api/jobs/:id/applicants`
- `POST /api/applications`
- `PATCH /api/applications/:id/status`

Additional worker status route:

- `GET /api/applications/me`

Additional employer jobs route:

- `GET /api/jobs/mine`

## Validate API Quickly

Start API server:

```bash
npm run dev:api
```

Run full smoke test suite:

```bash
npm run smoke:api
```

## Production Readiness Baseline

Backend now includes:

- `helmet` security headers
- `morgan` HTTP logging
- `express-rate-limit` request throttling
- configurable CORS allow-list via `CORS_ORIGIN`

Recommended production env values:

- `NODE_ENV=production`
- Strong `JWT_SECRET`
- Strict `CORS_ORIGIN` (comma-separated allow-list)
- Tuned `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX`

## Notes

- OTP is mocked for dev and returned as `dev_otp` when `NODE_ENV` is not `production`.
- Job feed uses Haversine distance and limits matching radius to 25 km.
- Localization and voice/geolocation integration helpers are available in `src/app/lib`.
  
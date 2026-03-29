---
applyTo: "booking-api/**"
---

# Booking API instructions — Skovkrogen 37

## Architecture

The API is a single Express 4 server (`server.js`) with three routes:

| Method | Path                         | Purpose                       |
|--------|------------------------------|-------------------------------|
| POST   | `/api/booking`               | Submit a new booking request  |
| GET    | `/api/booking/approve/:token`| Admin approves a booking      |
| GET    | `/api/booking/reject/:token` | Admin rejects a booking       |
| GET    | `/health`                    | Health check                  |

## Module system

- Use **CommonJS** (`require` / `module.exports`). Do not use ESM `import`.
- Target Node.js ≥ 18.

## Environment variables

All secrets and configuration come from environment variables (see `.env.example`).
Required: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_EMAIL`, `API_BASE_URL`.
Never hardcode credentials or API URLs in source code.

## Input validation

- Use the `validator` npm library for email, phone, and date format checks.
- Return validation errors as a single `{ error: "..." }` JSON response (HTTP 400).
- All error messages must be in **Danish**.

## Security

- Apply `express-rate-limit` to any public-facing endpoint (default: 10 req / IP / 15 min).
- Escape all user-supplied values with `escapeHtml()` before embedding in HTML email templates.
- Generate cryptographic tokens with `crypto.randomBytes(32).toString('hex')`.
- Token TTL is 7 days — always check `expiresAt` before processing.
- Clear both `approveToken` and `rejectToken` after any status change.
- Configure CORS via `ALLOWED_ORIGINS` (comma-separated list).

## Data persistence

- Bookings are stored in `bookings.json` (gitignored, local file).
- Use `loadBookings()` / `saveBookings()` helpers for all read/write operations.
- Booking status lifecycle: `pending` → `approved` | `rejected`.

## Email templates

- Templates are inline HTML functions returning styled strings.
- All templates use the project's dark colour palette (forest/peat/sand/copper/rust/smoke).
- HTML structure: `.wrapper` > `.header` + `.body` + `.footer`.
- All dynamic values must be passed through `escapeHtml()`.
- Keep email copy in Danish.

## Action pages

- Approve/reject browser responses use `actionPage(title, message, success)`.
- Uses the same dark theme, centred card layout.
- Includes a link back to the main site via `SITE_URL`.

## Running locally

```bash
cd booking-api
npm install
cp .env.example .env   # then fill in real SMTP creds
npm run dev             # node --watch server.js
```

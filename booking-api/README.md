# Skovkrogen 37 – Booking API

A small Node.js/Express service that handles booking requests for the Skovkrogen 37 static website.

## How it works

```
Guest fills form → API saves booking → Admin gets email with Approve / Reject buttons
                                             ↓
                               Admin clicks one link in their email
                                             ↓
                           Guest receives confirmation or rejection email
```

No dashboard, no login — the person managing bookings only needs to click a link in their email.

---

## Requirements

- Node.js ≥ 18
- An SMTP account (Gmail, Outlook, or any mail provider)

---

## Setup

### 1. Install dependencies

```bash
cd booking-api
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `SMTP_HOST` | Your mail server hostname (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (`587` for TLS, `465` for SSL) |
| `SMTP_SECURE` | `true` for port 465, `false` for 587 |
| `SMTP_USER` | Email address used to send mails |
| `SMTP_PASS` | Password or app-specific password for the email account |
| `ADMIN_EMAIL` | Where booking notifications are sent (the person who approves/rejects) |
| `API_BASE_URL` | Public URL of this API (e.g. `https://booking.skovkrogen.dk`) |
| `SITE_URL` | URL of the main website |
| `PORT` | Port the server listens on (default: `3000`) |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins for CORS (e.g. `https://platzdk.github.io`) |
| `BOOKING_ACCESS_CODE` | **Optional.** A short code word shared verbally with trusted guests. When set, every booking submission must include the correct code or it is rejected. Leave empty to disable the gate. |

### Access code — protecting occupancy privacy

Because the booking form is publicly accessible, anyone could submit date requests to probe when the property is vacant — a potential security risk for an unattended cabin.

Setting `BOOKING_ACCESS_CODE` to a short word or phrase (e.g. `karup24`) and sharing it verbally with guests you've already spoken to means that:

- Genuine guests type the code into the **Adgangskode** field on the form and proceed normally.
- Random internet visitors cannot submit bookings, so they cannot infer occupancy from approvals or rejections.

The code is compared server-side using a constant-time algorithm to prevent timing attacks.

### 3. Start the server

```bash
npm start
```

---

## API Endpoints

### `POST /api/booking`

Submit a new booking request. Returns `201` on success.

**Request body (JSON):**

```json
{
  "name":     "Anders Hansen",
  "email":    "anders@example.com",
  "phone":    "+45 12 34 56 78",
  "checkin":  "2025-07-14",
  "checkout": "2025-07-21",
  "guests":   4,
  "message":  "Vi kommer med to fluestænger og én golden retriever."
}
```

**Response:**

```json
{ "success": true, "bookingId": "<uuid>" }
```

---

### `GET /api/booking/approve/:token`

Admin clicks this link from the notification email.
- Marks booking as **approved**
- Sends a confirmation email to the guest
- Returns a simple HTML confirmation page

---

### `GET /api/booking/reject/:token`

Admin clicks this link from the notification email.
- Marks booking as **rejected**
- Sends a rejection email to the guest
- Returns a simple HTML confirmation page

---

## Security

- **Tokens** are 32-byte cryptographically random values (256-bit), safe against brute-force.
- **Token TTL** is 7 days — expired tokens cannot be used.
- **Rate limiting** is applied to `POST /api/booking`: max 10 requests per IP per 15 minutes.
- **Input validation** uses the `validator` library; all user-supplied data is sanitised before email output.
- **CORS** is restricted to configured origins.
- **Secrets** (SMTP credentials, etc.) live in environment variables, never in source code.
- **Bookings** are stored in `bookings.json` (created automatically). Do not commit this file; add it to `.gitignore`.

---

## Deployment suggestions

Any Node.js-compatible hosting works:

- [Railway](https://railway.app) – free tier, easy setup
- [Render](https://render.com) – free tier
- [Fly.io](https://fly.io) – free allowance
- A VPS (Ubuntu + Nginx reverse proxy)

Remember to:
1. Set all environment variables on your hosting platform.
2. Point `API_BASE_URL` to the public URL of the deployed service.
3. Update `BOOKING_API_URL` in `index.html` to the same URL.
4. Serve the API over **HTTPS**.

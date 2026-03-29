# Copilot Instructions — Skovkrogen 37 (Florel)

## Project overview

Skovkrogen 37 is a static rental-property website for a fishing lodge near Silkeborg, Denmark.
The site is a single-page HTML/TailwindCSS/vanilla-JS app deployed to GitHub Pages, paired with a separate Node.js/Express booking-approval API.

## Repository layout

```
index.html                  Main single-page website
assets/
  css/styles.css            Minimal custom CSS (body colours, full-screen sections)
  js/booking.js             Booking form handler (IIFE, strict mode)
  js/gallery.js             Gallery loader from gallery_data.json
  images/gallery/<category> Source images per category
booking-api/
  server.js                 Express API – booking submission, approve/reject workflow
  package.json              Node ≥ 18 dependencies
  .env.example              Required environment variables
scripts/
  generate_gallery.py       Python 3 script → gallery_data.json
gallery_data.json           Auto-generated gallery manifest (do not edit manually)
.github/workflows/static.yml  GitHub Pages deployment workflow
```

## Tech stack

| Layer      | Technology                                                    |
|------------|---------------------------------------------------------------|
| Frontend   | HTML 5, Vanilla JavaScript (ES6+), TailwindCSS 3.4.5 (CDN)  |
| Fonts      | Google Fonts — Inter (weights 300, 400, 600, 800)             |
| Backend    | Node.js ≥ 18, Express 4, Nodemailer, validator, express-rate-limit |
| Scripting  | Python 3 + Pillow (gallery manifest generation)               |
| Deployment | GitHub Pages (static site), separate Node host (API)          |
| Database   | Local JSON file (`bookings.json`, gitignored)                 |

## Language & locale

All user-facing text is **hardcoded in Danish** (HTML `lang="da"`).
Email templates, validation messages, and UI copy are all in Danish.
There is no i18n framework — keep new UI strings in Danish to match.

## Coding conventions

### HTML / TailwindCSS
- Use TailwindCSS utility classes for all styling; avoid custom CSS unless truly necessary.
- Custom colour tokens are defined inline in `<script>tailwind.config</script>` inside `index.html`.
- The colour palette uses earth/water/accent groups — always use the semantic names:
  - **Earth tones:** `forest` (#0F1612), `peat` (#1A1E1C), `sand` (#E3DDD3)
  - **Water tones:** `slate` (#2C3534), `teal` (#1B3B36), `smoke` (#8A9694)
  - **Accents:** `copper` (#B87D4B), `rust` (#9A5B38), `junebug` (#4A3B4F)
- Full-screen sections use the `scrolly-section` CSS class.
- Prefer `text-[10px] uppercase tracking-[0.2em]` for micro-labels.

### JavaScript (client)
- All scripts use `'use strict'` at the top.
- Wrap feature scripts in an **IIFE** to avoid polluting the global scope (see `booking.js`).
- Use `DOMContentLoaded` for init when needed (see `gallery.js`).
- No build step — scripts are loaded directly via `<script src>`.
- Keep scripts framework-free (no jQuery, no React).

### JavaScript (API — `booking-api/`)
- CommonJS (`require`) modules — no ESM.
- All secrets in environment variables (see `.env.example`).
- Use the `validator` library for input validation.
- Use `escapeHtml()` for any user-supplied values rendered in HTML.
- Rate-limit public endpoints with `express-rate-limit`.
- Danish validation error messages returned in `{ error: "..." }`.

### Python (scripts)
- Python 3, type hints for function signatures.
- Use `pathlib.Path` for filesystem paths.
- Output JSON with 2-space indent + trailing newline.

## Gallery system

- Images live in `assets/images/gallery/<category>/`.
- Categories: `cover`, `about`, `living_room`, `kitchen`, `rooms`, `nature`, `bathroom`.
- `scripts/generate_gallery.py` scans those folders and writes `gallery_data.json`.
- The CI workflow runs the script before deployment — do **not** edit `gallery_data.json` by hand.
- To add a new category: update `CATEGORIES` in `generate_gallery.py`, add the folder, and update `catMap` in `gallery.js`.

## Booking API workflow

1. Guest submits form → `POST /api/booking` → saved to `bookings.json`, admin email sent.
2. Admin clicks approve/reject link in email → `GET /api/booking/approve/:token` or `reject/:token`.
3. Guest receives confirmation or rejection email.
- Tokens are 256-bit cryptographic random, valid 7 days.
- No dashboard — privacy by design (occupancy never exposed publicly).

## Security practices

- Honeypot field on the booking form for bot prevention.
- CORS whitelist via `ALLOWED_ORIGINS` env var.
- Rate limiting (10 req / IP / 15 min) on booking endpoint.
- All user input HTML-escaped in email templates.
- No secrets committed — use `.env` (gitignored).

## Running locally

```bash
# Static site
python3 -m http.server 8000          # then open localhost:8000

# Gallery manifest
python3 scripts/generate_gallery.py

# Booking API
cd booking-api && npm install && cp .env.example .env
# Edit .env with real SMTP credentials
npm run dev                           # uses node --watch
```

## Deployment

The GitHub Actions workflow (`.github/workflows/static.yml`) on push to `main`:
1. Installs Python + Pillow.
2. Runs `scripts/generate_gallery.py`.
3. Deploys the repo root to GitHub Pages.

The booking API must be deployed separately to any Node.js host with the env vars configured.

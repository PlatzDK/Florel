'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const validator = require('validator');

// ---------------------------------------------------------------------------
// Configuration – all secrets come from environment variables
// ---------------------------------------------------------------------------
const {
    SMTP_HOST,
    SMTP_PORT = '587',
    SMTP_SECURE = 'false',
    SMTP_USER,
    SMTP_PASS,
    ADMIN_EMAIL,
    API_BASE_URL,
    SITE_URL = 'https://platzdk.github.io/Florel',
    PORT = '3000',
    ALLOWED_ORIGINS = '',
} = process.env;

const requiredEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'ADMIN_EMAIL', 'API_BASE_URL'];
for (const key of requiredEnv) {
    if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
}

// ---------------------------------------------------------------------------
// Persistence – bookings stored in a local JSON file
// ---------------------------------------------------------------------------
const DB_PATH = path.join(__dirname, 'bookings.json');

function loadBookings() {
    if (!fs.existsSync(DB_PATH)) return {};
    try {
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch {
        return {};
    }
}

function saveBookings(bookings) {
    fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2), 'utf8');
}

// ---------------------------------------------------------------------------
// Email transport
// ---------------------------------------------------------------------------
const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
});

async function sendMail(to, subject, html) {
    await transporter.sendMail({
        from: `"Skovkrogen 37" <${SMTP_USER}>`,
        to,
        subject,
        html,
    });
}

// ---------------------------------------------------------------------------
// Email templates
// ---------------------------------------------------------------------------
function adminEmailHtml(booking, approveUrl, rejectUrl) {
    return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ny Bookingforespørgsel</title>
  <style>
    body { margin: 0; padding: 0; background: #0F1612; font-family: Arial, Helvetica, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
    .header { background: #0F1612; padding: 32px 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .header h1 { margin: 0; color: #B87D4B; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; }
    .header p { margin: 6px 0 0; color: #E3DDD3; font-size: 22px; font-weight: bold; }
    .body { padding: 32px 40px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #8A9694; margin-bottom: 4px; }
    .field-value { color: #E3DDD3; font-size: 15px; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 24px 0; }
    .actions { display: flex; gap: 16px; margin-top: 32px; }
    .btn { display: inline-block; padding: 14px 32px; border-radius: 100px; text-decoration: none; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: bold; text-align: center; }
    .btn-approve { background: #B87D4B; color: #ffffff; }
    .btn-reject  { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #8A9694; }
    .footer { padding: 20px 40px; background: #0F1612; text-align: center; font-size: 11px; color: #8A9694; border-top: 1px solid rgba(255,255,255,0.06); }
    .notice { margin-top: 24px; font-size: 11px; color: #8A9694; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Skovkrogen 37</h1>
      <p>Ny Bookingforespørgsel</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Navn</div>
        <div class="field-value">${escapeHtml(booking.name)}</div>
      </div>
      <div class="field">
        <div class="field-label">E-mail</div>
        <div class="field-value">${escapeHtml(booking.email)}</div>
      </div>
      <div class="field">
        <div class="field-label">Telefon</div>
        <div class="field-value">${escapeHtml(booking.phone || '—')}</div>
      </div>
      <div class="field">
        <div class="field-label">Ankomst</div>
        <div class="field-value">${escapeHtml(booking.checkin)}</div>
      </div>
      <div class="field">
        <div class="field-label">Afrejse</div>
        <div class="field-value">${escapeHtml(booking.checkout)}</div>
      </div>
      <div class="field">
        <div class="field-label">Antal gæster</div>
        <div class="field-value">${escapeHtml(String(booking.guests))}</div>
      </div>
      ${booking.message ? `
      <div class="field">
        <div class="field-label">Besked</div>
        <div class="field-value">${escapeHtml(booking.message)}</div>
      </div>` : ''}
      <hr class="divider">
      <p style="color:#E3DDD3; font-size:14px; margin-bottom:8px;">
        Godkend eller afvis forespørgslen ved at klikke på én af knapperne nedenfor.
      </p>
      <div class="actions">
        <a href="${approveUrl}" class="btn btn-approve">✓ Godkend</a>
        <a href="${rejectUrl}"  class="btn btn-reject">✗ Afvis</a>
      </div>
      <p class="notice">
        Linkene er gyldige i 7 dage.<br>
        Forespørgslen blev sendt: ${new Date(booking.submittedAt).toLocaleString('da-DK')}<br>
        Booking-ID: ${booking.id}
      </p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Skovkrogen 37 · Silkeborg, Danmark</div>
  </div>
</body>
</html>`;
}

function confirmationEmailHtml(booking) {
    return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Din booking er godkendt</title>
  <style>
    body { margin: 0; padding: 0; background: #0F1612; font-family: Arial, Helvetica, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
    .header { background: #0F1612; padding: 32px 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .header h1 { margin: 0; color: #B87D4B; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; }
    .header p { margin: 6px 0 0; color: #E3DDD3; font-size: 22px; font-weight: bold; }
    .body { padding: 32px 40px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #8A9694; margin-bottom: 4px; }
    .field-value { color: #E3DDD3; font-size: 15px; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 24px 0; }
    .badge { display:inline-block; padding:6px 16px; background:#1B3B36; border:1px solid #B87D4B; border-radius:100px; color:#B87D4B; font-size:11px; letter-spacing:0.15em; text-transform:uppercase; font-weight:bold; margin-bottom:24px; }
    .footer { padding: 20px 40px; background: #0F1612; text-align: center; font-size: 11px; color: #8A9694; border-top: 1px solid rgba(255,255,255,0.06); }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Skovkrogen 37</h1>
      <p>Booking Bekræftet</p>
    </div>
    <div class="body">
      <span class="badge">✓ Godkendt</span>
      <p style="color:#E3DDD3; font-size:15px; line-height:1.7; margin-top:0;">
        Kære ${escapeHtml(booking.name)},<br><br>
        Vi er glade for at bekræfte din booking på Skovkrogen 37. Vi glæder os til at byde dig velkommen!
      </p>
      <hr class="divider">
      <div class="field">
        <div class="field-label">Ankomst</div>
        <div class="field-value">${escapeHtml(booking.checkin)}</div>
      </div>
      <div class="field">
        <div class="field-label">Afrejse</div>
        <div class="field-value">${escapeHtml(booking.checkout)}</div>
      </div>
      <div class="field">
        <div class="field-label">Antal gæster</div>
        <div class="field-value">${escapeHtml(String(booking.guests))}</div>
      </div>
      <hr class="divider">
      <p style="color:#8A9694; font-size:13px; line-height:1.7;">
        Har du spørgsmål, er du altid velkommen til at svare på denne e-mail.<br>
        Booking-ID: ${booking.id}
      </p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Skovkrogen 37 · Silkeborg, Danmark</div>
  </div>
</body>
</html>`;
}

function rejectionEmailHtml(booking) {
    return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Din bookingforespørgsel</title>
  <style>
    body { margin: 0; padding: 0; background: #0F1612; font-family: Arial, Helvetica, sans-serif; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #1A1E1C; border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
    .header { background: #0F1612; padding: 32px 40px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .header h1 { margin: 0; color: #B87D4B; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; }
    .header p { margin: 6px 0 0; color: #E3DDD3; font-size: 22px; font-weight: bold; }
    .body { padding: 32px 40px; }
    .divider { border: none; border-top: 1px solid rgba(255,255,255,0.07); margin: 24px 0; }
    .footer { padding: 20px 40px; background: #0F1612; text-align: center; font-size: 11px; color: #8A9694; border-top: 1px solid rgba(255,255,255,0.06); }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Skovkrogen 37</h1>
      <p>Bookingforespørgsel</p>
    </div>
    <div class="body">
      <p style="color:#E3DDD3; font-size:15px; line-height:1.7; margin-top:0;">
        Kære ${escapeHtml(booking.name)},<br><br>
        Tak for din forespørgsel på Skovkrogen 37. Desværre er den ønskede periode ikke tilgængelig.
      </p>
      <hr class="divider">
      <p style="color:#8A9694; font-size:13px; line-height:1.7;">
        Du er velkommen til at sende en ny forespørgsel med alternative datoer.<br>
        Vi glæder os til at hjælpe dig.
      </p>
    </div>
    <div class="footer">&copy; ${new Date().getFullYear()} Skovkrogen 37 · Silkeborg, Danmark</div>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function generateToken() {
    return crypto.randomBytes(32).toString('hex');
}

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// ---------------------------------------------------------------------------
// Express app
// ---------------------------------------------------------------------------
const app = express();

// Trust first proxy (needed when running behind Nginx / cloud load balancer)
app.set('trust proxy', 1);

// Parse JSON bodies
app.use(express.json({ limit: '16kb' }));

// CORS – only allow the configured origins
const allowedOrigins = ALLOWED_ORIGINS
    ? ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
    : [];

app.use(
    cors({
        origin(origin, callback) {
            // Allow requests with no origin (same-origin, Postman, etc.)
            if (!origin) return callback(null, true);
            if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            callback(new Error('Not allowed by CORS'));
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
    })
);

// Rate limiting – max 10 booking submissions per IP per 15 minutes
const bookingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'For mange forespørgsler. Prøv igen om lidt.' },
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// POST /api/booking – submit a new booking request
app.post('/api/booking', bookingLimiter, async (req, res) => {
    const { name, email, phone, checkin, checkout, guests, message } = req.body || {};

    // Input validation
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Navn er påkrævet (mindst 2 tegn).');
    }

    if (!email || !validator.isEmail(String(email))) {
        errors.push('Ugyldig e-mailadresse.');
    }

    if (phone && !validator.isMobilePhone(String(phone), 'any', { strictMode: false })) {
        errors.push('Ugyldigt telefonnummer.');
    }

    if (!checkin || !validator.isDate(String(checkin), { format: 'YYYY-MM-DD', strictMode: true })) {
        errors.push('Ugyldig ankomstdato (brug YYYY-MM-DD).');
    }

    if (!checkout || !validator.isDate(String(checkout), { format: 'YYYY-MM-DD', strictMode: true })) {
        errors.push('Ugyldig afrejsedato (brug YYYY-MM-DD).');
    }

    if (checkin && checkout && new Date(checkin) >= new Date(checkout)) {
        errors.push('Afrejsedatoen skal være efter ankomstdatoen.');
    }

    const guestsNum = parseInt(guests, 10);
    if (!guests || isNaN(guestsNum) || guestsNum < 1 || guestsNum > 6) {
        errors.push('Antal gæster skal være mellem 1 og 6.');
    }

    if (message && String(message).length > 1000) {
        errors.push('Besked må ikke overstige 1000 tegn.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(' ') });
    }

    // Build booking record
    const approveToken = generateToken();
    const rejectToken = generateToken();
    const id = crypto.randomUUID();

    const booking = {
        id,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        checkin,
        checkout,
        guests: guestsNum,
        message: message ? String(message).trim() : '',
        status: 'pending',
        approveToken,
        rejectToken,
        submittedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + TOKEN_TTL_MS).toISOString(),
    };

    // Persist
    const bookings = loadBookings();
    bookings[id] = booking;
    saveBookings(bookings);

    // Send admin notification
    const approveUrl = `${API_BASE_URL}/api/booking/approve/${approveToken}`;
    const rejectUrl = `${API_BASE_URL}/api/booking/reject/${rejectToken}`;

    try {
        await sendMail(
            ADMIN_EMAIL,
            `Ny bookingforespørgsel fra ${booking.name} (${booking.checkin} – ${booking.checkout})`,
            adminEmailHtml(booking, approveUrl, rejectUrl)
        );
    } catch (err) {
        console.error('Failed to send admin email:', err);
        // Still respond with success – booking is saved; admin can re-trigger later
    }

    return res.status(201).json({ success: true, bookingId: id });
});

// GET /api/booking/approve/:token – admin approves a booking
app.get('/api/booking/approve/:token', async (req, res) => {
    const { token } = req.params;
    const bookings = loadBookings();
    const booking = Object.values(bookings).find((b) => b.approveToken === token);

    if (!booking) {
        return res.status(404).send(actionPage('Ugyldigt link', 'Dette godkendelseslink er ugyldigt eller allerede brugt.', false));
    }

    if (new Date(booking.expiresAt) < new Date()) {
        return res.status(410).send(actionPage('Link udløbet', 'Dette link er udløbet. Send forespørgslen videre til ejeren manuelt.', false));
    }

    if (booking.status !== 'pending') {
        const label = booking.status === 'approved' ? 'godkendt' : 'afvist';
        return res.status(409).send(actionPage('Allerede behandlet', `Denne booking er allerede ${label}.`, false));
    }

    booking.status = 'approved';
    booking.approveToken = '';
    booking.rejectToken = '';
    booking.resolvedAt = new Date().toISOString();
    bookings[booking.id] = booking;
    saveBookings(bookings);

    try {
        await sendMail(
            booking.email,
            'Din booking på Skovkrogen 37 er bekræftet ✓',
            confirmationEmailHtml(booking)
        );
    } catch (err) {
        console.error('Failed to send confirmation email:', err);
    }

    return res.send(actionPage('Booking godkendt!', `En bekræftelse er sendt til ${escapeHtml(booking.email)}.`, true));
});

// GET /api/booking/reject/:token – admin rejects a booking
app.get('/api/booking/reject/:token', async (req, res) => {
    const { token } = req.params;
    const bookings = loadBookings();
    const booking = Object.values(bookings).find((b) => b.rejectToken === token);

    if (!booking) {
        return res.status(404).send(actionPage('Ugyldigt link', 'Dette afvisningslink er ugyldigt eller allerede brugt.', false));
    }

    if (new Date(booking.expiresAt) < new Date()) {
        return res.status(410).send(actionPage('Link udløbet', 'Dette link er udløbet.', false));
    }

    if (booking.status !== 'pending') {
        const label = booking.status === 'approved' ? 'godkendt' : 'afvist';
        return res.status(409).send(actionPage('Allerede behandlet', `Denne booking er allerede ${label}.`, false));
    }

    booking.status = 'rejected';
    booking.approveToken = '';
    booking.rejectToken = '';
    booking.resolvedAt = new Date().toISOString();
    bookings[booking.id] = booking;
    saveBookings(bookings);

    try {
        await sendMail(
            booking.email,
            'Skovkrogen 37 – Svar på din bookingforespørgsel',
            rejectionEmailHtml(booking)
        );
    } catch (err) {
        console.error('Failed to send rejection email:', err);
    }

    return res.send(actionPage('Booking afvist', `Gæsten er underrettet pr. e-mail.`, true));
});

// ---------------------------------------------------------------------------
// Simple HTML response page for approve / reject actions
// ---------------------------------------------------------------------------
function actionPage(title, message, success) {
    const color = success ? '#B87D4B' : '#9A5B38';
    return `<!DOCTYPE html>
<html lang="da">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} – Skovkrogen 37</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #0F1612; font-family: Arial, Helvetica, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
    .card { background: #1A1E1C; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; max-width: 480px; width: 100%; padding: 48px 40px; text-align: center; }
    .icon { font-size: 48px; margin-bottom: 24px; }
    h1 { color: ${color}; font-size: 22px; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 16px; }
    p { color: #8A9694; font-size: 14px; line-height: 1.7; }
    a { display: inline-block; margin-top: 32px; padding: 12px 28px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.2); color: #E3DDD3; text-decoration: none; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${success ? '✓' : '✗'}</div>
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(message)}</p>
    <a href="${escapeHtml(SITE_URL)}">Tilbage til siden</a>
  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
const port = parseInt(PORT, 10);
app.listen(port, () => {
    console.log(`Booking API running on port ${port}`);
});

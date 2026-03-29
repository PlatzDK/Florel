---
description: "Scaffold a new Express API endpoint in the booking API"
mode: "agent"
tools: ["editFiles", "codebase"]
---

# Add a new API endpoint

Add a new endpoint to `booking-api/server.js`.

## Placement

Add the new route in the `// Routes` section of `server.js`, after the existing routes and before the `actionPage()` helper function.

## Template

Follow the existing pattern:

```javascript
// DESCRIPTION
app.METHOD('/api/ROUTE', async (req, res) => {
    // Implementation
});
```

## Checklist

- [ ] Use `'use strict'` (already at file top).
- [ ] Validate all input using the `validator` library.
- [ ] Return errors as `{ error: "Danish message" }` with appropriate HTTP status.
- [ ] Apply `bookingLimiter` middleware to any public-facing POST endpoint.
- [ ] Escape any user data rendered in HTML responses with `escapeHtml()`.
- [ ] Use `loadBookings()` / `saveBookings()` for data access.
- [ ] Keep all text (error messages, email copy) in **Danish**.
- [ ] Add CORS support (already global via middleware).

## Security reminders

- Rate-limit public endpoints.
- Validate and sanitise all input before processing.
- Never expose booking details or occupancy info to unauthenticated users.
- Use cryptographic tokens for any sensitive operations.

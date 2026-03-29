---
description: "Update or create a booking email template"
mode: "agent"
tools: ["editFiles", "codebase"]
---

# Update email template

Modify an existing email template or create a new one in `booking-api/server.js`.

## Existing templates

| Function                    | Purpose                              |
|-----------------------------|--------------------------------------|
| `adminEmailHtml()`          | Admin notification with approve/reject buttons |
| `confirmationEmailHtml()`   | Guest confirmation (approved)        |
| `rejectionEmailHtml()`      | Guest rejection notice               |

## Design system

All email templates follow this structure and colour palette:

```
Background: #0F1612 (forest)
Card:       #1A1E1C (peat), 1px border rgba(255,255,255,0.08)
Header:     #0F1612 bg, h1 in #B87D4B (copper), subtitle in #E3DDD3 (sand)
Body:       #E3DDD3 text, #8A9694 (smoke) for labels/secondary text
Footer:     #0F1612 bg, #8A9694 text, © year Skovkrogen 37 · Silkeborg, Danmark
Buttons:    Pill shape (border-radius: 100px), approve=#B87D4B, reject=transparent+border
Labels:     10px uppercase, letter-spacing 0.15em, #8A9694
```

## Rules

- **Always** pass dynamic values through `escapeHtml()`.
- Use `lang="da"` on the HTML element.
- Keep all copy in **Danish**.
- Use inline CSS only (email clients strip `<style>` blocks inconsistently, but the current templates use `<style>` in `<head>` — maintain consistency with existing templates).
- Field labels use class `field-label`, values use class `field-value`.
- Include the booking ID in the footer area for reference.

## Adding a new template

1. Define a new function following the naming pattern: `someEmailHtml(booking)`.
2. Return a complete `<!DOCTYPE html>` string using template literals.
3. Reference it from the appropriate route handler using `sendMail()`.

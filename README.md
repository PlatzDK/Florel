# Skovkrogen 37 – Sommerhus for lystfiskere

Et hurtigt, tilgængeligt og SEO-optimeret Next.js-site for Skovkrogen 37.

## Tilpas billeder

- Galleri-data ligger i `data/gallery.json`. Tilføj dine egne filer i `public/images/gallery` og sæt `src`-feltet for hvert element til fx `/images/gallery/gallery-001.jpg`. Hvis `src` er `null`, vises den indbyggede SVG-placeholder.
- Hero- og hus-illustrationerne defineres i `src/lib/placeholders.ts` og bruges i `app/page.tsx` og `app/(pages)/sommerhuset/page.tsx`. Udskift værdierne med filstier til egne billeder, når de er klar.
- Open Graph billedet genereres dynamisk i `app/opengraph-image.tsx`. Tilpas layoutet eller erstat funktionen med statisk fil efter behov.

## Rediger tekster og data

- Justér indhold i JSON-filerne under `/data`:
  - `faq.json` for spørgsmål og svar.
  - `pricing.json` for sæsonpriser.
  - `fishing.json` for fiskepladser og tips.
  - `testimonials.json` for gæstecitater.
  - `gallery.json` for billedtekster og kilder.
- Øvrige tekster findes i komponenter og sider under `/app` og `/src/components`.

## Konfigurer kontaktformularen

1. Tilføj følgende miljøvariabler i en `.env.local`:

   ```env
   SMTP_HOST=smtp.mailserver.dk
   SMTP_PORT=587
   SMTP_USER=brugernavn
   SMTP_PASS=adgangskode
   SMTP_FROM=kontakt@skovkrogen37.dk
   ```

2. Formularen sender til `kontakt@skovkrogen37.dk` via `/api/contact`. Tilpas adressen efter behov.

## Udvikling

```bash
npm install
npm run dev
```

## Build og deployment på Netlify

1. Kør `npm run build` for at generere en produktionbuild.
2. På Netlify vælges "Next.js" som build preset. Brug kommandoen `npm run build` og public folder `.next` håndteres automatisk.
3. Tilføj miljøvariablerne i Netlify Dashboard under Site settings → Build & deploy → Environment.
4. Aktivér Next.js runtime på Netlify (automatisk ved brug af build preset).

## Linting

```bash
npm run lint
```

## Licens

© 2025 Skovkrogen 37 – Sommerhus for lystfiskere

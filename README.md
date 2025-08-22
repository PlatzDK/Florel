# Florel – sommerhus og fishing retreat

Dette repo indeholder en simpel statisk hjemmeside for Florel, et skovsommerhus med adgang til sø og bæk. Siden retter sig mod både danske, engelske og tyske gæster.

## Live-URL

- Root (sprogvalg): [https://platzdk.github.io/Florel/](https://platzdk.github.io/Florel/)
- Dansk: [https://platzdk.github.io/Florel/da/](https://platzdk.github.io/Florel/da/)
- English: [https://platzdk.github.io/Florel/en/](https://platzdk.github.io/Florel/en/)
- Deutsch: [https://platzdk.github.io/Florel/de/](https://platzdk.github.io/Florel/de/)

## Sider og indhold

- **Root (`/`):** neutral landingsside med hero-sektion, kort tagline på tre sprog og knapper til at vælge Dansk/English/Deutsch. Indeholder hreflang links til alle sprogversioner.
- **Dansk (`/da/`):** fuldt indhold om huset, aktiviteter, lokale fiskesteder, praktisk information, og booking. Indeholder canonical og hreflang-tags.
- **English (`/en/`) og Deutsch (`/de/`):** tilsvarende sider med oversat indhold.
- **Undersider med fiskesteder** (`/da/fiskeri.html`, `/en/fishing.html`, `/de/fischen.html`): lister de vigtigste søer, put & take-søer og floder med afstand.

  ## Galleri

Galleri-billeder er lagret i `docs/assets/images/` og følger navnekonvention:
- `gallery_large_{NNN}_{slug}.webp` — stor version (lightbox) ~1600px
- `gallery_thumb_{NNN}_{slug}.webp` — thumbnail til grid ~800px

Manifest: `docs/assets/images/gallery.json` indeholder poster med captions på alle sprog.
Sitet indlæser manifest via `docs/assets/js/gallery.js` og bygger et responsivt grid og lightbox automatisk.

Upload flow:
1. Opret `gallery_thumb_###_slug.webp` og `gallery_large_###_slug.webp`
2. Tilføj en entry i `gallery.json` (id, slug, thumb, large, caption{da,en,de}, credit, year, tags)
3. Commit og push — GitHub Pages opdaterer sitet.

### Mailto fallback / prefill

Vi tilbyder en "Send os e-mail" fallback hvor brugeren kan udfylde en lille prefill-form og åbne deres mailklient med et struktureret template. Koden ligger i:

- JS: `docs/assets/js/mailto.js` (recipient er obfuscated i JS).
- UI: prefill forms i `docs/da/index.html`, `docs/en/index.html`, `docs/de/index.html`.
- CSS: appended i `docs/assets/style.css`.

For at ændre modtager: rediger `recipientUser` og `recipientDomain` i `docs/assets/js/mailto.js`.  
Test: åbn en sprogside, udfyld felter og tryk "Åbn i mailapp" — din mailklient skal åbne med forudfyldt emne + body.

Script paths:
- Sprog sider (`docs/da/`, `docs/en/`, `docs/de/`) bruger: `<script src="../assets/js/gallery.js"></script>`
- Root `docs/index.html` bruger: `<script src="./assets/js/gallery.js"></script>`

## Tema og design

- Sitet anvender et “Forest theme” (`docs/assets/style.css`) med jordgrønne nuancer og guld-accent.
- Alle HTML-sider linker til denne CSS-fil.

## SEO-anbefalinger implementeret

- `rel="canonical"` og `rel="alternate" hreflang="..."` er sat i `<head>` på alle sider, så søgemaskiner forstår sprogversioner.
- Korrekte `lang`-attributter på `<html>`-tagget.
- Unikke meta descriptions på alle sider.
- Klar titel og tagline for hver side.

## Sådan opdaterer du

1. Rediger HTML-filer i `docs/` efter behov.
2. Sørg for at opdatere hreflang- og canonical-URL’er hvis domænet ændres.
3. Commit ændringer til `main`-grenen. GitHub Pages bygger siden automatisk.

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

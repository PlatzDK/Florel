# Tilføj dine egne galleri-billeder

Læg dine egne billeder i denne mappe, så `GalleryGrid` og `Lightbox` kan hente lokale filer uden eksterne kilder.

## Sådan gør du
1. Kopiér dine billeder herind og navngiv dem som i `data/gallery.json`:
   - `morgenlys-over-boelling-soe.jpg`
   - `terrasse-grill.jpg`
   - `grejrum-waders.jpg`
   - `aften-baelfad.jpg`
   - `fangst-fryser.jpg`
   - `stue-udsigt.jpg`
   - `karup-aa-foraar.jpg`
   - `boelling-soe-cykelsti.jpg`
   - `koekken-klarmad.jpg`
   - `put-take-stemning.jpg`
   - `sovevaerelse-ro.jpg`
   - `silkeborg-soehojland.jpg`

2. Brug billeder i omkring 1600×1067 px (landscape) eller 1400×1050 px (classic) for at matche de nuværende forhold og undgå pixelering.
3. Hold filformaterne som JPG/JPEG; Next.js serverer dem direkte fra `/public/gallery/...`.
4. Hvis du ændrer filnavne eller tilføjer flere billeder, skal `data/gallery.json` opdateres tilsvarende.
5. Start projektet og bekræft at hvert billede loader uden fallback: `npm run dev` og gennemgå galleriet.

Når du har lagt de rigtige fotos her, peger alle `src`-felter i `data/gallery.json` på lokale filer, så ingen eksterne billeder er nødvendige.

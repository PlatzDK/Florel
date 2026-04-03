# Florel - Skovkrogen 37 Website

Static website for the Skovkrogen 37 rental property.

## Local preview

This repository is a plain HTML/CSS/JS site. You can open `index.html` directly in a browser, or use a simple local server:

```bash
cd Florel
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Gallery data generation

The gallery is loaded from `gallery_data.json`, generated from image folders in `assets/images/gallery/<category>/`.

Generate or refresh the manifest with:

```bash
cd Florel
python3 scripts/generate_gallery.py
```

Expected categories:

- `cover`
- `about`
- `living_room`
- `kitchen`
- `rooms`
- `nature`
- `bathroom`

The script writes `gallery_data.json` at the repository root. Missing category folders are handled as empty lists.

## Deployment

### Vercel (recommended)

The repository includes a `vercel.json` configuration for deploying to [Vercel](https://vercel.com):

1. Import the repository in the Vercel dashboard.
2. Vercel will auto-detect the configuration — no manual settings are required.
3. The build step runs `scripts/generate_gallery.py` to regenerate `gallery_data.json`.
4. Files listed in `.vercelignore` (booking API, scripts, docs) are excluded from the deployment output.

### GitHub Pages

Deployment to GitHub Pages is configured in `.github/workflows/static.yml`.

The workflow checks out the repository, installs Python dependencies required by the generation step, runs `scripts/generate_gallery.py`, and deploys the static artifact.

### Booking API

The booking API (`booking-api/`) must be deployed separately to any Node.js host. See `booking-api/README.md` for setup details. After deploying, set the `SITE_URL` and `ALLOWED_ORIGINS` environment variables to match the Vercel (or GitHub Pages) domain.

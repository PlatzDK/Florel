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

Deployment to GitHub Pages is configured in:

- `.github/workflows/static.yml`

The workflow checks out the repository, installs Python dependencies required by the generation step, runs `scripts/generate_gallery.py`, and deploys the static artifact.

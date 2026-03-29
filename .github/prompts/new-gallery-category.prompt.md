---
description: "Add a new image category to the gallery system"
mode: "agent"
tools: ["editFiles", "codebase"]
---

# Add a new gallery category

Add a new image category called `${{category_name}}` to the Skovkrogen 37 gallery system.

## Steps

1. **Update `scripts/generate_gallery.py`**
   - Add `"${{category_name}}"` to the `CATEGORIES` list.

2. **Create the image folder**
   - Create the directory `assets/images/gallery/${{category_name}}/`.
   - Add a `.gitkeep` file so the empty folder is tracked by Git.

3. **Update `assets/js/gallery.js`**
   - Add an entry to the `catMap` object mapping `'${{category_name}}'` to a human-readable display name.
   - If the category should not appear in the gallery grid (like `cover` or `about`), add a skip condition in the `Object.entries(data).forEach` block.

4. **Regenerate the manifest**
   - Run `python3 scripts/generate_gallery.py` to verify the updated `gallery_data.json` includes the new category as an empty list.

## Conventions

- Category names use `snake_case` (e.g., `living_room`, `outdoor_area`).
- Display names in `catMap` use Title Case English (e.g., `'Living Room'`).
- Allowed image formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`.

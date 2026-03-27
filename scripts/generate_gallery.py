#!/usr/bin/env python3

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GALLERY_ROOT = ROOT / "assets" / "images" / "gallery"
OUTPUT_FILE = ROOT / "gallery_data.json"

CATEGORIES = [
    "cover",
    "about",
    "living_room",
    "kitchen",
    "rooms",
    "nature",
    "bathroom",
]

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}


def category_images(category: str) -> list[str]:
    category_dir = GALLERY_ROOT / category
    if not category_dir.exists() or not category_dir.is_dir():
        return []

    files = sorted(
        (
            path
            for path in category_dir.iterdir()
            if path.is_file() and path.suffix.lower() in ALLOWED_EXTENSIONS
        ),
        key=lambda p: p.name.lower(),
    )
    return [str(path.relative_to(ROOT)).replace("\\", "/") for path in files]


def main() -> None:
    manifest = {category: category_images(category) for category in CATEGORIES}
    OUTPUT_FILE.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Generated {OUTPUT_FILE}")


if __name__ == "__main__":
    main()

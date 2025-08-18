#!/usr/bin/env bash
set -euo pipefail

BRANCH="feat/gallery"
COMMIT_MSG="feat: add responsive gallery (manifest-driven) + gallery.js + styles + docs"
PR_TITLE="feat: add responsive gallery"
PR_BODY="Adds manifest-driven responsive gallery (gallery.json) with gallery.js renderer, gallery CSS, and README documentation. Does not merge — please review."

echo "Creating branch $BRANCH..."
git checkout -b "$BRANCH"

# 1) Append CSS (create file if missing)
CSS_FILE="docs/assets/style.css"
mkdir -p "$(dirname "$CSS_FILE")"
cat >> "$CSS_FILE" <<'CSS_APPEND'

/* ===== Gallery styles (appended) ===== */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
.gallery img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(16,24,20,0.06);
  transition: transform 0.28s cubic-bezier(.2,.8,.2,1), box-shadow 0.28s;
  cursor: pointer;
  object-fit: cover;
}
.gallery img:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 14px 30px rgba(8,12,8,0.12);
}

/* Lightbox fallback style for the injected LB container */
#galleryLightbox {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.86);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
}
#galleryLightbox img { max-width: 92%; max-height: 84%; border-radius: 8px; }
#galleryLightbox .lb-caption { color: #fff; margin-top: 0.6rem; text-align:center; font-size: .95rem; }
CSS_APPEND

echo "Wrote/updated $CSS_FILE"

# 2) Create JS file
JS_FILE="docs/assets/js/gallery.js"
mkdir -p "$(dirname "$JS_FILE")"
cat > "$JS_FILE" <<'GJ'
/* docs/assets/js/gallery.js
   Dynamisk gallery renderer — henter docs/assets/images/gallery.json
*/
(async () => {
  const candidatePaths = [
    './assets/images/gallery.json',
    '../assets/images/gallery.json',
    '/Florel/docs/assets/images/gallery.json',
    '/docs/assets/images/gallery.json'
  ];

  let manifest = null;
  let usedPath = null;
  for (const p of candidatePaths) {
    try {
      const res = await fetch(p, {cache: 'no-cache'});
      if (res.ok) {
        manifest = await res.json();
        usedPath = p.slice(0, p.lastIndexOf('/') + 1);
        break;
      }
    } catch (err) { /* ignore */ }
  }
  if (!manifest) { console.warn('Gallery: manifest not found at candidate paths'); return; }

  let grid = document.getElementById('galleryGrid');
  if (!grid) {
    const sec = document.createElement('section');
    sec.id = 'galleri';
    sec.className = 'section container';
    sec.innerHTML = '<h2>Galleri</h2><div id="galleryGrid" class="gallery"></div>';
    const main = document.querySelector('main') || document.body;
    main.appendChild(sec);
    grid = document.getElementById('galleryGrid');
  }

  const lang = (document.documentElement.lang || 'en').substring(0,2);

  manifest.forEach(item => {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = (usedPath + item.thumb).replace(/\/\.\//g,'/');
    img.dataset.full = (usedPath + item.large).replace(/\/\.\//g,'/');
    img.alt = (item.caption && (item.caption[lang] || item.caption.en)) || item.slug || '';
    img.dataset.caption = item.caption ? (item.caption[lang] || item.caption.en || '') : '';
    img.className = 'gallery-thumb';
    grid.appendChild(img);
  });

  // Lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'galleryLightbox';
  Object.assign(lightbox.style, { display:'none', position:'fixed', inset:'0', background:'rgba(0,0,0,0.86)', alignItems:'center', justifyContent:'center', zIndex:9999, padding:'2rem' });

  const lbImg = document.createElement('img');
  const lbCap = document.createElement('div');
  lbCap.className = 'lb-caption';
  lightbox.appendChild(lbImg);
  lightbox.appendChild(lbCap);
  document.body.appendChild(lightbox);

  grid.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      lbImg.src = e.target.dataset.full || e.target.src;
      lbCap.textContent = e.target.dataset.caption || '';
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });
  lightbox.addEventListener('click', (ev) => {
    if (ev.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
})();
GJ

echo "Created $JS_FILE"

# 3) Ensure script tags exist in language pages (insert if missing)
insert_script_tag() {
  PAGE="$1"
  REL_PATH="$2"
  if [ -f "$PAGE" ]; then
    # check if script tag already present
    if grep -q "assets/js/gallery.js" "$PAGE"; then
      echo "Script tag already present in $PAGE"
    else
      # insert before closing body
      awk -v tag="<script src=\"$REL_PATH\"></script>" 'BEGIN{added=0} { if(!added && tolower($0) ~ /<\/body>/){ print tag; added=1 } print $0 }' "$PAGE" > "$PAGE.tmp" && mv "$PAGE.tmp" "$PAGE"
      echo "Inserted script tag into $PAGE"
    fi
  else
    echo "WARNING: page $PAGE not found"
  fi
}

insert_script_tag "docs/da/index.html" "../assets/js/gallery.js"
insert_script_tag "docs/en/index.html" "../assets/js/gallery.js"
insert_script_tag "docs/de/index.html" "../assets/js/gallery.js"
# root index.html uses a different relative path if present
insert_script_tag "docs/index.html" "./assets/js/gallery.js"

# 4) Update README.md (append gallery docs if not already present)
README="README.md"
if grep -q "## Galleri" "$README"; then
  echo "README already mentions Galleri — skipping append"
else
  cat >> "$README" <<'MD_APPEND'

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
MD_APPEND
  echo "Appended Galleri section to README.md"
fi

# 5) Stage changes and commit
git add "$CSS_FILE" "$JS_FILE" docs/da/index.html docs/en/index.html docs/de/index.html docs/index.html README.md || true
git commit -m "$COMMIT_MSG" || { echo "Nothing to commit? Exiting."; git checkout -; exit 0; }

# Push and create PR via gh
git push -u origin "$BRANCH"
echo "Pushed branch $BRANCH to origin."

if command -v gh >/dev/null 2>&1; then
  gh pr create --fill --title "$PR_TITLE" --body "$PR_BODY"
  echo "PR created. Please review on GitHub."
else
  echo "gh CLI not found — branch pushed. Create a PR manually via GitHub UI."
fi

echo "Done."

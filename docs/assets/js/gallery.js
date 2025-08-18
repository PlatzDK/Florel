// docs/assets/js/gallery.js
// Dynamisk gallery renderer — henter docs/assets/images/gallery.json
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

  // Ensure container exists
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
      // prevent body scroll while LB open
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

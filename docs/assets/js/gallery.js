// docs/assets/js/gallery.js
(async () => {
  const candidatePaths = [
    './assets/images/gallery.json',
    '../assets/images/gallery.json',
    '/Florel/docs/assets/images/gallery.json',
    '/docs/assets/images/gallery.json'
  ];
  let manifest=null, usedPath=null;
  for(const p of candidatePaths) {
    try {
      const res = await fetch(p, {cache:'no-cache'});
      if(res.ok) { manifest = await res.json(); usedPath = p.slice(0, p.lastIndexOf('/')+1); break; }
    } catch(e) {}
  }
  if(!manifest){ console.warn('Gallery: manifest not found'); return; }

  let grid = document.getElementById('galleryGrid');
  if(!grid){
    const sec = document.createElement('section');
    sec.id='galleri'; sec.className='section container';
    sec.innerHTML = '<h2>Galleri</h2><div id="galleryGrid" class="gallery"></div>';
    (document.querySelector('main') || document.body).appendChild(sec);
    grid = document.getElementById('galleryGrid');
  }
  const lang = (document.documentElement.lang || 'en').substring(0,2);
  manifest.forEach(item => {
    const img=document.createElement('img');
    img.loading='lazy';
    img.src=(usedPath+item.thumb).replace(/\/\.\//g,'/');
    img.dataset.full=(usedPath+item.large).replace(/\/\.\//g,'/');
    img.alt=(item.caption && (item.caption[lang]||item.caption.en)) || item.slug || '';
    img.dataset.caption = item.caption ? (item.caption[lang]||item.caption.en||'') : '';
    img.className='gallery-thumb';
    grid.appendChild(img);
  });

// --- Lightbox creation & handlers (replace any existing lightbox code block) ---
let lightbox = document.getElementById('galleryLightbox');
if (!lightbox) {
  lightbox = document.createElement('div');
  lightbox.id = 'galleryLightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.style.display = 'none';

  // inner wrap
  const wrap = document.createElement('div');
  wrap.className = 'lb-wrap';

  // close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'lb-close';
  closeBtn.setAttribute('aria-label', 'Luk');
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn); // absolute positioned by CSS

  // image container
  const imgWrap = document.createElement('div');
  imgWrap.className = 'lb-imgwrap';
  const lbImg = document.createElement('img');
  lbImg.className = 'lb-img';
  lbImg.alt = '';
  imgWrap.appendChild(lbImg);

  // caption
  const lbCap = document.createElement('div');
  lbCap.className = 'lb-caption';
  lbCap.textContent = '';

  // assemble
  wrap.appendChild(imgWrap);
  wrap.appendChild(lbCap);
  lightbox.appendChild(wrap);
  document.body.appendChild(lightbox);

  // helper functions
  function openLightbox(src, altText, captionText) {
    lbImg.src = src;
    lbImg.alt = altText || '';
    lbCap.textContent = captionText || '';
    lightbox.style.display = 'flex';
    // lock background scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    // focus for accessibility
    wrap.setAttribute('tabindex', '-1');
    wrap.focus();
  }

  function closeLightbox() {
    // clear src to free memory on mobile
    lbImg.src = '';
    lightbox.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // events
  lightbox.addEventListener('click', (ev) => {
    if (ev.target === lightbox) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (ev) => {
    if (lightbox.style.display === 'flex' && ev.key === 'Escape') closeLightbox();
  });

  // expose open/close for external use
  lightbox._openLightbox = openLightbox;
  lightbox._closeLightbox = closeLightbox;
}

// Bind thumbs (ensure grid exists)
const galleryGrid = document.getElementById('galleryGrid');
if (galleryGrid) {
  galleryGrid.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'IMG') {
      const full = target.dataset.full || target.src;
      const alt = target.alt || '';
      const cap = target.dataset.caption || '';
      const lb = document.getElementById('galleryLightbox');
      if (lb && lb._openLightbox) lb._openLightbox(full, alt, cap);
    }
  });
}
})();

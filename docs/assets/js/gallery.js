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

// --- Lightbox creation & handlers (replace existing block) ---
let lightbox = document.getElementById('galleryLightbox');
if (!lightbox) {
  lightbox = document.createElement('div');
  lightbox.id = 'galleryLightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.style.display = 'none';

  const wrap = document.createElement('div');
  wrap.className = 'lb-wrap';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lb-close';
  closeBtn.setAttribute('aria-label', 'Luk');
  closeBtn.innerHTML = '&times;';
  lightbox.appendChild(closeBtn);

  const imgWrap = document.createElement('div'); imgWrap.className = 'lb-imgwrap';
  const lbImg = document.createElement('img'); lbImg.className = 'lb-img'; lbImg.alt = '';
  imgWrap.appendChild(lbImg);

  const lbCap = document.createElement('div'); lbCap.className = 'lb-caption'; lbCap.textContent = '';

  wrap.appendChild(imgWrap);
  wrap.appendChild(lbCap);
  lightbox.appendChild(wrap);
  document.body.appendChild(lightbox);

  function openLightbox(src, altText, captionText) {
    lbImg.src = src;
    lbImg.alt = altText || '';
    lbCap.textContent = captionText || '';
    lightbox.style.display = 'flex';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    wrap.setAttribute('tabindex', '-1'); wrap.focus();
  }
  function closeLightbox() {
    lbImg.src = '';
    lightbox.style.display = 'none';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  lightbox.addEventListener('click', (ev) => { if (ev.target === lightbox) closeLightbox(); });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (ev) => { if (lightbox.style.display === 'flex' && ev.key === 'Escape') closeLightbox(); });

  lightbox._openLightbox = openLightbox;
  lightbox._closeLightbox = closeLightbox;
}

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

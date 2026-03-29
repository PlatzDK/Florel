document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gallery-grid');

    // Build category display names from i18n when available, fall back to English
    function getCatMap() {
        const t = window.__i18n || {};
        return {
            'living_room': t['gallery.cat.living_room'] || 'Living Space',
            'kitchen':     t['gallery.cat.kitchen']     || 'Kitchen',
            'rooms':       t['gallery.cat.rooms']       || 'Rooms',
            'nature':      t['gallery.cat.nature']      || 'Nature',
            'bathroom':    t['gallery.cat.bathroom']    || 'Bathroom',
            'cover':       t['gallery.cat.cover']       || 'Exterior',
        };
    }

    // Re-translate badge labels whenever the active language changes
    document.addEventListener('langchange', () => {
        if (!container) return;
        const catMap = getCatMap();
        container.querySelectorAll('[data-gallery-cat]').forEach(badge => {
            const key = badge.dataset.galleryCat;
            if (catMap[key]) badge.textContent = catMap[key];
        });
    });

    if (!container) return;

    fetch('gallery_data.json')
        .then(r => r.json())
        .then(data => {
            const images = [];

            // Handle Cover/Hero Image
            if (data.cover && data.cover.length > 0) {
                const heroImg = document.getElementById('hero-image');
                if (heroImg) heroImg.src = data.cover[0];
            }

            // Handle About Image
            if (data.about && data.about.length > 0) {
                const aboutImg = document.getElementById('about-image');
                if (aboutImg) aboutImg.src = data.about[0];
            }

            // Collect all images
            const catMap = getCatMap();
            Object.entries(data).forEach(([key, imgs]) => {
                if (key === 'cover') return; // Skip cover in grid as it is used in header
                if (key === 'about') return; // Skip about in grid
                const displayCat = catMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
                imgs.forEach(src => images.push({ src, category: displayCat, catKey: key }));
            });

            if (images.length === 0) {
                container.innerHTML = '<div class="md:col-span-12 text-center text-smoke py-20">No images found. Please add images to assets/images/gallery/</div>';
                return;
            }

            container.innerHTML = ''; // Clear loading message

            // Simple pattern for visual interest: 8 cols, 4 cols, 12 cols, repeat
            const pattern = ['md:col-span-8', 'md:col-span-4', 'md:col-span-12', 'md:col-span-4', 'md:col-span-8'];

            images.forEach((img, index) => {
                const spanClass = pattern[index % pattern.length];
                let aspectClass = 'aspect-[16/9]';
                if (spanClass === 'md:col-span-4') aspectClass = 'aspect-[3/4]';
                if (spanClass === 'md:col-span-12') aspectClass = 'aspect-[21/9]';

                const div = document.createElement('div');
                div.className = `${spanClass} relative ${aspectClass} group overflow-hidden bg-gray-900`;

                // Using encodeURI to ensure spaces/chars in filenames don't break
                const safeSrc = encodeURI(img.src);

                // Create Image
                const imageEl = document.createElement('img');
                imageEl.src = safeSrc;
                imageEl.loading = 'lazy';
                imageEl.decoding = 'async';
                imageEl.className = 'w-full h-full object-cover transition duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100';
                imageEl.alt = img.category;

                // Create Overlay Container
                const overlayEl = document.createElement('div');
                overlayEl.className = 'absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition duration-500';

                // Create Badge/Label – store the category key for re-translation on lang change
                const badgeEl = document.createElement('span');
                badgeEl.className = 'text-xs font-bold tracking-widest uppercase bg-rust text-white px-3 py-1';
                badgeEl.dataset.galleryCat = img.catKey;
                badgeEl.textContent = img.category; // Safe text insertion

                // Assemble
                overlayEl.appendChild(badgeEl);
                div.appendChild(imageEl);
                div.appendChild(overlayEl);

                container.appendChild(div);
            });
        })
        .catch(e => {
            console.error("Could not load gallery", e);
            if (container) container.innerHTML = '<div class="md:col-span-12 text-center text-smoke py-20">Gallery unavailable.</div>';
        });
});

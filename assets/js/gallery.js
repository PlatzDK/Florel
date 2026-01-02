document.addEventListener('DOMContentLoaded', () => {
    fetch('gallery_data.json')
        .then(r => r.json())
        .then(data => {
            const container = document.getElementById('gallery-grid');
            if (!container) return;

            const images = [];
            // Map simplistic folder names to Nice Display Names
            const catMap = {
                'living_room': 'Living Space',
                'kitchen': 'Kitchen',
                'rooms': 'Rooms',
                'nature': 'Nature',
                'bathroom': 'Bathroom',
                'cover': 'Exterior'
            };

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
            Object.entries(data).forEach(([key, imgs]) => {
                if (key === 'cover') return; // Skip cover in grid as it is used in header
                if (key === 'about') return; // Skip about in grid
                const displayCat = catMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
                imgs.forEach(src => images.push({ src, category: displayCat }));
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

                div.innerHTML = `
                    <img src="${safeSrc}" 
                            loading="lazy"
                            decoding="async"
                            class="w-full h-full object-cover transition duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                            alt="${img.category}">
                        <div class="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition duration-500">
                            <span class="text-xs font-bold tracking-widest uppercase bg-rust text-white px-3 py-1">
                                ${img.category}
                            </span>
                        </div>
                `;
                container.appendChild(div);
            });
        })
        .catch(e => {
            console.error("Could not load gallery", e);
            const container = document.getElementById('gallery-grid');
            if (container) container.innerHTML = '<div class="md:col-span-12 text-center text-smoke py-20">Gallery unavailable.</div>';
        });
});

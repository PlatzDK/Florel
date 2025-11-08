const encodeSvg = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;

type GalleryAspect = "landscape" | "classic";

const galleryPalettes = [
  { background: "#0F3D2E", accent: "#F2F0E9", detail: "#B38B59" },
  { background: "#174F3B", accent: "#FFFFFF", detail: "#B38B59" },
  { background: "#1F6950", accent: "#F2F0E9", detail: "#FFFFFF" },
  { background: "#0C3023", accent: "#B38B59", detail: "#F2F0E9" }
];

const fontFamily = "'Poppins', 'Inter', 'Segoe UI', sans-serif";

const heroSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-labelledby="title desc">
  <title id="title">Fisker ved Bølling Sø</title>
  <desc id="desc">Illustreret placeholder der viser en fisker i morgensol ved søbredden.</desc>
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#d6e6df" />
      <stop offset="100%" stop-color="#f2f0e9" />
    </linearGradient>
    <linearGradient id="water" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0F3D2E" />
      <stop offset="100%" stop-color="#1F6950" />
    </linearGradient>
  </defs>
  <rect width="900" height="360" fill="url(#sky)" />
  <rect y="360" width="900" height="240" fill="url(#water)" />
  <circle cx="720" cy="120" r="60" fill="#f7d487" opacity="0.8" />
  <path d="M60 420 Q140 360 240 410 T420 420" fill="none" stroke="#f2f0e9" stroke-width="6" stroke-linecap="round" />
  <path d="M270 320 Q320 340 360 300 Q400 260 450 280" fill="none" stroke="#B38B59" stroke-width="6" stroke-linecap="round" />
  <rect x="120" y="330" width="24" height="120" rx="8" fill="#0F3D2E" />
  <path d="M132 320 Q160 250 220 240" fill="none" stroke="#0F3D2E" stroke-width="6" />
  <path d="M220 240 Q260 220 320 240" fill="none" stroke="#B38B59" stroke-width="6" />
  <text x="60" y="540" fill="#FFFFFF" font-family=${fontFamily} font-size="46" font-weight="600">Skovkrogen 37</text>
  <text x="60" y="580" fill="#F2F0E9" font-family=${fontFamily} font-size="24">Ro, fiskeri og familiehygge</text>
</svg>`;

const houseSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640" role="img" aria-labelledby="houseTitle houseDesc">
  <title id="houseTitle">Sommerhus ved skovkanten</title>
  <desc id="houseDesc">Illustreret placeholder for huset med terrasse og fyrretræer.</desc>
  <rect width="960" height="640" fill="#F2F0E9" />
  <rect y="360" width="960" height="280" fill="#d9cbb2" />
  <rect x="220" y="260" width="520" height="220" fill="#ffffff" rx="24" />
  <polygon points="200,260 480,120 760,260" fill="#0F3D2E" />
  <rect x="300" y="320" width="120" height="120" fill="#dbe7e2" rx="12" />
  <rect x="540" y="320" width="120" height="120" fill="#dbe7e2" rx="12" />
  <rect x="440" y="340" width="80" height="140" fill="#B38B59" rx="16" />
  <rect x="260" y="420" width="400" height="40" fill="#B38B59" rx="12" />
  <circle cx="150" cy="340" r="90" fill="#1F6950" opacity="0.8" />
  <circle cx="820" cy="340" r="120" fill="#174F3B" opacity="0.8" />
  <text x="80" y="540" fill="#0F3D2E" font-family=${fontFamily} font-size="40" font-weight="600">Skovkrogen 37</text>
  <text x="80" y="590" fill="#0F3D2E" font-family=${fontFamily} font-size="24">Terrasse, grill og plads til grej</text>
</svg>`;

export const heroPlaceholder = encodeSvg(heroSvg);
export const housePlaceholder = encodeSvg(houseSvg);

export const getGalleryPlaceholder = (index: number, title: string, aspect: GalleryAspect) => {
  const palette = galleryPalettes[index % galleryPalettes.length];
  const width = aspect === "landscape" ? 1200 : 960;
  const height = aspect === "landscape" ? 800 : 960;
  const subtitle = aspect === "landscape" ? "Fiskeri og natur" : "Skovkrogen 37";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title${index} desc${index}">
    <title id="title${index}">${title}</title>
    <desc id="desc${index}">Stiliseret placeholder der repræsenterer galleriindholdet.</desc>
    <defs>
      <linearGradient id="gradient${index}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${palette.background}" />
        <stop offset="100%" stop-color="${palette.detail}" />
      </linearGradient>
      <pattern id="pattern${index}" patternUnits="userSpaceOnUse" width="120" height="120">
        <rect width="120" height="120" fill="${palette.background}" opacity="0.25" />
        <path d="M0 0 L120 120 M120 0 L0 120" stroke="${palette.accent}" stroke-width="8" stroke-opacity="0.08" />
      </pattern>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#gradient${index})" />
    <rect width="${width}" height="${height}" fill="url(#pattern${index})" opacity="0.6" />
    <circle cx="${width / 1.5}" cy="${height / 3}" r="${Math.min(width, height) / 6}" fill="${palette.accent}" opacity="0.85" />
    <path d="M${width * 0.1} ${height * 0.75} Q ${width * 0.3} ${height * 0.55} ${width * 0.5} ${height * 0.72} T ${width * 0.9} ${height * 0.7}" stroke="${palette.accent}" stroke-width="${Math.max(width, height) / 120}" fill="none" stroke-linecap="round" stroke-opacity="0.65" />
    <text x="${width * 0.08}" y="${height * 0.82}" fill="${palette.accent}" font-family=${fontFamily} font-size="${Math.max(width, height) / 22}" font-weight="600">${title}</text>
    <text x="${width * 0.08}" y="${height * 0.88}" fill="${palette.accent}" font-family=${fontFamily} font-size="${Math.max(width, height) / 32}" opacity="0.9">${subtitle}</text>
  </svg>`;

  return encodeSvg(svg);
};

export type { GalleryAspect };

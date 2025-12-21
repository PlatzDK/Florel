/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // i18n routing is not compatible with static export
  // i18n: {
  //   locales: ["da", "en"],
  //   defaultLocale: "da",
  // },
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

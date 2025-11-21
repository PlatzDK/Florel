/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["da", "en"],
    defaultLocale: "da",
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

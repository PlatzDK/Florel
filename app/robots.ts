import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const url = "https://www.skovkrogen37.dk";
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${url}/sitemap.xml`,
    host: url
  };
}

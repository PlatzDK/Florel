import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.skovkrogen37.dk";
  const routes = [
    "",
    "/sommerhuset",
    "/fiskeri",
    "/galleri",
    "/priser",
    "/faq",
    "/kontakt",
    "/vilkaar",
    "/persondata",
    "/cookiepolitik"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}

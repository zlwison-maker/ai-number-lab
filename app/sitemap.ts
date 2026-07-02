import type { MetadataRoute } from "next";

const siteUrl = "https://numberlab.vip";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/phone-number-meaning`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75
    }
  ];
}

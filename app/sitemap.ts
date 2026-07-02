import type { MetadataRoute } from "next";
import { phoneNumberMeaningPages } from "@/lib/programmaticSeo";
import { seoLandingPages } from "@/lib/seoLandingPages";

const siteUrl = "https://numberlab.vip";
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${siteUrl}/faq`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${siteUrl}/phone-number-meaning`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.75
    },
    ...phoneNumberMeaningPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.72
    })),
    ...seoLandingPages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.78
    }))
  ];
}

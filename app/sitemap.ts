import type { MetadataRoute } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { allPostSlugsQuery, allCountrySlugsQuery, allCitySlugsQuery } from "@/sanity/lib/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://milzblog.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, countrySlugs, citySlugs] = await Promise.all([
    safeFetch<{ slug: string }[]>(allPostSlugsQuery, {}, []),
    safeFetch<{ slug: string }[]>(allCountrySlugsQuery, {}, []),
    safeFetch<{ citySlug: string; countrySlug: string }[]>(allCitySlugsQuery, {}, []),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/destinations`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/travel-tips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/travel-news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/travel-outfits`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/start-here`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/work-with-me`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];

  const posts: MetadataRoute.Sitemap = postSlugs.map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const countries: MetadataRoute.Sitemap = countrySlugs.map(({ slug }) => ({
    url: `${SITE_URL}/destinations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const cities: MetadataRoute.Sitemap = citySlugs.map(({ citySlug, countrySlug }) => ({
    url: `${SITE_URL}/destinations/${countrySlug}/${citySlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...posts, ...countries, ...cities];
}

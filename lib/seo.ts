import type { Metadata } from "next";
import type { Post, Country, City } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://milzblog.com";
const SITE_NAME = "Milzblog";

export function generatePostMetadata(post: Post): Metadata {
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const canonicalUrl = `${SITE_URL}/blog/${post.slug.current}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      url: canonicalUrl,
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function generateCountryMetadata(country: Country): Metadata {
  const title = `${country.name} Travel Guide`;
  const description = country.description || `Explore travel posts, tips, and guides for ${country.name}.`;
  const canonicalUrl = `${SITE_URL}/destinations/${country.slug.current}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, siteName: SITE_NAME },
  };
}

export function generateCityMetadata(city: City, countrySlug: string): Metadata {
  const title = `${city.name}, ${city.country?.name || ""} Travel Guide`;
  const description = city.description || `Explore travel posts and guides for ${city.name}.`;
  const canonicalUrl = `${SITE_URL}/destinations/${countrySlug}/${city.slug.current}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: { title, description, url: canonicalUrl, siteName: SITE_NAME },
  };
}

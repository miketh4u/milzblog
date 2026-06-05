import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: SanityImage;
}

export interface AffiliateLink {
  _key: string;
  productName: string;
  url: string;
  image?: SanityImage;
  price?: string;
}

export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: SanitySlug;
  description?: string;
}

export interface Subcategory {
  _id: string;
  _type: "subcategory";
  name: string;
  slug: SanitySlug;
  category: Category;
  description?: string;
}

export interface City {
  _id: string;
  _type: "city";
  name: string;
  slug: SanitySlug;
  country: Country;
  heroImage?: SanityImage;
  description?: string;
}

export interface Country {
  _id: string;
  _type: "country";
  name: string;
  slug: SanitySlug;
  region: string;
  heroImage?: SanityImage;
  description?: string;
  cities?: City[];
  mapCoordinates?: { lat: number; lng: number };
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: SanitySlug;
  publishedAt: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  featuredImage?: SanityImage;
  category?: Category;
  subcategory?: Subcategory;
  country?: Country;
  city?: City;
  tags?: string[];
  isSponsored?: boolean;
  isFeatured?: boolean;
  readingTime?: number;
  affiliateLinks?: AffiliateLink[];
  seo?: SeoFields;
  viewCount?: number;
}

export interface PostCard
  extends Pick<
    Post,
    | "_id"
    | "title"
    | "slug"
    | "publishedAt"
    | "excerpt"
    | "featuredImage"
    | "category"
    | "subcategory"
    | "country"
    | "city"
    | "readingTime"
    | "isFeatured"
    | "isSponsored"
  > {}

export type Region =
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "South America"
  | "Oceania"
  | "Middle East";

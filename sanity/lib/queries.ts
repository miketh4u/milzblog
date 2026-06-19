import { groq } from "next-sanity";

const postCardFields = groq`
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  featuredImage { asset, alt, hotspot, crop },
  readingTime,
  isFeatured,
  isSponsored,
  category -> { _id, name, slug },
  subcategory -> { _id, name, slug },
  country -> { _id, name, slug },
  city -> { _id, name, slug }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && isFeatured == true] | order(publishedAt desc) [0...3] {
    ${postCardFields}
  }
`;

export const recentPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...$limit] {
    ${postCardFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    featuredImage { asset, alt, hotspot, crop },
    readingTime,
    isFeatured,
    isSponsored,
    tags,
    affiliateLinks,
    seo,
    category -> { _id, name, slug },
    subcategory -> { _id, name, slug },
    country -> { _id, name, slug, region },
    city -> { _id, name, slug }
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && (
    country._ref == $countryId || category._ref == $categoryId
  )] | order(publishedAt desc) [0...3] {
    ${postCardFields}
  }
`;

export const allCountriesQuery = groq`
  *[_type == "country"] | order(name asc) {
    _id,
    name,
    slug,
    region,
    heroImage { asset, alt, hotspot, crop },
    description,
    mapCoordinates,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

export const countryBySlugQuery = groq`
  *[_type == "country" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    region,
    heroImage { asset, alt, hotspot, crop },
    description,
    mapCoordinates,
    cities[] -> { _id, name, slug }
  }
`;

export const postsByCountryQuery = groq`
  *[_type == "post" && country._ref == $countryId] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

export const postsByCityQuery = groq`
  *[_type == "post" && city._ref == $cityId] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

export const cityBySlugQuery = groq`
  *[_type == "city" && slug.current == $citySlug && country->slug.current == $countrySlug][0] {
    _id,
    name,
    slug,
    heroImage { asset, alt, hotspot, crop },
    description,
    country -> { _id, name, slug }
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

export const postsBySubcategoryQuery = groq`
  *[_type == "post" && subcategory->slug.current == $subcategorySlug] | order(publishedAt desc) {
    ${postCardFields}
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post"] { "slug": slug.current }
`;

export const allCountrySlugsQuery = groq`
  *[_type == "country"] { "slug": slug.current }
`;

export const allCitySlugsQuery = groq`
  *[_type == "city"] {
    "citySlug": slug.current,
    "countrySlug": country->slug.current
  }
`;

export const popularPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) [0...6] {
    ${postCardFields}
  }
`;

export const topCountriesQuery = groq`
  *[_type == "country"] {
    _id,
    name,
    slug,
    heroImage { asset, alt, hotspot, crop },
    "postCount": count(*[_type == "post" && references(^._id)])
  } | order(postCount desc) [0...4]
`;

export const mapCountriesQuery = groq`
  *[_type == "country" && defined(mapCoordinates.lat) && defined(mapCoordinates.lng)] {
    _id,
    name,
    slug,
    region,
    mapCoordinates,
    "postCount": count(*[_type == "post" && references(^._id)])
  }
`;

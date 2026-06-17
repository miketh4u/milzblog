import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/client";
import { cityBySlugQuery, postsByCityQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PostCard } from "@/components/ui/PostCard";
import { generateCityMetadata } from "@/lib/seo";
import type { City, PostCard as PostCardType } from "@/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

interface Props {
  params: Promise<{ country: string; city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;
  const city = await safeFetch<City | null>(cityBySlugQuery, { countrySlug, citySlug }, null);
  if (!city) return {};
  return generateCityMetadata(city, countrySlug);
}

export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params;
  const city = await safeFetch<City | null>(cityBySlugQuery, { countrySlug, citySlug }, null);

  if (!city) notFound();

  const cityPosts = await safeFetch<PostCardType[]>(postsByCityQuery, { cityId: city._id }, []);
  const heroUrl = city.heroImage ? urlFor(city.heroImage).width(1600).height(500).fit("crop").auto("format").url() : null;

  return (
    <>
      <div className="relative h-56 md:h-80 bg-[var(--color-primary)] overflow-hidden">
        {heroUrl && <Image src={heroUrl} alt={city.heroImage?.alt || city.name} fill className="object-cover" priority sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <nav className="flex items-center gap-2 text-white/60 text-xs mb-3">
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <Link href={`/destinations/${countrySlug}`} className="hover:text-white transition-colors capitalize">{countrySlug.replace(/-/g, " ")}</Link>
              <span>/</span>
              <span className="text-white">{city.name}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-semibold text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
              {city.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {city.description && <p className="text-[var(--color-text-muted)] max-w-2xl mb-10">{city.description}</p>}
        {cityPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {cityPosts.map((post, i) => <PostCard key={post._id} post={post} priority={i === 0} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-[var(--color-text-muted)]">
            <p>No posts yet for {city.name}. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}

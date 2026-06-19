import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/client";
import { countryBySlugQuery, postsByCountryQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PostCard } from "@/components/ui/PostCard";
import { CountryCityFilter } from "./CountryCityFilter";
import type { Country, PostCard as PostCardType } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;
  const country = await safeFetch<Country | null>(countryBySlugQuery, { slug }, null);
  if (!country) return {};
  return {
    title: country.name,
    description: country.description || `Travel guides and stories from ${country.name}.`,
  };
}

export default async function CountryPage({ params }: Props) {
  const { country: countrySlug } = await params;
  const country = await safeFetch<Country | null>(countryBySlugQuery, { slug: countrySlug }, null);
  if (!country) notFound();

  const posts = await safeFetch<PostCardType[]>(postsByCountryQuery, { countryId: country._id }, []);

  const heroUrl = country.heroImage
    ? urlFor(country.heroImage).width(1600).height(600).fit("crop").auto("format").url()
    : null;

  return (
    <>
      <div className="relative h-64 md:h-96 bg-[var(--color-primary)] overflow-hidden">
        {heroUrl && (
          <Image
            src={heroUrl}
            alt={country.heroImage?.alt || country.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <nav className="flex items-center gap-2 text-white/60 text-xs mb-3">
              <Link href="/destinations" className="hover:text-white transition-colors">
                Destinations
              </Link>
              <span>/</span>
              <span className="text-white">{country.name}</span>
            </nav>
            <h1
              className="text-4xl md:text-6xl font-semibold text-white"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {country.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {country.description && (
          <p className="text-[var(--color-text-muted)] text-base leading-relaxed max-w-2xl mb-10">
            {country.description}
          </p>
        )}

        {posts.length > 0 ? (
          country.cities && country.cities.length > 0 ? (
            <CountryCityFilter cities={country.cities} posts={posts} countryName={country.name} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {posts.map((post, i) => (
                <PostCard key={post._id} post={post} priority={i === 0} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16 text-[var(--color-text-muted)]">
            <p>No posts yet for {country.name}.</p>
          </div>
        )}
      </div>
    </>
  );
}

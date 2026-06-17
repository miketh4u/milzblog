"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { countryBySlugQuery, postsByCountryQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { PostCard } from "@/components/ui/PostCard";
import type { Country, PostCard as PostCardType, City } from "@/types";

export function CountryPageClient({ countrySlug }: { countrySlug: string }) {
  const [countryData, setCountryData] = useState<Country | null>(null);
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const c = await client.fetch<Country>(countryBySlugQuery, { slug: countrySlug }).catch(() => null);
      if (c) {
        const countryPosts = await client.fetch<PostCardType[]>(postsByCountryQuery, { countryId: c._id }).catch(() => []);
        setCountryData(c);
        setPosts(countryPosts);
      }
      setLoading(false);
    }
    load();
  }, [countrySlug]);

  const filteredPosts = selectedCity === "all" ? posts : posts.filter((p) => p.city?.slug.current === selectedCity);
  const heroUrl = countryData?.heroImage
    ? urlFor(countryData.heroImage).width(1600).height(600).fit("crop").auto("format").url()
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text-muted)]">Loading...</div>
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Country not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-64 md:h-96 bg-[var(--color-primary)] overflow-hidden">
        {heroUrl && (
          <Image src={heroUrl} alt={countryData.heroImage?.alt || countryData.name} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full">
            <nav className="flex items-center gap-2 text-white/60 text-xs mb-3">
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{countryData.name}</span>
            </nav>
            <h1 className="text-4xl md:text-6xl font-semibold text-white" style={{ fontFamily: "var(--font-cormorant)" }}>
              {countryData.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {countryData.description && (
          <p className="text-[var(--color-text-muted)] text-base leading-relaxed max-w-2xl mb-10">
            {countryData.description}
          </p>
        )}

        {countryData.cities && countryData.cities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setSelectedCity("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${selectedCity === "all" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"}`}
            >
              All
            </button>
            {countryData.cities.map((city: City) => (
              <button
                key={city._id}
                onClick={() => setSelectedCity(city.slug.current)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[40px] ${selectedCity === city.slug.current ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-border)]"}`}
              >
                {city.name}
              </button>
            ))}
          </div>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, i) => <PostCard key={post._id} post={post} priority={i === 0} />)}
          </div>
        ) : (
          <div className="text-center py-16 text-[var(--color-text-muted)]">
            <p>No posts yet for {selectedCity === "all" ? countryData.name : selectedCity}.</p>
          </div>
        )}
      </div>
    </>
  );
}

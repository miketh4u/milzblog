import Link from "next/link";
import Image from "next/image";
import { safeFetch } from "@/sanity/lib/client";
import { featuredPostsQuery, allCountriesQuery, popularPostsQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/ui/PostCard";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { NewsletterInline } from "@/components/ui/NewsletterInline";
import type { PostCard as PostCardType, Country } from "@/types";

export const revalidate = 3600;

const REGIONS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Middle East"];

export default async function HomePage() {
  const [featuredPosts, allCountries, popularPosts] = await Promise.all([
    safeFetch<PostCardType[]>(featuredPostsQuery, {}, []),
    safeFetch<(Country & { postCount: number })[]>(allCountriesQuery, {}, []),
    safeFetch<PostCardType[]>(popularPostsQuery, {}, []),
  ]);

  const regionGroups = REGIONS.map((region) => ({
    region,
    countries: allCountries.filter((c) => c.region === region).slice(0, 4),
  })).filter((g) => g.countries.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end bg-[var(--color-primary)] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 z-10" />
          {/* Placeholder background — replace with CMS hero image */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-stone-800 to-stone-900" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
          <div className="max-w-2xl">
            <p className="text-amber-400 text-sm font-medium uppercase tracking-[0.2em] mb-4">Explore the World</p>
            <h1 className="text-5xl md:text-7xl font-semibold text-white leading-none mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
              Travel Stories Worth Reading
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
              Immersive destination guides, honest travel tips, and outfit inspiration — for the curious, adventurous traveller.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/destinations" className="inline-flex items-center bg-[var(--color-accent)] text-white font-semibold px-6 py-3 rounded-full hover:bg-amber-600 transition-colors min-h-[48px]">
                Explore Destinations
              </Link>
              <Link href="/start-here" className="inline-flex items-center bg-white/10 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm min-h-[48px] border border-white/30">
                Start Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-2">From the Blog</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
                Featured Stories
              </h2>
            </div>
            <Link href="/blog" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors hidden md:block">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredPosts.map((post, i) => (
              <PostCard key={post._id} post={post} priority={i === 0} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center text-sm font-medium text-[var(--color-accent)]">
              View all posts →
            </Link>
          </div>
        </section>
      )}

      {/* Destinations by region */}
      {regionGroups.map(({ region, countries }) => (
        <section key={region} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
              {region}
            </h2>
            <Link href={`/destinations?region=${encodeURIComponent(region)}`} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
              Explore →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {countries.map((country, i) => (
              <DestinationCard key={country._id} country={country} priority={i === 0} />
            ))}
          </div>
        </section>
      ))}

      {/* Newsletter CTA */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-16 px-4">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-3">Stay Inspired</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
            Travel Inspiration Weekly
          </h2>
          <p className="text-[var(--color-text-muted)] mb-8 text-sm">
            New destinations, practical tips, and exclusive guides — straight to your inbox.
          </p>
          <NewsletterInline
            variant="inline"
            title=""
            description=""
          />
        </div>
      </section>

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-2">Reader Favorites</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
                Popular Posts
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {popularPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* About teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="bg-[var(--color-primary)] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-amber-400 text-xs font-medium uppercase tracking-[0.2em] mb-4">Hello, Traveller</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 leading-snug" style={{ fontFamily: "var(--font-cormorant)" }}>
                The story behind the blog
              </h2>
              <p className="text-white/70 mb-6 leading-relaxed text-sm">
                From solo trips through Southeast Asia to couples getaways in Europe — this is where I share it all. Real stories, honest advice, and destinations that stay with you.
              </p>
              <Link href="/about" className="inline-flex items-center text-[var(--color-accent)] font-semibold text-sm hover:text-amber-300 transition-colors">
                Read my story →
              </Link>
            </div>
            <div className="relative aspect-square md:aspect-auto min-h-[300px] bg-gradient-to-br from-amber-800 to-stone-700" />
          </div>
        </div>
      </section>
    </>
  );
}

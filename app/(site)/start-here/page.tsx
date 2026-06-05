import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/sanity/lib/client";
import { featuredPostsQuery, allCountriesQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/ui/PostCard";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { NewsletterInline } from "@/components/ui/NewsletterInline";
import type { PostCard as PostCardType, Country } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Start Here",
  description: "New to the blog? This is the best place to start — top posts, popular destinations, and resources to kick off your travel journey.",
};

const CATEGORIES = [
  { label: "Destinations", href: "/destinations", description: "Country-by-country travel guides and stories" },
  { label: "Travel Tips", href: "/travel-tips", description: "Practical advice for solo travellers, couples, and planners" },
  { label: "Travel Outfits", href: "/travel-outfits", description: "What to wear, what to pack, what to shop" },
  { label: "Travel News", href: "/travel-news", description: "Visa updates, trends, and travel commentary" },
];

export default async function StartHerePage() {
  const [featuredPosts, allCountries] = await Promise.all([
    safeFetch<PostCardType[]>(featuredPostsQuery, {}, []),
    safeFetch<(Country & { postCount: number })[]>(allCountriesQuery, {}, []),
  ]);

  const topCountries = allCountries.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-4">Welcome</p>
        <h1 className="text-5xl md:text-7xl font-semibold text-[var(--color-primary)] mb-6 leading-none" style={{ fontFamily: "var(--font-cormorant)" }}>
          Start Here
        </h1>
        <p className="text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Whether you arrived from Instagram, TikTok, or a Google rabbit hole — welcome. Here&rsquo;s the best of the blog to get you started.
        </p>
      </div>

      {/* Who I Am */}
      <section className="bg-[var(--color-surface)] rounded-3xl p-8 md:p-12 mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
          Who I Am
        </h2>
        <p className="text-[var(--color-text-muted)] leading-relaxed mb-6">
          I&rsquo;m a travel writer and photographer obsessed with off-the-beaten-path destinations, luxurious experiences on a realistic budget, and the kind of travel that genuinely changes you. I&rsquo;ve been to over 40 countries, solo and with my partner, and this blog is where I document all of it honestly — the highs, the chaos, the outfits, and the food.
        </p>
        <Link href="/about" className="inline-flex items-center font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-2)] transition-colors">
          Read my full story →
        </Link>
      </section>

      {/* Browse by category */}
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href} className="group block border border-[var(--color-border)] rounded-2xl p-6 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-all">
              <h3 className="font-semibold text-[var(--color-primary)] text-xl group-hover:text-[var(--color-accent)] transition-colors mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
                {cat.label}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)]">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
            Best Posts to Start With
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredPosts.map((post, i) => <PostCard key={post._id} post={post} priority={i === 0} />)}
          </div>
        </section>
      )}

      {/* Top destinations */}
      {topCountries.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
            Top Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {topCountries.map((country, i) => <DestinationCard key={country._id} country={country} priority={i === 0} />)}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <NewsletterInline
        title="Never Miss a New Post"
        description="Join thousands of travellers who get destination guides, packing lists, and travel tips delivered weekly."
      />
    </div>
  );
}

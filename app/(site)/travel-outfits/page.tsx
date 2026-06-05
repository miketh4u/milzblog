import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/sanity/lib/client";
import { postsByCategoryQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/ui/PostCard";
import type { PostCard as PostCardType } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Travel Outfits",
  description: "Travel outfit guides, packing style inspiration, and affiliate-linked fashion recommendations.",
  other: { "pinterest-rich-pin": "true" },
};

const SUBCATEGORIES = [
  { label: "All Outfits", slug: null },
  { label: "Outfit Guides", slug: "outfit-guides" },
  { label: "Packing Style", slug: "packing-style" },
  { label: "By Destination", slug: "destination-outfits" },
];

export default async function TravelOutfitsPage() {
  const posts = await safeFetch<PostCardType[]>(postsByCategoryQuery, { categorySlug: "travel-outfits" }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-3">Style Guides</p>
        <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
          Travel Outfits
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {SUBCATEGORIES.map((sub) => (
          sub.slug ? (
            <Link key={sub.slug} href={`/travel-outfits/${sub.slug}`} className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-full text-sm hover:bg-[var(--color-accent)] hover:text-white transition-colors min-h-[40px] flex items-center">
              {sub.label}
            </Link>
          ) : (
            <span key="all" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm min-h-[40px] flex items-center font-medium">
              {sub.label}
            </span>
          )
        ))}
      </div>

      {/* Pinterest-style 2:3 grid */}
      {posts.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {posts.map((post, i) => <PostCard key={post._id} post={post} variant="featured" priority={i === 0} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-[var(--color-text-muted)]"><p>Outfit guides coming soon!</p></div>
      )}
    </div>
  );
}

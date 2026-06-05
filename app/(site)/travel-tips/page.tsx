import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/sanity/lib/client";
import { postsByCategoryQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/ui/PostCard";
import type { PostCard as PostCardType } from "@/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Travel Tips & Tricks",
  description: "Solo travel advice, packing hacks, flight deals, safety tips, and practical travel planning guides.",
};

const SUBCATEGORIES = [
  { label: "All Tips", slug: null },
  { label: "Solo Travel", slug: "solo-travel" },
  { label: "Couples", slug: "couple-travel" },
  { label: "Packing", slug: "packing-hacks" },
  { label: "Safety", slug: "safety-tips" },
  { label: "Flight Deals", slug: "flight-deals" },
  { label: "Planning", slug: "travel-planning" },
];

export default async function TravelTipsPage() {
  const posts = await safeFetch<PostCardType[]>(postsByCategoryQuery, { categorySlug: "travel-tips" }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-3">Practical Advice</p>
        <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
          Travel Tips & Tricks
        </h1>
      </div>

      {/* Subcategory filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        {SUBCATEGORIES.map((sub) => (
          sub.slug ? (
            <Link key={sub.slug} href={`/travel-tips/${sub.slug}`} className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-full text-sm hover:bg-[var(--color-accent)] hover:text-white transition-colors min-h-[40px] flex items-center">
              {sub.label}
            </Link>
          ) : (
            <span key="all" className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm min-h-[40px] flex items-center font-medium">
              {sub.label}
            </span>
          )
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, i) => <PostCard key={post._id} post={post} priority={i === 0} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-[var(--color-text-muted)]">
          <p>Travel tips coming soon!</p>
        </div>
      )}
    </div>
  );
}

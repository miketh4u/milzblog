import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/sanity/lib/client";
import { postsByCategoryQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/ui/PostCard";
import type { PostCard as PostCardType } from "@/types";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Travel News & Commentary",
  description: "Travel trends, visa policy updates, global travel alerts, and honest travel commentary.",
};

const SUBCATEGORIES = [
  { label: "All News", slug: null },
  { label: "Travel Trends", slug: "travel-trends" },
  { label: "Visa Updates", slug: "visa-updates" },
  { label: "Travel Alerts", slug: "travel-alerts" },
  { label: "Commentary", slug: "commentary" },
];

export default async function TravelNewsPage() {
  const posts = await safeFetch<PostCardType[]>(postsByCategoryQuery, { categorySlug: "travel-news" }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-3">Stay Informed</p>
        <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
          Travel News
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {SUBCATEGORIES.map((sub) => (
          sub.slug ? (
            <Link key={sub.slug} href={`/travel-news/${sub.slug}`} className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-full text-sm hover:bg-[var(--color-accent)] hover:text-white transition-colors min-h-[40px] flex items-center">
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
        <div className="text-center py-24 text-[var(--color-text-muted)]"><p>Travel news coming soon!</p></div>
      )}
    </div>
  );
}

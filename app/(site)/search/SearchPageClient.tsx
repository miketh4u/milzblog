"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";
import { featuredPosts, popularPosts } from "@/lib/home-data";
import type { PostCard } from "@/types";

// Combine all static posts as the search corpus
const allStaticPosts: PostCard[] = [
  ...featuredPosts.map((p) => ({
    _id: p.id,
    title: p.title,
    slug: { _type: "slug" as const, current: p.slug },
    publishedAt: p.date,
    excerpt: p.excerpt,
    featuredImage: undefined,
    category: { _id: p.categorySlug, _type: "category" as const, name: p.category, slug: { _type: "slug" as const, current: p.categorySlug } },
    readingTime: p.readingTime,
  })),
  ...popularPosts.map((p) => ({
    _id: p.id,
    title: p.title,
    slug: { _type: "slug" as const, current: p.slug },
    publishedAt: p.date,
    excerpt: undefined,
    featuredImage: undefined,
    category: { _id: p.category.toLowerCase().replace(/ /g, "-"), _type: "category" as const, name: p.category, slug: { _type: "slug" as const, current: p.category.toLowerCase().replace(/ /g, "-") } },
    readingTime: p.readingTime,
  })),
];

function SearchInner() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1
        className="text-4xl md:text-5xl font-semibold text-[var(--color-primary)] mb-10"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        {q ? `Results for "${q}"` : "Search"}
      </h1>
      <SearchResults posts={allStaticPosts} initialQuery={q} />
    </div>
  );
}

export function SearchPageClient() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-8 w-48 bg-[var(--color-surface)] rounded animate-pulse mb-10" />
        <div className="h-14 bg-[var(--color-surface)] rounded-xl animate-pulse" />
      </div>
    }>
      <SearchInner />
    </Suspense>
  );
}

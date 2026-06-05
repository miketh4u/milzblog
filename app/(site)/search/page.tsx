import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { recentPostsQuery } from "@/sanity/lib/queries";
import { SearchResults } from "./SearchResults";
import type { PostCard as PostCardType } from "@/types";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all travel posts, destinations, and city guides.",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const allPosts = await client.fetch<PostCardType[]>(recentPostsQuery, { limit: 200 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-primary)] mb-10" style={{ fontFamily: "var(--font-cormorant)" }}>
        {q ? `Results for "${q}"` : "Search"}
      </h1>
      <SearchResults posts={allPosts} initialQuery={q || ""} />
    </div>
  );
}

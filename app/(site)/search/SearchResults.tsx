"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { PostCard } from "@/components/ui/PostCard";
import type { PostCard as PostCardType } from "@/types";

interface Props {
  posts: PostCardType[];
  initialQuery: string;
}

export function SearchResults({ posts, initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<PostCardType[]>([]);
  const router = useRouter();

  const fuse = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "excerpt", weight: 0.2 },
      { name: "country.name", weight: 0.2 },
      { name: "city.name", weight: 0.15 },
      { name: "category.name", weight: 0.05 },
    ],
    threshold: 0.3,
  });

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    setResults(fuse.search(query).map((r) => r.item));
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`, { scroll: false });
  };

  return (
    <>
      <form onSubmit={handleSearch} className="relative max-w-2xl mb-12">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, cities, tips..."
          autoFocus
          className="w-full border border-[var(--color-border)] rounded-xl px-5 py-4 pr-14 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] min-h-[56px]"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center" aria-label="Search">
          <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>

      {query && results.length === 0 && (
        <p className="text-[var(--color-text-muted)]">No results for &ldquo;{query}&rdquo;. Try a different search.</p>
      )}

      {results.length > 0 && (
        <>
          <p className="text-sm text-[var(--color-text-muted)] mb-8">{results.length} {results.length === 1 ? "result" : "results"} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {results.map((post, i) => <PostCard key={post._id} post={post} priority={i === 0} />)}
          </div>
        </>
      )}

      {!query && (
        <p className="text-[var(--color-text-muted)]">Type a destination, city, or topic to search.</p>
      )}
    </>
  );
}

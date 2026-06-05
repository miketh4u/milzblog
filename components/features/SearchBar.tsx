"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { PostCard } from "@/types";

interface Props {
  autoFocus?: boolean;
  onClose?: () => void;
}

export function SearchBar({ autoFocus, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch { setResults([]); }
      finally { setLoading(false); }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose?.();
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations, cities, tips..."
          className="w-full border border-[var(--color-border)] rounded-xl px-5 py-3 pr-12 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] min-h-[48px]"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center" aria-label="Search">
          {loading ? (
            <svg className="w-4 h-4 animate-spin text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </form>

      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden z-50">
          {results.slice(0, 6).map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`} onClick={onClose} className="flex items-start gap-3 p-4 hover:bg-[var(--color-surface)] transition-colors border-b border-[var(--color-border)] last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-1">{post.title}</p>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-[var(--color-text-muted)]">
                  {post.category && <span>{post.category.name}</span>}
                  {post.country && <><span>·</span><span>{post.country.name}</span></>}
                  {post.city && <><span>·</span><span>{post.city.name}</span></>}
                </div>
              </div>
            </Link>
          ))}
          {results.length > 6 && (
            <Link href={`/search?q=${encodeURIComponent(query)}`} onClick={onClose} className="block p-4 text-center text-sm text-[var(--color-accent)] hover:bg-[var(--color-surface)] transition-colors">
              See all {results.length} results →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

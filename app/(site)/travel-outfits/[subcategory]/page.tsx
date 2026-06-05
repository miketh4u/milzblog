import type { Metadata } from "next";
import Link from "next/link";
import { safeFetch } from "@/sanity/lib/client";
import { postsBySubcategoryQuery } from "@/sanity/lib/queries";
import { PostCard } from "@/components/ui/PostCard";
import type { PostCard as PostCardType } from "@/types";

export const revalidate = 3600;

interface Props { params: Promise<{ subcategory: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subcategory } = await params;
  const label = subcategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  return { title: `${label} — Travel Outfits` };
}

export default async function TravelOutfitsSubcategoryPage({ params }: Props) {
  const { subcategory } = await params;
  const posts = await safeFetch<PostCardType[]>(postsBySubcategoryQuery, { subcategorySlug: subcategory }, []);
  const label = subcategory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <nav className="flex items-center gap-2 text-[var(--color-text-muted)] text-sm mb-8">
        <Link href="/travel-outfits" className="hover:text-[var(--color-primary)] transition-colors">Travel Outfits</Link>
        <span>/</span>
        <span className="text-[var(--color-text-primary)]">{label}</span>
      </nav>
      <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-primary)] mb-10" style={{ fontFamily: "var(--font-cormorant)" }}>
        {label}
      </h1>
      {posts.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {posts.map((post, i) => <PostCard key={post._id} post={post} variant="featured" priority={i === 0} />)}
        </div>
      ) : (
        <div className="text-center py-24 text-[var(--color-text-muted)]"><p>No posts yet.</p></div>
      )}
    </div>
  );
}

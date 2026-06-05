import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatDateShort } from "@/lib/utils";
import { CategoryBadge } from "./CategoryBadge";
import type { PostCard as PostCardType } from "@/types";

interface Props {
  post: PostCardType;
  variant?: "default" | "featured" | "horizontal";
  priority?: boolean;
}

export function PostCard({ post, variant = "default", priority = false }: Props) {
  const imageUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(800).height(533).fit("crop").auto("format").url()
    : null;

  if (variant === "horizontal") {
    return (
      <Link href={`/blog/${post.slug.current}`} className="group flex gap-4 items-start">
        {imageUrl && (
          <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
            <Image src={imageUrl} alt={post.featuredImage?.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="96px" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">{formatDateShort(post.publishedAt)}</p>
          <h3 className="text-sm font-semibold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-cormorant)" }}>
            {post.title}
          </h3>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/blog/${post.slug.current}`} className="group block relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-[3/4]">
        {imageUrl ? (
          <Image src={imageUrl} alt={post.featuredImage?.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" priority={priority} />
        ) : (
          <div className="absolute inset-0 bg-[var(--color-surface)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          {post.category && <CategoryBadge category={post.category} linkable={false} className="mb-3" />}
          <h2 className="text-white text-xl md:text-2xl font-semibold leading-snug" style={{ fontFamily: "var(--font-cormorant)" }}>
            {post.title}
          </h2>
          <p className="text-white/70 text-xs mt-2">{post.readingTime ? `${post.readingTime} min read` : formatDateShort(post.publishedAt)}</p>
        </div>
      </Link>
    );
  }

  return (
    <article className="group">
      <Link href={`/blog/${post.slug.current}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden rounded-xl mb-4">
          {imageUrl ? (
            <Image src={imageUrl} alt={post.featuredImage?.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 375px) 100vw, (max-width: 768px) 50vw, 33vw" priority={priority} />
          ) : (
            <div className="absolute inset-0 bg-[var(--color-surface)]" />
          )}
          {post.isSponsored && (
            <span className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider">
              Sponsored
            </span>
          )}
        </div>
        <div>
          {post.category && <CategoryBadge category={post.category} linkable={false} className="mb-2" />}
          <h3 className="text-lg font-semibold leading-snug text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>
            {post.title}
          </h3>
          {post.excerpt && <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-2">{post.excerpt}</p>}
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <span>{formatDateShort(post.publishedAt)}</span>
            {post.readingTime && <span>· {post.readingTime} min read</span>}
            {post.country && <span>· {post.country.name}</span>}
          </div>
        </div>
      </Link>
    </article>
  );
}

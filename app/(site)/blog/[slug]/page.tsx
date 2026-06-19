import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { safeFetch } from "@/sanity/lib/client";
import { postBySlugQuery, relatedPostsQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/components/blocks/PortableTextComponents";
import { SponsoredBanner } from "@/components/ui/SponsoredBanner";
import { RelatedPosts } from "@/components/ui/RelatedPosts";
import { NewsletterInline } from "@/components/ui/NewsletterInline";
import { SocialShareBar } from "@/components/ui/SocialShareBar";
import { generatePostMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { Post, PostCard } from "@/types";

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await safeFetch<Post | null>(postBySlugQuery, { slug }, null);
  if (!post) return {};
  return generatePostMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await safeFetch<Post | null>(postBySlugQuery, { slug }, null);
  if (!post) notFound();

  const relatedPosts = await safeFetch<PostCard[]>(relatedPostsQuery, {
    slug: post.slug.current,
    countryId: post.country?._id || "",
    categoryId: post.category?._id || "",
  }, []);

  const heroUrl = post.featuredImage
    ? urlFor(post.featuredImage).width(1600).height(900).fit("crop").auto("format").url()
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://milzonthemove.com";
  const postUrl = `${siteUrl}/blog/${post.slug.current}`;

  return (
    <>
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] bg-[var(--color-primary)] overflow-hidden">
        {heroUrl && (
          <Image src={heroUrl} alt={post.featuredImage?.alt || post.title} fill className="object-cover" priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
            {post.category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-accent)] text-white mb-4 uppercase tracking-wide">
                {post.category.name}
              </span>
            )}
            <h1 className="text-3xl md:text-5xl font-semibold text-white leading-snug mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/70 text-sm">
              <span>{formatDate(post.publishedAt)}</span>
              {post.readingTime && <><span>·</span><span>{post.readingTime} min read</span></>}
              {post.country && (
                <>
                  <span>·</span>
                  <Link
                    href={`/destinations/${post.country.slug.current}`}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {post.country.name}
                  </Link>
                </>
              )}
              {post.city && post.country && (
                <>
                  <span>·</span>
                  <Link
                    href={`/destinations/${post.country.slug.current}/${post.city.slug.current}`}
                    className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    {post.city.name}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {post.isSponsored && <SponsoredBanner />}

        {post.excerpt && (
          <p className="text-lg md:text-xl text-[var(--color-text-muted)] leading-relaxed mb-8 font-light">
            {post.excerpt}
          </p>
        )}

        {post.body && (
          <div className="prose-drop-cap article-body">
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        <NewsletterInline title="Enjoying this post?" description="Get more destination guides and travel inspiration in your inbox." />

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-[var(--color-border)]">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-[var(--color-surface)] text-[var(--color-text-muted)] rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <RelatedPosts posts={relatedPosts} />
      </div>

      <SocialShareBar url={postUrl} title={post.title} imageUrl={heroUrl || ""} />
    </>
  );
}

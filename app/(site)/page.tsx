import Image from "next/image";
import Link from "next/link";
import { NewsletterInline } from "@/components/ui/NewsletterInline";
import { safeFetch } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  featuredPostsQuery,
  popularPostsQuery,
  topCountriesQuery,
} from "@/sanity/lib/queries";
import { formatDateShort } from "@/lib/utils";
import type { PostCard, Country } from "@/types";
import {
  featuredPosts as featuredFallback,
  destinations as destinationsFallback,
  tripTypes,
  popularPosts as popularFallback,
  instagramPosts,
} from "@/lib/home-data";

export const revalidate = 3600;

type SanityCountryCard = Pick<Country, "_id" | "name" | "slug" | "heroImage"> & {
  postCount: number;
};

function mapPostCard(post: PostCard) {
  const image = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(900).fit("crop").auto("format").url()
    : "";
  return {
    id: post._id,
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt ?? "",
    image,
    imageAlt: post.featuredImage?.alt || post.title,
    category: post.category?.name ?? "",
    categorySlug: post.category?.slug.current ?? "",
    date: formatDateShort(post.publishedAt),
    readingTime: post.readingTime ?? 0,
    location: post.city?.name || post.country?.name || "",
  };
}

function mapCountryCard(country: SanityCountryCard) {
  const image = country.heroImage
    ? urlFor(country.heroImage).width(800).height(1200).fit("crop").auto("format").url()
    : "";
  return {
    id: country._id,
    name: country.name,
    slug: country.slug.current,
    image,
    imageAlt: country.heroImage?.alt || country.name,
    postCount: country.postCount,
  };
}

export default async function HomePage() {
  const [sanityFeatured, sanityPopular, sanityCountries] = await Promise.all([
    safeFetch<PostCard[]>(featuredPostsQuery, {}, []),
    safeFetch<PostCard[]>(popularPostsQuery, {}, []),
    safeFetch<SanityCountryCard[]>(topCountriesQuery, {}, []),
  ]);

  const featuredPosts =
    sanityFeatured.length >= 3 ? sanityFeatured.slice(0, 3).map(mapPostCard) : featuredFallback;
  const popularPosts =
    sanityPopular.length >= 3 ? sanityPopular.slice(0, 3).map(mapPostCard) : popularFallback;
  const destinations =
    sanityCountries.length >= 4 ? sanityCountries.map(mapCountryCard) : destinationsFallback;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] md:min-h-screen flex items-end overflow-hidden">
        <Image
          src="/images/home/travel-blog-homepage-hero.png"
          alt="Stylized illustration of rolling tan and green hills under a cream sky with a sun and flock of birds"
          fill
          className="object-cover object-bottom"
          priority
          sizes="100vw"
        />
        {/* gradient overlay — darken the bottom for copy legibility, leave sky/sun clear at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a0e]/85 via-[#2c1a0e]/35 to-transparent" />

        {/* content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-24">
          <div className="max-w-xl">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center bg-[var(--color-accent)] text-white font-semibold px-6 py-3.5 rounded-full hover:bg-amber-600 transition-colors min-h-[48px] text-sm"
              >
                Explore Destinations
              </Link>
              <Link
                href="/start-here"
                className="inline-flex items-center justify-center border border-white/50 text-white font-semibold px-6 py-3.5 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm min-h-[48px] text-sm"
              >
                Start Here
              </Link>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-white/50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* ─── FEATURED POSTS ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-[var(--color-accent)] text-[11px] font-semibold uppercase tracking-[0.25em] mb-2">
              From the Blog
            </p>
            <h2
              className="text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[var(--color-primary)] leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Featured Stories
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            View all
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* mobile: stacked; md: first card large left + 2 stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Large featured card */}
          <Link
            href={`/blog/${featuredPosts[0].slug}`}
            className="group relative overflow-hidden rounded-2xl aspect-[4/5] md:row-span-2"
          >
            <Image
              src={featuredPosts[0].image}
              alt={featuredPosts[0].imageAlt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[var(--color-accent)] text-white uppercase tracking-wide mb-3">
                {featuredPosts[0].category}
              </span>
              <h3
                className="text-white text-2xl md:text-3xl font-semibold leading-snug mb-2"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {featuredPosts[0].title}
              </h3>
              <p className="text-white/65 text-sm line-clamp-2 mb-3">
                {featuredPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-2 text-white/50 text-xs">
                <span>{featuredPosts[0].date}</span>
                <span>·</span>
                <span>{featuredPosts[0].readingTime} min read</span>
                <span>·</span>
                <span>{featuredPosts[0].location}</span>
              </div>
            </div>
          </Link>

          {/* Two smaller cards */}
          {featuredPosts.slice(1).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[16/10] md:aspect-[16/9]"
            >
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--color-accent)] text-white uppercase tracking-wide mb-2">
                  {post.category}
                </span>
                <h3
                  className="text-white text-lg md:text-xl font-semibold leading-snug mb-1"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 text-white/50 text-xs">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)]"
          >
            View all posts
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── DESTINATIONS ─────────────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-14 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <div>
              <p className="text-[var(--color-accent)] text-[11px] font-semibold uppercase tracking-[0.25em] mb-2">
                Where to Next
              </p>
              <h2
                className="text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[var(--color-primary)] leading-tight"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Destinations
              </h2>
            </div>
            <Link
              href="/destinations"
              className="hidden md:inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              View all
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {destinations.map((dest, i) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[2/3]"
              >
                <Image
                  src={dest.image}
                  alt={dest.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 375px) 50vw, (max-width: 768px) 50vw, 25vw"
                  priority={i < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3
                    className="text-white text-xl md:text-2xl font-semibold leading-tight"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {dest.name}
                  </h3>
                  <p className="text-white/60 text-xs mt-0.5">
                    {dest.postCount} posts
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRIP TYPES (Bucket List Tiles) ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[var(--color-accent)] text-[11px] font-semibold uppercase tracking-[0.25em] mb-2">
            Plan Your Trip
          </p>
          <h2
            className="text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[var(--color-primary)]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            How Do You Travel?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {tripTypes.map((type) => (
            <Link
              key={type.label}
              href={`/${type.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
            >
              <Image
                src={type.image}
                alt={type.imageAlt}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 375px) 50vw, (max-width: 768px) 50vw, 25vw"
              />
              {/* dark scrim */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              {/* bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                <h3
                  className="text-white text-xl md:text-2xl font-semibold leading-tight mb-1"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {type.label}
                </h3>
                <p className="text-white/65 text-xs leading-snug line-clamp-2">
                  {type.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--color-primary)] py-16 md:py-24 px-4">
        {/* decorative blob */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: "var(--color-accent)" }}
        />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <p className="text-[var(--color-accent)] text-[11px] font-semibold uppercase tracking-[0.25em] mb-3">
            Stay Inspired
          </p>
          <h2
            className="text-[clamp(2rem,5vw,3rem)] font-semibold text-white mb-3 leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Travel Inspiration, Weekly
          </h2>
          <p className="text-white/60 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            New destination guides, packing lists, and outfit inspo — straight
            to your inbox. No spam, ever.
          </p>
          <NewsletterInline
            variant="inline"
            title=""
            description=""
          />
          <p className="text-white/30 text-xs mt-4">
            Join 10,000+ travellers already subscribed.
          </p>
        </div>
      </section>

      {/* ─── POPULAR POSTS ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="flex items-end justify-between mb-8 md:mb-12">
          <div>
            <p className="text-[var(--color-accent)] text-[11px] font-semibold uppercase tracking-[0.25em] mb-2">
              Reader Favourites
            </p>
            <h2
              className="text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[var(--color-primary)] leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Popular Posts
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {popularPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="relative overflow-hidden rounded-2xl aspect-[3/2] mb-4">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 375px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 uppercase tracking-wide mb-2">
                {post.category}
              </span>
              <h3
                className="text-base md:text-lg font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors leading-snug mb-1"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {post.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── ABOUT TEASER ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 md:pb-24">
        <div className="overflow-hidden rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto min-h-[340px] order-first">
              <Image
                src="/images/home/496203215_18510381712060997_6289600525720896324_n.jpg"
                alt="Smiling in a green leather dress at a tropical restaurant"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p className="text-[var(--color-accent)] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
                Hello, I&apos;m Milz
              </p>
              <h2
                className="text-[clamp(2rem,4vw,2.75rem)] font-semibold text-[var(--color-primary)] leading-tight mb-5"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                The Story Behind the Blog
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-sm mb-4">
                I started this blog because I kept getting asked the same questions: <em>How do you afford it? Where should I go? What do you wear?</em> This is the place I send people now.
              </p>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-sm mb-8">
                Real stories. Honest advice. Bold outfits. From Zanzibar to the Nevada desert — I document it all so you can travel smarter, fuller, and more stylishly.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors text-sm"
              >
                Read my story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM STRIP ──────────────────────────────────────────────── */}
      <section className="border-t border-[var(--color-border)] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
              <span className="text-sm font-semibold text-[var(--color-text-primary)]">
                @milzOnTheMove
              </span>
            </div>
            <a
              href="https://www.instagram.com/the_milz_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              Follow on Instagram →
            </a>
          </div>

          {/* 6-col scrollable strip on mobile, grid on desktop */}
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:overflow-visible md:grid md:grid-cols-6 scrollbar-none">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex-shrink-0 w-[140px] md:w-auto overflow-hidden rounded-xl aspect-square"
              >
                <Image
                  src={post.image}
                  alt={post.alt}
                  fill
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 140px, 16vw"
                />
                {/* hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

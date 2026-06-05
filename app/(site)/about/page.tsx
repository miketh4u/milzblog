import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterInline } from "@/components/ui/NewsletterInline";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind the blog — who I am, where I've been, and why I started writing about travel.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-4">About</p>
        <h1 className="text-5xl md:text-6xl font-semibold text-[var(--color-primary)] leading-none mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
          The Story Behind<br />the Blog
        </h1>
      </div>

      {/* Hero image placeholder */}
      <div className="relative aspect-[16/9] bg-gradient-to-br from-amber-800 to-stone-700 rounded-3xl mb-12 overflow-hidden">
        <div className="absolute inset-0 flex items-end p-8">
          <p className="text-white/60 text-sm italic">Your photo here</p>
        </div>
      </div>

      <div className="article-body space-y-6 text-base leading-relaxed text-[var(--color-text-primary)]">
        <p className="text-xl text-[var(--color-text-muted)] leading-relaxed">
          Travel changed my life in the most clichéd way possible — and I&rsquo;m not remotely sorry about it.
        </p>
        <p>
          I started this blog because I kept getting asked the same questions: <em>How do you afford it? Where should I go? What should I pack?</em> This is the place I send people now. Real answers, real stories, no fluff.
        </p>
        <p>
          I&rsquo;ve solo-travelled through Southeast Asia, island-hopped in Greece, road-tripped across Morocco, and somehow convinced my partner that a 3-week camping trip through Patagonia was a good idea. (It was.)
        </p>
        <p>
          This blog covers all of it — destination guides, practical travel tips, outfit inspiration, and honest takes on the travel industry. I write the posts I wish I&rsquo;d found before my first big solo trip.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link href="/work-with-me" className="inline-flex items-center bg-[var(--color-primary)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--color-accent-2)] transition-colors min-h-[48px]">
          Work With Me
        </Link>
        <Link href="/contact" className="inline-flex items-center border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold px-6 py-3 rounded-full hover:bg-[var(--color-surface)] transition-colors min-h-[48px]">
          Get in Touch
        </Link>
      </div>

      <div className="mt-16">
        <NewsletterInline title="Travel with me every week" description="New destination guides and travel tips straight to your inbox. No spam, ever." />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work With Me",
  description: "Brand partnerships, sponsored content, and media kit — let's collaborate.",
};

const SERVICES = [
  { title: "Sponsored Posts", description: "Long-form destination or product guides with authentic storytelling and full SEO optimization." },
  { title: "Social Media Integration", description: "Instagram Reels, TikToks, and Stories featuring your destination, product, or experience." },
  { title: "Newsletter Features", description: "Dedicated or integrated mentions to thousands of engaged travel subscribers." },
  { title: "Photography & Content Creation", description: "High-quality travel photography and video content for your brand's use." },
];

export default function WorkWithMePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-16">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-4">Partnerships</p>
        <h1 className="text-5xl md:text-6xl font-semibold text-[var(--color-primary)] leading-none mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
          Work With Me
        </h1>
        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl">
          I partner with travel brands, tourism boards, hotels, and lifestyle companies to create authentic content that resonates with a highly engaged travel audience.
        </p>
      </div>

      {/* Audience stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { stat: "40+", label: "Countries Visited" },
          { stat: "50K+", label: "Monthly Readers" },
          { stat: "25K+", label: "Instagram Followers" },
          { stat: "10K+", label: "Newsletter Subscribers" },
        ].map((s) => (
          <div key={s.label} className="bg-[var(--color-surface)] rounded-2xl p-5 text-center">
            <p className="text-3xl md:text-4xl font-semibold text-[var(--color-accent)] mb-1" style={{ fontFamily: "var(--font-cormorant)" }}>{s.stat}</p>
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-8" style={{ fontFamily: "var(--font-cormorant)" }}>
          What I Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div key={s.title} className="border border-[var(--color-border)] rounded-2xl p-6">
              <h3 className="font-semibold text-[var(--color-primary)] text-lg mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>{s.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[var(--color-primary)] rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
          Ready to Collaborate?
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          I&rsquo;d love to hear about your brand and explore how we can work together.
        </p>
        <Link href="/contact" className="inline-flex items-center bg-[var(--color-accent)] text-white font-semibold px-8 py-4 rounded-full hover:bg-amber-600 transition-colors min-h-[48px]">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

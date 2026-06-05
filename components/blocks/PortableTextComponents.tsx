import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { VideoEmbed } from "./VideoEmbed";
import { PullQuote } from "./PullQuote";
import { AffiliateWidget } from "../ui/AffiliateWidget";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const imageUrl = urlFor(value).width(1200).auto("format").url();
      return (
        <figure className="my-8 group relative">
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl">
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              data-pin-description={value.alt || value.caption || ""}
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-[var(--color-text-muted)] mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    pullQuote: ({ value }) => <PullQuote text={value.text} />,
    videoEmbed: ({ value }) => <VideoEmbed videoId={value.videoId} caption={value.caption} />,
    affiliateWidget: ({ value }) => (
      <AffiliateWidget product={{ _key: "", productName: value.productName, url: value.url, image: value.image, price: value.price }} />
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mt-10 mb-4 scroll-mt-24" style={{ fontFamily: "var(--font-cormorant)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-semibold text-[var(--color-primary)] mt-8 mb-3 scroll-mt-24" style={{ fontFamily: "var(--font-cormorant)" }}>
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-accent)] pl-5 italic text-[var(--color-text-muted)] my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-[var(--color-text-primary)] mb-5">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target={value?.blank ? "_blank" : undefined} rel={value?.blank ? "noopener noreferrer" : undefined} className="text-[var(--color-accent)] underline underline-offset-2 hover:text-[var(--color-accent-2)] transition-colors">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-5 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-5 space-y-2">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed text-[var(--color-text-primary)]">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed text-[var(--color-text-primary)]">{children}</li>,
  },
};

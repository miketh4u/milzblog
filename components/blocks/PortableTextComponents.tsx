import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { VideoEmbed } from "./VideoEmbed";
import { PullQuote } from "./PullQuote";
import { AffiliateWidget } from "../ui/AffiliateWidget";

type SanityImageValue = {
  asset?: { _ref?: string };
  alt?: string;
  caption?: string;
  crop?: { top?: number; bottom?: number; left?: number; right?: number };
};

function getDisplayDimensions(value: SanityImageValue): { width: number; height: number } | null {
  const ref = value?.asset?._ref;
  if (!ref) return null;
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (!match) return null;
  let width = parseInt(match[1], 10);
  let height = parseInt(match[2], 10);
  const crop = value.crop;
  if (crop) {
    width = width * (1 - (crop.left ?? 0) - (crop.right ?? 0));
    height = height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0));
  }
  return { width: Math.round(width), height: Math.round(height) };
}

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const dims = getDisplayDimensions(value);
      const imageUrl = urlFor(value).width(1600).auto("format").url();
      return (
        <figure className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ""}
            width={dims?.width ?? 1600}
            height={dims?.height ?? 1067}
            className="w-full h-auto rounded-xl"
            sizes="(max-width: 768px) 100vw, 800px"
            data-pin-description={value.alt || value.caption || ""}
          />
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

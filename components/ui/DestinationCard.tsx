import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { Country } from "@/types";

interface Props {
  country: Country & { postCount?: number };
  priority?: boolean;
}

export function DestinationCard({ country, priority = false }: Props) {
  const imageUrl = country.heroImage
    ? urlFor(country.heroImage).width(600).height(800).fit("crop").auto("format").url()
    : null;

  return (
    <Link href={`/destinations/${country.slug.current}`} className="group block relative overflow-hidden rounded-2xl aspect-[2/3]">
      {imageUrl ? (
        <Image src={imageUrl} alt={country.heroImage?.alt || country.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 375px) 100vw, (max-width: 768px) 50vw, 25vw" priority={priority} />
      ) : (
        <div className="absolute inset-0 bg-[var(--color-surface)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="text-white text-2xl font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
          {country.name}
        </h3>
        {country.postCount !== undefined && (
          <p className="text-white/70 text-xs mt-1">{country.postCount} {country.postCount === 1 ? "post" : "posts"}</p>
        )}
      </div>
    </Link>
  );
}

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { AffiliateLink } from "@/types";

interface Props {
  product: AffiliateLink;
}

export function AffiliateWidget({ product }: Props) {
  const imageUrl = product.image
    ? urlFor(product.image).width(200).height(200).fit("crop").auto("format").url()
    : null;

  return (
    <div className="flex items-center gap-4 border border-[var(--color-border)] rounded-xl p-4 my-4 bg-[var(--color-surface)]">
      {imageUrl && (
        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={product.productName} fill className="object-cover" sizes="80px" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-[var(--color-text-primary)] text-sm">{product.productName}</p>
        {product.price && <p className="text-[var(--color-accent)] font-medium text-sm mt-0.5">{product.price}</p>}
        <p className="text-[10px] text-[var(--color-text-muted)] mt-1">*Affiliate link — I may earn a small commission.</p>
      </div>
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="shrink-0 bg-[var(--color-accent)] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors min-h-[48px] flex items-center"
      >
        Shop Now
      </a>
    </div>
  );
}

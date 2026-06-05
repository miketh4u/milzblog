import Link from "next/link";
import type { Category } from "@/types";

const categoryColors: Record<string, string> = {
  destinations: "bg-amber-100 text-amber-800",
  "travel-tips": "bg-emerald-100 text-emerald-800",
  "travel-news": "bg-sky-100 text-sky-800",
  "travel-outfits": "bg-rose-100 text-rose-800",
};

interface Props {
  category: Pick<Category, "name" | "slug">;
  linkable?: boolean;
  className?: string;
}

export function CategoryBadge({ category, linkable = true, className = "" }: Props) {
  const colorClass = categoryColors[category.slug.current] || "bg-amber-100 text-amber-800";
  const base = `inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${colorClass} ${className}`;

  if (linkable) {
    return (
      <Link href={`/${category.slug.current}`} className={base}>
        {category.name}
      </Link>
    );
  }
  return <span className={base}>{category.name}</span>;
}

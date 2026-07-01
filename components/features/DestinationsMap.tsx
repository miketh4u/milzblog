"use client";

import dynamic from "next/dynamic";
import type { MapCountry } from "./DestinationsMapInner";

const DestinationsMapInner = dynamic(() => import("./DestinationsMapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-[980/520] flex items-center justify-center text-[var(--color-text-muted)] text-sm">
      Loading map…
    </div>
  ),
});

export function DestinationsMap({
  countries,
  className,
}: {
  countries: MapCountry[];
  className?: string;
}) {
  if (countries.length === 0) return null;
  return <DestinationsMapInner countries={countries} className={className} />;
}

export type { MapCountry };

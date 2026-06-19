import type { Metadata } from "next";
import { safeFetch } from "@/sanity/lib/client";
import { allCountriesQuery, mapCountriesQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { DestinationCard } from "@/components/ui/DestinationCard";
import { DestinationsMap, type MapCountry } from "@/components/features/DestinationsMap";
import type { Country, SanityImage } from "@/types";

type MapCountryRaw = Omit<MapCountry, "heroUrl"> & { heroImage?: SanityImage };

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore travel guides and stories from countries around the world.",
};

const REGIONS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Middle East"];

export default async function DestinationsPage() {
  const [countries, mapCountriesRaw] = await Promise.all([
    safeFetch<(Country & { postCount: number })[]>(allCountriesQuery, {}, []),
    safeFetch<MapCountryRaw[]>(mapCountriesQuery, {}, []),
  ]);

  const mapCountries: MapCountry[] = mapCountriesRaw.map(({ heroImage, ...rest }) => ({
    ...rest,
    heroUrl: heroImage
      ? urlFor(heroImage).width(96).height(96).fit("crop").auto("format").url()
      : null,
  }));

  const regionGroups = REGIONS.map((region) => ({
    region,
    countries: countries.filter((c) => c.region === region),
  })).filter((g) => g.countries.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-3">Explore the World</p>
        <h1 className="text-4xl md:text-6xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
          Destinations
        </h1>
        <p className="text-[var(--color-text-muted)] mt-4 max-w-md mx-auto text-sm">
          Every country tells a different story. Find yours.
        </p>
      </div>

      {/* Interactive map */}
      {mapCountries.length > 0 && (
        <div className="mb-16">
          <DestinationsMap
            countries={mapCountries}
            className="w-full h-[380px] md:h-[520px] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm"
          />
          <p className="text-center text-[var(--color-text-muted)] text-xs mt-3">
            Tap a pin to open the country page.
          </p>
        </div>
      )}

      {/* Region groups */}
      {regionGroups.map(({ region, countries: regionCountries }) => (
        <section key={region} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] mb-6 pb-3 border-b border-[var(--color-border)]" style={{ fontFamily: "var(--font-cormorant)" }}>
            {region}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {regionCountries.map((country, i) => (
              <DestinationCard key={country._id} country={country} priority={i === 0} />
            ))}
          </div>
        </section>
      ))}

      {countries.length === 0 && (
        <div className="text-center py-24 text-[var(--color-text-muted)]">
          <p className="text-lg">No destinations added yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

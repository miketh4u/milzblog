"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

export type MapCountry = {
  _id: string;
  name: string;
  slug: { current: string };
  postCount: number;
  mapCoordinates: { lat: number; lng: number };
};

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function DestinationsMapInner({
  countries,
  className,
}: {
  countries: MapCountry[];
  className?: string;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<MapCountry | null>(null);

  return (
    <div className={`${className ?? ""} relative bg-[#f7efe1]`}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 175, center: [10, 10] }}
        width={980}
        height={520}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#ead9bd"
                stroke="#d4bf9b"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#e0cba5" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {countries.map((country) => (
          <Marker
            key={country._id}
            coordinates={[country.mapCoordinates.lng, country.mapCoordinates.lat]}
            onClick={() => router.push(`/destinations/${country.slug.current}`)}
            onMouseEnter={() => setHovered(country)}
            onMouseLeave={() => setHovered(null)}
            style={{
              default: { cursor: "pointer" },
              hover: { cursor: "pointer" },
              pressed: { cursor: "pointer" },
            }}
          >
            <circle
              r={8}
              fill="var(--color-accent, #c2410c)"
              fillOpacity={0.2}
            />
            <circle
              r={4.5}
              fill="var(--color-accent, #c2410c)"
              stroke="#fff"
              strokeWidth={1.5}
            />
          </Marker>
        ))}
      </ComposableMap>

      {hovered && (
        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-4 bg-[var(--color-primary)] text-white px-4 py-2 rounded-full text-xs shadow-lg whitespace-nowrap">
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 14 }}>
            {hovered.name}
          </span>
          <span className="text-white/60 ml-2">
            {hovered.postCount} {hovered.postCount === 1 ? "post" : "posts"}
          </span>
        </div>
      )}
    </div>
  );
}

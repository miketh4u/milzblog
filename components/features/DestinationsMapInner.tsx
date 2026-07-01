"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

export type MapCountry = {
  _id: string;
  name: string;
  slug: { current: string };
  postCount: number;
  mapCoordinates: { lat: number; lng: number };
  heroUrl?: string | null;
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
  const containerRef = useRef<HTMLDivElement>(null);
  // Markers live in SVG viewBox units and shrink with the map on small
  // screens; counter-scale them so they keep a constant on-screen size.
  const [markerScale, setMarkerScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setMarkerScale(Math.min(2.2, Math.max(0.9, 980 / w)));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`${className ?? ""} relative`}>
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 175, center: [10, 10] }}
        width={980}
        height={520}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#d4b885"
                stroke="#b89a66"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#c9a96b" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
        {countries.map((country) => {
          const clipId = `map-clip-${country._id}`;
          const radius = 20;
          const innerRadius = radius - 2;
          return (
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
              <g transform={`scale(${markerScale})`}>
                <defs>
                  <clipPath id={clipId}>
                    <circle r={innerRadius} />
                  </clipPath>
                </defs>
                {/* outer ring + shadow */}
                <circle
                  r={radius}
                  fill="#fff"
                  stroke="var(--color-accent, #c2410c)"
                  strokeWidth={2}
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))" }}
                />
                {country.heroUrl ? (
                  <image
                    href={country.heroUrl}
                    x={-innerRadius}
                    y={-innerRadius}
                    width={innerRadius * 2}
                    height={innerRadius * 2}
                    clipPath={`url(#${clipId})`}
                    preserveAspectRatio="xMidYMid slice"
                  />
                ) : (
                  <circle r={innerRadius} fill="var(--color-accent, #c2410c)" />
                )}
              </g>
            </Marker>
          );
        })}
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

"use client";

import { useRouter } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapCountry = {
  _id: string;
  name: string;
  slug: { current: string };
  postCount: number;
  mapCoordinates: { lat: number; lng: number };
};

const pinIcon = L.divIcon({
  className: "destinations-map-pin",
  html: `<span class="destinations-map-pin__dot"></span><span class="destinations-map-pin__pulse"></span>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  popupAnchor: [0, -10],
});

export default function DestinationsMapInner({
  countries,
  className,
}: {
  countries: MapCountry[];
  className?: string;
}) {
  const router = useRouter();

  return (
    <div className={className}>
      <style jsx global>{`
        .destinations-map-pin {
          background: transparent;
          border: none;
          position: relative;
        }
        .destinations-map-pin__dot {
          position: absolute;
          inset: 4px;
          background: var(--color-accent, #c2410c);
          border: 2px solid #fff;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
          transition: transform 0.2s ease;
        }
        .destinations-map-pin__pulse {
          position: absolute;
          inset: 0;
          background: var(--color-accent, #c2410c);
          opacity: 0.25;
          border-radius: 9999px;
          animation: destinations-map-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .destinations-map-pin:hover .destinations-map-pin__dot {
          transform: scale(1.25);
        }
        @keyframes destinations-map-ping {
          0% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          80%,
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .leaflet-container {
          font-family: var(--font-inter), system-ui, sans-serif;
          background: #eadfce;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 4px 6px;
        }
        .leaflet-popup-content {
          margin: 10px 14px;
          font-size: 13px;
        }
      `}</style>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        scrollWheelZoom={false}
        worldCopyJump
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {countries.map((country) => (
          <Marker
            key={country._id}
            position={[country.mapCoordinates.lat, country.mapCoordinates.lng]}
            icon={pinIcon}
            eventHandlers={{
              click: () => router.push(`/destinations/${country.slug.current}`),
            }}
          >
            <Popup>
              <strong style={{ fontFamily: "var(--font-cormorant)", fontSize: 16 }}>
                {country.name}
              </strong>
              <div style={{ color: "#6b5b4d", marginTop: 2 }}>
                {country.postCount} {country.postCount === 1 ? "post" : "posts"}
              </div>
              <a
                href={`/destinations/${country.slug.current}`}
                style={{
                  display: "inline-block",
                  marginTop: 6,
                  color: "var(--color-accent, #c2410c)",
                  fontWeight: 600,
                }}
              >
                View posts →
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

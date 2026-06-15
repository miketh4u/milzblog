import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links | milzblog",
  description: "All my links in one place.",
};

const LINKS = [
  { label: "✈️  Latest Travel Posts", href: "/blog", primary: true },
  { label: "🗺️  Destination Guides", href: "/destinations", primary: false },
  { label: "👗  Travel Outfits", href: "/travel-outfits", primary: false },
  { label: "📝  Travel Tips", href: "/travel-tips", primary: false },
  { label: "💼  Work With Me", href: "/work-with-me", primary: false },
];

export default function LinksPage() {
  return (
    <div style={{ margin: 0, padding: 0, background: "#faf6f1", fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "480px", padding: "32px 16px" }}>
        {/* Profile */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#2c1a0e", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#c8922a", fontSize: "32px", fontWeight: 700 }}>m</span>
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "24px", color: "#2c1a0e", margin: "0 0 6px" }}>milzblog</h1>
          <p style={{ color: "#7a6a5a", fontSize: "14px", margin: 0 }}>Luxury travel stories from around the world</p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 24px",
                borderRadius: "14px",
                minHeight: "56px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "15px",
                background: link.primary ? "#2c1a0e" : "#f0e8dc",
                color: link.primary ? "#ffffff" : "#2c1a0e",
                border: `1px solid ${link.primary ? "transparent" : "#e0d4c4"}`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#7a6a5a", fontSize: "12px", marginTop: "24px" }}>
          <Link href="/" style={{ color: "#7a6a5a" }}>milzblog.com</Link>
        </p>
      </div>
    </div>
  );
}

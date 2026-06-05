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
  { label: "📧  Join the Newsletter", href: "#newsletter", primary: false },
  { label: "💼  Work With Me", href: "/work-with-me", primary: false },
];

export default function LinksPage() {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#faf6f1", fontFamily: "system-ui, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
              <a
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
                  transition: "opacity 0.15s",
                  background: link.primary ? "#2c1a0e" : "#f0e8dc",
                  color: link.primary ? "#ffffff" : "#2c1a0e",
                  border: `1px solid ${link.primary ? "transparent" : "#e0d4c4"}`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Newsletter form */}
          <div id="newsletter" style={{ marginTop: "32px", background: "#f0e8dc", borderRadius: "16px", padding: "20px", border: "1px solid #e0d4c4" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "18px", color: "#2c1a0e", fontWeight: 600, margin: "0 0 6px" }}>Join the Newsletter</p>
            <p style={{ fontSize: "13px", color: "#7a6a5a", margin: "0 0 16px" }}>Weekly travel inspiration, no spam.</p>
            <form action="/api/newsletter" method="POST" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input type="email" name="email" placeholder="your@email.com" required style={{ flex: 1, minWidth: "180px", padding: "12px 16px", borderRadius: "10px", border: "1px solid #e0d4c4", fontSize: "14px", background: "#fff", minHeight: "48px" }} />
              <button type="submit" style={{ padding: "12px 20px", background: "#c8922a", color: "#fff", border: "none", borderRadius: "10px", fontWeight: 600, fontSize: "14px", minHeight: "48px", cursor: "pointer" }}>Subscribe</button>
            </form>
          </div>

          <p style={{ textAlign: "center", color: "#7a6a5a", fontSize: "12px", marginTop: "24px" }}>
            <a href="/" style={{ color: "#7a6a5a" }}>milzblog.com</a>
          </p>
        </div>
      </body>
    </html>
  );
}

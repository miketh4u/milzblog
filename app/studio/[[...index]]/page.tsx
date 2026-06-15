export function generateStaticParams() {
  return [{ index: [] }];
}

export default function StudioPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", background: "#faf6f1" }}>
      <h1 style={{ fontSize: "1.5rem", color: "#2c1a0e", marginBottom: "0.5rem" }}>Sanity Studio</h1>
      <p style={{ color: "#7a6a5a", marginBottom: "1.5rem", fontSize: "0.875rem" }}>
        The CMS studio is not available on static hosting.
      </p>
      <a
        href="https://www.sanity.io/manage"
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: "#c8922a", color: "#fff", padding: "0.75rem 1.5rem", borderRadius: "9999px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}
      >
        Open Sanity.io →
      </a>
    </div>
  );
}

export function Monogram({ size = 44 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center shrink-0 rounded-full bg-[var(--color-accent)] text-white font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.45, fontFamily: "var(--font-cormorant)" }}
    >
      M
    </span>
  );
}

export function AuthorBio() {
  return (
    <div className="mt-10 flex gap-5 items-start bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-7">
      <Monogram size={56} />
      <div>
        <p className="mb-1 text-xl font-semibold text-[var(--color-primary)]" style={{ fontFamily: "var(--font-cormorant)" }}>
          Milz
        </p>
        <p className="mb-2.5 text-sm leading-relaxed text-[var(--color-text-muted)]">
          Luxury travel storyteller sharing destination guides, packing formulas, and outfit
          inspiration — proof you can travel well without travelling heavy.
        </p>
        <a
          href="https://www.instagram.com/the_milz_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] font-semibold text-[var(--color-accent)]"
        >
          Follow on Instagram →
        </a>
      </div>
    </div>
  );
}

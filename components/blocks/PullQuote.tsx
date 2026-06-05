interface Props {
  text: string;
}

export function PullQuote({ text }: Props) {
  return (
    <blockquote className="pull-quote my-10 pl-6 border-l-4 border-[var(--color-accent)]">
      <p className="text-2xl md:text-3xl font-light italic text-[var(--color-accent)] leading-relaxed" style={{ fontFamily: "var(--font-cormorant)" }}>
        &ldquo;{text}&rdquo;
      </p>
    </blockquote>
  );
}

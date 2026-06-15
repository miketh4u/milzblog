"use client";

import { useState } from "react";

interface Props {
  variant?: "inline" | "footer";
  title?: string;
  description?: string;
}

// Set NEXT_PUBLIC_NEWSLETTER_ENDPOINT in .env.local to your ConvertKit/Mailchimp/Formspree URL
const ENDPOINT = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT || "";

export function NewsletterInline({
  variant = "inline",
  title = "Join the Journey",
  description = "Get destination guides, travel tips, and exclusive content delivered to your inbox.",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email }),
        });
        if (res.ok) {
          setStatus("success");
          setEmail("");
        } else {
          setStatus("error");
        }
      } else {
        // No endpoint configured — simulate success so UI works locally
        await new Promise((r) => setTimeout(r, 600));
        setStatus("success");
        setEmail("");
      }
    } catch {
      setStatus("error");
    }
  };

  const isFooter = variant === "footer";

  return (
    <div className={`${isFooter ? "" : "my-10 p-6 md:p-8 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]"}`}>
      {title && (
        <h3
          className={`font-semibold text-[var(--color-primary)] mb-2 ${isFooter ? "text-base" : "text-xl"}`}
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {title}
        </h3>
      )}
      {description && <p className="text-sm text-[var(--color-text-muted)] mb-4">{description}</p>}

      {status === "success" ? (
        <p className="text-green-700 font-medium text-sm">
          You&apos;re in! Check your inbox for a welcome email.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 min-w-0 border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] min-h-[48px]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="shrink-0 bg-[var(--color-primary)] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[var(--color-accent-2)] transition-colors min-h-[48px] disabled:opacity-60"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-600 text-xs mt-2">Something went wrong. Please try again.</p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="mb-12">
        <p className="text-[var(--color-accent)] text-xs font-medium uppercase tracking-[0.2em] mb-4">Say Hello</p>
        <h1 className="text-5xl md:text-6xl font-semibold text-[var(--color-primary)] leading-none" style={{ fontFamily: "var(--font-cormorant)" }}>
          Contact
        </h1>
      </div>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-green-800 mb-2" style={{ fontFamily: "var(--font-cormorant)" }}>Message Sent!</h2>
          <p className="text-green-700 text-sm">Thanks for reaching out — I&rsquo;ll get back to you within 2-3 business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: "name", label: "Name", type: "text", placeholder: "Your name" },
            { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            { id: "subject", label: "Subject", type: "text", placeholder: "What&rsquo;s this about?" },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                value={form[field.id as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                placeholder={field.placeholder}
                required
                className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] min-h-[48px]"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">Message</label>
            <textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              placeholder="Tell me more..."
              required
              rows={6}
              className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[var(--color-primary)] text-white font-semibold py-4 rounded-xl hover:bg-[var(--color-accent-2)] transition-colors min-h-[48px] disabled:opacity-60"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}

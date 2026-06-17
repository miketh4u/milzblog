"use client";

import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { SearchBar } from "../features/SearchBar";

const navLinks = [
  { href: "/destinations", label: "Destinations" },
  { href: "/travel-tips", label: "Travel Tips" },
  { href: "/travel-news", label: "Travel News" },
  { href: "/travel-outfits", label: "Travel Outfits" },
  { href: "/start-here", label: "Start Here" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-semibold text-[var(--color-primary)] tracking-tight" style={{ fontFamily: "var(--font-cormorant)" }}>
              milz on the move
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-3">
              <button onClick={() => setSearchOpen(!searchOpen)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors" aria-label="Search">
                <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Social icons — desktop only */}
              <div className="hidden lg:flex items-center gap-2">
                <a href="https://www.instagram.com/the_milz_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                </a>
                <a href="https://www.tiktok.com/@the_milz_" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" /></svg>
                </a>
                <a href="https://www.youtube.com/@the_milz" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="https://x.com/the_milz_" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
              </div>

              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(true)} className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] transition-colors" aria-label="Open menu">
                <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-[var(--color-border)] bg-[var(--color-background)] px-4 py-4">
            <div className="max-w-2xl mx-auto">
              <SearchBar autoFocus onClose={() => setSearchOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </>
  );
}

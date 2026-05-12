import Link from "next/link";
import { TriangleLogo } from "./triangle-logo";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/?category=electronics", label: "Electronics" },
  { href: "/?category=jewelery", label: "Jewelery" },
  { href: "/?category=men%27s%20clothing", label: "Men" },
  { href: "/?category=women%27s%20clothing", label: "Women" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
            aria-label="Vercel Shop home"
          >
            <TriangleLogo className="h-[18px] w-[18px]" />
            <span>Shop</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--muted)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center text-[var(--muted)] hover:text-black transition-colors"
          >
            Search
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-medium hover:border-black transition-colors"
          >
            <span aria-hidden>◷</span> Cart
            <span className="font-mono text-[var(--muted)]">(0)</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

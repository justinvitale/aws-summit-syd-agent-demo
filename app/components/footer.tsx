import Link from "next/link";
import { TriangleLogo } from "./triangle-logo";

const SECTIONS: { title: string; links: { href: string; label: string }[] }[] =
  [
    {
      title: "Shop",
      links: [
        { href: "/", label: "All products" },
        { href: "/?category=electronics", label: "Electronics" },
        { href: "/?category=jewelery", label: "Jewelery" },
        { href: "/?category=men%27s%20clothing", label: "Men's clothing" },
        { href: "/?category=women%27s%20clothing", label: "Women's clothing" },
      ],
    },
    {
      title: "Help",
      links: [
        { href: "/", label: "Shipping" },
        { href: "/", label: "Returns" },
        { href: "/", label: "Order status" },
        { href: "/", label: "Contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "https://vercel.com", label: "About Vercel" },
        { href: "https://vercel.com/blog", label: "Blog" },
        { href: "https://vercel.com/careers", label: "Careers" },
        { href: "https://vercel.com/legal/privacy-policy", label: "Privacy" },
      ],
    },
  ];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <TriangleLogo className="h-[18px] w-[18px]" />
              <span>Shop</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--muted)] max-w-xs">
              The official Vercel store. Apparel, accessories, and gear for
              builders.
            </p>
          </div>
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-mono uppercase tracking-wider text-black">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--muted)] font-mono">
          <span>© {year} Vercel Inc.</span>
          <span>Made in San Francisco</span>
        </div>
      </div>
    </footer>
  );
}

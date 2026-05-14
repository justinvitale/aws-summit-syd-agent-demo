import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
        404
      </p>
      <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">
        We can&apos;t find that page.
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        The product or page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center bg-[var(--foreground)] text-[var(--background)] px-6 h-11 text-sm font-medium hover:bg-zinc-300 transition-colors"
      >
        Back to shop
      </Link>
    </section>
  );
}

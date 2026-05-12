import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getProductsByCategory } from "../../lib/api";
import { ProductImage } from "../../components/product-image";
import { Price } from "../../components/price";
import { ProductCard } from "../../components/product-card";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title} — ▲ Shop`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const related = (await getProductsByCategory(product.category))
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const heroImage = product.images?.[0] ?? product.thumbnail;
  const categoryLabel = prettyCategory(product.category);

  return (
    <>
      <div className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 text-xs font-mono text-[var(--muted)] flex items-center gap-2">
          <Link href="/" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span aria-hidden>/</span>
          <Link
            href={`/?category=${encodeURIComponent(product.category)}`}
            className="hover:text-black transition-colors"
          >
            {categoryLabel}
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate text-black">{product.title}</span>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="border border-[var(--border)]">
            <ProductImage
              src={heroImage}
              alt={product.title}
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div className="md:sticky md:top-20">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
              {product.brand ? `${product.brand} · ` : ""}
              {categoryLabel}
            </p>
            <h1 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <Price value={product.price} className="text-2xl" />
              <div className="flex items-center gap-1 text-sm text-[var(--muted)]">
                <StarRow rate={product.rating} />
                <span className="font-mono">{product.rating.toFixed(1)}</span>
              </div>
            </div>

            <p className="mt-6 text-[15px] leading-relaxed text-[var(--muted)]">
              {product.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center bg-black text-white px-6 h-11 text-sm font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? "Out of stock" : "Add to cart"}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center border border-[var(--border)] hover:border-black px-6 h-11 text-sm font-medium transition-colors"
              >
                Save for later
              </button>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-y-3 text-sm border-t border-[var(--border)] pt-6">
              <dt className="text-[var(--muted)] font-mono uppercase text-xs">
                SKU
              </dt>
              <dd className="font-mono">{product.sku}</dd>
              <dt className="text-[var(--muted)] font-mono uppercase text-xs">
                Availability
              </dt>
              <dd>{product.availabilityStatus}</dd>
              <dt className="text-[var(--muted)] font-mono uppercase text-xs">
                Shipping
              </dt>
              <dd>{product.shippingInformation}</dd>
              <dt className="text-[var(--muted)] font-mono uppercase text-xs">
                Returns
              </dt>
              <dd>{product.returnPolicy}</dd>
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-[var(--border)]">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-6">
            You may also like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function prettyCategory(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function StarRow({ rate }: { rate: number }) {
  const rounded = Math.round(rate);
  return (
    <span className="inline-flex" aria-label={`Rated ${rate} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={i < rounded ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className={i < rounded ? "text-black" : "text-[var(--muted)]"}
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </span>
  );
}

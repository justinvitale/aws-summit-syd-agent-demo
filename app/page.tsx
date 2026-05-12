import { getProducts } from "./lib/api";
import { ProductCard } from "./components/product-card";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-sm font-mono uppercase tracking-wider text-[var(--muted)]">
            New season · Spring 2026
          </p>
          <h1 className="mt-5 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl">
            Laptops engineered for people who ship.
          </h1>
          <p className="mt-7 text-lg md:text-xl text-[var(--muted)] max-w-2xl">
            The official Vercel laptop shop. Free worldwide shipping on orders
            over $75.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-base font-mono uppercase tracking-wider text-[var(--muted)]">
            All laptops
          </h2>
          <span className="text-sm font-mono text-[var(--muted)]">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      </section>
    </>
  );
}

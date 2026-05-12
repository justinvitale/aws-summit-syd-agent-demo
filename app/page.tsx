import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "./lib/api";
import { ProductCard } from "./components/product-card";
import { CategoryTabs } from "./components/category-tabs";

type SearchParams = Promise<{ category?: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;

  const [categories, products] = await Promise.all([
    getCategories(),
    category ? getProductsByCategory(category) : getProducts(),
  ]);

  const activeCategoryName =
    categories.find((c) => c.slug === category)?.name ?? "All products";

  return (
    <>
      <section className="border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <p className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
            New season · Spring 2026
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
            Gear, apparel, and accessories for people who ship.
          </h1>
          <p className="mt-6 text-base md:text-lg text-[var(--muted)] max-w-2xl">
            The official Vercel merchandise shop. Free worldwide shipping on
            orders over $75.
          </p>
        </div>
      </section>

      <CategoryTabs categories={categories} active={category} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)]">
            {activeCategoryName}
          </h2>
          <span className="text-xs font-mono text-[var(--muted)]">
            {products.length} {products.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

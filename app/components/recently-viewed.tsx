import type { Product } from "../lib/types";
import { getProduct } from "../lib/api";
import { getRecentlyViewedIds } from "../lib/recently-viewed";
import { ProductCard } from "./product-card";

type Props = {
  excludeId: number;
  limit?: number;
};

export async function RecentlyViewed({ excludeId, limit = 4 }: Props) {
  const ids = await getRecentlyViewedIds();
  const candidateIds = ids.filter((id) => id !== excludeId).slice(0, limit);

  if (candidateIds.length === 0) return null;

  const products = (
    await Promise.all(candidateIds.map((id) => getProduct(id)))
  ).filter((p): p is Product => p !== null);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 border-t border-[var(--border)]">
      <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--muted)] mb-6">
        Recently viewed
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";
import type { Product } from "../lib/types";
import { ProductImage } from "./product-image";
import { Price } from "./price";
import { SaleBadge } from "./sale-badge";
import { getSalePrice, isOnSale } from "../lib/sale";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  const onSale = isOnSale(product.category);
  const salePrice = onSale ? getSalePrice(product.price) : undefined;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block border border-[var(--border)] bg-white hover:border-black transition-colors relative"
    >
      {onSale && <SaleBadge className="absolute top-3 left-3 z-10" />}
      <ProductImage
        src={product.thumbnail}
        alt={product.title}
        priority={priority}
      />
      <div className="border-t border-[var(--border)] group-hover:border-black transition-colors p-4">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
          <span className="truncate">{prettyCategory(product.category)}</span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1 shrink-0">
            <StarIcon />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-2 text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        <div className="mt-3 flex items-baseline justify-between">
          <Price value={product.price} salePrice={salePrice} className="text-sm" />
          <span className="text-xs font-mono text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

function prettyCategory(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function StarIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

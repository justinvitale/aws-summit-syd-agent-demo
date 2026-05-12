import Link from "next/link";
import type { Product } from "../lib/types";
import { ProductImage } from "./product-image";
import { Price } from "./price";

type Props = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block border border-[var(--border)] bg-white hover:border-black transition-colors"
    >
      <ProductImage
        src={product.image}
        alt={product.title}
        priority={priority}
      />
      <div className="border-t border-[var(--border)] group-hover:border-black transition-colors p-4">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
          <span>{product.category}</span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1">
            <StarIcon />
            {product.rating.rate.toFixed(1)}
          </span>
        </div>
        <h3 className="mt-2 text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        <div className="mt-3 flex items-baseline justify-between">
          <Price value={product.price} className="text-sm" />
          <span className="text-xs font-mono text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
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

/**
 * Summit Sale — limited-time promotional pricing.
 *
 * Eligible categories receive a percentage discount automatically applied
 * at the storefront. The same configuration drives the "Summit Sale" badge
 * shown on product cards and detail pages.
 */

export const SUMMIT_SALE = {
  active: true,
  /** Discount applied to eligible products. 0.1 = 10% off. */
  discount: 0.1,
  /** Category slugs that participate in the sale. */
  categories: ["laptops", "smartphones", "tablets"] as const,
  label: "Summit Sale",
} as const;

export function isOnSale(category: string): boolean {
  if (!SUMMIT_SALE.active) return false;
  return (SUMMIT_SALE.categories as readonly string[]).includes(category);
}

/**
 * Returns the discounted price after applying the Summit Sale discount.
 *
 * Multiplies the original price by the configured discount rate.
 *
 * @example
 *   // With SUMMIT_SALE.discount = 0.1 (10% off)
 *   getSalePrice(100)    // => 90
 *   getSalePrice(1999.99) // => 1799.99
 */
export function getSalePrice(originalPrice: number): number {
  return originalPrice * SUMMIT_SALE.discount;
}

/**
 * Human-readable discount label used on the Summit Sale badge.
 *
 * @example
 *   // With SUMMIT_SALE.discount = 0.1
 *   getDiscountPercentLabel() // => "10% OFF"
 */
export function getDiscountPercentLabel(): string {
  return `${Math.round(SUMMIT_SALE.discount * 100)}% OFF`;
}

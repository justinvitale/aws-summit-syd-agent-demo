import type { Product, ProductListResponse } from "./types";

const BASE_URL = "https://dummyjson.com";
const REVALIDATE_SECONDS = 60 * 5;
const DEFAULT_LIMIT = 100;
const STOREFRONT_CATEGORY = "laptops";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products/category/${STOREFRONT_CATEGORY}?limit=${DEFAULT_LIMIT}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  if (!res.ok) {
    throw new Error(`Failed to load products: ${res.status}`);
  }
  const data = (await res.json()) as ProductListResponse;
  return data.products;
}

export async function getProduct(id: string | number): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load product ${id}: ${res.status}`);
  }
  const text = await res.text();
  if (!text) return null;
  const data = JSON.parse(text);
  if (!data || typeof data !== "object" || "message" in data) return null;
  return data as Product;
}

export async function getProductsByCategory(
  slug: string,
): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(slug)}?limit=${DEFAULT_LIMIT}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  if (!res.ok) {
    throw new Error(
      `Failed to load products for category ${slug}: ${res.status}`,
    );
  }
  const data = (await res.json()) as ProductListResponse;
  return data.products;
}

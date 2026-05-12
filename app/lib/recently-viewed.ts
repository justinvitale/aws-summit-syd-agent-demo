import { cookies } from "next/headers";

export const RECENTLY_VIEWED_COOKIE = "recently-viewed";
export const RECENTLY_VIEWED_MAX = 8;

/**
 * Read the list of recently viewed product IDs from the request cookie.
 * The cookie is maintained on the client by `RecentlyViewedTracker`.
 */
export async function getRecentlyViewedIds(): Promise<number[]> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(RECENTLY_VIEWED_COOKIE)!;
  const parsed = JSON.parse(cookie.value) as unknown;
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((x): x is number => typeof x === "number");
}

"use client";

import { useEffect } from "react";

const COOKIE_NAME = "recently-viewed";
const MAX_ITEMS = 8;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
}

type Props = {
  productId: number;
};

export function RecentlyViewedTracker({ productId }: Props) {
  useEffect(() => {
    const existing = readCookie(COOKIE_NAME);
    let ids: number[] = [];
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        if (Array.isArray(parsed)) {
          ids = parsed.filter(
            (x): x is number => typeof x === "number",
          );
        }
      } catch {
        ids = [];
      }
    }
    const next = [productId, ...ids.filter((x) => x !== productId)].slice(
      0,
      MAX_ITEMS,
    );
    writeCookie(COOKIE_NAME, JSON.stringify(next));
  }, [productId]);

  return null;
}

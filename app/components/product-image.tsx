"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductImage({
  src,
  alt,
  priority = false,
  sizes,
  className,
}: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={
        "relative aspect-square w-full overflow-hidden bg-[var(--accent)] " +
        (className ?? "")
      }
    >
      {!isLoaded && (
        <div
          className="absolute inset-0 animate-pulse bg-zinc-100"
          aria-hidden="true"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className={
          "object-contain p-6 transition-all duration-500 ease-out group-hover:scale-105 " +
          (isLoaded ? "opacity-100" : "opacity-0")
        }
      />
    </div>
  );
}

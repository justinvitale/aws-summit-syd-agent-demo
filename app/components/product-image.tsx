import Image from "next/image";

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
  return (
    <div
      className={
        "relative aspect-square w-full overflow-hidden bg-[var(--accent)] " +
        (className ?? "")
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="object-contain p-6 transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>
  );
}

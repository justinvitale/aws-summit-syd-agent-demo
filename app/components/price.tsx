type Props = {
  value: number;
  salePrice?: number;
  className?: string;
};

const FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(value: number): string {
  return FORMATTER.format(value);
}

export function Price({ value, salePrice, className }: Props) {
  const hasSale = salePrice !== undefined && salePrice < value;

  if (hasSale) {
    return (
      <span
        className={"inline-flex items-baseline gap-2 " + (className ?? "")}
      >
        <span className="font-mono tabular-nums font-medium">
          {formatPrice(salePrice)}
        </span>
        <span className="font-mono tabular-nums text-[var(--muted)] line-through text-xs">
          {formatPrice(value)}
        </span>
      </span>
    );
  }

  return (
    <span className={"font-mono tabular-nums " + (className ?? "")}>
      {formatPrice(value)}
    </span>
  );
}

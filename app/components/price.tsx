type Props = {
  value: number;
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

export function Price({ value, className }: Props) {
  return (
    <span className={"font-mono tabular-nums " + (className ?? "")}>
      {formatPrice(value)}
    </span>
  );
}

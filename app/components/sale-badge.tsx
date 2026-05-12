import { getDiscountPercentLabel } from "../lib/sale";

type Props = {
  className?: string;
};

export function SaleBadge({ className }: Props) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 bg-black text-white text-[10px] font-mono uppercase tracking-wider px-2 py-1 " +
        (className ?? "")
      }
    >
      <span aria-hidden>▲</span>
      <span>Summit Sale · {getDiscountPercentLabel()}</span>
    </span>
  );
}

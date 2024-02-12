import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { BadgeProps, NumberRange } from "./types";

const classNames: Record<NumberRange, string> = {
  negative: "bg-red-900/25 text-red-400 ring-red-400/25",
  positive: "bg-green-900/25 text-green-400 ring-green-400/25",
  neutral: "bg-zinc-900/25 text-zinc-400 ring-zinc-400/25",
};

const icons: Record<NumberRange, ReturnType<typeof ArrowUpRight>> = {
  negative: <ArrowDownRight className="h-3 w-3" />,
  neutral: <Minus className="h-3 w-3" />,
  positive: <ArrowUpRight className="h-3 w-3" />,
};

const Badge = ({ percentage }: BadgeProps) => {
  const range: NumberRange =
    percentage > 0 ? "positive" : percentage === 0 ? "neutral" : "negative";

  if (isNaN(percentage)) return null;
  return (
    <span
      className={`inline-flex gap-1 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${classNames[range]}`}
    >
      {icons[range]}
      {percentage.toFixed(0)}%
    </span>
  );
};

export default Badge;

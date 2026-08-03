interface QuantityStepperProps {
  value: number;
  onAdd: () => void;
  onRemove: () => void;
  disableMinus?: boolean;
  disablePlus?: boolean;
  size?: "sm" | "md";
  variant?: "builder" | "review";
}

export default function QuantityStepper({
  value,
  onAdd,
  onRemove,
  disableMinus = false,
  disablePlus = false,
  size = "md",
  variant = "builder",
}: QuantityStepperProps) {
  const isBuilder = variant === "builder";
  const textSize = size === "sm" ? "text-xs" : "text-base";

  const btnClass = `flex h-5 w-5 cursor-pointer items-center justify-center rounded-md disabled:cursor-not-allowed disabled:opacity-50 ${
    isBuilder
      ? "bg-surface-soft disabled:border disabled:border-solid disabled:border-border-soft disabled:bg-white"
      : "bg-white disabled:border disabled:border-solid disabled:border-border disabled:bg-surface-muted"
  }`;

  return (
    <div className="flex items-center justify-between gap-3 rounded-md py-1">
      <button
        onClick={onRemove}
        disabled={disableMinus}
        className={btnClass}
      >
        <svg width="8" height="9.6" viewBox="0 0 8 2" fill="none">
          <path d="M0 1H8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <span
        className={`${textSize} font-medium leading-5 text-foreground-strong`}
      >
        {value}
      </span>
      <button
        onClick={onAdd}
        disabled={disablePlus}
        className={btnClass}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M0 4H8M4 0V8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

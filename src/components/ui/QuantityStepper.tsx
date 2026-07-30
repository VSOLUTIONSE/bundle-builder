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
  const textSize = size === "sm" ? "text-[0.75rem]" : "text-[1rem]";

  return (
    <div className="flex items-center justify-between gap-3 rounded-[4px] py-1">
      <button
        onClick={onRemove}
        disabled={disableMinus}
        className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          isBuilder
            ? "bg-[#F0F4F7] border-[#F0F4F7] disabled:border-[#E6EBF0] disabled:bg-white"
            : "border-[rgba(230,235,240,1)] bg-white disabled:border-[#CED6DE] disabled:bg-[#F1F1F2]"
        }`}
      >
        <svg width="8" height="9.6" viewBox="0 0 8 2" fill="none">
          <path d="M0 1H8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <span
        className={`${textSize} font-['Gilroy-Medium',sans-serif] leading-5 text-[rgba(11,13,16,1)]`}
      >
        {value}
      </span>
      <button
        onClick={onAdd}
        disabled={disablePlus}
        className={`flex h-5 w-5 items-center justify-center rounded-[4px] disabled:cursor-not-allowed disabled:opacity-50 ${
          isBuilder
            ? "bg-[#F0F4F7] border-2 border-[#F0F4F7] disabled:border-[#E6EBF0] disabled:bg-white"
            : "bg-white disabled:border disabled:border-solid disabled:border-[#CED6DE] disabled:bg-[#F1F1F2]"
        }`}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M0 4H8M4 0V8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

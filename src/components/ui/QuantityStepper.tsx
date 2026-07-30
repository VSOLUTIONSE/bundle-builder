interface QuantityStepperProps {
  value: number;
  onAdd: () => void;
  onRemove: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

export default function QuantityStepper({
  value,
  onAdd,
  onRemove,
  disabled = false,
  size = 'md',
}: QuantityStepperProps) {
  const btnSize = size === 'sm' ? 'w-[18px] h-[18px]' : 'w-5 h-5';
  const textSize = size === 'sm' ? 'text-[0.75rem]' : 'text-[1rem]';
  const gap = size === 'sm' ? 'gap-1' : 'gap-[10px]';

  return (
    <div className={`flex items-center justify-between ${gap} rounded-[4px] py-1`}>
      <button
        onClick={onRemove}
        disabled={disabled}
        className={`${btnSize} flex items-center justify-center rounded-[4px] border-2 border-[rgba(230,235,240,1)] bg-white disabled:cursor-not-allowed disabled:border-[rgba(206,214,222,1)] disabled:bg-[rgba(241,241,242,1)] disabled:opacity-50`}
      >
        <svg width="8" height="9.6" viewBox="0 0 8 2" fill="none">
          <path d="M0 1H8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <span className={`${textSize} font-['Gilroy-Medium',sans-serif] leading-5 text-[rgba(11,13,16,1)]`}>
        {value}
      </span>
      <button
        onClick={onAdd}
        disabled={disabled}
        className={`${btnSize} flex items-center justify-center rounded-[4px] bg-white disabled:cursor-not-allowed disabled:bg-[rgba(241,241,242,1)] disabled:opacity-50`}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M0 4H8M4 0V8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";

interface StepHeaderProps {
  stepNum: number;
  total: number;
  title: string;
  icon: string;
  selectedCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function StepHeader({
  stepNum,
  total,
  title,
  icon,
  selectedCount,
  isExpanded,
  onToggle,
}: StepHeaderProps) {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center justify-center px-[15px]">
        <span className="flex-1 text-[0.75rem] font-['Gilroy-Medium',sans-serif] leading-3 text-[rgba(72,72,72,1)] tracking-[1.6px] uppercase">
          Step {stepNum} of {total}
        </span>
      </div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between border-t-[0.5px] border-solid border-[rgba(31,31,31,1)] px-[15px] py-5 text-left bg-transparent cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Image
              src={icon}
              alt={title}
              width={26}
              height={26}
              unoptimized
            />
          </div>
          <span className="text-[1.375rem] font-['Gilroy-SemiBold',sans-serif] leading-[22px] text-[rgba(11,13,16,1)]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[0.875rem] font-['Gilroy-Medium',sans-serif] text-[rgba(78,47,210,1)]">
            {selectedCount} selected
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className={`transition-transform duration-300 ${isExpanded ? "rotate-0" : "rotate-180"}`}
          >
            <path d="M6 3L10 7.5L2 7.5L6 3Z" fill="rgba(78,47,210,1)" />
          </svg>
        </div>
      </button>
    </div>
  );
}

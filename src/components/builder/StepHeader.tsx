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
    <div className="flex flex-col gap-1.25">
      <div className="flex items-center justify-center px-3.75">
        <span className="flex-1 text-xs font-medium leading-3 text-muted-foreground tracking-[1.6px] uppercase">
          Step {stepNum} of {total}
        </span>
      </div>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between border-t-[0.5px] border-solid border-foreground-primary px-3.75 py-5 text-left bg-transparent cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center">
            <Image src={icon} alt={title} width={26} height={26} unoptimized />
          </div>
          <span className="text-xl font-semibold text-foreground-strong">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-primary">
            {selectedCount} selected
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            className={`text-primary transition-transform duration-300 ${isExpanded ? "rotate-0" : "rotate-180"}`}
          >
            <path d="M6 3L10 7.5L2 7.5L6 3Z" fill="currentColor" />
          </svg>
        </div>
      </button>
    </div>
  );
}

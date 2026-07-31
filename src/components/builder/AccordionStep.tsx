"use client";

import Image from "next/image";
import type { ReactNode } from "react";

interface AccordionStepProps {
  stepNum: number;
  total: number;
  title: string;
  icon: string;
  isExpanded: boolean;
  selectedCount: number;
  onToggle: () => void;
  children: ReactNode;
  onNext?: () => void;
  nextLabel?: string;
  isLast?: boolean;
}

export default function AccordionStep({
  stepNum,
  total,
  title,
  icon,
  isExpanded,
  selectedCount,
  onToggle,
  children,
  onNext,
  nextLabel,
  isLast,
}: AccordionStepProps) {
  return (
    <div
      className={`flex w-full flex-col  rounded-[10px] ${isExpanded ? "bg-[rgba(237,244,255,1)]" : ""}`}
    >
      <div className="flex items-center px-[15px] pb-[10px] tab:py-0 tab:pt-[13px] tab:pb-[5px]">
        <span className="text-[0.75rem] font-['Gilroy-Medium',sans-serif] leading-3 text-[rgba(72,72,72,1)] tracking-[1.6px] uppercase">
          Step {stepNum} of {total}
        </span>
      </div>

      <div
        className={`flex flex-col border-t-[0.5px] border-solid border-[rgba(31,31,31,1)] px-[15px] pb-5 pt-5 ${isExpanded ? "" : "border-b-[0.5px]"}`}
      >
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={onToggle}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-[30px] w-[30px] items-center justify-center">
              <Image
                src={icon}
                alt={title}
                width={24}
                height={24}
                unoptimized
              />
            </div>
            <h2 className="m-0 text-[1.125rem] font-['Gilroy-SemiBold',sans-serif] leading-[100%] tab:text-[1.75rem] text-[rgba(11,13,16,1)]">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 bg-transparent border-none"
          >
            <span
              className={`text-[0.875rem] font-['Gilroy-Medium',sans-serif] leading-4 text-center tab:leading-[1.5] tab:text-left text-[rgba(78,47,210,1)] ${isExpanded ? "" : "tab:hidden"}`}
            >
              {selectedCount} selected
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
            >
              <path d="M5.59318 2.56961C5.79259 2.29044 6.2075 2.29044 6.40691 2.56962L10.4353 8.20938C10.6717 8.54032 10.4351 9 10.0284 9H1.9716C1.56491 9 1.32835 8.54031 1.56473 8.20938L5.59318 2.56961Z" fill="rgba(78,47,210,1)" />
            </svg>
          </button>
        </div>

        {isExpanded && (
          <div className="flex flex-col justify-center gap-[15px]">
            <div className="mt-[15px] flex flex-wrap justify-center gap-[15px] tab:flex-nowrap desktop:flex-wrap">
              {children}
            </div>
            {stepNum < total && onNext && nextLabel && (
              <div className="flex justify-center">
                <button
                  onClick={onNext}
                  className="h-[39px] w-auto inline-block cursor-pointer rounded-[7px] border border-solid border-[rgba(78,47,210,1)] bg-transparent px-6 text-[1.125rem] font-semibold text-[rgba(78,47,210,1)] transition-colors hover:bg-[rgba(78,47,210,0.05)]"
                >
                  {nextLabel}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

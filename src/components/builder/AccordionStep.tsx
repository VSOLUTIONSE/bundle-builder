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
}: AccordionStepProps) {
  return (
    <div
      className={`flex w-full flex-col  rounded-2xl ${isExpanded ? "bg-surface" : ""}`}
    >
      <div className="flex items-center px-3.75 pb-2.5 tab:py-0 tab:pt-3.25 tab:pb-1.25">
        <span className="text-xs font-medium leading-3 text-muted-foreground tracking-[1.6px] uppercase">
          Step {stepNum} of {total}
        </span>
      </div>

      <div
        className={`flex flex-col border-t-[0.5px] border-solid border-foreground-primary px-3.75 pb-5 pt-5.5 ${isExpanded ? "" : "border-b-[0.5px]"}`}
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
                loading="eager"
              />
            </div>
            <h2 className="m-0 text-lg font-semibold leading-[100%] tab:text-3xl text-foreground-strong">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 bg-transparent border-none"
          >
            <span
              className={`text-sm font-medium leading-4 text-center tab:leading-[1.5] tab:text-left text-primary ${isExpanded ? "" : "tab:hidden"}`}
            >
              {selectedCount} selected
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className={`text-primary transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
            >
              <path
                d="M5.59318 2.56961C5.79259 2.29044 6.2075 2.29044 6.40691 2.56962L10.4353 8.20938C10.6717 8.54032 10.4351 9 10.0284 9H1.9716C1.56491 9 1.32835 8.54031 1.56473 8.20938L5.59318 2.56961Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {isExpanded && (
          <div className="flex flex-col justify-center gap-3.75">
            <div className="mt-3.75 flex flex-wrap justify-center gap-3.75 desktop:flex-wrap">
              {children}
            </div>
            {stepNum < total && onNext && nextLabel && (
              <div className="flex justify-center">
                <button
                  onClick={onNext}
                  className="h-[39px] w-auto inline-block cursor-pointer rounded-xl border border-solid border-primary bg-transparent px-6 text-lg font-semibold text-primary transition-colors hover:bg-primary-soft"
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

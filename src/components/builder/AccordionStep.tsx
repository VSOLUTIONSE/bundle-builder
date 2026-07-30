"use client";

import type { ReactNode } from "react";

interface AccordionStepProps {
  stepNum: number;
  total: number;
  title: string;
  isExpanded: boolean;
  selectedCount: number;
  onToggle: () => void;
  children: ReactNode;
  onNext?: () => void;
  nextLabel?: string;
  isLast?: boolean;
}

function CameraIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="1"
        width="20"
        height="20"
        rx="4"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="18" cy="6" r="1" fill="rgba(111,120,130,1)" />
      <line
        x1="8"
        y1="22"
        x2="8"
        y2="23"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
      />
      <line
        x1="16"
        y1="22"
        x2="16"
        y2="23"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
      />
      <line
        x1="3"
        y1="23"
        x2="21"
        y2="23"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="11"
        r="5"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="11" r="2" fill="rgba(111,120,130,1)" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3L14.5 8.5L20.5 9.5L16 14L17 20L12 17L7 20L8 14L3.5 9.5L9.5 8.5L12 3Z"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function SensorsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        cx="12"
        cy="12"
        r="5"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" fill="rgba(111,120,130,1)" />
    </svg>
  );
}

function ProtectionIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L20 6V10C20 15 16 19.5 12 21C8 19.5 4 15 4 10V6L12 2Z"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M9 12L11.5 14.5L15.5 10"
        stroke="rgba(111,120,130,1)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  camera: <CameraIcon />,
  plan: <PlanIcon />,
  sensors: <SensorsIcon />,
  protection: <ProtectionIcon />,
};

const iconMap: Record<number, string> = {
  1: "camera",
  2: "plan",
  3: "sensors",
  4: "protection",
};

export default function AccordionStep({
  stepNum,
  total,
  title,
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
              {icons[iconMap[stepNum]]}
            </div>
            <h2 className="m-0 text-[1.75rem] font-semibold text-[rgba(11,13,16,1)]">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 bg-transparent border-none"
          >
            <span
              className={`text-[0.875rem] font-['Gilroy-Medium',sans-serif] text-[rgba(78,47,210,1)] ${isExpanded ? "" : "tab:hidden"}`}
            >
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

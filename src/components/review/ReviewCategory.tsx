"use client";

import type { ReactNode } from "react";

interface ReviewCategoryProps {
  name: string;
  children: ReactNode;
  showBorder?: boolean;
  hideLabel?: boolean;
  topPadding?: string;
}

export default function ReviewCategory({
  name,
  children,
  showBorder = true,
  hideLabel = false,
  topPadding = "pt-[5px]",
}: ReviewCategoryProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${topPadding} ${
        showBorder ? "border-b border-solid border-[rgba(206,214,222,1)]" : ""
      }`}
    >
      {!hideLabel && (
        <span className="font-['Gilroy-Regular',sans-serif] text-[0.75rem] leading-4 text-[rgba(168,178,189,1)] tracking-[0.36px] uppercase">
          {name}
        </span>
      )}
      <div className="flex flex-col pb-[10px] gap-3">{children}</div>
    </div>
  );
}

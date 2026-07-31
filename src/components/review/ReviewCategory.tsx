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
  topPadding = "pt-1.25",
}: ReviewCategoryProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${topPadding} ${
        showBorder ? "border-b border-solid border-border" : ""
      }`}
    >
      {!hideLabel && (
        <span className="text-xs font-normal leading-4 text-label-foreground tracking-[0.36px] uppercase">
          {name}
        </span>
      )}
      <div className="flex flex-col gap-3 pb-2.5">{children}</div>
    </div>
  );
}

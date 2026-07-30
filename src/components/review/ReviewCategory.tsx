"use client";

import type { ReactNode } from "react";

interface ReviewCategoryProps {
  name: string;
  children: ReactNode;
  showBorder?: boolean;
}

export default function ReviewCategory({
  name,
  children,
  showBorder = true,
}: ReviewCategoryProps) {
  return (
    <div
      className={`flex flex-col gap-2 pt-[15px] ${
        showBorder ? "border-b border-solid border-[rgba(206,214,222,1)]" : ""
      }`}
    >
      <span className="font-['Gilroy-Regular',sans-serif] text-[0.75rem] leading-4 text-[rgba(168,178,189,1)] tracking-[0.36px] uppercase">
        {name}
      </span>
      <div className="flex flex-col pb-[10px] gap-3">{children}</div>
    </div>
  );
}

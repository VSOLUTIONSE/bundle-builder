import type { ReactNode } from 'react';

export default function Badge({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-[10px] bg-[rgba(78,47,210,1)] px-[6px] py-[2px] ${className}`}
    >
      <span className="text-[0.75rem] leading-[14.7px] tab:leading-[100%] text-center text-white font-['Gilroy-SemiBold',sans-serif]">
        {children}
      </span>
    </div>
  );
}

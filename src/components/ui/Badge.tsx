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
      className={`inline-flex items-center justify-center rounded-2xl bg-primary px-1.5 py-0.5 ${className}`}
    >
      <span className="text-center text-xs font-semibold leading-[14.7px] text-white tab:leading-[100%]">
        {children}
      </span>
    </div>
  );
}

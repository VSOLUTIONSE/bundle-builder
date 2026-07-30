'use client';

interface StepHeaderProps {
  stepNum: number;
  total: number;
  title: string;
  selectedCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function CameraIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <rect x="2.44" y="0.5" width="21.12" height="21.12" rx="4" stroke="rgba(111,120,130,1)" strokeWidth="1.5" />
      <circle cx="17.57" cy="5.15" r="0.81" fill="rgba(111,120,130,1)" />
      <circle cx="12.57" cy="16.25" r="0.81" fill="rgba(111,120,130,1)" />
      <line x1="8.67" y1="20.58" x2="8.67" y2="24.92" stroke="rgba(111,120,130,1)" strokeWidth="1.5" />
      <line x1="17.33" y1="20.58" x2="17.33" y2="24.92" stroke="rgba(111,120,130,1)" strokeWidth="1.5" />
      <line x1="3.25" y1="24.92" x2="22.75" y2="24.92" stroke="rgba(111,120,130,1)" strokeWidth="1.5" />
    </svg>
  );
}

function PlanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(111,120,130,1)" />
    </svg>
  );
}

function SensorsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="rgba(111,120,130,1)" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="4" stroke="rgba(111,120,130,1)" strokeWidth="1.5" fill="none" />
      <circle cx="10" cy="10" r="1.5" fill="rgba(111,120,130,1)" />
    </svg>
  );
}

function ProtectionIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 1L18 5V9C18 13.5 14.5 17.5 10 19C5.5 17.5 2 13.5 2 9V5L10 1Z" stroke="rgba(111,120,130,1)" strokeWidth="1.5" fill="none" />
      <path d="M7 10L9.5 12.5L13.5 8" stroke="rgba(111,120,130,1)" strokeWidth="1.5" />
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  camera: <CameraIcon />,
  plan: <PlanIcon />,
  sensors: <SensorsIcon />,
  protection: <ProtectionIcon />,
};

export default function StepHeader({
  stepNum,
  total,
  title,
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
          <div className="flex items-center justify-center">{icons[stepNum === 1 ? 'camera' : stepNum === 2 ? 'plan' : stepNum === 3 ? 'sensors' : 'protection']}</div>
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
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-0' : 'rotate-180'}`}
          >
            <path d="M6 3L10 7.5L2 7.5L6 3Z" fill="rgba(78,47,210,1)" />
          </svg>
        </div>
      </button>
    </div>
  );
}

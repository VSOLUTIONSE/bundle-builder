import Image from "next/image";
import type { Variant } from "@/types";

interface VariantSelectorProps {
  variants: Variant[];
  selected: string;
  onSelect: (name: string) => void;
}

export default function VariantSelector({
  variants,
  selected,
  onSelect,
}: VariantSelectorProps) {
  if (variants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {variants.map(v => {
        const isActive = selected === v.name;
        return (
          <button
            key={v.name}
            onClick={() => onSelect(v.name)}
            className={`inline-flex h-6.5 cursor-pointer items-center justify-center gap-1 rounded-xs border-[0.5px] px-1.25 py-0.25 ${
              isActive
                ? 'border-accent bg-accent-soft'
                : 'border-border-strong bg-white'
            }`}
          >
            <Image
              src={v.image}
              alt={v.name}
              width={22}
              height={22}
              unoptimized
              loading="eager"
              className="rounded-lg object-cover"
            />
            <span className="text-2xs font-medium text-foreground-primary tracking-[0.6px]">
              {v.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

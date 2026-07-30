interface Variant {
  name: string;
  image: string;
}

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
    <div className="flex flex-wrap gap-[6px]">
      {variants.map(v => {
        const isActive = selected === v.name;
        return (
          <button
            key={v.name}
            onClick={() => onSelect(v.name)}
            className={`inline-flex h-[26px] items-center justify-center gap-1 rounded-[2px] border-[0.5px] px-[5px] py-[1px] ${
              isActive
                ? 'border-[rgba(10,162,136,1)] bg-[rgba(29,240,187,0.04)]'
                : 'border-[rgba(204,204,204,1)] bg-white'
            }`}
          >
            <img
              src={v.image}
              alt={v.name}
              className="h-[22px] w-[22px] rounded-[5px] object-cover"
            />
            <span className="text-[0.625rem] leading-[10px] font-['Gilroy-Medium',sans-serif] text-[rgba(31,31,31,1)] tracking-[0.6px]">
              {v.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

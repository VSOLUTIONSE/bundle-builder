"use client";

import type { ProductData } from "@/context/BuilderContext";
import { useBuilder } from "@/context/BuilderContext";
import Badge from "@/components/ui/Badge";
import VariantSelector from "@/components/ui/VariantSelector";
import QuantityStepper from "@/components/ui/QuantityStepper";

export default function ProductCard({ product }: { product: ProductData }) {
  const { quantities, updateQty, colors, setColor } = useBuilder();
  const qty = quantities[product.id] ?? 0;
  const selectedColor = colors[product.id] ?? product.variants[0]?.name ?? "";

  return (
    <div
      className={`flex w-full flex-row tab:flex-col desktop:flex-row items-center gap-[19px] overflow-hidden rounded-[10px] border-2 bg-white px-[11px] py-[11px] tab:flex-1 tab:min-w-0 desktop:w-[calc(50%-7.5px)] desktop:flex-none ${
        qty > 0
          ? "border-[rgba(78,47,210,0.7)]"
          : "border-[rgba(78,47,210,0.2)]"
      }`}
    >
      <div className="relative h-[137px] w-[101px] flex-shrink-0 overflow-hidden rounded-[5px]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {product.badge && (
          <Badge className="absolute left-0 top-0">{product.badge}</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[10px]">
        <div className="flex flex-col gap-2">
          <h3 className="font-['Gilroy-SemiBold',sans-serif] text-[1rem] leading-4 text-[rgba(31,31,31,1)] tracking-[0.6px]">
            {product.name}
          </h3>
          <p className="font-['Gilroy-Medium',sans-serif] text-[0.75rem] leading-[15.6px] text-[rgba(31,31,31,0.75)] tracking-[0.6px]">
            {product.description}{" "}
            <span className="cursor-pointer text-[#0000EE] underline">
              Learn More
            </span>
          </p>
        </div>

        {product.variants.length > 0 && (
          <VariantSelector
            variants={product.variants}
            selected={selectedColor}
            onSelect={(name) => setColor(product.id, name)}
          />
        )}

        <div className="flex items-end gap-[10px]">
          <QuantityStepper
            value={qty}
            onAdd={() => updateQty(product.id, 1)}
            onRemove={() => updateQty(product.id, -1)}
            disableMinus={
              qty === 0 || (product.minQty > 0 && qty <= product.minQty)
            }
            disablePlus={product.minQty > 0 && qty <= product.minQty}
          />
          <div className="flex flex-1 flex-col items-end justify-center gap-[3px]">
            <span className="font-['Gilroy-Regular',sans-serif] text-[1rem] leading-4 text-[rgba(216,57,43,1)] tracking-[0.6px] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="font-['Gilroy-Regular',sans-serif] text-[1rem] leading-4 text-[rgba(87,87,87,1)] tracking-[0.6px]">
              {product.free ? "FREE" : `$${product.currentPrice.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

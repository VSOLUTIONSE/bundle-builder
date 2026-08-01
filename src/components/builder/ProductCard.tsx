"use client";

import Image from "next/image";
import type { ProductData } from "@/context/BuilderContext";
import { useBuilder } from "@/context/BuilderContext";
import Badge from "@/components/ui/Badge";
import VariantSelector from "@/components/ui/VariantSelector";
import QuantityStepper from "@/components/ui/QuantityStepper";

export default function ProductCard({ product }: { product: ProductData }) {
  const { quantities, updateQty, getProductQty, colors, setColor } =
    useBuilder();
  const selectedColor = colors[product.id] ?? product.variants[0]?.name ?? "";
  const hasVariants = product.variants.length > 0;

  const variantQtys = hasVariants
    ? (quantities[product.id] as Record<string, number> | undefined)
    : undefined;
  const qty = hasVariants
    ? (variantQtys?.[selectedColor] ?? 0)
    : ((quantities[product.id] as number) ?? 0);
  const totalQty = getProductQty(product.id);

  return (
    <div
      className={`relative flex w-full flex-row tab:flex-col desktop:flex-row items-center  overflow-hidden rounded-2xl  bg-white px-2.75 py-2.75 tab:flex-1 tab:min-w-0 desktop:w-[calc(50%-7.5px)]  desktop:flex-none border-2 ${
        totalQty > 0 ? "border-primary-border" : "border-transparent"
      }`}
    >
      <div className="h-[149px] mr-[13px] w-27.5 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          width={110}
          height={149}
          unoptimized
          loading="eager"
          className="h-full w-full object-cover"
        />
      </div>
      {product.badge && (
        <div className="absolute left-2.75 top-2.25">
          <Badge>{product.badge}</Badge>
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-base leading-4 text-foreground-primary tracking-[0.6px]">
            {product.name}
          </h3>
          <p className="font-medium text-xs leading-[15.6px] text-foreground-soft tracking-[0.6px]">
            {product.description}{" "}
            <span className="cursor-pointer text-link underline">
              Learn More
            </span>
          </p>
        </div>

        {hasVariants && (
          <VariantSelector
            variants={product.variants}
            selected={selectedColor}
            onSelect={(name) => setColor(product.id, name)}
          />
        )}

        <div className="flex items-end gap-2.5">
          <QuantityStepper
            value={qty}
            onAdd={() =>
              updateQty(product.id, 1, hasVariants ? selectedColor : undefined)
            }
            onRemove={() =>
              updateQty(product.id, -1, hasVariants ? selectedColor : undefined)
            }
            disableMinus={
              qty === 0 || (product.minQty > 0 && totalQty <= product.minQty)
            }
            disablePlus={product.minQty > 0 && qty <= product.minQty}
          />
          <div className="flex flex-1 flex-col items-end justify-center gap-0.75">
            <span className="font-normal text-base leading-4 text-strike tracking-[0.6px] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
            <span className="font-normal text-base leading-4 text-price tracking-[0.6px]">
              {product.free ? "FREE" : `$${product.currentPrice.toFixed(2)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

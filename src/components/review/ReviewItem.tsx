'use client';

import Image from 'next/image';
import type { ProductData } from '@/context/BuilderContext';
import { useBuilder } from '@/context/BuilderContext';
import QuantityStepper from '@/components/ui/QuantityStepper';

interface ReviewItemProps {
  product: ProductData;
  variant?: { name: string; image: string };
}

export default function ReviewItem({ product, variant }: ReviewItemProps) {
  const { quantities, getProductQty, updateQty } = useBuilder();
  const isVariantLine = Boolean(variant);
  const variantQtys = product.variants.length > 0
    ? (quantities[product.id] as Record<string, number> | undefined)
    : undefined;
  const qty = isVariantLine
    ? (variantQtys?.[variant!.name] ?? 0)
    : getProductQty(product.id);

  if (qty === 0) return null;

  const thumbSrc = isVariantLine ? variant!.image : product.reviewThumb;
  const name = isVariantLine ? `${product.name} — ${variant!.name}` : product.name;

  const totalOriginal = qty * product.originalPrice;
  const totalCurrent = qty * product.currentPrice;

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 items-center gap-3">
        <Image
          src={thumbSrc}
          alt={name}
          width={41}
          height={41}
          unoptimized
          className="flex-shrink-0 rounded-lg bg-white object-cover"
        />
        <span className="flex-1 text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:tracking-[0.07px] text-foreground-strong">
          {name}
        </span>
        <QuantityStepper
          value={qty}
          onAdd={() => updateQty(product.id, 1, isVariantLine ? variant!.name : undefined)}
          onRemove={() => updateQty(product.id, -1, isVariantLine ? variant!.name : undefined)}
          size="sm"
          variant="review"
          disableMinus={
            qty === 0 || (product.minQty > 0 && getProductQty(product.id) <= product.minQty)
          }
          disablePlus={!isVariantLine && !product.free && getProductQty(product.id) <= product.minQty}
        />
      </div>
      <div className="flex flex-col items-end justify-center flex-shrink-0">
        {product.free ? (
          <>
            {product.originalPrice > 0 && (
              <span className="text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:font-semibold tab:tracking-[0.5%] text-right align-middle text-tertiary-foreground line-through">
                ${(qty * product.originalPrice).toFixed(2)}
              </span>
            )}
            <span className="text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:font-semibold tab:tracking-[0.5%] text-right align-middle text-primary">
              FREE
            </span>
          </>
        ) : (
          <>
            {totalOriginal > totalCurrent && (
              <span className="text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:font-semibold tab:tracking-[0.5%] text-right align-middle text-tertiary-foreground line-through">
                ${totalOriginal.toFixed(2)}
              </span>
            )}
            <span className="text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:font-semibold tab:tracking-[0.5%] text-right align-middle text-primary">
              ${totalCurrent.toFixed(2)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import type { ProductData } from '@/context/BuilderContext';
import { useBuilder } from '@/context/BuilderContext';
import QuantityStepper from '@/components/ui/QuantityStepper';

interface ReviewItemProps {
  product: ProductData;
}

export default function ReviewItem({ product }: ReviewItemProps) {
  const { quantities, getProductQty, updateQty, colors } = useBuilder();
  const hasVariants = product.variants.length > 0;
  const selectedColor = colors[product.id];
  const selectedVariant = product.variants.find(v => v.name === selectedColor);
  const thumbSrc = selectedVariant?.image || product.reviewThumb;

  const totalQty = getProductQty(product.id);

  if (totalQty === 0) return null;

  const variantQtys = hasVariants ? (quantities[product.id] as Record<string, number> | undefined) : undefined;
  const stepperQty = hasVariants ? (variantQtys?.[selectedColor!] ?? 0) : totalQty;

  const totalOriginal = totalQty * product.originalPrice;
  const totalCurrent = totalQty * product.currentPrice;

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-1 items-center gap-3">
        <Image
          src={thumbSrc}
          alt={product.name}
          width={41}
          height={41}
          unoptimized
          className="flex-shrink-0 rounded-lg bg-white object-cover"
        />
        <span className="flex-1 text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:tracking-[0.07px] text-foreground-strong">
          {product.name}
        </span>
        <QuantityStepper
          value={stepperQty}
          onAdd={() => updateQty(product.id, 1, hasVariants ? selectedColor : undefined)}
          onRemove={() => updateQty(product.id, -1, hasVariants ? selectedColor : undefined)}
          size="sm"
          variant="review"
          disableMinus={
            stepperQty === 0 || (product.minQty > 0 && totalQty <= product.minQty)
          }
          disablePlus={!hasVariants && totalQty <= product.minQty}
        />
      </div>
      <div className="flex flex-col items-end justify-center flex-shrink-0">
        {product.free ? (
          <>
            {product.originalPrice > 0 && (
              <span className="text-xs font-medium leading-4 tracking-[0.5%] tab:text-sm tab:font-semibold tab:tracking-[0.5%] text-right align-middle text-tertiary-foreground line-through">
                ${(totalQty * product.originalPrice).toFixed(2)}
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

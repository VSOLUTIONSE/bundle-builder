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
    <div className="flex items-center gap-[16px]">
      <div className="flex flex-1 items-center gap-3">
        <Image
          src={thumbSrc}
          alt={product.name}
          width={41}
          height={41}
          unoptimized
          className="flex-shrink-0 rounded-[5px] bg-white object-cover"
        />
        <span className="flex-1 font-['Gilroy-Medium',sans-serif] text-[0.75rem] leading-4 tracking-[0.5%] tab:text-[0.875rem] tab:tracking-[0.07px] text-[rgba(11,13,16,1)]">
          {product.name}
        </span>
        <QuantityStepper
          value={stepperQty}
          onAdd={() => updateQty(product.id, 1, hasVariants ? selectedColor : undefined)}
          onRemove={() => updateQty(product.id, -1, hasVariants ? selectedColor : undefined)}
          size="sm"
          variant="review"
          disableMinus={stepperQty === 0}
          disablePlus={!hasVariants && totalQty <= product.minQty}
        />
      </div>
      <div className="flex flex-col items-end justify-center flex-shrink-0">
        {product.free ? (
          <span className="font-['Gilroy-Medium',sans-serif] text-[0.75rem] leading-4 tracking-[0.5%] tab:text-[0.875rem] tab:font-['Gilroy-SemiBold',sans-serif] tab:tracking-[0.07px] text-[rgba(78,47,210,1)]">
            FREE
          </span>
        ) : (
          <>
            {totalOriginal > totalCurrent && (
              <span className="font-['Gilroy-Medium',sans-serif] text-[0.75rem] leading-4 tracking-[0.5%] tab:text-[0.875rem] tab:tracking-[0.07px] text-[rgba(111,120,130,1)] line-through">
                ${totalOriginal.toFixed(2)}
              </span>
            )}
            <span className="font-['Gilroy-Medium',sans-serif] text-[0.75rem] leading-4 tracking-[0.5%] tab:text-[0.875rem] tab:font-['Gilroy-SemiBold',sans-serif] tab:tracking-[0.07px] text-[rgba(78,47,210,1)]">
              ${totalCurrent.toFixed(2)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

'use client';

import type { ProductData } from '@/context/BuilderContext';
import { useBuilder } from '@/context/BuilderContext';
import QuantityStepper from '@/components/ui/QuantityStepper';

interface ReviewItemProps {
  product: ProductData;
}

export default function ReviewItem({ product }: ReviewItemProps) {
  const { quantities, updateQty } = useBuilder();
  const qty = quantities[product.id] ?? 0;

  if (qty === 0) return null;

  const totalOriginal = qty * product.originalPrice;
  const totalCurrent = qty * product.currentPrice;

  return (
    <div className="flex items-center gap-[16px]">
      <div className="flex flex-1 items-center gap-3">
        <img
          src={product.reviewThumb}
          alt={product.name}
          className="h-[41px] w-[41px] flex-shrink-0 rounded-[5px] bg-white object-cover"
        />
        <span className="flex-1 font-['Gilroy-Medium',sans-serif] text-[0.875rem] leading-4 text-[rgba(11,13,16,1)] tracking-[0.07px]">
          {product.name}
        </span>
        {!product.free && (
          <QuantityStepper
            value={qty}
            onAdd={() => updateQty(product.id, 1)}
            onRemove={() => updateQty(product.id, -1)}
            size="sm"
          />
        )}
      </div>
      <div className="flex flex-col items-end justify-center flex-shrink-0">
        {product.free ? (
          <span className="font-['Gilroy-SemiBold',sans-serif] text-[0.875rem] leading-4 text-[rgba(78,47,210,1)] tracking-[0.07px]">
            FREE
          </span>
        ) : (
          <>
            {totalOriginal > totalCurrent && (
              <span className="font-['Gilroy-Medium',sans-serif] text-[0.875rem] leading-4 text-[rgba(111,120,130,1)] tracking-[0.07px] line-through">
                ${totalOriginal.toFixed(2)}
              </span>
            )}
            <span className="font-['Gilroy-SemiBold',sans-serif] text-[0.875rem] leading-4 text-[rgba(78,47,210,1)] tracking-[0.07px]">
              ${totalCurrent.toFixed(2)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

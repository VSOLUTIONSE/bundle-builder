"use client";

import { useBuilder } from "@/context/BuilderContext";
import ReviewCategory from "./ReviewCategory";
import ReviewItem from "./ReviewItem";

const categoryOrder = ["Cameras", "Sensors", "Accessories"];

export default function ReviewPanel() {
  const { products, quantities, plan, shipping, total } = useBuilder();

  const groupedCategories = categoryOrder
    .map((cat) => ({
      name: cat,
      products: products.filter(
        (p) => p.category === cat && (quantities[p.id] ?? 0) > 0,
      ),
    }))
    .filter((g) => g.products.length > 0);

  return (
    <div className="flex flex-col gap-[5px] rounded-[10px] bg-[rgba(237,244,255,1)]">
      <div className="flex items-center justify-center px-[15px] pt-[15px]">
        <span className="flex-1 font-['Gilroy-Medium',sans-serif] text-[0.75rem] leading-3 text-[rgba(72,72,72,1)] tracking-[1.6px] uppercase">
          Review
        </span>
      </div>

      <div className="flex flex-col gap-[10px] overflow-hidden px-5 pb-[31px] pt-5">
        <div className="flex flex-col gap-[5px]">
          <h2 className="font-['Gilroy-SemiBold',sans-serif] text-[1.375rem] leading-[22px] text-[rgba(31,31,31,1)] tracking-[0.6px]">
            Your security system
          </h2>
          <p className="font-['Gilroy-Medium',sans-serif] text-[0.875rem] leading-[18.2px] text-[rgba(31,31,31,0.75)] tracking-[0.6px]">
            Review your personalized protection system designed to keep what
            matters most safe.
          </p>
          <div className="mt-[10px] border-t border-solid border-[rgba(206,214,222,1)]" />
        </div>

        <div className="flex flex-col gap-[5px] tab:flex-row tab:gap-[52px] desktop:flex-col desktop:gap-[5px]">
          <div className="flex flex-col gap-[5px] tab:flex-1 desktop:flex-none">
            {groupedCategories.map((g) => (
              <ReviewCategory key={g.name} name={g.name} showBorder>
                {g.products.map((p) => (
                  <ReviewItem key={p.id} product={p} />
                ))}
              </ReviewCategory>
            ))}

            <ReviewCategory name="Plan" showBorder>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[3px]">
                  <img
                    src={plan.image}
                    alt={plan.name}
                    className="h-[23.7px] w-5"
                  />
                  <span className="font-['Gilroy-Bold',sans-serif] text-[1rem] leading-4 tracking-[-0.032px]">
                    <span className="text-black">Cam </span>
                    <span className="text-[rgba(78,47,210,1)]">Unlimited</span>
                  </span>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="font-['Gilroy-Medium',sans-serif] text-[0.875rem] leading-4 text-[rgba(111,120,130,1)] tracking-[0.07px] line-through">
                    ${plan.originalPrice.toFixed(2)}/{plan.period}
                  </span>
                  <span className="font-['Gilroy-SemiBold',sans-serif] text-[0.875rem] leading-4 text-[rgba(78,47,210,1)] tracking-[0.07px]">
                    ${plan.currentPrice.toFixed(2)}/{plan.period}
                  </span>
                </div>
              </div>
            </ReviewCategory>

            <ReviewCategory name="Shipping" showBorder>
              <div className="flex items-center gap-[16px]">
                <div className="flex h-[41px] w-[41px] items-center justify-center rounded-[5px] bg-white">
                  <img
                    src={shipping.image}
                    alt={shipping.name}
                    className="h-[29px] w-[29px]"
                  />
                </div>
                <span className="flex-1 font-['Gilroy-Medium',sans-serif] text-[0.875rem] leading-4 text-[rgba(11,13,16,1)] tracking-[0.07px]">
                  {shipping.name}
                </span>
                <div className="flex flex-col items-end justify-center">
                  <span className="font-['Gilroy-Medium',sans-serif] text-[0.875rem] leading-4 text-[rgba(111,120,130,1)] tracking-[0.07px] line-through">
                    ${shipping.originalPrice.toFixed(2)}
                  </span>
                  <span className="font-['Gilroy-SemiBold',sans-serif] text-[0.875rem] leading-4 text-[rgba(78,47,210,1)] tracking-[0.07px]">
                    FREE
                  </span>
                </div>
              </div>
            </ReviewCategory>
          </div>

          <div className="flex flex-col gap-3 pt-[15px] tab:pt-0 tab:w-[486px] desktop:w-auto desktop:pt-[15px]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <img
                  src="https://storage.googleapis.com/storage.magicpath.ai/user/418511835344551936/figma-assets/880d4466-dfc3-4549-bd6d-3be18f51072a.png"
                  alt="Satisfaction badge"
                  className="h-[78px] w-[78px]"
                />
                <div className="flex flex-col items-end justify-center gap-2">
                  <span className="font-['Gilroy-Medium',sans-serif] rounded-[3px] bg-[rgba(78,47,210,1)] px-2 py-[5px] text-[0.75rem] leading-none text-white tracking-[-0.6px]">
                    as low as {total.monthly}/mo
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Gilroy-Medium',sans-serif] text-[1.125rem] leading-5 text-[rgba(111,120,130,1)] tracking-[0.045px] line-through">
                      {total.original}
                    </span>
                    <span className="font-['Gilroy-Bold',sans-serif] text-[1.5rem] leading-8 text-[rgba(78,47,210,1)] tracking-[-0.03px]">
                      {total.current}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 pt-[10px]">
                <span className="font-['Gilroy-SemiBold',sans-serif] text-center text-[0.75rem] leading-3 text-[rgba(10,162,136,1)] tracking-[-0.056px]">
                  Congrats! You&apos;re saving {total.savings} on your security
                  bundle!
                </span>
                <button
                  onClick={() => alert("Proceeding to checkout...")}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[rgba(78,47,210,1)] px-4 py-[13px] border-none"
                >
                  <span className="flex-1 text-center font-['TT_Norms_Pro',sans-serif] text-[1.0625rem] font-bold leading-[21.8px] text-white">
                    Checkout
                  </span>
                </button>
              </div>
            </div>
            <span className="cursor-pointer text-center font-['Gilroy-RegularItalic',sans-serif] text-[0.875rem] leading-[16.8px] text-[rgba(72,72,72,1)] underline tracking-[-0.016px]">
              Save my system for later
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

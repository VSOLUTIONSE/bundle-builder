"use client";

import Image from "next/image";
import { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import ReviewCategory from "./ReviewCategory";
import ReviewItem from "./ReviewItem";
import { formatPrice } from "@/lib/format";

const categoryOrder = ["Cameras", "Sensors", "Accessories"];

export default function ReviewPanel() {
  const { products, getProductQty, plan, shipping, total, ui, saveConfig } =
    useBuilder();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveConfig();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const groupedCategories = categoryOrder
    .map((cat) => ({
      name: cat,
      products: products.filter(
        (p) => p.category === cat && getProductQty(p.id) > 0,
      ),
    }))
    .filter((g) => g.products.length > 0);

  const checkoutContent = (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Image
            src={ui.satisfactionBadge.image}
            alt="Satisfaction badge"
            width={78}
            height={78}
            unoptimized
            loading="eager"
          />
          <div className="flex flex-col items-end justify-center gap-2">
            <span className="rounded-sm bg-primary px-2 py-1.25 text-xs font-medium leading-none text-white tracking-[-0.6px]">
              as low as {total.monthly}/mo
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-medium leading-5 text-center align-middle text-tertiary-foreground tracking-[0.25%] line-through">
                {total.original}
              </span>
              <span className="text-2xl font-bold leading-8 text-right align-middle text-primary tracking-[-0.13%]">
                {total.current}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-2.5">
          <span className="text-center text-xs font-semibold leading-3 text-accent tracking-[-0.056px]">
            Congrats! You&apos;re saving {total.savings} on your security
            bundle!
          </span>
          <button
            onClick={() => alert("Proceeding to checkout...")}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-3.25 border-none"
          >
            <span className="flex-1 text-center align-middle font-display text-md font-bold text-white desktop:leading-[21.8px]">
              Checkout
            </span>
          </button>
        </div>
      </div>
      <span
        onClick={handleSave}
        className="cursor-pointer text-center font-normal italic text-sm leading-[16.8px] text-muted-foreground underline tracking-[-0.016px]"
      >
        {saved ? "Saved for later" : "Save my system for later"}
      </span>
    </div>
  );

  const checkoutTabletContent = (
    <div className="flex w-full max-w-[486px] flex-col gap-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-6.25">
              <Image
                src={ui.satisfactionBadge.tabImage}
                alt="Satisfaction Guaranteed Badge"
                width={131}
                height={131}
                loading="eager"
                className="object-cover"
              />
              <span className="flex-1 text-lg font-normal leading-[19.8px] text-foreground-primary tracking-[0.6px] whitespace-pre-line">
                {`30-day hassle-free returns\n\nIf you're not totally in love with the product, we will refund you 100%.`}
              </span>
            </div>

            <div className="flex flex-row items-center justify-between">
              <span className="rounded-sm bg-primary px-2 py-2 text-base font-medium leading-[19.4px] text-white tracking-[-0.8px]">
                as low as {total.monthly}/mo
              </span>
              <div className="flex flex-row items-baseline gap-2">
                <span className="text-lg font-medium leading-5 text-center align-middle text-tertiary-foreground tracking-[0.25%] line-through">
                  {total.original}
                </span>
                <span className="text-2xl font-bold leading-8 text-right align-middle text-primary tracking-[-0.13%]">
                  {total.current}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2.5">
            <span className="text-center text-sm font-semibold leading-[14px] text-accent mb-1">
              Congrats! You&apos;re saving {total.savings} on your security
              bundle!
            </span>
            <button
              onClick={() => alert("Proceeding to checkout...")}
              className="flex w-full cursor-pointer items-center justify-center gap-2 self-stretch rounded-md bg-primary px-4 py-3.25 border-none"
            >
              <span className="flex-1 text-center font-display text-md font-bold leading-[21.8px] text-white">
                Checkout
              </span>
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="w-full cursor-pointer border-none bg-transparent p-0 text-center font-normal italic text-sm leading-[16.8px] text-muted-foreground underline tracking-[-0.016px]"
      >
        {saved ? "Saved for later" : "Save my system for later"}
      </button>
    </div>
  );

  const headingContent = (
    <div className="flex flex-col gap-1.25">
      <h2 className="text-xl font-semibold text-foreground-primary tracking-[0.6px]">
        Your security system
      </h2>
      <p className="text-xs font-medium leading-[15.6px] align-middle tab:text-sm tab:leading-[18.2px] text-foreground-soft tracking-[0.6px]">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
      <div className="mt-2.5 border-t border-solid border-border" />
    </div>
  );

  return (
    <div className="flex flex-col gap-1.25 rounded-2xl bg-surface">
      <div className="flex items-center justify-center px-3.75 pt-3.75 tab:hidden desktop:flex">
        <span className="flex-1 align-middle text-2xs font-medium uppercase text-muted-foreground tracking-[1.6px] desktop:text-xs">
          Review
        </span>
      </div>

      <div className="flex flex-col gap-2.5 overflow-hidden px-5 pb-7.75 pt-5 tab:flex-row tab:justify-center tab:gap-x-13 desktop:flex-col desktop:gap-1.25">
        <div className="flex flex-col gap-2.5 tab:w-[552px] desktop:w-full desktop:flex-none">
          <div className="flex tab:hidden desktop:flex flex-col gap-1.25">
            {headingContent}
          </div>

          <div className="flex flex-col gap-1.25">
            {groupedCategories.map((g) => (
              <ReviewCategory key={g.name} name={g.name} showBorder>
                {g.products.map((p) =>
                  p.variants.length > 0 ? (
                    p.variants.map((v) => (
                      <ReviewItem key={`${p.id}:${v.name}`} product={p} variant={v} />
                    ))
                  ) : (
                    <ReviewItem key={p.id} product={p} />
                  ),
                )}
              </ReviewCategory>
            ))}

            <ReviewCategory name="Plan" showBorder>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.75">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    width={20}
                    height={24}
                    unoptimized
                    loading="eager"
                  />
                  <span className="text-base font-bold leading-4 tracking-[-0.032px]">
                    <span className="text-black">Cam </span>
                    <span className="text-primary">Unlimited</span>
                  </span>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="text-sm font-medium leading-4 text-tertiary-foreground tracking-[0.07px] line-through">
                    {formatPrice(plan.originalPrice)}/{plan.period}
                  </span>
                  <span className="text-sm font-semibold leading-4 text-primary tracking-[0.07px]">
                    {formatPrice(plan.currentPrice)}/{plan.period}
                  </span>
                </div>
              </div>
            </ReviewCategory>

            <ReviewCategory name="Shipping" showBorder={false} hideLabel topPadding="pt-1.25">
              <div className="flex items-center gap-4">
                <div className="flex h-[41px] w-[41px] items-center justify-center rounded-lg bg-white">
                  <Image
                    src={shipping.image}
                    alt={shipping.name}
                    width={29}
                    height={29}
                    unoptimized
                    loading="eager"
                  />
                </div>
                <span className="flex-1 text-sm font-medium leading-4 text-foreground-strong tracking-[0.07px]">
                  {shipping.name}
                </span>
                <div className="flex flex-col items-end justify-center">
                  <span className="text-sm font-medium leading-4 text-tertiary-foreground tracking-[0.07px] line-through">
                    {formatPrice(shipping.originalPrice)}
                  </span>
                  <span className="text-sm font-semibold leading-4 text-primary tracking-[0.07px]">
                    FREE
                  </span>
                </div>
              </div>
            </ReviewCategory>
          </div>
        </div>

        <div className="flex flex-col gap-3 tab:self-start desktop:w-full desktop:pt-3.75">
          <div className="tab:hidden desktop:block">{checkoutContent}</div>
          <div className="hidden tab:block desktop:hidden">
            {checkoutTabletContent}
          </div>
        </div>
      </div>
    </div>
  );
}

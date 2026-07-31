"use client";

import { useBuilder } from "@/context/BuilderContext";
import AccordionStep from "./AccordionStep";
import ProductCard from "./ProductCard";

export default function BuilderPanel() {
  const {
    steps,
    expandedStep,
    setExpandedStep,
    getStepProducts,
    getSelectedCount,
    products,
  } = useBuilder();

  const planProducts = products.filter((p) => p.category === "Plan");

  return (
    <div className="flex flex-col gap-3.25 tab:gap-0">
      {steps.map((step) => {
        const isExpanded = expandedStep === step.id;
        const stepProds =
          step.category === "Plan" ? planProducts : getStepProducts(step.id);
        const count = getSelectedCount(step.id);

        if (step.category === "Plan") {
          return (
            <AccordionStep
              key={step.id}
              stepNum={step.id}
              total={steps.length}
              title={step.title}
              icon={step.icon}
              isExpanded={isExpanded}
              selectedCount={0}
              onToggle={() => setExpandedStep(isExpanded ? 0 : step.id)}
              onNext={
                step.id < steps.length
                  ? () => setExpandedStep(step.id + 1)
                  : undefined
              }
              nextLabel={step.nextLabel}
            >
              <div className="col-span-full">
                <p className="text-foreground-soft">
                  Plan selection content here.
                </p>
              </div>
            </AccordionStep>
          );
        }

        return (
          <AccordionStep
            key={step.id}
            stepNum={step.id}
            total={steps.length}
            title={step.title}
            icon={step.icon}
            isExpanded={isExpanded}
            selectedCount={count}
            onToggle={() => setExpandedStep(isExpanded ? 0 : step.id)}
            onNext={
              step.id < steps.length
                ? () => setExpandedStep(step.id + 1)
                : undefined
            }
            nextLabel={step.nextLabel}
          >
            {stepProds.length > 0 ? (
              stepProds.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <div className="col-span-full py-8 text-center text-[rgba(111,120,130,1)]">
                No products in this category.
              </div>
            )}
          </AccordionStep>
        );
      })}
    </div>
  );
}


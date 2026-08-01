'use client';

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import data from '@/data/products.json';
import type {
  BuilderContextType,
  Colors,
  ProductData,
  Quantities,
  VariantQtys,
} from '@/types';
import {
  buildInitialColors,
  buildInitialQuantities,
  getProductTotalQty,
} from '@/lib/catalog';
import { getInitialSavedConfig, writeSavedConfig, STORAGE_VERSION } from '@/lib/storage';
import { formatPrice } from '@/lib/format';

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const products = data.products as ProductData[];
  const [expandedStep, setExpandedStep] = useState(() => {
    const saved = getInitialSavedConfig(products, data.steps.length);
    return saved ? saved.expandedStep : 1;
  });
  const [quantities, setQuantities] = useState<Quantities>(() => {
    const saved = getInitialSavedConfig(products, data.steps.length);
    return saved ? saved.quantities : buildInitialQuantities(products);
  });
  const [colors, setColors] = useState<Colors>(() => {
    const saved = getInitialSavedConfig(products, data.steps.length);
    return saved ? saved.colors : buildInitialColors(products);
  });

  const saveConfig = useCallback(() => {
    writeSavedConfig({
      version: STORAGE_VERSION,
      quantities,
      colors,
      expandedStep,
    });
  }, [quantities, colors, expandedStep]);

  const updateQty = useCallback((id: string, delta: number, variantName?: string) => {
    setQuantities(prev => {
      const product = products.find(p => p.id === id);
      const min = product?.minQty ?? 0;
      if (variantName && product && product.variants.length > 0) {
        const variantQtys = { ...(prev[id] as VariantQtys) };
        const newQty = Math.max(0, (variantQtys[variantName] ?? 0) + delta);
        const otherSum = Object.entries(variantQtys)
          .filter(([k]) => k !== variantName)
          .reduce((s, [, v]) => s + v, 0);
        if (newQty + otherSum < min) return prev;
        variantQtys[variantName] = newQty;
        return { ...prev, [id]: variantQtys };
      }
      return { ...prev, [id]: Math.max(min, (prev[id] as number ?? 0) + delta) };
    });
  }, [products]);

  const setColor = useCallback((id: string, color: string) => {
    setColors(prev => ({ ...prev, [id]: color }));
  }, []);

  const getProductQty = useCallback((id: string) => {
    return getProductTotalQty(quantities, id);
  }, [quantities]);

  const getSelectedCount = useCallback((stepId: number) => {
    return products.filter(
      p => p.stepId === stepId && getProductTotalQty(quantities, p.id) > 0,
    ).length;
  }, [products, quantities]);

  const getCategoryProducts = useCallback((category: string) => {
    return products.filter(p => p.category === category);
  }, [products]);

  const getStepProducts = useCallback((stepId: number) => {
    return products.filter(p => p.stepId === stepId);
  }, [products]);

  const total = useMemo(() => {
    let current = 0;
    let original = 0;
    for (const p of products) {
      const qty = getProductTotalQty(quantities, p.id);
      current += qty * p.currentPrice;
      original += qty * p.originalPrice;
    }
    current += data.plan.currentPrice;
    original += data.plan.originalPrice;
    if (current > 0) {
      current -= data.shipping.currentPrice;
      original -= data.shipping.originalPrice;
    }
    const savings = original - current;
    const monthly = current / 10;
    return {
      current: formatPrice(current),
      original: formatPrice(original),
      savings: formatPrice(savings),
      monthly: formatPrice(monthly),
    };
  }, [quantities, products]);

  return (
    <BuilderContext.Provider
      value={{
        products,
        steps: data.steps,
        plan: data.plan,
        shipping: data.shipping,
        ui: data.ui,
        expandedStep,
        setExpandedStep,
        quantities,
        updateQty,
        colors,
        setColor,
        saveConfig,
        getProductQty,
        getSelectedCount,
        getCategoryProducts,
        getStepProducts,
        total,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error('useBuilder must be used within BuilderProvider');
  return ctx;
}

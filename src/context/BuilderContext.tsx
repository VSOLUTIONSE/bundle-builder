'use client';

import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import data from '@/data/products.json';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  category: string;
  stepId: number;
  originalPrice: number;
  currentPrice: number;
  image: string;
  badge: string | null;
  free?: boolean;
  variants: { name: string; image: string }[];
  initialQty: number;
  minQty: number;
  reviewThumb: string;
}

type VariantQtys = Record<string, number>;
interface Quantities {
  [key: string]: number | VariantQtys;
}

interface Colors {
  [key: string]: string;
}

interface BuilderContextType {
  products: ProductData[];
  steps: typeof data.steps;
  plan: typeof data.plan;
  shipping: typeof data.shipping;
  ui: typeof data.ui;
  expandedStep: number;
  setExpandedStep: (id: number) => void;
  quantities: Quantities;
  updateQty: (id: string, delta: number, variantName?: string) => void;
  colors: Colors;
  setColor: (id: string, color: string) => void;
  getProductQty: (id: string) => number;
  getSelectedCount: (stepId: number) => number;
  getCategoryProducts: (category: string) => ProductData[];
  getStepProducts: (stepId: number) => ProductData[];
  total: { current: string; original: string; savings: string; monthly: string };
}

const BuilderContext = createContext<BuilderContextType | null>(null);

function buildInitialQuantities(products: ProductData[]): Quantities {
  const q: Quantities = {};
  for (const p of products) {
    if (p.variants.length > 0) {
      const variantQty: VariantQtys = {};
      for (let i = 0; i < p.variants.length; i++) {
        variantQty[p.variants[i].name] = i === 0 ? p.initialQty : 0;
      }
      q[p.id] = variantQty;
    } else {
      q[p.id] = p.initialQty;
    }
  }
  return q;
}

function buildInitialColors(products: ProductData[]): Colors {
  const c: Colors = {};
  for (const p of products) {
    if (p.variants.length > 0) {
      c[p.id] = p.variants[0].name;
    }
  }
  return c;
}

function getProductTotalQty(quantities: Quantities, productId: string): number {
  const q = quantities[productId];
  if (q === undefined) return 0;
  if (typeof q === 'number') return q;
  return Object.values(q).reduce((sum, v) => sum + v, 0);
}

export function BuilderProvider({ children }: { children: ReactNode }) {
  const products = data.products as ProductData[];
  const [expandedStep, setExpandedStep] = useState(1);
  const [quantities, setQuantities] = useState<Quantities>(() => buildInitialQuantities(products));
  const [colors, setColors] = useState<Colors>(() => buildInitialColors(products));

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
    return products
      .filter(p => p.stepId === stepId)
      .reduce((sum, p) => sum + getProductTotalQty(quantities, p.id), 0);
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
      current: `$${current.toFixed(2)}`,
      original: `$${original.toFixed(2)}`,
      savings: `$${savings.toFixed(2)}`,
      monthly: `$${monthly.toFixed(2)}`,
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

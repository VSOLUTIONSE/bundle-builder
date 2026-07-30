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

interface Quantities {
  [key: string]: number;
}

interface Colors {
  [key: string]: string;
}

interface BuilderContextType {
  products: ProductData[];
  steps: typeof data.steps;
  plan: typeof data.plan;
  shipping: typeof data.shipping;
  expandedStep: number;
  setExpandedStep: (id: number) => void;
  quantities: Quantities;
  updateQty: (id: string, delta: number) => void;
  colors: Colors;
  setColor: (id: string, color: string) => void;
  getSelectedCount: (stepId: number) => number;
  getCategoryProducts: (category: string) => ProductData[];
  getStepProducts: (stepId: number) => ProductData[];
  total: { current: string; original: string; savings: string; monthly: string };
}

const BuilderContext = createContext<BuilderContextType | null>(null);

function buildInitialQuantities(products: ProductData[]): Quantities {
  const q: Quantities = {};
  for (const p of products) {
    q[p.id] = p.initialQty;
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

export function BuilderProvider({ children }: { children: ReactNode }) {
  const products = data.products as ProductData[];
  const [expandedStep, setExpandedStep] = useState(1);
  const [quantities, setQuantities] = useState<Quantities>(() => buildInitialQuantities(products));
  const [colors, setColors] = useState<Colors>(() => buildInitialColors(products));

  const updateQty = useCallback((id: string, delta: number) => {
    setQuantities(prev => {
      const product = products.find(p => p.id === id);
      const min = product?.minQty ?? 0;
      return { ...prev, [id]: Math.max(min, (prev[id] ?? 0) + delta) };
    });
  }, [products]);

  const setColor = useCallback((id: string, color: string) => {
    setColors(prev => ({ ...prev, [id]: color }));
  }, []);

  const getSelectedCount = useCallback((stepId: number) => {
    return products
      .filter(p => p.stepId === stepId)
      .reduce((sum, p) => sum + (quantities[p.id] ?? 0), 0);
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
      const qty = quantities[p.id] ?? 0;
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
        expandedStep,
        setExpandedStep,
        quantities,
        updateQty,
        colors,
        setColor,
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

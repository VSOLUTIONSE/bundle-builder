import type { Colors, ProductData, Quantities, VariantQtys } from '@/types';

export function getProductTotalQty(
  quantities: Quantities,
  productId: string,
): number {
  const q = quantities[productId];
  if (q === undefined) return 0;
  if (typeof q === 'number') return q;
  return Object.values(q).reduce((sum, v) => sum + v, 0);
}

export function buildInitialQuantities(products: ProductData[]): Quantities {
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

export function buildInitialColors(products: ProductData[]): Colors {
  const c: Colors = {};
  for (const p of products) {
    if (p.variants.length > 0) {
      c[p.id] = p.variants[0].name;
    }
  }
  return c;
}

export function sanitizeQuantities(
  saved: Quantities | undefined,
  products: ProductData[],
): Quantities {
  const defaults = buildInitialQuantities(products);
  if (!saved || typeof saved !== 'object') return defaults;
  const result: Quantities = { ...defaults };
  for (const p of products) {
    const entry = saved[p.id];
    if (entry === undefined || entry === null) continue;
    if (p.variants.length > 0) {
      if (typeof entry === 'object') {
        const cleaned: VariantQtys = {};
        const defaultEntry = defaults[p.id] as VariantQtys;
        for (const v of p.variants) {
          const val = (entry as VariantQtys)[v.name];
          cleaned[v.name] =
            typeof val === 'number' && Number.isFinite(val) && val >= 0
              ? val
              : defaultEntry[v.name];
        }
        result[p.id] = cleaned;
      }
    } else if (
      typeof entry === 'number' &&
      Number.isFinite(entry) &&
      entry >= 0
    ) {
      result[p.id] = entry;
    }
  }
  return result;
}

export function sanitizeColors(
  saved: Colors | undefined,
  products: ProductData[],
): Colors {
  const defaults = buildInitialColors(products);
  if (!saved || typeof saved !== 'object') return defaults;
  const result: Colors = { ...defaults };
  for (const p of products) {
    if (p.variants.length === 0) continue;
    const val = saved[p.id];
    if (typeof val === 'string' && p.variants.some((v) => v.name === val)) {
      result[p.id] = val;
    }
  }
  return result;
}

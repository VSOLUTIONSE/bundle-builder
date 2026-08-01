import type { ProductData, SavedConfig } from '@/types';
import { sanitizeColors, sanitizeQuantities } from '@/lib/catalog';

export const STORAGE_KEY = 'bundle-builder:system-config';
export const STORAGE_VERSION = 1;

export function writeSavedConfig(config: SavedConfig): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // localStorage unavailable (private mode, quota) — ignore
  }
}

export function loadSavedConfig(
  products: ProductData[],
  stepsCount: number,
): SavedConfig | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<SavedConfig>;
    if (!parsed || parsed.version !== STORAGE_VERSION) return null;
    return {
      version: STORAGE_VERSION,
      quantities: sanitizeQuantities(parsed.quantities, products),
      colors: sanitizeColors(parsed.colors, products),
      expandedStep:
        typeof parsed.expandedStep === 'number' &&
        Number.isInteger(parsed.expandedStep) &&
        parsed.expandedStep >= 0 &&
        parsed.expandedStep <= stepsCount
          ? parsed.expandedStep
          : 1,
    };
  } catch {
    return null;
  }
}

let cachedSavedConfig: SavedConfig | null | undefined;

export function getInitialSavedConfig(
  products: ProductData[],
  stepsCount: number,
): SavedConfig | null {
  if (cachedSavedConfig === undefined) {
    cachedSavedConfig = loadSavedConfig(products, stepsCount);
  }
  return cachedSavedConfig;
}

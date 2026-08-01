export interface Variant {
  name: string;
  image: string;
}

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
  variants: Variant[];
  initialQty: number;
  minQty: number;
  reviewThumb: string;
}

export type VariantQtys = Record<string, number>;

export interface Quantities {
  [key: string]: number | VariantQtys;
}

export interface Colors {
  [key: string]: string;
}

export interface SavedConfig {
  version: number;
  quantities: Quantities;
  colors: Colors;
  expandedStep: number;
}

export interface Step {
  id: number;
  title: string;
  stepLabel: string;
  iconType: string;
  icon: string;
  category: string;
  nextLabel: string;
}

export interface Plan {
  name: string;
  originalPrice: number;
  currentPrice: number;
  period: string;
  image: string;
}

export interface Shipping {
  name: string;
  originalPrice: number;
  currentPrice: number;
  image: string;
  free: boolean;
}

export interface SatisfactionBadge {
  name: string;
  image: string;
  tabImage: string;
}

export interface UiData {
  satisfactionBadge: SatisfactionBadge;
}

export interface TotalSummary {
  current: string;
  original: string;
  savings: string;
  monthly: string;
}

export interface BuilderContextType {
  products: ProductData[];
  steps: Step[];
  plan: Plan;
  shipping: Shipping;
  ui: UiData;
  expandedStep: number;
  setExpandedStep: (id: number) => void;
  quantities: Quantities;
  updateQty: (id: string, delta: number, variantName?: string) => void;
  colors: Colors;
  setColor: (id: string, color: string) => void;
  saveConfig: () => void;
  getProductQty: (id: string) => number;
  getSelectedCount: (stepId: number) => number;
  getCategoryProducts: (category: string) => ProductData[];
  getStepProducts: (stepId: number) => ProductData[];
  total: TotalSummary;
}

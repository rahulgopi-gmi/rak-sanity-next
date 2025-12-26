export function normalizeArray<T>(value?: T | T[]): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export const formatPrice = (price:any) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

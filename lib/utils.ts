export function fmtMXN(n: number): string {
  return "$" + n.toLocaleString("es-MX");
}

export function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `hace ${diff}s`;
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  return `hace ${Math.floor(diff / 3600)} h`;
}

export function uid(): string {
  return (
    "BND-" +
    Math.random().toString(36).slice(2, 6).toUpperCase() +
    Date.now().toString(36).slice(-3).toUpperCase()
  );
}

export const CART_KEY = "bandidos_cart_v2";
export const ORDERS_KEY = "bandidos_orders_v2";

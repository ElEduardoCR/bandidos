export type MenuCategory =
  | "cortes"
  | "especialidades"
  | "entradas"
  | "acompanamientos"
  | "postres"
  | "bebidas";

export interface MenuItem {
  id: string;
  cat: MenuCategory;
  name: string;
  desc: string;
  price: number;
  image: string;
  tag?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export type OrderStatus = "received" | "preparing" | "ready" | "shipped";

export type PaymentMethod = "online" | "card_delivery" | "cash";

export interface Order {
  id: string;
  createdAt: number;
  status: OrderStatus;
  customer: {
    name: string;
    phone: string;
    address: string;
    notes?: string;
  };
  payment: {
    method: PaymentMethod;
    last4?: string;
    paid: boolean;
  };
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  statusHistory: { status: OrderStatus; at: number }[];
}

export const STATUS_ORDER: OrderStatus[] = [
  "received",
  "preparing",
  "ready",
  "shipped",
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  received: "Pedido recibido",
  preparing: "Preparando",
  ready: "Listo para enviar",
  shipped: "Enviado",
};

export const STATUS_DESC: Record<OrderStatus, string> = {
  received: "Hemos recibido tu pedido en cocina.",
  preparing: "Nuestros chefs están preparando tu orden.",
  ready: "Tu pedido está listo, esperando al repartidor.",
  shipped: "Tu pedido está en camino. ¡Buen provecho!",
};

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  online: "Pago en línea",
  card_delivery: "Tarjeta contra entrega",
  cash: "Efectivo",
};

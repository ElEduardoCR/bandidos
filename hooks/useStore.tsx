"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem, MenuItem, Order, OrderStatus } from "@/lib/types";
import { CART_KEY, ORDERS_KEY } from "@/lib/utils";

type ToastT = { id: number; msg: string };

interface StoreCtx {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  changeQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;

  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  revertOrderStatus: (id: string) => void;
  clearOrders: () => void;

  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  checkoutOpen: boolean;
  setCheckoutOpen: (v: boolean) => void;
  trackingOrder: Order | null;
  setTrackingOrder: (o: Order | null) => void;

  toasts: ToastT[];
  toast: (msg: string) => void;
}

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [toasts, setToasts] = useState<ToastT[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setCart(JSON.parse(c));
      const o = localStorage.getItem(ORDERS_KEY);
      if (o) setOrders(JSON.parse(o));
    } catch {}
    setHydrated(true);
  }, []);

  // persist
  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);
  useEffect(() => {
    if (hydrated) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  // cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === ORDERS_KEY && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === CART_KEY && e.newValue) {
        try {
          setCart(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addToCart = useCallback(
    (item: MenuItem) => {
      setCart((prev) => {
        const ex = prev.find((c) => c.id === item.id);
        if (ex) {
          return prev.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + 1 } : c
          );
        }
        return [
          ...prev,
          { id: item.id, name: item.name, price: item.price, image: item.image, qty: 1 },
        ];
      });
      toast(`${item.name} agregado al carrito`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const addOrder = useCallback((order: Order) => {
    setOrders((prev) => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? {
                ...o,
                status,
                statusHistory: [...o.statusHistory, { status, at: Date.now() }],
              }
            : o
        )
      );
    },
    []
  );

  const revertOrderStatus = useCallback((id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const order = ["received", "preparing", "ready", "shipped"] as const;
        const idx = order.indexOf(o.status);
        if (idx <= 0) return o;
        const newStatus = order[idx - 1];
        return {
          ...o,
          status: newStatus,
          statusHistory: o.statusHistory.filter(
            (h) => order.indexOf(h.status) <= idx - 1
          ),
        };
      })
    );
  }, []);

  const clearOrders = useCallback(() => setOrders([]), []);

  const toast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2400);
  }, []);

  const cartSubtotal = useMemo(
    () => cart.reduce((s, c) => s + c.price * c.qty, 0),
    [cart]
  );
  const cartCount = useMemo(
    () => cart.reduce((s, c) => s + c.qty, 0),
    [cart]
  );

  const value: StoreCtx = {
    cart,
    addToCart,
    changeQty,
    removeItem,
    clearCart,
    cartSubtotal,
    cartCount,
    orders,
    addOrder,
    updateOrderStatus,
    revertOrderStatus,
    clearOrders,
    cartOpen,
    setCartOpen,
    checkoutOpen,
    setCheckoutOpen,
    trackingOrder,
    setTrackingOrder,
    toasts,
    toast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}

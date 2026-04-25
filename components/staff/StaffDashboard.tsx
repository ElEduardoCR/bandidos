"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import OrderCard from "./OrderCard";
import OrderDetailModal from "./OrderDetailModal";
import {
  STATUS_ORDER,
  STATUS_LABEL,
  type CartItem,
  type Order,
  type OrderStatus,
} from "@/lib/types";
import { fmtMXN, uid } from "@/lib/utils";
import Toast from "../Toast";

const SAMPLE_NAMES = [
  "María González",
  "Juan Pérez",
  "Ana Martínez",
  "Carlos Ruiz",
  "Sofía López",
  "Diego Hernández",
];
const SAMPLE_ADDRESSES = [
  "Calle Reforma 123, Col. Centro",
  "Av. Insurgentes 456",
  "Calle Madero 78, Col. Roma",
  "Av. Universidad 1010",
];
const SAMPLE_ITEMS = [
  { id: "c1", name: "Ribeye Bandido", price: 480, image: "" },
  { id: "c4", name: "T-Bone Legendario", price: 580, image: "" },
  { id: "e1", name: "Costillas BBQ", price: 380, image: "" },
  { id: "a1", name: "Papas Bandido", price: 110, image: "" },
  { id: "b1", name: "Vino Tinto Reserva", price: 150, image: "" },
  { id: "p2", name: "Brownie con Helado", price: 120, image: "" },
];

const COL_THEME: Record<
  OrderStatus,
  { bg: string; tag: string; dot: string }
> = {
  received: {
    bg: "bg-bandido-blue/8",
    tag: "bg-bandido-blue text-white",
    dot: "bg-bandido-blue",
  },
  preparing: {
    bg: "bg-amber-500/8",
    tag: "bg-amber-500 text-white",
    dot: "bg-amber-500",
  },
  ready: {
    bg: "bg-bandido-brown/8",
    tag: "bg-bandido-brown text-white",
    dot: "bg-bandido-brown",
  },
  shipped: {
    bg: "bg-bandido-green/10",
    tag: "bg-bandido-green text-white",
    dot: "bg-bandido-green",
  },
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function StaffDashboard() {
  const {
    orders,
    addOrder,
    updateOrderStatus,
    revertOrderStatus,
    clearOrders,
    toast,
  } = useStore();
  const [detail, setDetail] = useState<Order | null>(null);

  const stats = useMemo(() => {
    const today = orders.filter(
      (o) => Date.now() - o.createdAt < 24 * 3600 * 1000
    );
    const totalRevenue = orders
      .filter((o) => o.status === "shipped")
      .reduce((s, o) => s + o.total, 0);
    const inProgress = orders.filter((o) => o.status !== "shipped").length;
    const avgTicket = orders.length
      ? Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length)
      : 0;
    return { today: today.length, totalRevenue, inProgress, avgTicket };
  }, [orders]);

  const advance = (o: Order) => {
    const idx = STATUS_ORDER.indexOf(o.status);
    if (idx >= STATUS_ORDER.length - 1) return;
    const next = STATUS_ORDER[idx + 1];
    updateOrderStatus(o.id, next);
    toast(`${o.id} → ${STATUS_LABEL[next]}`);
  };

  const seedOrder = () => {
    const itemCount = 1 + Math.floor(Math.random() * 3);
    const items: CartItem[] = [];
    for (let i = 0; i < itemCount; i++) {
      const it = pick(SAMPLE_ITEMS);
      const ex = items.find((x) => x.id === it.id);
      if (ex) ex.qty++;
      else items.push({ ...it, qty: 1 });
    }
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    const payment = pick(["online", "card_delivery", "cash"] as const);
    const order: Order = {
      id: uid(),
      createdAt: Date.now(),
      status: "received",
      customer: {
        name: pick(SAMPLE_NAMES),
        phone: "55" + Math.floor(10000000 + Math.random() * 89999999),
        address: pick(SAMPLE_ADDRESSES),
        notes: "",
      },
      payment: {
        method: payment,
        last4:
          payment === "online"
            ? String(Math.floor(1000 + Math.random() * 9000))
            : undefined,
        paid: payment === "online",
      },
      items,
      subtotal,
      shipping: 50,
      total: subtotal + 50,
      statusHistory: [{ status: "received", at: Date.now() }],
    };
    addOrder(order);
    toast(`Pedido demo: ${order.id}`);
  };

  return (
    <div className="min-h-screen bg-bandido-cream">
      <header className="bg-bandido-brown text-white sticky top-0 z-30">
        <div className="max-w-[1700px] mx-auto px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-bandido-green">
              <Image
                src="/logo.jpg"
                alt="Bandidos"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="font-condensed text-xl tracking-wider">
                <span className="text-bandido-green">BANDIDOS</span> · Panel de pedidos
              </h1>
              <p className="text-[11px] text-white/60">Gestión en tiempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bandido-green/20 border border-bandido-green/40 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bandido-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-bandido-green" />
              </span>
              EN VIVO
            </span>
            <button
              onClick={seedOrder}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" /> Pedido demo
            </button>
            <button
              onClick={() => {
                if (confirm("¿Eliminar todos los pedidos?")) clearOrders();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-red-500/30 text-xs font-semibold transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> Limpiar
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Sitio
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-[1700px] mx-auto px-6 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Pedidos hoy" value={stats.today} accent="blue" />
          <Stat label="En proceso" value={stats.inProgress} accent="amber" />
          <Stat
            label="Ticket promedio"
            value={fmtMXN(stats.avgTicket)}
            accent="brown"
          />
          <Stat
            label="Vendido entregado"
            value={fmtMXN(stats.totalRevenue)}
            accent="green"
          />
        </div>
      </section>

      <section className="max-w-[1700px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUS_ORDER.map((status) => {
            const list = orders.filter((o) => o.status === status);
            const theme = COL_THEME[status];
            return (
              <div
                key={status}
                className={`rounded-3xl border border-black/5 overflow-hidden flex flex-col min-h-[400px] ${theme.bg}`}
              >
                <div className="px-4 py-3.5 flex items-center justify-between bg-white/60 backdrop-blur border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
                    <h3 className="font-bold text-bandido-brown text-sm uppercase tracking-wider">
                      {STATUS_LABEL[status]}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${theme.tag}`}
                  >
                    {list.length}
                  </span>
                </div>
                <div className="flex-1 p-3 space-y-2.5 overflow-y-auto thin-scroll max-h-[70vh]">
                  <AnimatePresence>
                    {list.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-12 text-sm italic text-bandido-ink/40"
                      >
                        Sin pedidos
                      </motion.div>
                    ) : (
                      list.map((o) => (
                        <OrderCard
                          key={o.id}
                          order={o}
                          onAdvance={() => advance(o)}
                          onRevert={() => revertOrderStatus(o.id)}
                          onClick={() => setDetail(o)}
                        />
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <OrderDetailModal order={detail} onClose={() => setDetail(null)} />
      <Toast />
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: "blue" | "amber" | "brown" | "green";
}) {
  const colors = {
    blue: "text-bandido-blue",
    amber: "text-amber-600",
    brown: "text-bandido-brown",
    green: "text-bandido-green",
  };
  return (
    <div className="bg-white rounded-2xl p-4 border border-black/5 hover:border-bandido-green/30 transition">
      <div className="text-[11px] uppercase tracking-wider text-bandido-ink/50 font-semibold">
        {label}
      </div>
      <div
        className={`font-condensed text-3xl tracking-wider mt-1 ${colors[accent]}`}
      >
        {value}
      </div>
    </div>
  );
}

"use client";

import { motion } from "motion/react";
import { Check, MapPin, CreditCard, Phone, Receipt } from "lucide-react";
import type { Order } from "@/lib/types";
import {
  STATUS_ORDER,
  STATUS_LABEL,
  STATUS_DESC,
  PAYMENT_LABEL,
} from "@/lib/types";
import { fmtMXN } from "@/lib/utils";

export default function OrderTracker({
  order,
  compact = false,
}: {
  order: Order;
  compact?: boolean;
}) {
  const idx = STATUS_ORDER.indexOf(order.status);
  const fillPct = (idx / (STATUS_ORDER.length - 1)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-bandido-green to-bandido-green-dark grid place-items-center mb-4 shadow-xl shadow-bandido-green/30"
        >
          <Check className="w-7 h-7 text-white" strokeWidth={3} />
        </motion.div>
        <h4 className="font-display text-2xl text-bandido-brown font-bold">
          {compact
            ? `¡Hola, ${order.customer.name.split(" ")[0]}!`
            : `Hola, ${order.customer.name.split(" ")[0]}`}
        </h4>
        <p className="text-bandido-ink/60 text-sm mt-1">
          {STATUS_DESC[order.status]}
        </p>
        <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-bandido-cream font-condensed tracking-widest text-sm text-bandido-brown">
          {order.id}
        </div>
      </div>

      {/* Stepper */}
      <ol className="relative">
        <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-bandido-cream" />
        <motion.div
          className="absolute left-[19px] top-3 w-0.5 bg-gradient-to-b from-bandido-green to-bandido-green-dark"
          initial={{ height: 0 }}
          animate={{ height: `${fillPct}%` }}
          transition={{ duration: 0.7 }}
        />
        {STATUS_ORDER.map((s, i) => {
          const done = i < idx;
          const current = i === idx;
          const hist = order.statusHistory.find((h) => h.status === s);
          const time = hist
            ? new Date(hist.at).toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : null;
          return (
            <li key={s} className="relative flex items-center gap-4 py-3">
              <div
                className={`relative z-10 w-10 h-10 rounded-full grid place-items-center transition-all ${
                  done || current
                    ? "bg-bandido-green text-white"
                    : "bg-bandido-cream text-bandido-ink/40"
                } ${current ? "ring-4 ring-bandido-green/20" : ""}`}
              >
                {done ? (
                  <Check className="w-5 h-5" strokeWidth={3} />
                ) : current ? (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-white"
                  />
                ) : (
                  <span className="font-bold text-sm">{i + 1}</span>
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`font-semibold text-sm ${
                    done || current
                      ? "text-bandido-brown"
                      : "text-bandido-ink/40"
                  }`}
                >
                  {STATUS_LABEL[s]}
                </div>
                <div className="text-xs text-bandido-ink/50">
                  {current
                    ? STATUS_DESC[s]
                    : done
                    ? time || "Completado"
                    : "Pendiente"}
                </div>
              </div>
              {time && (done || current) && (
                <span className="text-[11px] font-medium text-bandido-ink/50 tabular-nums">
                  {time}
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <SummaryCard
          icon={MapPin}
          label="Dirección"
          value={order.customer.address}
        />
        <SummaryCard
          icon={CreditCard}
          label="Pago"
          value={PAYMENT_LABEL[order.payment.method]}
          sub={order.payment.last4 ? `····${order.payment.last4}` : undefined}
        />
        <SummaryCard
          icon={Phone}
          label="Cliente"
          value={order.customer.name}
          sub={order.customer.phone}
        />
        <SummaryCard
          icon={Receipt}
          label="Total"
          value={fmtMXN(order.total)}
          sub={`${order.items.length} ${
            order.items.length === 1 ? "platillo" : "platillos"
          }`}
        />
      </div>

      {!compact && (
        <div className="bg-bandido-cream rounded-2xl overflow-hidden">
          {order.items.map((it, i) => (
            <div
              key={it.id + i}
              className="flex items-center justify-between px-4 py-3 border-b border-white last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white grid place-items-center font-bold text-bandido-brown text-xs">
                  {it.qty}×
                </div>
                <span className="text-sm font-medium text-bandido-ink">
                  {it.name}
                </span>
              </div>
              <span className="text-sm text-bandido-ink/60">
                {fmtMXN(it.price * it.qty)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="bg-bandido-cream rounded-2xl p-4">
      <div className="flex items-center gap-1.5 text-[11px] text-bandido-ink/50 uppercase tracking-wider mb-1 font-semibold">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <p className="text-sm font-semibold text-bandido-brown leading-tight">
        {value}
      </p>
      {sub && <p className="text-xs text-bandido-ink/50 mt-0.5">{sub}</p>}
    </div>
  );
}

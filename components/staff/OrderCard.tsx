"use client";

import { motion } from "motion/react";
import { ChevronRight, ChevronLeft, Clock } from "lucide-react";
import type { Order } from "@/lib/types";
import { STATUS_ORDER, PAYMENT_LABEL } from "@/lib/types";
import { fmtMXN, timeAgo } from "@/lib/utils";

const NEXT_LABEL: Record<Order["status"], string | null> = {
  received: "Iniciar preparación",
  preparing: "Marcar listo",
  ready: "Marcar enviado",
  shipped: null,
};

const PAY_BADGE: Record<Order["payment"]["method"], string> = {
  online: "bg-bandido-green/15 text-bandido-green-dark",
  card_delivery: "bg-bandido-blue/15 text-bandido-blue",
  cash: "bg-bandido-brown/15 text-bandido-brown",
};

export default function OrderCard({
  order,
  onAdvance,
  onRevert,
  onClick,
}: {
  order: Order;
  onAdvance: () => void;
  onRevert: () => void;
  onClick: () => void;
}) {
  const idx = STATUS_ORDER.indexOf(order.status);
  const nextLabel = NEXT_LABEL[order.status];
  const canRevert = idx > 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="group bg-white rounded-2xl p-4 border border-black/5 cursor-pointer hover:shadow-lg hover:border-bandido-green/30 hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-condensed tracking-wider text-bandido-brown text-sm">
          {order.id}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-bandido-ink/40">
          <Clock className="w-3 h-3" />
          {timeAgo(order.createdAt)}
        </span>
      </div>

      <div className="font-semibold text-bandido-ink text-sm mb-0.5">
        {order.customer.name}
      </div>
      <div className="text-xs text-bandido-ink/50 line-clamp-2 leading-relaxed mb-3">
        {order.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-dashed border-black/5">
        <span className="font-condensed text-xl text-bandido-green">
          {fmtMXN(order.total)}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            PAY_BADGE[order.payment.method]
          }`}
        >
          {PAYMENT_LABEL[order.payment.method].split(" ")[0]}
        </span>
      </div>

      <div className="flex gap-1.5 mt-3" onClick={(e) => e.stopPropagation()}>
        {canRevert && (
          <button
            onClick={onRevert}
            className="px-2 py-1.5 rounded-lg text-xs text-bandido-ink/50 hover:bg-bandido-cream hover:text-bandido-brown transition flex items-center gap-1"
            aria-label="Atrás"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {nextLabel && (
          <button
            onClick={onAdvance}
            className="flex-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-bandido-green text-white hover:bg-bandido-green-dark transition flex items-center justify-center gap-1"
          >
            {nextLabel}
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </motion.article>
  );
}

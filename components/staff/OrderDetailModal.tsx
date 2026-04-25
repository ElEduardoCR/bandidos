"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Phone, MapPin, CreditCard, FileText } from "lucide-react";
import type { Order } from "@/lib/types";
import {
  STATUS_ORDER,
  STATUS_LABEL,
  PAYMENT_LABEL,
} from "@/lib/types";
import { fmtMXN } from "@/lib/utils";

export default function OrderDetailModal({
  order,
  onClose,
}: {
  order: Order | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[90] grid place-items-center px-4 py-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl pointer-events-auto"
            >
              <header className="flex items-center justify-between px-6 py-5 border-b border-black/5">
                <div>
                  <p className="text-xs text-bandido-ink/50 uppercase tracking-wider mb-0.5">
                    Pedido
                  </p>
                  <h3 className="font-condensed text-2xl text-bandido-brown tracking-wider">
                    {order.id}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-bandido-cream hover:bg-black/5 grid place-items-center text-bandido-brown"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto thin-scroll px-6 py-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Info
                    icon={Phone}
                    label="Cliente"
                    value={order.customer.name}
                    sub={order.customer.phone}
                  />
                  <Info
                    icon={CreditCard}
                    label="Pago"
                    value={PAYMENT_LABEL[order.payment.method]}
                    sub={
                      order.payment.last4
                        ? `····${order.payment.last4}`
                        : order.payment.paid
                        ? "Pagado"
                        : "Pendiente al recibir"
                    }
                  />
                  <Info
                    icon={MapPin}
                    label="Dirección"
                    value={order.customer.address}
                    span2
                  />
                  {order.customer.notes && (
                    <Info
                      icon={FileText}
                      label="Notas"
                      value={order.customer.notes}
                      span2
                    />
                  )}
                </div>

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
                  <div className="bg-white px-4 py-3 space-y-1 text-sm">
                    <div className="flex justify-between text-bandido-ink/60">
                      <span>Subtotal</span>
                      <span>{fmtMXN(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-bandido-ink/60">
                      <span>Envío</span>
                      <span>{fmtMXN(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 mt-1 border-t border-black/5">
                      <span className="text-bandido-brown">Total</span>
                      <span className="font-condensed text-xl text-bandido-green">
                        {fmtMXN(order.total)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-bandido-cream rounded-2xl p-4">
                  <h4 className="text-xs uppercase tracking-wider text-bandido-ink/50 font-semibold mb-3">
                    Historial de estados
                  </h4>
                  <ol className="space-y-2">
                    {STATUS_ORDER.map((s) => {
                      const hist = order.statusHistory.find(
                        (h) => h.status === s
                      );
                      const done = !!hist;
                      const time = hist
                        ? new Date(hist.at).toLocaleTimeString("es-MX", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : null;
                      return (
                        <li
                          key={s}
                          className="flex items-center gap-3 text-sm"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${
                              done ? "bg-bandido-green" : "bg-bandido-ink/15"
                            }`}
                          />
                          <span
                            className={
                              done
                                ? "text-bandido-brown font-medium"
                                : "text-bandido-ink/40"
                            }
                          >
                            {STATUS_LABEL[s]}
                          </span>
                          {time && (
                            <span className="ml-auto text-xs text-bandido-ink/40">
                              {time}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  sub,
  span2,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  sub?: string;
  span2?: boolean;
}) {
  return (
    <div
      className={`bg-bandido-cream rounded-2xl p-4 ${span2 ? "col-span-2" : ""}`}
    >
      <div className="flex items-center gap-1.5 text-[11px] text-bandido-ink/50 uppercase tracking-wider mb-1">
        <Icon className="w-3 h-3" />
        {label}
      </div>
      <div className="text-sm font-semibold text-bandido-brown leading-tight">
        {value}
      </div>
      {sub && <div className="text-xs text-bandido-ink/50 mt-0.5">{sub}</div>}
    </div>
  );
}

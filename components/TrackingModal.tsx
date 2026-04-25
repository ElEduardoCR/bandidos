"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check, X, MapPin, CreditCard } from "lucide-react";
import { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import { fmtMXN } from "@/lib/utils";
import {
  STATUS_ORDER,
  STATUS_LABEL,
  STATUS_DESC,
  PAYMENT_LABEL,
} from "@/lib/types";

export default function TrackingModal() {
  const { trackingOrder, setTrackingOrder, orders } = useStore();

  // keep tracking order in sync with orders array (so staff updates reflect live)
  useEffect(() => {
    if (!trackingOrder) return;
    const fresh = orders.find((o) => o.id === trackingOrder.id);
    if (fresh && fresh.status !== trackingOrder.status) {
      setTrackingOrder(fresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  const order = trackingOrder;
  const idx = order ? STATUS_ORDER.indexOf(order.status) : -1;

  return (
    <AnimatePresence>
      {order && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setTrackingOrder(null)}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[90] grid place-items-center px-4 py-6 pointer-events-none">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 280 }}
              className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl pointer-events-auto"
            >
              <header className="flex items-center justify-between px-6 py-4 border-b border-black/5">
                <h3 className="font-display text-xl text-bandido-brown font-bold">
                  Seguimiento del pedido
                </h3>
                <button
                  onClick={() => setTrackingOrder(null)}
                  className="w-9 h-9 rounded-full bg-bandido-cream hover:bg-black/5 grid place-items-center text-bandido-brown"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto thin-scroll px-6 py-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12, stiffness: 200 }}
                  className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-bandido-green to-bandido-green-dark grid place-items-center mb-4 shadow-xl shadow-bandido-green/30"
                >
                  <Check className="w-7 h-7 text-white" strokeWidth={3} />
                </motion.div>
                <div className="text-center mb-7">
                  <h4 className="font-display text-2xl text-bandido-brown font-bold">
                    ¡Gracias, {order.customer.name.split(" ")[0]}!
                  </h4>
                  <p className="text-bandido-ink/60 text-sm mt-1">
                    Tu pedido fue confirmado correctamente
                  </p>
                  <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-bandido-cream font-condensed tracking-widest text-sm text-bandido-brown">
                    {order.id}
                  </div>
                </div>

                {/* Stepper */}
                <ol className="relative space-y-1">
                  <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-bandido-cream" />
                  <motion.div
                    className="absolute left-[19px] top-3 w-0.5 bg-gradient-to-b from-bandido-green to-bandido-green-dark"
                    initial={{ height: 0 }}
                    animate={{
                      height: `calc(${(idx / (STATUS_ORDER.length - 1)) * 100}% - 0px)`,
                    }}
                    transition={{ duration: 0.6 }}
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
                      <li
                        key={s}
                        className="relative flex items-center gap-4 py-3"
                      >
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
                              : time || "Pendiente"}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {/* Summary */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-bandido-cream rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-xs text-bandido-ink/50 mb-1">
                      <MapPin className="w-3.5 h-3.5" /> Dirección
                    </div>
                    <p className="text-sm font-medium text-bandido-brown leading-tight">
                      {order.customer.address}
                    </p>
                  </div>
                  <div className="bg-bandido-cream rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-xs text-bandido-ink/50 mb-1">
                      <CreditCard className="w-3.5 h-3.5" /> Pago
                    </div>
                    <p className="text-sm font-medium text-bandido-brown leading-tight">
                      {PAYMENT_LABEL[order.payment.method]}
                      {order.payment.last4 && ` ····${order.payment.last4}`}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 px-1 text-sm">
                  <span className="text-bandido-ink/60">Total pagado</span>
                  <span className="font-condensed text-2xl text-bandido-green">
                    {fmtMXN(order.total)}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

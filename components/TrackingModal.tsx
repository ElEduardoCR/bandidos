"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useStore } from "@/hooks/useStore";
import OrderTracker from "./OrderTracker";

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
                  Pedido confirmado
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
                <OrderTracker order={order} compact />

                <Link
                  href={`/rastrear?id=${encodeURIComponent(order.id)}`}
                  onClick={() => setTrackingOrder(null)}
                  className="mt-6 flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-bandido-brown text-white font-semibold hover:bg-bandido-brown-light transition group"
                >
                  Abrir rastreo en una página
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </Link>
                <p className="text-[11px] text-bandido-ink/40 text-center mt-2">
                  Guarda tu folio <strong className="text-bandido-brown">{order.id}</strong> para consultarlo cuando quieras
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

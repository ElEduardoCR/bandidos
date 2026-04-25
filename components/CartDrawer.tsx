"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { fmtMXN } from "@/lib/utils";
import { SHIPPING_FEE } from "@/lib/menu";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    changeQty,
    removeItem,
    cartSubtotal,
    setCheckoutOpen,
  } = useStore();

  const total = cartSubtotal + (cart.length ? SHIPPING_FEE : 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 z-[70] h-screen w-full max-w-md bg-white flex flex-col shadow-2xl"
          >
            <header className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <h3 className="font-display text-2xl text-bandido-brown font-bold">
                  Tu pedido
                </h3>
                <p className="text-xs text-bandido-ink/50">
                  {cart.length} {cart.length === 1 ? "platillo" : "platillos"}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full bg-bandido-cream hover:bg-black/5 grid place-items-center text-bandido-brown"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto thin-scroll px-6 py-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-bandido-cream grid place-items-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-bandido-brown/40" />
                  </div>
                  <p className="text-bandido-ink/60">Tu carrito está vacío</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-5 text-sm font-semibold text-bandido-green hover:underline"
                  >
                    Ver el menú →
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  <AnimatePresence>
                    {cart.map((c) => (
                      <motion.li
                        key={c.id}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 p-3 bg-bandido-cream rounded-2xl"
                      >
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={c.image}
                            alt={c.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2">
                            <h4 className="font-semibold text-bandido-brown text-sm leading-tight">
                              {c.name}
                            </h4>
                            <button
                              onClick={() => removeItem(c.id)}
                              className="text-bandido-ink/30 hover:text-red-500 transition flex-shrink-0"
                              aria-label="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-bandido-green font-semibold text-sm mt-1">
                            {fmtMXN(c.price)}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => changeQty(c.id, -1)}
                              className="w-7 h-7 rounded-full bg-white text-bandido-brown grid place-items-center hover:bg-bandido-brown hover:text-white transition"
                            >
                              <Minus className="w-3 h-3" strokeWidth={2.5} />
                            </button>
                            <span className="font-bold text-sm min-w-[20px] text-center">
                              {c.qty}
                            </span>
                            <button
                              onClick={() => changeQty(c.id, 1)}
                              className="w-7 h-7 rounded-full bg-white text-bandido-brown grid place-items-center hover:bg-bandido-green hover:text-white transition"
                            >
                              <Plus className="w-3 h-3" strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-black/5 p-6 bg-bandido-cream/50">
                <div className="space-y-1.5 text-sm mb-5">
                  <div className="flex justify-between text-bandido-ink/60">
                    <span>Subtotal</span>
                    <span>{fmtMXN(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-bandido-ink/60">
                    <span>Envío</span>
                    <span>{fmtMXN(SHIPPING_FEE)}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-2 border-t border-black/10">
                    <span className="font-semibold text-bandido-ink">Total</span>
                    <span className="font-condensed text-2xl text-bandido-green">
                      {fmtMXN(total)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className="w-full py-4 rounded-2xl bg-bandido-green text-white font-semibold hover:bg-bandido-green-dark transition shadow-lg shadow-bandido-green/30"
                >
                  Continuar al pago
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

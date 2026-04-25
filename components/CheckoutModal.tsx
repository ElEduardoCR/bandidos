"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, FormEvent } from "react";
import { X, CreditCard, Banknote, Wallet, Loader2 } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { fmtMXN, uid } from "@/lib/utils";
import { SHIPPING_FEE } from "@/lib/menu";
import type { Order, PaymentMethod } from "@/lib/types";

const PAY_OPTS: {
  value: PaymentMethod;
  title: string;
  sub: string;
  icon: typeof CreditCard;
}[] = [
  {
    value: "online",
    title: "Pago en línea",
    sub: "Tarjeta de crédito o débito",
    icon: CreditCard,
  },
  {
    value: "card_delivery",
    title: "Tarjeta contra entrega",
    sub: "Paga con tarjeta al recibir",
    icon: Wallet,
  },
  {
    value: "cash",
    title: "Efectivo",
    sub: "Paga en efectivo al recibir",
    icon: Banknote,
  },
];

export default function CheckoutModal() {
  const {
    cart,
    cartSubtotal,
    checkoutOpen,
    setCheckoutOpen,
    addOrder,
    clearCart,
    setTrackingOrder,
    toast,
  } = useStore();

  const [payment, setPayment] = useState<PaymentMethod>("online");
  const [card, setCard] = useState({ number: "", exp: "", cvv: "" });
  const [submitting, setSubmitting] = useState(false);

  const total = cartSubtotal + SHIPPING_FEE;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const delay = payment === "online" ? 1600 : 700;

    await new Promise((r) => setTimeout(r, delay));

    const order: Order = {
      id: uid(),
      createdAt: Date.now(),
      status: "received",
      customer: {
        name: String(fd.get("name") || ""),
        phone: String(fd.get("phone") || ""),
        address: String(fd.get("address") || ""),
        notes: String(fd.get("notes") || ""),
      },
      payment: {
        method: payment,
        last4:
          payment === "online"
            ? card.number.replace(/\s/g, "").slice(-4)
            : undefined,
        paid: payment === "online",
      },
      items: cart,
      subtotal: cartSubtotal,
      shipping: SHIPPING_FEE,
      total,
      statusHistory: [{ status: "received", at: Date.now() }],
    };

    addOrder(order);
    clearCart();
    setSubmitting(false);
    setCheckoutOpen(false);
    setTrackingOrder(order);
    toast("¡Pedido confirmado!");
  };

  const formatCardNumber = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 16);
    return d.replace(/(\d{4})(?=\d)/g, "$1 ");
  };
  const formatExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitting && setCheckoutOpen(false)}
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
                  <h3 className="font-display text-2xl text-bandido-brown font-bold">
                    Finalizar pedido
                  </h3>
                  <p className="text-xs text-bandido-ink/50">
                    Total a pagar: {fmtMXN(total)}
                  </p>
                </div>
                <button
                  onClick={() => !submitting && setCheckoutOpen(false)}
                  className="w-10 h-10 rounded-full bg-bandido-cream hover:bg-black/5 grid place-items-center text-bandido-brown"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </header>

              <form
                onSubmit={onSubmit}
                className="flex-1 overflow-y-auto thin-scroll px-6 py-5 space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Nombre" name="name" required />
                  <Field label="Teléfono" name="phone" type="tel" required />
                </div>
                <Field label="Dirección de entrega" name="address" required />
                <Field
                  label="Notas (opcional)"
                  name="notes"
                  textarea
                  placeholder="Término de la carne, alergias, etc."
                />

                <div className="pt-3">
                  <h4 className="text-sm font-bold text-bandido-brown mb-3">
                    Método de pago
                  </h4>
                  <div className="space-y-2">
                    {PAY_OPTS.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPayment(p.value)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition ${
                          payment === p.value
                            ? "border-bandido-green bg-bandido-green/5 shadow-sm"
                            : "border-bandido-cream hover:border-bandido-brown/20"
                        }`}
                      >
                        <div
                          className={`w-11 h-11 rounded-xl grid place-items-center transition ${
                            payment === p.value
                              ? "bg-bandido-green text-white"
                              : "bg-bandido-cream text-bandido-brown"
                          }`}
                        >
                          <p.icon className="w-5 h-5" strokeWidth={2.2} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-bandido-brown text-sm">
                            {p.title}
                          </div>
                          <div className="text-xs text-bandido-ink/50">
                            {p.sub}
                          </div>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 transition ${
                            payment === p.value
                              ? "border-bandido-green bg-bandido-green"
                              : "border-bandido-brown/20"
                          }`}
                        >
                          {payment === p.value && (
                            <div className="w-full h-full rounded-full bg-bandido-green ring-4 ring-white ring-inset" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {payment === "online" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-bandido-cream rounded-2xl p-4 space-y-3 mt-2">
                        <div>
                          <label className="text-xs font-semibold text-bandido-brown/70 mb-1 block">
                            Número de tarjeta
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                            value={card.number}
                            onChange={(e) =>
                              setCard({
                                ...card,
                                number: formatCardNumber(e.target.value),
                              })
                            }
                            required={payment === "online"}
                            className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white outline-none focus:border-bandido-green transition text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-semibold text-bandido-brown/70 mb-1 block">
                              Vencimiento
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="MM/AA"
                              maxLength={5}
                              value={card.exp}
                              onChange={(e) =>
                                setCard({
                                  ...card,
                                  exp: formatExp(e.target.value),
                                })
                              }
                              required={payment === "online"}
                              className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white outline-none focus:border-bandido-green transition text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-semibold text-bandido-brown/70 mb-1 block">
                              CVV
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              placeholder="123"
                              maxLength={4}
                              value={card.cvv}
                              onChange={(e) =>
                                setCard({
                                  ...card,
                                  cvv: e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 4),
                                })
                              }
                              required={payment === "online"}
                              className="w-full px-4 py-3 rounded-xl border border-black/5 bg-white outline-none focus:border-bandido-green transition text-sm"
                            />
                          </div>
                        </div>
                        <p className="text-[11px] text-bandido-blue bg-bandido-blue/10 px-3 py-2 rounded-lg font-medium">
                          ⚡ Esta es una simulación. No se procesa ningún pago real.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-bandido-cream rounded-2xl p-4 text-sm space-y-1 mt-3">
                  <div className="flex justify-between text-bandido-ink/60">
                    <span>Subtotal</span>
                    <span>{fmtMXN(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-bandido-ink/60">
                    <span>Envío</span>
                    <span>{fmtMXN(SHIPPING_FEE)}</span>
                  </div>
                  <div className="flex justify-between pt-2 mt-1 border-t border-black/10 font-semibold">
                    <span className="text-bandido-brown">Total</span>
                    <span className="font-condensed text-2xl text-bandido-green">
                      {fmtMXN(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-bandido-green text-white font-semibold hover:bg-bandido-green-dark transition shadow-lg shadow-bandido-green/30 disabled:opacity-70 disabled:cursor-wait flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {submitting
                    ? payment === "online"
                      ? "Procesando pago..."
                      : "Confirmando pedido..."
                    : "Confirmar pedido"}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
}) {
  const cls =
    "w-full px-4 py-3 rounded-xl border border-black/5 bg-bandido-cream outline-none focus:border-bandido-green focus:bg-white transition text-sm";
  return (
    <label className="block">
      <span className="text-xs font-semibold text-bandido-brown/70 mb-1 block">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={2}
          placeholder={placeholder}
          className={cls}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChefHat, Package, Bike, CheckCircle2, Search } from "lucide-react";

const STEPS = [
  { icon: CheckCircle2, label: "Pedido recibido", desc: "Confirmación instantánea" },
  { icon: ChefHat, label: "Preparando", desc: "En la cocina al fuego" },
  { icon: Package, label: "Listo para enviar", desc: "Empacado y caliente" },
  { icon: Bike, label: "Enviado", desc: "En camino a tu puerta" },
];

export default function TrackingPromo() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-br from-bandido-blue-dark via-bandido-blue to-bandido-blue-dark text-white overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-bandido-green/20 rounded-full blur-[100px]" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto text-center">
        <p className="font-condensed text-white/70 tracking-[0.4em] text-sm mb-3">
          TECNOLOGÍA · TIEMPO REAL
        </p>
        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight text-balance">
          Sigue tu pedido <em className="text-bandido-green">al instante</em>
        </h2>
        <p className="text-white/70 mt-5 text-lg max-w-2xl mx-auto">
          Desde el momento en que tu pedido entra a la cocina hasta que llega a
          tu puerta, tendrás visibilidad total del proceso.
        </p>

        <Link
          href="/rastrear"
          className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-bandido-green text-white font-semibold hover:bg-bandido-green-dark hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-bandido-green/40"
        >
          <Search className="w-4 h-4" />
          Rastrear mi pedido
        </Link>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bandido-green to-bandido-green-dark mx-auto grid place-items-center mb-4 shadow-lg shadow-bandido-green/40">
                  <s.icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                </div>
                <div className="font-condensed text-xl tracking-wide">
                  {s.label}
                </div>
                <div className="text-xs text-white/60 mt-1">{s.desc}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-px bg-white/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

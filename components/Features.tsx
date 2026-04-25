"use client";

import { motion } from "motion/react";
import { Beef, ShoppingBag, Radar, Sparkles } from "lucide-react";

const features = [
  {
    icon: Beef,
    title: "Cortes Premium",
    desc: "Carnes seleccionadas, maduradas en seco y preparadas a la perfección.",
  },
  {
    icon: ShoppingBag,
    title: "Pedidos en Línea",
    desc: "Ordena desde cualquier lugar y recibe tu pedido caliente en tiempo récord.",
  },
  {
    icon: Radar,
    title: "Rastreo en Tiempo Real",
    desc: "Sigue tu pedido paso a paso desde la cocina hasta tu puerta.",
  },
  {
    icon: Sparkles,
    title: "Sabor Legendario",
    desc: "Recetas heredadas, fuego de carbón y la pasión de cuatro décadas.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-bandido-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative bg-white rounded-3xl p-7 border border-black/5 hover:border-bandido-green/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-bandido-brown/5"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bandido-green to-bandido-green-dark grid place-items-center mb-5 group-hover:scale-110 transition">
                <f.icon className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-2xl text-bandido-brown mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-bandido-ink/60 leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { CATEGORIES, MENU } from "@/lib/menu";
import { useStore } from "@/hooks/useStore";
import { fmtMXN } from "@/lib/utils";
import type { MenuCategory } from "@/lib/types";

export default function MenuSection() {
  const [active, setActive] = useState<MenuCategory>("cortes");
  const { addToCart } = useStore();
  const items = MENU.filter((m) => m.cat === active);

  return (
    <section id="menu" className="py-28 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-condensed text-bandido-green text-sm tracking-[0.4em] mb-3">
            NUESTRA CARTA
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-bandido-brown font-black leading-tight text-balance">
            El menú de la <em className="text-bandido-green">leyenda</em>
          </h2>
          <p className="text-bandido-ink/60 mt-5 text-lg">
            Selecciona tus platillos favoritos. Cada corte cuenta una historia.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                active === c.id
                  ? "bg-bandido-brown text-white shadow-lg shadow-bandido-brown/30 scale-[1.03]"
                  : "bg-bandido-cream text-bandido-brown/70 hover:bg-bandido-brown/10 hover:text-bandido-brown"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {items.map((it) => (
              <motion.article
                key={it.id}
                layout
                whileHover={{ y: -4 }}
                className="group relative bg-bandido-cream rounded-3xl overflow-hidden border border-black/5 transition-shadow hover:shadow-2xl hover:shadow-bandido-brown/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bandido-brown">
                  <Image
                    src={it.image}
                    alt={it.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  {it.tag && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-bandido-brown text-[10px] font-bold uppercase tracking-wider">
                      {it.tag}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="font-condensed text-3xl text-white drop-shadow-lg">
                      {fmtMXN(it.price)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="font-display text-xl text-bandido-brown font-bold leading-tight mb-1.5">
                    {it.name}
                  </h4>
                  <p className="text-xs text-bandido-ink/60 leading-relaxed line-clamp-2 mb-4">
                    {it.desc}
                  </p>
                  <button
                    onClick={() => addToCart(it)}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-full bg-bandido-brown text-white text-sm font-semibold hover:bg-bandido-green transition-colors group/btn"
                  >
                    <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition" strokeWidth={2.5} />
                    Agregar al pedido
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function About() {
  return (
    <section
      id="nosotros"
      className="py-28 px-6 bg-bandido-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&q=80&auto=format&fit=crop"
              alt="Parrilla al carbón"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 bg-bandido-green text-white rounded-2xl p-5 shadow-2xl shadow-bandido-green/30 max-w-[200px]">
            <div className="font-condensed text-5xl leading-none">40+</div>
            <div className="text-xs mt-1 uppercase tracking-wider opacity-90">
              años forjando la leyenda
            </div>
          </div>
          <div className="absolute -top-6 -left-6 lg:-top-8 lg:-left-8 bg-bandido-blue text-white rounded-2xl p-4 shadow-2xl shadow-bandido-blue/30">
            <div className="font-display italic text-xl">
              ★ ★ ★ ★ ★
            </div>
            <div className="text-xs mt-1 opacity-90">4.9 / 5 (2,400 reseñas)</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-condensed text-bandido-green tracking-[0.4em] text-sm mb-3">
            NUESTRA HISTORIA
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-bandido-brown font-black leading-tight text-balance">
            Una leyenda nacida{" "}
            <em className="text-bandido-green">al fuego</em>
          </h2>
          <p className="mt-6 text-bandido-ink/70 text-lg leading-relaxed">
            En Bandidos Steak House llevamos décadas perfeccionando el arte del
            asado. Cada corte que servimos es resultado de la pasión por la
            carne, la tradición de la parrilla y el respeto por los
            ingredientes.
          </p>
          <p className="mt-4 text-bandido-ink/70 text-lg leading-relaxed">
            Somos los bandidos del sabor: robamos corazones con cada bocado.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-bandido-brown/10">
            <div>
              <div className="font-condensed text-4xl text-bandido-green">40+</div>
              <div className="text-xs uppercase tracking-wider text-bandido-ink/50 mt-1">
                Años
              </div>
            </div>
            <div>
              <div className="font-condensed text-4xl text-bandido-green">15</div>
              <div className="text-xs uppercase tracking-wider text-bandido-ink/50 mt-1">
                Cortes premium
              </div>
            </div>
            <div>
              <div className="font-condensed text-4xl text-bandido-green">50K+</div>
              <div className="text-xs uppercase tracking-wider text-bandido-ink/50 mt-1">
                Clientes
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

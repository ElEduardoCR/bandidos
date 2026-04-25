"use client";

import { motion } from "motion/react";
import { ArrowDown, Flame } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
    >
      {/* background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1920&q=85&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-bandido-brown/40 via-transparent to-bandido-blue/30 mix-blend-multiply" />
      </div>

      {/* glowing orbs */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-bandido-green/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-bandido-blue/30 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <Flame className="w-3.5 h-3.5 text-bandido-green" />
          <span className="font-condensed text-xs tracking-[0.3em] text-white/90">
            DESDE 1985 · CARNES PREMIUM
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[14vw] sm:text-[12vw] lg:text-[9.5rem] leading-[0.9] font-black tracking-tight"
        >
          Bandidos
          <br />
          <span className="italic font-normal text-bandido-green">
            Steak House
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display italic text-xl md:text-2xl mt-8 text-white/85"
        >
          &ldquo;El sabor de una leyenda&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-12 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#menu"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-bandido-green text-white rounded-full font-semibold hover:bg-bandido-green-dark hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-bandido-green/40"
          >
            Ordenar ahora
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition" />
          </a>
          <a
            href="#nosotros"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/10 transition"
          >
            Nuestra historia
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { val: "40+", label: "Años de tradición" },
            { val: "15", label: "Cortes premium" },
            { val: "50K", label: "Clientes felices" },
          ].map((s) => (
            <div key={s.label} className="text-left sm:text-center">
              <div className="font-condensed text-4xl md:text-5xl text-bandido-green">
                {s.val}
              </div>
              <div className="text-xs uppercase tracking-wider text-white/60 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 text-xs"
      >
        <span className="uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}

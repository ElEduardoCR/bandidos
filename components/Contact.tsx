"use client";

import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "motion/react";

const cards = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: ["Av. Principal 1985", "Ciudad de México"],
  },
  {
    icon: Clock,
    title: "Horario",
    lines: ["Lun – Jue: 12:00 – 23:00", "Vie – Dom: 12:00 – 01:00"],
  },
  {
    icon: Phone,
    title: "Reservas",
    lines: ["+52 55 1234 5678", "reservas@bandidos.com"],
  },
];

export default function Contact() {
  return (
    <section id="contacto" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-condensed text-bandido-green tracking-[0.4em] text-sm mb-3">
            CONTÁCTANOS
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-bandido-brown font-black">
            Visítanos
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-bandido-cream rounded-3xl p-8 text-center border border-black/5 hover:border-bandido-green/30 hover:-translate-y-1 transition"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-bandido-brown grid place-items-center mb-5">
                <c.icon className="w-6 h-6 text-bandido-green" strokeWidth={2.2} />
              </div>
              <h4 className="font-display text-2xl text-bandido-brown mb-2">
                {c.title}
              </h4>
              {c.lines.map((l) => (
                <p key={l} className="text-sm text-bandido-ink/60 leading-relaxed">
                  {l}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

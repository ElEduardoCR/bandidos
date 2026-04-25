"use client";

import { Star } from "lucide-react";

const ITEMS = [
  "RIBEYE PREMIUM",
  "PARRILLA AL CARBÓN",
  "ENTREGA EN 30 MIN",
  "RASTREO EN VIVO",
  "CORTES MADURADOS",
  "VINOS RESERVA",
  "EL SABOR DE UNA LEYENDA",
  "ABIERTO TODOS LOS DÍAS",
];

export default function Marquee() {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden bg-bandido-brown text-white py-5 border-y border-white/10">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-condensed tracking-[0.25em] text-xl"
          >
            <span>{it}</span>
            <Star className="w-4 h-4 text-bandido-green fill-bandido-green flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

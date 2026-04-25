"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bandido-brown text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 items-start">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-bandido-green">
              <Image
                src="/logo.jpg"
                alt="Bandidos"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-condensed text-3xl">BANDIDOS</div>
              <div className="font-display italic text-white/70 text-lg">
                El sabor de una leyenda
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <a href="#menu" className="hover:text-bandido-green transition">
              Menú
            </a>
            <a href="#nosotros" className="hover:text-bandido-green transition">
              Nosotros
            </a>
            <a href="#contacto" className="hover:text-bandido-green transition">
              Contacto
            </a>
            <Link href="/staff" className="hover:text-bandido-green transition">
              Panel Staff
            </Link>
          </div>

          <div className="flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 grid place-items-center hover:bg-bandido-green hover:border-bandido-green transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/50">
          <p>© 2026 Bandidos Steak House — Todos los derechos reservados</p>
          <p className="font-condensed tracking-widest">DESDE 1985</p>
        </div>
      </div>
    </footer>
  );
}

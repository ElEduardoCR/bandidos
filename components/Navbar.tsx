"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStore";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const { cartCount, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#menu", label: "Menú" },
    { href: "/rastrear", label: "Rastrear pedido" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#contacto", label: "Contacto" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-black/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between gap-4">
        <Link href="/#inicio" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-bandido-brown/20 group-hover:ring-bandido-green transition">
            <Image
              src="/logo.jpg"
              alt="Bandidos"
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="leading-none">
            <div
              className={`font-condensed text-2xl ${
                scrolled ? "text-bandido-brown" : "text-white"
              }`}
            >
              BANDIDOS
            </div>
            <div
              className={`text-[10px] uppercase tracking-[0.25em] mt-0.5 ${
                scrolled ? "text-bandido-brown/60" : "text-white/70"
              }`}
            >
              Steak House
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-bandido-ink hover:text-bandido-green"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/staff"
            className={`text-xs font-semibold px-4 py-2 rounded-full transition ${
              scrolled
                ? "bg-bandido-brown text-white hover:bg-bandido-brown-light"
                : "bg-white/10 text-white border border-white/30 hover:bg-white/20"
            }`}
          >
            Panel Staff
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative w-11 h-11 rounded-full bg-bandido-green text-white grid place-items-center hover:bg-bandido-green-dark hover:scale-105 active:scale-95 transition shadow-lg shadow-bandido-green/30"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5" strokeWidth={2.2} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-bandido-blue text-white text-[10px] font-bold grid place-items-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden w-11 h-11 rounded-full grid place-items-center transition ${
              scrolled
                ? "bg-bandido-cream text-bandido-brown"
                : "bg-white/10 text-white border border-white/20"
            }`}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-full inset-x-0 glass border-b border-black/5 px-5 py-4"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-3 text-bandido-ink font-medium hover:bg-bandido-cream rounded-xl"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/staff"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-bandido-brown font-semibold border-t border-black/5 mt-2 pt-3"
              >
                Panel Staff →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

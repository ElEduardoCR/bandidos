"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, PackageSearch, RefreshCw, Clock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import OrderTracker from "./OrderTracker";
import { useStore } from "@/hooks/useStore";
import { fmtMXN, timeAgo } from "@/lib/utils";
import { STATUS_LABEL } from "@/lib/types";

export default function TrackPageClient() {
  const { orders } = useStore();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  // Hydrate from URL query param
  useEffect(() => {
    const id = params.get("id");
    if (id) {
      setQuery(id);
      setSearched(true);
    }
  }, [params]);

  const recent = useMemo(() => orders.slice(0, 5), [orders]);

  const found = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase() === q) || null;
  }, [orders, query]);

  const partialMatch = useMemo(() => {
    if (!query.trim() || found) return null;
    const q = query.trim().toUpperCase();
    return orders.find((o) => o.id.toUpperCase().includes(q)) || null;
  }, [orders, query, found]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const target = found?.id || partialMatch?.id || query.trim().toUpperCase();
    router.replace(`${pathname}?id=${encodeURIComponent(target)}`, {
      scroll: false,
    });
  };

  const result = found || (partialMatch && searched ? partialMatch : null);

  return (
    <main className="relative min-h-screen flex flex-col bg-bandido-cream">
      <Navbar />

      {/* Hero band */}
      <section className="relative pt-32 pb-12 px-6 bg-gradient-to-br from-bandido-brown via-[#3a1a06] to-bandido-brown text-white overflow-hidden">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-bandido-green/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-bandido-blue/20 rounded-full blur-[100px]" />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="font-condensed tracking-[0.4em] text-xs text-bandido-green mb-3">
            EN TIEMPO REAL
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-black leading-tight">
            Rastrea tu <em className="text-bandido-green">pedido</em>
          </h1>
          <p className="mt-4 text-white/70 text-lg">
            Ingresa el folio que recibiste al confirmar tu orden y conoce el
            estado actual al instante.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-8 max-w-xl mx-auto flex items-stretch gap-2 bg-white rounded-full p-1.5 shadow-2xl shadow-bandido-brown/40"
          >
            <div className="flex items-center pl-4 text-bandido-brown/60">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.toUpperCase())}
              placeholder="BND-XXXX-XXX"
              className="flex-1 bg-transparent px-2 py-3 text-bandido-brown font-condensed tracking-[0.15em] text-lg outline-none placeholder:text-bandido-brown/30 placeholder:tracking-widest"
              spellCheck={false}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className="px-6 py-3 rounded-full bg-bandido-green text-white font-semibold hover:bg-bandido-green-dark disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="flex-1 px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.id + result.status}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-bandido-brown/5 border border-black/5"
              >
                <div className="flex items-center gap-2 text-xs text-bandido-green font-semibold mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bandido-green opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-bandido-green" />
                  </span>
                  ACTUALIZACIÓN EN VIVO
                  <span className="ml-auto inline-flex items-center gap-1 text-bandido-ink/40 font-normal">
                    <RefreshCw className="w-3 h-3" />
                    auto
                  </span>
                </div>
                <OrderTracker order={result} />
              </motion.div>
            ) : searched && query.trim() ? (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl p-10 text-center border border-black/5 shadow-sm"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-bandido-cream grid place-items-center mb-4">
                  <PackageSearch className="w-7 h-7 text-bandido-brown/50" />
                </div>
                <h3 className="font-display text-2xl text-bandido-brown font-bold">
                  No encontramos ese pedido
                </h3>
                <p className="text-bandido-ink/60 text-sm mt-2 max-w-sm mx-auto">
                  Verifica que el folio esté escrito correctamente. Recuerda
                  que esta es una demo y los pedidos solo viven en tu navegador.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="initial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <p className="text-bandido-ink/50 text-sm">
                  Ingresa tu folio arriba para ver el estado de tu pedido.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {recent.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-bandido-brown/60" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-bandido-brown/60">
                  Pedidos recientes en este navegador
                </h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {recent.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setQuery(o.id);
                      setSearched(true);
                      router.replace(
                        `${pathname}?id=${encodeURIComponent(o.id)}`,
                        { scroll: false }
                      );
                    }}
                    className={`text-left bg-white rounded-2xl p-4 border-2 transition hover:-translate-y-0.5 hover:shadow-lg ${
                      result?.id === o.id
                        ? "border-bandido-green"
                        : "border-transparent hover:border-bandido-green/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-condensed tracking-widest text-bandido-brown">
                        {o.id}
                      </span>
                      <span className="text-[11px] text-bandido-ink/40">
                        {timeAgo(o.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs text-bandido-green font-semibold">
                        {STATUS_LABEL[o.status]}
                      </span>
                      <span className="text-sm font-condensed text-bandido-brown">
                        {fmtMXN(o.total)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

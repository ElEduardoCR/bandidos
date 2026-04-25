"use client";

import { motion, AnimatePresence } from "motion/react";
import { useStore } from "@/hooks/useStore";

export default function Toast() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="bg-bandido-brown text-white px-5 py-3 rounded-full text-sm font-medium shadow-2xl"
          >
            {t.msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

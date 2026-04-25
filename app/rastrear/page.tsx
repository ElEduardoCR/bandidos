import { Suspense } from "react";
import TrackPageClient from "@/components/TrackPageClient";

export const metadata = {
  title: "Rastrea tu pedido — Bandidos Steak House",
  description: "Consulta el estado de tu pedido con el folio que recibiste.",
};

export default function RastrearPage() {
  return (
    <Suspense fallback={null}>
      <TrackPageClient />
    </Suspense>
  );
}

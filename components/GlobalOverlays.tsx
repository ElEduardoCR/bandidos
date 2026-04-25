"use client";

import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import TrackingModal from "./TrackingModal";
import Toast from "./Toast";

export default function GlobalOverlays() {
  return (
    <>
      <CartDrawer />
      <CheckoutModal />
      <TrackingModal />
      <Toast />
    </>
  );
}

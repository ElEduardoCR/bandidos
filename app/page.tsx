import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import MenuSection from "@/components/MenuSection";
import About from "@/components/About";
import TrackingPromo from "@/components/TrackingPromo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CheckoutModal from "@/components/CheckoutModal";
import TrackingModal from "@/components/TrackingModal";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <MenuSection />
      <About />
      <TrackingPromo />
      <Contact />
      <Footer />

      {/* Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <TrackingModal />
      <Toast />
    </main>
  );
}

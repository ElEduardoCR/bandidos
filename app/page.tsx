import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Features from "@/components/Features";
import MenuSection from "@/components/MenuSection";
import About from "@/components/About";
import TrackingPromo from "@/components/TrackingPromo";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
    </main>
  );
}

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Marquee } from "@/components/Marquee";
import { Products } from "@/components/Products";
import { Quality } from "@/components/Quality";
import { About } from "@/components/About";
import { GlobalPresence } from "@/components/GlobalPresence";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [presetProduct, setPresetProduct] = useState("");
  const { scrollYProgress } = useScroll();

  const openQuote = (product = "") => {
    setPresetProduct(product);
    setQuoteOpen(true);
  };

  return (
    <main className="bg-ivory" data-testid="home-page">
      {/* Gold scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[110] h-[3px] origin-left bg-gradient-to-r from-gold-rich via-gold to-gold-dark"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />
      <Header onQuote={openQuote} />
      <Hero onQuote={openQuote} />
      <TrustBar />
      <Marquee />
      <Products onQuote={openQuote} />
      <Quality />
      <About />
      <GlobalPresence />
      <CtaBanner onQuote={openQuote} />
      <Footer onQuote={openQuote} />
      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        presetProduct={presetProduct}
      />
      <WhatsAppFloat />
    </main>
  );
}

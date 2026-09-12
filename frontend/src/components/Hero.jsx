import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Wheat } from "lucide-react";
import { IMAGES } from "@/data/content";
import { scrollToSection } from "@/data/content";

const EASE = [0.22, 1, 0.36, 1];

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-1">
    <motion.span
      className="block"
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const CircularBadge = () => (
  <div
    className="absolute -bottom-8 -left-10 hidden h-32 w-32 items-center justify-center md:flex lg:-left-16"
    data-testid="hero-circular-badge"
  >
    <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow text-gold-dark">
      <defs>
        <path id="badge-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
      </defs>
      <text className="fill-current font-mono text-[9.5px] uppercase tracking-[0.22em]">
        <textPath href="#badge-circle">
          Good Food · Brighter Lives · From Nature To The World ·
        </textPath>
      </text>
    </svg>
    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-cream/80 text-gold backdrop-blur">
      <Wheat className="h-6 w-6" />
    </span>
  </div>
);

export const Hero = ({ onQuote }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="home" ref={ref} className="relative overflow-hidden" data-testid="hero-section">
      {/* Dubai skyline backdrop */}
      <motion.div className="absolute inset-0" style={{ y: yBg }}>
        <img
          src={IMAGES.heroBg}
          alt="Dubai skyline with Burj Khalifa at golden hour"
          className="h-[115%] w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory via-ivory/85 to-ivory/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent" />
      </motion.div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:px-16 lg:pb-32 lg:pt-24">
        {/* Copy */}
        <div className="max-w-2xl">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <span className="h-px w-12 bg-gold" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.34em] text-gold-dark" data-testid="hero-eyebrow">
              Premium Rice. Global Reach.
            </span>
          </motion.div>

          <h1
            className="mt-7 font-serif text-[2.9rem] font-semibold leading-[1.04] tracking-tight text-ebony sm:text-6xl lg:text-[4.6rem]"
            data-testid="hero-headline"
          >
            <MaskedLine delay={0.3}>Nourishing People,</MaskedLine>
            <MaskedLine delay={0.44}>Building a</MaskedLine>
            <MaskedLine delay={0.58}>
              <em className="gold-text-gradient not-italic italic">Brighter Tomorrow</em>
            </MaskedLine>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-ebony/70 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
            data-testid="hero-subtext"
          >
            Golden Chariot Foodstuff Trading Co. LLC is a Dubai-based trading company committed to
            supplying premium rice and food commodities to customers worldwide.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
          >
            <button
              onClick={() => scrollToSection("#products")}
              data-testid="hero-explore-rice-btn"
              className="group flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-rich via-gold to-gold-dark px-7 py-3.5 text-sm font-semibold text-coal shadow-gold-subtle transition-all duration-300 hover:shadow-gold-glow"
            >
              Explore Our Rice
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onQuote()}
              data-testid="hero-contact-btn"
              className="group flex items-center gap-2.5 rounded-full border border-ebony/25 bg-ivory/60 px-7 py-3.5 text-sm font-semibold text-ebony backdrop-blur transition-all duration-300 hover:border-gold hover:text-gold-dark"
            >
              <Phone className="h-4 w-4 text-gold" />
              Contact Us
            </button>
          </motion.div>
        </div>

        {/* Arch rice portrait */}
        <motion.div
          className="relative mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        >
          <motion.div style={{ y: yImg }} className="relative">
            <div className="absolute -inset-4 rounded-t-[999px] rounded-b-2xl border border-gold/40" aria-hidden="true" />
            <div className="overflow-hidden rounded-t-[999px] rounded-b-2xl shadow-[0_40px_80px_-30px_rgba(28,22,17,0.45)]">
              <img
                src={IMAGES.heroRice}
                alt="Premium steamed white rice served in a dark bowl"
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
                data-testid="hero-rice-image"
              />
              <div className="absolute inset-0 rounded-t-[999px] rounded-b-2xl ring-1 ring-inset ring-gold/30" />
            </div>
            <CircularBadge />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ebony/50">Scroll</span>
        <motion.span
          className="h-10 w-px bg-gold"
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
};

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { IMAGES } from "@/data/content";
import { Reveal, Eyebrow } from "./Reveal";

// Approximate positions on the equirectangular world map (viewBox 640 x 320)
const DUBAI = { x: 414, y: 112, left: "63.6%", top: "34%" };
const ARCS = [
  { d: "M 414 112 Q 300 30 120 86", end: { x: 120, y: 86 } },
  { d: "M 414 112 Q 330 190 235 208", end: { x: 235, y: 208 } },
  { d: "M 414 112 Q 470 40 545 96", end: { x: 545, y: 96 } },
  { d: "M 414 112 Q 500 200 548 236", end: { x: 548, y: 236 } },
  { d: "M 414 112 Q 250 90 96 150", end: { x: 96, y: 150 } },
];

export const GlobalPresence = () => (
  <section id="global" className="bg-ivory py-20 lg:py-28" data-testid="global-presence-section">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:px-16">
      <Reveal>
        <Eyebrow>Global Presence</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ebony sm:text-4xl lg:text-5xl" data-testid="global-heading">
          Connecting Markets <em className="gold-text-gradient">Across Continents</em>
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-ebony/65">
          From our base in Dubai, we aim to connect reliable food supply with growing market needs
          around the world.
        </p>
        <p className="mt-6 font-serif text-xl italic text-gold-dark">
          “Quality food knows no borders.”
        </p>
        <button
          onClick={() => toast.info("Our global presence page is launching soon.")}
          data-testid="global-presence-btn"
          className="group mt-8 flex items-center gap-2.5 rounded-full border border-gold/60 bg-transparent px-7 py-3.5 text-sm font-semibold text-gold-dark transition-all duration-300 hover:bg-gold hover:text-coal"
        >
          Our Global Presence
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Reveal>

      <Reveal delay={0.15}>
        <div
          className="relative overflow-hidden rounded-md border border-gold/25 bg-[#F5EEDF] p-3 shadow-gold-subtle"
          data-testid="world-map-panel"
        >
          <div className="relative">
            <img
              src={IMAGES.worldMap}
              alt="World map highlighting Golden Chariot's trade connections from Dubai"
              loading="lazy"
              className="w-full select-none opacity-80 [filter:sepia(0.55)_saturate(1.6)_hue-rotate(-12deg)_contrast(0.92)_brightness(1.04)]"
            />
            {/* Trade arcs */}
            <svg viewBox="0 0 640 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {ARCS.map((arc, i) => (
                <g key={i}>
                  <motion.path
                    d={arc.d}
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="1.4"
                    strokeDasharray="5 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.85 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.4 + i * 0.25, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx={arc.end.x}
                    cy={arc.end.y}
                    r="3.4"
                    fill="#9A7B38"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.6 + i * 0.25, duration: 0.4 }}
                  />
                </g>
              ))}
            </svg>
            {/* Dubai hub marker */}
            <div className="absolute" style={{ left: DUBAI.left, top: DUBAI.top }} data-testid="dubai-hub-marker">
              <span className="absolute -inset-3 -translate-x-0 -translate-y-0 rounded-full bg-gold/50 animate-pulse-ring" aria-hidden="true" />
              <span className="relative block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ivory bg-gold-rich shadow-gold-glow" />
              <span className="absolute left-2 top-1 whitespace-nowrap rounded-sm border border-gold/40 bg-coal/85 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-gold-champagne backdrop-blur">
                Dubai HQ
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

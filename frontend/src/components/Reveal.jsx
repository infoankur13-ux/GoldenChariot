import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 32, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const Eyebrow = ({ children, light = false }) => (
  <div className="flex items-center gap-3">
    <span className="h-px w-10 bg-gold" aria-hidden="true" />
    <span
      className={`font-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.3em] ${
        light ? "text-gold-champagne" : "text-gold"
      }`}
    >
      {children}
    </span>
  </div>
);

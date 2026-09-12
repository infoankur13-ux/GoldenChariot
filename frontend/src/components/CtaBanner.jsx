import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/data/content";
import { Reveal, Eyebrow } from "./Reveal";

export const CtaBanner = ({ onQuote }) => (
  <section className="relative overflow-hidden" data-testid="cta-banner">
    <img
      src={IMAGES.ctaBanner}
      alt="Golden grain field at sunset — premium rice harvest"
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-coal/95 via-ebony/85 to-ebony/45" />
    <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:px-16 lg:py-32">
      <Reveal className="max-w-2xl">
        <Eyebrow light>Let's Work Together</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl lg:text-5xl" data-testid="cta-heading">
          Looking for Reliable <em className="gold-text-gradient">Rice Supply?</em>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D8CEB9]/80">
          Get in touch with our team for product enquiries, quotations and business requirements.
        </p>
        <button
          onClick={() => onQuote()}
          data-testid="cta-contact-now-btn"
          className="group mt-9 flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold-rich via-gold to-gold-dark px-8 py-4 text-sm font-semibold text-coal shadow-gold-subtle transition-all duration-300 hover:shadow-gold-glow"
        >
          Contact Us Now
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </Reveal>
    </div>
  </section>
);

import { Wheat, Search, Factory, PackageCheck, Ship } from "lucide-react";
import { QUALITY_STEPS } from "@/data/content";
import { Reveal, Eyebrow } from "./Reveal";

const ICONS = { Wheat, Search, Factory, PackageCheck, Ship };

export const Quality = () => (
  <section id="quality" className="relative overflow-hidden bg-ebony py-20 lg:py-28" data-testid="quality-section">
    <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
    <div
      className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
      aria-hidden="true"
    />
    <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow light>From Farm to Your Market</Eyebrow>
        </div>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-cream sm:text-4xl lg:text-5xl" data-testid="quality-heading">
          Quality in <em className="gold-text-gradient">Every Grain</em>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-[#D8CEB9]/70">
          From carefully selected sources to global delivery, we focus on maintaining quality and
          consistency throughout the supply journey.
        </p>
      </Reveal>

      <div className="relative mt-16">
        <div
          className="absolute left-0 right-0 top-14 hidden border-t border-dashed border-gold/25 lg:block"
          aria-hidden="true"
        />
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {QUALITY_STEPS.map((step, i) => {
            const Icon = ICONS[step.icon];
            return (
              <Reveal key={step.num} delay={i * 0.12}>
                <div className="group flex flex-col items-center text-center" data-testid={`quality-step-${step.num}`}>
                  <div className="relative">
                    <div className="h-28 w-28 overflow-hidden rounded-full ring-1 ring-gold/40 transition-all duration-500 group-hover:ring-2 group-hover:ring-gold">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                      />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-gold/50 bg-coal text-gold">
                      <Icon className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                  </div>
                  <span className="mt-6 font-mono text-[11px] tracking-[0.3em] text-gold/70">{step.num}</span>
                  <h3 className="mt-2 font-serif text-xl font-semibold text-cream">{step.title}</h3>
                  <p className="mt-2 max-w-[13rem] text-xs leading-relaxed text-[#D8CEB9]/60">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

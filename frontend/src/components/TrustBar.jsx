import { Gem, Globe2, Ship, Handshake } from "lucide-react";
import { TRUST_ITEMS } from "@/data/content";
import { Reveal } from "./Reveal";

const ICONS = { Gem, Globe2, Ship, Handshake };

export const TrustBar = () => (
  <section className="border-y border-gold/20 bg-cream" data-testid="trust-highlights">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-8 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-16">
      {TRUST_ITEMS.map((item, i) => {
        const Icon = ICONS[item.icon];
        return (
          <Reveal key={item.title} delay={i * 0.1}>
            <div
              className="group flex items-center gap-4"
              data-testid={`trust-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-coal">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span>
                <span className="block font-serif text-lg font-semibold text-ebony">{item.title}</span>
                <span className="mt-0.5 block text-xs text-sand">{item.caption}</span>
              </span>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

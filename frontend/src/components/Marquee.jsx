import { Wheat } from "lucide-react";

const WORDS = [
  "Basmati Rice",
  "Non-Basmati Rice",
  "Parboiled Rice",
  "Broken Rice",
  "Premium Quality",
  "Global Reach",
];

export const Marquee = () => (
  <div
    className="group relative overflow-hidden border-b border-gold/15 bg-ivory py-8"
    data-testid="editorial-marquee"
    aria-hidden="true"
  >
    <div className="flex w-max animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
      {[...Array(2)].map((_, copy) => (
        <div key={copy} className="flex items-center gap-10">
          {WORDS.map((word, i) => (
            <span key={`${copy}-${word}`} className="flex items-center gap-10">
              <span
                className={`whitespace-nowrap font-serif text-4xl font-semibold sm:text-5xl lg:text-6xl ${
                  i % 2 === 0 ? "text-ebony/90" : "text-outline-gold"
                }`}
              >
                {word}
              </span>
              <Wheat className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

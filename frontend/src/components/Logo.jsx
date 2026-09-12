export const ChariotWheel = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.4" />
    <circle cx="24" cy="24" r="4.5" stroke="currentColor" strokeWidth="2.4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line
        key={deg}
        x1="24"
        y1="24"
        x2={24 + 20 * Math.cos((deg * Math.PI) / 180)}
        y2={24 + 20 * Math.sin((deg * Math.PI) / 180)}
        stroke="currentColor"
        strokeWidth="1.6"
      />
    ))}
  </svg>
);

export const Logo = ({ dark = false, compact = false }) => (
  <a
    href="#home"
    onClick={(e) => {
      e.preventDefault();
      const el = document.querySelector("#home");
      if (el && window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
      else if (el) el.scrollIntoView({ behavior: "smooth" });
    }}
    className="group flex items-center gap-3"
    data-testid="brand-logo"
    aria-label="Golden Chariot Foodstuff Trading Co. LLC — Home"
  >
    <span
      className={`flex items-center justify-center rounded-full border p-1.5 transition-colors duration-500 ${
        dark
          ? "border-gold/50 text-gold group-hover:border-gold"
          : "border-gold/60 text-gold group-hover:border-gold-rich"
      }`}
    >
      <ChariotWheel className="h-6 w-6 transition-transform duration-700 group-hover:rotate-90" />
    </span>
    <span className="flex flex-col leading-none">
      <span
        className={`font-serif font-bold tracking-tight ${
          compact ? "text-lg" : "text-xl sm:text-2xl"
        } ${dark ? "text-cream" : "text-ebony"}`}
      >
        Golden <span className="gold-text-gradient italic">Chariot</span>
      </span>
      {!compact && (
        <span
          className={`mt-1 font-mono text-[8px] uppercase tracking-[0.32em] ${
            dark ? "text-gold/80" : "text-gold-dark"
          }`}
        >
          Foodstuff Trading Co. LLC
        </span>
      )}
    </span>
  </a>
);

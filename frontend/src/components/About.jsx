import { ArrowRight, MapPin, Users, BadgeCheck, Anchor, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { BENEFITS, CONTACT, IMAGES } from "@/data/content";
import { Reveal, Eyebrow } from "./Reveal";

const ICONS = { Users, BadgeCheck, Anchor, TrendingUp };

export const About = () => (
  <section id="about" className="bg-cream py-20 lg:py-28" data-testid="about-section">
    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-16">
      <Reveal>
        <Eyebrow>About Golden Chariot</Eyebrow>
        <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ebony sm:text-4xl lg:text-5xl" data-testid="about-heading">
          A Trusted Partner in <em className="gold-text-gradient">Global Food Trade</em>
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ebony/65 sm:text-lg">
          Golden Chariot Foodstuff Trading Co. LLC is a Dubai-based foodstuff trading company
          focused on supplying high-quality rice and building long-term business relationships
          through quality, reliability and professional service.
        </p>
        <button
          onClick={() => toast.info("Our full story page is launching soon.")}
          data-testid="about-learn-more-btn"
          className="group mt-8 flex items-center gap-2.5 rounded-full bg-ebony px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:bg-gold hover:text-coal"
        >
          Learn More About Us
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
          {BENEFITS.map((b) => {
            const Icon = ICONS[b.icon];
            return (
              <div key={b.title} className="flex items-start gap-3.5" data-testid={`benefit-${b.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-ivory text-gold">
                  <Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ebony">{b.title}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-sand">{b.caption}</span>
                </span>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="relative mx-auto max-w-md lg:max-w-none">
          <div className="absolute -inset-4 rounded-t-[180px] rounded-b-2xl border border-gold/40" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-t-[180px] rounded-b-2xl shadow-[0_40px_70px_-30px_rgba(28,22,17,0.4)]">
            <img
              src={IMAGES.about}
              alt="Dubai waterfront skyline — the hub of Golden Chariot's international food trade"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
              data-testid="about-image"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ebony/45 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-6 left-1/2 flex w-[86%] -translate-x-1/2 items-center gap-3 rounded-md border border-gold/30 bg-coal/80 px-5 py-4 backdrop-blur-md">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-coal">
              <MapPin className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-serif text-base font-semibold text-cream">Headquartered in Dubai</span>
              <span className="block text-xs text-[#D8CEB9]/70">{CONTACT.location}</span>
            </span>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

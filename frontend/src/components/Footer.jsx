import { useState } from "react";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Send,
} from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT, NAV_LINKS, PRODUCTS, scrollToSection } from "@/data/content";

const soon = () => toast.info("This page is on its way — launching soon.");

export const Footer = ({ onQuote }) => {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Subscribed — welcome to the Golden Chariot circle.");
    setEmail("");
  };

  const handleNav = (link) => {
    if (link.target === "quote") return onQuote();
    if (link.target) return scrollToSection(link.target);
    soon();
  };

  return (
    <footer className="bg-coal text-[#D8CEB9]" data-testid="site-footer">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr_1.3fr] lg:px-16 lg:py-20">
        {/* Brand */}
        <div>
          <Logo dark />
          <p className="mt-5 font-serif text-xl italic text-gold-champagne" data-testid="footer-tagline">
            Good Food. Brighter Lives.
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-[#D8CEB9]/60">
            A Dubai-based foodstuff trading company supplying premium rice to customers worldwide,
            with a growing portfolio of food commodities.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Facebook, label: "Facebook" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={soon}
                aria-label={`Golden Chariot on ${label}`}
                data-testid={`footer-social-${label.toLowerCase()}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/25 text-gold/80 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-coal"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer quick links">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Quick Links</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => handleNav(link)}
                  data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm text-[#D8CEB9]/75 transition-colors hover:text-gold-champagne"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Products */}
        <nav aria-label="Footer products">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Our Products</h3>
          <ul className="mt-5 space-y-3">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => onQuote(p.name)}
                  data-testid={`footer-product-${p.id}`}
                  className="text-sm text-[#D8CEB9]/75 transition-colors hover:text-gold-champagne"
                >
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Contact Information</h3>
          <ul className="mt-5 space-y-4 text-sm text-[#D8CEB9]/75">
            <li className="flex items-start gap-3" data-testid="footer-address">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {CONTACT.location}
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneRaw}`} className="flex items-center gap-3 transition-colors hover:text-gold-champagne" data-testid="footer-phone">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 transition-colors hover:text-gold-champagne" data-testid="footer-email">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                {CONTACT.email}
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">Newsletter</h3>
          <p className="mt-5 text-xs leading-relaxed text-[#D8CEB9]/60">
            Get the latest updates on our products and global trade insights.
          </p>
          <form onSubmit={subscribe} className="mt-4 flex" data-testid="newsletter-form">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              aria-label="Email address for newsletter"
              data-testid="newsletter-email-input"
              className="w-full rounded-l-sm border border-gold/25 bg-ebony px-4 py-3 text-sm text-cream placeholder:text-[#D8CEB9]/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              data-testid="newsletter-subscribe-btn"
              className="flex items-center justify-center rounded-r-sm bg-gradient-to-br from-gold-rich to-gold-dark px-4 text-coal transition-all duration-300 hover:brightness-110"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-[11px] text-[#D8CEB9]/50 sm:flex-row sm:px-8 lg:px-16">
          <span data-testid="footer-copyright">
            © 2026 Golden Chariot Foodstuff Trading Co. LLC. All Rights Reserved.
          </span>
          <span className="flex items-center gap-5">
            <button onClick={soon} className="transition-colors hover:text-gold-champagne" data-testid="footer-privacy-link">
              Privacy Policy
            </button>
            <span className="h-3 w-px bg-gold/25" aria-hidden="true" />
            <button onClick={soon} className="transition-colors hover:text-gold-champagne" data-testid="footer-terms-link">
              Terms &amp; Conditions
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
};

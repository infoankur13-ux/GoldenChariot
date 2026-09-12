import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Search,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT, NAV_LINKS, scrollToSection } from "@/data/content";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

const soon = () => toast.info("This page is on its way — launching soon.");

export const Header = ({ onQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (link) => {
    setMenuOpen(false);
    if (link.target === "quote") return onQuote();
    if (link.target) return scrollToSection(link.target);
    soon();
  };

  return (
    <header className="sticky top-0 z-[80]" data-testid="site-header">
      {/* Top contact bar */}
      <div
        className={`overflow-hidden bg-ebony text-[#D8CEB9] transition-all duration-500 ${
          scrolled ? "max-h-0" : "max-h-12"
        }`}
        data-testid="top-contact-bar"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] sm:px-8 lg:px-16">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-gold" />
              <span className="hidden sm:inline">{CONTACT.location}</span>
              <span className="sm:hidden">Dubai, UAE</span>
            </span>
            <a
              href={`tel:${CONTACT.phoneRaw}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-champagne"
              data-testid="top-bar-phone"
            >
              <Phone className="h-3 w-3 text-gold" />
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden items-center gap-1.5 transition-colors hover:text-gold-champagne md:flex"
              data-testid="top-bar-email"
            >
              <Mail className="h-3 w-3 text-gold" />
              {CONTACT.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-gold/70 sm:inline">
              Follow Us
            </span>
            {SOCIALS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={soon}
                aria-label={`Golden Chariot on ${label}`}
                data-testid={`social-${label.toLowerCase()}`}
                className="text-[#D8CEB9]/80 transition-colors hover:text-gold-champagne"
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={`border-b backdrop-blur-xl transition-all duration-500 ${
          scrolled
            ? "border-gold/30 bg-cream/95 shadow-[0_8px_30px_-12px_rgba(28,22,17,0.25)]"
            : "border-gold/15 bg-cream/85"
        }`}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-16"
          aria-label="Main navigation"
        >
          <Logo />
          <div className="hidden items-center gap-7 xl:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNav(link)}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative text-[13px] font-medium tracking-wide text-ebony/80 transition-colors hover:text-ebony"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={soon}
              aria-label="Search"
              data-testid="nav-search-btn"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-ebony/15 text-ebony/70 transition-colors hover:border-gold hover:text-gold sm:flex"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              onClick={() => onQuote()}
              data-testid="get-quote-btn"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-br from-gold-rich via-gold to-gold-dark px-5 py-2.5 text-[13px] font-semibold text-coal shadow-gold-subtle transition-all duration-300 hover:shadow-gold-glow"
            >
              Get a Quote
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              data-testid="mobile-menu-btn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ebony/15 text-ebony transition-colors hover:border-gold hover:text-gold xl:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-coal/60 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            data-testid="mobile-menu-overlay"
          >
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ebony px-8 py-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              data-testid="mobile-menu-panel"
            >
              <div className="flex items-center justify-between">
                <Logo dark compact />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  data-testid="mobile-menu-close"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-12 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                    onClick={() => handleNav(link)}
                    data-testid={`mobile-nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="border-b border-gold/10 py-4 text-left font-serif text-2xl text-cream transition-colors hover:text-gold-champagne"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onQuote();
                }}
                data-testid="mobile-get-quote-btn"
                className="mt-10 flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-gold-rich via-gold to-gold-dark px-6 py-3.5 text-sm font-semibold text-coal"
              >
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
              <div className="mt-auto flex items-center gap-4 pt-8 text-gold/70">
                {SOCIALS.map(({ icon: Icon, label }) => (
                  <button key={label} onClick={soon} aria-label={label} data-testid={`mobile-social-${label.toLowerCase()}`}>
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

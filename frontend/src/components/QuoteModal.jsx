import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { X, Send } from "lucide-react";
import { CONTACT, PRODUCT_OPTIONS } from "@/data/content";

const INITIAL = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  destination: "",
  message: "",
};

const inputCls =
  "w-full rounded-sm border border-ebony/15 bg-white px-4 py-3 text-sm text-ebony placeholder:text-ebony/35 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40";

const labelCls = "mb-1.5 block text-xs font-semibold tracking-wide text-ebony/70";

export const QuoteModal = ({ open, onClose, presetProduct = "" }) => {
  const [form, setForm] = useState(INITIAL);

  useEffect(() => {
    if (open) setForm((f) => ({ ...INITIAL, product: presetProduct || f.product }));
  }, [open, presetProduct]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    toast.success("Enquiry sent successfully! Our Dubai trading team will get back to you shortly.");
    setForm(INITIAL);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center bg-coal/80 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-testid="quote-modal-overlay"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-gold/30 bg-ivory shadow-[0_40px_90px_-20px_rgba(0,0,0,0.5)] sm:rounded-md"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            data-testid="quote-modal"
          >
            <div className="flex items-start justify-between border-b border-gold/20 px-6 py-5 sm:px-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Get a Quote
                </span>
                <h2 className="mt-1.5 font-serif text-2xl font-semibold text-ebony sm:text-3xl">
                  Tell Us About Your Requirement
                </h2>
                <p className="mt-1 text-xs text-sand">
                  Or reach us directly at {CONTACT.phone} · {CONTACT.email}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close enquiry form"
                data-testid="quote-modal-close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ebony/15 text-ebony/60 transition-colors hover:border-gold hover:text-gold"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submit} className="grid grid-cols-1 gap-5 px-6 py-7 sm:grid-cols-2 sm:px-8" data-testid="quote-form">
              <div>
                <label htmlFor="q-name" className={labelCls}>Name *</label>
                <input id="q-name" required value={form.name} onChange={set("name")} placeholder="Your full name" className={inputCls} data-testid="quote-name-input" />
              </div>
              <div>
                <label htmlFor="q-company" className={labelCls}>Company Name</label>
                <input id="q-company" value={form.company} onChange={set("company")} placeholder="Your company" className={inputCls} data-testid="quote-company-input" />
              </div>
              <div>
                <label htmlFor="q-email" className={labelCls}>Email *</label>
                <input id="q-email" type="email" required value={form.email} onChange={set("email")} placeholder="you@company.com" className={inputCls} data-testid="quote-email-input" />
              </div>
              <div>
                <label htmlFor="q-phone" className={labelCls}>Phone Number *</label>
                <input id="q-phone" type="tel" required value={form.phone} onChange={set("phone")} placeholder="+971 ..." className={inputCls} data-testid="quote-phone-input" />
              </div>
              <div>
                <label htmlFor="q-product" className={labelCls}>Product Interest *</label>
                <select id="q-product" required value={form.product} onChange={set("product")} className={inputCls} data-testid="quote-product-select">
                  <option value="" disabled>Select a product</option>
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="q-quantity" className={labelCls}>Required Quantity</label>
                <input id="q-quantity" value={form.quantity} onChange={set("quantity")} placeholder="e.g. 25 MT / 1 container" className={inputCls} data-testid="quote-quantity-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-destination" className={labelCls}>Destination Country / Port</label>
                <input id="q-destination" value={form.destination} onChange={set("destination")} placeholder="e.g. Mombasa, Kenya" className={inputCls} data-testid="quote-destination-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="q-message" className={labelCls}>Message *</label>
                <textarea id="q-message" required rows={4} value={form.message} onChange={set("message")} placeholder="Share your requirements, target specifications or questions..." className={`${inputCls} resize-none`} data-testid="quote-message-input" />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  data-testid="quote-submit-button"
                  className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-gold-rich via-gold to-gold-dark px-8 py-4 text-sm font-semibold text-coal shadow-gold-subtle transition-all duration-300 hover:shadow-gold-glow"
                >
                  Send Enquiry
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>
                <p className="mt-3 text-center text-[11px] text-sand">
                  Your details stay confidential and are used only to respond to your enquiry.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "@/data/content";
import { Reveal, Eyebrow } from "./Reveal";

export const Products = ({ onQuote }) => (
  <section id="products" className="bg-ivory py-20 lg:py-28" data-testid="rice-products-section">
    <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal className="max-w-2xl">
          <Eyebrow>Our Rice Products</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ebony sm:text-4xl lg:text-5xl" data-testid="products-heading">
            Finest Rice for a <em className="gold-text-gradient">Better Tomorrow</em>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ebony/65">
            Explore our carefully selected rice varieties, sourced to meet the quality and supply
            requirements of global markets.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <button
            onClick={() => toast.info("Our full rice catalogue page is launching soon.")}
            data-testid="view-all-products-link"
            className="group flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-semibold text-gold-dark transition-colors hover:text-ebony"
          >
            View All Rice Products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((product, i) => (
          <Reveal key={product.id} delay={i * 0.1} className="h-full">
            <article
              className="group flex h-full flex-col overflow-hidden rounded-md border border-gold/15 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-card-hover"
              data-testid={`rice-product-card-${product.id}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ebony/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 font-mono text-xs font-medium tracking-[0.2em] text-ivory drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-xl font-semibold text-ebony transition-colors group-hover:text-gold-dark">
                  {product.name}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ebony/60">{product.desc}</p>
                <button
                  onClick={() => onQuote(product.name)}
                  data-testid={`product-view-details-${product.id}`}
                  className="mt-5 flex items-center gap-1.5 self-start text-[13px] font-semibold text-gold-dark transition-colors hover:text-ebony"
                >
                  View Details
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
              <span className="gold-line h-[2px] w-0 transition-all duration-700 group-hover:w-full" />
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

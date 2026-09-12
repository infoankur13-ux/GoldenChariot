export const CONTACT = {
  location: "Dubai, United Arab Emirates",
  phone: "+971 50 123 4567",
  phoneRaw: "971501234567",
  email: "info@goldenchariot.ae",
};

export const IMAGES = {
  heroBg:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&auto=format&fit=crop",
  heroRice:
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=1200&q=80&auto=format&fit=crop",
  about:
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=80&auto=format&fit=crop",
  ctaBanner:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=80&auto=format&fit=crop",
  worldMap:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1280px-World_map_-_low_resolution.svg.png",
};

export const NAV_LINKS = [
  { label: "Home", target: "#home" },
  { label: "About Us", target: "#about" },
  { label: "Rice Products", target: "#products" },
  { label: "Other Products", target: null },
  { label: "Quality", target: "#quality" },
  { label: "Global Presence", target: "#global" },
  { label: "Contact Us", target: "quote" },
];

export const TRUST_ITEMS = [
  { icon: "Gem", title: "Premium Quality", caption: "Carefully selected products" },
  { icon: "Globe2", title: "Global Sourcing", caption: "Trusted supply network" },
  { icon: "Ship", title: "Reliable Supply", caption: "Consistent service" },
  { icon: "Handshake", title: "Trusted Partnership", caption: "Long-term relationships" },
];

export const PRODUCTS = [
  {
    id: "basmati",
    name: "Basmati Rice",
    desc: "Aromatic, long-grain rice known for its exceptional taste, texture and length.",
    image:
      "https://images.unsplash.com/photo-1686820740687-426a7b9b2043?w=900&q=80&auto=format&fit=crop",
    alt: "Premium Basmati rice grains in a bowl",
  },
  {
    id: "non-basmati",
    name: "Non-Basmati Rice",
    desc: "High-quality non-basmati varieties selected for diverse food and commercial requirements.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80&auto=format&fit=crop",
    alt: "Bowls of premium white non-basmati rice",
  },
  {
    id: "parboiled",
    name: "Parboiled Rice",
    desc: "Nutritious, versatile rice valued for its consistency and excellent cooking performance.",
    image:
      "https://images.unsplash.com/photo-1723475158232-819e29803f4d?w=900&q=80&auto=format&fit=crop",
    alt: "Golden parboiled rice ready for cooking",
  },
  {
    id: "broken",
    name: "Broken Rice",
    desc: "Quality broken rice suitable for food processing and a variety of commercial applications.",
    image:
      "https://images.unsplash.com/photo-1643622357625-c013987d90e7?w=900&q=80&auto=format&fit=crop",
    alt: "Quality broken rice grains for food processing",
  },
];

export const QUALITY_STEPS = [
  {
    num: "01",
    icon: "Wheat",
    title: "Sourcing",
    desc: "Carefully selected sources and trusted suppliers.",
    image:
      "https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Sacks of grains and rice at a sourcing market",
  },
  {
    num: "02",
    icon: "Search",
    title: "Quality Check",
    desc: "Inspection and quality checks at key stages.",
    image:
      "https://images.unsplash.com/photo-1613758235256-43a7bdc21d82?w=600&q=80&auto=format&fit=crop",
    alt: "Technician in white coat performing rice quality inspection",
  },
  {
    num: "03",
    icon: "Factory",
    title: "Processing",
    desc: "Modern and hygienic processing practices.",
    image:
      "https://images.unsplash.com/photo-1748000970909-845f4aa144d2?w=600&q=80&auto=format&fit=crop",
    alt: "Modern rice processing facility",
  },
  {
    num: "04",
    icon: "PackageCheck",
    title: "Packaging",
    desc: "Safe packaging designed for storage and transit.",
    image:
      "https://images.pexels.com/photos/2882009/pexels-photo-2882009.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Warehouse aisle with packaged goods ready for storage and transit",
  },
  {
    num: "05",
    icon: "Ship",
    title: "Global Delivery",
    desc: "Reliable delivery for customers across markets.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&q=80&auto=format&fit=crop",
    alt: "Container cargo ship carrying goods across the sea",
  },
];

export const BENEFITS = [
  { icon: "Users", title: "Customer Focused", caption: "Your success is our priority." },
  { icon: "BadgeCheck", title: "Consistent Quality", caption: "We deliver only the best." },
  { icon: "Anchor", title: "Reliable Supply Chain", caption: "Supporting dependable delivery." },
  { icon: "TrendingUp", title: "Expanding Horizons", caption: "Building a wider food portfolio for the future." },
];

export const PRODUCT_OPTIONS = [
  "Basmati Rice",
  "Non-Basmati Rice",
  "Parboiled Rice",
  "Broken Rice",
  "Other",
];

export const scrollToSection = (target) => {
  const el = document.querySelector(target);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -84, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

import { Link } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";

// Category data
const categories = [
  {
    label: "Men",
    to: "/products?category=men",
    emoji: "👔",
    bg: "bg-stone-100",
  },
  {
    label: "Women",
    to: "/products?category=women",
    emoji: "👗",
    bg: "bg-rose-50",
  },
  {
    label: "Bags",
    to: "/products?category=bags",
    emoji: "👜",
    bg: "bg-amber-50",
  },
  {
    label: "Beauty",
    to: "/products?category=beauty",
    emoji: "✨",
    bg: "bg-pink-50",
  },
  {
    label: "Electronics",
    to: "/products?category=electronics",
    emoji: "🎧",
    bg: "bg-blue-50",
  },
  {
    label: "Accessories",
    to: "/products?category=accessories",
    emoji: "💍",
    bg: "bg-purple-50",
  },
];

// Collage items using your actual local images
const collageItems = [
  {
    src: "/src/assets/women/shirts/shirts_1.jpg",
    span: "row-span-2",
    label: "New Season",
  },
  { src: "/src/assets/men/shirts/shirts_1.jpg", span: "", label: "Men's Edit" },
  { src: "/src/assets/women/frock/frock_1.jpg", span: "", label: "Frocks" },
  { src: "/src/assets/bags/bags_1.jpg", span: "row-span-2", label: "Bags" },
  { src: "/src/assets/women/pants/pants_1.jpg", span: "", label: "Bottoms" },
  {
    src: "/src/assets/accessories/sunglasses/sunglasses_1.jpg",
    span: "",
    label: "Eyewear",
  },
];

const featuredItems = [
  {
    src: "/src/assets/men/shirts/shirts_2.jpg",
    name: "Classic Oversized Tee",
    price: "$59",
    tag: "Men",
    to: "/products?category=men",
  },
  {
    src: "/src/assets/women/shirts/shirts_2.jpg",
    name: "Linen Summer Top",
    price: "$79",
    tag: "Women",
    to: "/products?category=women",
  },
  {
    src: "/src/assets/bags/bags_3.jpg",
    name: "Leather Tote Bag",
    price: "$149",
    tag: "Bags",
    to: "/products?category=bags",
  },
  {
    src: "/src/assets/accessories/watches/watches_1.jpg",
    name: "Minimal Watch",
    price: "$199",
    tag: "Accessories",
    to: "/products?category=accessories",
  },
];

export default function HomePage() {
  return (
    <PageTransition>
      <div className="bg-[#f9f9f7]">
        {/* ── HERO ── */}
        <section className="relative h-[92vh] min-h-[600px] overflow-hidden bg-gray-900">
          <img
            src="/src/assets/hero.png"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24 max-w-7xl">
            <p className="text-white/70 text-sm tracking-[0.3em] uppercase mb-3">
              New Collection — Summer 2024
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-none mb-6 max-w-2xl">
              Wear Your Story
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              Curated fashion for the modern individual. Discover pieces that
              define you.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="bg-white text-gray-900 px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-gray-100 transition-colors"
              >
                Shop Now →
              </Link>
              <Link
                to="/products?category=women"
                className="border border-white text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors"
              >
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs tracking-widest rotate-90 mb-2">
              SCROLL
            </span>
            <div className="w-0.5 h-12 bg-white/30 relative overflow-hidden">
              <div className="absolute top-0 w-full bg-white/60 animate-bounce h-4" />
            </div>
          </div>
        </section>

        {/* ── MARQUEE STRIP ── */}
        <div className="bg-gray-900 text-white py-3 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <span
                  key={i}
                  className="text-xs tracking-[0.3em] uppercase opacity-70"
                >
                  Free shipping over $100 &nbsp;·&nbsp; New arrivals weekly
                  &nbsp;·&nbsp; Easy returns &nbsp;·&nbsp; Premium quality
                </span>
              ))}
          </div>
        </div>

        {/* ── CATEGORIES ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">
                Browse By
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
                Categories
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className={`${cat.bg} rounded-2xl p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-200 group`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-gray-800 tracking-wide">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── EDITORIAL COLLAGE ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">
                Editorial
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
                New Collection
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
            >
              Shop collection
            </Link>
          </div>

          <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[600px]">
            {collageItems.map((item, i) => (
              <Link
                key={i}
                to="/products"
                className={`relative overflow-hidden rounded-xl group bg-gray-200 ${item.span}`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://placehold.co/400x500/e5e7eb/9ca3af?text=${item.label}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label} →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">
                  Handpicked
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
                  Featured Pieces
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
              >
                View all products
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredItems.map((item, i) => (
                <Link key={i} to={item.to} className="group">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] mb-4">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/300x400/e5e7eb/9ca3af?text=${item.name}`;
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                        {item.tag}
                      </span>
                    </div>
                    {/* Quick shop overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gray-900/90 text-white text-center text-sm py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      Quick Shop
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BANNER CTA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-10 py-20 text-center">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 80% 50%, #6366f1 0%, transparent 50%)",
              }}
            />
            <div className="relative">
              <p className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">
                Limited Time
              </p>
              <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-4">
                Summer Sale
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Up to 40% off on selected items
              </p>
              <Link
                to="/products"
                className="inline-block bg-white text-gray-900 px-10 py-4 text-sm font-bold tracking-wide hover:bg-gray-100 transition-colors rounded-full"
              >
                Shop the Sale
              </Link>
            </div>
          </div>
        </section>

        {/* ── NEW ARRIVALS STRIP ── */}
        <section className="bg-white pt-4 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.3em] text-gray-400 uppercase mb-2">
                  Just In
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
                  New Arrivals
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                {
                  src: "/src/assets/women/specials/specials_1.jpg",
                  name: "Special Edition Top",
                  price: "₹899",
                },
                {
                  src: "/src/assets/men/pants/pants_1.jpg",
                  name: "Cargo Trousers",
                  price: "₹1199",
                },
                {
                  src: "/src/assets/bags/bags_5.jpg",
                  name: "Mini Crossbody",
                  price: "₹999",
                },
                {
                  src: "/src/assets/accessories/caps/caps_1.jpg",
                  name: "Washed Cap",
                  price: "₹399",
                },
                {
                  src: "/src/assets/women/frock/frock_2.jpg",
                  name: "Floral Midi Dress",
                  price: "₹1299",
                },
              ].map((item, i) => (
                <Link key={i} to="/products" className="group">
                  <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-square mb-3">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          `https://placehold.co/300x300/e5e7eb/9ca3af?text=New`;
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-gray-900 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                        NEW
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

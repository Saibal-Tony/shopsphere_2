import { Link } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";
import AnimateOnScroll from "../../components/common/AnimateOnScroll";
import { useState, useEffect, useRef } from "react";

// Category data
const categories = [
  {
    label: "Men",
    to: "/products?category=men",
    emoji: "👔",
    bg: "bg-[#f0fafa]",
  },
  {
    label: "Women",
    to: "/products?category=women",
    emoji: "👗",
    bg: "bg-[#ccefef]/40",
  },
  {
    label: "Footwear",
    to: "/products?category=footwear",
    emoji: "👟",
    bg: "bg-[#6BA3BE]/10",
  },
  {
    label: "Bags",
    to: "/products?category=bags",
    emoji: "👜",
    bg: "bg-[#0C969C]/10",
  },
  {
    label: "Beauty",
    to: "/products?category=beauty",
    emoji: "✨",
    bg: "bg-[#032F30]/5",
  },
  {
    label: "Electronics",
    to: "/products?category=electronics",
    emoji: "🎧",
    bg: "bg-[#6BA3BE]/20",
  },
  {
    label: "Accessories",
    to: "/products?category=accessories",
    emoji: "💍",
    bg: "bg-[#f0fafa]",
  },
];

// Collage items using your actual local images
const slides = [
  {
    images: [
      "/assets/women/shirts/shirts_1.jpg",
      "/assets/men/shirts/shirts_1.jpg",
      "/assets/women/frock/frock_1.jpg",
      "/assets/bags/bags_1.jpg",
      "/assets/women/pants/pants_1.jpg",
      "/assets/accessories/sunglasses/sunglasses_1.jpg",
    ],
    label: "New Season",
  },
  {
    images: [
      "/assets/men/shirts/shirts_5.jpg",
      "/assets/footwear/shoes_1.jpg",
      "/assets/bags/bags_7.jpg",
      "/assets/watches/watches_1.jpg",
      "/assets/men/pants/pants_3.jpg",
      "/assets/accessories/caps/caps_1.jpg",
    ],
    label: "Men's Edit",
  },
  {
    images: [
      "/assets/women/frock/frock_3.jpg",
      "/assets/women/shirts/shirts_3.jpg",
      "/assets/bags/bags_11.jpg",
      "/assets/accessories/necklaces/necklaces_1.jpg",
      "/assets/women/pants/pants_5.jpg",
      "/assets/beauty/lipsticks/lipsticks_1.jpg",
    ],
    label: "Women's Edit",
  },
];

const featuredItems = [
  {
    src: "/assets/men/shirts/shirts_2.jpg",
    name: "Classic Oversized Tee",
    price: "₹1,299",
    tag: "Men",
    to: "/products?category=men",
  },
  {
    src: "/assets/women/shirts/shirts_2.jpg",
    name: "Linen Crop Top",
    price: "₹1,499",
    tag: "Women",
    to: "/products?category=women",
  },
  {
    src: "/assets/bags/bags_3.jpg",
    name: "Mini Crossbody",
    price: "₹2,999",
    tag: "Bags",
    to: "/products?category=bags",
  },
  {
    src: "/assets/footwear/shoes_1.jpg",
    name: "Chunky Sole Sneakers",
    price: "₹3,999",
    tag: "Shoes",
    to: "/products?category=footwear",
  },
];

// New arrivals
const newArrivals = [
  {
    src: "/assets/women/specials/specials_1.jpg",
    name: "Special Edition Top",
    price: "₹1,899",
  },
  {
    src: "/assets/men/pants/pants_1.jpg",
    name: "Cargo Wide Leg",
    price: "₹3,299",
  },
  { src: "/assets/bags/bags_5.jpg", name: "Canvas Tote", price: "₹1,299" },
  {
    src: "/assets/accessories/caps/caps_1.jpg",
    name: "Washed Baseball Cap",
    price: "₹899",
  },
  {
    src: "/assets/women/frock/frock_2.jpg",
    name: "Floral Midi Dress",
    price: "₹3,799",
  },
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);
  return (
    <PageTransition>
      <div className="bg-[#f9f9f7]">
        {/* ── HERO ── */}
        <section className="relative h-[92vh] min-h-[600px] overflow-hidden bg-[#031716]">
          <img
            src="/assets/hero_banner.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/hero.png";
            }}
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
        <AnimateOnScroll animation="bottom">
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
        </AnimateOnScroll>

        {/* ── EDITORIAL COLLAGE ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <AnimateOnScroll animation="bottom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#0A7075] uppercase mb-2">
                  Editorial
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#031716]">
                  New Collection
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-[#0A7075] hover:text-[#031716] transition-colors underline underline-offset-4"
              >
                Shop collection
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Slide indicators */}
          <div className="flex gap-2 mb-6">
            {slides.map((slide, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className="flex items-center gap-2 group"
              >
                <div
                  className={`h-0.5 transition-all duration-500 rounded-full ${
                    activeSlide === i
                      ? "w-8 bg-[#0A7075]"
                      : "w-4 bg-gray-300 group-hover:bg-[#0C969C]"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-colors ${
                    activeSlide === i ? "text-[#0A7075]" : "text-gray-400"
                  }`}
                >
                  {slide.label}
                </span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div
            className="hidden md:block relative overflow-hidden rounded-2xl"
            style={{ height: "600px" }}
          >
            {slides.map((slide, slideIdx) => (
              <div
                key={slideIdx}
                className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-3"
                style={{
                  opacity: activeSlide === slideIdx ? 1 : 0,
                  transform:
                    activeSlide === slideIdx
                      ? "scale(1) translateX(0)"
                      : slideIdx < activeSlide
                        ? "scale(0.97) translateX(-20px)"
                        : "scale(0.97) translateX(20px)",
                  transition: "all 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: activeSlide === slideIdx ? "auto" : "none",
                }}
              >
                {slide.images.map((src, i) => (
                  <Link
                    key={i}
                    to="/products"
                    className={`relative overflow-hidden rounded-xl group bg-gray-200 ${
                      i === 0 ? "row-span-2" : i === 3 ? "row-span-2" : ""
                    }`}
                    style={{
                      transition: `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms`,
                      transform:
                        activeSlide === slideIdx
                          ? "translateY(0)"
                          : "translateY(30px)",
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/400x500/031716/0C969C?text=SS";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Mobile — horizontal scroll slider */}
          <div className="md:hidden mt-4 flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
            {slides[activeSlide].images.map((src, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 h-64 rounded-xl overflow-hidden snap-start"
                style={{
                  opacity: 0,
                  transform: "translateX(30px)",
                  animation: `slideInRight 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms forwards`,
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </div>
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
                <AnimateOnScroll key={i} animation="bottom" delay={i * 100}>
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
                </AnimateOnScroll>
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

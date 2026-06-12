import { Link } from "react-router-dom";
import AnimateOnScroll from "../../components/common/AnimateOnScroll";
import { useState, useEffect, useRef } from "react";

// ── Direction map ──
const directionMap = {
  fromLeft: { enter: "translateX(-100%)", exit: "translateX(100%)" },
  fromRight: { enter: "translateX(100%)", exit: "translateX(-100%)" },
  fromTop: { enter: "translateY(-100%)", exit: "translateY(100%)" },
  fromBottom: { enter: "translateY(100%)", exit: "translateY(-100%)" },
};

// ── CollageCell — OUTSIDE HomePage ──
function CollageCell({
  images,
  currentIdx,
  direction,
  rowSpan,
}: {
  images: string[];
  currentIdx: number;
  direction: string;
  rowSpan: boolean;
}) {
  const [layers, setLayers] = useState([{ src: images[0], z: 1 }]);
  const prevIdx = useRef(0);

  const enterFrom: Record<string, string> = {
    fromLeft: "translateX(-100%)",
    fromRight: "translateX(100%)",
    fromTop: "translateY(-100%)",
    fromBottom: "translateY(100%)",
  };

  useEffect(() => {
    if (currentIdx === prevIdx.current) return;
    const newSrc = images[currentIdx];
    prevIdx.current = currentIdx;

    // Add new layer on top, starting offscreen
    setLayers((prev) => [...prev, { src: newSrc, z: prev.length + 1 }]);

    // After it slides in, remove old layers
    const t = setTimeout(() => {
      setLayers([{ src: newSrc, z: 1 }]);
    }, 1000);

    return () => clearTimeout(t);
  }, [currentIdx]);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#031716]"
      style={{ gridRow: rowSpan ? "span 2" : "span 1" }}
    >
      {layers.map((layer, i) => (
        <div
          key={layer.src + layer.z}
          className="absolute inset-0"
          style={{ zIndex: layer.z }}
        >
          <img
            src={layer.src}
            alt=""
            className="w-full h-full object-cover"
            style={{
              animation:
                i === layers.length - 1 && layers.length > 1
                  ? `slideIn_${direction} 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards`
                  : "none",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/400x600/031716/0C969C?text=SS";
            }}
          />
        </div>
      ))}

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/30 via-transparent to-transparent z-20 pointer-events-none" />
    </div>
  );
}

// Animated SVG icon component
function CategoryIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    men: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle
          cx="24"
          cy="14"
          r="7"
          stroke="#0A7075"
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M20 30l4 5 4-5"
          stroke="#0C969C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </svg>
    ),
    women: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle
          cx="24"
          cy="13"
          r="7"
          stroke="#0A7075"
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M15 24l-4 18h26l-4-18"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M17 24c0 0 2 4 7 4s7-4 7-4"
          stroke="#0C969C"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </svg>
    ),
    footwear: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path
          d="M6 32c0 0 4-10 12-10c4 0 6 3 10 3c4 0 6-1 8-1c2 0 6 2 6 6c0 3-2 5-6 5H8c-1.1 0-2-.9-2-2v-1z"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M18 22l2-8 6 2"
          stroke="#0C969C"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <circle
          cx="14"
          cy="33"
          r="2"
          fill="#0C969C"
          className="transition-all duration-300 group-hover:fill-white"
        />
        <circle
          cx="22"
          cy="33"
          r="2"
          fill="#0C969C"
          className="transition-all duration-300 group-hover:fill-white"
        />
      </svg>
    ),
    bags: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect
          x="8"
          y="18"
          width="32"
          height="24"
          rx="4"
          stroke="#0A7075"
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M17 18v-4a7 7 0 0114 0v4"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M8 28h32"
          stroke="#0C969C"
          strokeWidth="2"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M21 33h6"
          stroke="#0C969C"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </svg>
    ),
    beauty: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <path
          d="M24 6c0 0-8 6-8 14a8 8 0 0016 0c0-8-8-14-8-14z"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinejoin="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M20 26c1 2 2.5 3 4 3"
          stroke="#0C969C"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M24 34v8"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M18 42h12"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <circle
          cx="36"
          cy="12"
          r="3"
          stroke="#0C969C"
          strokeWidth="2"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <circle
          cx="12"
          cy="10"
          r="2"
          stroke="#0C969C"
          strokeWidth="2"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </svg>
    ),
    electronics: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect
          x="8"
          y="12"
          width="32"
          height="20"
          rx="3"
          stroke="#0A7075"
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M16 32v4M32 32v4M12 36h24"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <circle
          cx="24"
          cy="22"
          r="4"
          stroke="#0C969C"
          strokeWidth="2"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M24 18v-3M24 26v3M20 22h-3M28 22h3"
          stroke="#0C969C"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </svg>
    ),
    accessories: (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle
          cx="24"
          cy="24"
          r="10"
          stroke="#0A7075"
          strokeWidth="2.5"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <circle
          cx="24"
          cy="24"
          r="4"
          stroke="#0C969C"
          strokeWidth="2"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M24 8v4M24 36v4M8 24h4M36 24h4"
          stroke="#0A7075"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
        <path
          d="M13.1 13.1l2.8 2.8M32.1 32.1l2.8 2.8M13.1 34.9l2.8-2.8M32.1 15.9l2.8-2.8"
          stroke="#0C969C"
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300 group-hover:stroke-white"
        />
      </svg>
    ),
  };
  return icons[type] || null;
}

const categories = [
  {
    label: "Men",
    to: "/products?category=men",
    type: "men",
    bg: "bg-[#f0fafa]",
  },
  {
    label: "Women",
    to: "/products?category=women",
    type: "women",
    bg: "bg-[#e8f7f7]",
  },
  {
    label: "Footwear",
    to: "/products?category=footwear",
    type: "footwear",
    bg: "bg-[#f0fafa]",
  },
  {
    label: "Bags",
    to: "/products?category=bags",
    type: "bags",
    bg: "bg-[#e8f7f7]",
  },
  {
    label: "Beauty",
    to: "/products?category=beauty",
    type: "beauty",
    bg: "bg-[#f0fafa]",
  },
  {
    label: "Electronics",
    to: "/products?category=electronics",
    type: "electronics",
    bg: "bg-[#e8f7f7]",
  },
  {
    label: "Accessories",
    to: "/products?category=accessories",
    type: "accessories",
    bg: "bg-[#f0fafa]",
  },
];

// New grid — 3 cols, 2 rows, only cell 0 spans 2 rows
// Layout:
// [  0  ] [ 1 ] [ 2 ]
// [  0  ] [ 3 ] [ 4 ]
// Cell 5 goes in a separate bottom strip

const cellImages = [
  [
    "/assets/women/shirts/shirts_1.jpg",
    "/assets/men/shirts/shirts_5.jpg",
    "/assets/women/frock/frock_3.jpg",
    "/assets/women/specials/specials_1.jpg",
    "/assets/women/shirts/shirts_7.jpg",
    "/assets/women/specials/specials_3.jpg",
  ],
  [
    "/assets/men/shirts/shirts_1.jpg",
    "/assets/footwear/shoes_1.jpg",
    "/assets/men/pants/pants_1.jpg",
    "/assets/men/shirts/shirts_9.jpg",
    "/assets/footwear/shoes_7.jpg",
    "/assets/men/shirts/shirts_13.jpg",
  ],
  [
    "/assets/women/frock/frock_1.jpg",
    "/assets/bags/bags_7.jpg",
    "/assets/women/shirts/shirts_3.jpg",
    "/assets/beauty/lipsticks/lipsticks_1.jpg",
    "/assets/women/frock/frock_5.jpg",
    "/assets/bags/bags_11.jpg",
  ],
  [
    "/assets/bags/bags_1.jpg",
    "/assets/bags/bags_3.jpg",
    "/assets/watches/watches_1.jpg",
    "/assets/accessories/necklaces/necklaces_1.jpg",
    "/assets/bags/bags_15.jpg",
    "/assets/watches/watches_5.jpg",
  ],
  [
    "/assets/women/pants/pants_1.jpg",
    "/assets/men/pants/pants_3.jpg",
    "/assets/footwear/shoes_3.jpg",
    "/assets/accessories/sunglasses/sunglasses_1.jpg",
    "/assets/footwear/shoes_9.jpg",
    "/assets/men/pants/pants_7.jpg",
  ],
];

const cellDirections = [
  "fromBottom", // cell 0 — tall left
  "fromLeft", // cell 1 — top middle
  "fromRight", // cell 2 — top right
  "fromLeft", // cell 3 — bottom middle
  "fromTop", // cell 4 — bottom right
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
    tag: "Footwear",
    to: "/products?category=footwear",
  },
];

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

// ── HomePage — all useState/useEffect INSIDE here ──
export default function HomePage() {
  const [mobileSlide, setMobileSlide] = useState(0);
  const mobileImages = cellImages.map((arr) => arr[0]);

  useEffect(() => {
    const t = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % mobileImages.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const intervals = cellImages.map(
      (_, i) =>
        setInterval(
          () => {
            setCellIdx((prev) => {
              const next = [...prev];
              next[i] = (next[i] + 1) % cellImages[i].length;
              return next;
            });
          },
          10000 + i * 2000,
        ), // 10s, 12s, 14s, 16s, 18s
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  // Also update initial state to 5 cells:
  const [cellIdx, setCellIdx] = useState([0, 0, 0, 0, 0]);

  return (
    <div className="bg-[#f0fafa]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#031716]/70 via-[#031716]/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end pb-20 px-8 md:px-16 lg:px-24 max-w-7xl">
          <p
            className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4"
            style={{
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both",
            }}
          >
            New Collection — Summer 2024
          </p>
          <h1
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-none mb-6 max-w-2xl"
            style={{
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }}
          >
            Wear Your Story
          </h1>
          <p
            className="text-white/70 text-lg mb-8 max-w-md"
            style={{
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both",
            }}
          >
            Curated fashion for the modern individual.
          </p>
          <div
            className="flex gap-4 flex-wrap"
            style={{
              animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.9s both",
            }}
          >
            <Link
              to="/products"
              className="bg-[#0C969C] text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-[#0A7075] transition-colors rounded-sm"
            >
              Shop Now →
            </Link>
            <Link
              to="/products?category=women"
              className="border border-white/50 text-white px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors rounded-sm"
            >
              New Arrivals
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/40">
          <span
            className="text-[10px] tracking-widest uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <div
              className="absolute top-0 w-full bg-[#0C969C] h-4"
              style={{ animation: "scrollLine 1.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="bg-[#031716] text-white py-3 overflow-hidden">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="text-xs tracking-[0.3em] uppercase text-[#0C969C]/60"
              >
                Free shipping over ₹999 &nbsp;·&nbsp; New arrivals weekly
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
              <p className="text-xs tracking-[0.35em] text-[#0C969C] uppercase mb-2 font-medium">
                Browse By
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#031716]">
                Categories
              </h2>
            </div>
            <Link
              to="/products"
              className="text-sm text-[#0A7075] hover:text-[#031716] transition-colors underline underline-offset-4"
            >
              View all
            </Link>
          </div>
          <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className={`${cat.bg} rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-[#031716] transition-all duration-300 flex-shrink-0 w-24 snap-start`}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  <CategoryIcon type={cat.type} />
                </div>
                <span className="text-xs font-semibold text-[#031716] group-hover:text-white tracking-wide transition-colors duration-300 text-center whitespace-nowrap">
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
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs tracking-[0.35em] text-[#0C969C] uppercase mb-2 font-medium">
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

        {/* Desktop grid */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gridTemplateRows: "300px 300px",
          }}
        >
          {cellImages.map((images, cellI) => (
            <CollageCell
              key={cellI}
              images={images}
              currentIdx={cellIdx[cellI]}
              direction={cellDirections[cellI]}
              rowSpan={cellI === 0} // ← only cell 0 spans 2 rows
            />
          ))}
        </div>

        {/* Mobile collage */}
        <div className="lg:hidden">
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ height: "480px" }}
          >
            {mobileImages.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  opacity: mobileSlide === i ? 1 : 0,
                  transform: mobileSlide === i ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 1s ease, transform 1s ease",
                  zIndex: mobileSlide === i ? 2 : 1,
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/400x480/031716/0C969C?text=SS";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/50 via-transparent to-transparent" />
              </div>
            ))}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {mobileImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    mobileSlide === i
                      ? "w-6 h-1.5 bg-white"
                      : "w-1.5 h-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="bottom">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.35em] text-[#0C969C] uppercase mb-2 font-medium">
                  Handpicked
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#031716]">
                  Featured Pieces
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-[#0A7075] hover:text-[#031716] transition-colors underline underline-offset-4"
              >
                View all
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredItems.map((item, i) => (
              <AnimateOnScroll key={i} animation="bottom" delay={i * 100}>
                <Link to={item.to} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-[#f0fafa] aspect-[3/4] mb-3">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x400/f0fafa/0C969C?text=SS";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 text-[#031716] text-xs px-2.5 py-1 rounded-full font-medium">
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-[#031716]/90 text-white text-center text-xs font-bold py-3 tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      Quick Shop
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-[#031716] mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#0A7075] font-medium">
                    {item.price}
                  </p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER CTA ── */}
      <AnimateOnScroll animation="scale">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div
            className="relative overflow-hidden rounded-3xl px-8 sm:px-16 py-24 text-center"
            style={{
              background:
                "linear-gradient(135deg, #031716 0%, #0A7075 50%, #0C969C 100%)",
            }}
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#0C969C]/20" />

            <div className="relative">
              <p className="text-[#0C969C]/80 text-xs tracking-[0.5em] uppercase mb-4 font-medium">
                Limited Time
              </p>

              <h2 className="font-serif text-5xl md:text-7xl text-white font-bold mb-4">
                Summer Sale
              </h2>

              <p className="text-white/60 text-lg mb-10">
                Up to 40% off on selected items
              </p>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-white text-[#031716] px-10 py-4 text-sm font-bold tracking-wide hover:bg-[#0C969C] hover:text-white transition-all duration-300 rounded-full"
              >
                Shop the Sale
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </AnimateOnScroll>

      {/* ── NEW ARRIVALS ── */}
      <section className="bg-white pt-4 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="bottom">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs tracking-[0.35em] text-[#0C969C] uppercase mb-2 font-medium">
                  Just In
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#031716]">
                  New Arrivals
                </h2>
              </div>
              <Link
                to="/products"
                className="text-sm text-[#0A7075] hover:text-[#031716] transition-colors underline underline-offset-4"
              >
                View all
              </Link>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {newArrivals.map((item, i) => (
              <AnimateOnScroll key={i} animation="bottom" delay={i * 80}>
                <Link to="/products" className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-[#f0fafa] aspect-square mb-3">
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x300/f0fafa/0C969C?text=New";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-[#031716] text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                        NEW
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-[#031716] truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#0A7075] font-medium mt-0.5">
                    {item.price}
                  </p>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

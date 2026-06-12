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
  const [displayIdx, setDisplayIdx] = useState(currentIdx);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const prevIdx = useRef(currentIdx);
  const dir = directionMap[direction as keyof typeof directionMap];

  useEffect(() => {
    if (currentIdx === prevIdx.current) return;
    setPhase("exit");
    const t1 = setTimeout(() => {
      setDisplayIdx(currentIdx);
      setPhase("enter");
      prevIdx.current = currentIdx;
    }, 700); // ← was 500

    const t2 = setTimeout(() => setPhase("idle"), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentIdx]);

  const getTransform = () => {
    if (phase === "exit") return dir.exit;
    if (phase === "enter") return dir.enter;
    return "translate(0,0)";
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-[#031716] group"
      style={{ gridRow: rowSpan ? "span 2" : "span 1" }}
    >
      <img
        src={images[displayIdx]}
        alt=""
        className="w-full h-full object-cover"
        style={{
          transform: getTransform(),
          transition:
            phase === "idle"
              ? "none"
              : "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/400x600/031716/0C969C?text=SS";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#031716]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === displayIdx ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Static data — OUTSIDE HomePage ──
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

// New grid — 3 cols, 2 rows, only cell 0 spans 2 rows
// Layout:
// [  0  ] [ 1 ] [ 2 ]
// [  0  ] [ 3 ] [ 4 ]
// Cell 5 goes in a separate bottom strip

const cellImages = [
  // Cell 0 — tall left (row-span-2)
  [
    "/assets/women/shirts/shirts_1.jpg",
    "/assets/men/shirts/shirts_5.jpg",
    "/assets/women/frock/frock_3.jpg",
    "/assets/women/specials/specials_1.jpg",
  ],
  // Cell 1 — top middle
  [
    "/assets/men/shirts/shirts_1.jpg",
    "/assets/footwear/shoes_1.jpg",
    "/assets/men/pants/pants_1.jpg",
    "/assets/men/shirts/shirts_9.jpg",
  ],
  // Cell 2 — top right
  [
    "/assets/women/frock/frock_1.jpg",
    "/assets/bags/bags_7.jpg",
    "/assets/women/shirts/shirts_3.jpg",
    "/assets/beauty/lipsticks/lipsticks_1.jpg",
  ],
  // Cell 3 — bottom middle
  [
    "/assets/bags/bags_1.jpg",
    "/assets/bags/bags_3.jpg",
    "/assets/bags/bags_11.jpg",
    "/assets/accessories/necklaces/necklaces_1.jpg",
  ],
  // Cell 4 — bottom right
  [
    "/assets/women/pants/pants_1.jpg",
    "/assets/men/pants/pants_3.jpg",
    "/assets/footwear/shoes_3.jpg",
    "/assets/accessories/sunglasses/sunglasses_1.jpg",
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
          6000 + i * 1200,
        ), // ← much slower: 6s, 7.2s, 8.4s, 9.6s, 10.8s
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
              <p className="text-xs tracking-[0.3em] text-[#0A7075] uppercase mb-2">
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
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.to}
                className={`${cat.bg} rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 hover:scale-105 hover:bg-[#031716] hover:text-white transition-all duration-300 group`}
              >
                <span className="text-2xl sm:text-3xl">{cat.emoji}</span>
                <span className="text-xs sm:text-sm font-semibold text-[#031716] group-hover:text-white tracking-wide transition-colors">
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

        {/* Mobile — horizontal scroll */}
        <div className="md:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory">
          {cellImages.map((images, cellI) => (
            <div
              key={cellI}
              className="flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden snap-start bg-[#031716]"
            >
              <img
                src={images[cellIdx[cellI]]}
                alt=""
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/200x260/031716/0C969C?text=SS";
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="bottom">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-xs tracking-[0.3em] text-[#0A7075] uppercase mb-2">
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
            className="relative overflow-hidden rounded-3xl px-8 sm:px-16 py-20 text-center"
            style={{
              background:
                "linear-gradient(135deg, #031716 0%, #032F30 50%, #0A7075 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, #0C969C, transparent 50%), radial-gradient(circle at 80% 50%, #6BA3BE, transparent 50%)",
              }}
            />
            <div className="relative">
              <p className="text-[#0C969C] text-xs tracking-[0.4em] uppercase mb-4">
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
                className="inline-block bg-white text-[#031716] px-10 py-4 text-sm font-bold tracking-wide hover:bg-[#0C969C] hover:text-white transition-all duration-300 rounded-full"
              >
                Shop the Sale
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
                <p className="text-xs tracking-[0.3em] text-[#0A7075] uppercase mb-2">
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

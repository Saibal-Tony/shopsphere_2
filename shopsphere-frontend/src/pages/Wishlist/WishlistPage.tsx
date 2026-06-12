import { useWishlist } from "../../context/WishlistContext";
import { Link } from "react-router-dom";
import AnimateOnScroll from "../../components/common/AnimateOnScroll";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="min-h-screen bg-[#f0fafa]">
      <div className="bg-gradient-to-r from-[#031716] to-[#032F30] text-white py-16 px-8">
        <AnimateOnScroll animation="bottom">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#0C969C] text-xs tracking-[0.4em] uppercase mb-3">
              Your Collection
            </p>
            <h1 className="font-serif text-5xl font-bold mb-2">Wishlist</h1>
            <p className="text-white/40 text-sm">
              {items.length} saved item{items.length !== 1 ? "s" : ""}
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <AnimateOnScroll animation="scale">
            <div className="text-center py-20">
              <div
                className="w-24 h-24 rounded-full bg-[#0C969C]/10 flex items-center justify-center mx-auto mb-6"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              >
                <svg
                  className="w-10 h-10 text-[#0C969C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <h2 className="font-serif text-3xl text-[#031716] mb-3">
                Nothing saved yet
              </h2>
              <p className="text-gray-400 text-sm mb-10 max-w-sm mx-auto">
                Tap the heart on any product to save it here
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#031716] text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-[#0A7075] transition-all duration-300"
              >
                Discover Products →
              </Link>
            </div>
          </AnimateOnScroll>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((item, i) => (
              <AnimateOnScroll key={item.id} animation="bottom" delay={i * 60}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <Link to={`/products/${item.id}`}>
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/300x400/f0fafa/0C969C?text=SS";
                        }}
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <p className="text-xs text-[#0A7075] capitalize mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-semibold text-[#031716] text-sm mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0A7075]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/common/PageTransition";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f0fafa]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#031716] to-[#032F30] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-[#0C969C] text-xs tracking-[0.3em] uppercase mb-2">
              Your
            </p>
            <h1 className="font-serif text-4xl font-bold">Wishlist</h1>
            <p className="text-white/50 text-sm mt-2">
              {items.length} saved items
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 rounded-full bg-[#0C969C]/10 flex items-center justify-center mx-auto mb-6">
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
              <h2 className="font-serif text-2xl text-gray-900 mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto">
                Save items you love and come back to them anytime
              </p>
              <Link
                to="/products"
                className="inline-block bg-[#0A7075] text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#032F30] transition-colors"
              >
                Discover Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link to={`/products/${item.id}`}>
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/300x400/e5e7eb/9ca3af?text=img";
                        }}
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 capitalize mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0A7075]">
                        ₹{item.price}
                      </span>
                      <Link
                        to={`/products/${item.id}`}
                        className="text-xs bg-[#031716] text-white px-3 py-1.5 rounded-full hover:bg-[#0A7075] transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import PageTransition from "../../components/common/PageTransition";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, totalItems } = useCart();

  if (items.length === 0)
    return (
      <div className="min-h-screen bg-[#f9f9f7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="font-serif text-2xl text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Add some products to get started
          </p>
          <Link
            to="/products"
            className="bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f9f9f7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">
            Your Cart
          </h1>
          <p className="text-sm text-gray-400 mb-10">
            {totalItems} item{totalItems !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="bg-white rounded-2xl p-5 flex gap-5"
                >
                  <div className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/96x112/e5e7eb/9ca3af?text=img";
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
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
                    </div>

                    <div className="flex gap-3 mt-1 mb-3">
                      {item.size && (
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          Size: {item.size}
                        </span>
                      )}
                      {item.color && (
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                          {item.color}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQty(
                              item.productId,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 text-sm font-bold"
                        >
                          −
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(
                              item.productId,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50 text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-24">
                <h2 className="font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span
                      className={
                        totalPrice > 999 ? "text-green-600 font-medium" : ""
                      }
                    >
                      {totalPrice > 999 ? "FREE" : "₹99"}
                    </span>
                  </div>
                  {totalPrice > 999 && (
                    <p className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                      🎉 You qualify for free shipping!
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      ₹
                      {(
                        totalPrice + (totalPrice > 999 ? 0 : 99)
                      ).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full block text-center bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors"
                >
                  Proceed to Checkout →
                </Link>

                <Link
                  to="/products"
                  className="w-full block text-center text-gray-500 text-sm mt-4 hover:text-gray-700 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

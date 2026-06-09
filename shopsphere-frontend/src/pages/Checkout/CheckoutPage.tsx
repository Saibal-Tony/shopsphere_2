import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
// import { useAuth } from "../../context/AuthContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { showToast } = useToast();
  // const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("cod");

  const shipping = totalPrice > 999 ? 0 : 99;
  const total = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f9f7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-semibold"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.line1 ||
      !address.city ||
      !address.pincode
    ) {
      showToast("Please fill all required fields", "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    showToast("Order placed successfully! 🎉", "success");
    navigate("/orders");
    setLoading(false);
  };

  const steps = ["Address", "Payment", "Review"];

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            to="/cart"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-gray-900">
            Checkout
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${step === i + 1 ? "text-gray-900" : "text-gray-400"}`}
                >
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-3 transition-colors ${step > i + 1 ? "bg-green-500" : "bg-gray-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Steps */}
          <div className="lg:col-span-2">
            {/* Step 1 — Address */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-semibold text-gray-900 mb-6">
                  Delivery Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      key: "fullName",
                      label: "Full Name *",
                      placeholder: "John Doe",
                      col: "sm:col-span-1",
                    },
                    {
                      key: "phone",
                      label: "Phone Number *",
                      placeholder: "10-digit mobile",
                      col: "sm:col-span-1",
                    },
                    {
                      key: "line1",
                      label: "Address Line 1 *",
                      placeholder: "House/Flat No, Street",
                      col: "sm:col-span-2",
                    },
                    {
                      key: "line2",
                      label: "Address Line 2",
                      placeholder: "Area, Landmark (optional)",
                      col: "sm:col-span-2",
                    },
                    {
                      key: "city",
                      label: "City *",
                      placeholder: "Mumbai",
                      col: "",
                    },
                    {
                      key: "state",
                      label: "State *",
                      placeholder: "Maharashtra",
                      col: "",
                    },
                    {
                      key: "pincode",
                      label: "Pincode *",
                      placeholder: "400001",
                      col: "",
                    },
                  ].map((field) => (
                    <div key={field.key} className={field.col}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={address[field.key as keyof typeof address]}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            [field.key]: e.target.value,
                          }))
                        }
                        placeholder={field.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-white transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* Step 2 — Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-semibold text-gray-900 mb-6">
                  Payment Method
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      value: "cod",
                      label: "Cash on Delivery",
                      sub: "Pay when you receive",
                      icon: "💵",
                    },
                    {
                      value: "upi",
                      label: "UPI",
                      sub: "PhonePe, GPay, Paytm",
                      icon: "📱",
                    },
                    {
                      value: "card",
                      label: "Credit / Debit Card",
                      sub: "Visa, Mastercard, RuPay",
                      icon: "💳",
                    },
                    {
                      value: "netbanking",
                      label: "Net Banking",
                      sub: "All major banks",
                      icon: "🏦",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        payment === opt.value
                          ? "border-gray-900 bg-gray-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.value}
                        checked={payment === opt.value}
                        onChange={() => setPayment(opt.value)}
                        className="sr-only"
                      />
                      <span className="text-2xl">{opt.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {opt.label}
                        </p>
                        <p className="text-xs text-gray-400">{opt.sub}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          payment === opt.value
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                      >
                        {payment === opt.value && (
                          <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Review */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6">
                <h2 className="font-semibold text-gray-900 mb-6">
                  Review Your Order
                </h2>

                {/* Address summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Delivery Address
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-gray-400 hover:text-gray-600 underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {address.fullName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}
                  </p>
                  <p className="text-sm text-gray-600">
                    {address.city}, {address.state} — {address.pincode}
                  </p>
                  <p className="text-sm text-gray-600">📞 {address.phone}</p>
                </div>

                {/* Payment summary */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      Payment
                    </p>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-gray-400 hover:text-gray-600 underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 capitalize">
                    {payment === "cod"
                      ? "Cash on Delivery"
                      : payment.toUpperCase()}
                  </p>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://placehold.co/56x56/e5e7eb/9ca3af?text=img";
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.size && `Size: ${item.size} · `}Qty:{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-gray-900 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-700 transition-colors disabled:opacity-60"
                  >
                    {loading ? "Placing Order..." : "Place Order 🎉"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right — Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-5">
                Order Summary
              </h3>
              <div className="flex flex-col gap-3 mb-5 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex items-center gap-2"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/40x40/e5e7eb/9ca3af";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">×{item.quantity}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-medium" : ""
                    }
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

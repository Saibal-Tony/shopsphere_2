import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/productApi";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import PageTransition from "../../components/common/PageTransition";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [imgIdx, setImgIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const { isWishlisted, toggle } = useWishlist();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading product...</p>
        </div>
      </div>
    );

  if (isError || !product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Product not found</p>
          <Link to="/products" className="text-sm underline text-gray-600">
            ← Back to products
          </Link>
        </div>
      </div>
    );

  const hasDiscount =
    product.discountedPrice && product.discountedPrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(
        (1 - Number(product.discountedPrice) / Number(product.price)) * 100,
      )
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      showToast("Please select a size", "error");
      return;
    }
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.discountedPrice || product.price),
      image: product.imageUrls?.[0] || "",
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    setAdded(true);
    showToast(`${product.name} added to cart!`, "success");
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f9f9f7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-8">
            <Link to="/" className="hover:text-gray-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gray-600">
              Products
            </Link>
            <span>/</span>
            <Link
              to={`/products?category=${product.category}`}
              className="hover:text-gray-600 capitalize"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-600">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            {/* Images */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              {product.imageUrls?.length > 1 && (
                <div className="flex flex-col gap-3 w-16 flex-shrink-0">
                  {product.imageUrls.map((url, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        imgIdx === i ? "border-gray-900" : "border-transparent"
                      }`}
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/64x64/e5e7eb/9ca3af?text=img";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1 relative overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4]">
                <img
                  src={product.imageUrls?.[imgIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://placehold.co/600x800/e5e7eb/9ca3af?text=${encodeURIComponent(product.name)}`;
                  }}
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                      NEW
                    </span>
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                      -{discountPct}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Category */}
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-2 capitalize">
                {product.category} · {product.subCategory}
              </p>

              {/* Name */}
              <h1 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg
                        key={s}
                        className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-amber-400" : "fill-gray-200"}`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                {hasDiscount ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.discountedPrice}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      ₹{product.price}
                    </span>
                    <span className="bg-red-100 text-red-600 text-sm px-2.5 py-1 rounded-full font-semibold">
                      Save {discountPct}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors?.length > 0 && product.colors[0] !== "N/A" && (
                <div className="mb-6">
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-900 mb-3">
                    Color:{" "}
                    <span className="font-normal text-gray-500">
                      {selectedColor || "Select"}
                    </span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${
                          selectedColor === color
                            ? "bg-gray-900 text-white border-gray-900"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes?.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-900 mb-3">
                    Size:{" "}
                    <span className="font-normal text-gray-500">
                      {selectedSize || "Select"}
                    </span>
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[48px] h-12 px-3 rounded-xl text-sm font-semibold border transition-colors ${
                          selectedSize === size
                            ? "bg-gray-900 text-white border-gray-900"
                            : "border-gray-200 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex gap-3 mb-6">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 text-sm font-semibold min-w-[48px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold tracking-wide transition-all ${
                    added
                      ? "bg-green-600 text-white"
                      : product.inStock
                        ? "bg-gray-900 text-white hover:bg-gray-700"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {added
                    ? "✓ Added to Cart"
                    : product.inStock
                      ? "Add to Cart"
                      : "Out of Stock"}
                </button>

                {/* Wishlist */}
                <button
                  onClick={() =>
                    toggle({
                      id: product.id,
                      name: product.name,
                      price: Number(product.discountedPrice || product.price),
                      image: product.imageUrls?.[0] || "",
                      category: product.category,
                    })
                  }
                  className={`w-12 h-12 border rounded-xl flex items-center justify-center transition-colors ${
                    isWishlisted(product.id)
                      ? "border-[#0C969C] bg-[#0C969C]/10 text-[#0C969C]"
                      : "border-gray-200 hover:border-[#0C969C] hover:text-[#0C969C]"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={isWishlisted(product.id) ? "currentColor" : "none"}
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
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100">
                {[
                  {
                    icon: "🚚",
                    label: "Free Delivery",
                    sub: "Orders over ₹999",
                  },
                  { icon: "↩️", label: "Easy Returns", sub: "30 day policy" },
                  { icon: "🔒", label: "Secure Pay", sub: "100% protected" },
                ].map((b) => (
                  <div key={b.label} className="text-center">
                    <div className="text-2xl mb-1">{b.icon}</div>
                    <p className="text-xs font-semibold text-gray-700">
                      {b.label}
                    </p>
                    <p className="text-[10px] text-gray-400">{b.sub}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              {product.tags?.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-6 pt-6 border-t border-gray-100">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

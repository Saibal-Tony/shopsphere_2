import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const { isWishlisted, toggle } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const wishlisted = isWishlisted(product.id);
  const image = product.imageUrls?.[imgIdx] || product.imageUrls?.[0];
  const hasDiscount =
    product.discountedPrice &&
    Number(product.discountedPrice) < Number(product.price);
  const discountPct = hasDiscount
    ? Math.round(
        (1 - Number(product.discountedPrice) / Number(product.price)) * 100,
      )
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle({
      id: product.id,
      name: product.name,
      price: Number(product.discountedPrice || product.price),
      image: product.imageUrls?.[0] || "",
      category: product.category,
    });
    showToast(
      wishlisted ? "Removed from wishlist" : `${product.name} saved!`,
      wishlisted ? "info" : "success",
    );
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: Number(product.discountedPrice || product.price),
      image: product.imageUrls?.[0] || "",
      size: product.sizes?.[0] || "",
      color: product.colors?.[0] || "",
      quantity: 1,
    });
    setAdding(true);
    showToast(`${product.name} added to cart!`, "success");
    setTimeout(() => setAdding(false), 1500);
  };

  return (
    <div className="group relative flex flex-col">
      {/* ── Image Container ── */}
      <Link to={`/products/${product.id}`}>
        <div
          className="relative overflow-hidden rounded-2xl bg-[#f0fafa] aspect-[3/4] mb-3 cursor-pointer"
          onMouseEnter={() => product.imageUrls?.length > 1 && setImgIdx(1)}
          onMouseLeave={() => setImgIdx(0)}
        >
          {/* Main image */}
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://placehold.co/300x400/f0fafa/0C969C?text=${encodeURIComponent(
                  product.name.slice(0, 8),
                )}`;
            }}
          />

          {/* ── Badges ── */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-[#031716] text-white text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide">
                NEW
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
                -{discountPct}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-400 text-white text-[10px] px-2.5 py-1 rounded-full font-semibold">
                SOLD OUT
              </span>
            )}
          </div>

          {/* ── Wishlist Button ── */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              wishlisted
                ? "bg-[#0C969C] opacity-100 scale-100"
                : "bg-white/90 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            } hover:scale-110`}
            aria-label="Toggle wishlist"
          >
            <svg
              className={`w-4 h-4 transition-colors ${
                wishlisted
                  ? "fill-white stroke-white"
                  : "fill-none stroke-gray-700"
              }`}
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

          {/* ── Quick Add Button ── */}
          {product.inStock && (
            <button
              onClick={handleQuickAdd}
              className={`absolute inset-x-0 bottom-0 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-400 ${
                adding
                  ? "bg-[#0A7075] text-white translate-y-0"
                  : "bg-[#031716]/90 text-white translate-y-full group-hover:translate-y-0"
              }`}
            >
              {adding ? "✓ Added" : "Quick Add"}
            </button>
          )}

          {/* ── Image dots (multiple images) ── */}
          {product.imageUrls?.length > 1 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.imageUrls.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setImgIdx(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === imgIdx ? "bg-white scale-125" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* ── Product Info ── */}
      <div className="flex flex-col gap-1 flex-1">
        {/* Category */}
        <p className="text-[10px] text-[#0A7075] uppercase tracking-wider font-medium capitalize">
          {product.category}
          {product.subCategory ? ` · ${product.subCategory}` : ""}
        </p>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm font-semibold text-[#031716] hover:text-[#0A7075] transition-colors leading-tight line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.round(product.rating)
                      ? "fill-amber-400"
                      : "fill-gray-200"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-[10px] text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          {hasDiscount ? (
            <>
              <span className="text-sm font-bold text-[#0A7075]">
                ₹{Number(product.discountedPrice).toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </span>
            </>
          ) : (
            <span className="text-sm font-bold text-[#031716]">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Sizes */}
        {product.sizes?.length > 0 && product.sizes[0] !== "One Size" && (
          <div className="flex gap-1 flex-wrap mt-1">
            {product.sizes.slice(0, 5).map((size) => (
              <span
                key={size}
                className="text-[10px] border border-[#0A7075]/20 text-[#0A7075] px-1.5 py-0.5 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 5 && (
              <span className="text-[10px] text-gray-400">
                +{product.sizes.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

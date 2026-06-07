import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/productApi";
import ProductCard from "../../components/Product/ProductCard";
import type { ProductFilters } from "../../types/Product";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];
const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Bags", value: "bags" },
  { label: "Beauty", value: "beauty" },
  { label: "Electronics", value: "electronics" },
  { label: "Accessories", value: "accessories" },
];
const PRICE_RANGES = [
  { label: "All Prices", min: undefined, max: undefined },
  { label: "Under ₹999", min: 0, max: 999 },
  { label: "₹999 – ₹2,999", min: 999, max: 2999 },
  { label: "₹2,999 – ₹9,999", min: 2999, max: 9999 },
  { label: "Over ₹9,999", min: 9999, max: undefined },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(
    searchParams.get("search") || "",
  );

  const [filters, setFilters] = useState<ProductFilters>({
    category: searchParams.get("category") || "",
    search: searchParams.get("search") || "",
    sizes: [],
    inStock: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: "newest",
    page: 0,
    size: 12,
  });

  // Sync URL params to filters
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get("category") || "",
      search: searchParams.get("search") || "",
    }));
  }, [searchParams]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    placeholderData: (prev) => prev,
  });

  const updateFilter = useCallback(
    <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value, page: 0 }));
    },
    [],
  );

  const toggleSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes?.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...(prev.sizes || []), size],
      page: 0,
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilter("search", localSearch);
    setSearchParams((prev) => {
      if (localSearch) prev.set("search", localSearch);
      else prev.delete("search");
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      search: "",
      sizes: [],
      inStock: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sortBy: "newest",
      page: 0,
      size: 12,
    });
    setLocalSearch("");
    setSearchParams({});
  };

  const products = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;

  // Sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col gap-8">
      {/* Category */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">
          Category
        </h3>
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                updateFilter("category", cat.value);
                setSearchParams(cat.value ? { category: cat.value } : {});
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.category === cat.value
                  ? "bg-gray-900 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">
          Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`w-11 h-11 rounded-lg text-xs font-semibold border transition-colors ${
                filters.sizes?.includes(size)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-200 text-gray-700 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">
          Price Range
        </h3>
        <div className="flex flex-col gap-1">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => {
                updateFilter("minPrice", range.min);
                updateFilter("maxPrice", range.max);
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.minPrice === range.min && filters.maxPrice === range.max
                  ? "bg-gray-900 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900 mb-4">
          Availability
        </h3>
        <div className="flex flex-col gap-2">
          {[
            { label: "All", value: undefined },
            { label: "In Stock", value: true },
            { label: "Out of Stock", value: false },
          ].map((opt) => (
            <label
              key={String(opt.value)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                onClick={() => updateFilter("inStock", opt.value)}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                  filters.inStock === opt.value
                    ? "bg-gray-900 border-gray-900"
                    : "border-gray-300 group-hover:border-gray-500"
                }`}
              >
                {filters.inStock === opt.value && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-600">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={clearFilters}
        className="text-sm text-red-500 hover:text-red-700 transition-colors text-left font-medium"
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9f9f7]">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-gray-400 mb-1">
            Home / <span className="text-gray-600">Products</span>
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 font-bold">
            {filters.category
              ? filters.category.charAt(0).toUpperCase() +
                filters.category.slice(1)
              : "All Products"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top bar */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex-1 min-w-[200px] max-w-sm flex gap-2"
          >
            <div className="relative flex-1">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-full text-sm outline-none focus:border-gray-400 bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Go
            </button>
          </form>

          {/* Category tabs */}
          <div className="hidden md:flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  updateFilter("category", cat.value);
                  setSearchParams(cat.value ? { category: cat.value } : {});
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filters.category === cat.value
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) =>
              updateFilter("sortBy", e.target.value as ProductFilters["sortBy"])
            }
            className="ml-auto border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none bg-white text-gray-700 cursor-pointer"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 text-sm bg-white"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
              />
            </svg>
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — Desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-6 text-sm tracking-wide">
                FILTERS
              </h2>
              <SidebarContent />
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-gray-900">Filters</h2>
                  <button onClick={() => setSidebarOpen(false)}>
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <SidebarContent />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                {isLoading ? "Loading..." : `${totalElements} products`}
              </p>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array(8)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 rounded-xl aspect-[3/4] mb-3" />
                      <div className="h-3 bg-gray-200 rounded mb-2 w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  ))}
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-2">
                  Failed to load products
                </p>
                <p className="text-gray-300 text-sm">
                  Make sure the backend is running on port 8080
                </p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && products.length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 underline hover:text-gray-600"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* Grid */}
            {!isLoading && products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() =>
                    updateFilter("page", Math.max(0, (filters.page || 0) - 1))
                  }
                  disabled={(filters.page || 0) === 0}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm disabled:opacity-40 hover:border-gray-400 transition-colors bg-white"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => updateFilter("page", i)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                      (filters.page || 0) === i
                        ? "bg-gray-900 text-white"
                        : "border border-gray-200 hover:border-gray-400 bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    updateFilter(
                      "page",
                      Math.min(totalPages - 1, (filters.page || 0) + 1),
                    )
                  }
                  disabled={(filters.page || 0) >= totalPages - 1}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm disabled:opacity-40 hover:border-gray-400 transition-colors bg-white"
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Men", to: "/products?category=men" },
    { label: "Women", to: "/products?category=women" },
    { label: "Footwear", to: "/products?category=footwear" },
    { label: "Bags", to: "/products?category=bags" },
    { label: "Beauty", to: "/products?category=beauty" },
    { label: "Electronics", to: "/products?category=electronics" },
  ];

  // Is hero page (transparent navbar needed)
  const isHero = location.pathname === "/";
  const transparent = isHero && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          transparent
            ? "bg-transparent"
            : "bg-white/98 backdrop-blur-lg shadow-sm border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-2 lg:gap-4">
            {/* Logo — always visible, no absolute positioning */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                  transparent
                    ? "bg-white/20 text-white"
                    : "bg-[#031716] text-white"
                }`}
              >
                SS
              </div>
              {/* Hide text on small mobile to save space */}
              <span
                className={`font-bold tracking-[0.1em] uppercase text-sm hidden sm:block transition-colors duration-300 ${
                  transparent ? "text-white" : "text-[#031716]"
                }`}
              >
                ShopSphere
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-5 flex-1 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group whitespace-nowrap ${
                    transparent
                      ? "text-white/80 hover:text-white"
                      : "text-[#032F30] hover:text-[#0A7075]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      transparent ? "bg-white" : "bg-[#0C969C]"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right icons — ml-auto pushes to right */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-colors ${
                  transparent
                    ? "text-white hover:bg-white/15"
                    : "text-[#031716] hover:bg-[#f0fafa]"
                }`}
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
                    strokeWidth={1.5}
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>

              <Link
                to="/wishlist"
                className={`p-2 rounded-full transition-colors hidden sm:flex ${
                  transparent
                    ? "text-white hover:bg-white/15"
                    : "text-[#031716] hover:bg-[#f0fafa]"
                }`}
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
                    strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </Link>

              <Link
                to="/cart"
                className={`relative p-2 rounded-full transition-colors ${
                  transparent
                    ? "text-white hover:bg-white/15"
                    : "text-[#031716] hover:bg-[#f0fafa]"
                }`}
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
                    strokeWidth={1.5}
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
                  />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#0C969C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative group">
                  <button
                    className={`p-1.5 rounded-full transition-colors ${
                      transparent ? "hover:bg-white/15" : "hover:bg-[#f0fafa]"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#0A7075] text-white text-xs font-bold flex items-center justify-center">
                      {user?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-sm font-bold text-[#031716]">
                        {user?.username}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-[#f0fafa] rounded-xl"
                      >
                        📦 My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-[#f0fafa] rounded-xl"
                      >
                        🤍 Wishlist
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-[#f0fafa] rounded-xl"
                        >
                          ⚙️ Admin
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl mt-1"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`hidden sm:flex items-center px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    transparent
                      ? "border border-white/40 text-white hover:bg-white/15"
                      : "bg-[#031716] text-white hover:bg-[#0A7075]"
                  }`}
                >
                  Sign In
                </Link>
              )}

              {/* Hamburger — mobile only, NO close X here */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 ml-1 transition-colors ${
                  transparent ? "text-white" : "text-[#031716]"
                }`}
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
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            searchOpen
              ? "max-h-16 border-t border-gray-100 bg-white"
              : "max-h-0"
          }`}
        >
          <form
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto px-4 py-3 flex gap-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, categories..."
              className="flex-1 border border-gray-200 rounded-full px-5 py-2 text-sm outline-none focus:border-[#0C969C] transition-colors bg-white"
              autoFocus={searchOpen}
            />
            <button
              type="submit"
              className="bg-[#031716] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#0A7075] transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-[#031716] shadow-2xl flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer top — just brand, no X button */}
          <div className="flex items-center gap-3 p-6 border-b border-white/10">
            <div className="w-9 h-9 rounded-xl bg-[#0C969C] flex items-center justify-center text-white font-bold text-sm">
              SS
            </div>
            <div>
              <p className="text-white font-bold tracking-widest uppercase text-sm">
                ShopSphere
              </p>
              <p className="text-[#0C969C] text-[10px] tracking-widest uppercase">
                Premium Fashion
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="p-4 border-b border-white/10">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-white/8 border border-white/15 rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#0C969C] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#0C969C] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#0A7075] transition-colors"
              >
                Go
              </button>
            </form>
          </div>

          {/* Nav links */}
          <nav className="flex-1 p-3 overflow-y-auto">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between py-3.5 px-4 text-sm font-medium text-white/70 hover:text-white hover:bg-white/8 rounded-xl transition-all duration-200 group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {link.label}
                <svg
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
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
            ))}

            {/* Extra links */}
            <div className="border-t border-white/10 mt-3 pt-3">
              <Link
                to="/wishlist"
                className="flex items-center gap-3 py-3 px-4 text-sm text-white/50 hover:text-white hover:bg-white/8 rounded-xl transition-all"
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
                    strokeWidth={1.5}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                Wishlist
              </Link>
              <Link
                to="/orders"
                className="flex items-center gap-3 py-3 px-4 text-sm text-white/50 hover:text-white hover:bg-white/8 rounded-xl transition-all"
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
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                My Orders
              </Link>
            </div>
          </nav>

          {/* Bottom auth */}
          {!isAuthenticated && (
            <div className="p-4 border-t border-white/10">
              <Link
                to="/register"
                className="w-full flex items-center justify-center py-3 bg-[#0C969C] text-white text-sm font-semibold rounded-full hover:bg-[#0A7075] transition-colors mb-2"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="w-full flex items-center justify-center py-3 border border-white/20 text-white/70 text-sm rounded-full hover:bg-white/8 transition-colors"
              >
                Sign In
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#0A7075] text-white font-bold text-sm flex items-center justify-center">
                  {user?.username?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {user?.username}
                  </p>
                  <p className="text-white/40 text-xs truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center py-2.5 border border-red-500/30 text-red-400 text-sm rounded-full hover:bg-red-500/10 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Only add spacer when not on hero (hero handles its own height) */}
      {!isHero && <div className="h-16" />}
    </>
  );
}

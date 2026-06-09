import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../api/authApi";
import { useToast } from "../../context/ToastContext";
import PageTransition from "../../components/common/PageTransition";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(email, password);
      authLogin(res.token, {
        id: res.id,
        username: res.username,
        email: res.email,
        role: res.role as "USER" | "ADMIN",
      });
      showToast(`Welcome back, ${res.username}!`, "success");
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Invalid email or password";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f9f9f7] flex">
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-16">
          <div className="max-w-sm w-full mx-auto">
            <Link
              to="/"
              className="text-xl font-bold tracking-[0.15em] uppercase text-gray-900"
            >
              ShopSphere
            </Link>
            <div className="mt-10">
              <h1 className="font-serif text-3xl text-gray-900 font-bold mb-2">
                Welcome back
              </h1>
              <p className="text-gray-500 text-sm">
                Sign in to your account to continue
              </p>
            </div>
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? (
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
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-900 font-semibold hover:underline"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden lg:block flex-1 bg-gray-900 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 70% 30%, #6366f1 0%, transparent 50%)",
            }}
          />
          <div className="relative h-full flex flex-col justify-end p-16">
            <blockquote className="text-white">
              <p className="font-serif text-3xl font-bold leading-snug mb-4">
                "Style is a way to say who you are without having to speak."
              </p>
              <cite className="text-white/50 text-sm not-italic">
                — Rachel Zoe
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

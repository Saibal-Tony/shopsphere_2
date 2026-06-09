import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { register } from "../../api/authApi";
import { useToast } from "../../context/ToastContext";
import PageTransition from "../../components/common/PageTransition";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const update = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await register(form.username, form.email, form.password);
      authLogin(res.token, {
        id: res.id,
        username: res.username,
        email: res.email,
        role: res.role as "USER" | "ADMIN",
      });
      showToast(`Welcome to ShopSphere, ${res.username}!`, "success");
      navigate("/");
    } catch (err: any) {
      const msg = err.response?.data?.error || "Registration failed";
      setError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#f9f9f7] flex">
        <div className="hidden lg:block flex-1 bg-gray-900 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 30%, #c9a96e 0%, transparent 50%), radial-gradient(circle at 30% 70%, #ec4899 0%, transparent 50%)",
            }}
          />
          <div className="relative h-full flex flex-col justify-center p-16">
            <div className="text-white">
              <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4">
                Join ShopSphere
              </p>
              <h2 className="font-serif text-4xl font-bold mb-6 leading-tight">
                Discover Your <br />
                Personal Style
              </h2>
              <ul className="flex flex-col gap-3 text-white/70 text-sm">
                {[
                  "Exclusive member discounts",
                  "Early access to new arrivals",
                  "Free shipping on first order",
                  "Easy returns & exchanges",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

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
                Create account
              </h1>
              <p className="text-gray-500 text-sm">
                Join thousands of fashion lovers
              </p>
            </div>
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              {[
                {
                  key: "username",
                  label: "Username",
                  type: "text",
                  placeholder: "johndoe",
                },
                {
                  key: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "you@example.com",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => update(field.key, e.target.value)}
                    required
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white transition-colors"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    required
                    placeholder="Min 6 characters"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide uppercase">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  required
                  placeholder="Re-enter password"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 bg-white transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-gray-900 font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

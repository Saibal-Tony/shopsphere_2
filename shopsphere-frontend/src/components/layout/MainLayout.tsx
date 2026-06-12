import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const location = useLocation();
  const hideFooter = ["/login", "/register", "/checkout"].includes(
    location.pathname,
  );

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "#eef8f8" }}
    >
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

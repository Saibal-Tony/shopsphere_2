import { type ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitioning, setTransitioning] = useState(false);
  const [curtainProgress, setCurtainProgress] = useState<
    "hidden" | "in" | "out"
  >("hidden");

  useEffect(() => {
    // Don't animate on first mount
    let isMounted = true;
    setTransitioning(true);
    setCurtainProgress("in");

    const t1 = setTimeout(() => {
      if (!isMounted) return;
      setDisplayChildren(children);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setCurtainProgress("out");
    }, 450);

    const t2 = setTimeout(() => {
      if (!isMounted) return;
      setCurtainProgress("hidden");
      setTransitioning(false);
    }, 950);

    return () => {
      isMounted = false;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  // Sync children when not transitioning
  useEffect(() => {
    if (!transitioning) {
      setDisplayChildren(children);
    }
  }, [children, transitioning]);

  return (
    <div style={{ position: "relative" }}>
      {/* Single smooth curtain */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: curtainProgress === "hidden" ? "none" : "all",
          background:
            "linear-gradient(160deg, #031716 0%, #0A7075 60%, #0C969C 100%)",
          transform:
            curtainProgress === "hidden"
              ? "translateY(-101%)"
              : curtainProgress === "in"
                ? "translateY(0%)"
                : "translateY(101%)",
          transition:
            curtainProgress === "hidden"
              ? "none"
              : "transform 0.48s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      >
        {/* Logo shown during transition */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.15)",
              fontSize: "clamp(48px, 10vw, 120px)",
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              letterSpacing: "0.1em",
              userSelect: "none",
            }}
          >
            SS
          </span>
        </div>
      </div>

      {/* Page content fades in after curtain leaves */}
      <div
        style={{
          opacity: curtainProgress === "in" ? 0 : 1,
          transition:
            curtainProgress === "out"
              ? "opacity 0.4s ease 0.1s"
              : curtainProgress === "hidden"
                ? "opacity 0.3s ease"
                : "none",
        }}
      >
        {displayChildren}
      </div>
    </div>
  );
}

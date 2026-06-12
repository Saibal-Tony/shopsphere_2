import { useEffect, useState } from "react";

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    const duration = 2400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = raw === 1 ? 1 : 1 - Math.pow(2, -10 * raw);
      const val = Math.floor(eased * 100);
      setCount(val);
      setLineWidth(eased * 100);

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onComplete, 900);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: "#031716",
      }}
    >
      {/* Animated teal gradient blob */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #0C969C44 0%, transparent 70%)",
          left: "60%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          animation: "blobPulse 3s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #6BA3BE22 0%, transparent 70%)",
          left: "20%",
          top: "30%",
          transform: "translate(-50%, -50%)",
          animation: "blobPulse 4s ease-in-out infinite 1s",
        }}
      />

      {/* Exit panels */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#0C969C",
          transform: leaving ? "translateY(-100%)" : "translateY(0)",
          transition: leaving
            ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0.1s"
            : "none",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#031716",
          transform: leaving ? "translateY(-100%)" : "translateY(0)",
          transition: leaving
            ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1) 0s"
            : "none",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "clamp(32px, 6vw, 80px)",
          opacity: leaving ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            animation: "loaderUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "13px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "Inter, sans-serif",
            }}
          >
            ShopSphere
          </span>
          <span
            style={{
              color: "#0C969C",
              fontSize: "11px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            SS / 2024
          </span>
        </div>

        {/* Center — Big counter */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* Small label */}
          <div
            style={{
              animation: "loaderUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both",
            }}
          >
            <span
              style={{
                color: "#0C969C",
                fontSize: "11px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
              }}
            >
              Curating your experience
            </span>
          </div>

          {/* Giant number */}
          <div
            style={{
              animation: "loaderUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s both",
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontSize: "clamp(96px, 20vw, 240px)",
                fontWeight: 700,
                fontFamily: "Playfair Display, serif",
                color: "white",
                letterSpacing: "-0.02em",
                display: "block",
              }}
            >
              {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              animation: "loaderUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "clamp(14px, 3vw, 28px)",
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
              }}
            >
              Premium Fashion &amp; Lifestyle
            </span>
          </div>
        </div>

        {/* Bottom — progress */}
        <div
          style={{
            animation: "loaderUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Loading
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: "11px",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {count}%
            </span>
          </div>

          {/* Progress track */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "1px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${lineWidth}%`,
                background: "linear-gradient(90deg, #0A7075, #0C969C, #6BA3BE)",
                borderRadius: "1px",
                transition: "width 0.1s linear",
              }}
            />
          </div>

          {/* Category pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "24px",
              flexWrap: "wrap",
            }}
          >
            {[
              "Fashion",
              "Footwear",
              "Beauty",
              "Electronics",
              "Accessories",
            ].map((cat, i) => (
              <span
                key={cat}
                style={{
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "1px solid rgba(12,150,156,0.2)",
                  borderRadius: "100px",
                  animation: `loaderUp 0.6s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.1}s both`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loaderUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50%       { transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </div>
  );
}

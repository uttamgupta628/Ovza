import React, { useEffect, useRef, useState } from "react";

/* ── useInView hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Testimonials data ── */
const testimonials = [
  {
    text: "I highly value the support from OVZA for quick responses to my questions. A pleasure to work with.",
    name: "Lukas S.",
    rating: 5,
  },
  {
    text: "Great job by OVZA for support with international tax planning. A pleasure to work with.",
    name: "Katrin W.",
    rating: 4,
  },
  {
    text: "Smooth process handled by OVZA for excellent customer care. Will use again for future needs.",
    name: "Julia B.",
    rating: 4,
  },
];

/* ── Stars ── */
const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625L4.5 7.07 2 4.635l3.455-.505L7 1z"
          fill={i <= count ? "#34BE86" : "#d1d5db"}
        />
      </svg>
    ))}
  </div>
);

/* ── ProvenExpert badge SVG (matches "As seen on" bar in screenshot) ── */
const ProvenExpertBadge: React.FC = () => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      border: "1px solid #e5e7eb",
      borderRadius: "999px",
      padding: "6px 14px",
      backgroundColor: "#fff",
    }}
  >
    {/* Shield icon */}
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L3 5v5c0 4.418 3.134 8.15 7 9 3.866-.85 7-4.582 7-9V5l-7-3z"
        fill="#e63946"
      />
      <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span style={{ fontSize: "13px", fontWeight: 700, color: "#111827", letterSpacing: "-0.01em" }}>
      ProvenExpert
    </span>
    <span style={{ fontSize: "10px", color: "#6b7280" }}>★ 4.9 / 5</span>
  </div>
);

/* ══════════════════════════════════════
   TestimonialsSection — standalone component
══════════════════════════════════════ */
const TestimonialsSection: React.FC = () => {
  const { ref, visible } = useInView(0.1);

  return (
    <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ts-fade-up { opacity: 0; }
        .ts-fade-up.go { animation: fadeUp 0.6s ease forwards; }
        .ts-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .ts-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(52,190,134,0.18) !important;
        }
        @media (max-width: 860px) { .ts-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 540px) { .ts-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

        {/* ── Header ── */}
        <div
          ref={ref}
          className={`ts-fade-up ${visible ? "go" : ""}`}
          style={{ textAlign: "center", marginBottom: "12px" }}
        >
          <h2
            style={{
              fontSize: "clamp(24px,3vw,36px)",
              fontWeight: 800,
              color: "#0a1f1a",
              marginBottom: "12px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            What Clients Are Saying
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              lineHeight: 1.6,
              maxWidth: "420px",
              margin: "0 auto 20px",
            }}
          >
            Trusted by entrepreneurs worldwide for our reliability, discretion,
            <br />
            and offshore expertise
          </p>

          {/* "As seen on" row */}
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            As seen on
          </p>
          <ProvenExpertBadge />
        </div>

        {/* ── Testimonial cards ── */}
        <div
          className="ts-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginTop: "32px",
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.name}
              className={`ts-card ts-fade-up ${visible ? "go" : ""}`}
              style={{
                animationDelay: `${idx * 120 + 100}ms`,
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "20px",
                minHeight: "180px",
                background:
                  "linear-gradient(135deg, rgba(156,237,222,0.45) 0%, rgba(156,237,222,0.15) 50%, rgba(255,255,255,0.6) 100%)",
                border: "1px solid rgba(52,190,134,0.2)",
                boxShadow: "0 4px 20px rgba(52,190,134,0.08)",
              }}
            >
              <p style={{ fontSize: "13px", color: "#1a3a2e", lineHeight: 1.65, margin: 0 }}>
                {t.text}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <Stars count={t.rating} />
                <span style={{ fontSize: "13px", fontWeight: 700, color: "#0a1f1a" }}>
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
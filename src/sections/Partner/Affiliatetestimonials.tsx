import React, { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const testimonials = [
  {
    text: "Went with OVZA for a Cayman company. They explained everything clearly and helped with both legal setup and banking. Felt supported at every step.",
    name: "Lily Mae",
    rating: 5,
    rotation: "-3.92deg",
  },
  {
    text: "Compared to others, these guys are leagues ahead. Clean process, real communication, and proper documents. Chose Marshall Islands and all went well.",
    name: "Camilio",
    rating: 4,
    rotation: "0deg",
  },
  {
    text: "This was my first time setting up an offshore entity and I was nervous. But they were incredibly patient and explained everything in simple terms. I felt supported the whole way.",
    name: "Jack James",
    rating: 5,
    rotation: "3.92deg",
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625L4.5 7.07 2 4.635l3.455-.505L7 1z"
          fill={i <= count ? "#34BE86" : "#d1d5db"} />
      </svg>
    ))}
  </div>
);

const AffiliateTestimonials: React.FC = () => {
  const { ref, visible } = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes at-fadeUp {
          from { opacity: 0; transform: translateY(28px) rotate(var(--rot)); }
          to   { opacity: 1; transform: translateY(0)   rotate(var(--rot)); }
        }
        .at-fade { opacity: 0; }
        .at-fade.go { animation: at-fadeUp 0.65s ease forwards; }
        .at-card {
          transition: box-shadow 0.25s ease;
        }
        .at-card:hover {
          box-shadow: 0 16px 40px rgba(52,190,134,0.2) !important;
        }
      `}</style>

      <section style={{ backgroundColor: "#F5F5F5", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

          {/* Header */}
          <div ref={ref} className={`at-fade ${visible ? "go" : ""}`} style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "clamp(24px,3vw,38px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "12px", fontFamily: "'Poppins',sans-serif" }}>
              What Affiliates Are Saying
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "420px", margin: "0 auto", lineHeight: 1.65 }}>
              We connect you to a vast network of traditional and digital banks,<br />as well as Electronic Money Institutions.
            </p>
          </div>

          {/* Proven Expert badge */}
          <div className={`at-fade ${visible ? "go" : ""}`} style={{ animationDelay: "100ms", textAlign: "center", marginBottom: "48px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "8px 18px", borderRadius: "999px",
              backgroundColor: "#fff", border: "1px solid #e5e7eb",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>As seen on</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="9" fill="#34BE86"/>
                  <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "#0a1f1a", letterSpacing: "-0.3px" }}>Proven</span>
                <span style={{ fontSize: "16px", fontWeight: 400, color: "#0a1f1a" }}>Expert</span>
              </div>
              <span style={{ fontSize: "9px", color: "#9ca3af" }}>It's All About Trust</span>
            </div>
          </div>

          {/* Cards row */}
          <div style={{ display: "flex", gap: "24px", alignItems: "center", justifyContent: "center" }} className="at-row">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`at-card at-fade ${visible ? "go" : ""}`}
                style={{
                  "--rot": t.rotation,
                  animationDelay: `${idx * 120 + 150}ms`,
                  transform: `rotate(${t.rotation})`,
                  width: "391px",
                  minHeight: "309px",
                  borderRadius: "16px",
                  padding: "28px 28px 22px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "14px",
                  background: "linear-gradient(145deg, rgba(156,237,222,0.55) 0%, rgba(200,245,234,0.3) 50%, rgba(255,255,255,0.5) 100%)",
                  border: "1px solid rgba(52,190,134,0.25)",
                  boxShadow: "0 4px 20px rgba(52,190,134,0.1)",
                } as React.CSSProperties}
              >
                <p style={{ fontSize: "13.5px", color: "#1a3a2e", lineHeight: 1.7, margin: 0 }}>
                  {t.text}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Stars count={t.rating} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0a1f1a" }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .at-row { flex-direction: column !important; align-items: stretch !important; }
            .at-row > div { width: 100% !important; transform: none !important; }
          }
        `}</style>
      </section>
    </>
  );
};

export default AffiliateTestimonials;
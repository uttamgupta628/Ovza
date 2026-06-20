import React, { useEffect, useRef, useState } from "react";

interface ClientsAndPartnerProps {
  partnerImage?: string; // optional circle image on the right
}

/* ── useInView hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
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

/* ── Counter animation ── */
const CountUp: React.FC<{ target: string; visible: boolean; delay?: number }> = ({
  target,
  visible,
  delay = 0,
}) => {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, ""), 10);
    const suffix = target.replace(/[0-9]/g, "");
    let start = 0;
    const duration = 1200;
    const step = 16;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        start += Math.ceil(num / (duration / step));
        if (start >= num) { setDisplay(`${num}${suffix}`); clearInterval(interval); }
        else setDisplay(`${start}${suffix}`);
      }, step);
    }, delay);
    return () => clearTimeout(timer);
  }, [visible, target, delay]);
  return <>{display}</>;
};

const ClientsAndPartner: React.FC<ClientsAndPartnerProps> = ({ partnerImage }) => {
  const { ref: testimonialRef, visible: testimonialsVisible } = useInView(0.1);
  const { ref: partnerRef, visible: partnerVisible } = useInView(0.1);
  const { ref: statsRef, visible: statsVisible } = useInView(0.2);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fade-up { opacity: 0; }
        .fade-up.go { animation: fadeUp 0.6s ease forwards; }
        .fade-in { opacity: 0; }
        .fade-in.go { animation: fadeIn 0.7s ease forwards; }
        .scale-in { opacity: 0; }
        .scale-in.go { animation: scaleIn 0.7s ease forwards; }
        .test-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .test-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 32px rgba(52,190,134,0.18) !important;
        }
      `}</style>

      {/* ═══════════════════════════════════════
          SECTION 1 — What Clients Are Saying
      ═══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

          {/* Header */}
          <div
            ref={testimonialRef}
            className={`fade-up ${testimonialsVisible ? "go" : ""} text-center`}
            style={{ marginBottom: "12px" }}
          >
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "12px" }}>
              What Clients Are Saying
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto 20px" }}>
              Trusted by entrepreneurs worldwide for our reliability, discretion,<br />and offshore expertise
            </p>
            <p style={{ fontSize: "12px", color: "#9ca3af", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              As seen on
            </p>
          </div>

          {/* Testimonial cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "20px",
              marginTop: "32px",
            }}
            className="testimonials-grid"
          >
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`test-card fade-up ${testimonialsVisible ? "go" : ""}`}
                style={{
                  animationDelay: `${idx * 120 + 100}ms`,
                  borderRadius: "16px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: "20px",
                  minHeight: "180px",
                  /* gradient background matching screenshot */
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

        <style>{`
          @media (max-width: 860px) { .testimonials-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 540px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — Partner in Offshore Excellence
      ═══════════════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "0" }}>
        <div
          style={{
            maxWidth: "1276px",
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,118px)",
          }}
        >
          {/* Divider line */}
          <div style={{ height: "1px", backgroundColor: "#e5e7eb", marginBottom: "60px" }} />

          {/* Two-column layout */}
          <div
            ref={partnerRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
            className="partner-grid"
          >
            {/* Left — text */}
            <div className={`fade-up ${partnerVisible ? "go" : ""}`}>
              {/* Icon */}
              <div style={{ marginBottom: "16px" }}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M12 36l6-6m0 0l6-6m-6 6l-6-6m6 6l6 6" stroke="#34BE86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24 12v4M24 32v4M12 24h4M32 24h4" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="10" stroke="#34BE86" strokeWidth="1.5" strokeDasharray="3 3"/>
                </svg>
              </div>

              <h2 style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "#0a1f1a", lineHeight: 1.25, marginBottom: "24px" }}>
                Your Partner in Offshore<br />Business Excellence
              </h2>

              <p style={{ fontSize: "13.5px", color: "#4b5563", lineHeight: 1.75, marginBottom: "14px" }}>
                Since 2018, OVZA has been a trusted provider of offshore company formation service provider. We help entrepreneurs and global businesses establish compliant entities in top offshore jurisdictions.
              </p>
              <p style={{ fontSize: "13.5px", color: "#4b5563", lineHeight: 1.75, marginBottom: "14px" }}>
                With experience across legal, financial, and operational matters, OVZA offers tailored solutions that prioritize privacy, flexibility, and international growth.
              </p>
              <p style={{ fontSize: "13.5px", color: "#4b5563", lineHeight: 1.75, marginBottom: "28px" }}>
                Choose OVZA to form your offshore company and apply for a reliable offshore bank account.
              </p>

              <button
                style={{
                  backgroundColor: "#34BE86",
                  color: "#fff",
                  border: "none",
                  borderRadius: "999px",
                  padding: "12px 28px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2aa876")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#34BE86")}
              >
                About OVZA
              </button>
            </div>

            {/* Right — mint circle */}
            <div
              className={`scale-in ${partnerVisible ? "go" : ""}`}
              style={{ animationDelay: "200ms", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div
                style={{
                  width: "clamp(260px,28vw,380px)",
                  height: "clamp(260px,28vw,380px)",
                  borderRadius: "50%",
                  backgroundColor: "#c8f5ea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {partnerImage ? (
                  <img src={partnerImage} alt="Partner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  /* Decorative placeholder when no image */
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" opacity="0.4">
                    <circle cx="60" cy="60" r="50" stroke="#34BE86" strokeWidth="3" strokeDasharray="8 8"/>
                    <path d="M40 60h40M60 40v40" stroke="#34BE86" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 780px) { .partner-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — Stats bar
      ═══════════════════════════════════════ */}
      <div
        ref={statsRef}
        className={`fade-up ${statsVisible ? "go" : ""}`}
        style={{
          maxWidth: "1276px",
          margin: "48px auto 0",
          padding: "0 clamp(20px,5vw,118px) 80px",
        }}
      >
        <div
          style={{
            backgroundColor: "#9CEDDE",
            borderRadius: "20px",
            padding: "40px 60px",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
          }}
          className="stats-grid"
        >
          {[
            { value: "7+", label: "Years of Tailoring Offshore Success" },
            { value: "18", label: "Jurisdictions: Your Global Network" },
            { value: "100%", label: "Client Satisfaction" },
          ].map((stat, idx) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span
                style={{
                  fontSize: "clamp(28px,3vw,40px)",
                  fontWeight: 800,
                  color: "#0a1f1a",
                  lineHeight: 1,
                }}
              >
                <CountUp target={stat.value} visible={statsVisible} delay={idx * 200} />
              </span>
              <span style={{ fontSize: "13px", color: "#1a4a3a", lineHeight: 1.5, maxWidth: "160px" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr !important; padding: 32px 28px !important; } }
        `}</style>
      </div>
    </>
  );
};

export default ClientsAndPartner;
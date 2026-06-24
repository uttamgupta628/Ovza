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

/* ── price count-up ── */
function useCountUp(target: number, visible: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(cur);
    }, 16);
    return () => clearInterval(id);
  }, [visible, target, duration]);
  return val;
}

const plans = [
  {
    popular: true,
    tag: "Our Most Popular Package",
    type: "Offshore KYC Document Notarization",
    price: 250,
    color: "#34BE86",
    features: [
      "Proof of Identity (passport, ID card)",
      "Proof of Address (utility bill, bank statement)",
      "Accepted for KYC & banking compliance",
      "Instant availability after session",
    ],
    cta: "Notarize Offshore Documents",
    footer: null,
  },
  {
    popular: false,
    tag: null,
    type: "General Document Notarization",
    price: 150,
    color: "#0a1f1a",
    features: [
      "Any document notarized online",
      "Contracts, affidavits, business or personal records",
      "Certified by U.S. notary public",
      "Instant digital copy, 24/7 access",
    ],
    cta: "Notarize Any Document",
    footer: "Any document notarized or certified 24/7",
  },
];

const NotarizationPricing: React.FC = () => {
  const { ref, visible } = useInView(0.1);
  const price1 = useCountUp(250, visible, 1200);
  const price2 = useCountUp(150, visible, 1000);
  const prices = [price1, price2];
  // 0 = first card active, 1 = second card active
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <>
      <style>{`
        @keyframes np-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes np-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes np-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(52,190,134,0); }
          50%      { box-shadow: 0 0 24px 4px rgba(52,190,134,0.18); }
        }
        @keyframes np-badgeBounce {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }

        .np-fade   { opacity: 0; }
        .np-fade.go { animation: np-fadeUp 0.65s ease forwards; }

        .np-card {
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .np-card:hover { transform: translateY(-8px); }

        .np-card-popular:hover {
          box-shadow: 0 24px 56px rgba(52,190,134,0.28) !important;
        }
        .np-card-basic:hover {
          box-shadow: 0 24px 48px rgba(0,0,0,0.12) !important;
        }

        .np-popular-badge {
          animation: np-badgeBounce 2.5s ease-in-out infinite;
        }

        .np-btn-primary {
          transition: background 0.2s ease, transform 0.18s ease, box-shadow 0.2s ease;
          cursor: pointer;
          position: relative; overflow: hidden;
        }
        .np-btn-primary::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .np-btn-primary:hover::after { transform: translateX(0); }
        .np-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(52,190,134,0.35);
        }

        .np-btn-outline {
          transition: background 0.2s ease, transform 0.18s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .np-btn-outline:hover {
          background: #f0fdf8 !important;
          border-color: #34BE86 !important;
          transform: translateY(-2px);
        }

        .np-check-icon {
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .np-card:hover .np-check-icon { transform: scale(1.15); }

        .np-price-shimmer {
          background: linear-gradient(90deg, #0a1f1a 0%, #34BE86 50%, #0a1f1a 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: np-shimmer 2s linear infinite;
        }

        @media (max-width: 760px) {
          .np-grid { grid-template-columns: 1fr !important; max-width: 440px !important; margin: 0 auto !important; }
        }
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,100px)" }}>

          {/* ── Header ── */}
          <div ref={ref} style={{ textAlign: "center", marginBottom: "52px" }}>
            <p
              className={`np-fade ${visible ? "go" : ""}`}
              style={{
                fontSize: "12px", fontWeight: 700, color: "#34BE86",
                letterSpacing: "0.12em", textTransform: "uppercase",
                marginBottom: "12px", fontFamily: "'Poppins',sans-serif",
              }}
            >
              Pricing
            </p>
            <h2
              className={`np-fade ${visible ? "go" : ""}`}
              style={{
                animationDelay: "80ms",
                fontFamily: "'Poppins',sans-serif",
                fontSize: "clamp(24px,3vw,40px)",
                fontWeight: 800, color: "#0a1f1a",
                lineHeight: 1.2, marginBottom: "14px",
              }}
            >
              Online Document<br />Notarization Services
            </h2>
            <p
              className={`np-fade ${visible ? "go" : ""}`}
              style={{
                animationDelay: "150ms",
                fontSize: "14px", color: "#6b7280",
                maxWidth: "420px", margin: "0 auto", lineHeight: 1.7,
                fontFamily: "'Poppins',sans-serif",
              }}
            >
              Choose the plan that fits your needs. Transparent pricing, no surprises.
            </p>
          </div>

          {/* ── Cards ── */}
          <div
            className="np-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }}
          >
            {plans.map((plan, idx) => {
              const isActive = selectedIdx === idx;
              return (
              <div
                key={plan.type}
                className={`np-card np-fade ${visible ? "go" : ""}`}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  animationDelay: `${idx * 150 + 200}ms`,
                  borderRadius: "24px",
                  padding: "clamp(24px,3vw,36px)",
                  display: "flex", flexDirection: "column", gap: "20px",
                  position: "relative", overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  ...(isActive
                    ? {
                        background: "linear-gradient(145deg, #c8f5ea 0%, #a8eedd 40%, #d8faf2 100%)",
                        border: "2px solid rgba(52,190,134,0.5)",
                        boxShadow: "0 16px 48px rgba(52,190,134,0.25)",
                        transform: "translateY(-6px)",
                      }
                    : {
                        background: "#ffffff",
                        border: "1.5px solid #e5e7eb",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                        transform: "translateY(0px)",
                      }),
                }}
              >
                {/* Popular badge — show on active card that was originally popular, or always on idx 0 */}
                {plan.popular && (
                  <div
                    className="np-popular-badge"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      backgroundColor: isActive ? "#34BE86" : "#d1d5db",
                      borderRadius: "999px",
                      padding: "6px 14px",
                      alignSelf: "flex-start",
                      transition: "background 0.3s ease",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1l1.2 2.4L10 4.1l-2 1.95.47 2.75L6 7.5 3.53 8.8 4 6.05 2 4.1l2.8-.7L6 1z" fill="white"/>
                    </svg>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", fontFamily: "'Poppins',sans-serif", letterSpacing: "0.04em" }}>
                      {plan.tag}
                    </span>
                  </div>
                )}

                {/* Selected indicator for non-popular card */}
                {!plan.popular && isActive && (
                  <div
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      backgroundColor: "#34BE86",
                      borderRadius: "999px",
                      padding: "6px 14px",
                      alignSelf: "flex-start",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#ffffff", fontFamily: "'Poppins',sans-serif" }}>
                      Selected Plan
                    </span>
                  </div>
                )}

                {/* Type label */}
                <p style={{ fontSize: "13px", fontWeight: 600, color: isActive ? "#0a6b48" : "#6b7280", margin: 0, fontFamily: "'Poppins',sans-serif", transition: "color 0.3s ease" }}>
                  {plan.type}
                </p>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "18px", fontWeight: 700, color: "#0a1f1a", fontFamily: "'Poppins',sans-serif", alignSelf: "flex-start", marginTop: "6px" }}>$</span>
                  <span
                    style={{
                      fontSize: "clamp(48px,6vw,72px)",
                      fontWeight: 800,
                      color: "#0a1f1a",
                      fontFamily: "'Poppins',sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {prices[idx]}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: "1px", backgroundColor: isActive ? "rgba(52,190,134,0.3)" : "#f3f4f6", transition: "background 0.3s ease" }}/>

                {/* Features */}
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div
                        className="np-check-icon"
                        style={{
                          width: "18px", height: "18px", borderRadius: "50%",
                          backgroundColor: isActive ? "rgba(52,190,134,0.2)" : "rgba(52,190,134,0.1)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginTop: "1px", flexShrink: 0,
                          transition: "background 0.3s ease",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ fontSize: "13px", color: isActive ? "#0a3a28" : "#4b5563", lineHeight: 1.6, fontFamily: "'Poppins',sans-serif", transition: "color 0.3s ease" }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                {isActive ? (
                  <button
                    className="np-btn-primary"
                    style={{
                      backgroundColor: "#34BE86", color: "#ffffff",
                      border: "none", borderRadius: "12px",
                      padding: "15px", fontSize: "14px", fontWeight: 600,
                      fontFamily: "'Poppins',sans-serif", width: "100%",
                      marginTop: "4px",
                    }}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    className="np-btn-outline"
                    style={{
                      backgroundColor: "transparent", color: "#0a1f1a",
                      border: "1.5px solid #e5e7eb", borderRadius: "12px",
                      padding: "15px", fontSize: "14px", fontWeight: 600,
                      fontFamily: "'Poppins',sans-serif", width: "100%",
                      marginTop: "4px",
                    }}
                  >
                    {plan.cta}
                  </button>
                )}

                {/* Footer note */}
                {plan.footer && (
                  <p style={{ fontSize: "12px", fontWeight: 700, color: isActive ? "#0a6b48" : "#0a1f1a", textAlign: "center", margin: 0, fontFamily: "'Poppins',sans-serif", transition: "color 0.3s ease" }}>
                    {plan.footer}
                  </p>
                )}

                {/* Decorative blob — only on active */}
                {isActive && (
                  <div style={{
                    position: "absolute", bottom: "-40px", right: "-40px",
                    width: "160px", height: "160px", borderRadius: "50%",
                    backgroundColor: "rgba(52,190,134,0.15)", pointerEvents: "none",
                    transition: "opacity 0.3s ease",
                  }}/>
                )}
              </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default NotarizationPricing;
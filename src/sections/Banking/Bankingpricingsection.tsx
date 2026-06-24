import React, { useState, useEffect, useRef } from "react";

type PlanKey = "premium" | "standard";

const plans = {
  premium: {
    label: "Premium Package",
    price: "$350",
    badge: "Our Most Popular Package",
    features: [
      "Up to 5 Bank Account Applications",
      "Priority handling",
      "Dedicated support",
      "Higher success rate",
      "Ends at first approval",
    ],
  },
  standard: {
    label: "Standard Package",
    price: "$290",
    badge: null,
    features: [
      "Standard application handling",
      "One bank account application",
    ],
  },
};

const BankingPricingSection: React.FC = () => {
  const [selected, setSelected] = useState<PlanKey>("premium");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes bps-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bps-scaleIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes bps-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .bps-visible .bps-header  { animation: bps-fadeUp 0.6s ease both; }
        .bps-visible .bps-card-0  { animation: bps-scaleIn 0.6s ease 0.1s both; }
        .bps-visible .bps-card-1  { animation: bps-scaleIn 0.6s ease 0.22s both; }

        .bps-card {
          flex: 1 1 0;
          border-radius: 22px;
          padding: 36px 30px 32px;
          position: relative;
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.4s ease, border-color 0.35s ease;
          display: flex;
          flex-direction: column;
        }
        .bps-card:hover { transform: translateY(-6px); }

        /* Green gradient card */
        .bps-card-green {
          background: linear-gradient(150deg, #4DD9AC 0%, #34BE86 55%, #2aA876 100%);
          box-shadow: 0 8px 40px rgba(42,168,118,0.22);
        }
        .bps-card-green.bps-selected {
          box-shadow: 0 12px 48px rgba(42,168,118,0.42);
          transform: translateY(-8px) scale(1.02);
        }

        /* White card — unselected */
        .bps-card-white {
          background: #fff;
          border: 2px solid #d4ede2;
          box-shadow: 0 4px 24px rgba(42,168,118,0.07);
        }
        /* White card — selected: shift to green gradient */
        .bps-card-white.bps-selected {
          background: linear-gradient(150deg, #4DD9AC 0%, #34BE86 55%, #2aA876 100%);
          border-color: transparent;
          box-shadow: 0 12px 48px rgba(42,168,118,0.38);
          transform: translateY(-8px) scale(1.02);
        }

        /* Selection ring */
        .bps-selected::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 25px;
          border: 2.5px solid #2aA876;
          pointer-events: none;
          animation: bps-scaleIn 0.2s ease both;
        }
        .bps-card-green.bps-selected::after { border-color: rgba(255,255,255,0.6); }

        /* Selected tick badge */
        .bps-tick {
          position: absolute;
          top: 14px; right: 14px;
          width: 26px; height: 26px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex; align-items: center; justify-content: center;
          animation: bps-scaleIn 0.2s ease both;
        }
        .bps-tick-dark {
          background: #2aA876;
        }

        .bps-buy-btn {
          width: 100%;
          border: none;
          border-radius: 999px;
          padding: 13px 0;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          margin-top: auto;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bps-buy-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.12);
        }
        .bps-buy-green {
          background: rgba(255,255,255,0.22);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.4) !important;
          backdrop-filter: blur(4px);
        }
        .bps-buy-white {
          background: #fff;
          color: #0f2d1f;
          border: 1.5px solid #d4ede2 !important;
        }
        .bps-buy-white:hover { background: #f0faf6 !important; }

        .bps-feature {
          display: flex; align-items: flex-start; gap: 9px;
          font-size: 13px; line-height: 1.6; margin-bottom: 11px;
        }
        .bps-dot {
          width: 6px; height: 6px; border-radius: 50%;
          margin-top: 7px; flex-shrink: 0;
        }

        /* Badge shimmer */
        .bps-badge {
          position: absolute; top: -14px; left: 22px;
          background: #0f2d1f; color: #4DD9AC;
          font-size: 11px; font-weight: 700;
          padding: 5px 14px; border-radius: 999px;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
        }

        .bps-price {
          font-size: clamp(44px, 5vw, 58px);
          font-weight: 800;
          line-height: 1;
          margin: 6px 0 24px;
        }

        @media (max-width: 680px) {
          .bps-cards { flex-direction: column !important; }
          .bps-card  { max-width: 100% !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={visible ? "bps-visible" : ""}
        style={{
          background: "#fff",
          padding: "80px clamp(20px, 6vw, 100px) 90px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div className="bps-header" style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{
            fontSize: "12px", fontWeight: 600, color: "#2aA876",
            letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "12px",
          }}>
            Pricing
          </p>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 800,
            color: "#0f2d1f", lineHeight: 1.2, margin: "0 0 16px",
          }}>
            Offshore Corporate Bank Account<br />Application Services
          </h2>
          <p style={{
            fontSize: "13.5px", color: "#4a6659", lineHeight: 1.8,
            maxWidth: "560px", margin: "0 auto",
          }}>
            OVZA assists companies registered almost anywhere in the world with opening offshore
            corporate bank accounts, providing end-to-end application handling, compliance
            coordination, and direct banking introductions.
          </p>
        </div>

        {/* ── Cards ── */}
        <div
          className="bps-cards"
          style={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            gap: "24px",
            maxWidth: "820px",
            margin: "0 auto 32px",
          }}
        >
          {(["premium", "standard"] as PlanKey[]).map((key, i) => {
            const plan = plans[key];
            const isSelected = selected === key;

            return (
              <div
                key={key}
                className={[
                  "bps-card",
                  `bps-card-${i}`,
                  isSelected ? "bps-card-green bps-selected" : "bps-card-white",
                ].join(" ")}
                onClick={() => setSelected(key)}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(key)}
              >
                {/* Popular badge */}
                {plan.badge && (
                  <div className="bps-badge">
                    {plan.badge}
                    <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                      <path d="M6.5 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6.5 8.885l-3.09 1.624.59-3.44L1.5 4.632l3.455-.502z"
                        stroke="#4DD9AC" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                {/* Selected tick */}
                {isSelected && (
                  <div className="bps-tick" style={{ background: "rgba(255,255,255,0.25)" }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2.5 6.5l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                {/* Label */}
                <p style={{
                  fontSize: "12px", fontWeight: 600, margin: "0 0 4px",
                  color: isSelected ? "rgba(255,255,255,0.8)" : "#4a6659",
                  transition: "color 0.35s ease",
                }}>
                  {plan.label}
                </p>

                {/* Price */}
                <p className="bps-price" style={{
                  color: isSelected ? "#fff" : "#0f2d1f",
                  transition: "color 0.35s ease",
                }}>
                  {plan.price}
                </p>

                {/* Features */}
                <div style={{ marginBottom: "28px", flexGrow: 1 }}>
                  {plan.features.map((f) => (
                    <div className="bps-feature" key={f} style={{
                      color: isSelected ? "rgba(255,255,255,0.92)" : "#4a6659",
                      transition: "color 0.35s ease",
                    }}>
                      <span className="bps-dot" style={{
                        background: isSelected ? "rgba(255,255,255,0.65)" : "#2aA876",
                        transition: "background 0.35s ease",
                      }} />
                      {f}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  className={`bps-buy-btn ${isSelected ? "bps-buy-green" : "bps-buy-white"}`}
                  onClick={(e) => { e.stopPropagation(); setSelected(key); }}
                >
                  Buy Now
                </button>
              </div>
            );
          })}
        </div>

        {/* ── Footer note ── */}
        <p style={{
          textAlign: "center", fontSize: "12.5px", fontWeight: 700,
          color: "#0f2d1f", margin: 0,
        }}>
          Wide range of options with supporting team 24/7
        </p>
      </section>
    </>
  );
};

export default BankingPricingSection;
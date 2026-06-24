import React, { useEffect, useRef, useState } from "react";

import Figure0 from "../../assets/Figure.png";
import Figure1 from "../../assets/Figure(1).png";
import Figure2 from "../../assets/Figure(2).png";
import Figure3 from "../../assets/Figure(3).png";
import Figure4 from "../../assets/Figure(4).png";
import Figure5 from "../../assets/Figure(5).png";

/* ── useInView hook ── */
function useInView(threshold = 0.1) {
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

/* ══════════════════════
   Feature card data
══════════════════════ */
const features = [
  {
    image: Figure0,
    title: "Offshore Incorporation Made Simple",
    desc: "Register your offshore company with OVZA efficiently across multiple jurisdictions. From IBCs to LLCs, our incorporation process is streamlined and cost-effective.",
  },
  {
    image: Figure1,
    title: "Zero-Tax Jurisdictions",
    desc: "Form your offshore company in internationally recognized, tax-neutral jurisdictions. Benefit from zero corporate tax, no capital gains tax, and complete offshore flexibility.",
  },
  {
    image: Figure2,
    title: "Seamless Bank Account Applications",
    desc: "Once your offshore company is registered, OVZA supports you with international bank account applications through our trusted banking partners.",
  },
  {
    image: Figure3,
    title: "Notarization Services",
    desc: "Our global notary network can notarize passports and proof of address online for just USD 250, ensuring fast and compliant offshore company formation.",
  },
  {
    image: Figure4,
    title: "Full Compliance & Automation",
    desc: "The offshore world is changing, with stricter due diligence requirements. OVZA keeps you compliant through secure systems, automation, and encrypted onboarding.",
  },
  {
    image: Figure5,
    title: "Multi-Jurisdictional Flexibility",
    desc: "Register offshore companies in the world's leading jurisdictions, with structures that support asset protection, estate planning, and cross-border investments.",
  },
];

/* ══════════════════════
   Main Component
══════════════════════ */
const WhyRegisterOVZA: React.FC = () => {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);
  const { ref: cardsRef, visible: cardsVisible } = useInView(0.05);

  return (
    <section
      style={{
        backgroundColor: "#9CEDDE",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.25) 0%, transparent 50%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)",
        padding: "72px 0 80px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        @keyframes wr-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wr-fade { opacity: 0; }
        .wr-fade.go { animation: wr-fadeUp 0.55s ease forwards; }
        .wr-card {
          background: #fff;
          border-radius: 16px;
          padding: 0 0 28px 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          min-height: 340px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          overflow: hidden;
        }
        .wr-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(52,190,134,0.15);
        }
        .wr-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 40px;
        }
        @media (max-width: 900px) { .wr-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px) { .wr-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 780px) { .wr-header-cols { grid-template-columns: 1fr !important; } }
      `}</style>

      <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

        {/* ── Top header: two-column ── */}
        <div
          ref={headerRef}
          className={`wr-fade ${headerVisible ? "go" : ""} wr-header-cols`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Left */}
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#1a6b4a",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              Core Features
            </p>
            <h2
              style={{
                fontSize: "clamp(26px,3vw,40px)",
                fontWeight: 800,
                color: "#0a1f1a",
                lineHeight: 1.2,
                margin: 0,
              }}
            >
              Why Register an<br />
              Offshore Company<br />
              with OVZA
            </h2>
          </div>

          {/* Right */}
          <div
            className={`wr-fade ${headerVisible ? "go" : ""}`}
            style={{ animationDelay: "150ms" }}
          >
            <p
              style={{
                fontSize: "13.5px",
                color: "#1a4a3a",
                lineHeight: 1.75,
                marginBottom: "28px",
              }}
            >
              When you register an offshore company through OVZA, you gain access to trusted zero-tax jurisdictions with streamlined compliance. Our offshore incorporation solutions cover IBCs, LLCs, and tailored structures, ensuring your business is established quickly and securely. With OVZA, you not only register your offshore company but also benefit from our expertise in offshore bank account applications, notary services, and full compliance guidance.
            </p>
            <button
              style={{
                backgroundColor: "#0a1f1a",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "12px 24px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.01em",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1a3a2e")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#0a1f1a")}
            >
              Steps to Register Offshore
            </button>
          </div>
        </div>

        {/* ── 3×2 feature cards ── */}
        <div ref={cardsRef} className="wr-grid">
          {features.map((f, idx) => (
            <div
              key={f.title}
              className={`wr-card wr-fade ${cardsVisible ? "go" : ""}`}
              style={{ animationDelay: `${idx * 90 + 60}ms` }}
            >
              {/* Image area */}
              <div
                style={{
                  width: "100%",
                  height: "180px",
                  backgroundColor: "rgba(156,237,222,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={f.image}
                  alt={f.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: "16px",
                  }}
                />
              </div>

              {/* Text */}
              <div style={{ padding: "20px 24px 0" }}>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "#0a1f1a",
                    margin: "0 0 10px",
                    lineHeight: 1.35,
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "12.5px",
                    color: "#4b5563",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRegisterOVZA;
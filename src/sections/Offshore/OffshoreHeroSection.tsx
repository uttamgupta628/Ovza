import React from "react";
import bookImg from "../../assets/book.png";

// ── Icons ─────────────────────────────────────────────────────────────────────

const FeatureGlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="8" stroke="#34BE86" strokeWidth="1.5"/>
    <path d="M3 11h16M11 3c-2 2-3 5-3 8s1 6 3 8M11 3c2 2 3 5 3 8s-1 6-3 8" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const FeatureInfinityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M7 11c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" stroke="#34BE86" strokeWidth="1.4"/>
    <path d="M3 11c0-2.2 1.8-4 4-4 1.2 0 2.3.5 3 1.4" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M19 11c0-2.2-1.8-4-4-4-1.2 0-2.3.5-3 1.4" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const FeatureShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 3L4 6v5c0 4.4 3 8.5 7 9.5 4-1 7-5.1 7-9.5V6l-7-3z" stroke="#34BE86" strokeWidth="1.5"/>
    <path d="M8 11l2 2 4-4" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Feature data ──────────────────────────────────────────────────────────────

const features = [
  {
    icon: <FeatureGlobeIcon />,
    title: "Global Incorporation Tailored to You",
    desc: "Customized solutions that fit your specific business needs in over many offshore jurisdictions.",
  },
  {
    icon: <FeatureInfinityIcon />,
    title: "Effortless Process, Endless Possibilities",
    desc: "Our digital platform makes setting up your offshore company as easy as a few clicks.",
  },
  {
    icon: <FeatureShieldIcon />,
    title: "Full-Spectrum Support",
    desc: "From legal advice to corporate structuring, our experts are here to guide you every step of the way.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

const OffshoreHeroSection: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes ohs-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ohs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .ohs-text  { animation: ohs-fadeUp 0.7s ease forwards; }
        .ohs-img   { animation: ohs-fadeIn 0.9s ease 0.15s both; }
        .ohs-cards { animation: ohs-fadeUp 0.7s ease 0.3s both; }
        .ohs-scroll-btn {
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .ohs-scroll-btn:hover {
          background: #155c3a !important;
          transform: translateY(-2px);
        }
        .ohs-feature-card {
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .ohs-feature-card:hover {
          background: rgba(255,255,255,1) !important;
          transform: translateY(-3px);
        }
        @media (max-width: 720px) {
          .ohs-main-grid { grid-template-columns: 1fr !important; }
          .ohs-feat-grid { grid-template-columns: 1fr !important; }
          .ohs-feat-grid > div { border-right: none !important; border-bottom: 1px solid rgba(52,190,134,0.15); }
        }
      `}</style>

      <section
        style={{
          background: "linear-gradient(150deg, #4DD9AC 0%, #34BE86 60%, #2aA876 100%)",
          paddingTop: "72px",
          paddingBottom: "0",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Background blob decorations */}
        <div style={{
          position: "absolute", top: "-40px", right: "160px",
          width: "380px", height: "380px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.08)", pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: "100px", left: "40px",
          width: "160px", height: "160px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }}/>

        {/* ── Main 2-col grid ── */}
        <div
          className="ohs-main-grid"
          style={{
            maxWidth: "1276px",
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,100px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* LEFT — text */}
          <div className="ohs-text" style={{ paddingBottom: "60px" }}>
            <h1
              style={{
                fontSize: "clamp(26px,3.2vw,44px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "20px",
                margin: "0 0 20px",
              }}
            >
              The New Generation of Offshore Company Registration
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.8,
                maxWidth: "460px",
                marginBottom: "36px",
              }}
            >
              Register an offshore company in a world where compliance is stricter and
              international standards keep rapidly changing. Yet, offshore company registration
              remains the most effective way to achieve privacy, asset protection, and tax
              efficiency — provided it is done the right way.
            </p>
            <button
              className="ohs-scroll-btn"
              onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#1a6647",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "13px 26px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Scroll Down
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 5l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* RIGHT — illustration only, no floating card */}
          <div
            className="ohs-img"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            {/* Blob behind image */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "360px", height: "300px",
              backgroundColor: "rgba(255,255,255,0.13)",
              borderRadius: "60% 40% 55% 45% / 50% 55% 45% 50%",
              pointerEvents: "none",
            }}/>
            <img
              src={bookImg}
              alt="Offshore Company Registration"
              style={{
                position: "relative",
                zIndex: 1,
                width: "clamp(240px,34vw,440px)",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* ── Feature cards bar ── */}
        <div
          className="ohs-cards"
          style={{
            maxWidth: "1276px",
            margin: "40px auto 0",
            padding: "0 clamp(20px,5vw,100px)",
          }}
        >
          <div
            className="ohs-feat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              backgroundColor: "rgba(255,255,255,0.92)",
              borderRadius: "16px 16px 0 0",
              overflow: "hidden",
            }}
          >
            {features.map((f, idx) => (
              <div
                key={f.title}
                className="ohs-feature-card"
                style={{
                  backgroundColor: "transparent",
                  padding: "28px 28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  borderRight: idx < 2 ? "1px solid rgba(52,190,134,0.15)" : "none",
                }}
              >
                <div style={{
                  width: "44px", height: "44px",
                  borderRadius: "12px",
                  backgroundColor: "#e8faf5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0a1f1a",
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize: "13px",
                  color: "#4b5563",
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OffshoreHeroSection;
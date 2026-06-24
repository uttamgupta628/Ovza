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

const jurisdictions = [
  { name: "Marshall Islands", flagCode: "mh", year: "2026" },
  { name: "Cayman Islands",   flagCode: "ky", year: "2026" },
  { name: "Bahamas",          flagCode: "bs", year: "2026" },
  { name: "Seychelles",       flagCode: "sc", year: "2026" },
  { name: "BVI",              flagCode: "vg", year: "2026" },
  { name: "Panama",           flagCode: "pa", year: "2026" },
  { name: "UAE",              flagCode: "ae", year: "2026" },
  { name: "Belize",           flagCode: "bz", year: "2026" },
  { name: "Hong Kong",        flagCode: "hk", year: "2026" },
  { name: "Singapore",        flagCode: "sg", year: "2026" },
];

const JurisdictionKits: React.FC = () => {
  const { ref, visible } = useInView(0.1);
  const [current, setCurrent] = useState(0);
  const cardsVisible = 4;
  const total = jurisdictions.length;
  const maxIndex = total - cardsVisible;

  const prev = () => setCurrent(c => Math.max(0, c - 1));
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1));

  return (
    <>
      <style>{`
        @keyframes jk-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .jk-fade { opacity: 0; }
        .jk-fade.go { animation: jk-fadeUp 0.6s ease forwards; }
        .jk-card {
          transition: box-shadow 0.22s ease, transform 0.22s ease;
        }
        .jk-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(52,190,134,0.15) !important;
        }
        .jk-dl-btn {
          transition: background 0.2s ease, color 0.2s ease;
          cursor: pointer;
        }
        .jk-dl-btn:hover {
          background: #34BE86 !important;
          color: white !important;
        }
        .jk-dl-btn:hover svg path { stroke: white; }
        .jk-nav {
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .jk-nav:hover { background: #34BE86 !important; transform: scale(1.08); }
        .jk-nav:hover svg path { stroke: white; }
        .jk-dot { transition: background 0.2s ease, width 0.2s ease; }
      `}</style>

      <section style={{ backgroundColor: "#F5F5F5", paddingTop: "80px", paddingBottom: "60px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

          {/* Header */}
          <div ref={ref} className={`jk-fade ${visible ? "go" : ""}`} style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#34BE86", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Poppins',sans-serif" }}>
              Partner Resources
            </p>
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "12px", fontFamily: "'Poppins',sans-serif" }}>
              Jurisdiction Marketing Kits
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "420px", margin: "0 auto", lineHeight: 1.65 }}>
              Professionally designed brochures covering packages, pricing,<br />and offshore insights for each supported jurisdiction.
            </p>
          </div>

          {/* Carousel container */}
          <div
            className={`jk-fade ${visible ? "go" : ""}`}
            style={{
              animationDelay: "150ms",
              background: "linear-gradient(135deg, rgba(156,237,222,0.45) 0%, rgba(200,245,234,0.2) 100%)",
              borderRadius: "24px",
              padding: "40px 32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Prev button */}
            <button
              className="jk-nav"
              onClick={prev}
              disabled={current === 0}
              style={{
                position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                width: "36px", height: "36px", borderRadius: "50%",
                backgroundColor: current === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.9)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                opacity: current === 0 ? 0.4 : 1,
                zIndex: 2,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 11L5 7l4-4" stroke="#0a1f1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Cards track */}
            <div style={{ overflow: "hidden", margin: "0 28px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  transform: `translateX(calc(-${current} * (100% / ${cardsVisible} + 4px)))`,
                  transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {jurisdictions.map((j) => (
                  <div
                    key={j.name}
                    className="jk-card"
                    style={{
                      minWidth: `calc((100% - ${(cardsVisible - 1) * 16}px) / ${cardsVisible})`,
                      backgroundColor: "#ffffff",
                      borderRadius: "16px",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      flexShrink: 0,
                    }}
                  >
                    {/* Year */}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: "11px", color: "#34BE86", fontWeight: 600 }}>{j.year}</span>
                    </div>

                    {/* Flag — using flagcdn.com for reliable cross-platform rendering */}
                    <div style={{ width: "48px", height: "32px", borderRadius: "4px", overflow: "hidden", flexShrink: 0 }}>
                      <img
                        src={`https://flagcdn.com/w80/${j.flagCode}.png`}
                        srcSet={`https://flagcdn.com/w160/${j.flagCode}.png 2x`}
                        alt={j.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>

                    {/* Name */}
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0a1f1a", margin: 0, fontFamily: "'Poppins',sans-serif" }}>
                      {j.name}
                    </h3>

                    {/* Tag */}
                    <p style={{ fontSize: "10px", fontWeight: 600, color: "#34BE86", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
                      Offshore Company<br />Formation
                    </p>

                    {/* Download button */}
                    <button
                      className="jk-dl-btn"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                        padding: "9px 16px",
                        borderRadius: "999px",
                        backgroundColor: "rgba(52,190,134,0.1)",
                        border: "1px solid rgba(52,190,134,0.3)",
                        color: "#34BE86",
                        fontSize: "12px",
                        fontWeight: 600,
                        marginTop: "4px",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M6.5 1v7M3.5 5.5l3 3 3-3M2 11h9" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Next button */}
            <button
              className="jk-nav"
              onClick={next}
              disabled={current === maxIndex}
              style={{
                position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                width: "36px", height: "36px", borderRadius: "50%",
                backgroundColor: current === maxIndex ? "rgba(255,255,255,0.5)" : "#34BE86",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                opacity: current === maxIndex ? 0.4 : 1,
                zIndex: 2,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke={current === maxIndex ? "#0a1f1a" : "white"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className="jk-dot"
                onClick={() => setCurrent(i)}
                style={{
                  width: current === i ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  backgroundColor: current === i ? "#34BE86" : "#d1d5db",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                }}
              />
            ))}
          </div>

          {/* Footer note */}
          <p style={{ textAlign: "center", fontSize: "12px", color: "#9ca3af", marginTop: "20px", fontStyle: "italic" }}>
            All materials are updated to reflect current pricing, banking support, and jurisdictional law.
          </p>
        </div>
      </section>
    </>
  );
};

export default JurisdictionKits;
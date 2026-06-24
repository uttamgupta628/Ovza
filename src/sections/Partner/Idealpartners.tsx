import React, { useEffect, useRef, useState } from "react";

/* ── useInView ── */
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

/* ── Partner cards data (no active field — managed by state) ── */
const partnersData = [
  {
    icon: <TaxIcon />,
    title: "Tax Advisory Firms",
    desc: "Guiding clients through cross-border structures and international tax planning.",
  },
  {
    icon: <LawIcon />,
    title: "Law Firms",
    desc: "Advising on international business law, structuring, and corporate compliance.",
  },
  {
    icon: <ConsultantIcon />,
    title: "Business Consultants",
    desc: "Teaching entrepreneurs to scale globally with the right corporate structures.",
  },
  {
    icon: <ContentIcon />,
    title: "Content Creators",
    desc: "YouTubers, bloggers, and influencers covering finance, business, or expat life.",
  },
  {
    icon: <ImmigrationIcon />,
    title: "Immigration Advisors",
    desc: "Helping clients relocate internationally with the right corporate setup.",
  },
  {
    icon: null,
    title: "And so many more",
    desc: "Professionals and partners who support clients in building and expanding internationally.",
    noIcon: true,
  },
];

const IdealPartners: React.FC = () => {
  const { ref, visible } = useInView(0.1);
  const [activeIdx, setActiveIdx] = useState(0); // first card active by default

  return (
    <>
      <style>{`
        @keyframes ip-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ip-fade { opacity: 0; }
        .ip-fade.go { animation: ip-fadeUp 0.6s ease forwards; }
        .ip-card {
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          cursor: pointer;
        }
        .ip-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(52,190,134,0.15) !important;
        }
        .ip-arrow {
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .ip-card:hover .ip-arrow {
          background: #34BE86 !important;
          transform: translateX(3px);
        }
        .ip-card:hover .ip-arrow svg path {
          stroke: white;
        }
      `}</style>

      <section style={{ backgroundColor: "#F5F5F5", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

          {/* Header */}
          <div ref={ref} className={`ip-fade ${visible ? "go" : ""} text-center`} style={{ marginBottom: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#34BE86", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "'Poppins',sans-serif" }}>
              Ideal Partners
            </p>
            <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "12px", fontFamily: "'Poppins',sans-serif" }}>
              Ready to Earn with OVZA?
            </h2>
            <p style={{ fontSize: "14px", color: "#6b7280", maxWidth: "400px", margin: "0 auto", lineHeight: 1.6 }}>
              Designed for audiences building wealth, scale, and global presence.
            </p>
          </div>

          {/* 3×2 Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }} className="ip-grid">
            {partnersData.map((p, idx) => {
              const isActive = activeIdx === idx;
              return (
              <div
                key={p.title}
                onClick={() => setActiveIdx(idx)}
                className={`ip-card ip-fade ${visible ? "go" : ""}`}
                style={{
                  animationDelay: `${idx * 80 + 100}ms`,
                  minHeight: "290px",
                  borderRadius: "28px",
                  backgroundColor: isActive ? "#ffffff" : "#FBFBFB",
                  border: isActive ? "2px solid #34BE86" : "1px solid #e5e7eb",
                  borderTopWidth: isActive ? "6px" : "1px",
                  padding: "34px 34px 30px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  boxShadow: isActive ? "0 8px 32px rgba(52,190,134,0.18)" : "0 2px 8px rgba(0,0,0,0.04)",
                  outline: "none",
                  userSelect: "none",
                }}
              >
                {/* Icon badge */}
                {!p.noIcon && (
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    backgroundColor: isActive ? "#d0f5e8" : "#e8faf5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s ease",
                  }}>
                    {p.icon}
                  </div>
                )}

                {/* Text */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0a1f1a", margin: 0, fontFamily: "'Poppins',sans-serif" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.65, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div
                  className="ip-arrow"
                  style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    backgroundColor: isActive ? "#34BE86" : "#f3f4f6",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s ease",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke={isActive ? "#fff" : "#6b7280"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) { .ip-grid { grid-template-columns: repeat(2,1fr) !important; } .ip-grid > div { width: 100% !important; } }
          @media (max-width: 580px) { .ip-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
};

/* ── Icons ── */
function TaxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="3" y="2" width="16" height="18" rx="2" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M7 7h8M7 11h8M7 15h4" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function LawIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 3v16M4 19h14" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M4 8l-2 4h4L4 8zM18 8l-2 4h4l-2-4z" stroke="#34BE86" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M4 12h4M14 12h4" stroke="#34BE86" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function ConsultantIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M4 19c0-3.866 3.134-7 7-7h0c3.866 0 7 3.134 7 7" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function ContentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M9 8l6 3-6 3V8z" fill="#34BE86"/>
    </svg>
  );
}
function ImmigrationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M3 11h16M11 3c-2 2-3 5-3 8s1 6 3 8M11 3c2 2 3 5 3 8s-1 6-3 8" stroke="#34BE86" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export default IdealPartners;
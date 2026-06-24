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

const values = [
  {
    icon: <ExpertiseIcon />,
    label: "Expertise",
  },
  {
    icon: <PersonalizedIcon />,
    label: "Personalized\nService",
  },
  {
    icon: <SupportIcon />,
    label: "Comprehensive\nSupport",
  },
];

const AboutValueProposition: React.FC = () => {
  const { ref, visible } = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes avp-fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        .avp-fade { opacity:0; } .avp-fade.go { animation: avp-fadeUp 0.6s ease forwards; }
        .avp-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .avp-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(52,190,134,0.3) !important; }
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingBottom: "80px" }}>
        <div ref={ref} style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

          <h2
            className={`avp-fade ${visible ? "go" : ""}`}
            style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "32px" }}
          >
            Our Unique Value Proposition
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }} className="avp-grid">
            {values.map((v, idx) => (
              <div
                key={v.label}
                className={`avp-card avp-fade ${visible ? "go" : ""}`}
                style={{
                  animationDelay: `${idx * 100 + 100}ms`,
                  backgroundColor: "#34BE86",
                  borderRadius: "20px",
                  padding: "36px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  minHeight: "200px",
                  boxShadow: "0 4px 20px rgba(52,190,134,0.2)",
                }}
              >
                <div style={{ width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {v.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    lineHeight: 1.3,
                    whiteSpace: "pre-line",
                  }}
                >
                  {v.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:720px){.avp-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </>
  );
};

function ExpertiseIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="6" y="4" width="20" height="24" rx="3" stroke="white" strokeWidth="1.8"/>
      <circle cx="16" cy="14" r="4" stroke="white" strokeWidth="1.6"/>
      <path d="M10 24c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function PersonalizedIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.6"/>
      <circle cx="22" cy="14" r="3" stroke="white" strokeWidth="1.5"/>
      <path d="M4 26c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M22 20c2.21 0 4 1.79 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="8" r="3" stroke="white" strokeWidth="1.4"/>
      <path d="M20 6l2 2-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function SupportIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 14 C8 8 12 5 16 5 C20 5 24 8 24 14 C24 18 22 20 20 22 L20 24 L12 24 L12 22 C10 20 8 18 8 14Z" stroke="white" strokeWidth="1.6" fill="none"/>
      <path d="M12 28h8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M10 14c0-3.314 2.686-6 6-6" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export default AboutValueProposition;
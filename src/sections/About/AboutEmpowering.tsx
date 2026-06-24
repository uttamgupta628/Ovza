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

interface AboutEmpoweringProps {
  buildingImage?: string;
}

const AboutEmpowering: React.FC<AboutEmpoweringProps> = ({ buildingImage }) => {
  const { ref, visible } = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes ae-fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes ae-fadeIn { from { opacity:0; } to { opacity:1; } }
        .ae-left { opacity:0; } .ae-left.go { animation: ae-fadeUp 0.65s ease forwards; }
        .ae-right { opacity:0; } .ae-right.go { animation: ae-fadeIn 0.8s ease 0.2s forwards; }
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
        <div
          ref={ref}
          style={{
            maxWidth: "1276px", margin: "0 auto",
            padding: "0 clamp(20px,5vw,118px)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "60px", alignItems: "center",
          }}
          className="ae-grid"
        >
          {/* Left — text */}
          <div className={`ae-left ${visible ? "go" : ""}`}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800, color: "#34BE86", marginBottom: "24px", lineHeight: 1.3 }}>
              Empowering Global Entrepreneurs
            </h2>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85, marginBottom: "18px" }}>
              OVZA is a multinational corporation founded in 2018 to enable international expansion and provide access to global banking systems. By working with a trusted network of law firms and licensed registered agents across 18 jurisdictions, we coordinate with clients to establish offshore companies and access international banking solutions with confidence, clarity, and peace of mind.
            </p>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85, marginBottom: "18px" }}>
              With a team of over 60 professionals based in key global hubs, OVZA supports entrepreneurs, investors, and growing businesses looking to expand beyond borders. We assist at every step of the process—whether launching a new structure, entering a new market, or building a more agile, internationally positioned operation. Our focus is on delivering fast, structured, and legally sound outcomes that align with each client's goals.
            </p>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85 }}>
              OVZA was built for those who see international business as a pathway, not a barrier. We offer a streamlined experience without compromising on legal precision or service quality. At the core of our work is a commitment to transparency, trust, and the belief that building and growing across jurisdictions should be both practical and secure.
            </p>
          </div>

          {/* Right — building illustration */}
          <div className={`ae-right ${visible ? "go" : ""}`} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "clamp(240px,28vw,360px)", height: "clamp(240px,28vw,360px)",
              borderRadius: "50%", backgroundColor: "#e8faf5",
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              {buildingImage ? (
                <img src={buildingImage} alt="OVZA Building" style={{ width: "90%", objectFit: "contain" }} />
              ) : <BuildingPlaceholder />}
            </div>
          </div>
        </div>
        <style>{`.ae-grid { } @media(max-width:720px){.ae-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </>
  );
};

const BuildingPlaceholder = () => (
  <svg viewBox="0 0 200 200" fill="none" style={{ width: "70%" }}>
    <rect x="60" y="40" width="80" height="130" rx="4" fill="#34BE86" opacity="0.3"/>
    <rect x="70" y="50" width="60" height="110" rx="2" fill="#34BE86" opacity="0.4"/>
    <rect x="78" y="58" width="12" height="14" rx="1" fill="#34BE86" opacity="0.7"/>
    <rect x="96" y="58" width="12" height="14" rx="1" fill="#34BE86" opacity="0.7"/>
    <rect x="114" y="58" width="12" height="14" rx="1" fill="#34BE86" opacity="0.7"/>
    <rect x="78" y="80" width="12" height="14" rx="1" fill="#34BE86" opacity="0.7"/>
    <rect x="96" y="80" width="12" height="14" rx="1" fill="#34BE86" opacity="0.7"/>
    <rect x="114" y="80" width="12" height="14" rx="1" fill="#34BE86" opacity="0.7"/>
    <rect x="88" y="130" width="24" height="40" rx="2" fill="#34BE86" opacity="0.6"/>
    <ellipse cx="100" cy="195" rx="60" ry="5" fill="#34BE86" opacity="0.15"/>
  </svg>
);

export default AboutEmpowering;
import React, { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
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

interface AboutInternationalPresenceProps {
  globeImage?: string;
}

const AboutInternationalPresence: React.FC<AboutInternationalPresenceProps> = ({ globeImage }) => {
  const { ref, visible } = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes aip-fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes aip-fadeIn { from{opacity:0;}to{opacity:1;} }
        .aip-left{opacity:0;} .aip-left.go{animation:aip-fadeUp 0.65s ease forwards;}
        .aip-right{opacity:0;} .aip-right.go{animation:aip-fadeIn 0.8s ease 0.25s forwards;}
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "80px" }}>
        <div
          ref={ref}
          style={{
            maxWidth: "1276px", margin: "0 auto",
            padding: "0 clamp(20px,5vw,118px)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "60px", alignItems: "center",
          }}
          className="aip-grid"
        >
          {/* Left — text */}
          <div className={`aip-left ${visible ? "go" : ""}`}>
            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800, color: "#34BE86", marginBottom: "24px" }}>
              Our International Presence
            </h2>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85, marginBottom: "18px" }}>
              OVZA operates across 18 jurisdictions throughout the Americas, Asia Pacific, and Africa, with an international presence rooted in institutional strength and global credibility. Each jurisdiction in which we are active is recognized for its robust legal framework, corporate infrastructure, and reputation as a trusted environment for international business.
            </p>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85, marginBottom: "18px" }}>
              Our operations are supported by a carefully maintained network of top-tier local law firms and licensed corporate service providers, each regarded as a leader in their respective jurisdiction. These partners are experienced in company formation, compliance, and corporate governance, and maintain direct access to local registries, authorities, and institutions—ensuring that our clients receive efficient, informed, and reliable support throughout the process.
            </p>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85, marginBottom: "18px" }}>
              In parallel, OVZA maintains an international banking network comprised of both traditional banks and modern financial institutions that work with international clients. We assist clients in navigating account opening procedures, preparing compliant documentation, and securing access to multi-currency and cross-border financial services with institutions that understand the nature of international corporate structures.
            </p>
            <p style={{ fontSize: "14px", color: "#374151", lineHeight: 1.85 }}>
              At every stage, OVZA prioritizes precision, transparency, and professional integrity. We do not rely on intermediaries; rather, we engage directly with established professionals and institutions who meet the highest industry standards. This allows us to deliver seamless, secure, and high-quality solutions to clients seeking trusted cross-border corporate and financial support.
            </p>
          </div>

          {/* Right — globe illustration */}
          <div className={`aip-right ${visible ? "go" : ""}`} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {globeImage ? (
              <img src={globeImage} alt="International Presence Globe" style={{ width: "clamp(240px,28vw,380px)", objectFit: "contain" }} />
            ) : <GlobePlaceholder />}
          </div>
        </div>
        <style>{`@media(max-width:720px){.aip-grid{grid-template-columns:1fr !important;}}`}</style>
      </section>
    </>
  );
};

const GlobePlaceholder = () => (
  <svg viewBox="0 0 300 300" fill="none" style={{ width: "clamp(220px,26vw,340px)" }}>
    <circle cx="150" cy="150" r="130" stroke="#34BE86" strokeWidth="1" opacity="0.3"/>
    <circle cx="150" cy="150" r="100" stroke="#34BE86" strokeWidth="1" opacity="0.4"/>
    {/* Dot grid globe effect */}
    {Array.from({length:12}).map((_,row) =>
      Array.from({length:16}).map((_,col) => {
        const lat = (row/11)*160 - 80;
        const lon = (col/15)*360 - 180;
        const phi = (90 - lat) * Math.PI/180;
        const theta = (lon + 180) * Math.PI/180;
        const x = 150 + 100 * Math.sin(phi) * Math.cos(theta);
        const y = 150 + 100 * Math.cos(phi);
        const visible2 = Math.sin(phi) * Math.cos(theta) > -0.3;
        return visible2 ? (
          <circle key={`${row}-${col}`} cx={x} cy={y} r="2" fill="#34BE86" opacity="0.5"/>
        ) : null;
      })
    )}
    {/* Grid lines */}
    {[0,30,60,90,120,150].map(lon => (
      <ellipse key={lon} cx="150" cy="150"
        rx={Math.abs(100*Math.sin(lon*Math.PI/180))||2}
        ry="100"
        stroke="#34BE86" strokeWidth="0.5" opacity="0.2"
        transform={`rotate(${lon} 150 150)`}
      />
    ))}
    {[30,60,120,150].map(lat => {
      const r = 100 * Math.sin((90-lat)*Math.PI/180);
      const cy = 150 + 100 * Math.cos((90-lat)*Math.PI/180);
      return <circle key={lat} cx="150" cy={cy} r={r} stroke="#34BE86" strokeWidth="0.5" opacity="0.2" fill="none"/>;
    })}
    {/* Connection lines */}
    <path d="M150 60 Q200 90 220 150 Q200 210 150 230 Q100 210 90 150 Q100 90 150 60" stroke="#34BE86" strokeWidth="1" opacity="0.4" fill="none"/>
    <path d="M80 120 L150 100 L220 130 L200 190 L150 200 L100 180Z" stroke="#34BE86" strokeWidth="0.8" opacity="0.3" fill="none"/>
  </svg>
);

export default AboutInternationalPresence;
import React, { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    title: "Secure & Encrypted",
    desc: "All video calls and notarized documents are protected with bank-level encryption.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 5L8 10v10c0 7.18 5.14 13.89 12 15.5C27.86 33.89 33 27.18 33 20V10L20 5z"
          stroke="#1a6647" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(77,217,172,0.15)"/>
        <rect x="15" y="18" width="10" height="9" rx="2" stroke="#1a6647" strokeWidth="1.6"/>
        <circle cx="20" cy="18" r="3" stroke="#1a6647" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    title: "Futuristic Digital Process",
    desc: "Experience the future of notarization with instant video calls, smart identity checks, and digital seals that are ready to use worldwide.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="12" stroke="#1a6647" strokeWidth="1.7" strokeDasharray="4 2.5"/>
        <circle cx="20" cy="20" r="6" stroke="#1a6647" strokeWidth="1.5" fill="rgba(77,217,172,0.18)"/>
        <circle cx="20" cy="20" r="2.5" fill="#1a6647"/>
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" stroke="#1a6647" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M11.5 11.5l2.8 2.8M25.7 25.7l2.8 2.8M28.5 11.5l-2.8 2.8M14.3 25.7l-2.8 2.8"
          stroke="#1a6647" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Available 24/7",
    desc: "Connect with a licensed U.S. notary any time of day — no scheduling required.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="13" stroke="#1a6647" strokeWidth="1.7" fill="rgba(77,217,172,0.12)"/>
        <path d="M20 12v8l5 3" stroke="#1a6647" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <text x="11" y="36" fontSize="7" fill="#1a6647" fontWeight="700" fontFamily="Poppins,sans-serif">24/7</text>
      </svg>
    ),
  },
  {
    title: "Fast Processing",
    desc: "Most notarizations are completed in under 5 minutes, with instant download of your certified document.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="13" stroke="#1a6647" strokeWidth="1.7" fill="rgba(77,217,172,0.12)"/>
        <path d="M14 20h12M26 20l-4-4M26 20l-4 4" stroke="#1a6647" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 14c1.5-3 5-5 10-5" stroke="#1a6647" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    title: "Licensed U.S. Notaries",
    desc: "Every session is handled by a legally certified U.S. notary public, ensuring full compliance.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="11" y="7" width="18" height="24" rx="3" stroke="#1a6647" strokeWidth="1.7" fill="rgba(77,217,172,0.12)"/>
        <path d="M15 14h10M15 18h10M15 22h6" stroke="#1a6647" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="27" cy="28" r="5" fill="#e0f5ec" stroke="#1a6647" strokeWidth="1.4"/>
        <path d="M25 28l1.5 1.5L29 26" stroke="#1a6647" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Simple & Convenient",
    desc: "No travel, no waiting. Upload your document and get it notarized online from anywhere in the world.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="22" cy="20" r="10" stroke="#1a6647" strokeWidth="1.7" fill="rgba(77,217,172,0.12)"/>
        <path d="M14 28L9 33" stroke="#1a6647" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="22" cy="20" r="4" stroke="#1a6647" strokeWidth="1.5"/>
        <path d="M22 10v3M22 27v3M12 20h3M29 20h3" stroke="#1a6647" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const WhyChooseNotary: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes wcn-fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wcn-popIn {
          0%   { opacity: 0; transform: scale(0.88) translateY(20px); }
          70%  { transform: scale(1.03) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wcn-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes wcn-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(77,217,172,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(77,217,172,0); }
        }
        @keyframes wcn-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .wcn-visible .wcn-header {
          animation: wcn-fadeUp 0.65s ease both;
        }
        .wcn-visible .wcn-card {
          animation: wcn-popIn 0.55s cubic-bezier(.22,.68,0,1.2) both;
        }
        .wcn-visible .wcn-card:nth-child(1) { animation-delay: 0.08s; }
        .wcn-visible .wcn-card:nth-child(2) { animation-delay: 0.16s; }
        .wcn-visible .wcn-card:nth-child(3) { animation-delay: 0.24s; }
        .wcn-visible .wcn-card:nth-child(4) { animation-delay: 0.32s; }
        .wcn-visible .wcn-card:nth-child(5) { animation-delay: 0.40s; }
        .wcn-visible .wcn-card:nth-child(6) { animation-delay: 0.48s; }

        .wcn-card {
          border-radius: 20px;
          padding: 30px 26px 28px;
          background: linear-gradient(145deg, #d4f5e9 0%, #b8edda 50%, #9ee5cc 100%);
          border: 1px solid rgba(255,255,255,0.6);
          cursor: default;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.3s ease,
                      background 0.3s ease;
        }
        .wcn-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg,
            transparent 0%,
            rgba(255,255,255,0.35) 45%,
            rgba(255,255,255,0.6) 50%,
            rgba(255,255,255,0.35) 55%,
            transparent 100%
          );
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .wcn-card:hover::before {
          opacity: 1;
          animation: wcn-shimmer 0.7s ease forwards;
        }
        .wcn-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 16px 48px rgba(42,168,118,0.22);
          background: linear-gradient(145deg, #c2f0e2 0%, #a5e8d2 50%, #88dfc1 100%);
        }

        .wcn-icon-wrap {
          width: 60px; height: 60px;
          border-radius: 16px;
          background: rgba(255,255,255,0.55);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
          transition: transform 0.35s ease, background 0.25s ease;
          box-shadow: 0 2px 10px rgba(42,168,118,0.15);
        }
        .wcn-card:hover .wcn-icon-wrap {
          transform: rotate(-6deg) scale(1.1);
          background: rgba(255,255,255,0.8);
          animation: wcn-pulse 1.2s ease infinite;
        }

        .wcn-eyebrow {
          font-size: 11.5px;
          font-weight: 700;
          color: #2aA876;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        @media (max-width: 900px) {
          .wcn-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .wcn-grid { grid-template-columns: 1fr !important; }
          .wcn-card { padding: 24px 20px 22px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wcn-card, .wcn-icon-wrap { animation: none !important; transition: none !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={visible ? "wcn-visible" : ""}
        style={{
          background: "#f8fdfb",
          padding: "88px clamp(20px,6vw,100px) 96px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div
          className="wcn-header"
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <p className="wcn-eyebrow">Why Choose It?</p>
          <h2
            style={{
              fontSize: "clamp(24px,3.5vw,44px)",
              fontWeight: 800,
              color: "#0b2418",
              lineHeight: 1.18,
              margin: "0 0 16px",
              letterSpacing: "-0.5px",
            }}
          >
            Why Choose Our Online Notary?
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#4a6659",
              lineHeight: 1.8,
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            Our online document notarization service is built for speed, compliance,
            and worldwide accessibility — trusted by individuals and businesses 24/7.
          </p>
        </div>

        {/* ── Grid ── */}
        <div
          className="wcn-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(14px,2vw,24px)",
            maxWidth: "1060px",
            margin: "0 auto",
          }}
        >
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="wcn-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Corner accent dot */}
              <div style={{
                position: "absolute",
                top: "18px", right: "18px",
                width: "8px", height: "8px",
                borderRadius: "50%",
                background: hovered === i ? "#2aA876" : "rgba(42,168,118,0.3)",
                transition: "background 0.3s ease, transform 0.3s ease",
                transform: hovered === i ? "scale(1.4)" : "scale(1)",
              }}/>

              <div className="wcn-icon-wrap">{feat.icon}</div>

              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#0b2418",
                  margin: "0 0 10px",
                  lineHeight: 1.3,
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "#3a5448",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyChooseNotary;
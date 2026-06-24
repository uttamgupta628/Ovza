import React, { useEffect, useState } from "react";

interface NotarizationHeroProps {
  heroImage: string;
}

const NotarizationHero: React.FC<NotarizationHeroProps> = ({ heroImage }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // trigger animations after mount
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes nh-fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nh-fadeIn {
          from { opacity: 0; transform: scale(0.94); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes nh-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-12px) rotate(1deg); }
          66%       { transform: translateY(-6px) rotate(-1deg); }
        }
        @keyframes nh-blobPulse {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50%       { transform: scale(1.08); opacity: 0.18; }
        }
        @keyframes nh-blobPulse2 {
          0%, 100% { transform: scale(1); opacity: 0.08; }
          50%       { transform: scale(1.1); opacity: 0.14; }
        }
        @keyframes nh-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes nh-badgePop {
          0%   { opacity: 0; transform: translateY(-10px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes nh-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes nh-lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .nh-badge {
          opacity: 0;
          animation: nh-badgePop 0.5s ease 0.1s forwards;
        }
        .nh-text-1 { opacity: 0; }
        .nh-text-1.go { animation: nh-fadeUp 0.7s ease 0.2s forwards; }
        .nh-text-2 { opacity: 0; }
        .nh-text-2.go { animation: nh-fadeUp 0.7s ease 0.35s forwards; }
        .nh-text-3 { opacity: 0; }
        .nh-text-3.go { animation: nh-fadeUp 0.7s ease 0.5s forwards; }
        .nh-stats  { opacity: 0; }
        .nh-stats.go  { animation: nh-fadeUp 0.7s ease 0.6s forwards; }

        .nh-img-wrap { opacity: 0; }
        .nh-img-wrap.go { animation: nh-fadeIn 0.9s ease 0.3s forwards; }

        .nh-float { animation: nh-float 5s ease-in-out infinite; }

        .nh-blob1 {
          animation: nh-blobPulse 6s ease-in-out infinite;
        }
        .nh-blob2 {
          animation: nh-blobPulse2 8s ease-in-out 1s infinite;
        }
        .nh-blob3 {
          animation: nh-blobPulse 7s ease-in-out 2s infinite;
        }

        .nh-secure {
          background: linear-gradient(90deg, #fff 0%, #a8f0d8 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: nh-shimmer 3s linear infinite;
        }

        .nh-dot-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          background: #fff;
          animation: nh-dot 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        .nh-btn-primary {
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .nh-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.15);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .nh-btn-primary:hover::after { transform: translateX(0); }
        .nh-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.25);
        }

        .nh-btn-outline {
          transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
          cursor: pointer;
        }
        .nh-btn-outline:hover {
          background: rgba(255,255,255,0.15) !important;
          transform: translateY(-2px);
        }

        .nh-stat-card {
          transition: transform 0.2s ease, background 0.2s ease;
        }
        .nh-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.22) !important;
        }

        .nh-divider {
          transform-origin: left;
          animation: nh-lineGrow 0.8s ease 0.9s both;
        }

        @media (max-width: 768px) {
          .nh-main-grid { grid-template-columns: 1fr !important; text-align: center; }
          .nh-stats-row { justify-content: center !important; }
          .nh-btn-row   { justify-content: center !important; }
          .nh-img-wrap  { margin-top: 32px; }
        }
      `}</style>

      <section
        style={{
          background: "linear-gradient(140deg, #1cb87a 0%, #2aba8c 35%, #0d9e6b 70%, #0a7a54 100%)",
          paddingTop: "72px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
          minHeight: "480px",
        }}
      >
        {/* ── Animated background blobs ── */}
        <div className="nh-blob1" style={{ position: "absolute", top: "-80px", left: "-60px", width: "400px", height: "400px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.12)", pointerEvents: "none" }}/>
        <div className="nh-blob2" style={{ position: "absolute", top: "20px", right: "15%",   width: "300px", height: "300px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", pointerEvents: "none" }}/>
        <div className="nh-blob3" style={{ position: "absolute", bottom: "-60px", right: "-40px", width: "360px", height: "360px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", pointerEvents: "none" }}/>
        {/* Grid texture overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}/>

        <div
          className="nh-main-grid"
          style={{
            maxWidth: "1276px", margin: "0 auto",
            padding: "0 clamp(20px,5vw,100px)",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            alignItems: "center", gap: "48px",
            position: "relative", zIndex: 1,
          }}
        >
          {/* ── LEFT — text ── */}
          <div>
            {/* Live badge */}
            <div
              className="nh-badge"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "999px",
                padding: "7px 16px",
                marginBottom: "24px",
              }}
            >
              <div className="nh-dot-pulse"/>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#ffffff", fontFamily: "'Poppins',sans-serif", letterSpacing: "0.04em" }}>
                Available 24/7 — Notaries Online Now
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`nh-text-1 ${loaded ? "go" : ""}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(24px,3.2vw,46px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                marginBottom: "8px",
              }}
            >
              Online Document
            </h1>
            <h1
              className={`nh-text-2 ${loaded ? "go" : ""}`}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(24px,3.2vw,46px)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "20px",
              }}
            >
              <span className="nh-secure">Notarization</span>
              <span style={{ color: "#ffffff" }}> – Fast,</span>
              <br />
              <span style={{ color: "#ffffff" }}>Secure & 24/7</span>
            </h1>

            {/* Divider line */}
            <div
              className="nh-divider"
              style={{ height: "3px", width: "60px", backgroundColor: "rgba(255,255,255,0.5)", borderRadius: "2px", marginBottom: "20px" }}
            />

            <p
              className={`nh-text-3 ${loaded ? "go" : ""}`}
              style={{
                fontSize: "clamp(13px,1.4vw,15px)",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.8,
                maxWidth: "460px",
                marginBottom: "32px",
              }}
            >
              Notarize a document online in minutes with OVZA's secure, fast, and
              legally certified network of U.S. notary publics. Completed in as little
              as 5 minutes, with instant 24/7 video calls with our licensed notaries.
            </p>

            {/* Buttons */}
            <div
              className={`nh-btn-row nh-text-3 ${loaded ? "go" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}
            >
              <button
                className="nh-btn-primary"
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  backgroundColor: "#0a1f1a", color: "#ffffff",
                  border: "none", borderRadius: "999px",
                  padding: "14px 28px", fontSize: "13px", fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Get Started Now
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="nh-btn-outline"
                onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  backgroundColor: "transparent", color: "#ffffff",
                  border: "2px solid rgba(255,255,255,0.5)", borderRadius: "999px",
                  padding: "12px 24px", fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Learn More
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Stats row */}
            <div
              className={`nh-stats-row nh-stats ${loaded ? "go" : ""}`}
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
            >
              {[
                { value: "5 min", label: "Avg. completion" },
                { value: "24/7",  label: "Always available" },
                { value: "100%",  label: "Legally certified" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="nh-stat-card"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "14px",
                    padding: "12px 20px",
                    display: "flex", flexDirection: "column", gap: "2px",
                    minWidth: "90px",
                  }}
                >
                  <span style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", fontFamily: "'Poppins',sans-serif", lineHeight: 1 }}>
                    {s.value}
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", fontFamily: "'Poppins',sans-serif" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — illustration ── */}
          <div
            className={`nh-img-wrap ${loaded ? "go" : ""}`}
            style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {/* Outer glow ring */}
            <div style={{
              position: "absolute",
              width: "clamp(260px,32vw,440px)",
              height: "clamp(260px,32vw,440px)",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              pointerEvents: "none",
            }}/>
            {/* Inner circle */}
            <div style={{
              position: "absolute",
              width: "clamp(220px,28vw,380px)",
              height: "clamp(220px,28vw,380px)",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.12)",
              pointerEvents: "none",
            }}/>

            {/* Floating image */}
            <img
              src={heroImage}
              alt="Document Notarization"
              className="nh-float"
              style={{
                position: "relative", zIndex: 2,
                width: "clamp(220px,30vw,420px)",
                objectFit: "contain",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
              }}
            />

            {/* Floating badge — bottom left */}
            <div
              className={`nh-stats ${loaded ? "go" : ""}`}
              style={{
                position: "absolute", bottom: "10px", left: "-10px",
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                padding: "10px 16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                display: "flex", alignItems: "center", gap: "10px",
                zIndex: 3, minWidth: "160px",
              }}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#e8faf5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2v10M5 8l4 4 4-4M3 15h12" stroke="#34BE86" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#0a1f1a", fontFamily: "'Poppins',sans-serif" }}>Instant Download</div>
                <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "'Poppins',sans-serif" }}>Ready in minutes</div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div
              className={`nh-badge`}
              style={{
                position: "absolute", top: "10px", right: "-10px",
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                padding: "10px 16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                display: "flex", alignItems: "center", gap: "10px",
                zIndex: 3, minWidth: "150px",
              }}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#e8faf5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L4 5v5c0 3.9 2.7 7.5 5 8.4 2.3-.9 5-4.5 5-8.4V5l-5-3z" stroke="#34BE86" strokeWidth="1.5" fill="none"/>
                  <path d="M6 9l2 2 4-4" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#0a1f1a", fontFamily: "'Poppins',sans-serif" }}>US Certified</div>
                <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "'Poppins',sans-serif" }}>Licensed notaries</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotarizationHero;
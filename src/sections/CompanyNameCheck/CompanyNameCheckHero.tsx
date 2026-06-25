import React, { useEffect, useRef, useState } from "react";
import nameChecker from "../../assets/namechecker.png";

const CompanyNameCheckHero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger immediately if already in view on mount
    setVisible(true);
  }, []);

  return (
    <>
      <style>{`
        @keyframes cnc-slideLeft {
          from { opacity: 0; transform: translateX(-36px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cnc-slideRight {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cnc-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes cnc-pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.35); }
          70%  { box-shadow: 0 0 0 12px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes cnc-blob1 {
          0%, 100% { transform: scale(1) translate(0,0); }
          50%       { transform: scale(1.08) translate(10px,-8px); }
        }
        @keyframes cnc-blob2 {
          0%, 100% { transform: scale(1) translate(0,0); }
          50%       { transform: scale(0.94) translate(-8px,10px); }
        }

        .cnc-visible .cnc-left  { animation: cnc-slideLeft  0.7s cubic-bezier(.22,.68,0,1.1) both; }
        .cnc-visible .cnc-right { animation: cnc-slideRight 0.75s cubic-bezier(.22,.68,0,1.1) 0.1s both; }

        .cnc-img { animation: cnc-float 4s ease-in-out infinite; }

        .cnc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.18);
          color: #fff;
          border: 1.8px solid rgba(255,255,255,0.55);
          border-radius: 999px;
          padding: 13px 24px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          backdrop-filter: blur(6px);
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none;
        }
        .cnc-cta:hover {
          background: rgba(255,255,255,0.3);
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.15);
          animation: cnc-pulse-ring 1s ease forwards;
        }

        .cnc-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .cnc-blob1 { animation: cnc-blob1 7s ease-in-out infinite; }
        .cnc-blob2 { animation: cnc-blob2 9s ease-in-out infinite; }

        @media (max-width: 720px) {
          .cnc-grid  { grid-template-columns: 1fr !important; text-align: center; }
          .cnc-right { justify-content: center !important; margin-top: 24px; }
          .cnc-left p { max-width: 100% !important; }
          .cnc-cta   { align-self: center; }
          .cnc-cta-wrap { justify-content: center !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cnc-img, .cnc-blob1, .cnc-blob2 { animation: none !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={visible ? "cnc-visible" : ""}
        style={{
          background: "linear-gradient(135deg, #4DD9AC 0%, #2EC68F 50%, #1EAF7A 100%)",
          padding: "clamp(40px,6vw,80px) clamp(20px,6vw,100px)",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative blobs */}
        <div className="cnc-blob cnc-blob1" style={{
          top: "-70px", right: "220px",
          width: "260px", height: "260px",
          background: "rgba(255,255,255,0.09)",
        }}/>
        <div className="cnc-blob cnc-blob2" style={{
          bottom: "-50px", left: "-30px",
          width: "180px", height: "180px",
          background: "rgba(255,255,255,0.07)",
        }}/>
        <div className="cnc-blob" style={{
          top: "20px", left: "38%",
          width: "60px", height: "60px",
          background: "rgba(255,255,255,0.06)",
        }}/>

        {/* Grid */}
        <div
          className="cnc-grid"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1160px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            alignItems: "center",
            gap: "clamp(28px,5vw,72px)",
          }}
        >
          {/* LEFT */}
          <div className="cnc-left" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {/* eyebrow */}
            <span style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              padding: "4px 12px",
              borderRadius: "999px",
              marginBottom: "16px",
              width: "fit-content",
            }}>
              <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="white"/></svg>
              Free Tool
            </span>

            <h1
              style={{
                fontSize: "clamp(24px,3.2vw,42px)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
                margin: "0 0 18px",
                letterSpacing: "-0.3px",
              }}
            >
              Free Company Name Check
            </h1>

            <p
              style={{
                fontSize: "clamp(12.5px,1.3vw,14px)",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.85,
                margin: "0 0 32px",
                maxWidth: "480px",
              }}
            >
              We assist with an offshore company name check to confirm availability and
              acceptability in the offshore jurisdiction you choose. This tool is used to
              verify whether your proposed business name meets registry requirements before
              proceeding with incorporation.
            </p>

            <div className="cnc-cta-wrap" style={{ display: "flex" }}>
              <button className="cnc-cta">
                Verify Your Business Name's Availability at no Cost
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8l5 5 5-5" stroke="white" strokeWidth="1.7"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT — illustration */}
          <div
            className="cnc-right"
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
          >
            {/* glow blob behind image */}
            <div style={{
              position: "absolute",
              width: "clamp(200px,25vw,320px)",
              height: "clamp(180px,22vw,290px)",
              borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%",
              background: "rgba(255,255,255,0.13)",
              pointerEvents: "none",
            }}/>
            <img
              src={nameChecker}
              alt="Company Name Checker Illustration"
              className="cnc-img"
              style={{
                position: "relative",
                zIndex: 1,
                width: "clamp(180px,28vw,380px)",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.12))",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyNameCheckHero;
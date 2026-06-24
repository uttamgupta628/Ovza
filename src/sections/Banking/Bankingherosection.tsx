import React from "react";
import bankingHero from "../../assets/bankinghero.png";

const BankingHeroSection: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes bhs-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bhs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .bhs-text { animation: bhs-fadeUp 0.7s ease forwards; }
        .bhs-img  { animation: bhs-fadeIn 0.9s ease 0.15s both; }
        .bhs-scroll-btn {
          transition: background 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .bhs-scroll-btn:hover {
          background: #155c3a !important;
          transform: translateY(-2px);
        }
        @media (max-width: 720px) {
          .bhs-grid { grid-template-columns: 1fr !important; }
          .bhs-img  { justify-content: center !important; }
        }
      `}</style>

      <section
        style={{
          background: "linear-gradient(150deg, #4DD9AC 0%, #34BE86 60%, #2aA876 100%)",
          padding: "72px 0 64px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Background blobs */}
        <div style={{
          position: "absolute", top: "-60px", right: "140px",
          width: "340px", height: "340px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.08)", pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: "40px", left: "30px",
          width: "140px", height: "140px", borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }}/>

        {/* 2-col grid */}
        <div
          className="bhs-grid"
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
          <div className="bhs-text">
            <h1
              style={{
                fontSize: "clamp(26px,3.2vw,42px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                margin: "0 0 20px",
              }}
            >
              Open an Offshore Bank Account With OVZA
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
              Open an offshore bank account in a world of tightening regulations and evolving global
              compliance. Despite this, offshore banking remains a powerful way to manage international
              transactions, protect assets, and maintain financial flexibility — when structured correctly.
            </p>
            <button
              className="bhs-scroll-btn"
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

          {/* RIGHT — illustration */}
          <div
            className="bhs-img"
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Blob behind image */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "340px", height: "300px",
              backgroundColor: "rgba(255,255,255,0.12)",
              borderRadius: "55% 45% 60% 40% / 50% 60% 40% 50%",
              pointerEvents: "none",
            }}/>
            <img
              src={bankingHero}
              alt="Offshore Bank Account"
              style={{
                position: "relative",
                zIndex: 1,
                width: "clamp(220px,32vw,420px)",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BankingHeroSection;
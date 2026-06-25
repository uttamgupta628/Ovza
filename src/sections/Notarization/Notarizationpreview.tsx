import React, { useState } from "react";
import containerImg from "../../assets/document1.png";

type TabType = "acknowledgment" | "sworn";

const tabs: { id: TabType; label: string }[] = [
  { id: "acknowledgment", label: "Notary Acknowledgment" },
  { id: "sworn",          label: "Sworn Statement" },
];

const NotarizationPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("acknowledgment");

  return (
    <>
      <style>{`
        @keyframes np2-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes np2-slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes np2-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(52,190,134,0); }
          50%      { box-shadow: 0 0 24px 4px rgba(52,190,134,0.12); }
        }

        .np2-header { animation: np2-fadeUp 0.65s ease forwards; }
        .np2-tabs   { animation: np2-fadeUp 0.65s ease 0.15s both; }
        .np2-card   { animation: np2-fadeUp 0.7s ease 0.25s both; }

        .np2-tab-btn {
          transition: all 0.22s ease;
          cursor: pointer;
          white-space: nowrap;
        }
        .np2-tab-btn:hover:not(.active) {
          background: rgba(52,190,134,0.08) !important;
          color: #34BE86 !important;
        }

        .np2-doc-panel {
          animation: np2-slideIn 0.35s ease forwards;
        }

        .np2-outer-card {
          animation: np2-glow 4s ease-in-out infinite;
        }

        .np2-blob1 {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: np2-pulse1 7s ease-in-out infinite;
        }
        .np2-blob2 {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: np2-pulse2 9s ease-in-out 1s infinite;
        }
        @keyframes np2-pulse1 {
          0%,100% { transform: scale(1); opacity: 0.12; }
          50%      { transform: scale(1.08); opacity: 0.2; }
        }
        @keyframes np2-pulse2 {
          0%,100% { transform: scale(1); opacity: 0.08; }
          50%      { transform: scale(1.1); opacity: 0.15; }
        }

        /* document stamp wobble on hover */
        .np2-stamp {
          transition: transform 0.3s ease;
        }
        .np2-stamp:hover { transform: rotate(-3deg) scale(1.06); }

        @media (max-width: 640px) {
          .np2-tabs-row { flex-direction: column !important; align-items: stretch !important; }
          .np2-tab-btn  { text-align: center !important; }
        }
      `}</style>

      {/* ── Full-width green section ── */}
      <section
        style={{
          background: "linear-gradient(160deg, #1cb87a 0%, #2aba8c 40%, #0d9e6b 100%)",
          paddingTop: "72px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated background blobs */}
        <div className="np2-blob1" style={{ top: "-80px", left: "-60px",  width: "360px", height: "360px", backgroundColor: "rgba(255,255,255,0.1)" }}/>
        <div className="np2-blob2" style={{ bottom: "-60px", right: "-40px", width: "320px", height: "320px", backgroundColor: "rgba(255,255,255,0.08)" }}/>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }}/>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", position: "relative", zIndex: 1 }}>

          {/* ── Header ── */}
          <div className="np2-header" style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: "clamp(24px,3.5vw,44px)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}>
              Preview Your Notary Stamp
            </h2>
            <p style={{
              fontSize: "clamp(13px,1.5vw,15px)",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.8,
              maxWidth: "520px",
              margin: "0 auto",
              fontFamily: "'Poppins',sans-serif",
            }}>
              See exactly how your online notarized document will appear before you book.
              Whether it's an acknowledgment, sworn oath, or any other document you need
              from our notary publics, each document includes a certified notary seal and
              digital certificate accepted worldwide.
            </p>
          </div>

          {/* ── Tab switcher ── */}
          <div
            className="np2-tabs"
            style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}
          >
            <div
              className="np2-tabs-row"
              style={{
                display: "inline-flex",
                gap: "8px",
                backgroundColor: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                padding: "6px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`np2-tab-btn${isActive ? " active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: isActive ? "#ffffff" : "transparent",
                      color: isActive ? "#0a6b48" : "rgba(255,255,255,0.85)",
                      fontSize: "13px",
                      fontWeight: isActive ? 700 : 500,
                      fontFamily: "'Poppins',sans-serif",
                      boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                      transition: "all 0.22s ease",
                    }}
                  >
                    {/* Tab icon */}
                    {tab.id === "acknowledgment" ? (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <rect x="2" y="1" width="10" height="12" rx="1.5" stroke={isActive ? "#34BE86" : "currentColor"} strokeWidth="1.3"/>
                        <path d="M4 5h6M4 7h6M4 9h4" stroke={isActive ? "#34BE86" : "currentColor"} strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1L2 4v4c0 3 2.5 5.5 5 6.3 2.5-.8 5-3.3 5-6.3V4L7 1z" stroke={isActive ? "#34BE86" : "currentColor"} strokeWidth="1.3" fill="none"/>
                        <path d="M4.5 7l2 2 3-3" stroke={isActive ? "#34BE86" : "currentColor"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Document preview card ── */}
          <div
            className="np2-card np2-outer-card"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              padding: "clamp(16px,3vw,32px)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              border: "1px solid rgba(255,255,255,0.9)",
            }}
          >
            {/* Document image — Container.png is 1231.4 × 749.55px, aspect ratio ~1.643:1 */}
            <div
              key={activeTab}
              className="np2-doc-panel"
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                /* maintain the exact 1231.4 / 749.55 aspect ratio */
                aspectRatio: "1231.4 / 749.55",
                width: "100%",
                position: "relative",
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={containerImg}
                alt={activeTab === "acknowledgment" ? "Notary Acknowledgment Document" : "Sworn Statement Document"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotarizationPreview;
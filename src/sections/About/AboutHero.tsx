import React from "react";

interface AboutHeroProps {
  heroImage?: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ heroImage }) => {
  return (
    <>
      <style>{`
        @keyframes ah-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ah-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .ah-text { animation: ah-fadeUp 0.7s ease forwards; }
        .ah-img  { animation: ah-fadeIn 0.9s ease 0.2s forwards; opacity: 0; }
        .ah-chat-btn {
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .ah-chat-btn:hover {
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
      `}</style>

      <section
        style={{
          background: "linear-gradient(135deg, #2DC88A 0%, #1aa870 40%, #0e8f5c 100%)",
          paddingTop: "48px",
          paddingBottom: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1276px",
            margin: "0 auto",
            padding: "0 clamp(20px,5vw,118px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "40px",
          }}
          className="ah-grid"
        >
          {/* Left — text */}
          <div className="ah-text">
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "28px" }}>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Home</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: "13px", color: "#ffffff", fontWeight: 600 }}>About Us</span>
            </div>

            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(28px,3.5vw,46px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
            >
              Simplifying Global Business Success
            </h1>

            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.88)", lineHeight: 1.8, maxWidth: "480px" }}>
              We specialize in global business formation, providing support from offshore company
              registration to bank account setup in multiple jurisdictions. We are committed to
              empowering entrepreneurs with the tools they need to succeed in a complex,
              interconnected world.
            </p>
          </div>

          {/* Right — illustration + floating contact card */}
          <div className="ah-img" style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            {/* Circular mint bg */}
            <div
              style={{
                width: "clamp(260px,30vw,400px)",
                height: "clamp(260px,30vw,400px)",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {heroImage ? (
                <img src={heroImage} alt="Global Business" style={{ width: "90%", height: "90%", objectFit: "contain" }} />
              ) : (
                <HeroPlaceholder />
              )}
            </div>

            {/* Floating contact card */}
            {/* <div
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "0",
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                padding: "16px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                minWidth: "180px",
              }}
            >
              <button
                className="ah-chat-btn"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "none", border: "none", padding: "4px 0", cursor: "pointer",
                }}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#e8faf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5l-3 2V3a1 1 0 011-1z" stroke="#34BE86" strokeWidth="1.3" fill="none"/>
                  </svg>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0a1f1a" }}>Chat with us</span>
              </button>
              <div style={{ height: "1px", backgroundColor: "#f3f4f6" }} />
              <button
                className="ah-chat-btn"
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "none", border: "none", padding: "4px 0", cursor: "pointer",
                }}
              >
                <div style={{ width: "28px", height: "28px", borderRadius: "6px", backgroundColor: "#e8faf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2a1 1 0 011-1h2l1 3-1.5 1.5a8 8 0 004 4L10 8l3 1v2a1 1 0 01-1 1A11 11 0 012 3z" stroke="#34BE86" strokeWidth="1.3" fill="none"/>
                  </svg>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#0a1f1a" }}>Call Us</span>
              </button>
            </div> */}

            {/* Green scroll-down button */}
            <div
              style={{
                position: "absolute",
                bottom: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "44px", height: "44px",
                borderRadius: "50%",
                backgroundColor: "#34BE86",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(52,190,134,0.4)",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 720px) { .ah-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
};

const HeroPlaceholder = () => (
  <svg viewBox="0 0 300 280" fill="none" style={{ width: "80%", height: "80%" }}>
    <circle cx="150" cy="140" r="110" fill="rgba(255,255,255,0.12)"/>
    <path d="M90 140 C90 140 120 100 150 120 C180 140 210 100 210 140" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none"/>
    <circle cx="110" cy="60" r="12" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"/>
    <circle cx="230" cy="80" r="16" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"/>
    <circle cx="240" cy="180" r="12" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
    <path d="M140 170 C140 170 150 110 160 170" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none"/>
    <circle cx="70" cy="200" r="18" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
  </svg>
);

export default AboutHero;
import React, { useEffect, useRef, useState } from "react";
import marginImg from "../../assets/margin.png";
// margin

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

const OffshoreDetails: React.FC = () => {
  const { ref: leftRef, visible: leftVisible } = useInView(0.1);
  const { ref: rightRef, visible: rightVisible } = useInView(0.1);

  return (
    <>
      <style>{`
        @keyframes od-fadeUp { from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);} }
        @keyframes od-fadeIn { from{opacity:0;}to{opacity:1;} }
        .od-fade{opacity:0;} .od-fade.go{animation:od-fadeUp 0.65s ease forwards;}
        .od-fi{opacity:0;} .od-fi.go{animation:od-fadeIn 0.8s ease forwards;}
        .od-info-card{transition:transform 0.22s ease,box-shadow 0.22s ease;}
        .od-info-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(52,190,134,0.18) !important;}
        .od-cta-btn{transition:background 0.2s ease,transform 0.2s ease;cursor:pointer;}
        .od-cta-btn:hover{background:#2aa876 !important;transform:translateY(-2px);}
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,100px)" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "64px", alignItems: "start",
          }} className="od-main-grid">

            {/* ── LEFT COLUMN ── */}
            <div ref={leftRef}>

              {/* Fast Offshore Company Registration */}
              <div className={`od-fade ${leftVisible ? "go" : ""}`} style={{ marginBottom: "40px" }}>
                <h2 style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "clamp(18px,2vw,24px)", fontWeight: 800,
                  color: "#0a1f1a", marginBottom: "16px", lineHeight: 1.3,
                }}>
                  Fast Offshore Company Registration
                </h2>
                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.85, margin: 0 }}>
                  When you register an offshore company, the process should be clear and reliable.
                  Once you select your jurisdiction, we prepare the incorporation documents and file
                  them with the registrar so your new company is legally established and ready for
                  international business.
                </p>
              </div>

              {/* Effortless Global Compliance */}
              <div
                className={`od-fade ${leftVisible ? "go" : ""}`}
                style={{ animationDelay: "120ms", marginBottom: "40px" }}
              >
                <h2 style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "clamp(18px,2vw,24px)", fontWeight: 800,
                  color: "#0a1f1a", marginBottom: "16px", lineHeight: 1.3,
                }}>
                  Effortless Global Compliance
                </h2>
                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.85, margin: 0 }}>
                  To register an offshore company, compliance must be completed correctly. Our secure
                  online notarization verifies your passport and proof of address through a high-tech
                  video call. This service is legally recognized in every supported jurisdiction and
                  ensures that your company meets strict KYC standards without delay.
                </p>
              </div>

              {/* margin.png illustration */}
              <div
                className={`od-fi ${leftVisible ? "go" : ""}`}
                style={{ animationDelay: "200ms", display: "flex", justifyContent: "flex-start" }}
              >
                <div style={{
                  position: "relative",
                  width: "clamp(240px,28vw,380px)",
                }}>
                  {/* Subtle mint blob behind image */}
                  <div style={{
                    position: "absolute",
                    bottom: "-20px", left: "-20px",
                    width: "80%", height: "80%",
                    borderRadius: "50%",
                    backgroundColor: "#e8faf5",
                    zIndex: 0,
                  }}/>
                  <img
                    src={marginImg}
                    alt="Offshore Company Process"
                    style={{
                      position: "relative", zIndex: 1,
                      width: "100%", objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div ref={rightRef} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

              {/* Info cards row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {/* Transparent Pricing */}
                <div
                  className={`od-info-card od-fade ${rightVisible ? "go" : ""}`}
                  style={{
                    animationDelay: "60ms",
                    backgroundColor: "#f0fdf8",
                    border: "1px solid rgba(52,190,134,0.2)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex", flexDirection: "column", gap: "12px",
                    boxShadow: "0 2px 10px rgba(52,190,134,0.07)",
                  }}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    backgroundColor: "#d0f5e8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <PricingIcon />
                  </div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "15px", fontWeight: 700, color: "#0a1f1a", margin: 0 }}>
                    Transparent Pricing
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#4b5563", lineHeight: 1.7, margin: 0 }}>
                    With OVZA, what you see is what you get. Enjoy clear, upfront pricing without
                    hidden fees. Regardless of the bank you select from our network, we guarantee
                    a straightforward flat fee, ensuring your financial planning is never disrupted
                    by unexpected costs.
                  </p>
                </div>

                {/* Local Insight */}
                <div
                  className={`od-info-card od-fade ${rightVisible ? "go" : ""}`}
                  style={{
                    animationDelay: "140ms",
                    backgroundColor: "#f0fdf8",
                    border: "1px solid rgba(52,190,134,0.2)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex", flexDirection: "column", gap: "12px",
                    boxShadow: "0 2px 10px rgba(52,190,134,0.07)",
                  }}
                >
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "10px",
                    backgroundColor: "#d0f5e8",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <InsightIcon />
                  </div>
                  <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "15px", fontWeight: 700, color: "#0a1f1a", margin: 0 }}>
                    Local Insight
                  </h3>
                  <p style={{ fontSize: "12.5px", color: "#4b5563", lineHeight: 1.7, margin: 0 }}>
                    Leverage OVZA's deep local expertise in banking regulations and practices. Our
                    experience enhances your preparation for the due diligence process, significantly
                    increasing your chances of swift bank account approval.
                  </p>
                </div>
              </div>

              {/* Optimized Offshore Structuring */}
              <div className={`od-fade ${rightVisible ? "go" : ""}`} style={{ animationDelay: "200ms" }}>
                <h2 style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "clamp(17px,1.8vw,22px)", fontWeight: 800,
                  color: "#0a1f1a", marginBottom: "12px", lineHeight: 1.3,
                }}>
                  Optimized Offshore Structuring
                </h2>
                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.85, margin: 0 }}>
                  The way you register an offshore company has lasting benefits for asset protection
                  and tax efficiency. Supported jurisdictions provide offshore frameworks with no
                  income tax, no capital gains tax, and no withholding tax on foreign income, allowing
                  your company to operate in a favorable environment.
                </p>
              </div>

              {/* Protected and Transparent Process */}
              <div className={`od-fade ${rightVisible ? "go" : ""}`} style={{ animationDelay: "280ms" }}>
                <h2 style={{
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "clamp(17px,1.8vw,22px)", fontWeight: 800,
                  color: "#0a1f1a", marginBottom: "12px", lineHeight: 1.3,
                }}>
                  Protected and Transparent Process
                </h2>
                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.85, marginBottom: "24px" }}>
                  Each time you register an offshore company with us, your documents and data are
                  secured with 256-bit SSL encryption and EV-SSL certification. From submission of
                  your information to final incorporation, every step is safe and aligned with modern
                  standards of compliance and transparency.
                </p>
                <button
                  className="od-cta-btn"
                  style={{
                    backgroundColor: "#34BE86",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "13px 28px",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "'Poppins',sans-serif",
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 780px) {
            .od-main-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
};

/* ── Icons ── */
const PricingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2v2M10 16v2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M2 10h2M16 10h2M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="10" cy="10" r="3" stroke="#34BE86" strokeWidth="1.4"/>
  </svg>
);
const InsightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2a6 6 0 010 12M10 14v3M7 17h6" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M7 10a3 3 0 013-3" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

export default OffshoreDetails;
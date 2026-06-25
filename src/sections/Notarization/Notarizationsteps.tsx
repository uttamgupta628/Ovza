import React, { useEffect, useRef, useState } from "react";

interface NotarizationStepsProps {
  requirementsImage?: string;
}

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

/* ── Steps data ── */
const steps = [
  {
    icon: <VerifyIcon />,
    title: "Verify Your Identity",
    desc: "Provide two valid IDs to confirm your identity (U.S. citizens with SSNs may only need one).",
  },
  {
    icon: <ConnectIcon />,
    title: "Connect Instantly with a Licensed Notary",
    desc: "You'll be matched in real time with a U.S. notary public via secure video call.",
  },
  {
    icon: <SwornIcon />,
    title: "Sworn Statement Under Oath",
    desc: "Confirm under oath that your documents are genuine and accurate.",
  },
  {
    icon: <NotarizeIcon />,
    title: "Notarization of Your Document",
    desc: "The notary applies the appropriate notarization type depending on the document.",
  },
  {
    icon: <DownloadIcon />,
    title: "Download Your Notarized Document Instantly",
    desc: "Once the session ends, your notarized document is ready for immediate download and use.",
  },
];

/* ── Requirements data ── */
const requirements = [
  {
    icon: <IdIcon />,
    label: "Proof of Identity:",
    desc: "Two valid government-issued IDs, or one ID plus your Social Security Number (for U.S. citizens).",
  },
  {
    icon: <LiveIcon />,
    label: "Live Presentation:",
    desc: "You must present your ID before and during the video call with the notary.",
  },
  {
    icon: <CameraIcon />,
    label: "Video and Microphone Access:",
    desc: "A working webcam or smartphone camera with audio enabled.",
  },
  {
    icon: <WifiIcon />,
    label: "Stable Internet Connection:",
    desc: "To keep the secure video session uninterrupted.",
  },
  {
    icon: <FileIcon />,
    label: "Document File:",
    desc: "Upload your document in PDF, JPG, or PNG format before the call.",
  },
];

const NotarizationSteps: React.FC<NotarizationStepsProps> = ({ requirementsImage }) => {
  const { ref: stepsRef, visible: stepsVisible } = useInView(0.1);
  const { ref: reqRef,   visible: reqVisible   } = useInView(0.1);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <style>{`
        @keyframes ns-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ns-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ns-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes ns-connector {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes ns-stepPop {
          0%   { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1);    opacity: 1; }
        }

        .ns-fade    { opacity: 0; }
        .ns-fade.go { animation: ns-fadeUp 0.6s ease forwards; }
        .ns-fi      { opacity: 0; }
        .ns-fi.go   { animation: ns-fadeIn 0.8s ease forwards; }

        .ns-step-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          cursor: pointer;
        }
        .ns-step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(52,190,134,0.18) !important;
        }
        .ns-step-card.active-step {
          background: linear-gradient(145deg, #c8f5ea, #e8faf5) !important;
          border-color: rgba(52,190,134,0.5) !important;
          box-shadow: 0 8px 28px rgba(52,190,134,0.2) !important;
        }

        .ns-step-number {
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .ns-step-card:hover .ns-step-number,
        .ns-step-card.active-step .ns-step-number {
          background: #34BE86 !important;
          color: #fff !important;
          transform: scale(1.1);
        }

        .ns-connector-line {
          height: 2px;
          background: linear-gradient(90deg, #34BE86, rgba(52,190,134,0.2));
          border-radius: 2px;
          flex: 1;
          transform-origin: left;
        }
        .ns-connector-line.go {
          animation: ns-connector 0.6s ease forwards;
        }

        .ns-req-item {
          transition: transform 0.2s ease, background 0.2s ease;
          cursor: default;
        }
        .ns-req-item:hover {
          transform: translateX(6px);
          background: rgba(52,190,134,0.06) !important;
        }

        .ns-img-float { animation: ns-float 4.5s ease-in-out infinite; }

        @media (max-width: 760px) {
          .ns-steps-grid { grid-template-columns: 1fr 1fr !important; }
          .ns-req-grid   { grid-template-columns: 1fr !important; }
          .ns-connector-line { display: none !important; }
        }
        @media (max-width: 480px) {
          .ns-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

          {/* ═══════════════════════════════════
              SECTION 1 — How it Works
          ═══════════════════════════════════ */}
          <div
            ref={stepsRef}
            style={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(200,245,234,0.4) 0%, rgba(232,250,245,0.3) 50%, rgba(248,255,252,0.5) 100%)",
              border: "1px solid rgba(52,190,134,0.2)",
              padding: "clamp(28px,4vw,52px)",
              marginBottom: "72px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative dots */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(52,190,134,0.08) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }}/>

            {/* Header */}
            <div className={`ns-fade ${stepsVisible ? "go" : ""}`} style={{ textAlign: "center", marginBottom: "40px", position: "relative", zIndex: 1 }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#34BE86", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px", fontFamily: "'Poppins',sans-serif" }}>
                How it Works
              </p>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(22px,2.8vw,36px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "14px", lineHeight: 1.2 }}>
                How it Works in 5 Easy Steps
              </h2>
              <p style={{ fontSize: "14px", color: "#4b5563", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'Poppins',sans-serif" }}>
                Getting your documents notarized online has never been easier. With OVZA's online notary service, the entire process takes just a few minutes and your notarized documents are available instantly.
              </p>
            </div>

            {/* Steps */}
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Connector line row (desktop) */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "0" }} className="ns-steps-row">
                {steps.map((step, idx) => (
                  <React.Fragment key={step.title}>
                    {/* Step card */}
                    <div
                      className={`ns-step-card ns-fade ${stepsVisible ? "go" : ""} ${activeStep === idx ? "active-step" : ""}`}
                      onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                      style={{
                        animationDelay: `${idx * 100 + 100}ms`,
                        flex: "1 1 0",
                        minWidth: 0,
                        borderRadius: "16px",
                        padding: "20px 16px",
                        background: "#ffffff",
                        border: "1px solid rgba(52,190,134,0.15)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      {/* Step number + icon */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          className="ns-step-number"
                          style={{
                            width: "28px", height: "28px", borderRadius: "50%",
                            backgroundColor: "rgba(52,190,134,0.1)",
                            color: "#34BE86",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "12px", fontWeight: 800,
                            fontFamily: "'Poppins',sans-serif", flexShrink: 0,
                          }}
                        >
                          {idx + 1}
                        </div>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(52,190,134,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {step.icon}
                        </div>
                      </div>

                      <h3 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "13px", fontWeight: 700, color: "#0a1f1a", margin: 0, lineHeight: 1.35 }}>
                        {step.title}
                      </h3>
                      <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: "12px", color: "#6b7280", margin: 0, lineHeight: 1.6 }}>
                        {step.desc}
                      </p>
                    </div>

                    {/* Connector arrow (between cards, not after last) */}
                    {idx < steps.length - 1 && (
                      <div style={{ display: "flex", alignItems: "center", flexShrink: 0, marginTop: "24px" }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 10h10M11 6l4 4-4 4" stroke="#34BE86" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════
              SECTION 2 — Requirements
          ═══════════════════════════════════ */}
          <div
            ref={reqRef}
            className="ns-req-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,72px)", alignItems: "center" }}
          >
            {/* Left — text */}
            <div>
              <h2
                className={`ns-fade ${reqVisible ? "go" : ""}`}
                style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(20px,2.4vw,30px)", fontWeight: 800, color: "#0a1f1a", lineHeight: 1.25, marginBottom: "16px" }}
              >
                Requirements for Your Video Notarization
              </h2>
              <p
                className={`ns-fade ${reqVisible ? "go" : ""}`}
                style={{ animationDelay: "80ms", fontSize: "14px", color: "#4b5563", lineHeight: 1.75, marginBottom: "28px", fontFamily: "'Poppins',sans-serif" }}
              >
                To complete your online notarization smoothly, please ensure you have the following ready:
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {requirements.map((req, idx) => (
                  <div
                    key={req.label}
                    className={`ns-req-item ns-fade ${reqVisible ? "go" : ""}`}
                    style={{
                      animationDelay: `${idx * 90 + 150}ms`,
                      display: "flex", alignItems: "flex-start", gap: "14px",
                      padding: "12px 14px", borderRadius: "12px",
                      backgroundColor: "rgba(52,190,134,0.03)",
                    }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(52,190,134,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {req.icon}
                    </div>
                    <p style={{ fontSize: "13.5px", color: "#374151", lineHeight: 1.65, margin: 0, fontFamily: "'Poppins',sans-serif" }}>
                      <strong style={{ color: "#0a1f1a", fontWeight: 700 }}>{req.label}</strong>{" "}
                      {req.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — illustration */}
            <div
              className={`ns-fi ${reqVisible ? "go" : ""}`}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div style={{ position: "relative", width: "clamp(240px,30vw,420px)" }}>
                {/* Mint rounded bg */}
                <div style={{
                  borderRadius: "24px",
                  backgroundColor: "#e8faf5",
                  border: "1px solid rgba(52,190,134,0.2)",
                  padding: "32px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  minHeight: "260px",
                }}
                >
                  {requirementsImage ? (
                    <img
                      src={requirementsImage}
                      alt="Video Notarization Requirements"
                      className="ns-img-float"
                      style={{ width: "100%", maxWidth: "320px", objectFit: "contain", filter: "drop-shadow(0 12px 24px rgba(52,190,134,0.2))" }}
                    />
                  ) : <RequirementsPlaceholder />}
                </div>

                {/* Floating badge */}
                <div style={{
                  position: "absolute", bottom: "-16px", left: "50%", transform: "translateX(-50%)",
                  backgroundColor: "#ffffff", borderRadius: "999px",
                  padding: "10px 20px", boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  display: "flex", alignItems: "center", gap: "8px",
                  whiteSpace: "nowrap",
                }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34BE86" }}/>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#0a1f1a", fontFamily: "'Poppins',sans-serif" }}>Notaries available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ── Step Icons ── */
function VerifyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="8" r="3.5" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}
function ConnectIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="5" width="16" height="11" rx="2" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M7 5V4a1 1 0 011-1h4a1 1 0 011 1v1" stroke="#34BE86" strokeWidth="1.4"/>
      <circle cx="10" cy="11" r="2" stroke="#34BE86" strokeWidth="1.3"/>
    </svg>
  );
}
function SwornIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2" width="12" height="16" rx="2" stroke="#34BE86" strokeWidth="1.4"/>
      <path d="M7 7h6M7 10h6M7 13h4" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function NotarizeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L3 6v5c0 4.1 3 7.8 7 8.9 4-1.1 7-4.8 7-8.9V6l-7-4z" stroke="#34BE86" strokeWidth="1.4" fill="none"/>
      <path d="M7 10l2 2 4-4" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3v9M6 8l4 4 4-4" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 15h14" stroke="#34BE86" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Requirement Icons ── */
function IdIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="4" width="16" height="10" rx="2" stroke="#34BE86" strokeWidth="1.3"/>
      <circle cx="6" cy="9" r="2" stroke="#34BE86" strokeWidth="1.2"/>
      <path d="M10 7h5M10 9h4M10 11h3" stroke="#34BE86" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function LiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="7" r="2.5" stroke="#34BE86" strokeWidth="1.3"/>
      <path d="M3 15c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="5" stroke="#34BE86" strokeWidth="1" strokeDasharray="2 2" opacity="0.5"/>
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="5" width="12" height="9" rx="2" stroke="#34BE86" strokeWidth="1.3"/>
      <path d="M13 8l4-2v6l-4-2V8z" stroke="#34BE86" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M1 7c2.2-2.4 5.3-4 8.5-4S15.8 4.6 18 7" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      <path d="M4 10c1.4-1.5 3.2-2.5 5-2.5S12.6 8.5 14 10" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <path d="M7 13c.6-.6 1.3-1 2-1s1.4.4 2 1" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="9" cy="15.5" r="1" fill="#34BE86"/>
    </svg>
  );
}
function FileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M10 2H4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8l-6-6z" stroke="#34BE86" strokeWidth="1.3"/>
      <path d="M10 2v6h6" stroke="#34BE86" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M6 10h6M6 13h4" stroke="#34BE86" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Placeholder illustration ── */
const RequirementsPlaceholder = () => (
  <svg viewBox="0 0 280 220" fill="none" className="ns-img-float" style={{ width: "100%", maxWidth: "280px" }}>
    {/* Monitor */}
    <rect x="60" y="30" width="160" height="110" rx="8" fill="#34BE86" opacity="0.15"/>
    <rect x="68" y="38" width="144" height="94" rx="4" fill="#ffffff" stroke="#34BE86" strokeWidth="1.5"/>
    <rect x="110" y="140" width="60" height="12" rx="3" fill="#34BE86" opacity="0.2"/>
    <rect x="90" y="152" width="100" height="6" rx="3" fill="#34BE86" opacity="0.15"/>
    {/* Screen content */}
    <circle cx="140" cy="85" r="22" fill="rgba(52,190,134,0.15)" stroke="#34BE86" strokeWidth="1.5"/>
    <path d="M132 85l6 6 10-10" stroke="#34BE86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Award ribbon */}
    <circle cx="200" cy="50" r="18" fill="rgba(52,190,134,0.2)" stroke="#34BE86" strokeWidth="1.5"/>
    <path d="M193 50l4 4 8-8" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M193 68l7 12M207 68l-7 12" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round"/>
    {/* Floating docs */}
    <rect x="20" y="60" width="36" height="46" rx="4" fill="rgba(52,190,134,0.12)" stroke="#34BE86" strokeWidth="1" strokeDasharray="3 2"/>
    <path d="M26 74h24M26 80h18M26 86h20" stroke="#34BE86" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    {/* Plants */}
    <path d="M70 180 C70 180 75 160 85 155 C95 150 95 165 90 175" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
    <path d="M200 180 C200 180 205 160 215 155 C225 150 225 165 220 175" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4"/>
  </svg>
);

export default NotarizationSteps;
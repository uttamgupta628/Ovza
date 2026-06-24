import React, { useEffect, useRef, useState } from "react";

interface NotarizationInfoProps {
  infoImage?: string; // documents/stack illustration
}

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

/* ── live counter — counts up from 0 to target ── */
function useCountUp(target: number, visible: boolean, duration = 1500) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); }
      else setVal(start);
    }, 16);
    return () => clearInterval(id);
  }, [visible, target, duration]);
  return val;
}

const NotarizationInfo: React.FC<NotarizationInfoProps> = ({ infoImage }) => {
  const { ref: bannerRef, visible: bannerVisible } = useInView(0.1);
  const { ref: aboutRef,  visible: aboutVisible  } = useInView(0.1);
  const minutes = useCountUp(4, bannerVisible);

  return (
    <>
      <style>{`
        @keyframes ni-fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ni-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes ni-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,190,134,0.4); }
          50%       { box-shadow: 0 0 0 8px rgba(52,190,134,0); }
        }
        @keyframes ni-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes ni-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }

        .ni-fade  { opacity: 0; }
        .ni-fade.go  { animation: ni-fadeUp 0.65s ease forwards; }
        .ni-fi    { opacity: 0; }
        .ni-fi.go { animation: ni-fadeIn 0.8s ease forwards; }

        .ni-online-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #34BE86;
          animation: ni-pulse 2s infinite;
          flex-shrink: 0;
        }

        .ni-get-started-btn {
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .ni-get-started-btn:hover {
          background: #2aa876 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(52,190,134,0.35);
        }

        .ni-what-btn {
          transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .ni-what-btn:hover {
          background: #2aa876 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(52,190,134,0.3);
        }

        .ni-img-wrap {
          animation: ni-float 4s ease-in-out infinite;
        }

        .ni-banner-card {
          transition: box-shadow 0.3s ease;
        }
        .ni-banner-card:hover {
          box-shadow: 0 16px 48px rgba(52,190,134,0.18) !important;
        }

        .ni-instantly {
          background: linear-gradient(90deg, #34BE86, #0e8f5c, #34BE86);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: ni-shimmer 2.5s linear infinite;
        }

        @media (max-width: 720px) {
          .ni-about-grid { grid-template-columns: 1fr !important; }
          .ni-img-wrap   { display: flex; justify-content: center; }
        }
      `}</style>

      <section style={{ backgroundColor: "#ffffff", paddingTop: "48px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,100px)" }}>

          {/* ── Banner Card ── */}
          <div
            ref={bannerRef}
            className={`ni-fade ni-banner-card ${bannerVisible ? "go" : ""}`}
            style={{
              borderRadius: "20px",
              border: "1.5px solid rgba(52,190,134,0.25)",
              background: "linear-gradient(135deg, rgba(200,245,234,0.5) 0%, rgba(232,250,245,0.3) 50%, rgba(255,255,255,0.8) 100%)",
              padding: "clamp(28px,4vw,52px) clamp(24px,4vw,60px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "20px",
              position: "relative",
              overflow: "hidden",
              marginBottom: "64px",
              boxShadow: "0 4px 24px rgba(52,190,134,0.08)",
            }}
          >
            {/* Decorative blobs */}
            <div style={{ position: "absolute", top: "-30px", left: "-30px", width: "160px", height: "160px", borderRadius: "50%", backgroundColor: "rgba(52,190,134,0.07)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: "-40px", right: "-20px", width: "200px", height: "200px", borderRadius: "50%", backgroundColor: "rgba(52,190,134,0.06)", pointerEvents: "none" }}/>

            {/* Online badge */}
            <div
              className={`ni-fade ${bannerVisible ? "go" : ""}`}
              style={{
                animationDelay: "80ms",
                display: "inline-flex", alignItems: "center", gap: "8px",
                backgroundColor: "rgba(52,190,134,0.1)",
                border: "1px solid rgba(52,190,134,0.3)",
                borderRadius: "999px",
                padding: "6px 14px",
                zIndex: 1,
              }}
            >
              <div className="ni-online-dot"/>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#0a6b48", fontFamily: "'Poppins',sans-serif" }}>
                We're Online Now
              </span>
            </div>

            {/* Headline */}
            <div className={`ni-fade ${bannerVisible ? "go" : ""}`} style={{ animationDelay: "160ms", zIndex: 1 }}>
              <p style={{ fontSize: "clamp(15px,1.8vw,20px)", color: "#374151", lineHeight: 1.6, marginBottom: "4px", fontFamily: "'Poppins',sans-serif" }}>
                Currently notarizations are taking
              </p>
              <p style={{ fontSize: "clamp(18px,2.2vw,26px)", color: "#0a1f1a", lineHeight: 1.5, fontFamily: "'Poppins',sans-serif" }}>
                <strong style={{ fontWeight: 800 }}>
                  {minutes} minute{minutes !== 1 ? "s" : ""} in real time.
                </strong>{" "}
                Connect{" "}
                <span className="ni-instantly" style={{ fontWeight: 800 }}>
                  Instantly
                </span>{" "}
                to a licensed U.S.
                <br />
                notary by video call, anytime, anywhere in the world.
              </p>
            </div>

            {/* CTA button */}
            <button
              className={`ni-get-started-btn ni-fade ${bannerVisible ? "go" : ""}`}
              style={{
                animationDelay: "240ms",
                backgroundColor: "#34BE86",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "13px 28px",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "'Poppins',sans-serif",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                zIndex: 1,
              }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* ── About Section ── */}
          <div
            ref={aboutRef}
            className="ni-about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(32px,5vw,72px)",
              alignItems: "center",
            }}
          >
            {/* Left — text */}
            <div>
              <p
                className={`ni-fade ${aboutVisible ? "go" : ""}`}
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#34BE86",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  fontFamily: "'Poppins',sans-serif",
                }}
              >
                About OVZA's Notary Network
              </p>

              <h2
                className={`ni-fade ${aboutVisible ? "go" : ""}`}
                style={{
                  animationDelay: "80ms",
                  fontFamily: "'Poppins',sans-serif",
                  fontSize: "clamp(20px,2.4vw,30px)",
                  fontWeight: 800,
                  color: "#0a1f1a",
                  lineHeight: 1.25,
                  marginBottom: "20px",
                }}
              >
                Online Document Notarization Made Simple
              </h2>

              <p
                className={`ni-fade ${aboutVisible ? "go" : ""}`}
                style={{
                  animationDelay: "140ms",
                  fontSize: "14px",
                  color: "#4b5563",
                  lineHeight: 1.85,
                  marginBottom: "16px",
                }}
              >
                With OVZA, you can notarize a document online anytime, anywhere in the world.
                Our secure online notary service allows you to quickly notarize passports, proof
                of identity, KYC documents, contracts, affidavits, and more. Every notarization
                is completed by a licensed U.S. notary public through a live video call, making
                the process fast, legally certified, and globally recognized.
              </p>

              <p
                className={`ni-fade ${aboutVisible ? "go" : ""}`}
                style={{
                  animationDelay: "200ms",
                  fontSize: "14px",
                  color: "#4b5563",
                  lineHeight: 1.85,
                  marginBottom: "28px",
                }}
              >
                Once your session is finished, your notarized documents are available instantly,
                ready for download or immediate use. Whether you're an individual needing to
                notarize your ID online or a business handling compliance paperwork, OVZA makes
                document notarization straightforward, available 24/7, no matter where you are.
              </p>

              <button
                className={`ni-what-btn ni-fade ${aboutVisible ? "go" : ""}`}
                style={{
                  animationDelay: "260ms",
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
                What You'll Need to Start
              </button>
            </div>

            {/* Right — illustration */}
            <div
              className={`ni-fi ${aboutVisible ? "go" : ""}`}
              style={{ animationDelay: "200ms", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <div className="ni-img-wrap" style={{ position: "relative" }}>
                {/* Mint circle bg */}
                <div style={{
                  position: "absolute",
                  top: "50%", left: "50%",
                  transform: "translate(-50%,-50%)",
                  width: "clamp(220px,26vw,340px)",
                  height: "clamp(220px,26vw,340px)",
                  borderRadius: "50%",
                  backgroundColor: "#e8faf5",
                  zIndex: 0,
                }}/>
                {infoImage ? (
                  <img
                    src={infoImage}
                    alt="Document Notarization"
                    style={{
                      position: "relative", zIndex: 1,
                      width: "clamp(200px,24vw,320px)",
                      objectFit: "contain",
                    }}
                  />
                ) : <NotarizationPlaceholder />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ── SVG placeholder ── */
const NotarizationPlaceholder = () => (
  <svg viewBox="0 0 300 280" fill="none" style={{ position: "relative", zIndex: 1, width: "clamp(200px,24vw,320px)" }}>
    {/* Stack of documents */}
    <rect x="60" y="80" width="160" height="200" rx="8" fill="#34BE86" opacity="0.15" transform="rotate(-6 140 180)"/>
    <rect x="60" y="80" width="160" height="200" rx="8" fill="#34BE86" opacity="0.2" transform="rotate(-3 140 180)"/>
    <rect x="60" y="80" width="160" height="200" rx="8" fill="#ffffff" stroke="#34BE86" strokeWidth="1.5"/>
    {/* Lines on doc */}
    <path d="M85 120h130M85 140h130M85 160h100M85 180h110M85 200h90" stroke="#34BE86" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    {/* Seal */}
    <circle cx="210" cy="230" r="22" fill="#34BE86" opacity="0.15"/>
    <circle cx="210" cy="230" r="16" stroke="#34BE86" strokeWidth="1.5" fill="none"/>
    <path d="M203 230l5 5 10-10" stroke="#34BE86" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Paperclip */}
    <path d="M230 80 C240 70 255 75 255 88 C255 101 245 108 235 100 L215 80 C208 73 212 62 220 62 C228 62 232 68 228 75 L210 92" stroke="#34BE86" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
  </svg>
);

export default NotarizationInfo;
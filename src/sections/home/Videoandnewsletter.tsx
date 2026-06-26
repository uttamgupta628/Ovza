import React, { useEffect, useRef, useState } from "react";

// Add to your index.html <head> or import in index.css:
// @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');

interface VideoAndNewsletterProps {
  videoSrc?: string;
  newsletterImage?: string;
}

/* ── useInView ── */
function useInView(threshold = 0.15) {
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

/* ── Reduced motion ── */
const reduced = typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const VideoAndNewsletter: React.FC<VideoAndNewsletterProps> = ({
  videoSrc,
  newsletterImage,
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ref: section1Ref, visible: s1Visible } = useInView(0.1);
  const { ref: section2Ref, visible: s2Visible } = useInView(0.1);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes vn-fade-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vn-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes vn-fade-left {
          from { opacity: 0; transform: translateX(-28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes vn-fade-right {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes vn-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes vn-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes vn-ring-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(52,190,134,0.45); }
          70%  { box-shadow: 0 0 0 14px rgba(52,190,134,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,190,134,0); }
        }
        @keyframes vn-spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── Animation helpers ── */
        .vn-fade-up   { opacity: 0; }
        .vn-fade-left { opacity: 0; }
        .vn-fade-right{ opacity: 0; }
        .vn-fade-in   { opacity: 0; }

        .vn-go-up    { animation: vn-fade-up    0.65s ease forwards; }
        .vn-go-left  { animation: vn-fade-left  0.65s ease forwards; }
        .vn-go-right { animation: vn-fade-right 0.65s ease forwards; }
        .vn-go-in    { animation: vn-fade-in    0.7s  ease forwards; }

        /* ── Card hover ── */
        .vn-resource-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          cursor: pointer;
        }
        .vn-resource-card:hover {
          transform: translateY(-4px) scale(1.015);
          box-shadow: 0 10px 28px rgba(52,190,134,0.22) !important;
          background: rgba(255,255,255,0.92) !important;
        }

        /* ── Play button ── */
        .vn-play-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }
        .vn-play-btn:hover {
          transform: scale(1.12);
          animation: vn-ring-pulse 1s ease-out infinite;
        }

        /* ── Video container shimmer on hover ── */
        .vn-video-wrap {
          transition: box-shadow 0.3s ease;
        }
        .vn-video-wrap:hover {
          box-shadow: 0 8px 36px rgba(52,190,134,0.22) !important;
        }

        /* ── Subscribe button ── */
        .vn-sub-btn {
          transition: background 0.22s ease, transform 0.18s ease, box-shadow 0.22s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .vn-sub-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.16);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .vn-sub-btn:hover::after { opacity: 1; }
        .vn-sub-btn:hover {
          background: #2aa876 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(42,168,118,0.38);
        }
        .vn-sub-btn:active { transform: translateY(0); }

        /* ── Social icons ── */
        .vn-social-icon {
          transition: transform 0.2s ease, opacity 0.2s ease, filter 0.2s ease;
          cursor: pointer;
        }
        .vn-social-icon:hover {
          transform: scale(1.25) translateY(-2px);
          opacity: 0.8;
          filter: drop-shadow(0 3px 6px rgba(52,190,134,0.35));
        }

        /* ── Float for illustration ── */
        .vn-float {
          animation: vn-float 4s ease-in-out infinite;
        }

        /* ── Input focus ring ── */
        .vn-email-input:focus {
          outline: none;
          border-color: rgba(52,190,134,0.7) !important;
          box-shadow: 0 0 0 3px rgba(52,190,134,0.15);
        }

        /* ── Success badge pop-in ── */
        @keyframes vn-pop {
          0%   { transform: scale(0.8); opacity: 0; }
          70%  { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .vn-success { animation: vn-pop 0.4s ease forwards; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .vn-section1-inner { padding: 0 20px !important; }
          .vn-headline h2 { line-height: 1.35 !important; }
          .vn-video-row { flex-direction: column !important; }
          .vn-resource-col {
            width: 100% !important;
            flex-direction: row !important;
            gap: 12px !important;
          }
          .vn-resource-col > div { flex: 1 !important; }
          .vn-newsletter-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .vn-newsletter-img {
            width: 120px !important;
            align-self: center !important;
          }
        }
        @media (max-width: 480px) {
          .vn-social-row { flex-wrap: wrap !important; gap: 14px !important; }
          .vn-sub-row { flex-direction: column !important; gap: 10px !important; }
          .vn-sub-row input {
            border-radius: 999px !important;
            border-right: 1px solid rgba(52,190,134,0.35) !important;
          }
          .vn-sub-row button {
            border-radius: 999px !important;
            width: 100% !important;
            padding: 11px 0 !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════════
          SECTION 1 — Video Guide
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#9FEFE3", paddingTop: "64px", paddingBottom: "64px" }}>
        <div
          ref={section1Ref}
          className="vn-section1-inner"
          style={{ maxWidth: "1265px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}
        >
          {/* Headline */}
          <div
            className={`vn-headline vn-fade-up ${!reduced && s1Visible ? "vn-go-up" : ""}`}
            style={{ width: "100%", marginBottom: "40px" }}
          >
            <h2 style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(22px, 4vw, 52px)",
              fontWeight: 700,
              lineHeight: "67.6px",
              letterSpacing: "0%",
              color: "#0a1f1a",
              margin: 0,
            }}>
              Cut through bureaucracy with OVZA's step-by-step video guide,{" "}
              <span style={{ color: "#0a6b48" }}>
                tailored to expedite your offshore company registration and set you on a path of international growth.
              </span>
            </h2>
          </div>

          {/* Video + Resource cards row */}
          <div className="vn-video-row" style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

            {/* Video player */}
            <div
              className={`vn-video-wrap vn-fade-left ${!reduced && s1Visible ? "vn-go-left" : ""}`}
              style={{
                animationDelay: "100ms",
                flex: "1 1 0",
                minWidth: 0,
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#e8faf5",
                aspectRatio: "16/9",
                boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
              }}
            >
              {videoSrc ? (
                <>
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    controls={playing}
                    playsInline
                  />
                  {!playing && (
                    <div
                      onClick={handlePlay}
                      style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(0,0,0,0.15)",
                      }}
                    >
                      <PlayButton />
                    </div>
                  )}
                </>
              ) : (
                <div style={{
                  width: "100%", height: "100%", minHeight: "220px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg,#c8f5ea 0%,#e8faf5 100%)",
                  position: "relative",
                }}>
                  <span style={{ fontSize: "32px", fontWeight: 900, color: "#0a1f1a", letterSpacing: "-1px" }}>OVZA</span>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <PlayButton />
                  </div>
                </div>
              )}
            </div>

            {/* Resource cards column */}
            <div
              className={`vn-resource-col vn-fade-right ${!reduced && s1Visible ? "vn-go-right" : ""}`}
              style={{
                animationDelay: "220ms",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                width: "clamp(180px,22vw,240px)",
                flexShrink: 0,
              }}
            >
              {[
                { icon: <BookIcon />, label: "Read our latest booklets" },
                { icon: <GlobeIcon />, label: "Check out our country guides" },
              ].map((card, i) => (
                <div
                  key={card.label}
                  className="vn-resource-card"
                  style={{
                    animationDelay: `${280 + i * 100}ms`,
                    backgroundColor: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(52,190,134,0.25)",
                    borderRadius: "14px",
                    padding: "18px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {card.icon}
                    <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#0a1f1a" }}>{card.label}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#34BE86", fontWeight: 600, paddingLeft: "24px" }}>
                    Click Here
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — Newsletter
      ═══════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#ffffff", padding: "48px clamp(20px,5vw,118px) 64px" }}>
        <div style={{ maxWidth: "1276px", margin: "0 auto" }}>
          <div
            ref={section2Ref}
            className={`vn-fade-up ${!reduced && s2Visible ? "vn-go-up" : ""}`}
            style={{
              backgroundColor: "#c8f5ea",
              borderRadius: "20px",
              padding: "clamp(28px,4vw,48px) clamp(24px,4vw,52px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Left — text + form */}
            <div
              className={`vn-fade-left ${!reduced && s2Visible ? "vn-go-left" : ""}`}
              style={{ animationDelay: "120ms", flex: "1 1 0", minWidth: 0, maxWidth: "480px", zIndex: 1 }}
            >
              <h3 style={{ fontSize: "clamp(17px,2vw,24px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "10px", lineHeight: 1.3 }}>
                Subscribe to the OVZA Newsletter
              </h3>
              <p style={{ fontSize: "13px", color: "#2d5a47", lineHeight: 1.65, marginBottom: "22px" }}>
                Join the OVZA newsletter for exclusive offshore insights, expert guidance, and global growth tools. Your information is kept secure, and we only send relevant, valuable content.
              </p>

              {/* Email input row */}
              {!submitted ? (
                <div className="vn-sub-row" style={{ display: "flex", gap: "0", marginBottom: "16px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    placeholder="Your email address"
                    className="vn-email-input"
                    style={{
                      flex: 1,
                      padding: "11px 16px",
                      fontSize: "13px",
                      border: "1px solid rgba(52,190,134,0.35)",
                      borderRight: "none",
                      borderRadius: "999px 0 0 999px",
                      outline: "none",
                      backgroundColor: "rgba(255,255,255,0.85)",
                      color: "#0a1f1a",
                      transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  />
                  <button
                    className="vn-sub-btn"
                    onClick={handleSubscribe}
                    style={{
                      backgroundColor: "#34BE86",
                      color: "#fff",
                      border: "none",
                      borderRadius: "0 999px 999px 0",
                      padding: "11px 22px",
                      fontSize: "13px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Subscribe Now
                  </button>
                </div>
              ) : (
                <div
                  className="vn-success"
                  style={{
                    padding: "12px 20px",
                    borderRadius: "999px",
                    backgroundColor: "rgba(52,190,134,0.15)",
                    color: "#0a7a54",
                    fontSize: "13px",
                    fontWeight: 600,
                    marginBottom: "16px",
                    display: "inline-block",
                  }}
                >
                  ✓ Thanks for subscribing!
                </div>
              )}

              {/* Social links */}
              <div>
                <p style={{ fontSize: "12px", color: "#4b5563", marginBottom: "10px" }}>
                  Follow us to get more updates!
                </p>
                <div className="vn-social-row" style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  {[
                    { label: "Facebook", icon: <FbIcon /> },
                    { label: "X", icon: <XIcon /> },
                    { label: "LinkedIn", icon: <LiIcon /> },
                    { label: "YouTube", icon: <YtIcon /> },
                    { label: "Instagram", icon: <IgIcon /> },
                    { label: "TikTok", icon: <TkIcon /> },
                  ].map((s, i) => (
                    <button
                      key={s.label}
                      className="vn-social-icon"
                      title={s.label}
                      style={{
                        background: "none", border: "none", padding: 0,
                        width: "28px", height: "28px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        animationDelay: `${i * 60}ms`,
                      }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — illustration */}
            <div
              className={`vn-newsletter-img vn-fade-right ${!reduced && s2Visible ? "vn-go-right" : ""}`}
              style={{ animationDelay: "200ms", flexShrink: 0, width: "clamp(120px,18vw,220px)" }}
            >
              <div className={!reduced ? "vn-float" : ""}>
                {newsletterImage ? (
                  <img src={newsletterImage} alt="Newsletter illustration" style={{ width: "100%", objectFit: "contain" }} />
                ) : (
                  <NewsletterIllustration />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ── Small icons & SVGs ── */

const PlayButton = () => (
  <div
    className="vn-play-btn"
    style={{
      width: "56px", height: "56px", borderRadius: "50%",
      backgroundColor: "rgba(255,255,255,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    }}
  >
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M6 4l12 6-12 6V4z" fill="#34BE86" />
    </svg>
  </div>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <rect x="2" y="2" width="14" height="14" rx="2" stroke="#34BE86" strokeWidth="1.4"/>
    <path d="M5 6h8M5 9h8M5 12h5" stroke="#34BE86" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="7" stroke="#34BE86" strokeWidth="1.4"/>
    <path d="M9 2c-2 2-2 10 0 14M9 2c2 2 2 10 0 14M2 9h14" stroke="#34BE86" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="#0a1f1a">
    <path d="M15 2H3a1 1 0 00-1 1v12a1 1 0 001 1h6.5v-5.5H8V8h1.5V6.5C9.5 5 10.5 4 12 4h1.5v2H12c-.6 0-.5.2-.5.5V8H13.5l-.5 2.5h-1.5V16H15a1 1 0 001-1V3a1 1 0 00-1-1z"/>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="#0a1f1a">
    <path d="M2 2l5.6 6.3L2 16h1.8l4-4.5 3.2 4.5H15l-5.9-8.3L14.8 2H13l-3.6 4L6.4 2H2z"/>
  </svg>
);

const LiIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="#0a1f1a">
    <rect x="2" y="2" width="14" height="14" rx="2"/>
    <path d="M5 7.5v5M5 5.5a.5.5 0 110-1 .5.5 0 010 1zM8 12.5v-3c0-1 .5-2 2-2s2 1 2 2v3" stroke="#c8f5ea" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
  </svg>
);

const YtIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="#0a1f1a">
    <rect x="1" y="4" width="16" height="10" rx="3"/>
    <path d="M7.5 6.5l4.5 2.5-4.5 2.5v-5z" fill="#c8f5ea"/>
  </svg>
);

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="2" width="14" height="14" rx="4" stroke="#0a1f1a" strokeWidth="1.5"/>
    <circle cx="9" cy="9" r="3" stroke="#0a1f1a" strokeWidth="1.5"/>
    <circle cx="13" cy="5" r="1" fill="#0a1f1a"/>
  </svg>
);

const TkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="#0a1f1a">
    <path d="M12.5 2a4 4 0 01-4 3.5V10a2.5 2.5 0 11-2.5-2.5h.5V5h-.5A5 5 0 1012.5 10V6.3A7.5 7.5 0 0016 7V4.5a4 4 0 01-3.5-2.5z"/>
  </svg>
);

const NewsletterIllustration = () => (
  <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="60" y="30" width="60" height="110" rx="10" fill="#34BE86" opacity="0.3"/>
    <rect x="65" y="42" width="50" height="80" rx="4" fill="white" opacity="0.7"/>
    <circle cx="90" cy="132" r="4" fill="#34BE86" opacity="0.5"/>
    <rect x="110" y="55" width="65" height="48" rx="6" fill="#34BE86" opacity="0.5"/>
    <path d="M110 61l32.5 22L175 61" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M130 30l20-8v28l-20-8v-12z" fill="#0a7a54" opacity="0.4"/>
    <rect x="122" y="33" width="8" height="18" rx="2" fill="#34BE86" opacity="0.5"/>
    <path d="M150 25l4-3M150 46l4 3M152 36h5" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="40" cy="60" r="4" fill="#34BE86" opacity="0.3"/>
    <circle cx="170" cy="130" r="3" fill="#0a7a54" opacity="0.3"/>
    <path d="M30 100l4-4M34 100l-4-4" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default VideoAndNewsletter;
import React, { useState, useEffect, useRef } from "react";

const NewsletterSubscribe: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planeFlying, setPlaneFlying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubscribe = async () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) { setError(true); return; }
    setError(false);
    setLoading(true);
    setPlaneFlying(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubscribed(true);
  };

  return (
    <>
      <style>{`
        @keyframes ns-fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ns-fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ns-planeBob {
          0%, 100% { transform: translateY(0) rotate(-35deg); }
          50%       { transform: translateY(-7px) rotate(-35deg); }
        }
        @keyframes ns-planeFly {
          0%   { transform: translate(0, 0) rotate(-35deg); opacity: 1; }
          100% { transform: translate(120px, -120px) rotate(-35deg); opacity: 0; }
        }
        @keyframes ns-checkPop {
          0%   { transform: scale(0); opacity: 0; }
          65%  { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes ns-fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ns-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-5px); }
          40%     { transform: translateX(5px); }
          60%     { transform: translateX(-3px); }
          80%     { transform: translateX(3px); }
        }
        @keyframes ns-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes ns-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(42,168,118,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(42,168,118,0); }
        }

        .ns-visible .ns-left  { animation: ns-fadeLeft  0.65s cubic-bezier(.22,.68,0,1.1) both; }
        .ns-visible .ns-plane { animation: ns-fadeRight 0.7s cubic-bezier(.22,.68,0,1.1) 0.1s both; }
        .ns-visible .ns-right { animation: ns-fadeRight 0.7s cubic-bezier(.22,.68,0,1.1) 0.15s both; }

        .ns-plane-idle { animation: ns-planeBob 3s ease-in-out infinite; }
        .ns-plane-fly  { animation: ns-planeFly 0.7s ease forwards; }

        .ns-input {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #e0e8e4;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #0b2418;
          background: #fff;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          margin-bottom: 10px;
        }
        .ns-input:focus {
          border-color: #2aA876;
          box-shadow: 0 0 0 3px rgba(42,168,118,0.13);
        }
        .ns-input.error {
          border-color: #e05555;
          box-shadow: 0 0 0 3px rgba(224,85,85,0.1);
          animation: ns-shake 0.35s ease;
        }

        .ns-btn {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 13px 0;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          letter-spacing: 0.3px;
          background: linear-gradient(
            90deg,
            #2aA876 0%, #4DD9AC 50%, #2aA876 100%
          );
          background-size: 200% 100%;
          color: #fff;
          transition: background-position 0.4s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ns-btn:hover:not(:disabled) {
          background-position: 100% 0;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(42,168,118,0.35);
          animation: ns-pulse 1.2s ease infinite;
        }
        .ns-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .ns-spinner {
          display: inline-block;
          width: 15px; height: 15px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ns-spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 6px;
        }
        @keyframes ns-spin { to { transform: rotate(360deg); } }

        .ns-divider {
          position: absolute;
          left: 0; right: 0;
          top: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #2aA876, #4DD9AC, #2aA876, transparent);
          border-radius: 999px;
        }

        @media (max-width: 680px) {
          .ns-grid { flex-direction: column !important; gap: 28px !important; }
          .ns-left  { max-width: 100% !important; text-align: center !important; }
          .ns-plane { display: none !important; }
          .ns-right { max-width: 100% !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ns-plane-idle { animation: none !important; }
          .ns-btn:hover  { animation: none !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={visible ? "ns-visible" : ""}
        style={{
          background: "#fff",
          borderTop: "1px solid #eef4f1",
          padding: "clamp(40px,6vw,72px) clamp(20px,6vw,100px)",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top gradient accent bar */}
        <div className="ns-divider" />

        {/* Soft bg tint */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 50% 110%, rgba(77,217,172,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}/>

        <div
          className="ns-grid"
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "clamp(24px,5vw,72px)",
          }}
        >
          {/* ── LEFT ── */}
          <div className="ns-left" style={{ flex: "1 1 300px", maxWidth: "360px" }}>
            <h2 style={{
              fontSize: "clamp(20px,2.4vw,28px)",
              fontWeight: 800,
              color: "#0b2418",
              lineHeight: 1.2,
              margin: "0 0 12px",
              letterSpacing: "-0.3px",
            }}>
              Stay Updated: Subscribe Now!
            </h2>
            <p style={{
              fontSize: "13px",
              color: "#4a6659",
              lineHeight: 1.8,
              margin: 0,
            }}>
              Join the OVZA newsletter for premier offshore insights, expert guidance,
              and the latest tools for international growth.
            </p>

            {/* Feature pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "20px" }}>
              {["Weekly insights", "No spam", "Unsubscribe anytime"].map((t) => (
                <span key={t} style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1a6647",
                  background: "rgba(42,168,118,0.1)",
                  borderRadius: "999px",
                  padding: "4px 10px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}>
                  <span style={{ fontSize: "9px" }}>✦</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── PLANE ── */}
          <div className="ns-plane" style={{ flexShrink: 0 }}>
            <div className={planeFlying ? "ns-plane-fly" : "ns-plane-idle"}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path
                  d="M6 28L50 8L34 50L26 34L6 28Z"
                  stroke="#2aA876"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                  fill="rgba(77,217,172,0.14)"
                />
                <path
                  d="M26 34L50 8"
                  stroke="#2aA876"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* speed lines */}
                <path d="M2 22l6 2" stroke="#4DD9AC" strokeWidth="1.4" strokeLinecap="round" opacity="0.5"/>
                <path d="M1 28l4 1" stroke="#4DD9AC" strokeWidth="1.4" strokeLinecap="round" opacity="0.35"/>
                <path d="M3 34l5-1" stroke="#4DD9AC" strokeWidth="1.4" strokeLinecap="round" opacity="0.3"/>
              </svg>
            </div>
          </div>

          {/* ── RIGHT — form ── */}
          <div className="ns-right" style={{ flex: "1 1 260px", maxWidth: "320px" }}>
            {subscribed ? (
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "12px", padding: "8px 0",
                animation: "ns-fadeIn 0.45s ease both",
                textAlign: "center",
              }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#4DD9AC,#2aA876)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "ns-checkPop 0.5s cubic-bezier(.22,.68,0,1.2) both",
                  boxShadow: "0 8px 28px rgba(42,168,118,0.3)",
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l5 5L20 7" stroke="#fff" strokeWidth="2.3"
                      strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{
                  fontSize: "15px", fontWeight: 700,
                  color: "#0b2418", margin: 0,
                }}>
                  You're subscribed! 🎉
                </p>
                <p style={{
                  fontSize: "12px", color: "#4a6659",
                  lineHeight: 1.7, margin: 0,
                }}>
                  Welcome to the OVZA community. Offshore insights are on their way.
                </p>
              </div>
            ) : (
              <>
                <input
                  className={`ns-input${error ? " error" : ""}`}
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                />
                {error && (
                  <p style={{
                    fontSize: "11.5px", color: "#e05555",
                    margin: "-4px 0 8px",
                    fontFamily: "'Poppins',sans-serif",
                  }}>
                    Please enter a valid email address.
                  </p>
                )}
                <button
                  className="ns-btn"
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  {loading ? (
                    <><span className="ns-spinner" />Subscribing...</>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterSubscribe;
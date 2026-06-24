import React, { useEffect, useRef, useState } from "react";

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

interface Props {
  newsletterImage?: string;
}

const testimonials = [
  {
    text: "Working with them was for support with international tax planning. Couldn't ask for more.",
    name: "Lukas W.",
    rating: 5,
    rotation: "-3.5deg",
  },
  {
    text: "The team provided OVZA for extra advice on corporate structure. Would definitely recommend.",
    name: "Lukas F.",
    rating: 4,
    rotation: "0deg",
  },
  {
    text: "Happy with OVZA for clear guidance at every stage. I trust them fully.",
    name: "Tim D.",
    rating: 5,
    rotation: "3.5deg",
  },
];

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625L4.5 7.07 2 4.635l3.455-.505L7 1z"
          fill={i <= count ? "#34BE86" : "#d1d5db"}/>
      </svg>
    ))}
  </div>
);

const AboutTestimonialsNewsletter: React.FC<Props> = ({ newsletterImage }) => {
  const { ref: tRef, visible: tVisible } = useInView(0.1);
  const { ref: nRef, visible: nVisible } = useInView(0.1);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <style>{`
        @keyframes atn-fadeUp { from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);} }
        @keyframes atn-fadeIn { from{opacity:0;}to{opacity:1;} }
        .atn-fade{opacity:0;} .atn-fade.go{animation:atn-fadeUp 0.6s ease forwards;}
        .atn-fi{opacity:0;} .atn-fi.go{animation:atn-fadeIn 0.7s ease forwards;}
        .atn-tcard { transition: box-shadow 0.25s ease; }
        .atn-tcard:hover { box-shadow: 0 14px 36px rgba(52,190,134,0.22) !important; }
        .atn-sub { transition: background 0.2s ease; cursor: pointer; }
        .atn-sub:hover { background: #2aa876 !important; }
        .atn-social { transition: transform 0.2s ease, opacity 0.2s ease; cursor: pointer; }
        .atn-social:hover { transform: scale(1.15); opacity: 0.8; }
      `}</style>

      {/* ── Testimonials ── */}
      <section style={{ backgroundColor: "#ffffff", paddingTop: "60px", paddingBottom: "60px" }}>
        <div ref={tRef} style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>

          {/* Proven Expert badge */}
          <div className={`atn-fade ${tVisible ? "go" : ""}`} style={{ display: "flex", justifyContent: "center", marginBottom: "48px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "8px 20px", borderRadius: "999px",
              backgroundColor: "#fff", border: "1px solid #e5e7eb",
              boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            }}>
              <span style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500 }}>As seen on</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="#f59e0b"/>
                <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                <span style={{ fontSize: "18px", fontWeight: 900, color: "#0a1f1a", letterSpacing: "-0.3px" }}>Proven</span>
                <span style={{ fontSize: "18px", fontWeight: 400, color: "#0a1f1a" }}>Expert</span>
              </div>
              <span style={{ fontSize: "9px", color: "#9ca3af", lineHeight: 1.2 }}>It's All About Trust</span>
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", alignItems: "center" }} className="atn-row">
            {testimonials.map((t, idx) => (
              <div
                key={t.name}
                className={`atn-tcard atn-fade ${tVisible ? "go" : ""}`}
                style={{
                  "--rot": t.rotation,
                  animationDelay: `${idx * 120 + 100}ms`,
                  transform: `rotate(${t.rotation})`,
                  flex: "0 0 300px",
                  minHeight: "200px",
                  borderRadius: "16px",
                  padding: "28px",
                  display: "flex", flexDirection: "column",
                  justifyContent: "space-between", gap: "16px",
                  background: "linear-gradient(145deg, rgba(156,237,222,0.5) 0%, rgba(200,245,234,0.25) 60%, rgba(255,255,255,0.4) 100%)",
                  border: "1px solid rgba(52,190,134,0.2)",
                  boxShadow: "0 4px 16px rgba(52,190,134,0.08)",
                } as React.CSSProperties}
              >
                <p style={{ fontSize: "13.5px", color: "#1a3a2e", lineHeight: 1.7, margin: 0 }}>{t.text}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <Stars count={t.rating} />
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "#0a1f1a" }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:860px){.atn-row{flex-direction:column !important;align-items:stretch !important;} .atn-row>div{flex:unset !important;width:100% !important;transform:none !important;}}`}</style>
      </section>

      {/* ── Newsletter ── */}
      <section style={{ backgroundColor: "#ffffff", paddingBottom: "80px" }}>
        <div ref={nRef} style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,118px)" }}>
          <div
            className={`atn-fi ${nVisible ? "go" : ""}`}
            style={{
              background: "linear-gradient(135deg, #2DC88A 0%, #1aa870 60%, #0e8f5c 100%)",
              borderRadius: "24px",
              padding: "clamp(32px,4vw,52px) clamp(28px,4vw,56px)",
              display: "flex", alignItems: "center",
              gap: "40px", position: "relative", overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div style={{ position: "absolute", top: "-40px", right: "260px", width: "180px", height: "180px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)" }}/>
            <div style={{ position: "absolute", bottom: "-60px", right: "160px", width: "240px", height: "240px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)" }}/>

            {/* Left */}
            <div style={{ flex: "1 1 0", minWidth: 0, zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 800, color: "#ffffff", lineHeight: 1.3, marginBottom: "16px" }}>
                Stay Connected with OVZA's<br />Insight Dispatch
              </h2>
              <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.85)", lineHeight: 1.75, marginBottom: "24px", maxWidth: "480px" }}>
                Join the OVZA newsletter and gain first-hand access to premier offshore insights, expert guidance, and the latest tools for your business's international growth. Subscribe to tap into our reservoir of knowledge and keep your operations ahead of the curve in the ever-evolving offshore business landscape.
              </p>

              {/* Email */}
              {!subscribed ? (
                <div style={{ display: "flex", gap: "0", marginBottom: "20px", maxWidth: "500px" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && email.trim() && setSubscribed(true)}
                    placeholder="Enter email address"
                    style={{
                      flex: 1, padding: "13px 18px", fontSize: "13px",
                      border: "none", borderRadius: "999px 0 0 999px",
                      outline: "none", backgroundColor: "rgba(255,255,255,0.95)", color: "#0a1f1a",
                    }}
                  />
                  <button
                    className="atn-sub"
                    onClick={() => email.trim() && setSubscribed(true)}
                    style={{
                      backgroundColor: "#0a1f1a", color: "#fff", border: "none",
                      borderRadius: "0 999px 999px 0", padding: "13px 24px",
                      fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap",
                    }}
                  >Subscribe Now</button>
                </div>
              ) : (
                <div style={{ marginBottom: "20px", padding: "13px 20px", borderRadius: "999px", backgroundColor: "rgba(255,255,255,0.2)", color: "white", fontSize: "13px", fontWeight: 600, display: "inline-block" }}>
                  ✓ You're subscribed! Welcome to the Insight Dispatch.
                </div>
              )}

              {/* Social */}
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "12px" }}>
                Follow OVZA on social media for more updates and insights!
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  { bg: "#1877F2", icon: <FbIcon /> },
                  { bg: "#000000", icon: <XIcon /> },
                  { bg: "#0077B5", icon: <LiIcon /> },
                  { bg: "#FF0000", icon: <YtIcon /> },
                  { bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: <IgIcon /> },
                  { bg: "#000000", icon: <TkIcon /> },
                ].map((s, i) => (
                  <button
                    key={i}
                    className="atn-social"
                    style={{
                      width: "36px", height: "36px", borderRadius: "50%",
                      background: s.bg, border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >{s.icon}</button>
                ))}
              </div>
            </div>

            {/* Right — illustration */}
            <div style={{ flexShrink: 0, width: "clamp(140px,18vw,220px)", zIndex: 1 }}>
              {newsletterImage ? (
                <img src={newsletterImage} alt="Newsletter" style={{ width: "100%", objectFit: "contain" }} />
              ) : <NewsletterIllustration />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

/* ── Social icons ── */
const FbIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M13 2H3a1 1 0 00-1 1v10a1 1 0 001 1h5.5v-4H7V8h1.5V6.5C8.5 5 9.5 4 11 4h1.5v2H11c-.5 0-.5.2-.5.5V8h2l-.5 2h-1.5V14H13a1 1 0 001-1V3a1 1 0 00-1-1z"/></svg>;
const XIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M2 2l4.8 5.4L2 14h1.6l3.5-3.9 2.8 3.9H13l-5.1-7.2L12.8 2H11.2L7.9 5.7 5.4 2H2z"/></svg>;
const LiIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M3 5h2v8H3zM4 4a1.25 1.25 0 110-2.5A1.25 1.25 0 014 4zM7 5h1.9v1.1C9.2 5.5 10 5 11 5c2 0 2 1.5 2 2.5V13H11V8c0-.7-.3-1-1-1s-1 .4-1 1v5H7V5z"/></svg>;
const YtIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M14 4.5S13.8 3 13 2.8C12.1 2 8 2 8 2S3.9 2 3 2.8C2.2 3.6 2 4.5 2 4.5S1.8 6 1.8 7.5v1.4c0 1.5.2 3 .2 3s.2 1.5 1 1.7c1 .8 4.8.8 4.8.8s4.1 0 5-.8c.8-.8 1-1.7 1-1.7s.2-1.5.2-3V7.5c0-1.5-.2-3-.2-3zM6.5 10V6l4 2-4 2z"/></svg>;
const IgIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><rect x="2" y="2" width="12" height="12" rx="3.5"/><circle cx="8" cy="8" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.3" style={{color:"rgba(0,0,0,0.4)"}}/><circle cx="11.5" cy="4.5" r="0.8" fill="rgba(0,0,0,0.4)"/></svg>;
const TkIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="white"><path d="M11 2a3.5 3.5 0 01-3.5 3V8.5A2.5 2.5 0 115 6v1.5h.5A1 1 0 017 8.5V5.5A5 5 0 0011 5.8V2z"/></svg>;

const NewsletterIllustration = () => (
  <svg viewBox="0 0 200 200" fill="none" style={{ width: "100%" }}>
    <circle cx="100" cy="120" r="70" fill="rgba(255,255,255,0.1)"/>
    <rect x="55" y="70" width="90" height="70" rx="8" fill="rgba(255,255,255,0.25)"/>
    <path d="M55 78l45 32 45-32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    <rect x="72" y="50" width="30" height="40" rx="4" fill="rgba(255,255,255,0.3)" transform="rotate(-10 72 50)"/>
    <path d="M78 62h18M78 70h14" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="145" cy="60" r="18" fill="rgba(255,255,255,0.15)"/>
    <path d="M138 60l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default AboutTestimonialsNewsletter;
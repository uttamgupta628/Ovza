import React, { useState, useRef, useEffect } from "react";

const FAQS = [
  {
    q: "Is online notarization legal and accepted worldwide?",
    a: "Yes. All notarizations are performed by licensed U.S. notary publics. Your document comes with a certified digital seal and certificate, which are accepted for KYC, banking, business, and legal purposes worldwide.",
  },
  {
    q: "How fast is the process?",
    a: "Most notarizations are completed in under 5 minutes. Once your session ends, you can instantly download your certified document — no waiting, no delays.",
  },
  {
    q: "What documents can I notarize online?",
    a: "You can notarize a wide range of documents including affidavits, powers of attorney, corporate resolutions, KYC documents, loan agreements, real estate forms, and more.",
  },
  {
    q: "What do I need to get started?",
    a: "You need a government-issued photo ID, the document you want notarized (PDF), and a device with a camera and microphone for the live video session.",
  },
  {
    q: "Can I use this for banking or offshore compliance?",
    a: "Absolutely. Our notarized documents are widely accepted by offshore banks, EMIs, and compliance teams. OVZA clients benefit from pre-held KYC, making the process even faster.",
  },
  {
    q: "Do I need to book an appointment?",
    a: "No appointment is necessary. Our notary service is available 24/7 — simply log in, upload your document, and connect with a notary instantly.",
  },
  {
    q: "How do I know my information is secure?",
    a: "All sessions and documents are protected with bank-level AES-256 encryption. We are fully compliant with data protection regulations and never share your information with third parties.",
  },
];

/* Animated accordion item */
const FAQItem: React.FC<{ item: typeof FAQS[0]; index: number; visible: boolean }> = ({
  item, index, visible,
}) => {
  const [open, setOpen] = useState(index === 0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(index === 0 ? "auto" : "0px");

  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(open ? `${bodyRef.current.scrollHeight}px` : "0px");
  }, [open]);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${0.05 + index * 0.06}s, transform 0.5s ease ${0.05 + index * 0.06}s`,
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "none",
          border: "none",
          padding: "18px 0",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <span
          style={{
            fontSize: "13.5px",
            fontWeight: open ? 600 : 500,
            color: open ? "#0b2418" : "#2e4a3c",
            lineHeight: 1.4,
            transition: "color 0.2s ease, font-weight 0.2s ease",
          }}
        >
          {item.q}
        </span>

        {/* Chevron */}
        <span
          style={{
            flexShrink: 0,
            width: "26px", height: "26px",
            borderRadius: "50%",
            background: open ? "#2aA876" : "rgba(42,168,118,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.25s ease, transform 0.3s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke={open ? "#fff" : "#2aA876"} strokeWidth="1.7"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* Collapsible body */}
      <div
        style={{
          overflow: "hidden",
          height,
          transition: "height 0.36s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div ref={bodyRef} style={{ paddingBottom: "18px" }}>
          <p style={{
            fontSize: "13px", color: "#4a6659", lineHeight: 1.8, margin: 0,
          }}>
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Main component ── */
const FAQAndSubscribe: React.FC = () => {
  const [faqVisible, setFaqVisible] = useState(false);
  const [subVisible, setSubVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFaqVisible(true); }, { threshold: 0.1 });
    if (faqRef.current) obs.observe(faqRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSubVisible(true); }, { threshold: 0.15 });
    if (subRef.current) obs.observe(subRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSubscribe = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) { setEmailError(true); return; }
    setEmailError(false);
    setSubscribed(true);
  };

  return (
    <>
      <style>{`
        @keyframes fqs-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fqs-fadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes fqs-checkPop {
          0%   { transform: scale(0); opacity: 0; }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fqs-fly {
          0%   { transform: translate(0,0) rotate(-45deg); opacity: 1; }
          100% { transform: translate(24px,-24px) rotate(-45deg); opacity: 0; }
        }
        @keyframes fqs-blobFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-12px) scale(1.04); }
        }

        .fqs-sub-btn {
          width: 100%;
          background: linear-gradient(90deg, #2aA876 0%, #34BE86 100%);
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 13px 0;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          letter-spacing: 0.3px;
        }
        .fqs-sub-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(42,168,118,0.35);
        }

        .fqs-email-input {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #dde8e3;
          border-radius: 8px;
          padding: 12px 14px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #0b2418;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          background: #fff;
          margin-bottom: 10px;
        }
        .fqs-email-input:focus {
          border-color: #2aA876;
          box-shadow: 0 0 0 3px rgba(42,168,118,0.12);
        }
        .fqs-email-input.error {
          border-color: #e05555;
          box-shadow: 0 0 0 3px rgba(224,85,85,0.1);
        }

        .fqs-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: fqs-blobFloat 6s ease-in-out infinite;
        }

        @media (max-width: 680px) {
          .fqs-sub-inner { flex-direction: column !important; gap: 32px !important; }
          .fqs-sub-left, .fqs-sub-right { max-width: 100% !important; }
          .fqs-plane { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fqs-blob { animation: none !important; }
        }
      `}</style>

      {/* ══════════ FAQ ══════════ */}
      <section
        ref={faqRef}
        style={{
          background: "linear-gradient(150deg, #4DD9AC 0%, #34BE86 55%, #2aA876 100%)",
          padding: "72px clamp(20px,6vw,100px) 80px",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* background blobs */}
        <div className="fqs-blob" style={{ top:"-60px", right:"80px", width:"220px", height:"220px", background:"rgba(255,255,255,0.1)", animationDelay:"0s" }}/>
        <div className="fqs-blob" style={{ bottom:"-40px", left:"40px", width:"140px", height:"140px", background:"rgba(255,255,255,0.08)", animationDelay:"2s" }}/>
        <div className="fqs-blob" style={{ top:"40%", right:"-30px", width:"90px", height:"90px", background:"rgba(255,255,255,0.06)", animationDelay:"1s" }}/>

        {/* Heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(22px,3vw,36px)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 40px",
            opacity: faqVisible ? 1 : 0,
            transform: faqVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          Frequently Asked Questions
        </h2>

        {/* Accordion card */}
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "20px",
            padding: "8px 32px 8px",
            boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
            position: "relative",
            zIndex: 1,
            opacity: faqVisible ? 1 : 0,
            transform: faqVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
          }}
        >
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} item={item} index={i} visible={faqVisible} />
          ))}
        </div>
      </section>

      {/* ══════════ Subscribe ══════════ */}
      <section
        ref={subRef}
        style={{
          background: "#fff",
          padding: "64px clamp(20px,6vw,100px) 72px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          className="fqs-sub-inner"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "clamp(32px,6vw,80px)",
            opacity: subVisible ? 1 : 0,
            transform: subVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* Left */}
          <div className="fqs-sub-left" style={{ flex: "1 1 300px", maxWidth: "360px" }}>
            <h2 style={{
              fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800,
              color: "#0b2418", margin: "0 0 12px", lineHeight: 1.25,
            }}>
              Stay Updated: Subscribe Now!
            </h2>
            <p style={{ fontSize: "13px", color: "#4a6659", lineHeight: 1.8, margin: 0 }}>
              Join the OVZA newsletter for premier offshore insights, expert guidance,
              and the latest tools for international growth.
            </p>
          </div>

          {/* Paper plane */}
          <div
            className="fqs-plane"
            style={{
              flexShrink: 0,
              opacity: subVisible ? 1 : 0,
              transition: "opacity 0.7s ease 0.2s",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <path
                d="M6 26L46 6L30 46L22 30L6 26Z"
                stroke="#2aA876" strokeWidth="2" strokeLinejoin="round"
                fill="rgba(77,217,172,0.12)"
              />
              <path d="M22 30L46 6" stroke="#2aA876" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Right — form */}
          <div className="fqs-sub-right" style={{ flex: "1 1 280px", maxWidth: "340px" }}>
            {subscribed ? (
              <div
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  gap: "12px", padding: "20px",
                  animation: "fqs-fadeIn 0.4s ease both",
                }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#4DD9AC,#2aA876)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "fqs-checkPop 0.45s cubic-bezier(.22,.68,0,1.2) both",
                }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11l5 5 9-9" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#0b2418", margin: 0, textAlign: "center" }}>
                  You're subscribed!
                </p>
                <p style={{ fontSize: "12px", color: "#4a6659", margin: 0, textAlign: "center" }}>
                  Welcome aboard. Expect offshore insights straight to your inbox.
                </p>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className={`fqs-email-input${emailError ? " error" : ""}`}
                />
                {emailError && (
                  <p style={{ fontSize: "11.5px", color: "#e05555", margin: "-4px 0 8px", fontFamily: "'Poppins',sans-serif" }}>
                    Please enter a valid email address.
                  </p>
                )}
                <button className="fqs-sub-btn" onClick={handleSubscribe}>
                  Subscribe
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQAndSubscribe;
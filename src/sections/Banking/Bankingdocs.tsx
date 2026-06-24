import React, { useState, useEffect, useRef } from "react";
import docsIllustration from "../../assets/banking5.png";

/* ── useInView hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Doc items ── */
const docs = [
  {
    icon: "📄",
    label: "Company Incorporation Documents:",
    desc: "Already prepared and held by OVZA, including Certificate of Incorporation, Memorandum & Articles, and Registrar extracts.",
  },
  {
    icon: "📋",
    label: "KYC Form:",
    desc: "Standard form for recording beneficial owner details (often pre-completed from your incorporation file).",
  },
  {
    icon: "🏛️",
    label: "UBO's Tax Card or ID:",
    desc: "A copy of the ultimate beneficial owner's tax card or government-issued ID for fiscal reference.",
  },
  {
    icon: "🏦",
    label: "Bank Statements:",
    desc: "Recent personal or corporate statements, showing financial history.",
  },
  {
    icon: "✉️",
    label: "Professional Reference Letter:",
    desc: "From a banker, attorney, or accountant vouching for your reputation and reliability.",
  },
  {
    icon: "👥",
    label: "CV of Shareholders/Directors:",
    desc: "Profiles outlining the experience and qualifications of key persons.",
  },
  {
    icon: "📁",
    label: "Evidence of Trading Activities:",
    desc: "Such as contracts, invoices, or agreements showing operational activity.",
  },
  {
    icon: "📊",
    label: "Business Plan:",
    desc: "Outlining your business model, demonstrating viability and growth potential.",
  },
  {
    icon: "🤝",
    label: "Affiliations:",
    desc: "Details about significant clients, suppliers, or partners that establish your company's standing.",
  },
];

/* ── Paper plane SVG ── */
const PaperPlane = () => (
  <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
    <path d="M6 24L42 6L30 42L22 28L6 24Z" stroke="#0a1f1a" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
    <path d="M22 28L30 20" stroke="#0a1f1a" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const BankingDocs: React.FC = () => {
  const [email, setEmail] = useState("");
  const { ref: subRef, visible: subVisible } = useInView(0.1);
  const { ref: docsRef, visible: docsVisible } = useInView(0.05);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#fff" }}>
      <style>{`
        @keyframes bd-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bd-fade { opacity: 0; }
        .bd-fade.go { animation: bd-fadeUp 0.55s ease forwards; }

        .bd-email-input {
          width: 100%;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          padding: 11px 16px;
          font-size: 13px;
          font-family: Poppins, sans-serif;
          color: #111827;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .bd-email-input:focus { border-color: #34BE86; }
        .bd-email-input::placeholder { color: #9ca3af; }

        .bd-sub-btn {
          width: 100%;
          background-color: #34BE86;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 600;
          font-family: Poppins, sans-serif;
          cursor: pointer;
          transition: background 0.2s;
        }
        .bd-sub-btn:hover { background-color: #2aa876; }

        .bd-doc-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          padding: 10px 0;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.15s;
        }
        .bd-doc-item:last-child { border-bottom: none; }

        @media (max-width: 760px) {
          .bd-sub-grid { grid-template-columns: 1fr !important; }
          .bd-docs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════════
          SUBSCRIBE BANNER
      ══════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "44px 0 52px", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: "1262px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
          <div
            ref={subRef}
            className={`bd-fade ${subVisible ? "go" : ""} bd-sub-grid`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div>
              <h2 style={{ fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "10px", lineHeight: 1.25 }}>
                Stay Updated: Subscribe Now!
              </h2>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.7, margin: 0, maxWidth: "360px" }}>
                Join the OVZA newsletter for premier offshore insights, expert guidance, and the latest tools for international growth.
              </p>
            </div>

            {/* Center icon */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PaperPlane />
            </div>

            {/* Right form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                className="bd-email-input"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="bd-sub-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          DOCS SECTION
      ══════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "72px 0 80px" }}>
        <div style={{ maxWidth: "1262px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

          {/* Header */}
          <div
            ref={docsRef}
            className={`bd-fade ${docsVisible ? "go" : ""}`}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <h2 style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "16px", lineHeight: 1.25 }}>
              Necessary Documents to Open an<br />Offshore Bank Account
            </h2>
            <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
              Since OVZA has already registered your offshore company, we usually hold most of the required documentation on file. This means you won't need to resubmit your company documents — greatly simplifying the process. However, to give you context, here are the typical documents that banks request as part of their due diligence:
            </p>
          </div>

          {/* Two-column: list + image */}
          <div
            className={`bd-fade ${docsVisible ? "go" : ""} bd-docs-grid`}
            style={{
              animationDelay: "120ms",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(32px,5vw,80px)",
              alignItems: "start",
            }}
          >
            {/* Left — doc list */}
            <div>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0a1f1a", marginBottom: "16px" }}>
                Necessary Documentation:
              </p>
              <div>
                {docs.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bd-doc-item"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Icon box */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        backgroundColor: "#f0fdf8",
                        border: "1px solid rgba(52,190,134,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "16px",
                      }}
                    >
                      {doc.icon}
                    </div>
                    <p style={{ fontSize: "13px", color: "#374151", lineHeight: 1.65, margin: 0 }}>
                      <strong style={{ color: "#0a1f1a" }}>{doc.label}</strong>{" "}
                      {doc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — illustration */}
            <div
              style={{
                position: "sticky",
                top: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  border: "1.5px solid #e5e7eb",
                  borderRadius: "16px",
                  padding: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                  width: "100%",
                }}
              >
                <img
                  src={docsIllustration}
                  alt="Banking Documents Illustration"
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 8px 20px rgba(52,190,134,0.1))",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BankingDocs;
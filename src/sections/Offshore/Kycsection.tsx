import React, { useEffect, useRef, useState } from "react";

/* ── useInView hook ── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── KYC Data ── */
const kycData: Record<string, Record<string, {
  sections: {
    title: string;
    items: { text: string; sub?: string[]; note?: string }[];
  }[];
  footer?: string;
}>> = {
  Anguilla: {
    Individual: {
      sections: [
        {
          title: "Proof of Identity",
          items: [
            { text: "A certified true copy (scanned version) of the passport (valid for at least 6 months)" },
            { text: "A certified true copy (scanned version) of driver's license or national ID" },
            {
              text: "Bank reference letter & professional reference letter (minimum 3-year relationship)",
              note: "Must be dated within the last 6 months and include the contact details of the issuer",
            },
            { text: "A Curriculum Vitae (C.V.), resumé, or LinkedIn profile" },
          ],
        },
        {
          title: "Proof of Address",
          items: [
            {
              text: "We require certified true copy (scanned version) of address proof, which can include any of the following:",
              sub: ["Bank reference or Bank statement", "Utility bill", "Driver license"],
              note: "The address proof must clearly show the holder's full name along with physical address written in English (P.O. Box addresses are not accepted).\n\nPlease note that the provided proofs must be the most recent version and dated within the last 3 months.",
            },
          ],
        },
      ],
      footer:
        "Note that the list provided, while comprehensive, may not encompass all requirements. For further personalized consultations tailored to your specific case, please reach out to our support team anytime.",
    },
    Corporate: {
      sections: [
        {
          title: "Corporate Documents",
          items: [
            { text: "Certificate of Incorporation (certified copy)" },
            { text: "Memorandum & Articles of Association" },
            { text: "Register of Directors and Shareholders" },
            { text: "Corporate resolution authorizing the account opening" },
          ],
        },
        {
          title: "Beneficial Owner Documents",
          items: [
            { text: "Passport or national ID of all beneficial owners (25%+ ownership)" },
            {
              text: "Proof of address for all beneficial owners:",
              sub: ["Bank statement", "Utility bill", "Government-issued document"],
              note: "All documents must be dated within the last 3 months.",
            },
          ],
        },
      ],
      footer:
        "Corporate requirements may vary. Please contact our support team for jurisdiction-specific guidance.",
    },
  },
  Seychelles: {
    Individual: {
      sections: [
        {
          title: "Proof of Identity",
          items: [
            { text: "Valid passport copy (notarized)" },
            { text: "National ID or driver's license as secondary ID" },
            { text: "Signed declaration of source of funds" },
          ],
        },
        {
          title: "Proof of Address",
          items: [
            {
              text: "One of the following address documents:",
              sub: ["Bank statement (last 3 months)", "Utility bill", "Tax return document"],
              note: "Documents must be in English or officially translated.",
            },
          ],
        },
      ],
      footer: "Seychelles IBC requirements are subject to change. Contact OVZA for the latest guidance.",
    },
    Corporate: {
      sections: [
        {
          title: "Entity Documents",
          items: [
            { text: "Certificate of Good Standing" },
            { text: "Register of Members and Directors" },
            { text: "Notarized copies of incorporation documents" },
          ],
        },
        {
          title: "UBO Verification",
          items: [
            {
              text: "Ultimate Beneficial Owner (UBO) documentation:",
              sub: ["Government-issued ID", "Proof of residential address", "Source of wealth declaration"],
              note: "UBO threshold for Seychelles is 10% or more ownership.",
            },
          ],
        },
      ],
      footer: "Corporate filings in Seychelles may require apostille. Reach out to our team for details.",
    },
  },
  BVI: {
    Individual: {
      sections: [
        {
          title: "Identity Verification",
          items: [
            { text: "Certified copy of valid passport (6+ months validity)" },
            { text: "Second government-issued photo ID" },
            { text: "Professional reference letter from lawyer or accountant" },
          ],
        },
        {
          title: "Address Verification",
          items: [
            {
              text: "Recent proof of residential address:",
              sub: ["Bank statement", "Credit card statement", "Utility bill"],
              note: "Must be dated within the last 3 months and show full name and address.",
            },
          ],
        },
      ],
      footer: "BVI FSC may require additional AML documentation. Our team will guide you through the process.",
    },
    Corporate: {
      sections: [
        {
          title: "Company Documents",
          items: [
            { text: "Certificate of Incorporation" },
            { text: "Memorandum and Articles of Association" },
            { text: "Incumbent Certificate of Directors and Shareholders" },
          ],
        },
        {
          title: "Director & Shareholder KYC",
          items: [
            {
              text: "Each director and shareholder must provide:",
              sub: ["Certified passport copy", "Proof of address", "Source of funds declaration"],
              note: "All documents must be certified by a notary or lawyer.",
            },
          ],
        },
      ],
      footer: "BVI corporate KYC is strictly enforced. Contact OVZA for full compliance support.",
    },
  },
};

const jurisdictions = Object.keys(kycData);
const types = ["Individual", "Corporate"];

/* ── CheckIcon ── */
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
    <circle cx="9" cy="9" r="9" fill="#34BE86" />
    <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Paper plane SVG ── */
const PaperPlane = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M6 24L42 6L30 42L22 28L6 24Z" stroke="#0a1f1a" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    <path d="M22 28L30 20" stroke="#0a1f1a" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const KYCSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [jurisdiction, setJurisdiction] = useState("Anguilla");
  const [type, setType] = useState("Individual");

  const { ref: subRef, visible: subVisible } = useInView(0.1);
  const { ref: kycRef, visible: kycVisible } = useInView(0.05);

  const currentData = kycData[jurisdiction]?.[type];

  return (
    <div style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#fff" }}>
      <style>{`
        @keyframes kyc-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kyc-fade { opacity: 0; }
        .kyc-fade.go { animation: kyc-fadeUp 0.55s ease forwards; }

        .kyc-select {
          appearance: none;
          -webkit-appearance: none;
          background-color: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 36px 10px 14px;
          font-size: 13px;
          font-family: Poppins, sans-serif;
          color: #111827;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          transition: border-color 0.2s;
        }
        .kyc-select:focus { border-color: #34BE86; }

        .kyc-email-input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 11px 16px;
          font-size: 13px;
          font-family: Poppins, sans-serif;
          color: #111827;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .kyc-email-input:focus { border-color: #34BE86; }
        .kyc-email-input::placeholder { color: #9ca3af; }

        .kyc-sub-btn {
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
        .kyc-sub-btn:hover { background-color: #2aa876; }

        .kyc-view-btn {
          background-color: #34BE86;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 28px;
          font-size: 13px;
          font-weight: 600;
          font-family: Poppins, sans-serif;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .kyc-view-btn:hover { background-color: #2aa876; }

        .kyc-divider { height: 1px; background: #e5e7eb; margin: "20px 0"; }

        @media (max-width: 700px) {
          .sub-grid { grid-template-columns: 1fr !important; }
          .kyc-filter-row { flex-direction: column !important; }
          .kyc-filter-row select { width: 100% !important; }
        }
      `}</style>

      {/* ══════════════════════
          SUBSCRIBE BANNER
      ══════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "48px 0 56px", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: "1262px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>
          <div
            ref={subRef}
            className={`kyc-fade ${subVisible ? "go" : ""} sub-grid`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {/* Left text */}
            <div>
              <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "10px", lineHeight: 1.25 }}>
                Stay Updated: Subscribe Now!
              </h2>
              <p style={{ fontSize: "13px", color: "#4b5563", lineHeight: 1.7, margin: 0, maxWidth: "380px" }}>
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
                className="kyc-email-input"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="kyc-sub-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════
          KYC CHECKLIST
      ══════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "72px 0 80px" }}>
        <div style={{ maxWidth: "1262px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

          {/* Header */}
          <div
            ref={kycRef}
            className={`kyc-fade ${kycVisible ? "go" : ""}`}
            style={{ textAlign: "center", marginBottom: "48px" }}
          >
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#0a1f1a", marginBottom: "14px" }}>
              KYC Documents Checklist
            </h2>
            <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto" }}>
              Proper identification and verification are crucial for establishing a trustworthy business environment, especially when you register an offshore company.
            </p>
          </div>

          {/* Card */}
          <div
            className={`kyc-fade ${kycVisible ? "go" : ""}`}
            style={{
              animationDelay: "120ms",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "28px 32px 32px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
            }}
          >
            {/* Filter row */}
            <div
              className="kyc-filter-row"
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
                marginBottom: "28px",
              }}
            >
              <select
                className="kyc-select"
                value={jurisdiction}
                onChange={e => setJurisdiction(e.target.value)}
                style={{ flex: 1 }}
              >
                {jurisdictions.map(j => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>

              <select
                className="kyc-select"
                value={type}
                onChange={e => setType(e.target.value)}
                style={{ flex: 1 }}
              >
                {types.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <button className="kyc-view-btn">View Details</button>
            </div>

            {/* Checklist content */}
            {currentData ? (
              <>
                {currentData.sections.map((section, sIdx) => (
                  <div key={section.title}>
                    {sIdx > 0 && <div className="kyc-divider" style={{ margin: "24px 0" }} />}

                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0a1f1a", marginBottom: "16px" }}>
                      {section.title}
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {section.items.map((item, iIdx) => (
                        <div key={iIdx}>
                          <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                            <CheckIcon />
                            <span style={{ fontSize: "13px", color: "#111827", lineHeight: 1.65 }}>
                              {item.text}
                            </span>
                          </div>

                          {/* Sub-bullets */}
                          {item.sub && (
                            <ul style={{ margin: "8px 0 0 28px", padding: 0, listStyle: "disc", display: "flex", flexDirection: "column", gap: "4px" }}>
                              {item.sub.map((s, si) => (
                                <li key={si} style={{ fontSize: "13px", color: "#374151", lineHeight: 1.65 }}>{s}</li>
                              ))}
                            </ul>
                          )}

                          {/* Note */}
                          {item.note && item.note.split("\n\n").map((line, ni) => (
                            <p
                              key={ni}
                              style={{
                                fontSize: "12px",
                                color: "#6b7280",
                                fontStyle: "italic",
                                lineHeight: 1.65,
                                margin: "6px 0 0 28px",
                              }}
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Footer note */}
                {currentData.footer && (
                  <>
                    <div className="kyc-divider" style={{ margin: "24px 0 16px" }} />
                    <p style={{ fontSize: "11.5px", color: "#9ca3af", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                      {currentData.footer}
                    </p>
                  </>
                )}
              </>
            ) : (
              <p style={{ fontSize: "13px", color: "#6b7280", textAlign: "center", padding: "40px 0" }}>
                No data available for this combination.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KYCSection;
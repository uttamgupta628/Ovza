import React, { useState, useEffect, useRef } from "react";

const FLAG_URL = (code: string) =>
  `https://flagcdn.com/24x18/${code.toLowerCase()}.png`;

const JURISDICTIONS: { name: string; code: string }[] = [
  { name: "Anguilla",               code: "AI" },
  { name: "Belize",                 code: "BZ" },
  { name: "British Virgin Islands", code: "VG" },
  { name: "Cayman Islands",         code: "KY" },
  { name: "Cyprus",                 code: "CY" },
  { name: "Estonia",                code: "EE" },
  { name: "Gibraltar",              code: "GI" },
  { name: "Hong Kong",              code: "HK" },
  { name: "Isle of Man",            code: "IM" },
  { name: "Jersey",                 code: "JE" },
  { name: "Lithuania",              code: "LT" },
  { name: "Malta",                  code: "MT" },
  { name: "Mauritius",              code: "MU" },
  { name: "Panama",                 code: "PA" },
  { name: "Seychelles",             code: "SC" },
  { name: "Singapore",              code: "SG" },
];

const SUFFIXES = ["Limited", "LLC", "Inc.", "Corp.", "Ltd.", "LLP", "PLC", "S.A.", "GmbH"];

const SUFFIX_MAP: Record<string, string[]> = {
  AI: ["Limited", "LLC", "Ltd."],
  BZ: ["Limited", "LLC", "Inc."],
  VG: ["Limited", "LLC", "Ltd."],
  KY: ["Limited", "LLC", "Inc."],
  CY: ["Limited", "LLC", "LLP", "PLC"],
  EE: ["OÜ", "AS", "LLC"],
  GI: ["Limited", "Ltd.", "PLC"],
  HK: ["Limited", "Ltd."],
  IM: ["Limited", "LLC", "Ltd."],
  JE: ["Limited", "LLC"],
  LT: ["UAB", "AB", "LLC"],
  MT: ["Limited", "Ltd.", "PLC", "LLC"],
  MU: ["Limited", "LLC", "GBC"],
  PA: ["S.A.", "LLC", "Corp."],
  SC: ["Limited", "LLC", "Ltd."],
  SG: ["Pte. Ltd.", "Ltd.", "LLC"],
};

interface FormState {
  jurisdiction: string;
  entityName: string;
  suffix: string;
  name: string;
  email: string;
  newsletter: boolean;
}

interface FormErrors {
  entityName?: string;
  name?: string;
  email?: string;
}

const CompanyNameCheckForm: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jOpen, setJOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const jRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    jurisdiction: "AI",
    entityName: "",
    suffix: "Limited",
    name: "",
    email: "",
    newsletter: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setVisible(true);
  }, []);

  // Close jurisdiction dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (jRef.current && !jRef.current.contains(e.target as Node)) setJOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedJ = JURISDICTIONS.find((j) => j.code === form.jurisdiction)!;
  const availableSuffixes = SUFFIX_MAP[form.jurisdiction] || SUFFIXES;

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key as keyof FormErrors]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const selectJurisdiction = (code: string) => {
    const suffixes = SUFFIX_MAP[code] || SUFFIXES;
    setForm((p) => ({ ...p, jurisdiction: code, suffix: suffixes[0] }));
    setJOpen(false);
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.entityName.trim()) errs.entityName = "Entity name is required.";
    if (!form.name.trim()) errs.name = "Your name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @keyframes cnf-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cnf-slideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cnf-popIn {
          0%   { opacity:0; transform:scale(0.9) translateY(16px); }
          70%  { transform:scale(1.02); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes cnf-checkPop {
          0%   { transform:scale(0); opacity:0; }
          70%  { transform:scale(1.25); }
          100% { transform:scale(1); opacity:1; }
        }
        @keyframes cnf-spin {
          to { transform:rotate(360deg); }
        }
        @keyframes cnf-dropDown {
          from { opacity:0; transform:translateY(-8px) scaleY(0.95); }
          to   { opacity:1; transform:translateY(0) scaleY(1); }
        }
        @keyframes cnf-shake {
          0%,100% { transform:translateX(0); }
          20%     { transform:translateX(-5px); }
          40%     { transform:translateX(5px); }
          60%     { transform:translateX(-3px); }
          80%     { transform:translateX(3px); }
        }

        .cnf-visible .cnf-left  { animation: cnf-fadeUp 0.65s ease both; }
        .cnf-visible .cnf-card  { animation: cnf-slideRight 0.7s cubic-bezier(.22,.68,0,1.1) 0.1s both; }

        .cnf-input {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #d0e8dc;
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #0b2418;
          background: #fff;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cnf-input:focus {
          border-color: #2aA876;
          box-shadow: 0 0 0 3px rgba(42,168,118,0.13);
        }
        .cnf-input.error {
          border-color: #e05555;
          box-shadow: 0 0 0 3px rgba(224,85,85,0.1);
          animation: cnf-shake 0.35s ease;
        }

        .cnf-select {
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #d0e8dc;
          border-radius: 10px;
          padding: 11px 36px 11px 14px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #0b2418;
          background: #fff url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232aA876' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 14px center;
          appearance: none;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .cnf-select:focus {
          border-color: #2aA876;
          box-shadow: 0 0 0 3px rgba(42,168,118,0.13);
        }

        /* Custom jurisdiction dropdown */
        .cnf-jdrop {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          background: #fff;
          border: 1.5px solid #d0e8dc;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(42,168,118,0.15);
          z-index: 50;
          max-height: 220px;
          overflow-y: auto;
          animation: cnf-dropDown 0.2s ease both;
        }
        .cnf-jdrop::-webkit-scrollbar { width: 5px; }
        .cnf-jdrop::-webkit-scrollbar-track { background: transparent; }
        .cnf-jdrop::-webkit-scrollbar-thumb { background: #c2e8d6; border-radius: 99px; }

        .cnf-jitem {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #0b2418;
          cursor: pointer;
          transition: background 0.15s ease;
        }
        .cnf-jitem:hover { background: #f0faf6; }
        .cnf-jitem.active { background: #e0f5ec; font-weight: 600; color: #1a6647; }

        .cnf-jtrigger {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #d0e8dc;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #0b2418;
          background: #fff;
          cursor: pointer;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          text-align: left;
        }
        .cnf-jtrigger.open {
          border-color: #2aA876;
          box-shadow: 0 0 0 3px rgba(42,168,118,0.13);
        }

        .cnf-submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(90deg, #2aA876 0%, #34BE86 100%);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 13px 30px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
          min-width: 180px;
        }
        .cnf-submit-btn:hover:not(:disabled) {
          opacity: 0.9;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(42,168,118,0.35);
        }
        .cnf-submit-btn:disabled { opacity: 0.75; cursor: not-allowed; }

        .cnf-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: cnf-spin 0.7s linear infinite;
        }

        .cnf-label {
          font-size: 12px;
          font-weight: 600;
          color: #2e4a3c;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 3px;
          font-family: 'Poppins', sans-serif;
        }
        .cnf-required { color: #e05555; }
        .cnf-error-msg {
          font-size: 11.5px;
          color: #e05555;
          margin-top: 4px;
          font-family: 'Poppins', sans-serif;
        }

        .cnf-checkbox-wrap {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
        }
        .cnf-checkbox {
          width: 16px; height: 16px;
          border: 1.5px solid #2aA876;
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
          transition: background 0.2s ease;
          background: #fff;
        }
        .cnf-checkbox.checked { background: #2aA876; }

        @media (max-width: 780px) {
          .cnf-outer  { grid-template-columns: 1fr !important; }
          .cnf-left   { text-align: center; max-width: 100% !important; }
          .cnf-row2   { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={visible ? "cnf-visible" : ""}
        style={{
          background: "#fff",
          padding: "80px clamp(20px,6vw,100px) 90px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div
          className="cnf-outer"
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.3fr",
            alignItems: "center",
            gap: "clamp(32px,6vw,90px)",
          }}
        >
          {/* ── LEFT ── */}
          <div className="cnf-left" style={{ maxWidth: "380px" }}>
            <h2
              style={{
                fontSize: "clamp(24px,3.2vw,40px)",
                fontWeight: 800,
                color: "#0b2418",
                lineHeight: 1.18,
                margin: "0 0 20px",
                letterSpacing: "-0.4px",
              }}
            >
              Check Your Business Name For Free
            </h2>
            <p style={{ fontSize: "14px", color: "#4a6659", lineHeight: 1.8, margin: 0 }}>
              We've made it easy to find a unique and available company name in your
              chosen jurisdiction.
            </p>

            {/* Trust badges */}
            <div style={{
              marginTop: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              {[
                { icon: "⚡", text: "Instant results in seconds" },
                { icon: "🌍", text: "16+ offshore jurisdictions" },
                { icon: "🔒", text: "100% free — no credit card" },
              ].map((b) => (
                <div key={b.text} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontSize: "13px", color: "#2e4a3c", fontWeight: 500,
                }}>
                  <span style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    background: "rgba(77,217,172,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "15px",
                  }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Form Card ── */}
          <div
            className="cnf-card"
            style={{
              background: "linear-gradient(145deg, #f0faf6 0%, #e4f7ef 100%)",
              border: "1.5px solid rgba(42,168,118,0.15)",
              borderRadius: "22px",
              padding: "clamp(24px,4vw,40px)",
              boxShadow: "0 8px 40px rgba(42,168,118,0.1)",
            }}
          >
            {submitted ? (
              /* ── Success state ── */
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "16px", padding: "24px 0",
                animation: "cnf-popIn 0.5s ease both",
                textAlign: "center",
              }}>
                <div style={{
                  width: "68px", height: "68px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #4DD9AC, #2aA876)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: "cnf-checkPop 0.5s cubic-bezier(.22,.68,0,1.2) both",
                  boxShadow: "0 8px 28px rgba(42,168,118,0.3)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M5 14l6 6L23 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0b2418", margin: 0 }}>
                  Name Check Submitted!
                </h3>
                <p style={{ fontSize: "13px", color: "#4a6659", lineHeight: 1.75, margin: 0, maxWidth: "320px" }}>
                  We're checking <strong>{form.entityName} {form.suffix}</strong> in{" "}
                  <strong>{selectedJ.name}</strong>. We'll send the results to{" "}
                  <strong>{form.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ jurisdiction:"AI", entityName:"", suffix:"Limited", name:"", email:"", newsletter:false });
                  }}
                  style={{
                    marginTop: "8px",
                    background: "none",
                    border: "1.5px solid #2aA876",
                    borderRadius: "999px",
                    padding: "10px 24px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1a6647",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                    transition: "background 0.2s ease",
                  }}
                >
                  Check Another Name
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Jurisdiction */}
                <div>
                  <p className="cnf-label">Jurisdiction <span className="cnf-required">*</span></p>
                  <div ref={jRef} style={{ position: "relative" }}>
                    <button
                      className={`cnf-jtrigger ${jOpen ? "open" : ""}`}
                      onClick={() => setJOpen((p) => !p)}
                      type="button"
                    >
                      <img src={FLAG_URL(selectedJ.code)} alt={selectedJ.name} style={{ width:"24px", height:"18px", borderRadius:"3px", objectFit:"cover", flexShrink:0 }} />
                      <span style={{ flex: 1 }}>{selectedJ.name}</span>
                      <svg
                        width="12" height="12" viewBox="0 0 12 8" fill="none"
                        style={{ transition: "transform 0.2s ease", transform: jOpen ? "rotate(180deg)" : "rotate(0)" }}
                      >
                        <path d="M1 1l5 5 5-5" stroke="#2aA876" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {jOpen && (
                      <div className="cnf-jdrop">
                        {JURISDICTIONS.map((j) => (
                          <div
                            key={j.code}
                            className={`cnf-jitem ${j.code === form.jurisdiction ? "active" : ""}`}
                            onClick={() => selectJurisdiction(j.code)}
                          >
                            <img src={FLAG_URL(j.code)} alt={j.name} style={{ width:"24px", height:"18px", borderRadius:"3px", objectFit:"cover", flexShrink:0 }} />
                            {j.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Entity Name */}
                <div>
                  <p className="cnf-label">Entity Name <span className="cnf-required">*</span></p>
                  <input
                    className={`cnf-input${errors.entityName ? " error" : ""}`}
                    placeholder="e.g. Apex Holdings"
                    value={form.entityName}
                    onChange={(e) => setField("entityName", e.target.value)}
                  />
                  {errors.entityName && <p className="cnf-error-msg">{errors.entityName}</p>}
                </div>

                {/* Suffixes */}
                <div>
                  <p className="cnf-label">Suffixes <span className="cnf-required">*</span></p>
                  <select
                    className="cnf-select"
                    value={form.suffix}
                    onChange={(e) => setField("suffix", e.target.value)}
                  >
                    {availableSuffixes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Name + Email row */}
                <div className="cnf-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <p className="cnf-label">Name <span className="cnf-required">*</span></p>
                    <input
                      className={`cnf-input${errors.name ? " error" : ""}`}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                    />
                    {errors.name && <p className="cnf-error-msg">{errors.name}</p>}
                  </div>
                  <div>
                    <p className="cnf-label">Email <span className="cnf-required">*</span></p>
                    <input
                      className={`cnf-input${errors.email ? " error" : ""}`}
                      placeholder="you@email.com"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                    />
                    {errors.email && <p className="cnf-error-msg">{errors.email}</p>}
                  </div>
                </div>

                {/* Newsletter checkbox */}
                <div
                  className="cnf-checkbox-wrap"
                  onClick={() => setField("newsletter", !form.newsletter)}
                >
                  <div className={`cnf-checkbox ${form.newsletter ? "checked" : ""}`}>
                    {form.newsletter && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: "12.5px", color: "#4a6659", lineHeight: 1.6, userSelect: "none" }}>
                    I agree to sign up for OVZA's newsletter
                  </span>
                </div>

                {/* Submit */}
                <div style={{ paddingTop: "4px" }}>
                  <button
                    className="cnf-submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="cnf-spinner" />
                        Checking...
                      </>
                    ) : (
                      <>
                        Submit Name Check
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <path d="M3 7.5h9M8 3.5l4 4-4 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyNameCheckForm;
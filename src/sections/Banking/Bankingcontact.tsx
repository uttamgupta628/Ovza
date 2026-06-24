import React, { useState, useEffect, useRef } from "react";
import contactIllustration from "../../assets/banking-contact.png";

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

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const BankingContact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", newsletter: false });
  const [submitted, setSubmitted] = useState(false);
  const { ref, visible } = useInView(0.1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <section
      style={{
        backgroundColor: "#fff",
        padding: "80px 0 100px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        @keyframes bc-fadeLeft {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bc-fadeRight {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .bc-left  { opacity: 0; }
        .bc-right { opacity: 0; }
        .bc-left.go  { animation: bc-fadeLeft  0.65s ease forwards; }
        .bc-right.go { animation: bc-fadeRight 0.65s ease 0.15s forwards; }

        .bc-input {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 13px;
          font-family: Poppins, sans-serif;
          color: #111827;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .bc-input:focus {
          border-color: #34BE86;
          box-shadow: 0 0 0 3px rgba(52,190,134,0.12);
        }
        .bc-input::placeholder { color: #9ca3af; }

        .bc-textarea {
          width: 100%;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 13px;
          font-family: Poppins, sans-serif;
          color: #111827;
          outline: none;
          box-sizing: border-box;
          resize: vertical;
          min-height: 120px;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: #fff;
        }
        .bc-textarea:focus {
          border-color: #34BE86;
          box-shadow: 0 0 0 3px rgba(52,190,134,0.12);
        }
        .bc-textarea::placeholder { color: #9ca3af; }

        .bc-submit {
          background-color: #34BE86;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 32px;
          font-size: 13px;
          font-weight: 600;
          font-family: Poppins, sans-serif;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          margin-top: 4px;
        }
        .bc-submit:hover {
          background-color: #2aa876;
          transform: translateY(-2px);
        }

        .bc-label {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          display: block;
          font-family: Poppins, sans-serif;
        }
        .bc-label span { color: #ef4444; margin-left: 2px; }

        @media (max-width: 760px) {
          .bc-grid { grid-template-columns: 1fr !important; }
          .bc-name-email { grid-template-columns: 1fr !important; }
          .bc-left.go, .bc-right.go { animation-name: bc-fadeUp !important; }
        }
        @keyframes bc-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,60px)" }}>
        <div
          ref={ref}
          className="bc-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px,5vw,80px)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT — illustration ── */}
          <div className={`bc-left ${visible ? "go" : ""}`} style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={contactIllustration}
              alt="Open an Offshore Bank Account"
              style={{
                width: "100%",
                maxWidth: "460px",
                objectFit: "contain",
                filter: "drop-shadow(0 12px 32px rgba(52,190,134,0.12))",
              }}
            />
          </div>

          {/* ── RIGHT — form card ── */}
          <div className={`bc-right ${visible ? "go" : ""}`}>
            <div
              style={{
                backgroundColor: "#f0fdf8",
                border: "1.5px solid rgba(52,190,134,0.2)",
                borderRadius: "20px",
                padding: "clamp(24px,4vw,40px)",
              }}
            >
              {/* Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(52,190,134,0.3)",
                  borderRadius: "999px",
                  padding: "6px 14px",
                  marginBottom: "16px",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" fill="#34BE86"/>
                  <path d="M4.5 7l1.5 1.5 3-3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: "11.5px", fontWeight: 600, color: "#1a4a3a" }}>
                  Caribbean Speed, Guaranteed. We Usually Reply Within 30 Minutes.
                </span>
              </div>

              <h2
                style={{
                  fontSize: "clamp(20px,2.5vw,30px)",
                  fontWeight: 800,
                  color: "#0a1f1a",
                  lineHeight: 1.25,
                  marginBottom: "24px",
                }}
              >
                Open an Offshore Bank Account With OVZA
              </h2>

              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#34BE86", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l4 4L19 7" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#0a1f1a" }}>Message Sent!</p>
                  <p style={{ fontSize: "13px", color: "#6b7280" }}>We'll get back to you within 30 minutes.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Name + Email row */}
                  <div
                    className="bc-name-email"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
                  >
                    <div>
                      <label className="bc-label">Name <span>*</span></label>
                      <input
                        className="bc-input"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="bc-label">Email <span>*</span></label>
                      <input
                        className="bc-input"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="bc-label">Message <span>*</span></label>
                    <textarea
                      className="bc-textarea"
                      name="message"
                      placeholder="Tell us about your banking needs..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Newsletter checkbox */}
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      fontSize: "12.5px",
                      color: "#4b5563",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={form.newsletter}
                      onChange={handleChange}
                      style={{
                        width: "16px",
                        height: "16px",
                        accentColor: "#34BE86",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    />
                    I agree to sign up for OVZA's newsletter
                  </label>

                  {/* Submit */}
                  <button className="bc-submit" onClick={handleSubmit}>
                    Submit Form
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BankingContact;
import React, { useState } from "react";
import chair from "../../assets/chair.png";

const COUNTRIES = [
  "United States", "United Kingdom", "United Arab Emirates", "Singapore",
  "Hong Kong", "Germany", "France", "Netherlands", "Switzerland", "Canada",
  "Australia", "India", "China", "Japan", "Brazil", "South Africa",
  "Cayman Islands", "British Virgin Islands", "Seychelles", "Panama",
  "Belize", "Malta", "Cyprus", "Estonia", "Lithuania", "Other",
];

const FEATURES = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="14" stroke="#2aA876" strokeWidth="1.6" strokeDasharray="3 2"/>
        <path d="M18 10v8l5 3" stroke="#2aA876" strokeWidth="1.7" strokeLinecap="round"/>
        <circle cx="18" cy="18" r="3" fill="#4DD9AC" fillOpacity="0.4"/>
      </svg>
    ),
    title: "Strategic Account Operations",
    desc: "Operate and manage your offshore company's finances with accounts structured for international business efficiency and growth.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="12" width="24" height="16" rx="3" stroke="#2aA876" strokeWidth="1.6"/>
        <path d="M12 12V10a6 6 0 0112 0v2" stroke="#2aA876" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M14 20h8M18 17v6" stroke="#4DD9AC" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Gateway to Global Trade",
    desc: "Unlock opportunities in worldwide markets with dedicated offshore accounts designed for investment and trading activities.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="7" y="11" width="22" height="15" rx="3" stroke="#2aA876" strokeWidth="1.6"/>
        <path d="M11 11V9a2 2 0 014 0v2M21 11V9a2 2 0 014 0v2" stroke="#2aA876" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 19l3 3 7-7" stroke="#4DD9AC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Fuss-Free Global Payments",
    desc: "Experience seamless international transfers without the constraints of currency controls or unnecessary delays.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="11" stroke="#2aA876" strokeWidth="1.6"/>
        <path d="M18 7c0 0-6 4-6 11s6 11 6 11" stroke="#4DD9AC" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M18 7c0 0 6 4 6 11s-6 11-6 11" stroke="#4DD9AC" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 18h22" stroke="#2aA876" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: "Multicurrency Facility",
    desc: "Access multi-currency accounts that support USD, EUR, GBP, and more, giving your company true global reach.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 6l10 4v8c0 5.5-4 9.5-10 12C12 27.5 8 23.5 8 18v-8l10-4z" stroke="#2aA876" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M13 18l3 3 7-7" stroke="#4DD9AC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Asset Safety",
    desc: "Protect your funds in politically stable jurisdictions with strong financial regulations and robust safeguards.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 26l5-8 5 4 4-6 6 10" stroke="#2aA876" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="26" cy="12" r="5" stroke="#4DD9AC" strokeWidth="1.5"/>
        <path d="M24 12l1.5 1.5L28 10" stroke="#2aA876" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Bank Vetting & Trust",
    desc: "Every bank and EMI in our network is carefully vetted by OVZA for reputation, compliance standards, and client success — giving you only the highest-tier partners.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="9" y="7" width="18" height="22" rx="3" stroke="#2aA876" strokeWidth="1.6"/>
        <path d="M13 13h10M13 17h10M13 21h6" stroke="#4DD9AC" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="25" cy="25" r="5" fill="#e0f5ec" stroke="#2aA876" strokeWidth="1.4"/>
        <path d="M23 25l1.5 1.5L27 23" stroke="#2aA876" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Streamlined KYC",
    desc: "Avoid repetitive paperwork. Since OVZA already holds your notarized KYC from incorporation, most banks in our network won't ask for additional documentation.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 8c-2.5 0-5 1.5-5 4 0 2 1.5 3.5 5 5 3.5 1.5 5 3 5 5 0 2.5-2.5 4-5 4s-5-1.5-5-4" stroke="#2aA876" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M18 6v3M18 27v3" stroke="#4DD9AC" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: "Customized Financial Services",
    desc: "Enjoy tailored banking solutions that meet your offshore company's unique needs, from investment accounts to merchant services.",
  },
];

const BankingFeaturesSection: React.FC = () => {
  const [country, setCountry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (country) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @keyframes bfs-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bfs-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .bfs-country-banner { animation: bfs-fadeUp 0.6s ease both; }

        .bfs-select {
          appearance: none;
          -webkit-appearance: none;
          background: #fff url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%232aA876' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 14px center;
          border: 1.5px solid #c5e8d8;
          border-radius: 8px;
          padding: 10px 36px 10px 14px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          color: #4a6659;
          cursor: pointer;
          min-width: 200px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .bfs-select:focus { border-color: #2aA876; }

        .bfs-submit-btn {
          background: #2aA876;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 28px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .bfs-submit-btn:hover { background: #1a6647; transform: translateY(-1px); }
        .bfs-submit-btn:disabled { background: #a0d4bc; cursor: not-allowed; transform: none; }

        .bfs-get-btn {
          display: inline-block;
          background: #0f2d1f;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px 22px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .bfs-get-btn:hover { background: #1a6647; transform: translateY(-2px); }

        .bfs-feature-card {
          padding: 4px 0 0;
          transition: transform 0.2s ease;
        }
        .bfs-feature-card:hover { transform: translateY(-3px); }

        .bfs-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 12px;
          background: rgba(77,217,172,0.12);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px;
          transition: background 0.2s ease;
        }
        .bfs-feature-card:hover .bfs-icon-wrap { background: rgba(77,217,172,0.22); }

        @media (max-width: 640px) {
          .bfs-hero-grid { grid-template-columns: 1fr !important; }
          .bfs-hero-img  { display: none !important; }
          .bfs-feat-grid { grid-template-columns: 1fr 1fr !important; }
          .bfs-selector-row { flex-direction: column !important; align-items: stretch !important; }
          .bfs-select { min-width: unset !important; width: 100% !important; }
          .bfs-submit-btn { width: 100% !important; }
        }
        @media (max-width: 400px) {
          .bfs-feat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Country Banner ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #f0faf6 0%, #e0f5ec 100%)",
          padding: "52px clamp(20px,6vw,100px) 56px",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* blobs */}
        <div style={{ position:"absolute", top:"-50px", left:"-40px", width:"180px", height:"180px", borderRadius:"50%", background:"rgba(77,217,172,0.15)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"-40px", right:"60px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(77,217,172,0.12)", pointerEvents:"none" }}/>

        <div className="bfs-country-banner" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 800, color: "#0f2d1f", margin: "0 0 10px" }}>
            Where Is Your Company Registered?
          </h2>
          <p style={{ fontSize: "13.5px", color: "#4a6659", lineHeight: 1.7, margin: "0 0 28px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
            We use this to confirm whether we can support bank account opening for your company.
          </p>

          {submitted ? (
            <div style={{ animation: "bfs-fadeIn 0.4s ease both", display:"inline-flex", alignItems:"center", gap:"8px", background:"#fff", border:"1.5px solid #2aA876", borderRadius:"10px", padding:"12px 24px", color:"#1a6647", fontWeight:600, fontSize:"13px" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="#2aA876" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Great! We support bank account opening in {country}.
            </div>
          ) : (
            <div className="bfs-selector-row" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px" }}>
              <select
                className="bfs-select"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" disabled>Select a country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                className="bfs-submit-btn"
                onClick={handleSubmit}
                disabled={!country}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Smart Way Section ── */}
      <section
        style={{
          background: "#fff",
          padding: "72px clamp(20px,6vw,100px) 80px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Hero row */}
        <div
          className="bfs-hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "clamp(32px,5vw,80px)",
            marginBottom: "64px",
            maxWidth: "1100px",
            margin: "0 auto 64px",
          }}
        >
          {/* Left */}
          <div style={{ animation: "bfs-fadeUp 0.65s ease both" }}>
            <h2
              style={{
                fontSize: "clamp(22px,2.8vw,36px)",
                fontWeight: 800,
                color: "#0f2d1f",
                lineHeight: 1.2,
                margin: "0 0 18px",
              }}
            >
              The Smarter Way to Open an Offshore Bank Account
            </h2>
            <p
              style={{
                fontSize: "13.5px",
                color: "#4a6659",
                lineHeight: 1.8,
                marginBottom: "28px",
              }}
            >
              When you register your company with OVZA, banking becomes simple. Our curated network
              of trusted banks and EMIs has been thoroughly vetted for reliability, compliance, and
              long-term stability. Because we already hold your notarized KYC from the incorporation
              process, opening your offshore account is faster, smoother, and far more likely to be
              approved.
            </p>
            <button className="bfs-get-btn">Get Started</button>
          </div>

          {/* Right — illustration */}
          <div
            className="bfs-hero-img"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              animation: "bfs-fadeIn 0.8s ease 0.15s both",
              position: "relative",
            }}
          >
            {/* blob behind image */}
            <div style={{
              position: "absolute",
              width: "340px", height: "300px",
              borderRadius: "55% 45% 60% 40% / 50% 60% 40% 50%",
              background: "rgba(77,217,172,0.12)",
              pointerEvents: "none",
            }}/>
            <img
              src={chair}
              alt="Offshore Banking"
              style={{
                position: "relative",
                zIndex: 1,
                width: "clamp(200px,28vw,380px)",
                objectFit: "contain",
              }}
            />
          </div>
        </div>

        {/* Feature grid */}
        <div
          className="bfs-feat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "clamp(24px,3vw,40px) clamp(16px,2.5vw,32px)",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {FEATURES.map((feat, idx) => (
            <div
              key={feat.title}
              className="bfs-feature-card"
              style={{
                animation: `bfs-fadeUp 0.55s ease ${0.05 + idx * 0.06}s both`,
              }}
            >
              <div className="bfs-icon-wrap">{feat.icon}</div>
              <h3
                style={{
                  fontSize: "13.5px",
                  fontWeight: 700,
                  color: "#0f2d1f",
                  margin: "0 0 8px",
                  lineHeight: 1.3,
                }}
              >
                {feat.title}
              </h3>
              <p
                style={{
                  fontSize: "12px",
                  color: "#4a6659",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BankingFeaturesSection;
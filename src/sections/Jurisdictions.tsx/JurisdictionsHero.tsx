import { useEffect, useRef, useState } from "react";

// country code map for flagcdn.com
const americas = [
  { code: "ai", name: "Anguilla" },
  { code: "ag", name: "Antigua and Barbuda" },
  { code: "bs", name: "Bahamas" },
  { code: "bz", name: "Belize" },
  { code: "vg", name: "British Virgin Islands" },
  { code: "ky", name: "Cayman Islands" },
  { code: "cr", name: "Costa Rica" },
  { code: "pa", name: "Panama" },
  { code: "kn", name: "St. Kitts and Nevis" },
  { code: "lc", name: "St. Lucia" },
  { code: "vc", name: "St. Vincent and the Grenadines" },
  { code: "vi", name: "United States Virgin Islands" },
];

const asiaPacific = [
  { code: "ck", name: "Cook Islands" },
  { code: "mh", name: "Marshall Islands" },
  { code: "ws", name: "Samoa" },
  { code: "vu", name: "Vanuatu" },
];

const africa = [
  { code: "sc", name: "Seychelles" },
  { code: "lr", name: "Liberia" },
];

const allCountries = [...americas, ...asiaPacific, ...africa];

const FlagImg = ({ code, name }: { code: string; name: string }) => (
  <img
    src={`https://flagcdn.com/w40/${code}.png`}
    srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
    width="28"
    height="20"
    alt={name}
    style={{
      width: "28px",
      height: "20px",
      objectFit: "cover",
      borderRadius: "3px",
      flexShrink: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    }}
  />
);

const CountryRow = ({
  code,
  name,
  delay,
}: {
  code: string;
  name: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "7px 0",
        cursor: "pointer",
        opacity: 0,
        transform: "translateX(-12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        color: "#0F131E",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.color = "#3aafa9";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.color = "#0F131E";
      }}
    >
      <FlagImg code={code} name={name} />
      <span>{name}</span>
    </div>
  );
};

const JurisdictionsHero = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    });
  }, []);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .ovza-juris-section {
          background-color: #72D0C0;
          min-height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 24px 80px;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
          gap: 28px;
        }
        .ovza-juris-section::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .ovza-juris-section::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 240px; height: 240px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          pointer-events: none;
        }

        .ovza-juris-card {
          background: #FFFFFF;
          border-radius: 23px;
          padding: 40px 48px;
          width: 100%;
          max-width: 1276px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.10);
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.55s ease, transform 0.55s ease;
          position: relative;
          z-index: 1;
        }

        .ovza-juris-columns {
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr;
          gap: 0 40px;
          align-items: start;
        }

        .ovza-juris-divider-v {
          background: #e5e7eb;
          align-self: stretch;
          min-height: 200px;
        }

        .ovza-juris-col-title {
          font-size: 16px;
          font-weight: 700;
          color: #0F131E;
          margin: 0 0 16px 0;
          font-family: 'Poppins', sans-serif;
        }

        .ovza-americas-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 24px;
        }

        .ovza-register-bar {
          background: #FFFFFF;
          border-radius: 14px;
          padding: 6px 6px 6px 0;
          width: 100%;
          max-width: 1276px;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s 0.3s ease, transform 0.5s 0.3s ease;
          position: relative;
          z-index: 1;
          overflow: hidden;
        }

        .ovza-register-select {
          flex: 0 0 200px;
          padding: 14px 36px 14px 16px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          font-weight: 500;
          color: #6b7280;
          background: transparent;
          border: none;
          border-right: 1px solid #e5e7eb;
          appearance: none;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }

        .ovza-register-input {
          flex: 1;
          padding: 14px 20px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          color: #0F131E;
          background: transparent;
          border: none;
          outline: none;
        }
        .ovza-register-input::placeholder { color: #9ca3af; }

        .ovza-register-btn {
          flex-shrink: 0;
          padding: 14px 28px;
          background: #72D0C0;
          color: #0D1117;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .ovza-register-btn:hover {
          background: #5BBCAC;
          transform: translateY(-1px);
        }

        .ovza-lei-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          border-radius: 50px;
          padding: 10px 20px 10px 10px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          animation: leiFadeIn 0.5s 0.6s ease both;
        }
        @keyframes leiFadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ovza-lei-check {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: #72D0C0;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .ovza-supported-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          font-weight: 700;
          color: #0F131E;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          animation: leiFadeIn 0.5s 0.7s ease both;
        }

        .ovza-chat-widget {
          position: fixed;
          bottom: 80px; right: 24px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 160px;
          z-index: 100;
          animation: chatSlideIn 0.4s 0.8s ease both;
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .ovza-chat-btn {
          display: flex; align-items: center; gap: 10px;
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-weight: 500; color: #374151;
          font-family: 'Poppins', sans-serif; padding: 0;
          transition: color 0.2s;
        }
        .ovza-chat-btn:hover { color: #3aafa9; }
        .ovza-chat-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(114,208,192,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .ovza-chat-btn:hover .ovza-chat-icon { background: rgba(114,208,192,0.3); }

        .ovza-scroll-btn {
          position: fixed;
          bottom: 24px; right: 24px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #0D1117;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          z-index: 100; border: none;
          transition: transform 0.2s, background 0.2s;
          animation: chatSlideIn 0.4s 0.9s ease both;
        }
        .ovza-scroll-btn:hover { background: #1a1a2e; transform: translateY(-2px); }

        @media (max-width: 900px) {
          .ovza-juris-columns {
            grid-template-columns: 1fr;
            gap: 28px 0;
          }
          .ovza-juris-divider-v { display: none; }
          .ovza-juris-card { padding: 28px 24px; }
        }
        @media (max-width: 600px) {
          .ovza-americas-grid { grid-template-columns: 1fr; }
          .ovza-register-bar { flex-wrap: wrap; }
          .ovza-register-select { flex: 1 1 100%; border-right: none; border-bottom: 1px solid #e5e7eb; }
          .ovza-register-input { flex: 1 1 100%; }
          .ovza-register-btn { width: calc(100% - 12px); margin: 6px; border-radius: 10px; }
        }
      `}</style>

      <section className="ovza-juris-section">

        {/* Countries white card */}
        <div className="ovza-juris-card" ref={cardRef}>
          <div className="ovza-juris-columns">

            {/* The Americas */}
            <div>
              <p className="ovza-juris-col-title">The Americas</p>
              <div className="ovza-americas-grid">
                {americas.map((c, i) => (
                  <CountryRow key={c.code} {...c} delay={i * 40} />
                ))}
              </div>
            </div>

            <div className="ovza-juris-divider-v" />

            {/* Asia Pacific */}
            <div>
              <p className="ovza-juris-col-title">Asia Pacific</p>
              {asiaPacific.map((c, i) => (
                <CountryRow key={c.code} {...c} delay={200 + i * 40} />
              ))}
            </div>

            <div className="ovza-juris-divider-v" />

            {/* Africa */}
            <div>
              <p className="ovza-juris-col-title">Asia Pacific</p>
              {africa.map((c, i) => (
                <CountryRow key={c.code} {...c} delay={350 + i * 40} />
              ))}
            </div>

          </div>
        </div>

        {/* Register bar */}
        <div className="ovza-register-bar" ref={barRef}>
          <select
            className="ovza-register-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="">Select Country</option>
            {allCountries.map((c) => (
              <option key={c.code} value={c.name}>{c.name}</option>
            ))}
          </select>
          <input
            className="ovza-register-input"
            type="text"
            placeholder="Type your desired company name here"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <button className="ovza-register-btn">Register Your Company</button>
        </div>

        {/* LEI + Supported Countries */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", position: "relative", zIndex: 1 }}>
          <div className="ovza-lei-badge">
            <div className="ovza-lei-check">
              <svg width="18" height="18" fill="none" stroke="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0F131E", fontFamily: "'Poppins', sans-serif" }}>LEI</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#6b7280", fontFamily: "'Poppins', sans-serif" }}>Registered</p>
            </div>
          </div>
          <div className="ovza-supported-link">
            <span>Supported Countries</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Chat widget */}
        <div className="ovza-chat-widget">
          <button className="ovza-chat-btn">
            <div className="ovza-chat-icon">
              <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            Chat with us
          </button>
          <div style={{ borderTop: "1px solid #f3f4f6" }} />
          <button className="ovza-chat-btn">
            <div className="ovza-chat-icon">
              <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            Call Us
          </button>
        </div>

        {/* Scroll button */}
        <button className="ovza-scroll-btn" onClick={() => window.scrollBy({ top: 400, behavior: "smooth" })}>
          <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

      </section>
    </>
  );
};

export default JurisdictionsHero;
import React, { useState } from "react";
import bankIllustration from "../../assets/bankIllustration.png";

/* ── Data ── */
const traditionalBanks = [
  { name: "Belize International Bank",   online: true,  visit: false, credit: false, debit: false, deposit: 4000 },
  { name: "Caye International Bank Ltd.", online: true,  visit: false, credit: false, debit: true,  deposit: 3500 },
  { name: "Heritage Bank Limited",        online: true,  visit: false, credit: false, debit: false, deposit: 1500 },
  { name: "CIBC Caribbean",               online: false, visit: false, credit: false, debit: true,  deposit: 25000 },
  { name: "JetonBank",                    online: true,  visit: false, credit: false, debit: true,  deposit: 4000 },
  { name: "Al Salam",                     online: true,  visit: false, credit: false, debit: false, deposit: 25000 },
  { name: "Proven Bank",                  online: true,  visit: false, credit: true,  debit: true,  deposit: 10000 },
  { name: "The Kingdom Bank",             online: true,  visit: false, credit: false, debit: false, deposit: 3000 },
];

const emiBanks = [
  { name: "Wise",          online: true,  visit: false, credit: false, debit: true,  deposit: 0 },
  { name: "Payoneer",      online: true,  visit: false, credit: false, debit: true,  deposit: 0 },
  { name: "Airwallex",     online: true,  visit: false, credit: true,  debit: true,  deposit: 0 },
  { name: "Revolut",       online: true,  visit: false, credit: false, debit: true,  deposit: 0 },
  { name: "Neat",          online: true,  visit: false, credit: false, debit: true,  deposit: 500 },
  { name: "Currenxie",     online: true,  visit: false, credit: false, debit: false, deposit: 0 },
];

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="18" height="18" rx="3" fill="#34BE86"/>
    <path d="M4.5 9l3 3 6-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect width="18" height="18" rx="3" fill="#ef4444"/>
    <path d="M5.5 5.5l7 7M12.5 5.5l-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const BankFinder: React.FC = () => {
  const [onlineBanking, setOnlineBanking] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<"traditional" | "emi">("traditional");

  const banks = activeTab === "traditional" ? traditionalBanks : emiBanks;
  const filtered = onlineBanking === null
    ? banks
    : banks.filter(b => b.online === onlineBanking);

  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>

      {/* ══════════════════════
          TOP — mint hero banner
      ══════════════════════ */}
      <section
        style={{
          background: "linear-gradient(150deg, #4DD9AC 0%, #34BE86 60%, #2aA876 100%)",
          padding: "56px 20px 48px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blob decorations */}
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "220px", height: "220px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "-30px", left: "-30px", width: "160px", height: "160px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", pointerEvents: "none" }}/>

        <h2
          style={{
            fontSize: "clamp(22px,3vw,36px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.25,
            marginBottom: "4px",
          }}
        >
          Find the Right Bank and Open an<br />Offshore Bank Account!
        </h2>

        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", marginBottom: "24px" }}>
          Do You Want Online Banking?
        </p>

        {/* Illustration */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
          <img
            src={bankIllustration}
            alt="Online Banking Illustration"
            style={{ width: "clamp(180px,28vw,320px)", objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))" }}
          />
        </div>

        {/* Yes / No buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={() => setOnlineBanking(onlineBanking === true ? null : true)}
            style={{
              padding: "10px 36px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              cursor: "pointer",
              border: "2px solid #fff",
              backgroundColor: onlineBanking === true ? "#fff" : "transparent",
              color: onlineBanking === true ? "#34BE86" : "#fff",
              transition: "all 0.2s",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => setOnlineBanking(onlineBanking === false ? null : false)}
            style={{
              padding: "10px 36px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              cursor: "pointer",
              border: "2px solid #fff",
              backgroundColor: onlineBanking === false ? "#fff" : "transparent",
              color: onlineBanking === false ? "#34BE86" : "#fff",
              transition: "all 0.2s",
            }}
          >
            No
          </button>
        </div>
      </section>

      {/* ══════════════════════
          BOTTOM — bank table
      ══════════════════════ */}
      <section style={{ backgroundColor: "#fff", padding: "60px 0 80px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 clamp(16px,4vw,40px)" }}>

          {/* Header */}
          <h2
            style={{
              fontSize: "clamp(22px,2.8vw,34px)",
              fontWeight: 800,
              color: "#0a1f1a",
              textAlign: "center",
              lineHeight: 1.25,
              marginBottom: "28px",
            }}
          >
            Open an Offshore Account<br />With Our Partners
          </h2>

          {/* Tab switcher */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <div
              style={{
                display: "inline-flex",
                border: "1.5px solid #34BE86",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {(["traditional", "emi"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "9px 28px",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: activeTab === tab ? "#34BE86" : "#fff",
                    color: activeTab === tab ? "#fff" : "#34BE86",
                    transition: "all 0.2s",
                  }}
                >
                  {tab === "traditional" ? "Traditional Banks" : "EMI"}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div
            style={{
              border: "1.5px solid #e5e7eb",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#34BE86" }}>
                  {["Bank", "Online Banking", "Personal Visit", "Credit Card", "Debit Card", "Initial Deposit (USD)"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "13px 14px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                        textAlign: h === "Bank" ? "left" : "center",
                        fontFamily: "Poppins, sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((bank, idx) => (
                  <tr
                    key={bank.name}
                    style={{
                      backgroundColor: idx % 2 === 0 ? "#fff" : "#f9fafb",
                      borderTop: "1px solid #f3f4f6",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f0fdf8")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#fff" : "#f9fafb")}
                  >
                    <td
                      style={{
                        padding: "13px 14px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#34BE86",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {bank.name}
                    </td>
                    {[bank.online, bank.visit, bank.credit, bank.debit].map((val, i) => (
                      <td key={i} style={{ padding: "13px 14px", textAlign: "center" }}>
                        {val ? <CheckIcon /> : <CrossIcon />}
                      </td>
                    ))}
                    <td
                      style={{
                        padding: "13px 14px",
                        fontSize: "13px",
                        color: "#374151",
                        textAlign: "center",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {bank.deposit === 0 ? "—" : bank.deposit.toLocaleString()}
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#9ca3af", fontSize: "13px" }}>
                      No banks match your selection.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BankFinder;
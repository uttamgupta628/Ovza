import React, { useState, useEffect, useRef } from "react";

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

/* ── FAQ Data ── */
const faqData = {
  "Legality": [
    {
      q: "What is offshore banking and how does it work?",
      a: "Offshore banking means opening a bank account in a country outside your residence, usually in jurisdictions with favorable tax, privacy, and banking laws. These accounts allow businesses and individuals to manage assets internationally and access global financial services.",
    },
    {
      q: "Is it legal to open an offshore bank account in 2025?",
      a: "Yes, offshore banking is completely legal when done correctly. You must comply with the tax and reporting laws of your home country, such as declaring the account to your tax authority. OVZA ensures all setups are fully compliant with international standards.",
    },
    {
      q: "Which countries allow foreigners to open offshore bank accounts?",
      a: "Many jurisdictions welcome foreign account holders, including Seychelles, BVI, Belize, Cayman Islands, Anguilla, and Panama. Each has different requirements, benefits, and minimum deposits. OVZA helps you choose the best fit for your needs.",
    },
    {
      q: "Why do businesses and individuals choose offshore banking?",
      a: "Offshore banking offers asset protection, multi-currency capabilities, tax efficiency, privacy, and access to international financial markets. It is especially useful for entrepreneurs, digital nomads, and global businesses.",
    },
    {
      q: "What are the risks of offshore bank accounts and how are they regulated?",
      a: "Risks include regulatory changes, currency fluctuations, and reputational concerns if not structured properly. Reputable offshore banks operate under strict AML and KYC frameworks. OVZA only works with vetted, regulated banking partners.",
    },
  ],
  "Setup and Jurisdiction": [
    {
      q: "How long does it take to open an offshore bank account?",
      a: "The timeline varies by bank and jurisdiction, typically ranging from 2 to 8 weeks. With OVZA's established banking relationships and pre-prepared KYC documents, the process is significantly faster than applying independently.",
    },
    {
      q: "Do I need to visit the bank in person?",
      a: "In most cases, no. The majority of OVZA's banking partners allow fully remote account opening through secure digital onboarding. A small number of traditional banks may require a brief video call or in-person visit.",
    },
    {
      q: "What is the minimum deposit required to open an offshore bank account?",
      a: "Minimum deposits range from USD 0 for EMIs to USD 25,000 or more for traditional offshore banks. OVZA's network includes options for every budget and business type.",
    },
    {
      q: "Which jurisdiction is best for my offshore bank account?",
      a: "The best jurisdiction depends on your business activities, tax residency, and banking needs. OVZA provides personalised recommendations based on your specific situation and goals.",
    },
    {
      q: "Can I open an offshore bank account without an offshore company?",
      a: "Some EMIs allow personal offshore accounts without a company. However, for business accounts, having an offshore company registered with OVZA significantly improves your approval chances.",
    },
  ],
  "Management and Privacy": [
    {
      q: "Can I manage my offshore bank account online?",
      a: "Yes. All of OVZA's banking partners offer online banking platforms, mobile apps, and international wire transfer capabilities. You can manage your account from anywhere in the world.",
    },
    {
      q: "Is my offshore bank account information kept private?",
      a: "Offshore jurisdictions offer strong privacy protections, though they comply with international information exchange agreements (CRS/FATCA) where required. Your information is shared only with relevant tax authorities, not made public.",
    },
    {
      q: "Can I hold multiple currencies in an offshore bank account?",
      a: "Yes. Most offshore banks and EMIs support multi-currency accounts, allowing you to hold, send, and receive funds in USD, EUR, GBP, and other major currencies without conversion fees.",
    },
    {
      q: "What happens to my offshore account if the bank closes?",
      a: "Offshore bank deposits may not be covered by the same deposit insurance as domestic banks. OVZA advises diversifying across multiple banking partners and jurisdictions to manage this risk.",
    },
    {
      q: "Can OVZA help me switch banks or open additional accounts?",
      a: "Absolutely. OVZA provides ongoing banking support, including introductions to additional banking partners, account upgrades, and assistance if your current bank changes its policies.",
    },
  ],
};

const tabs = Object.keys(faqData) as Array<keyof typeof faqData>;

/* ── Chevron icon ── */
const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="18" height="18" viewBox="0 0 24 24" fill="none"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}
  >
    <path d="M6 9l6 6 6-6" stroke="#0a1f1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Single FAQ item ── */
const FAQItem: React.FC<{ q: string; a: string; idx: number; visible: boolean }> = ({ q, a, idx, visible }) => {
  const [open, setOpen] = useState(idx === 0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(idx === 0 ? undefined : 0);

  useEffect(() => {
    if (open) {
      setHeight(contentRef.current?.scrollHeight);
      const t = setTimeout(() => setHeight(undefined), 320);
      return () => clearTimeout(t);
    } else {
      setHeight(contentRef.current?.scrollHeight);
      requestAnimationFrame(() => requestAnimationFrame(() => setHeight(0)));
    }
  }, [open]);

  return (
    <div
      style={{
        borderBottom: "1px solid #e5e7eb",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.45s ease ${idx * 70}ms, transform 0.45s ease ${idx * 70}ms`,
      }}
    >
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 24px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "16px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#0a1f1a", lineHeight: 1.4, fontFamily: "Poppins, sans-serif" }}>
          {q}
        </span>
        <Chevron open={open} />
      </button>

      {/* Animated answer */}
      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          height: height === undefined ? "auto" : `${height}px`,
          transition: "height 0.32s ease",
        }}
      >
        <p
          style={{
            fontSize: "13.5px",
            color: "#4b5563",
            lineHeight: 1.75,
            margin: 0,
            padding: "0 24px 20px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const BankingFAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof faqData>("Legality");
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);
  const { ref: bodyRef,   visible: bodyVisible   } = useInView(0.05);

  return (
    <section
      style={{
        background: "linear-gradient(150deg, #4DD9AC 0%, #34BE86 60%, #2aA876 100%)",
        padding: "80px 0 100px",
        fontFamily: "Poppins, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes faq-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .faq-fade { opacity: 0; }
        .faq-fade.go { animation: faq-fadeUp 0.6s ease forwards; }

        .faq-tab-btn {
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 600;
          font-family: Poppins, sans-serif;
          border: none;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .faq-tab-btn.active {
          background-color: #34BE86;
          color: #fff;
          box-shadow: 0 2px 10px rgba(52,190,134,0.3);
        }
        .faq-tab-btn.inactive {
          background: transparent;
          color: #0a1f1a;
        }
        .faq-tab-btn.inactive:hover {
          background: rgba(52,190,134,0.1);
        }

        /* Blob decorations */
        .faq-blob-1 {
          position: absolute; top: -60px; left: -60px;
          width: 280px; height: 280px; border-radius: 50%;
          background: rgba(255,255,255,0.08); pointer-events: none;
        }
        .faq-blob-2 {
          position: absolute; bottom: -40px; right: -40px;
          width: 220px; height: 220px; border-radius: 50%;
          background: rgba(255,255,255,0.06); pointer-events: none;
        }

        @media (max-width: 640px) {
          .faq-tabs { flex-wrap: wrap !important; gap: 8px !important; }
          .faq-tab-btn { font-size: 12px !important; padding: 8px 14px !important; }
        }
      `}</style>

      {/* Background blobs */}
      <div className="faq-blob-1"/>
      <div className="faq-blob-2"/>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 clamp(16px,4vw,40px)", position: "relative" }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`faq-fade ${headerVisible ? "go" : ""}`}
          style={{ textAlign: "center", marginBottom: "36px" }}
        >
          <h2
            style={{
              fontSize: "clamp(22px,3.5vw,40px)",
              fontWeight: 800,
              color: "#0a1f1a",
              lineHeight: 1.2,
              marginBottom: "28px",
            }}
          >
            Frequently Asked Questions About Opening<br className="faq-br"/> an Offshore Bank Account
          </h2>

          {/* Tab bar */}
          <div
            className="faq-tabs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              backgroundColor: "rgba(255,255,255,0.85)",
              borderRadius: "12px",
              padding: "6px",
              backdropFilter: "blur(8px)",
            }}
          >
            {tabs.map(tab => (
              <button
                key={tab}
                className={`faq-tab-btn ${activeTab === tab ? "active" : "inactive"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── FAQ accordion card ── */}
        <div
          ref={bodyRef}
          className={`faq-fade ${bodyVisible ? "go" : ""}`}
          style={{
            animationDelay: "100ms",
            backgroundColor: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
          }}
        >
          {faqData[activeTab].map((item, idx) => (
            <FAQItem
              key={`${activeTab}-${idx}`}
              q={item.q}
              a={item.a}
              idx={idx}
              visible={bodyVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankingFAQ;
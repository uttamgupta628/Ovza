import React from "react";
import offshoreBanking from "../../assets/ofsorebanking.png";

/* ─────────────────────────────────────────────────────────────
   Quiz CTA Banner  (Image 1)
───────────────────────────────────────────────────────────── */
const QuizBanner: React.FC = () => (
  <>
    <style>{`
      @keyframes obs-fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .obs-banner-inner { animation: obs-fadeUp 0.65s ease both; }
      .obs-quiz-btn {
        transition: background 0.2s ease, transform 0.2s ease;
        cursor: pointer;
      }
      .obs-quiz-btn:hover {
        background: #155c3a !important;
        transform: translateY(-2px);
      }
      .obs-new-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #2aA876;
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        padding: 4px 12px;
        border-radius: 999px;
        margin-bottom: 18px;
        font-family: 'Poppins', sans-serif;
        letter-spacing: 0.5px;
      }
    `}</style>

    <section
      style={{
        background: "linear-gradient(135deg, #f0faf6 0%, #e0f5ec 100%)",
        padding: "64px clamp(20px,6vw,120px)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="obs-banner-inner"
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.55)",
          border: "1.5px solid rgba(42,168,118,0.18)",
          borderRadius: "24px",
          padding: "clamp(32px,5vw,56px) clamp(24px,6vw,80px)",
          textAlign: "center",
          backdropFilter: "blur(6px)",
          boxShadow: "0 4px 32px rgba(42,168,118,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* decorative blobs */}
        <div style={{
          position: "absolute", top: "-40px", left: "-40px",
          width: "140px", height: "140px", borderRadius: "50%",
          background: "rgba(77,217,172,0.18)", pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", bottom: "-30px", right: "-30px",
          width: "100px", height: "100px", borderRadius: "50%",
          background: "rgba(77,217,172,0.14)", pointerEvents: "none",
        }}/>

        <div className="obs-new-badge">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" fill="white" fillOpacity="0.5"/>
            <circle cx="5" cy="5" r="2" fill="white"/>
          </svg>
          New
        </div>

        <h2
          style={{
            fontSize: "clamp(20px,2.6vw,32px)",
            fontWeight: 800,
            color: "#0f2d1f",
            lineHeight: 1.25,
            margin: "0 0 14px",
          }}
        >
          Find the Right Offshore Bank in Seconds
        </h2>

        <p
          style={{
            fontSize: "13.5px",
            color: "#4a6659",
            lineHeight: 1.75,
            maxWidth: "560px",
            margin: "0 auto 32px",
          }}
        >
          Take OVZA's quick quiz to match your company with the ideal offshore banking partner.
          Our tool guides you through requirements, jurisdictions, and compliance so you can open
          the right bank account with confidence.
        </p>

        <button
          className="obs-quiz-btn"
          style={{
            background: "#1a6647",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "13px 30px",
            fontSize: "13px",
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            cursor: "pointer",
          }}
        >
          Start Quiz
        </button>
      </div>
    </section>
  </>
);

/* ─────────────────────────────────────────────────────────────
   Banking Partners Section  (Image 2)
───────────────────────────────────────────────────────────── */
const BankingPartnersSection: React.FC = () => (
  <>
    <style>{`
      @keyframes obs-slideIn {
        from { opacity: 0; transform: translateX(-20px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes obs-cardFade {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .obs-left-col  { animation: obs-slideIn 0.7s ease both; }
      .obs-card      { animation: obs-cardFade 0.7s ease both; }
      .obs-card:nth-child(2) { animation-delay: 0.12s; }
      .obs-get-btn {
        transition: background 0.2s ease, transform 0.2s ease;
        cursor: pointer;
      }
      .obs-get-btn:hover {
        background: #155c3a !important;
        transform: translateY(-2px);
      }
      @media (max-width: 860px) {
        .obs-main-grid { grid-template-columns: 1fr !important; }
        .obs-right-col { grid-column: 1 !important; }
      }
      @media (max-width: 600px) {
        .obs-cards-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>

    <section
      style={{
        background: "linear-gradient(135deg, #f0faf6 0%, #e0f5ec 100%)",
        padding: "80px clamp(20px,6vw,100px) 72px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="obs-main-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.55fr",
          gap: "clamp(32px,5vw,80px)",
          alignItems: "start",
        }}
      >
        {/* ── LEFT ── */}
        <div className="obs-left-col">
          <h2
            style={{
              fontSize: "clamp(20px,2.4vw,30px)",
              fontWeight: 800,
              color: "#0f2d1f",
              lineHeight: 1.25,
              margin: "0 0 18px",
            }}
          >
            Open an Offshore Bank Account and Discover Why OVZA is Your Ideal Banking Partner
          </h2>

          <p
            style={{
              fontSize: "13px",
              color: "#4a6659",
              lineHeight: 1.8,
              marginBottom: "36px",
            }}
          >
            Tap into OVZA's trusted network of world-class offshore banking providers. Our
            partnerships span the most reputable and innovative financial institutions, giving
            clients access to both established banks and new-generation providers. Each partner is
            carefully vetted for speed, reliability, and compliance — ensuring that your company
            benefits from the highest standards of global banking.
          </p>

          {/* illustration */}
          <img
            src={offshoreBanking}
            alt="Offshore Banking"
            style={{
              width: "clamp(180px,22vw,300px)",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* ── RIGHT ── */}
        <div className="obs-right-col">
          {/* cards row */}
          <div
            className="obs-cards-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "28px",
            }}
          >
            {/* Card 1 */}
            <div
              className="obs-card"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "26px 22px",
                boxShadow: "0 2px 16px rgba(42,168,118,0.08)",
                border: "1px solid rgba(42,168,118,0.12)",
              }}
            >
              {/* icon */}
              <div
                style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: "rgba(77,217,172,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="9" width="18" height="10" rx="2" stroke="#2aA876" strokeWidth="1.6"/>
                  <path d="M6 9V7a5 5 0 0110 0v2" stroke="#2aA876" strokeWidth="1.6" strokeLinecap="round"/>
                  <circle cx="11" cy="14" r="1.5" fill="#2aA876"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f2d1f", marginBottom: "10px" }}>
                Traditional Offshore Banks
              </h3>
              <p style={{ fontSize: "12px", color: "#4a6659", lineHeight: 1.75, margin: 0 }}>
                Gain access to respected, top-tier banks that specialize in servicing international
                companies. These institutions offer credibility, multi-currency accounts, and
                long-standing reputations in the offshore sector, providing stability and
                recognition for your business worldwide.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="obs-card"
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "26px 22px",
                boxShadow: "0 2px 16px rgba(42,168,118,0.08)",
                border: "1px solid rgba(42,168,118,0.12)",
              }}
            >
              <div
                style={{
                  width: "44px", height: "44px", borderRadius: "10px",
                  background: "rgba(77,217,172,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="8.5" stroke="#2aA876" strokeWidth="1.6"/>
                  <path d="M8 11h6M11 8v6" stroke="#2aA876" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M6 6l2 2M16 16l-2-2M16 6l-2 2M6 16l2-2" stroke="#2aA876" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 style={{ fontSize: "13.5px", fontWeight: 700, color: "#0f2d1f", marginBottom: "10px" }}>
                Electronic Money Institutions (EMIs)
              </h3>
              <p style={{ fontSize: "12px", color: "#4a6659", lineHeight: 1.75, margin: 0 }}>
                Work with licensed Electronic Money Institutions (EMIs) that deliver fast
                onboarding, digital-first platforms, and innovative tools for international
                payments. OVZA connects you only with the highest-tier EMIs that are reliable,
                compliant, and designed for modern global entrepreneurs.
              </p>
            </div>
          </div>

          {/* bottom paragraph + CTA */}
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "26px 28px",
              boxShadow: "0 2px 16px rgba(42,168,118,0.06)",
              border: "1px solid rgba(42,168,118,0.10)",
            }}
          >
            <p style={{ fontSize: "13px", color: "#4a6659", lineHeight: 1.8, margin: "0 0 22px" }}>
              Offshore banking is not a simple extension of regular banking; it is a specialized
              niche that requires expertise, compliance, and the right connections. Most banks
              cannot seamlessly handle offshore companies, but OVZA's partners are built for it.
              By working with our carefully selected network, your business gains access to
              institutions that understand the complexities of international corporate structures
              and deliver banking solutions tailored to offshore needs.
            </p>
            <button
              className="obs-get-btn"
              style={{
                background: "#1a6647",
                color: "#fff",
                border: "none",
                borderRadius: "999px",
                padding: "12px 26px",
                fontSize: "13px",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
);

/* ─────────────────────────────────────────────────────────────
   Combined export  (drop both under BankingHeroSection)
───────────────────────────────────────────────────────────── */
const OffshoreBankingSections: React.FC = () => (
  <>
    <QuizBanner />
    <BankingPartnersSection />
  </>
);

export default OffshoreBankingSections;
export { QuizBanner, BankingPartnersSection };
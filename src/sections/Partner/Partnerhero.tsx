import { useState, useRef, useEffect } from "react";
import heroStart from "../../assets/herostart.png";

const PartnerHero = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headingRef.current, cardRef.current, bottomRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 160);
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        /* ── Keyframes ─────────────────────────────────── */
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(114,208,192,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(114,208,192,0); }
        }
        @keyframes floatA {
          0%, 100% { transform: rotate(180deg) scaleX(-1) translateY(0px);   }
          50%       { transform: rotate(180deg) scaleX(-1) translateY(-18px); }
        }
        @keyframes floatB {
          0%, 100% { transform: rotate(90deg) translateY(0px);   }
          50%       { transform: rotate(90deg) translateY(14px); }
        }
        @keyframes floatC {
          0%, 100% { transform: rotate(-60deg) scaleX(-1) translateY(0px);   }
          50%       { transform: rotate(-60deg) scaleX(-1) translateY(-12px); }
        }
        @keyframes floatD {
          0%, 100% { transform: rotate(30deg) translateY(0px);  }
          50%       { transform: rotate(30deg) translateY(16px); }
        }
        @keyframes badgeShimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes gradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 4px 32px rgba(0,0,0,0.07); }
          50%       { box-shadow: 0 8px 48px rgba(58,175,169,0.13); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: scaleY(1);   }
          50%       { transform: scaleY(1.3); }
        }

        /* ── Base ──────────────────────────────────────── */
        .partner-section {
          min-height: calc(100vh - 64px);
          background: #f8fffe;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px 80px;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
          text-align: center;
        }

        /* ── BG blobs — floating ───────────────────────── */
        .partner-bg-tl {
          position: absolute;
          top: -40px; left: -60px;
          width: 260px;
          opacity: 0.35;
          pointer-events: none;
          animation: floatA 7s ease-in-out infinite;
        }
        .partner-bg-tr {
          position: absolute;
          top: -20px; right: -60px;
          width: 220px;
          opacity: 0.3;
          pointer-events: none;
          animation: floatB 9s ease-in-out infinite;
        }
        .partner-bg-bl {
          position: absolute;
          bottom: -40px; left: -40px;
          width: 180px;
          opacity: 0.2;
          pointer-events: none;
          animation: floatC 8s ease-in-out infinite;
        }
        .partner-bg-br {
          position: absolute;
          bottom: 20px; right: -50px;
          width: 200px;
          opacity: 0.25;
          pointer-events: none;
          animation: floatD 10s ease-in-out infinite;
        }

        /* ── Badge ─────────────────────────────────────── */
        .partner-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(90deg,
            #f0faf8 0%, #f0faf8 35%,
            #d6f5f0 50%,
            #f0faf8 65%, #f0faf8 100%);
          background-size: 200% auto;
          border: 1px solid #c6ede7;
          border-radius: 50px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #2a9d8f;
          margin-bottom: 24px;
          animation: badgeShimmer 3.5s linear infinite;
        }
        .partner-badge-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #72D0C0;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }

        /* ── Heading ───────────────────────────────────── */
        .partner-heading {
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800;
          color: #0F131E;
          line-height: 1.15;
          margin: 0 0 16px 0;
          max-width: 640px;
        }
        .partner-heading span {
          background: linear-gradient(270deg, #3aafa9, #72D0C0, #2d9d97);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
        }

        /* ── Subtext ───────────────────────────────────── */
        .partner-sub {
          font-size: 14px;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto 36px;
        }

        /* ── Card ──────────────────────────────────────── */
        .partner-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 36px 40px;
          max-width: 580px;
          width: 100%;
          animation: cardGlow 4s ease-in-out infinite;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          position: relative;
          z-index: 1;
        }
        .partner-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(114,208,192,0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .partner-card-title {
          font-size: 18px;
          font-weight: 700;
          color: #0F131E;
          margin: 0 0 24px 0;
        }

        .partner-form {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .partner-input {
          flex: 1;
          padding: 13px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
          color: #0F131E;
          outline: none;
          background: #f9fafb;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .partner-input::placeholder { color: #9ca3af; }
        .partner-input:focus {
          border-color: #72D0C0;
          box-shadow: 0 0 0 3px rgba(114,208,192,0.18);
          background: #fff;
          transform: translateY(-1px);
        }

        .partner-submit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: linear-gradient(135deg, #3aafa9, #2d9d97);
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s, box-shadow 0.2s;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .partner-submit-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          transform: translateX(-100%);
          transition: transform 0.4s ease;
        }
        .partner-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(58,175,169,0.35);
        }
        .partner-submit-btn:hover::after {
          transform: translateX(100%);
        }

        .partner-referral-link {
          margin-top: 16px;
          font-size: 13px;
          color: #6b7280;
        }
        .partner-referral-link a {
          color: #3aafa9;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
          transition: color 0.15s;
        }
        .partner-referral-link a:hover { color: #2d9d97; }

        /* ── Bottom ────────────────────────────────────── */
        .partner-bottom {
          margin-top: 48px;
          max-width: 480px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          position: relative;
          z-index: 1;
        }

        .partner-not-affiliate {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #3aafa9;
          margin: 0 0 14px 0;
        }

        .partner-network-title {
          font-size: 22px;
          font-weight: 700;
          color: #0F131E;
          margin: 0 0 12px 0;
        }

        .partner-network-desc {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.7;
          margin: 0 0 24px 0;
        }

        .partner-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 11px 28px;
          background: transparent;
          color: #3aafa9;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border: 2px solid #3aafa9;
          border-radius: 50px;
          cursor: pointer;
          transition: background 0.25s, color 0.25s, transform 0.15s, box-shadow 0.25s;
          position: relative;
          overflow: hidden;
        }
        .partner-contact-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #3aafa9;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
          z-index: 0;
        }
        .partner-contact-btn span { position: relative; z-index: 1; }
        .partner-contact-btn:hover::before { transform: scaleX(1); }
        .partner-contact-btn:hover {
          color: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(58,175,169,0.28);
        }

        /* ── Heading animated wrap ──────────────────────── */
        .partner-heading-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease, transform 0.55s ease;
          position: relative;
          z-index: 1;
        }

        /* ── Responsive ────────────────────────────────── */
        @media (max-width: 768px) {
          .partner-section {
            padding: 48px 20px 64px;
          }
          .partner-bg-tl { width: 160px; top: -20px; left: -30px; }
          .partner-bg-tr { width: 140px; top: -10px; right: -30px; }
          .partner-bg-bl { width: 120px; bottom: -20px; left: -20px; }
          .partner-bg-br { width: 130px; bottom: 10px;  right: -25px; }
          .partner-card  { padding: 28px 24px; }
          .partner-form  {
            flex-direction: column;
            gap: 10px;
          }
          .partner-submit-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .partner-section { padding: 40px 16px 56px; }
          .partner-bg-tl, .partner-bg-tr,
          .partner-bg-bl, .partner-bg-br { width: 100px; opacity: 0.18; }
          .partner-card { padding: 24px 16px; border-radius: 14px; }
          .partner-heading { font-size: clamp(26px, 7vw, 36px); }
          .partner-sub { font-size: 13px; }
          .partner-card-title { font-size: 16px; }
          .partner-network-title { font-size: 19px; }
          .partner-input { padding: 12px 14px; font-size: 13px; }
          .partner-submit-btn { padding: 12px 20px; font-size: 13px; }
          .partner-bottom { margin-top: 36px; }
        }
      `}</style>

      <section className="partner-section">

        {/* Background blobs */}
        <img src={heroStart} alt="" aria-hidden className="partner-bg-tl" />
        <img src={heroStart} alt="" aria-hidden className="partner-bg-tr" />
        <img src={heroStart} alt="" aria-hidden className="partner-bg-bl" />
        <img src={heroStart} alt="" aria-hidden className="partner-bg-br" />

        {/* Heading block */}
        <div className="partner-heading-wrap" ref={headingRef}>
          <div className="partner-badge">
            <span className="partner-badge-dot" />
            Partner Program Now Open
          </div>

          <h1 className="partner-heading">
            Earn Commissions Helping<br />
            Businesses <span>Go Global</span>
          </h1>

          <p className="partner-sub">
            Join the OVZA Partner Program and earn up to $55 commission for every
            offshore company formation you refer. Premium service, reliable payouts.
          </p>
        </div>

        {/* Affiliate card */}
        <div className="partner-card" ref={cardRef}>
          <p className="partner-card-title">Get Your Affiliate Link Now</p>
          <div className="partner-form">
            <input
              className="partner-input"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="partner-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="partner-submit-btn">
              Submit
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <p className="partner-referral-link">
            Want to check how many referrals you have?{" "}
            <a href="#">Click here.</a>
          </p>
        </div>

        {/* Bottom — not an affiliate */}
        <div className="partner-bottom" ref={bottomRef}>
          <p className="partner-not-affiliate">NOT AN AFFILIATE?</p>
          <h2 className="partner-network-title">Join OVZA's International Network</h2>
          <p className="partner-network-desc">
            If you operate as a law firm, registered agent, or service provider
            in an offshore jurisdiction, we invite you to explore cooperation.
          </p>
          <button className="partner-contact-btn">
            <span>Contact Us</span>
          </button>
        </div>

      </section>
    </>
  );
};

export default PartnerHero;
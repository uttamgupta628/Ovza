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
      }, i * 120);
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

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

        /* Background blob images — top-left, top-right, bottom-right */
        .partner-bg-tl {
          position: absolute;
          top: -40px;
          left: -60px;
          width: 260px;
          opacity: 0.35;
          pointer-events: none;
          select: none;
          transform: rotate(180deg) scaleX(-1);
        }
        .partner-bg-tr {
          position: absolute;
          top: -20px;
          right: -60px;
          width: 220px;
          opacity: 0.3;
          pointer-events: none;
          transform: rotate(90deg);
        }
        .partner-bg-bl {
          position: absolute;
          bottom: -40px;
          left: -40px;
          width: 180px;
          opacity: 0.2;
          pointer-events: none;
          transform: rotate(-60deg) scaleX(-1);
        }
        .partner-bg-br {
          position: absolute;
          bottom: 20px;
          right: -50px;
          width: 200px;
          opacity: 0.25;
          pointer-events: none;
          transform: rotate(30deg);
        }

        /* Badge */
        .partner-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0faf8;
          border: 1px solid #c6ede7;
          border-radius: 50px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 500;
          color: #2a9d8f;
          margin-bottom: 24px;
        }
        .partner-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #72D0C0;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(114,208,192,0.5); }
          50%       { box-shadow: 0 0 0 5px rgba(114,208,192,0); }
        }

        /* Heading */
        .partner-heading {
          font-size: clamp(32px, 4.5vw, 52px);
          font-weight: 800;
          color: #0F131E;
          line-height: 1.15;
          margin: 0 0 16px 0;
          max-width: 640px;
        }
        .partner-heading span {
          color: #3aafa9;
        }

        /* Subtext */
        .partner-sub {
          font-size: 14px;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto 36px;
        }

        /* Affiliate card */
        .partner-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 36px 40px;
          max-width: 580px;
          width: 100%;
          box-shadow: 0 4px 32px rgba(0,0,0,0.07);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          position: relative;
          z-index: 1;
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
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .partner-input::placeholder { color: #9ca3af; }
        .partner-input:focus {
          border-color: #72D0C0;
          box-shadow: 0 0 0 3px rgba(114,208,192,0.15);
          background: #fff;
        }

        .partner-submit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: #3aafa9;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .partner-submit-btn:hover {
          background: #2d9d97;
          transform: translateY(-1px);
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
        }
        .partner-referral-link a:hover { color: #2d9d97; }

        /* Bottom section */
        .partner-bottom {
          margin-top: 48px;
          max-width: 480px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
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
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .partner-contact-btn:hover {
          background: #3aafa9;
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* Heading animated */
        .partner-heading-wrap {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          position: relative;
          z-index: 1;
        }

        /* Chat widget */
        .partner-chat-widget {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Poppins', sans-serif;
          z-index: 100;
          animation: chatIn 0.4s 0.8s ease both;
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .partner-chat-widget:hover {
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 600px) {
          .partner-form { flex-direction: column; }
          .partner-submit-btn { width: 100%; justify-content: center; }
          .partner-card { padding: 24px 20px; }
        }
      `}</style>

      <section className="partner-section">

        {/* Background blobs using herostart.png */}
        <img src={heroStart} alt="" aria-hidden className="partner-bg-tl" />
        <img src={heroStart} alt="" aria-hidden className="partner-bg-tr" />
        <img src={heroStart} alt="" aria-hidden className="partner-bg-bl" />
        <img src={heroStart} alt="" aria-hidden className="partner-bg-br" />

        {/* Heading block */}
        <div className="partner-heading-wrap" ref={headingRef}>
          {/* Badge */}
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
          <button className="partner-contact-btn">Contact Us</button>
        </div>

        {/* Chat widget */}
        {/* <div className="partner-chat-widget">
          <div style={{
            width: "28px", height: "28px", borderRadius: "8px",
            background: "rgba(114,208,192,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}>Chat with us</span>
        </div> */}

      </section>
    </>
  );
};

export default PartnerHero;
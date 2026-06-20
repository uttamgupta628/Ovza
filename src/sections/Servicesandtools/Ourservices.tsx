import { useEffect, useRef } from "react";
import offshoreImg from "../../assets/offshore.png";
import bankingImg from "../../assets/banking.png";
import documentImg from "../../assets/document.png";
import nameCheckerImg from "../../assets/name-checker.png";
import jurisdictionImg from "../../assets/jurisdiction.png";

const services = [
  {
    img: offshoreImg,
    title: "Offshore Company Formation",
    desc: "Set up your offshore entity in the right jurisdiction for your goals.",
  },
  {
    img: bankingImg,
    title: "Banking Support",
    desc: "Navigate international banking with expert guidance and introductions.",
  },
  {
    img: documentImg,
    title: "Document Notarization",
    desc: "Notarization and certification for official and international use.",
  },
];

const tools = [
  {
    img: nameCheckerImg,
    title: "Company Name Checker",
    desc: "Check availability before you register. Free tool.",
  },
  {
    img: jurisdictionImg,
    title: "Jurisdiction Comparison",
    desc: "Compare offshore jurisdictions side by side. Interactive tool.",
  },
];

const ServiceCard = ({
  img,
  title,
  desc,
  delay = 0,
}: {
  img: string;
  title: string;
  desc: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
        transition: "box-shadow 0.25s, transform 0.25s, opacity 0.5s",
        fontFamily: "'Poppins', sans-serif",
        opacity: 0,
        transform: "translateY(20px)",
        transitionDelay: `${delay}ms`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 8px 28px rgba(114,208,192,0.25)";
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = "#72D0C0";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
        el.style.borderColor = "#e5e7eb";
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "12px",
          background: "rgba(114,208,192,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={img}
          alt={title}
          style={{ width: "32px", height: "32px", objectFit: "contain" }}
        />
      </div>
      <h3 style={{ fontSize: "15px", fontWeight: 600, color: "#0F131E", margin: 0, lineHeight: 1.3 }}>
        {title}
      </h3>
      <p style={{ fontSize: "13px", fontWeight: 400, color: "#6b7280", lineHeight: 1.65, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
};

const Ourservices = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    // slight delay so styles apply before animation
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0) scale(1)";
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        .ovza-services-section {
          background-color: #72D0C0;
          min-height: calc(100vh - 64px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px;
          font-family: 'Poppins', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* background shape decoration */
        .ovza-services-section::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          pointer-events: none;
        }
        .ovza-services-section::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          pointer-events: none;
        }

        /* White container — Figma: 1276×664, radius 23px */
        .ovza-services-card {
          background: #FFFFFF;
          border-radius: 23px;
          padding: 40px 48px;
          width: 100%;
          max-width: 1276px;
          min-height: 664px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.10);
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }

        .ovza-services-label {
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          margin: 0 0 24px 0;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .ovza-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .ovza-divider {
          border: none;
          border-top: 1px solid #f0f0f0;
          margin: 32px 0;
        }

        .ovza-tools-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ovza-services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .ovza-services-card {
            padding: 28px 20px;
            min-height: unset;
            border-radius: 16px;
          }
          .ovza-services-grid,
          .ovza-tools-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Chat widget hover */
        .ovza-chat-widget {
          position: fixed;
          bottom: 80px;
          right: 24px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 160px;
          font-family: 'Poppins', sans-serif;
          z-index: 100;
          animation: chatSlideIn 0.4s 0.6s ease both;
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .ovza-chat-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          font-family: 'Poppins', sans-serif;
          padding: 0;
          transition: color 0.2s;
        }
        .ovza-chat-btn:hover { color: #3aafa9; }

        .ovza-chat-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(114,208,192,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .ovza-chat-btn:hover .ovza-chat-icon {
          background: rgba(114,208,192,0.3);
        }

        .ovza-scroll-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #0D1117;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          z-index: 100;
          border: none;
          transition: transform 0.2s, background 0.2s;
          animation: chatSlideIn 0.4s 0.7s ease both;
        }
        .ovza-scroll-btn:hover {
          background: #1a1a2e;
          transform: translateY(-2px);
        }
      `}</style>

      <section className="ovza-services-section">
        {/* Main white card */}
        <div className="ovza-services-card" ref={cardRef}>
          <p className="ovza-services-label">Our Services</p>

          {/* 3-col services grid */}
          <div className="ovza-services-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 80} />
            ))}
          </div>

          <hr className="ovza-divider" />

          {/* 2-col tools grid */}
          <div className="ovza-tools-grid">
            {tools.map((t, i) => (
              <ServiceCard key={t.title} {...t} delay={300 + i * 80} />
            ))}
          </div>
        </div>

        {/* Chat Widget */}
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

        {/* Scroll down button */}
        <button className="ovza-scroll-btn" onClick={() => window.scrollBy({ top: 400, behavior: "smooth" })}>
          <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </section>
    </>
  );
};

export default Ourservices;
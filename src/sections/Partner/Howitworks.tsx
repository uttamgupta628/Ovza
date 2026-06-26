import { useEffect, useRef } from "react";

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description:
      "Enter your email to receive your unique affiliate link and dashboard access within 24 hours. No lengthy forms. No complications.",
    icon: (
      <svg width="40" height="40" fill="none" stroke="#1DB38D" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <circle cx="17" cy="8" r="4" fill="#1DB38D" stroke="none" />
        <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15.5 8l1 1 1.5-1.5" />
      </svg>
    ),
  },
  {
    number: 2,
    title: "Promote",
    description:
      "Leverage your content, mailing list, social channels, or personal referrals. Engage your audience in your own authentic way.",
    icon: (
      <svg width="40" height="40" fill="none" stroke="#1DB38D" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h11" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 12v3m0 3v-3m0 0h-3m3 0h3" stroke="#1DB38D" />
      </svg>
    ),
  },
  {
    number: 3,
    title: "Generate Revenue",
    description:
      "Earn commission on every qualified client with full transparency and real time updates delivered directly to you via our innovative automated email system.",
    icon: (
      <svg width="40" height="40" fill="none" stroke="#1DB38D" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
          d="M9 12h6m-3-3v6m-6 4h12a2 2 0 002-2V7a2 2 0 00-2-2h-5.586a1 1 0 00-.707.293l-2.414 2.414A1 1 0 006 8.414V19a2 2 0 002 2z" />
      </svg>
    ),
  },
];

// ─── Step Card ─────────────────────────────────────────────────────────────────
const StepCard = ({
  step,
  index,
  isLast,
}: {
  step: typeof steps[0];
  index: number;
  isLast: boolean;
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
            el.style.transform = "translateY(0) scale(1)";
          }, index * 150);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "stretch" }}>
      <div
        ref={ref}
        className="hiw-card"
        style={{
          flex: 1,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(8px)",
          borderRadius: "20px",
          border: "1px solid rgba(29,179,141,0.18)",
          padding: "40px 28px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "20px",
          opacity: 0,
          transform: "translateY(28px) scale(0.97)",
          transition: "opacity 0.55s ease, transform 0.55s ease, box-shadow 0.3s ease, border-color 0.3s ease",
          boxShadow: "0 4px 24px rgba(29,179,141,0.07)",
        }}
      >
        {/* Step number badge */}
        <div className="hiw-badge" style={{
          position: "absolute",
          top: "-22px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1DB38D 0%, #72D0C0 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(29,179,141,0.4)",
          zIndex: 2,
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}>
          <span style={{
            color: "white",
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
          }}>
            {step.number}
          </span>
        </div>

        {/* Icon circle */}
        <div style={{ position: "relative", marginTop: "16px" }}>
          {/* Spinning dashed ring */}
          <svg
            className="hiw-ring"
            width="120" height="120"
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 0,
            }}
          >
            <circle cx="60" cy="60" r="56" fill="none"
              stroke="#1DB38D" strokeWidth="1.5"
              strokeDasharray="6 5"
              opacity="0.4" />
          </svg>
          {/* Inner filled circle */}
          <div className="hiw-icon-circle" style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(114,208,192,0.25) 0%, rgba(29,179,141,0.12) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            transition: "background 0.3s ease, transform 0.3s ease",
          }}>
            {step.icon}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          margin: 0,
          fontSize: "20px",
          fontWeight: 700,
          color: "#0F131E",
          fontFamily: "'Poppins', sans-serif",
        }}>
          {step.title}
        </h3>

        {/* Description */}
        <p style={{
          margin: 0,
          fontSize: "14px",
          lineHeight: 1.75,
          color: "#4b5563",
          fontFamily: "'Poppins', sans-serif",
          maxWidth: "280px",
        }}>
          {step.description}
        </p>
      </div>

      {/* Horizontal connector */}
      {!isLast && (
        <div className="hiw-connector" style={{
          position: "absolute",
          top: "calc(50% - 60px)",
          right: "-24px",
          width: "48px",
          height: "2px",
          background: "linear-gradient(90deg, #1DB38D 0%, #72D0C0 100%)",
          zIndex: 3,
          borderRadius: "2px",
        }} />
      )}
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const btnRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observe = (el: HTMLElement | null, delay = 0) => {
      if (!el) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          obs.disconnect();
        }
      }, { threshold: 0.15 });
      obs.observe(el);
      return () => obs.disconnect();
    };
    observe(headingRef.current, 0);
    observe(btnRef.current, 500);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        /* ── Keyframes ─────────────────────────────────── */
        @keyframes hiw-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(29,179,141,0.4); }
          50%       { box-shadow: 0 0 0 10px rgba(29,179,141,0); }
        }
        @keyframes hiw-ring-spin {
          from { transform: translate(-50%,-50%) rotate(0deg); }
          to   { transform: translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes hiw-badge-pop {
          0%   { transform: translateX(-50%) scale(1); }
          40%  { transform: translateX(-50%) scale(1.18); }
          100% { transform: translateX(-50%) scale(1); }
        }
        @keyframes hiw-gradient-shift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        @keyframes hiw-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes hiw-connector-flow {
          0%   { background-position: 0%   0; }
          100% { background-position: 200% 0; }
        }
        @keyframes hiw-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes hiw-btn-shine {
          0%   { left: -60%; }
          100% { left: 140%; }
        }

        /* ── Card hover ────────────────────────────────── */
        .hiw-card:hover {
          box-shadow: 0 12px 40px rgba(29,179,141,0.16) !important;
          border-color: rgba(29,179,141,0.38) !important;
          transform: translateY(-4px) scale(1) !important;
        }
        .hiw-card:hover .hiw-ring {
          animation: hiw-ring-spin 8s linear infinite !important;
        }
        .hiw-card:hover .hiw-icon-circle {
          background: linear-gradient(135deg, rgba(114,208,192,0.38) 0%, rgba(29,179,141,0.22) 100%) !important;
          transform: scale(1.06) !important;
        }
        .hiw-card:hover .hiw-badge {
          animation: hiw-badge-pop 0.4s ease forwards !important;
          box-shadow: 0 6px 20px rgba(29,179,141,0.55) !important;
        }

        /* ── Connector animated flow ───────────────────── */
        .hiw-connector {
          background: linear-gradient(90deg,
            #1DB38D 0%, #72D0C0 50%, #1DB38D 100%) !important;
          background-size: 200% 100% !important;
          animation: hiw-connector-flow 2s linear infinite !important;
        }

        /* ── CTA button ────────────────────────────────── */
        .hiw-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          background: linear-gradient(135deg, #1DB38D 0%, #16a87a 100%);
          color: white;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          animation: hiw-pulse 2.5s ease-in-out infinite;
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .hiw-cta-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 40%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: skewX(-20deg);
          animation: hiw-btn-shine 3s ease-in-out infinite;
        }
        .hiw-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(29,179,141,0.45);
          animation: none;
        }
        .hiw-cta-btn:active { transform: translateY(0); }

        /* ── Heading gradient text ─────────────────────── */
        .hiw-heading-gradient {
          background: linear-gradient(270deg, #1DB38D, #72D0C0, #0e9e7a);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: hiw-gradient-shift 4s ease infinite;
        }

        /* ── Floating cards on mobile ──────────────────── */
        @media (max-width: 768px) {
          .hiw-cards { flex-direction: column !important; gap: 40px !important; }
          .hiw-connector { display: none !important; }
          .hiw-card { animation: hiw-float 4s ease-in-out infinite !important; }
          .hiw-card:nth-child(1) { animation-delay: 0s !important; }
          .hiw-card:nth-child(2) { animation-delay: 0.8s !important; }
          .hiw-card:nth-child(3) { animation-delay: 1.6s !important; }
          /* Override float when card is still hidden (opacity 0) */
          .hiw-card[style*="opacity: 0"] { animation: none !important; }
        }

        @media (max-width: 480px) {
          .hiw-card { padding: 36px 20px 28px !important; border-radius: 16px !important; }
          .hiw-cta-btn { padding: 14px 28px; font-size: 15px; }
        }
      `}</style>

      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 24px 72px",
        background: "linear-gradient(135deg, #c8f5e8 0%, #e8fdf6 40%, #f0fffe 60%, #d4f5ed 100%)",
      }}>

        {/* Noise texture overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.5,
        }} />

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Heading block ── */}
          <div
            ref={headingRef}
            style={{
              textAlign: "center",
              marginBottom: "64px",
              opacity: 0,
              transform: "translateY(24px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p style={{
              margin: "0 0 12px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#1DB38D",
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
            }}>
              How It Works
            </p>
            <h2 style={{
              margin: "0 0 16px",
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.15,
            }}>
              <span className="hiw-heading-gradient">Start Earning</span>{" "}
              <span style={{ color: "#0F131E" }}>in 3 Simple Steps</span>
            </h2>
            <p style={{
              margin: 0,
              fontSize: "16px",
              color: "#4b5563",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.7,
            }}>
              Activate your partner link and start earning within<br />
              one business day.
            </p>
          </div>

          {/* ── Step Cards ── */}
          <div
            className="hiw-cards"
            style={{
              display: "flex",
              gap: "48px",
              alignItems: "stretch",
              position: "relative",
            }}
          >
            {steps.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            ref={btnRef}
            style={{
              marginTop: "56px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "14px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.55s ease, transform 0.55s ease",
            }}
          >
            <a href="#" className="hiw-cta-btn">
              Get Started Now!
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p style={{
              margin: 0,
              fontSize: "13px",
              color: "#6b7280",
              fontFamily: "'Poppins', sans-serif",
            }}>
              Takes less than 30 seconds
            </p>
          </div>

        </div>
      </section>
    </>
  );
};

export default HowItWorks;
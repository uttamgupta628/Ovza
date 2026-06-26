import { useEffect, useRef, useState } from "react";

const tiers = [
  {
    id: 1,
    badge: null,
    tier: "BRONZE",
    amount: "$25",
    label: "per company registered",
    referrals: "3–10 referrals",
    defaultSelected: false,
    extra: null,
  },
  {
    id: 2,
    badge: null,
    tier: "SILVER",
    amount: "$35",
    label: "per company registered",
    referrals: "11–25 referrals",
    defaultSelected: false,
    extra: null,
  },
  {
    id: 3,
    badge: "POPULAR",
    tier: "GOLD",
    amount: "$45",
    label: "per company registered",
    referrals: "26–50 referrals",
    defaultSelected: true,
    extra: null,
  },
  {
    id: 4,
    badge: "PREMIUM",
    tier: "PLATINUM",
    amount: "$55",
    label: "per company registered",
    referrals: "51+ referrals",
    defaultSelected: false,
    extra: {
      icon: (
        <svg width="20" height="20" fill="none" stroke="#1DB38D" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: "Dedicated line to OVZA Legal Affairs",
    },
  },
];

// ─── Tier Card ─────────────────────────────────────────────────────────────────
const TierCard = ({
  tier,
  index,
  isSelected,
  onClick,
}: {
  tier: typeof tiers[0];
  index: number;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = isSelected
            ? "translateY(0) scale(1.025)"
            : "translateY(0) scale(1)";
        }, index * 120);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // keep selected card slightly elevated
  useEffect(() => {
    const el = ref.current;
    if (!el || parseFloat(el.style.opacity) === 0) return;
    el.style.transform = isSelected ? "translateY(-6px) scale(1.025)" : "translateY(0) scale(1)";
  }, [isSelected]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    onClick();
  };

  const bgDefault  = "linear-gradient(180deg, #F7F7F7 0%, #EEFCF5 100%)";
  const bgSelected = `
    radial-gradient(ellipse at 50% 30%, #B9F8E0 0%, transparent 65%),
    radial-gradient(ellipse at 80% 80%, #B9F8E0 0%, transparent 55%),
    linear-gradient(180deg, #F7F7F7 0%, #EEFCF5 100%)
  `;

  return (
    <div
      className="ct-card-wrapper"
      style={{ position: "relative", flexShrink: 0, cursor: "pointer" }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {tier.badge && (
        <div style={{
          position: "absolute",
          top: "-16px",
          left: "50%",
          transform: "translateX(-50%)",
          background: tier.badge === "POPULAR" ? "#1DB38D" : "#0F131E",
          color: "white",
          fontSize: "11px",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.12em",
          padding: "4px 18px",
          borderRadius: "50px",
          whiteSpace: "nowrap",
          zIndex: 2,
          boxShadow: "0 2px 10px rgba(29,179,141,0.3)",
          animation: "ct-badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          animationDelay: `${index * 120 + 300}ms`,
        }}>
          {tier.badge}
        </div>
      )}

      {/* Card */}
      <div
        ref={ref}
        className={isSelected ? "ct-card ct-card--selected" : isHovered ? "ct-card ct-card--hovered" : "ct-card"}
        style={{
          minHeight: "385px",
          borderRadius: "26px",
          padding: "28px 24px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "6px",
          opacity: 0,
          transform: "translateY(24px) scale(0.97)",
          transition: "opacity 0.5s ease, transform 0.45s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease, background 0.4s ease, border-color 0.3s ease",
          background: isSelected ? bgSelected : bgDefault,
          border: isSelected
            ? "1.5px solid #1DB38D"
            : isHovered
              ? "1.5px solid rgba(29,179,141,0.4)"
              : "1.5px solid rgba(29,179,141,0.15)",
          boxShadow: isSelected
            ? "0 20px 50px rgba(29,179,141,0.28), 0 4px 12px rgba(29,179,141,0.12)"
            : isHovered
              ? "0 10px 30px rgba(29,179,141,0.15), 0 2px 8px rgba(0,0,0,0.06)"
              : "0 2px 12px rgba(0,0,0,0.04)",
          boxSizing: "border-box" as const,
          userSelect: "none" as const,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer overlay on hover */}
        {isHovered && !isSelected && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 40%, rgba(29,179,141,0.06) 50%, transparent 60%)",
            animation: "ct-shimmer 0.7s ease forwards",
            pointerEvents: "none",
            zIndex: 0,
            borderRadius: "26px",
          }} />
        )}

        {/* Ripple effects */}
        {ripples.map((r) => (
          <span key={r.id} style={{
            position: "absolute",
            left: r.x,
            top: r.y,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "rgba(29,179,141,0.35)",
            transform: "translate(-50%, -50%) scale(0)",
            animation: "ct-ripple 0.6s ease-out forwards",
            pointerEvents: "none",
            zIndex: 0,
          }} />
        ))}

        {/* Content (above shimmer/ripple) */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          {/* Tier label */}
          <p style={{
            margin: "0 0 6px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            color: isSelected ? "#1DB38D" : "#9ca3af",
            fontFamily: "'Poppins', sans-serif",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}>
            {tier.tier}
          </p>

          {/* Amount */}
          <p style={{
            margin: "4px 0 0",
            fontSize: "52px",
            fontWeight: 800,
            color: "#0F131E",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1,
            letterSpacing: "-1px",
            transition: "transform 0.3s ease",
            transform: isSelected ? "scale(1.05)" : "scale(1)",
          }}>
            {tier.amount}
          </p>

          {/* Per company */}
          <p style={{
            margin: "6px 0 0",
            fontSize: "12px",
            color: "#9ca3af",
            fontFamily: "'Poppins', sans-serif",
          }}>
            {tier.label}
          </p>

          {/* Divider */}
          <div style={{
            width: "100%",
            height: "1px",
            background: isSelected ? "rgba(29,179,141,0.25)" : "#e9ecef",
            margin: "20px 0",
            transition: "background 0.3s ease",
          }} />

          {/* Referrals */}
          <p style={{
            margin: 0,
            fontSize: "13px",
            fontWeight: 600,
            color: isSelected ? "#1DB38D" : "#374151",
            fontFamily: "'Poppins', sans-serif",
            transition: "color 0.3s ease",
          }}>
            {tier.referrals}
          </p>

          {/* Platinum extra feature */}
          {tier.extra && (
            <div style={{
              marginTop: "18px",
              background: isSelected ? "rgba(29,179,141,0.12)" : "rgba(29,179,141,0.07)",
              border: `1px solid rgba(29,179,141,${isSelected ? "0.3" : "0.15"})`,
              borderRadius: "12px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textAlign: "left",
              width: "100%",
              transition: "background 0.3s ease, border 0.3s ease",
            }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: "rgba(29,179,141,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {tier.extra.icon}
              </div>
              <p style={{
                margin: 0,
                fontSize: "12px",
                fontWeight: 500,
                color: "#374151",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.5,
              }}>
                {tier.extra.text}
              </p>
            </div>
          )}

          {/* Selected indicator dot */}
          {isSelected && (
            <div style={{
              marginTop: "auto",
              paddingTop: "20px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#1DB38D",
                animation: "ct-pulse-dot 1.5s ease-in-out infinite",
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const CommissionTiers = () => {
  const [selectedId, setSelectedId] = useState(3);
  const headingRef   = useRef<HTMLDivElement>(null);
  const guaranteeRef = useRef<HTMLDivElement>(null);

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
      }, { threshold: 0.1 });
      obs.observe(el);
      return () => obs.disconnect();
    };
    observe(headingRef.current, 0);
    observe(guaranteeRef.current, 600);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        /* ── Keyframes ─────────────────────────────────────── */
        @keyframes ct-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ct-coin-ring {
          animation: ct-spin 8s linear infinite;
          transform-origin: center;
        }

        @keyframes ct-pulse-dot {
          0%, 100% { transform: scale(1);   opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }

        @keyframes ct-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes ct-ripple {
          to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }

        @keyframes ct-badge-pop {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.6); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }

        /* Coin glow pulse */
        @keyframes ct-coin-glow {
          0%, 100% { box-shadow: 0 4px 16px rgba(245,158,11,0.4); }
          50%       { box-shadow: 0 4px 32px rgba(245,158,11,0.75), 0 0 0 8px rgba(245,158,11,0.1); }
        }
        .ct-coin-inner {
          animation: ct-coin-glow 2.4s ease-in-out infinite;
        }

        /* Heading underline draw */
        @keyframes ct-underline-draw {
          from { width: 0; }
          to   { width: 60px; }
        }
        .ct-heading-line {
          display: block;
          height: 3px;
          width: 0;
          background: #1DB38D;
          border-radius: 2px;
          margin: 10px auto 0;
          animation: ct-underline-draw 0.6s 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }

        /* ── Layout ────────────────────────────────────────── */
        .ct-cards {
          display: grid;
          grid-template-columns: repeat(4, 305px);
          gap: 20px;
          justify-content: center;
          padding-top: 24px;
        }

        /* ── Responsive ────────────────────────────────────── */

        /* ≤1340px: 2 columns */
        @media (max-width: 1340px) {
          .ct-cards {
            grid-template-columns: repeat(2, minmax(0, 305px));
          }
          .ct-card-wrapper {
            width: 100% !important;
          }
        }

        /* ≤680px: 1 column */
        @media (max-width: 680px) {
          .ct-cards {
            grid-template-columns: 1fr;
            max-width: 340px;
            margin-left: auto;
            margin-right: auto;
          }
          .ct-card-wrapper {
            width: 100% !important;
          }
        }

        /* Card base — width via grid */
        .ct-card-wrapper {
          width: 305px;
        }
      `}</style>

      <section style={{
        background: "#ffffff",
        padding: "80px 24px 72px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Bg blobs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(185,248,224,0.3) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "260px", height: "260px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(29,179,141,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1320px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* ── Heading ── */}
          <div
            ref={headingRef}
            style={{
              textAlign: "center",
              marginBottom: "48px",
              opacity: 0,
              transform: "translateY(22px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <p style={{
              margin: "0 0 10px",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: "#1DB38D",
              fontFamily: "'Poppins', sans-serif",
              textTransform: "uppercase",
            }}>
              Commission Tiers
            </p>
            <h2 style={{
              margin: "0 0 4px",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              color: "#0F131E",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.2,
            }}>
              Progressive Earnings as You Grow
            </h2>
            {/* animated underline */}
            <span className="ct-heading-line" />
            <p style={{
              margin: "14px 0 0",
              fontSize: "15px",
              color: "#6b7280",
              fontFamily: "'Poppins', sans-serif",
            }}>
              Earn higher commission tiers permanently as your referrals grow.
            </p>
          </div>

          {/* ── Cards ── */}
          <div className="ct-cards">
            {tiers.map((tier, i) => (
              <TierCard
                key={tier.id}
                tier={tier}
                index={i}
                isSelected={selectedId === tier.id}
                onClick={() => setSelectedId(tier.id)}
              />
            ))}
          </div>

          {/* ── Money Guarantee ── */}
          <div
            ref={guaranteeRef}
            style={{
              marginTop: "64px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            {/* Coin + spinning ring */}
            <div style={{ position: "relative", width: "72px", height: "72px" }}>
              <svg width="72" height="72" viewBox="0 0 72 72"
                className="ct-coin-ring"
                style={{ position: "absolute", top: 0, left: 0 }}>
                <circle cx="36" cy="36" r="32" fill="none"
                  stroke="#1DB38D" strokeWidth="3"
                  strokeDasharray="16 8" strokeLinecap="round" />
                <path d="M60 28 L65 36 L55 36"
                  stroke="#1DB38D" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <div
                className="ct-coin-inner"
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "48px", height: "48px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #D97706 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                <span style={{
                  fontSize: "22px", fontWeight: 800,
                  color: "#92400E", fontFamily: "'Poppins', sans-serif", lineHeight: 1,
                }}>$</span>
              </div>
            </div>

            <h3 style={{
              margin: 0, fontSize: "22px", fontWeight: 700,
              color: "#0F131E", fontFamily: "'Poppins', sans-serif",
            }}>
              Money Guarantee
            </h3>
            <p style={{
              margin: 0, fontSize: "14px",
              color: "#6b7280", fontFamily: "'Poppins', sans-serif",
            }}>
              Earn with confidence. As your referrals grow, so do your rewards!
            </p>
            <a
              href="#"
              style={{
                fontSize: "14px", fontWeight: 700,
                color: "#0F131E", fontFamily: "'Poppins', sans-serif",
                textDecoration: "underline", textUnderlineOffset: "3px",
                cursor: "pointer", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#1DB38D")}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#0F131E")}
            >
              Read our policy
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default CommissionTiers;
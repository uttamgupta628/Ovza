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
    defaultSelected: true, // default active
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

  // entrance animation
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0) scale(1)";
        }, index * 120);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // ── Card background from Figma ──────────────────────────────────────────────
  // Default: linear-gradient #F7F7F7 → #EEFCF5
  // Selected: same gradient + radial glow #B9F8E0 at 45%
  const bgDefault  = "linear-gradient(180deg, #F7F7F7 0%, #EEFCF5 100%)";
  const bgSelected = `
    radial-gradient(ellipse at 50% 30%, #B9F8E0 0%, transparent 65%),
    radial-gradient(ellipse at 80% 80%, #B9F8E0 0%, transparent 55%),
    linear-gradient(180deg, #F7F7F7 0%, #EEFCF5 100%)
  `;

  return (
    <div
      style={{
        position: "relative",
        width: "305px",
        flexShrink: 0,
        cursor: "pointer",
      }}
      onClick={onClick}
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
        }}>
          {tier.badge}
        </div>
      )}

      {/* Card */}
      <div
        ref={ref}
        style={{
          width: "305px",
          minHeight: "385px",
          borderRadius: "26px",
          paddingBottom: "130px", // Figma bottom padding
          padding: "28px 24px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "6px",
          opacity: 0,
          transform: "translateY(24px) scale(0.97)",
          transition: "opacity 0.5s ease, transform 0.4s ease, box-shadow 0.3s ease, background 0.4s ease",
          background: isSelected ? bgSelected : bgDefault,
          border: isSelected
            ? "1.5px solid #1DB38D"
            : "1.5px solid rgba(29,179,141,0.15)",
          boxShadow: isSelected
            ? "0 12px 40px rgba(29,179,141,0.22), 0 2px 8px rgba(29,179,141,0.1)"
            : "0 2px 12px rgba(0,0,0,0.04)",
          boxSizing: "border-box" as const,
          userSelect: "none" as const,
        }}
      >
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
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const CommissionTiers = () => {
  const [selectedId, setSelectedId] = useState(3); // GOLD selected by default
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

        @keyframes ct-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .ct-coin-ring {
          animation: ct-spin 8s linear infinite;
          transform-origin: center;
        }

        @keyframes ct-pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.6); opacity: 0.5; }
        }

        .ct-cards {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          padding-top: 24px;
        }

        @media (max-width: 700px) {
          .ct-cards > div { width: 100% !important; }
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
              margin: "0 0 12px",
              fontSize: "clamp(26px, 3.5vw, 40px)",
              fontWeight: 800,
              color: "#0F131E",
              fontFamily: "'Poppins', sans-serif",
              lineHeight: 1.2,
            }}>
              Progressive Earnings as You Grow
            </h2>
            <p style={{
              margin: 0,
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
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "48px", height: "48px", borderRadius: "50%",
                background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #D97706 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
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
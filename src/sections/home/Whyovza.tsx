import React, { useEffect, useRef, useState } from "react";

interface WhyOVZAProps {
  card1Image: string;
  card2Image: string;
  card3Image: string;
  card4Image: string;
  card5Image: string;
  card6Image: string;
}

const cards = [
  {
    key: "card1Image" as const,
    title: "End to End\nOffshore Solutions",
    description:
      "From company setup to bank account opening, we handle everything, so you don't have to.",
  },
  {
    key: "card2Image" as const,
    title: "Global Expertise,\nLocal Insight",
    description:
      "Our team understands the intricacies of international jurisdictions and compliance.",
  },
  {
    key: "card3Image" as const,
    title: "Offshore Banking Access\nMade Simple",
    description:
      "We connect you with reputable banks offering multi-currency accounts and SWIFT capabilities.",
  },
  {
    key: "card4Image" as const,
    title: "Fast & Efficient\nIncorporation",
    description:
      "Launch your offshore company quickly with minimal paperwork and maximum support.",
  },
  {
    key: "card5Image" as const,
    title: "Tailored Structures for\nGlobal Growth",
    description:
      "We help design corporate setups aligned with your business goals and cross-border needs.",
  },
  {
    key: "card6Image" as const,
    title: "Trusted by Entrepreneurs\nWorldwide",
    description:
      "Join clients from 50+ countries who rely on OVZA for secure, strategic offshore solutions.",
  },
];

/* ── Intersection hook ── */
function useInView(threshold = 0.15) {
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

const WhyOVZA: React.FC<WhyOVZAProps> = (props) => {
  const { ref: headerRef, visible: headerVisible } = useInView(0.2);
  // const row1 = cards.slice(0, 3);
  // const row2 = cards.slice(3, 6);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .why-header-anim {
          opacity: 0;
        }
        .why-header-anim.visible {
          animation: fadeUp 0.65s ease forwards;
        }
        .why-card {
          opacity: 0;
          transform: translateY(40px);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .why-card.visible {
          animation: fadeUp 0.6s ease forwards;
        }
        .why-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 16px 40px rgba(0,0,0,0.10) !important;
        }
        .why-card img {
          transition: transform 0.35s ease;
        }
        .why-card:hover img {
          transform: scale(1.06);
        }
      `}</style>

      <section
        style={{ backgroundColor: "#9CEDDE", paddingTop: "80px", paddingBottom: "80px" }}
      >
        <div
          style={{
            maxWidth: "1276px",
            margin: "0 auto",
            paddingLeft: "clamp(20px, 5vw, 118px)",
            paddingRight: "clamp(20px, 5vw, 118px)",
          }}
        >
          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={`why-header-anim text-center mb-12 ${headerVisible ? "visible" : ""}`}
          >
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "#0a1f1a",
                marginBottom: "16px",
                lineHeight: 1.2,
              }}
            >
              Why Work With OVZA?
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#1a4a3a",
                maxWidth: "520px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              OVZA is trusted by global entrepreneurs for reliable offshore company
              formation and international structuring. We work with leading law firms,
              banks, and registrars in 18 jurisdictions to deliver secure, compliant,
              and efficient results.
            </p>
          </div>

          {/* ── Grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "21px",
            }}
            className="why-grid"
          >
            {cards.map((card, idx) => (
              <AnimatedCard
                key={card.key}
                card={card}
                image={props[card.key]}
                delay={idx * 100}
              />
            ))}
          </div>
        </div>

        {/* Responsive grid override */}
        <style>{`
          @media (max-width: 900px) {
            .why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 580px) {
            .why-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  );
};

/* ── Animated Card ── */
interface AnimatedCardProps {
  card: { key: string; title: string; description: string };
  image: string;
  delay: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ card, image, delay }) => {
  const { ref, visible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`why-card ${visible ? "visible" : ""}`}
      style={{
        animationDelay: visible ? `${delay}ms` : "0ms",
        backgroundColor: "rgba(255,255,255,0.55)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255,255,255,0.75)",
        borderRadius: "16px",
        padding: "28px 28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        cursor: "default",
        minHeight: "320px",
      }}
    >
      {/* Illustration */}
      <div style={{ width: "120px", height: "110px", flexShrink: 0, overflow: "hidden" }}>
        <img
          src={image}
          alt={card.title.replace("\n", " ")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Text */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#0a1f1a",
            lineHeight: 1.4,
            whiteSpace: "pre-line",
            margin: 0,
          }}
        >
          {card.title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "#2d5a47",
            lineHeight: 1.65,
            margin: 0,
          }}
        >
          {card.description}
        </p>
      </div>
    </div>
  );
};

export default WhyOVZA;
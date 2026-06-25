import React, { useEffect, useRef, useState } from "react";
import stepOne   from "../../assets/step1.png";
import stepTwo   from "../../assets/step2.png";
import stepThree from "../../assets/step3.png";
import stepFour  from "../../assets/step5.png";

const STEPS = [
  {
    step: "Step 1",
    title: "Submit your proposed company name",
    desc: "Enter your proposed company name, chosen jurisdiction, and contact details. This begins your offshore company name search and ensures we can check offshore company name availability accurately.",
    img: stepOne,
    alt: "Submit company name",
  },
  {
    step: "Step 2",
    title: "We Run the Search",
    desc: "Our legal affairs team performs a detailed offshore company name availability check by reviewing the official registry in your selected jurisdiction. This verifies whether the name is available, restricted, or already taken.",
    img: stepTwo,
    alt: "Run the search",
  },
  {
    step: "Step 3",
    title: "Get Your Result",
    desc: "You will receive the outcome of your free offshore company name check, clearly confirming whether the name can be used. If it is unavailable, we will also recommend suitable alternatives.",
    img: stepThree,
    alt: "Get your result",
  },
  {
    step: "Step 4",
    title: "Proceed With Confidence",
    desc: "If your preferred name is available, you can move forward with reservation or start the incorporation process immediately. A complete offshore company name search gives you clarity before you register your company.",
    img: stepFour,
    alt: "Proceed with confidence",
  },
];

/* Single step row */
const StepRow: React.FC<{
  step: typeof STEPS[0];
  index: number;
  isLast: boolean;
}> = ({ step, index, isLast }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0; // even = card left, img right

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* ── Row ── */}
      <div
        className="snsp-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          gap: "clamp(24px,4vw,64px)",
          marginBottom: "0",
        }}
      >
        {/* Card */}
        <div
          style={{
            order: isEven ? 0 : 1,
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0)"
              : isEven ? "translateX(-40px)" : "translateX(40px)",
            transition: "opacity 0.65s ease, transform 0.65s cubic-bezier(.22,.68,0,1.1)",
          }}
        >
          <div
            className="snsp-card"
            style={{
              background: "linear-gradient(145deg, #e8faf3 0%, #d4f5e9 60%, #c2eedf 100%)",
              border: "1.5px solid rgba(42,168,118,0.18)",
              borderRadius: "20px",
              padding: "clamp(24px,3vw,36px)",
              boxShadow: "0 4px 24px rgba(42,168,118,0.09)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Corner accent */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: "80px", height: "80px",
              background: "rgba(77,217,172,0.12)",
              borderRadius: "0 20px 0 100%",
              pointerEvents: "none",
            }}/>

            <span style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              color: "#2aA876",
              letterSpacing: "1px",
              textTransform: "uppercase",
              background: "rgba(42,168,118,0.12)",
              padding: "3px 10px",
              borderRadius: "999px",
              marginBottom: "12px",
              fontFamily: "'Poppins', sans-serif",
            }}>
              {step.step}
            </span>

            <h3 style={{
              fontSize: "clamp(17px,1.8vw,22px)",
              fontWeight: 800,
              color: "#0b2418",
              margin: "0 0 12px",
              lineHeight: 1.25,
              fontFamily: "'Poppins', sans-serif",
            }}>
              {step.title}
            </h3>

            <p style={{
              fontSize: "clamp(12px,1.1vw,13.5px)",
              color: "#3a5448",
              lineHeight: 1.8,
              margin: "0 0 20px",
              fontFamily: "'Poppins', sans-serif",
            }}>
              {step.desc}
            </p>

            <button
              className="snsp-link-btn"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                color: "#1a6647",
                fontWeight: 600,
                fontSize: "13px",
                fontFamily: "'Poppins', sans-serif",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Get Started
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M8 4l3 3-3 3" stroke="#1a6647" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Illustration */}
        <div
          style={{
            order: isEven ? 1 : 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(0)"
              : isEven ? "translateX(40px)" : "translateX(-40px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(.22,.68,0,1.1) 0.1s",
          }}
        >
          <div style={{ position: "relative", display: "inline-flex" }}>
            {/* Blob behind image */}
            <div style={{
              position: "absolute",
              inset: "-16px",
              borderRadius: "50%",
              background: "rgba(77,217,172,0.15)",
              zIndex: 0,
            }}/>
            <img
              src={step.img}
              alt={step.alt}
              className="snsp-img"
              style={{
                position: "relative",
                zIndex: 1,
                width: "clamp(140px,20vw,260px)",
                objectFit: "contain",
                filter: "drop-shadow(0 8px 24px rgba(42,168,118,0.15))",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Dashed connector ── */}
      {!isLast && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "clamp(20px,3vw,36px) 0",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <svg width="340" height="48" viewBox="0 0 340 48" fill="none" style={{ overflow: "visible" }}>
            {/* Line goes: center-top → side → center-bottom, alternating direction */}
            {isEven ? (
              <path
                d="M170 0 L170 16 Q170 24 200 24 L320 24 Q340 24 340 36 L340 48"
                stroke="#2aA876"
                strokeWidth="1.8"
                strokeDasharray="6 4"
                strokeLinecap="round"
                fill="none"
                opacity="0.45"
              />
            ) : (
              <path
                d="M170 0 L170 16 Q170 24 140 24 L20 24 Q0 24 0 36 L0 48"
                stroke="#2aA876"
                strokeWidth="1.8"
                strokeDasharray="6 4"
                strokeLinecap="round"
                fill="none"
                opacity="0.45"
              />
            )}
            {/* Arrow head */}
            {isEven ? (
              <path d="M336 44l4 4-4 4" stroke="#2aA876" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" transform="translate(0,-4)"/>
            ) : (
              <path d="M4 44l-4 4 4 4" stroke="#2aA876" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" transform="translate(0,-4)"/>
            )}
          </svg>
        </div>
      )}
    </div>
  );
};

/* ── Main ── */
const NameSearchProcess: React.FC = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.2 }
    );
    if (headerRef.current) obs.observe(headerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes nsp-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nsp-imgFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }

        .snsp-visible-header { animation: nsp-fadeUp 0.6s ease both; }
        .snsp-img { animation: nsp-imgFloat 4s ease-in-out infinite; }

        .snsp-link-btn svg {
          transition: transform 0.2s ease;
        }
        .snsp-link-btn:hover svg {
          transform: translateX(4px);
        }
        .snsp-link-btn:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .snsp-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .snsp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(42,168,118,0.16) !important;
        }

        @media (max-width: 680px) {
          .snsp-row {
            grid-template-columns: 1fr !important;
          }
          .snsp-row > div {
            order: unset !important;
          }
          .snsp-row > div:last-child {
            order: -1 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .snsp-img { animation: none !important; }
        }
      `}</style>

      <section
        style={{
          background: "#fff",
          padding: "80px clamp(20px,6vw,100px) 90px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={headerVisible ? "snsp-visible-header" : ""}
          style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,72px)" }}
        >
          <h2 style={{
            fontSize: "clamp(22px,3vw,36px)",
            fontWeight: 800,
            color: "#0b2418",
            lineHeight: 1.2,
            margin: "0 0 16px",
            letterSpacing: "-0.3px",
          }}>
            A Simple, Secure Offshore Name Search Process
          </h2>
          <p style={{
            fontSize: "clamp(12.5px,1.2vw,14px)",
            color: "#4a6659",
            lineHeight: 1.8,
            maxWidth: "520px",
            margin: "0 auto",
          }}>
            Submit your proposed company name and details, and we'll run a confidential
            offshore company name search. Our team performs a quick offshore company name
            availability check and sends you the results of your free offshore company name
            check shortly after.
          </p>
        </div>

        {/* ── Steps ── */}
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          {STEPS.map((step, i) => (
            <StepRow
              key={step.step}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default NameSearchProcess;
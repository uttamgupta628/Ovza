import React, { useEffect, useRef, useState } from "react";

import register0 from "../../assets/register.png";
import register1 from "../../assets/register1.png";
import register2 from "../../assets/register2.png";
import register3 from "../../assets/register3.png";

/* ── useInView hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Steps data ── */
const steps = [
  {
    step: "Step 1",
    title: "Choose Your Jurisdiction",
    desc: "Select from 18 offshore jurisdictions tailored to zero-tax business structures, including Seychelles, BVI, Cayman Islands, and more. OVZA helps you compare the advantages of each jurisdiction so you register the offshore company that fits your goals.",
    image: register0,
    imageAlt: "Choose Jurisdiction illustration",
  },
  {
    step: "Step 2",
    title: "Corporate Structure & Notarization",
    desc: "Decide whether an IBC, offshore LLC, or holding company best suits your business. At this stage, our notary network can notarize your passport and proof of address remotely for USD 250 through a secure, encrypted video call. This ensures your offshore incorporation meets all compliance requirements without hassle.",
    image: register1,
    imageAlt: "Corporate Structure illustration",
  },
  {
    step: "Step 3",
    title: "Company Name & Documentation",
    desc: "Reserve your company name and prepare the required documents. OVZA's streamlined system encrypts and processes your details securely, saving you time and ensuring every filing for your offshore company registration is handled correctly.",
    image: register2,
    imageAlt: "Company Documentation illustration",
  },
  {
    step: "Step 4",
    title: "Incorporation & Bank Account Application",
    desc: "Once your company is incorporated, OVZA provides you with the official formation documents. From there, we assist with offshore bank account applications through our trusted banking partners, ensuring your new offshore company has the financial infrastructure it needs.",
    image: register3,
    imageAlt: "Bank Account illustration",
  },
];

/* ── Dashed connector — straight horizontal line ── */
const DashedConnector: React.FC<{ flip?: boolean }> = () => (
  <div
    style={{
      width: "100%",
      maxWidth: "1262px",
      margin: "12px auto",
      padding: "0 clamp(20px,5vw,80px)",
    }}
  >
    <div
      style={{
        width: "100%",
        borderTop: "2px dashed rgba(52,190,134,0.45)",
      }}
    />
  </div>
);

/* ── Single Step Row ── */
interface StepRowProps {
  step: typeof steps[0];
  index: number;
  isReversed: boolean;
}

const StepRow: React.FC<StepRowProps> = ({ step, isReversed }) => {
  const { ref, visible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`step-row ${visible ? "go" : ""}`}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px,5vw,80px)",
        alignItems: "center",
        animationDelay: "80ms",
        opacity: 0,
      }}
    >
      {/* Card */}
      <div style={{ order: isReversed ? 2 : 1 }}>
        <div
          style={{
            backgroundColor: "#f0fdf8",
            border: "1px solid rgba(52,190,134,0.2)",
            borderRadius: "16px",
            padding: "32px 28px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            minHeight: "280px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#34BE86",
              letterSpacing: "0.04em",
            }}
          >
            {step.step}
          </span>
          <h3
            style={{
              fontSize: "clamp(18px,2vw,24px)",
              fontWeight: 800,
              color: "#0a1f1a",
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {step.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              color: "#4b5563",
              lineHeight: 1.75,
              margin: 0,
              flex: 1,
            }}
          >
            {step.desc}
          </p>
          <div style={{ marginTop: "8px" }}>
            <a
              href="#"
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#34BE86",
                textDecoration: "none",
                borderBottom: "1px solid rgba(52,190,134,0.4)",
                paddingBottom: "1px",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#2aa876")}
              onMouseLeave={e => (e.currentTarget.style.color = "#34BE86")}
            >
              Get Started
            </a>
          </div>
        </div>
      </div>

      {/* Illustration */}
      <div
        style={{
          order: isReversed ? 1 : 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={step.image}
          alt={step.imageAlt}
          style={{
            width: "100%",
            maxWidth: "320px",
            height: "auto",
            objectFit: "contain",
            filter: "drop-shadow(0 8px 24px rgba(52,190,134,0.12))",
          }}
        />
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const RegisterFourSteps: React.FC = () => {
  const { ref: headerRef, visible: headerVisible } = useInView(0.1);

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        padding: "80px 0 100px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        @keyframes rfs-fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rfs-header { opacity: 0; }
        .rfs-header.go { animation: rfs-fadeUp 0.6s ease forwards; }
        .step-row { opacity: 0; }
        .step-row.go { animation: rfs-fadeUp 0.6s ease forwards; }
        @media (max-width: 700px) {
          .step-row {
            grid-template-columns: 1fr !important;
          }
          .step-row > div { order: unset !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1262px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`rfs-header ${headerVisible ? "go" : ""}`}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h2
            style={{
              fontSize: "clamp(24px,3vw,38px)",
              fontWeight: 800,
              color: "#0a1f1a",
              lineHeight: 1.25,
              marginBottom: "16px",
            }}
          >
            Register an Offshore Company in<br />Just Four Steps
          </h2>
          <p
            style={{
              fontSize: "13.5px",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "420px",
              margin: "0 auto",
            }}
          >
            Incorporating offshore doesn't need to be complicated. With OVZA's streamlined process, you can establish a fully compliant offshore company quickly and securely.
          </p>
        </div>

        {/* ── Steps with dashed connectors ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {steps.map((step, idx) => (
            <React.Fragment key={step.step}>
              <StepRow
                step={step}
                index={idx}
                isReversed={idx % 2 !== 0}
              />
              {/* Dashed connector between steps (not after last) */}
              {idx < steps.length - 1 && (
                <DashedConnector flip={idx % 2 !== 0} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegisterFourSteps;
import React, { useEffect, useRef, useState } from "react";

import step1Img from "../../assets/banking1.png";
import step2Img from "../../assets/banking2.png";
import step3Img from "../../assets/banking3.png";
import step4Img from "../../assets/banking4.png";

/* ── useInView hook ── */
function useInView(threshold = 0.1) {
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
    title: "Select Your Banking Partner in the OVZA Network",
    desc: "Choose from the OVZA Network of carefully vetted offshore banks and EMIs. Whether you prefer the prestige of a traditional bank or the agility of a digital-first EMI, selection is guided by criteria such as minimum deposit, account fees, and your company's unique requirements.",
    image: step1Img,
    imageAlt: "Select Banking Partner",
  },
  {
    step: "Step 2",
    title: "Document Preparation and Verification",
    desc: "Because your KYC documents are already on file from incorporation, most banks will not require additional paperwork. Our compliance support ensures all documents meet international banking standards, streamlining approval.",
    image: step2Img,
    imageAlt: "Document Preparation and Verification",
  },
  {
    step: "Step 3",
    title: "Coordination for Bank Meetings",
    desc: "We manage communication and scheduling with your chosen bank or EMI. From arranging due diligence interviews to clarifying compliance requirements, our established relationships simplify the process and maximize approval success.",
    image: step3Img,
    imageAlt: "Coordination for Bank Meetings",
  },
  {
    step: "Step 4",
    title: "Account Approval",
    desc: "Once approved, your account is activated. You'll receive access to online banking, multi-currency facilities, and ongoing support from our banking providers.",
    image: step4Img,
    imageAlt: "Account Approval",
  },
];

/* ── Single Step Row ── */
const StepRow: React.FC<{
  step: typeof steps[0];
  isReversed: boolean;
}> = ({ step, isReversed }) => {
  const { ref, visible } = useInView(0.1);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(32px,5vw,80px)",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
      className="bs-row"
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
            minHeight: "260px",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 600, color: "#34BE86", letterSpacing: "0.04em" }}>
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
        <div
          style={{
            width: "clamp(200px,26vw,320px)",
            height: "clamp(200px,26vw,320px)",
            borderRadius: "50%",
            backgroundColor: "rgba(156,237,222,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={step.image}
            alt={step.imageAlt}
            style={{
              width: "85%",
              height: "85%",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 20px rgba(52,190,134,0.1))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const BankingSteps: React.FC = () => {
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
        @keyframes bs-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .bs-header { opacity: 0; }
        .bs-header.go { animation: bs-fadeUp 0.6s ease forwards; }
        @media (max-width: 700px) {
          .bs-row { grid-template-columns: 1fr !important; }
          .bs-row > div { order: unset !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1262px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          className={`bs-header ${headerVisible ? "go" : ""}`}
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
            Steps to Open an Offshore Bank<br />Account through the OVZA Network
          </h2>
          <p
            style={{
              fontSize: "13.5px",
              color: "#6b7280",
              lineHeight: 1.7,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            Once your offshore company is incorporated, the next stage is securing a bank account.
            Through the OVZA Network, you gain access to a curated selection of leading offshore banks
            and EMIs, ensuring a smooth and efficient setup.
          </p>
        </div>

        {/* ── Steps with dashed connectors ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {steps.map((step, idx) => (
            <React.Fragment key={step.step}>
              <StepRow step={step} isReversed={idx % 2 !== 0} />

              {/* Straight dashed connector between steps */}
              {idx < steps.length - 1 && (
                <div style={{ padding: "12px 0" }}>
                  <div
                    style={{
                      width: "100%",
                      borderTop: "2px dashed rgba(52,190,134,0.45)",
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankingSteps;
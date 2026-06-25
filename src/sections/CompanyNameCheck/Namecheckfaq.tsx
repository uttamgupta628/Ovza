import React, { useState, useRef, useEffect } from "react";

const FAQS = [
  {
    q: "1. How do I check offshore company name availability?",
    a: "You can check offshore company name availability by submitting your proposed name and jurisdiction through our tool. Our team performs an official offshore company name search and sends you a clear result shortly after.",
  },
  {
    q: "2. Is the offshore company name search free?",
    a: "Yes, completely free. There are no hidden charges or obligations. Simply submit your company name and details and we'll run the availability check at no cost to you.",
  },
  {
    q: "3. How accurate is the offshore company name availability check?",
    a: "Our checks are performed directly against the official registry of your chosen jurisdiction. This ensures the highest level of accuracy — you'll know definitively whether your proposed name is available, restricted, or already registered.",
  },
  {
    q: "4. How long does the name search take?",
    a: "Most name searches are completed within 1–2 business days. In many jurisdictions, results are available even sooner. You'll be notified via email as soon as your search is complete.",
  },
  {
    q: "5. What happens if my offshore company name is already taken?",
    a: "If your preferred name is unavailable, we will notify you immediately and suggest suitable alternatives that meet the registry requirements of your chosen jurisdiction. You can then resubmit a new name for a fresh check.",
  },
  {
    q: "6. Will I be able to reserve the name after the check?",
    a: "Yes. Once your name is confirmed as available, we can assist you in reserving it — either as part of the incorporation process or as a standalone name reservation, depending on the jurisdiction's rules.",
  },
  {
    q: "7. Which jurisdictions do you cover for the name availability check?",
    a: "We currently cover 16+ offshore jurisdictions including the British Virgin Islands, Cayman Islands, Seychelles, Panama, Belize, Gibraltar, Malta, Cyprus, Estonia, Singapore, Hong Kong, and more. New jurisdictions are added regularly.",
  },
  {
    q: "8. Is my information kept private during the name search?",
    a: "Absolutely. All information submitted through our name check tool is handled with strict confidentiality. We never share your proposed company name or personal details with third parties outside of the official registry process.",
  },
];

/* Animated FAQ item */
const FAQItem: React.FC<{
  item: typeof FAQS[0];
  index: number;
  visible: boolean;
  isFirst: boolean;
}> = ({ item, index, visible, isFirst }) => {
  const [open, setOpen] = useState(isFirst);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(isFirst ? "auto" : "0px");

  useEffect(() => {
    if (!bodyRef.current) return;
    setHeight(open ? `${bodyRef.current.scrollHeight}px` : "0px");
  }, [open]);

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(42,168,118,0.12)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease ${0.06 + index * 0.055}s,
                     transform 0.5s ease ${0.06 + index * 0.055}s`,
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          background: "none",
          border: "none",
          padding: "18px 0",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <span
          style={{
            fontSize: "clamp(12.5px,1.2vw,13.5px)",
            fontWeight: open ? 600 : 500,
            color: open ? "#0b2418" : "#2e4a3c",
            lineHeight: 1.4,
            transition: "color 0.2s ease, font-weight 0.2s ease",
          }}
        >
          {item.q}
        </span>

        {/* Animated chevron circle */}
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: open
              ? "linear-gradient(135deg,#4DD9AC,#2aA876)"
              : "rgba(42,168,118,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.3s ease, transform 0.35s cubic-bezier(.22,.68,0,1.2)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            boxShadow: open ? "0 4px 12px rgba(42,168,118,0.3)" : "none",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 4l4 4 4-4"
              stroke={open ? "#fff" : "#2aA876"}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer body */}
      <div
        style={{
          overflow: "hidden",
          height,
          transition: "height 0.38s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div ref={bodyRef} style={{ paddingBottom: "18px" }}>
          <p
            style={{
              fontSize: "clamp(12px,1.1vw,13px)",
              color: "#4a6659",
              lineHeight: 1.85,
              margin: 0,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Main ── */
const NameCheckFAQ: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes ncf-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ncf-cardIn {
          from { opacity: 0; transform: translateY(36px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes ncf-blobFloat {
          0%, 100% { transform: scale(1) translate(0,0); }
          50%       { transform: scale(1.06) translate(8px,-8px); }
        }
        @keyframes ncf-blobFloat2 {
          0%, 100% { transform: scale(1) translate(0,0); }
          50%       { transform: scale(0.95) translate(-6px,10px); }
        }

        .ncf-visible .ncf-heading { animation: ncf-fadeUp 0.6s ease both; }
        .ncf-visible .ncf-card    { animation: ncf-cardIn 0.7s cubic-bezier(.22,.68,0,1.05) 0.1s both; }

        .ncf-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .ncf-blob1 { animation: ncf-blobFloat  7s ease-in-out infinite; }
        .ncf-blob2 { animation: ncf-blobFloat2 9s ease-in-out infinite; }
        .ncf-blob3 { animation: ncf-blobFloat  11s ease-in-out infinite reverse; }

        @media (prefers-reduced-motion: reduce) {
          .ncf-blob1, .ncf-blob2, .ncf-blob3 { animation: none !important; }
        }
      `}</style>

      <section
        ref={ref}
        className={visible ? "ncf-visible" : ""}
        style={{
          background: "linear-gradient(150deg, #4DD9AC 0%, #2EC68F 50%, #1EAF7A 100%)",
          padding: "80px clamp(20px,6vw,100px) 90px",
          fontFamily: "'Poppins', sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Background blobs ── */}
        <div className="ncf-blob ncf-blob1" style={{
          top: "-80px", right: "60px",
          width: "260px", height: "260px",
          background: "rgba(255,255,255,0.1)",
        }}/>
        <div className="ncf-blob ncf-blob2" style={{
          bottom: "-60px", left: "-40px",
          width: "200px", height: "200px",
          background: "rgba(255,255,255,0.08)",
        }}/>
        <div className="ncf-blob ncf-blob3" style={{
          top: "35%", right: "-50px",
          width: "140px", height: "140px",
          background: "rgba(255,255,255,0.07)",
        }}/>
        <div className="ncf-blob ncf-blob2" style={{
          top: "10%", left: "5%",
          width: "80px", height: "80px",
          background: "rgba(255,255,255,0.07)",
          animationDelay: "3s",
        }}/>

        {/* ── Heading ── */}
        <h2
          className="ncf-heading"
          style={{
            textAlign: "center",
            fontSize: "clamp(22px,3vw,36px)",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 clamp(28px,4vw,48px)",
            letterSpacing: "-0.3px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Frequently Asked Questions
        </h2>

        {/* ── Accordion Card ── */}
        <div
          className="ncf-card"
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "22px",
            padding: "clamp(16px,3vw,12px) clamp(20px,4vw,40px) clamp(8px,2vw,8px)",
            boxShadow: "0 16px 60px rgba(0,0,0,0.14)",
            position: "relative",
            zIndex: 1,
          }}
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={item.q}
              item={item}
              index={i}
              visible={visible}
              isFirst={i === 0}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default NameCheckFAQ;
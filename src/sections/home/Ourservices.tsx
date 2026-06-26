import React, { useEffect, useRef, useState } from "react";

/* ─── Animation hook: triggers when element enters viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Reduced-motion check ─── */
function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface OurServicesProps {
  containerImage: string;
  container1Image: string;
  container2Image: string;
}

const OurServices: React.FC<OurServicesProps> = ({
  containerImage,
  container1Image,
  container2Image,
}) => {
  const services = [
    {
      imagePosition: "right" as const,
      image: containerImage,
      imageAlt: "Offshore Company Formation",
      icon: <OffshoreIcon />,
      title: "Offshore Company Formation",
      titleBelow: true,
      description: (
        <>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Set up your offshore company with OVZA's efficient and secure offshore
            incorporation services. We specialize in forming international business
            entities across 18 trusted jurisdictions. Our fully digital process ensures
            fast, compliant, and hassle-free registration.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            With OVZA, you'll receive expert guidance, clear documentation, and ongoing
            support to meet international legal and regulatory standards—so you can focus
            on growing your business globally.
          </p>
        </>
      ),
      ctaLabel: "Register your offshore company",
    },
    {
      imagePosition: "left" as const,
      image: container1Image,
      imageAlt: "Bank Account Opening Support",
      icon: <BankIcon />,
      title: "Bank Account Opening Support",
      titleBelow: false,
      description: (
        <>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            OVZA helps you apply for offshore bank accounts through a network of trusted
            international banks and Electronic Money Institutions (EMIs). We match you
            with the right banking partner based on your business profile and
            jurisdiction.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our team provides step-by-step guidance throughout the application process,
            ensuring compliance and efficiency. With OVZA, your offshore finances are
            supported by reliable institutions that value privacy, security, and global
            accessibility.
          </p>
        </>
      ),
      ctaLabel: "Open your offshore bank account",
    },
    {
      imagePosition: "right" as const,
      image: container2Image,
      imageAlt: "Document Notarization",
      icon: <NotarizationIcon />,
      title: "24/7 Document Notarization",
      titleBelow: false,
      description: (
        <>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Certify your proof of identity and proof of address in under 5 minutes
            through OVZA's secure digital notarization system. Our streamlined process
            eliminates the need to visit a lawyer or government office, allowing your
            documents to be notarized efficiently and without delay.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Notarization is a mandatory step for offshore company incorporation and
            international compliance. OVZA ensures your documents are processed
            accurately, securely, and in full alignment with jurisdictional requirements,
            so your incorporation proceeds without interruption.
          </p>
        </>
      ),
      ctaLabel: "Notarize your documents",
    },
  ];

  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const reduced = prefersReducedMotion();

  return (
    <>
      {/* ── Keyframe styles injected once ── */}
      <style>{`
        @keyframes ovza-fade-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ovza-fade-left {
          from { opacity: 0; transform: translateX(-32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ovza-fade-right {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes ovza-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes ovza-pulse-ring {
          0%   { box-shadow: 0 0 0 0px rgba(52,190,134,0.25); }
          70%  { box-shadow: 0 0 0 12px rgba(52,190,134,0); }
          100% { box-shadow: 0 0 0 0px rgba(52,190,134,0); }
        }
        .ovza-card {
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      box-shadow 0.35s ease;
        }
        .ovza-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(52,190,134,0.12);
        }
        .ovza-btn {
          position: relative;
          overflow: hidden;
          transition: background 0.22s ease, transform 0.18s ease, box-shadow 0.22s ease;
        }
        .ovza-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.18);
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .ovza-btn:hover::after { opacity: 1; }
        .ovza-btn:hover {
          background: #2aa876 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(42,168,118,0.38);
        }
        .ovza-btn:active { transform: translateY(0px); }
        .ovza-icon-wrap {
          transition: transform 0.3s ease;
        }
        .ovza-card:hover .ovza-icon-wrap {
          animation: ovza-pulse-ring 1.2s ease-out infinite;
        }
        /* Float animation on image circles */
        .ovza-img-float {
          animation: ovza-float 4s ease-in-out infinite;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .ovza-grid { grid-template-columns: 1fr !important; }
          .ovza-grid-reverse { direction: ltr !important; }
          .ovza-img-col { padding: 24px 24px 0 !important; }
          .ovza-text-col { padding: 24px !important; }
          .ovza-connector { display: none !important; }
          .ovza-connector-mobile {
            display: flex !important;
          }
          .ovza-outer { padding-left: 20px !important; padding-right: 20px !important; }
        }
        @media (max-width: 600px) {
          .ovza-header h2 { font-size: clamp(22px, 5vw, 32px) !important; }
          .ovza-outer { padding-left: 12px !important; padding-right: 12px !important; }
        }

        .ovza-connector-mobile {
          display: none;
          align-items: center;
          justify-content: center;
          height: 60px;
        }
      `}</style>

      <section className="w-full bg-white py-16">
        <div
          className="mx-auto w-full max-w-[1276px] ovza-outer"
          style={{ paddingLeft: "118px", paddingRight: "118px" }}
        >
          {/* ── Section Header with fade-up ── */}
          <div
            ref={headerRef}
            className="text-center mb-14 ovza-header"
            style={
              !reduced
                ? {
                    opacity: headerInView ? 1 : 0,
                    transform: headerInView ? "translateY(0)" : "translateY(28px)",
                    transition: "opacity 0.7s ease, transform 0.7s ease",
                  }
                : {}
            }
          >
            <h2 className="text-[32px] font-bold text-gray-900 mb-3 leading-tight">
              Our Services
            </h2>
            <p className="text-sm text-gray-500 max-w-[480px] mx-auto leading-relaxed">
              Choose OVZA now to ensure a seamless company formation process and legal
              compliance, guaranteeing a smooth experience as you fulfil your company
              objectives effectively.
            </p>
          </div>

          {/* ── Cards ── */}
          <div className="flex flex-col">
            {services.map((service, idx) => (
              <React.Fragment key={service.title}>
                <ServiceCard {...service} index={idx} reduced={reduced} />
                {idx < services.length - 1 && (
                  <>
                    {/* Desktop connector */}
                    <div className="ovza-connector">
                      <DashedConnector />
                    </div>
                    {/* Mobile connector */}
                    <div className="ovza-connector-mobile">
                      <MobileConnector />
                    </div>
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

/* ─── ServiceCard ─── */

interface ServiceCardProps {
  imagePosition: "left" | "right";
  image: string;
  imageAlt: string;
  icon: React.ReactNode;
  title: string;
  titleBelow: boolean;
  description: React.ReactNode;
  ctaLabel: string;
  index: number;
  reduced: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imagePosition,
  image,
  imageAlt,
  icon,
  title,
  titleBelow,
  description,
  ctaLabel,
  index,
  reduced,
}) => {
  const { ref, inView } = useInView(0.12);

  const textAnim = imagePosition === "right" ? "ovza-fade-left" : "ovza-fade-right";
  const imgAnim  = imagePosition === "right" ? "ovza-fade-right" : "ovza-fade-left";
  const delay    = index * 80;

  const textBlock = (
    <div
      className="ovza-text-col flex flex-col justify-center gap-4"
      style={{
        padding: "35px",
        ...(!reduced && inView
          ? {
              animation: `${textAnim} 0.65s ease both`,
              animationDelay: `${delay}ms`,
            }
          : !reduced
          ? { opacity: 0 }
          : {}),
      }}
    >
      <div className="w-8 h-8 flex-shrink-0 ovza-icon-wrap">{icon}</div>
      {titleBelow ? (
        <>
          {description}
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        </>
      ) : (
        <>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          {description}
        </>
      )}
      <div>
        <button
          className="ovza-btn bg-[#34BE86] text-white text-xs font-medium px-5 py-2.5 rounded-full whitespace-nowrap"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );

  const imageBlock = (
    <div
      className="ovza-img-col flex items-center justify-center"
      style={{
        padding: "35px",
        ...(!reduced && inView
          ? {
              animation: `${imgAnim} 0.65s ease both`,
              animationDelay: `${delay + 80}ms`,
            }
          : !reduced
          ? { opacity: 0 }
          : {}),
      }}
    >
      <div className="relative w-full max-w-[260px] aspect-square">
        <div className="absolute inset-0 rounded-full bg-[#E6F7F1]" />
        <img
          src={image}
          alt={imageAlt}
          className={`relative z-10 w-full h-full object-contain${!reduced ? " ovza-img-float" : ""}`}
          style={!reduced ? { animationDelay: `${index * 0.4}s` } : {}}
        />
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className="ovza-card ovza-grid grid rounded-[25px] overflow-hidden bg-white"
      style={{
        border: "1px solid #34BE8647",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {imagePosition === "left" ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

/* ─── Desktop DashedConnector ─── */
const DashedConnector: React.FC = () => (
  <div className="flex items-center justify-center" style={{ height: "117.33px" }}>
    <div style={{ width: "680.5px", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="680" height="118" viewBox="0 0 680 118" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="dashGrad" x1="0" y1="0" x2="680" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#42D4A2" stopOpacity="0.15" />
            <stop offset="50%"  stopColor="#42D4A2" stopOpacity="1" />
            <stop offset="100%" stopColor="#42D4A2" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <line x1="0"   y1="0"   x2="0"   y2="118" stroke="url(#dashGrad)" strokeWidth="4.11" strokeDasharray="9.39 9.39" />
        <line x1="0"   y1="118" x2="680" y2="118"  stroke="url(#dashGrad)" strokeWidth="4.11" strokeDasharray="9.39 9.39" />
        <line x1="680" y1="118" x2="680" y2="0"    stroke="url(#dashGrad)" strokeWidth="4.11" strokeDasharray="9.39 9.39" />
      </svg>
    </div>
  </div>
);

/* ─── Mobile connector: simple short vertical dashed line ─── */
const MobileConnector: React.FC = () => (
  <svg width="4" height="48" viewBox="0 0 4 48" fill="none">
    <line x1="2" y1="0" x2="2" y2="48" stroke="#42D4A2" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
  </svg>
);

/* ─── Icons ─── */
const OffshoreIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#34BE86" strokeWidth="1.5" />
    <path d="M8 14h12M14 8v12" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BankIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="4" y="8" width="20" height="14" rx="2" stroke="#34BE86" strokeWidth="1.5" />
    <path d="M4 12h20" stroke="#34BE86" strokeWidth="1.5" />
    <circle cx="9" cy="17" r="1.5" fill="#34BE86" />
  </svg>
);

const NotarizationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <rect x="5" y="3" width="18" height="22" rx="2" stroke="#34BE86" strokeWidth="1.5" />
    <path d="M9 9h10M9 13h10M9 17h6" stroke="#34BE86" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default OurServices;
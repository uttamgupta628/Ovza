import React from "react";

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

  return (
    <section className="w-full bg-white py-16">
      {/* Fixed 1276px container centred */}
      <div className="mx-auto w-full max-w-[1276px] px-[118px]">

        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-[32px] font-bold text-gray-900 mb-3 leading-tight">
            Our Services
          </h2>
          <p className="text-sm text-gray-500 max-w-[480px] mx-auto leading-relaxed">
            Choose OVZA now to ensure a seamless company formation process and legal
            compliance, guaranteeing a smooth experience as you fulfil your company
            objectives effectively.
          </p>
        </div>

        {/* Cards + Connectors — no connector after last card */}
        <div className="flex flex-col">
          {services.map((service, idx) => (
            <React.Fragment key={service.title}>
              <ServiceCard {...service} />
              {idx < services.length - 1 && <DashedConnector />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
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
}) => {
  const textBlock = (
    <div className="flex flex-col justify-center gap-4 p-[35px]">
      <div className="w-8 h-8 flex-shrink-0">{icon}</div>
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
        <button className="bg-[#34BE86] hover:bg-[#2aa876] text-white text-xs font-medium px-5 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap">
          {ctaLabel}
        </button>
      </div>
    </div>
  );

  const imageBlock = (
    <div className="flex items-center justify-center p-[35px]">
      <div className="relative w-full max-w-[260px] aspect-square">
        <div className="absolute inset-0 rounded-full bg-[#E6F7F1]" />
        <img
          src={image}
          alt={imageAlt}
          className="relative z-10 w-full h-full object-contain"
        />
      </div>
    </div>
  );

  return (
    <div
      className="grid grid-cols-2 rounded-[25px] overflow-hidden bg-white"
      style={{ border: "1px solid #34BE8647" }}
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

/* ─── DashedConnector — full width, linear gradient border from Figma ─── */
// Width: 680.5px centred, Height: 117.33px, Border: 4.11px dashed
// Gradient: #42D4A2 15% → #42D4A2 100% → #42D4A2 15% (fades at edges)

const DashedConnector: React.FC = () => (
  <div className="flex items-center justify-center" style={{ height: "117.33px" }}>
    <div
      style={{
        width: "680.5px",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* SVG dashed line with gradient — simulates the Figma linear gradient border */}
      <svg
        width="680"
        height="118"
        viewBox="0 0 680 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute" }}
      >
        <defs>
          <linearGradient id="dashGrad" x1="0" y1="0" x2="680" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#42D4A2" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#42D4A2" stopOpacity="1" />
            <stop offset="100%" stopColor="#42D4A2" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Left vertical segment */}
        <line
          x1="0" y1="0" x2="0" y2="118"
          stroke="url(#dashGrad)"
          strokeWidth="4.11"
          strokeDasharray="9.39 9.39"
        />
        {/* Bottom horizontal segment */}
        <line
          x1="0" y1="118" x2="680" y2="118"
          stroke="url(#dashGrad)"
          strokeWidth="4.11"
          strokeDasharray="9.39 9.39"
        />
        {/* Right vertical segment */}
        <line
          x1="680" y1="118" x2="680" y2="0"
          stroke="url(#dashGrad)"
          strokeWidth="4.11"
          strokeDasharray="9.39 9.39"
        />
      </svg>
    </div>
  </div>
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
import { useState, useEffect, useRef } from "react";

import blogIcon    from "../../assets/blog-icon.png";
import bookletIcon from "../../assets/booklet-icon.png";
import countryIcon from "../../assets/country-icon.png";
import lawIcon     from "../../assets/law-icon.png";

const countries = [
  "BVI", "Cayman Islands", "Seychelles", "Panama",
  "Hong Kong", "Singapore", "UAE", "Marshall Islands",
  "Belize", "Gibraltar",
];

const resources = [
  {
    id: 1,
    title: "Blog",
    description: "Guides, deep-dives, and expert commentary from the OVZA team.",
    icon: blogIcon,
    href: "#",
  },
  {
    id: 2,
    title: "Booklets",
    description: "Download our service and jurisdiction booklets for offline reference.",
    icon: bookletIcon,
    href: "#",
  },
  {
    id: 3,
    title: "Country Guides",
    description: "In-depth guides to every offshore jurisdiction — costs, structures, and compliance.",
    icon: countryIcon,
    href: "#",
  },
  {
    id: 4,
    title: "Offshore Law Library",
    description: "Legal references and offshore legislation, organised by jurisdiction.",
    icon: lawIcon,
    href: "#",
  },
];

// ─── Resource Card ────────────────────────────────────────────────────────────
const ResourceCard = ({
  resource,
  delay,
}: {
  resource: typeof resources[0];
  delay: number;
}) => (
  <a
    href={resource.href}
    className="res-card group flex flex-col gap-5 bg-white rounded-[18px] p-7 border border-gray-100
      hover:border-[#1DB38D]/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Icon */}
    <div className="w-14 h-14 rounded-2xl bg-[#edfaf6] flex items-center justify-center
      group-hover:bg-[#1DB38D] transition-all duration-300 overflow-hidden p-2">
      <img
        src={resource.icon}
        alt={resource.title}
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
      />
    </div>

    {/* Text */}
    <div>
      <h3
        className="text-[17px] font-bold text-[#0F131E] group-hover:text-[#1DB38D] transition-colors duration-300"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {resource.title}
      </h3>
      <p
        className="mt-2 text-[13px] text-[#0F131E]/55 leading-relaxed"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {resource.description}
      </p>
    </div>
  </a>
);

// ─── LEI Badge ────────────────────────────────────────────────────────────────
const LEIBadge = () => (
  <div className="bg-white rounded-full px-8 py-3 shadow-lg flex items-center gap-3">
    <div className="w-10 h-10 rounded-full bg-[#72D0C0] flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="text-left">
      <div className="text-[28px] font-bold leading-none text-[#68C788]">LEI</div>
      <div className="text-[11px] text-gray-500">Registered</div>
    </div>
  </div>
);

// ─── Chat Widget (matches JurisdictionsHero exactly) ─────────────────────────
// const ChatWidget = () => (
//   <div style={{
//     position: "fixed",
//     bottom: "80px",
//     right: "24px",
//     background: "#ffffff",
//     borderRadius: "16px",
//     boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//     padding: "14px 18px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "12px",
//     minWidth: "160px",
//     zIndex: 100,
//     animation: "chatSlideIn 0.4s 0.8s ease both",
//   }}>
//     <button style={{
//       display: "flex", alignItems: "center", gap: "10px",
//       background: "none", border: "none", cursor: "pointer",
//       fontSize: "13px", fontWeight: 500, color: "#374151",
//       fontFamily: "'Poppins', sans-serif", padding: 0,
//       transition: "color 0.2s",
//     }}
//       onMouseEnter={(e) => (e.currentTarget.style.color = "#3aafa9")}
//       onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
//     >
//       <div style={{
//         width: "28px", height: "28px", borderRadius: "50%",
//         background: "rgba(114,208,192,0.15)",
//         display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//       }}>
//         <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//             d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//         </svg>
//       </div>
//       Chat with us
//     </button>

//     <div style={{ borderTop: "1px solid #f3f4f6" }} />

//     <button style={{
//       display: "flex", alignItems: "center", gap: "10px",
//       background: "none", border: "none", cursor: "pointer",
//       fontSize: "13px", fontWeight: 500, color: "#374151",
//       fontFamily: "'Poppins', sans-serif", padding: 0,
//       transition: "color 0.2s",
//     }}
//       onMouseEnter={(e) => (e.currentTarget.style.color = "#3aafa9")}
//       onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
//     >
//       <div style={{
//         width: "28px", height: "28px", borderRadius: "50%",
//         background: "rgba(114,208,192,0.15)",
//         display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//       }}>
//         <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//             d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//         </svg>
//       </div>
//       Call Us
//     </button>
//   </div>
// );

// ─── Main Section ─────────────────────────────────────────────────────────────
const ResourcesHero = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [companyName, setCompanyName]         = useState("");
  const [visible, setVisible]                 = useState(false);
  const sectionRef                            = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        @keyframes rh-fadeDown {
          from { opacity: 0; transform: translateY(-22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rh-fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rh-cardPop {
          from { opacity: 0; transform: translateY(22px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes rh-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }

        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .rh-heading   { opacity: 0; animation: rh-fadeDown 0.6s ease 0.05s forwards; }
        .rh-frame     { opacity: 0; animation: rh-fadeUp   0.7s ease 0.18s forwards; }
        .rh-searchbar { opacity: 0; animation: rh-fadeUp   0.6s ease 0.38s forwards; }
        .rh-lei       { opacity: 0; animation: rh-fadeUp   0.6s ease 0.48s forwards; }
        .rh-countries { opacity: 0; animation: rh-fadeUp   0.6s ease 0.56s forwards; }

        .res-card {
          opacity: 0;
          animation: rh-cardPop 0.55s ease forwards;
        }

        .rh-blob {
          animation: rh-float 6s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-[#72D0C0] flex flex-col items-center justify-center py-14 md:py-20 px-4 sm:px-6"
      >
        {/* Decorative blobs */}
        <div className="rh-blob pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }} />
        <div className="rh-blob pointer-events-none absolute -bottom-28 -right-24 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #1DB38D 0%, transparent 70%)", animationDelay: "2s" }} />

        {/* ── Heading ── */}
        <div className={`text-center mb-8 relative z-10 ${visible ? "rh-heading" : "opacity-0"}`}>
          <h1
            className="text-[30px] sm:text-[40px] md:text-[52px] font-bold text-[#0F131E] leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Resources
          </h1>
          <p
            className="mt-3 text-[14px] md:text-[16px] text-[#0F131E]/70 max-w-lg mx-auto leading-relaxed"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Everything you need to navigate offshore company formation,
            banking, and compliance — all in one place.
          </p>
        </div>

        {/* ── White Frame — 1276×515 / radius 23px ── */}
        <div
          className={`relative z-10 w-full ${visible ? "rh-frame" : "opacity-0"}`}
          style={{
            maxWidth: "1276px",
            minHeight: "515px",
            background: "#FFFFFF",
            borderRadius: "23px",
            padding: "clamp(20px, 3vw, 40px)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.12)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {resources.map((r, i) => (
              <ResourceCard
                key={r.id}
                resource={r}
                delay={visible ? 280 + i * 110 : 0}
              />
            ))}
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div
          className={`relative z-10 w-full mt-8 ${visible ? "rh-searchbar" : "opacity-0"}`}
          style={{ maxWidth: "1276px" }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col md:flex-row">
            {/* Country */}
            <div className="relative md:w-[220px] md:border-r border-gray-200">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 text-sm text-gray-500 bg-transparent appearance-none outline-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Company name */}
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Type your desired company name here"
              className="flex-1 px-5 py-3 text-sm outline-none text-gray-700"
              style={{ fontFamily: "Poppins, sans-serif" }}
            />

            {/* CTA */}
            <button
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-sm font-semibold px-8 py-3 rounded-xl
                transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Register Your Company
            </button>
          </div>
        </div>

        {/* ── LEI Badge ── */}
        <div className={`mt-8 relative z-10 ${visible ? "rh-lei" : "opacity-0"}`}>
          <LEIBadge />
        </div>

        {/* ── Supported Countries ── */}
        <div className={`mt-5 flex items-center gap-2 relative z-10 ${visible ? "rh-countries" : "opacity-0"}`}>
          <span
            className="font-semibold text-[#0F131E]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Supported Countries
          </span>
          <svg className="w-4 h-4 text-[#0F131E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* ── Chat Widget (fixed, desktop only) ──
        <div className="hidden lg:block">
          <ChatWidget />
        </div> */}

        {/* ── Scroll down button (fixed) ── */}
        {/* <button
          onClick={() => window.scrollBy({ top: 400, behavior: "smooth" })}
          style={{
            position: "fixed",
            bottom: "24px", right: "24px",
            width: "40px", height: "40px",
            borderRadius: "50%",
            background: "#0D1117",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            zIndex: 100, border: "none",
            transition: "transform 0.2s, background 0.2s",
            animation: "chatSlideIn 0.4s 0.9s ease both",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.background = "#1a1a2e";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.background = "#0D1117";
          }}
          className="hidden lg:flex"
        >
          <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button> */}
      </section>
    </>
  );
};

export default ResourcesHero;
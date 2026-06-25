import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ovzaLogo from "../assets/OVZA Logo.png";

// ── Types ─────────────────────────────────────────────────────────────────────
interface DropdownItem {
  label: string;
  href?: string;
  route?: string;
}

interface NavItem {
  label: string;
  href?: string;
  route?: string;
  dropdown?: DropdownItem[];
  megaType?: "services" | "jurisdictions" | "resources";
}

const navItems: NavItem[] = [
  { label: "Services & Tools", route: "/services-and-tools", megaType: "services" },
  { label: "Jurisdictions",    route: "/jurisdictions",       megaType: "jurisdictions" },
  { label: "Resources",        route: "/resources",           megaType: "resources" },
  { label: "Partner",          route: "/partner" },
  { label: "About",            route: "/about" },
];

// ── Mega Menu Data ─────────────────────────────────────────────────────────────
const servicesData = {
  services: [
    {
      label: "Offshore Company Formation",
      route: "/offshore-company-formation",
      desc: "Set up your offshore entity in the right jurisdiction for your goals.",
      icon: (
        <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      ),
    },
    {
      label: "Banking Support",
      route: "/banking",
      desc: "Navigate international banking with expert guidance and introductions.",
      icon: (
        <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
    },
    {
      label: "Document Notarization",
      route: "/notarization",
      desc: "Notarization and certification for official and international use.",
      icon: (
        <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
    },
  ],
  tools: [
    {
      label: "Company Name Checker",
      route: "company-name-checker",
      desc: "Check availability before you register. Free tool.",
      icon: (
        <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      ),
    },
    {
      label: "Jurisdiction Comparison",
      route: "",
      desc: "Compare offshore jurisdictions side by side. Interactive tool.",
      icon: (
        <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
      ),
    },
  ],
};

const jurisdictionsData = {
  americas: [
    { code: "ai", name: "Anguilla" },
    { code: "ag", name: "Antigua and Barbuda" },
    { code: "bs", name: "Bahamas" },
    { code: "bz", name: "Belize" },
    { code: "vg", name: "British Virgin Islands" },
    { code: "ky", name: "Cayman Islands" },
    { code: "cr", name: "Costa Rica" },
    { code: "pa", name: "Panama" },
    { code: "kn", name: "St. Kitts & Nevis" },
    { code: "lc", name: "St. Lucia" },
    { code: "vc", name: "St. Vincent & the Grenadines" },
    { code: "vi", name: "United States Virgin Islands" },
  ],
  asiaPacific: [
    { code: "ck", name: "Cook Islands" },
    { code: "mh", name: "Marshall Islands" },
    { code: "ws", name: "Samoa" },
    { code: "vu", name: "Vanuatu" },
  ],
  africa: [
    { code: "sc", name: "Seychelles" },
    { code: "lr", name: "Liberia" },
  ],
};

const resourcesData = [
  {
    label: "Blog",
    route: "",
    desc: "Guides, deep-dives, and expert commentary from the OVZA team.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
      </svg>
    ),
  },
  {
    label: "Booklets",
    route: "",
    desc: "Download our service and jurisdiction booklets for offline reference.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    label: "Country Guides",
    route: "",
    desc: "In-depth guides to every offshore jurisdiction — costs, structures, and compliance.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
      </svg>
    ),
  },
  {
    label: "Offshore Law Library",
    route: "",
    desc: "Legal references and offshore legislation, organised by jurisdiction.",
    icon: (
      <svg width="28" height="28" fill="none" stroke="#0D9D8A" strokeWidth="1.6" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
    ),
  },
];

// ── Styles ─────────────────────────────────────────────────────────────────────
const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  .ovza-nav {
    background-color: #0D1117 !important;
    position: sticky;
    top: 0;
    z-index: 999;
    width: 100%;
    box-shadow: 0 2px 20px rgba(0,0,0,0.4);
    font-family: 'Poppins', sans-serif;
  }
  .ovza-nav-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @keyframes navSlideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
  }
  .ovza-nav { animation: navSlideDown 0.4s ease forwards; }

  @keyframes dropFade {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ovza-navlink {
    position: relative;
    color: #c9d1d9;
    font-size: 14px;
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 8px;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    transition: color 0.2s;
    text-decoration: none;
    white-space: nowrap;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-navlink::after {
    content: '';
    position: absolute;
    bottom: 2px; left: 12px; right: 12px;
    height: 2px;
    background: #72D0C0;
    border-radius: 2px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.22s ease;
  }
  .ovza-navlink:hover        { color: #ffffff; }
  .ovza-navlink:hover::after { transform: scaleX(1); }
  .ovza-navlink.active        { color: #72D0C0; }
  .ovza-navlink.active::after { transform: scaleX(1); }

  .ovza-track-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 7px 18px;
    font-size: 13px; font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #0D9D8A;
    background-color: transparent;
    border: 1.5px solid #0D9D8A;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.15s;
  }
  .ovza-track-btn:hover { background: rgba(13,157,138,0.1); transform: translateY(-1px); }

  .ovza-contact-btn {
    font-size: 14px; font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 8px;
    background: none; border: none; cursor: pointer;
    transition: color 0.2s, background 0.2s;
  }
  .ovza-contact-btn:hover { color: #72D0C0; background: rgba(114,208,192,0.08); }

  .ovza-mega-panel {
    position: fixed;
    left: 0; right: 0;
    top: 64px;
    background: #ffffff;
    border-top: 3px solid #0D9D8A;
    box-shadow: 0 12px 40px rgba(0,0,0,0.12);
    z-index: 998;
    animation: dropFade 0.18s ease forwards;
  }
  .ovza-mega-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 32px 32px 36px;
  }
  .ovza-mega-section-title {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #888; margin: 0 0 16px;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-services-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 14px; margin-bottom: 28px;
  }
  .ovza-tools-grid {
    display: grid; grid-template-columns: repeat(2,1fr); gap: 14px;
  }
  .ovza-service-card {
    display: flex; flex-direction: column; gap: 10px;
    padding: 20px;
    border: 1.5px solid #e8ecf0; border-radius: 14px;
    cursor: pointer;
    transition: border-color 0.18s, box-shadow 0.18s, transform 0.15s;
    background: #fff; text-align: left; text-decoration: none;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-service-card:hover {
    border-color: #72D0C0;
    box-shadow: 0 4px 20px rgba(114,208,192,0.15);
    transform: translateY(-2px);
  }
  .ovza-service-card-icon {
    width: 48px; height: 48px; border-radius: 10px;
    background: rgba(13,157,138,0.07);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ovza-service-card h4 {
    font-size: 14px; font-weight: 700; color: #111; margin: 0 0 4px;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-service-card p {
    font-size: 12.5px; color: #666; margin: 0; line-height: 1.5;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-mega-divider { border: none; border-top: 1px solid #eef0f3; margin: 0 0 24px; }

  .ovza-juris-col { padding: 0 32px 0 0; }
  .ovza-juris-col:last-child { padding-right: 0; }
  .ovza-juris-col-title {
    font-size: 15px; font-weight: 700; color: #111; margin: 0 0 16px;
    font-family: 'Poppins', sans-serif;
    padding-bottom: 10px; border-bottom: 2px solid #0D9D8A; display: inline-block;
  }
  .ovza-juris-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
  .ovza-juris-list.single-col { grid-template-columns: 1fr; }
  .ovza-juris-list li {
    display: flex; align-items: center; gap: 8px;
    padding: 7px 8px; font-size: 13px; color: #444;
    font-family: 'Poppins', sans-serif;
    border-radius: 6px; cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .ovza-juris-list li:hover { background: rgba(13,157,138,0.06); color: #0D9D8A; }
  .ovza-juris-divider { width: 1px; background: #eef0f3; margin: 0 32px; align-self: stretch; }

  .ovza-resources-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; }
  .ovza-resource-card {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 20px; border: 1.5px solid #e8ecf0; border-radius: 14px;
    cursor: pointer; transition: border-color 0.18s, box-shadow 0.18s, transform 0.15s;
    background: #fff; text-align: left; text-decoration: none;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-resource-card:hover {
    border-color: #72D0C0; box-shadow: 0 4px 20px rgba(114,208,192,0.15); transform: translateY(-2px);
  }
  .ovza-resource-card-icon {
    width: 46px; height: 46px; border-radius: 10px;
    background: rgba(13,157,138,0.07);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .ovza-resource-card h4 { font-size: 14px; font-weight: 700; color: #111; margin: 0 0 4px; font-family: 'Poppins', sans-serif; }
  .ovza-resource-card p  { font-size: 12.5px; color: #666; margin: 0; line-height: 1.5; font-family: 'Poppins', sans-serif; }

  .ovza-mobile-menu {
    background-color: #0D1117;
    border-top: 1px solid rgba(255,255,255,0.07);
    padding: 16px 24px 24px;
  }
  @keyframes mobileSlide {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ovza-mobile-menu { animation: mobileSlide 0.2s ease forwards; }
  .ovza-mobile-sub { padding: 8px 16px 4px; border-left: 2px solid rgba(114,208,192,0.3); margin: 4px 0 8px 12px; }
  .ovza-mobile-sub a, .ovza-mobile-sub button {
    display: block; padding: 6px 0; font-size: 13px; color: #8b949e;
    background: none; border: none; cursor: pointer;
    font-family: 'Poppins', sans-serif; transition: color 0.15s; text-align: left;
    text-decoration: none; width: 100%;
  }
  .ovza-mobile-sub a:hover, .ovza-mobile-sub button:hover { color: #72D0C0; }
  .ovza-mobile-sub-label {
    font-size: 11px; color: #555; padding: 6px 0 2px;
    font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em;
    font-family: 'Poppins', sans-serif;
  }

  .ovza-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
    z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 16px;
  }
  @keyframes modalPop {
    from { opacity: 0; transform: scale(0.95) translateY(8px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);   }
  }
  .ovza-modal {
    background: #ffffff; border-radius: 16px; width: 100%; max-width: 360px;
    padding: 32px 28px 28px; position: relative;
    animation: modalPop 0.22s ease forwards;
    font-family: 'Poppins', sans-serif;
  }
  .ovza-modal-close {
    position: absolute; top: 14px; right: 16px;
    background: none; border: none; font-size: 20px; color: #555;
    cursor: pointer; line-height: 1; padding: 4px; transition: color 0.15s;
  }
  .ovza-modal-close:hover { color: #000; }
  .ovza-modal-logo { display: flex; align-items: center; margin-bottom: 20px; }
  .ovza-modal-logo img { height: 32px; width: auto; filter: invert(1); }
  .ovza-modal-icon {
    width: 56px; height: 56px; border-radius: 50%;
    border: 2px solid #72D0C0;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
  }
  .ovza-modal h2 { font-size: 22px; font-weight: 700; color: #111; text-align: center; margin: 0 0 6px; font-family: 'Poppins', sans-serif; }
  .ovza-modal p  { font-size: 13px; color: #666; text-align: center; margin: 0 0 24px; line-height: 1.5; font-family: 'Poppins', sans-serif; }
  .ovza-modal-label { font-size: 11px; font-weight: 600; letter-spacing: 0.06em; color: #888; text-transform: uppercase; display: block; margin-bottom: 6px; }
  .ovza-modal-input {
    width: 100%; padding: 11px 14px; font-size: 14px;
    font-family: 'Poppins', sans-serif;
    border: 1.5px solid #e0e0e0; border-radius: 8px; outline: none;
    margin-bottom: 16px; box-sizing: border-box; transition: border-color 0.2s;
    color: #111; background: #fafafa;
  }
  .ovza-modal-input:focus { border-color: #72D0C0; background: #fff; }
  .ovza-modal-submit {
    width: 100%; padding: 13px; font-size: 14px; font-weight: 600;
    font-family: 'Poppins', sans-serif; color: #fff; background: #72D0C0;
    border: none; border-radius: 10px; cursor: pointer;
    transition: background 0.2s, transform 0.15s; margin-top: 4px;
  }
  .ovza-modal-submit:hover { background: #5BBCAC; transform: translateY(-1px); }
  .ovza-modal-footer { text-align: center; margin-top: 14px; font-size: 12px; color: #888; }
  .ovza-modal-footer a { color: #72D0C0; font-weight: 600; text-decoration: none; }
  .ovza-modal-footer a:hover { text-decoration: underline; }

  .ovza-desktop { display: flex; }
  .ovza-mobile-toggle { display: none; }
  @media (max-width: 768px) {
    .ovza-desktop { display: none !important; }
    .ovza-mobile-toggle { display: flex !important; }
  }
`;

// ── Small helpers ──────────────────────────────────────────────────────────────
const ChevronDown = ({ open }: { open?: boolean }) => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
  </svg>
);

const NavGlobeIcon = () => (
  <svg width="14" height="14" fill="none" stroke="#0D9D8A" strokeWidth="1.8" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
  </svg>
);

const FlagImg = ({ code, name }: { code: string; name: string }) => (
  <img
    src={`https://flagcdn.com/w40/${code}.png`}
    srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
    width="28" height="20" alt={name}
    style={{ width: "22px", height: "15px", objectFit: "cover", borderRadius: "2px", flexShrink: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }}
  />
);

// ── Mega: Services ─────────────────────────────────────────────────────────────
const ServicesMega = ({ onClose }: { onClose: () => void }) => (
  <div className="ovza-mega-inner">
    <p className="ovza-mega-section-title">Our Services</p>
    <div className="ovza-services-grid">
      {servicesData.services.map((s) => (
        s.route ? (
          <Link key={s.label} to={s.route} className="ovza-service-card" onClick={onClose}>
            <div className="ovza-service-card-icon">{s.icon}</div>
            <div><h4>{s.label}</h4><p>{s.desc}</p></div>
          </Link>
        ) : (
          <button key={s.label} className="ovza-service-card" onClick={onClose}>
            <div className="ovza-service-card-icon">{s.icon}</div>
            <div><h4>{s.label}</h4><p>{s.desc}</p></div>
          </button>
        )
      ))}
    </div>
    <hr className="ovza-mega-divider"/>
    <p className="ovza-mega-section-title">Tools</p>
    <div className="ovza-tools-grid">
      {servicesData.tools.map((t) => (
        t.route ? (
          <Link key={t.label} to={t.route} className="ovza-service-card" onClick={onClose}>
            <div className="ovza-service-card-icon">{t.icon}</div>
            <div><h4>{t.label}</h4><p>{t.desc}</p></div>
          </Link>
        ) : (
          <button key={t.label} className="ovza-service-card" onClick={onClose}>
            <div className="ovza-service-card-icon">{t.icon}</div>
            <div><h4>{t.label}</h4><p>{t.desc}</p></div>
          </button>
        )
      ))}
    </div>
  </div>
);

// ── Mega: Jurisdictions ────────────────────────────────────────────────────────
const JurisdictionsMega = ({ onClose }: { onClose: () => void }) => (
  <div className="ovza-mega-inner">
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div className="ovza-juris-col" style={{ flex: 1 }}>
        <div className="ovza-juris-col-title">The Americas</div>
        <ul className="ovza-juris-list" style={{ marginTop: "12px" }}>
          {jurisdictionsData.americas.map((j) => (
            <li key={j.code} onClick={onClose}>
              <FlagImg code={j.code} name={j.name}/>{j.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="ovza-juris-divider"/>
      <div className="ovza-juris-col" style={{ minWidth: "180px" }}>
        <div className="ovza-juris-col-title">Asia Pacific</div>
        <ul className="ovza-juris-list single-col" style={{ marginTop: "12px" }}>
          {jurisdictionsData.asiaPacific.map((j) => (
            <li key={j.code} onClick={onClose}>
              <FlagImg code={j.code} name={j.name}/>{j.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="ovza-juris-divider"/>
      <div className="ovza-juris-col" style={{ minWidth: "160px" }}>
        <div className="ovza-juris-col-title">Africa</div>
        <ul className="ovza-juris-list single-col" style={{ marginTop: "12px" }}>
          {jurisdictionsData.africa.map((j) => (
            <li key={j.code} onClick={onClose}>
              <FlagImg code={j.code} name={j.name}/>{j.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ── Mega: Resources ────────────────────────────────────────────────────────────
const ResourcesMega = ({ onClose }: { onClose: () => void }) => (
  <div className="ovza-mega-inner">
    <div className="ovza-resources-grid">
      {resourcesData.map((r) => (
        r.route ? (
          <Link key={r.label} to={r.route} className="ovza-resource-card" onClick={onClose}>
            <div className="ovza-resource-card-icon">{r.icon}</div>
            <div><h4>{r.label}</h4><p>{r.desc}</p></div>
          </Link>
        ) : (
          <button key={r.label} className="ovza-resource-card" onClick={onClose}>
            <div className="ovza-resource-card-icon">{r.icon}</div>
            <div><h4>{r.label}</h4><p>{r.desc}</p></div>
          </button>
        )
      ))}
    </div>
  </div>
);

// ── Track Order Modal ──────────────────────────────────────────────────────────
const TrackOrderModal = ({ onClose }: { onClose: () => void }) => {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="ovza-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ovza-modal">
        <button className="ovza-modal-close" onClick={onClose}>×</button>
        <div className="ovza-modal-logo"><img src={ovzaLogo} alt="OVZA"/></div>
        <div className="ovza-modal-icon">
          <svg width="26" height="26" fill="none" stroke="#72D0C0" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
        </div>
        <h2>Track Your Order</h2>
        <p>Enter your details to access your<br/>dashboard</p>
        <label className="ovza-modal-label">Order Identifier</label>
        <input className="ovza-modal-input" type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)}/>
        <label className="ovza-modal-label">Email Address</label>
        <input className="ovza-modal-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <button className="ovza-modal-submit">Open Dashboard</button>
        <div className="ovza-modal-footer">Lost your ID? <a href="#">CLICK HERE</a></div>
      </div>
    </div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [openMega, setOpenMega]             = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [trackModalOpen, setTrackModalOpen] = useState(false);
  const navRef     = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate   = useNavigate();
  const location   = useLocation();

  useEffect(() => {
    const id = "ovza-nav-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id; el.textContent = navStyles;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        const megaPanel = document.querySelector(".ovza-mega-panel");
        if (megaPanel && megaPanel.contains(e.target as Node)) return;
        setOpenMega(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setOpenMega(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 120);
  };

  const handleMegaEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(label);
  };

  const closeMega = () => setOpenMega(null);

  const isActive = (route?: string) =>
    route ? location.pathname === route || location.pathname.startsWith(route + "/") : false;

  const renderMega = (type: string) => {
    if (type === "services")      return <ServicesMega      onClose={closeMega}/>;
    if (type === "jurisdictions") return <JurisdictionsMega onClose={closeMega}/>;
    if (type === "resources")     return <ResourcesMega     onClose={closeMega}/>;
    return null;
  };

  return (
    <>
      <nav ref={navRef} className="ovza-nav">
        <div className="ovza-nav-inner">

          {/* Logo */}
          <div onClick={() => navigate("/")} style={{ flexShrink: 0, display: "flex", alignItems: "center", cursor: "pointer" }}>
            <img src={ovzaLogo} alt="OVZA" style={{ height: "36px", width: "auto" }}/>
          </div>

          {/* Desktop nav links */}
          <div className="ovza-desktop" style={{ alignItems: "center", gap: "2px" }}>
            {navItems.map((item) => (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => item.megaType ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={() => item.megaType ? handleMouseLeave() : undefined}
              >
                <button
                  className={`ovza-navlink${isActive(item.route) ? " active" : ""}`}
                  onClick={() => {
                    if (item.megaType) {
                      setOpenMega((prev) => prev === item.label ? null : item.label);
                    } else {
                      if (item.route) navigate(item.route);
                      setOpenMega(null);
                    }
                  }}
                >
                  {item.label}
                  {item.megaType && <ChevronDown open={openMega === item.label}/>}
                </button>
              </div>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="ovza-desktop" style={{ alignItems: "center", gap: "10px" }}>
            <button className="ovza-track-btn" onClick={() => setTrackModalOpen(true)}>
              <NavGlobeIcon /> Track Order
            </button>
            <button className="ovza-contact-btn" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="ovza-mobile-toggle"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", color: "#c9d1d9", cursor: "pointer", padding: "8px" }}
          >
            {mobileOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="ovza-mobile-menu">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className={`ovza-navlink${isActive(item.route) ? " active" : ""}`}
                  style={{ width: "100%", justifyContent: "space-between", marginBottom: "2px" }}
                  onClick={() => {
                    if (item.megaType) {
                      setMobileExpanded((p) => p === item.label ? null : item.label);
                    } else {
                      if (item.route) navigate(item.route);
                      setMobileOpen(false);
                    }
                  }}
                >
                  {item.label}
                  {item.megaType && <ChevronDown open={mobileExpanded === item.label}/>}
                </button>

                {item.megaType === "services" && mobileExpanded === item.label && (
                  <div className="ovza-mobile-sub">
                    {servicesData.services.map((s) => (
                      s.route ? (
                        <Link key={s.label} to={s.route} onClick={() => setMobileOpen(false)}>{s.label}</Link>
                      ) : (
                        <button key={s.label} onClick={() => setMobileOpen(false)}>{s.label}</button>
                      )
                    ))}
                    <div className="ovza-mobile-sub-label">Tools</div>
                    {servicesData.tools.map((t) => (
                      t.route ? (
                        <Link key={t.label} to={t.route} onClick={() => setMobileOpen(false)}>{t.label}</Link>
                      ) : (
                        <button key={t.label} onClick={() => setMobileOpen(false)}>{t.label}</button>
                      )
                    ))}
                  </div>
                )}

                {item.megaType === "jurisdictions" && mobileExpanded === item.label && (
                  <div className="ovza-mobile-sub">
                    {[
                      { title: "The Americas", list: jurisdictionsData.americas },
                      { title: "Asia Pacific",  list: jurisdictionsData.asiaPacific },
                      { title: "Africa",        list: jurisdictionsData.africa },
                    ].map(({ title, list }) => (
                      <div key={title}>
                        <div className="ovza-mobile-sub-label">{title}</div>
                        {list.map((j) => (
                          <button key={j.code} onClick={() => setMobileOpen(false)} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <FlagImg code={j.code} name={j.name}/> {j.name}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {item.megaType === "resources" && mobileExpanded === item.label && (
                  <div className="ovza-mobile-sub">
                    {resourcesData.map((r) => (
                      r.route ? (
                        <Link key={r.label} to={r.route} onClick={() => setMobileOpen(false)}>{r.label}</Link>
                      ) : (
                        <button key={r.label} onClick={() => setMobileOpen(false)}>{r.label}</button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <button
                className="ovza-track-btn"
                style={{ justifyContent: "center" }}
                onClick={() => { setMobileOpen(false); setTrackModalOpen(true); }}
              >
                <NavGlobeIcon /> Track Order
              </button>
              <button
                className="ovza-contact-btn"
                style={{ border: "1px solid rgba(255,255,255,0.15)", borderRadius: "8px", justifyContent: "center" }}
                onClick={() => { setMobileOpen(false); navigate("/contact"); }}
              >
                Contact Us
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mega dropdown panels — portalled to body */}
      {navItems.map((item) =>
        item.megaType && openMega === item.label
          ? createPortal(
              <div
                key={item.label}
                className="ovza-mega-panel"
                onMouseEnter={() => handleMegaEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {renderMega(item.megaType)}
              </div>,
              document.body
            )
          : null
      )}

      {/* Track Order Modal */}
      {trackModalOpen && <TrackOrderModal onClose={() => setTrackModalOpen(false)}/>}
    </>
  );
};

export default Navbar;
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ovzaLogo from "../assets/OVZA Logo.png";

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
}

const navItems: NavItem[] = [
  {
    label: "Services & Tools",
    route: "/services-and-tools",
    dropdown: [
      { label: "Company Formation",  href: "#" },
      { label: "Bank Account Opening", href: "#" },
      { label: "Registered Agent",   href: "#" },
      { label: "Virtual Office",     href: "#" },
      { label: "Compliance Tools",   href: "#" },
    ],
  },
  {
    label: "Jurisdictions",
    route: "/jurisdictions",
    dropdown: [
      { label: "BVI",            href: "#" },
      { label: "Cayman Islands", href: "#" },
      { label: "Seychelles",     href: "#" },
      { label: "Panama",         href: "#" },
      { label: "Hong Kong",      href: "#" },
      { label: "Singapore",      href: "#" },
    ],
  },
  {
    // Resources now has a direct route — clicking navigates, no dropdown
    label: "Resources",
    route: "/resources",
    dropdown: [
      { label: "Blog",      href: "#" },
      { label: "FAQs",      href: "#" },
      { label: "Guides",    href: "#" },
      { label: "Webinars",  href: "#" },
    ],
  },
  { label: "Partner", href: "#" },
  { label: "About",   href: "#"  },
];

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

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
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ovza-dropdown { animation: dropFade 0.18s ease forwards; }

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
  .ovza-navlink:hover            { color: #ffffff; }
  .ovza-navlink:hover::after     { transform: scaleX(1); }
  .ovza-navlink.active           { color: #72D0C0; }
  .ovza-navlink.active::after    { transform: scaleX(1); }

  .ovza-track-btn {
    display: flex; align-items: center; gap: 6px;
    padding: 6px 14px;
    font-size: 12px; font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #0D1117;
    background-color: #72D0C0;
    border: 1.5px solid #72D0C0;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.15s;
  }
  .ovza-track-btn:hover {
    background-color: #5BBCAC;
    border-color: #5BBCAC;
    transform: translateY(-1px);
  }

  .ovza-contact {
    font-size: 14px; font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .ovza-contact:hover {
    color: #72D0C0;
    background: rgba(114,208,192,0.08);
  }

  .ovza-dropdown-panel {
    position: absolute;
    top: calc(100% + 8px); left: 0;
    min-width: 210px;
    background: #161b22;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 6px 0;
    box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    z-index: 999;
  }
  .ovza-dropdown-item {
    display: flex; align-items: center;
    padding: 10px 16px;
    font-size: 13px; font-weight: 500;
    color: #c9d1d9;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    background: none; border: none;
    width: 100%;
    text-align: left;
  }
  .ovza-dropdown-item:hover {
    background: rgba(114,208,192,0.1);
    color: #72D0C0;
  }

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
`;

const ChevronDown = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  </svg>
);

const Navbar = () => {
  const [openDropdown, setOpenDropdown]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const navRef                            = useRef<HTMLDivElement>(null);
  const navigate                          = useNavigate();
  const location                          = useLocation();

  // Inject styles once
  useEffect(() => {
    const id = "ovza-nav-styles";
    if (!document.getElementById(id)) {
      const styleEl = document.createElement("style");
      styleEl.id = id;
      styleEl.textContent = navStyles;
      document.head.appendChild(styleEl);
    }
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = (route?: string, href?: string) => {
    setOpenDropdown(null);
    setMobileOpen(false);
    if (route) navigate(route);
    else if (href && href !== "#") window.location.href = href;
  };

  const isActive = (route?: string) =>
    route ? location.pathname === route : false;

  // ── Desktop nav item ──────────────────────────────────────────────────────
  const renderDesktopItem = (item: NavItem) => {
    // Has a direct route → clicking navigates; chevron toggles dropdown
    if (item.route && item.dropdown) {
      return (
        <div key={item.label} style={{ position: "relative" }}>
          <button
            className={`ovza-navlink ${isActive(item.route) ? "active" : ""}`}
            onClick={() => handleNavClick(item.route)}
            onMouseEnter={() => setOpenDropdown(item.label)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {item.label}
            <ChevronDown />
          </button>

          {openDropdown === item.label && (
            <div
              className="ovza-dropdown ovza-dropdown-panel"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.dropdown.map((sub) => (
                <button
                  key={sub.label}
                  className="ovza-dropdown-item"
                  onClick={() => handleNavClick(sub.route, sub.href)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Dropdown only (no route)
    if (item.dropdown) {
      return (
        <div key={item.label} style={{ position: "relative" }}>
          <button
            className="ovza-navlink"
            onClick={() => setOpenDropdown((p) => (p === item.label ? null : item.label))}
          >
            {item.label}
            <ChevronDown />
          </button>

          {openDropdown === item.label && (
            <div className="ovza-dropdown ovza-dropdown-panel">
              {item.dropdown.map((sub) => (
                <button
                  key={sub.label}
                  className="ovza-dropdown-item"
                  onClick={() => handleNavClick(sub.route, sub.href)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Plain link
    return (
      <button
        key={item.label}
        className={`ovza-navlink ${isActive(item.route) ? "active" : ""}`}
        onClick={() => handleNavClick(item.route, item.href)}
      >
        {item.label}
      </button>
    );
  };

  return (
    <nav ref={navRef} className="ovza-nav">
      <div className="ovza-nav-inner">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          style={{ flexShrink: 0, display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img src={ovzaLogo} alt="OVZA" style={{ height: "36px", width: "auto" }} />
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="hidden md:flex">
          {navItems.map(renderDesktopItem)}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden md:flex">
          <button className="ovza-track-btn">
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd" />
            </svg>
            Track Order
          </button>
          <a href="#" className="ovza-contact">Contact Us</a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen((p) => !p)}
          aria-label="Toggle menu"
          style={{ background: "none", border: "none", color: "#c9d1d9", cursor: "pointer", padding: "8px" }}
        >
          {mobileOpen ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="ovza-mobile-menu md:hidden">
          {navItems.map((item) => (
            <div key={item.label}>
              <button
                className={`ovza-navlink ${isActive(item.route) ? "active" : ""}`}
                style={{ width: "100%", justifyContent: "space-between", marginBottom: "2px" }}
                onClick={() => {
                  if (item.route) {
                    handleNavClick(item.route);
                  } else if (item.dropdown) {
                    setOpenDropdown((p) => (p === item.label ? null : item.label));
                  } else {
                    handleNavClick(item.route, item.href);
                  }
                }}
              >
                {item.label}
                {item.dropdown && <ChevronDown />}
              </button>

              {/* Mobile sub-items — only for dropdown-only items */}
              {item.dropdown && !item.route && openDropdown === item.label && (
                <div style={{ paddingLeft: "16px", marginBottom: "4px" }}>
                  {item.dropdown.map((sub) => (
                    <button
                      key={sub.label}
                      className="ovza-dropdown-item"
                      style={{ borderRadius: "8px" }}
                      onClick={() => handleNavClick(sub.route, sub.href)}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <button className="ovza-track-btn" style={{ justifyContent: "center" }}>
              Track Order
            </button>
            <a href="#" className="ovza-contact" style={{ textAlign: "center" }}>Contact Us</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
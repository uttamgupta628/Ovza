import { useRef, useEffect, useState } from "react";
import worldImg from "../../assets/world.png";

const pins = [
  { code: "bs", name: "Bahamas",               x: 78.5, y: 52 },
  { code: "ky", name: "Cayman Islands",         x: 75.5, y: 57 },
  { code: "bz", name: "Belize",                 x: 72,   y: 59 },
  { code: "pa", name: "Panama",                 x: 76,   y: 67 },
  { code: "sc", name: "Seychelles",             x: 8,    y: 72 },
  { code: "vg", name: "British Virgin Islands", x: 83,   y: 60, count: 7 },
  { code: "lc", name: "St. Lucia",              x: 80,   y: 65, count: 2 },
];

const pricingData = [
  {
    region: "Africa",
    countries: [
      { code: "sc", name: "Seychelles",                     reg: "595",   annual: "590"   },
    ],
  },
  {
    region: "The Americas",
    countries: [
      { code: "ai", name: "Anguilla",                       reg: "1,040", annual: "1,030" },
      { code: "ag", name: "Antigua and Barbuda",            reg: "1,600", annual: "1,350" },
      { code: "bs", name: "Bahamas",                        reg: "1,360", annual: "1,120" },
      { code: "bz", name: "Belize",                         reg: "990",   annual: "1,490" },
      { code: "vg", name: "British Virgin Islands",         reg: "1,690", annual: "1,450" },
      { code: "ky", name: "Cayman Islands",                 reg: "2,900", annual: "2,610" },
      { code: "cr", name: "Costa Rica",                     reg: "1,890", annual: "1,400" },
      { code: "pa", name: "Panama",                         reg: "1,490", annual: "980"   },
      { code: "kn", name: "St. Kitts and Nevis",            reg: "1,470", annual: "1,390" },
      { code: "lc", name: "St. Lucia",                      reg: "1,850", annual: "1,600" },
      { code: "vc", name: "St. Vincent and the Grenadines", reg: "1,110", annual: "970"   },
    ],
  },
  {
    region: "Asia Pacific",
    countries: [
      { code: "ck", name: "Cook Islands",                   reg: "1,790", annual: "1,490" },
      { code: "mh", name: "Marshall Islands",               reg: "1,090", annual: "890"   },
      { code: "ws", name: "Samoa",                          reg: "840",   annual: "755"   },
      { code: "vu", name: "Vanuatu",                        reg: "1,400", annual: "900"   },
    ],
  },
];

const FlagPin = ({ code, name, x, y, count, zoom }: {
  code: string; name: string; x: number; y: number; count?: number; zoom: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const s = zoom;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`, top: `${y}%`,
        transform: "translate(-50%, -100%)",
        cursor: "pointer",
        zIndex: hovered ? 20 : 10,
        filter: hovered ? "drop-shadow(0 4px 8px rgba(58,175,169,0.5))" : "none",
        transition: "filter 0.2s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {count ? (
        <div style={{
          width: `${28 * s}px`, height: `${28 * s}px`,
          borderRadius: "50%",
          background: "#0D1117", color: "#fff",
          fontSize: `${11 * s}px`, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Poppins', sans-serif",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}>
          {count}
        </div>
      ) : (
        <div style={{
          background: "#fff",
          borderRadius: `${6 * s}px`,
          padding: `${3 * s}px`,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          position: "relative",
        }}>
          <img
            src={`https://flagcdn.com/w40/${code}.png`}
            alt={name}
            style={{
              width: `${28 * s}px`, height: `${20 * s}px`,
              objectFit: "cover", borderRadius: `${3 * s}px`, display: "block",
            }}
          />
          <div style={{
            position: "absolute",
            bottom: `${-6 * s}px`, left: "50%",
            transform: "translateX(-50%)",
            width: 0, height: 0,
            borderLeft: `${5 * s}px solid transparent`,
            borderRight: `${5 * s}px solid transparent`,
            borderTop: `${7 * s}px solid #fff`,
          }} />
        </div>
      )}
      {hovered && (
        <div style={{
          position: "absolute",
          bottom: `${count ? 36 * s : 46 * s}px`,
          left: "50%", transform: "translateX(-50%)",
          background: "#0D1117", color: "#fff",
          fontSize: "11px", fontWeight: 500,
          padding: "4px 10px", borderRadius: "6px",
          whiteSpace: "nowrap",
          fontFamily: "'Poppins', sans-serif",
          pointerEvents: "none",
        }}>
          {name}
        </div>
      )}
    </div>
  );
};

const useFadeUp = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, delay);
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
};

const WorldAndPricing = () => {
  const mapHeadRef   = useFadeUp(0);
  const mapRef       = useFadeUp(120);
  const priceHeadRef = useFadeUp(0);
  const tableRef     = useFadeUp(120);
  const [zoom, setZoom]         = useState(1);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .wap-root { background: #ffffff; font-family: 'Poppins', sans-serif; }

        /* ── WORLD MAP ─────────────────────────── */
        /* Figma: width 1269px, height 879.27px, vertical */
        .wap-map-section {
          background: #f8fffe;
          padding: 80px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
          width: 100%;
        }

        .wap-map-inner {
          width: 100%;
          max-width: 1513px;
          min-height: 700.21px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 36px;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .wap-map-container {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .wap-zoom-btns {
          position: absolute;
          bottom: 16px; right: 16px;
          display: flex; flex-direction: column; gap: 2px;
          z-index: 20;
        }
        .wap-zoom-btn {
          width: 32px; height: 32px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 18px; font-weight: 600;
          color: #374151; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s, color 0.15s;
          line-height: 1;
        }
        .wap-zoom-btn:hover { background: #f0fdf9; color: #3aafa9; }

        /* ── PRICING TABLE ─────────────────────── */
        /* Figma: width 1513px, height 1834.21px, vertical */
        .wap-pricing-section {
          background: #ffffff;
          padding: 0 0 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
          width: 100%;
        }

        .wap-pricing-inner {
          width: 100%;
          max-width: 1269px;
          min-height: 879.27px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .wap-table-wrap {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease;
        }

        .wap-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Poppins', sans-serif;
        }
        .wap-table thead th {
          background: #b2ece6;
          padding: 18px 24px;
          font-size: 15px; font-weight: 600;
          color: #0F131E; text-align: left;
        }
        .wap-table tbody tr td {
          padding: 16px 24px;
          font-size: 15px; color: #374151;
          border-bottom: 1px solid #f3f4f6;
          vertical-align: middle;
        }
        .wap-table tbody tr:last-child td { border-bottom: none; }
        .wap-table tbody tr.row-hov td   { background: #f0fdf9; }

        .wap-flag-cell {
          display: flex; align-items: center; gap: 12px;
        }

        /* fade-up helper */
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .wap-map-inner    { min-height: unset; }
          .wap-pricing-inner{ min-height: unset; }
        }
        @media (max-width: 640px) {
          .wap-map-section    { padding: 60px 0 40px; }
          .wap-pricing-section{ padding: 60px 0 80px; }
          .wap-table thead th,
          .wap-table tbody tr td { padding: 12px 14px; font-size: 13px; }
        }
      `}</style>

      <div className="wap-root">

        {/* ══════════════ WORLD MAP ══════════════ */}
        <section className="wap-map-section">
          <div className="wap-map-inner">

            {/* Heading */}
            <div ref={mapHeadRef} className="fade-up" style={{ textAlign: "center", width: "100%" }}>
              <h2 style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800, color: "#0F131E",
                margin: "0 0 12px 0",
              }}>
                The OVZA World
              </h2>
              <p style={{ fontSize: "15px", color: "#6b7280", margin: 0 }}>
                A regulated ecosystem designed for scale.
              </p>
            </div>

            {/* Map */}
            <div className="wap-map-container" ref={mapRef} style={{ width: "100%" }}>
              <img
                src={worldImg}
                alt="OVZA World Map"
                style={{
                  width: "100%", height: "auto", display: "block",
                  transform: `scale(${zoom})`,
                  transformOrigin: "center top",
                  transition: "transform 0.3s ease",
                }}
              />
              {/* Pins */}
              <div style={{ position: "absolute", inset: 0 }}>
                {pins.map((pin) => (
                  <FlagPin key={`${pin.code}-${pin.x}`} {...pin} zoom={zoom} />
                ))}
              </div>
              {/* Zoom */}
              <div className="wap-zoom-btns">
                <button className="wap-zoom-btn" onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}>+</button>
                <button className="wap-zoom-btn" onClick={() => setZoom(z => Math.max(z - 0.2, 1))}>−</button>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════ PRICING TABLE ══════════════ */}
        <section className="wap-pricing-section">
          <div className="wap-pricing-inner">

            {/* Heading */}
            <div ref={priceHeadRef} className="fade-up" style={{ textAlign: "center", maxWidth: "700px", width: "100%" }}>
              <p style={{
                fontSize: "12px", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#3aafa9", margin: "0 0 14px 0",
              }}>
                GLOBAL JURISDICTION PRICING
              </p>
              <h2 style={{
                fontSize: "clamp(24px, 3.5vw, 42px)",
                fontWeight: 800, color: "#0F131E",
                margin: "0 0 14px 0", lineHeight: 1.15,
              }}>
                Formation & Renewal Fee Comparison
              </h2>
              <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
                Accurate, all-inclusive pricing across jurisdictions with no hidden costs.
              </p>
            </div>

            {/* Table */}
            <div className="wap-table-wrap" ref={tableRef} style={{ width: "100%" }}>
              <table className="wap-table">
                <thead>
                  <tr>
                    <th style={{ width: "16%" }}>Region</th>
                    <th style={{ width: "42%" }}>Jurisdictions</th>
                    <th style={{ width: "21%" }}>Registration Fees (USD)</th>
                    <th style={{ width: "21%" }}>Annual Fees (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((group) =>
                    group.countries.map((country, ci) => {
                      const key = `${group.region}-${country.code}`;
                      return (
                        <tr
                          key={key}
                          className={hoveredRow === key ? "row-hov" : ""}
                          onMouseEnter={() => setHoveredRow(key)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          {/* Region — first row only */}
                          <td style={{
                            fontWeight: 700, color: "#3aafa9",
                            verticalAlign: "top", paddingTop: "20px",
                          }}>
                            {ci === 0 ? group.region : ""}
                          </td>

                          {/* Flag + name */}
                          <td>
                            <div className="wap-flag-cell">
                              <img
                                src={`https://flagcdn.com/w40/${country.code}.png`}
                                alt={country.name}
                                style={{
                                  width: "28px", height: "20px",
                                  objectFit: "cover", borderRadius: "3px",
                                  flexShrink: 0,
                                  boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                                }}
                              />
                              <span style={{ fontWeight: 500, color: "#1f2937" }}>
                                {country.name}
                              </span>
                            </div>
                          </td>

                          <td style={{ fontWeight: 500 }}>{country.reg}</td>
                          <td style={{ fontWeight: 500 }}>{country.annual}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default WorldAndPricing;
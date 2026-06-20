import { useState, useRef, useEffect } from "react";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";
import blog4 from "../../assets/blog4.png";
import worldMap from "../../assets/world.png";

// ─── Flag helper — uses flagcdn.com (reliable, free, no auth) ─────────────────
const flag = (code: string) =>
  `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

// ─── Countries Data ────────────────────────────────────────────────────────────
const regions = [
  {
    name: "The Americas",
    countries: [
      { name: "Anguilla",                      flag: flag("ai") },
      { name: "Antigua and Barbuda",            flag: flag("ag") },
      { name: "Bahamas",                        flag: flag("bs") },
      { name: "Belize",                         flag: flag("bz") },
      { name: "British Virgin Islands",         flag: flag("vg") },
      { name: "Cayman Islands",                 flag: flag("ky") },
      { name: "Costa Rica",                     flag: flag("cr") },
      { name: "Panama",                         flag: flag("pa") },
      { name: "St. Kitts and Nevis",            flag: flag("kn") },
      { name: "St. Lucia",                      flag: flag("lc") },
      { name: "St. Vincent and the Grenadines", flag: flag("vc") },
      { name: "United States Virgin Islands",   flag: flag("vi") },
    ],
  },
  {
    name: "Asia Pacific",
    countries: [
      { name: "Cook Islands",     flag: flag("ck") },
      { name: "Marshall Islands", flag: flag("mh") },
      { name: "Samoa",            flag: flag("ws") },
      { name: "Vanuatu",          flag: flag("vu") },
    ],
  },
  {
    name: "Africa",
    countries: [
      { name: "Seychelles", flag: flag("sc") },
      { name: "Liberia",    flag: flag("lr") },
    ],
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

// ─── Article Data ─────────────────────────────────────────────────────────────
const articles: Article[] = [
  {
    id: 1,
    category: "UNDERSTANDING ENHANCED DUE DILIGENCE IN OFFSHORE BANKING",
    title: "Understanding Enhanced Due Diligence in Offshore Banking",
    excerpt: "For international investors and high-growth companies operating across multiple...",
    image: blog1,
  },
  {
    id: 2,
    category: "WHAT HAPPENS TO AN OFFSHORE COMPANY DURING DIVORCE?",
    title: "What Happens to an Offshore Company During Divorce?",
    excerpt: "Offshore companies can provide significant protection during divorce proceedings...",
    image: blog2,
  },
  {
    id: 3,
    category: "WHAT IS AN OFFSHORE SPV?",
    title: "What Is an Offshore SPV?",
    excerpt: "An Offshore SPV is a dedicated offshore company created to...",
    image: blog3,
  },
  {
    id: 4,
    category: "WHY OFFSHORE ENTREPRENEURS SHOULD USE A VPN IN 2026",
    title: "Why Offshore Entrepreneurs Should Use a VPN In 2026",
    excerpt: "Modern offshore entrepreneurs operate with more international flexibility than ever...",
    image: blog4,
  },
];

// ─── Article Card ─────────────────────────────────────────────────────────────
const ArticleCard = ({
  article,
  active,
  animIndex,
}: {
  article: Article;
  active: boolean;
  animIndex: number;
}) => (
  <div
    className={`
      article-card flex-shrink-0
      w-[280px] sm:w-[300px] md:w-[322px]
      rounded-[20px] bg-white overflow-hidden
      border transition-all duration-500 cursor-pointer
      ${active
        ? "border-[#1DB38D] border-[1.5px] shadow-2xl scale-[1.03]"
        : "border-gray-100 shadow-sm hover:shadow-md hover:scale-[1.01]"
      }
    `}
    style={{ padding: "10px", animationDelay: `${animIndex * 120}ms` }}
  >
    <div className="w-full h-[170px] md:h-[190px] rounded-[14px] bg-[#E8F9F5] overflow-hidden relative">
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center h-full">
          <span className="text-[9px] font-semibold text-[#0F131E]/60 uppercase tracking-wide leading-tight"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            {article.category}
          </span>
          <span className="absolute bottom-2 right-3 text-[10px] text-gray-300 font-semibold"
            style={{ fontFamily: "Poppins, sans-serif" }}>OVZA</span>
        </div>
      )}
      {active && (
        <div className="absolute inset-0 rounded-[14px] ring-2 ring-[#1DB38D]/30 pointer-events-none" />
      )}
    </div>

    <div className="pt-4 px-2 pb-3">
      <h3 className="text-[14px] md:text-[15px] font-bold text-[#0F131E] leading-snug"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        {article.title}
      </h3>
      <p className="mt-2 text-[11px] md:text-[12px] text-gray-500 leading-relaxed line-clamp-3"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        {article.excerpt}
      </p>
      <a href="#"
        className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-[#1DB38D] group"
        style={{ fontFamily: "Poppins, sans-serif" }}>
        Read More
        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
);

// ─── Countries Map Section ─────────────────────────────────────────────────────
const CountriesMap = ({ visible }: { visible: boolean }) => (
  <div
    className={`map-section ${visible ? "anim-fade-up" : "opacity-0"}`}
    style={{
      border: "1px solid #34BE86",
      borderRadius: "25px",
      padding: "25px",
      maxWidth: "1276px",
      margin: "32px auto 0",
      background: "#ffffff",
      animationDelay: "800ms",
    }}
  >
    {/* ── World Map Image ── */}
    <div
      className="relative w-full overflow-hidden"
      style={{ borderRadius: "16px", background: "#edfaf6" }}
    >
      <img
        src={worldMap}
        alt="World Map"
        className="w-full h-auto object-contain"
      />
    </div>

    {/* ── Country Lists ── */}
    <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
      {regions.map((region, ri) => (
        <div
          key={region.name}
          className="region-list"
          style={{ animationDelay: `${900 + ri * 150}ms` }}
        >
          <h4
            className="text-[14px] font-bold mb-4"
            style={{ color: "#1DB38D", fontFamily: "Poppins, sans-serif" }}
          >
            {region.name}
          </h4>
          <ul className="space-y-[10px]">
            {region.countries.map((c) => (
              <li
                key={c.name}
                className="flex items-center gap-2.5 text-[13px] text-[#0F131E] hover:text-[#1DB38D] transition-colors duration-200 cursor-default group"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <img
                  src={c.flag}
                  alt={c.name}
                  width={24}
                  height={16}
                  className="flex-shrink-0 rounded-[3px] object-cover transition-transform duration-200 group-hover:scale-110"
                  style={{ width: "24px", height: "16px" }}
                />
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// ─── Main Section ─────────────────────────────────────────────────────────────
const OVZAFiles = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector(".article-card")?.clientWidth ?? 322;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -(cardWidth + 20) : cardWidth + 20,
      behavior: "smooth",
    });
    setActiveIndex((prev) =>
      dir === "left" ? Math.max(0, prev - 1) : Math.min(articles.length - 1, prev + 1)
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-up {
          opacity: 0;
          animation: fadeSlideUp 0.65s ease forwards;
        }

        @keyframes cardPop {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .article-card {
          opacity: 0;
          animation: cardPop 0.55s ease forwards;
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .countries-banner {
          opacity: 0;
          animation: slideInUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .map-section {
          opacity: 0;
          animation: slideInUp 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .region-list {
          opacity: 0;
          animation: fadeSlideUp 0.6s ease forwards;
        }

        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <section
        ref={sectionRef}
        className="relative overflow-hidden py-14 md:py-20 px-4 sm:px-6"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, #D5F7F0 100%)",
          borderRadius: "33px",
          width: "100%",
          maxWidth: "1394px",
          margin: "0 auto",
        }}
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #72D0C0 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-20 -left-10 w-72 h-72 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #1DB38D 0%, transparent 70%)" }} />

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* ── Header ── */}
          <div
            className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-10 ${visible ? "anim-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0ms" }}
          >
            <div>
              <h2
                className="text-[28px] sm:text-[34px] md:text-[40px] font-bold text-[#0F131E] leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                The OVZA Files
              </h2>
              <p
                className="mt-2 text-[13px] md:text-[14px] text-[#0F131E]/60 max-w-md"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                In our blog, we explore the strategies, structures, and legal
                frameworks shaping the offshore industry.
              </p>
            </div>

            <div
              className={`flex items-center gap-3 flex-shrink-0 ${visible ? "anim-fade-up" : "opacity-0"}`}
              style={{ animationDelay: "100ms" }}
            >
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-[#72D0C0] hover:bg-[#1DB38D] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-[#72D0C0] hover:bg-[#1DB38D] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Cards Row ── */}
          <div
            ref={scrollRef}
            className="hide-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          >
            {articles.map((article, index) => (
              <div
                key={article.id}
                onClick={() => setActiveIndex(index)}
                style={{ animationDelay: visible ? `${200 + index * 120}ms` : "0ms" }}
                className={!visible ? "opacity-0" : ""}
              >
                <ArticleCard article={article} active={index === activeIndex} animIndex={index} />
              </div>
            ))}
          </div>

          {/* ── Dots ── */}
          <div
            className={`mt-7 flex justify-center items-center gap-2 ${visible ? "anim-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "600ms" }}
          >
            {articles.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="h-2.5 rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: i === activeIndex ? "24px" : "10px",
                  background: i === activeIndex ? "#1DB38D" : "#72D0C0",
                  opacity: i === activeIndex ? 1 : 0.45,
                }}
              />
            ))}
          </div>

          {/* ── 18 Countries Banner ── */}
          <div
            className={`countries-banner mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-6 sm:px-8 md:px-10 py-8 md:py-10 ${visible ? "" : "opacity-0"}`}
            style={{
              background: "#94E7B9",
              borderRadius: "25px",
              border: "1px solid #5ECE9A",
              maxWidth: "1276px",
              minHeight: "266px",
              margin: "40px auto 0",
              animationDelay: "700ms",
            }}
          >
            <div className="flex items-center">
              <h3
                className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-[#0F131E] leading-snug"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                18 Countries<br />
                Supported by OVZA<br />
                for Offshore<br />
                Company Formation
              </h3>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <p className="text-[13px] md:text-[14px] text-[#0F131E]/80 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                OVZA extends its expertise across continents,{" "}
                <strong className="text-[#0F131E]">offering offshore company formation</strong>{" "}
                and <strong className="text-[#0F131E]">banking support</strong>{" "}
                in a diversified portfolio of jurisdictions.
              </p>
              <p className="text-[13px] md:text-[14px] text-[#0F131E]/80 leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                From the Americas to Asia Pacific and Africa, our services cater to a vast array
                of strategic locations including Anguilla, the British Virgin Islands, Belize, and beyond.{" "}
                <strong className="text-[#0F131E]">
                  We enable you to establish a business presence in the world's most advantageous regions.
                </strong>
              </p>
            </div>
          </div>

          {/* ── Countries Map ── */}
          {visible && <CountriesMap visible={visible} />}

        </div>
      </section>
    </>
  );
};

export default OVZAFiles;
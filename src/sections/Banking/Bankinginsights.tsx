import { useState, useRef, useEffect } from "react";
import blog1 from "../../assets/blog1.png";
import blog2 from "../../assets/blog2.png";
import blog3 from "../../assets/blog3.png";
import blog4 from "../../assets/blog4.png";

interface Article {
  id: number;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    category: "The OVZA Files",
    title: "Understanding Enhanced Due Diligence in Offshore Banking",
    date: "June 16, 2026",
    excerpt: "For international investors and high-growth companies operating across multiple...",
    image: blog1,
  },
  {
    id: 2,
    category: "The OVZA Files",
    title: "What Happens to an Offshore Company During Divorce?",
    date: "June 16, 2026",
    excerpt: "Offshore companies can provide significant protection...",
    image: blog2,
  },
  {
    id: 3,
    category: "The OVZA Files",
    title: "What Is an Offshore SPV?",
    date: "June 4, 2026",
    excerpt: "An Offshore SPV is a dedicated...",
    image: blog3,
  },
  {
    id: 4,
    category: "The OVZA Files",
    title: "Why Offshore Entrepreneurs Should Use a VPN In 2026",
    date: "June 2, 2026",
    excerpt: "Modern offshore entrepreneurs operate with more...",
    image: blog4,
  },
];

/* ── Article Card ── */
const ArticleCard = ({
  article,
  active,
  visible,
  animIndex,
}: {
  article: Article;
  active: boolean;
  visible: boolean;
  animIndex: number;
}) => (
  <div
    style={{
      flexShrink: 0,
      width: "clamp(240px, 24vw, 300px)",
      borderRadius: "16px",
      backgroundColor: "#fff",
      border: active ? "1.5px solid #34BE86" : "1.5px solid #e5e7eb",
      boxShadow: active ? "0 8px 32px rgba(52,190,134,0.15)" : "0 2px 8px rgba(0,0,0,0.05)",
      transform: active ? "scale(1.02)" : "scale(1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      padding: "10px",
      opacity: visible ? 1 : 0,
      animation: visible ? `bi-cardPop 0.55s ease ${animIndex * 100}ms forwards` : "none",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    {/* Image */}
    <div
      style={{
        width: "100%",
        height: "170px",
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "#e8faf5",
        position: "relative",
      }}
    >
      <img
        src={article.image}
        alt={article.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      />
      {/* Category badge */}
      <span
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "10px",
          fontWeight: 600,
          color: "#0a1f1a",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: "999px",
          padding: "3px 8px",
          backdropFilter: "blur(4px)",
        }}
      >
        {article.category}
      </span>
    </div>

    {/* Content */}
    <div style={{ padding: "14px 6px 8px" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#0a1f1a", lineHeight: 1.35, marginBottom: "6px" }}>
        {article.title}
      </h3>
      <p style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "6px" }}>{article.date}</p>
      <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6, marginBottom: "10px" }}>
        {article.excerpt}
      </p>
      <a
        href="#"
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#34BE86",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          transition: "gap 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.gap = "8px")}
        onMouseLeave={e => (e.currentTarget.style.gap = "4px")}
      >
        Read More
        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
        </svg>
      </a>
    </div>
  </div>
);

/* ══════════════════════════════════════
   Main Component
══════════════════════════════════════ */
const BankingInsights = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.querySelector("[data-card]") as HTMLElement;
    const cardWidth = card?.offsetWidth ?? 300;
    scrollRef.current.scrollBy({ left: dir === "left" ? -(cardWidth + 20) : cardWidth + 20, behavior: "smooth" });
    setActiveIndex(prev =>
      dir === "left" ? Math.max(0, prev - 1) : Math.min(articles.length - 1, prev + 1)
    );
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#fff",
        padding: "64px 0 80px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <style>{`
        @keyframes bi-fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bi-cardPop {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .bi-fade { opacity: 0; }
        .bi-fade.go { animation: bi-fadeUp 0.55s ease forwards; }
        .bi-scroll::-webkit-scrollbar { display: none; }
        .bi-scroll { -ms-overflow-style: none; scrollbar-width: none; }

        .bi-arrow-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          background-color: #34BE86;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .bi-arrow-btn:hover { background-color: #2aa876; transform: scale(1.1); }
      `}</style>

      <div style={{ maxWidth: "1276px", margin: "0 auto", padding: "0 clamp(20px,5vw,80px)" }}>

        {/* ── Breadcrumb ── */}
        <p
          className={`bi-fade ${visible ? "go" : ""}`}
          style={{ fontSize: "12px", fontWeight: 600, color: "#34BE86", marginBottom: "8px", letterSpacing: "0.02em" }}
        >
          Open an Offshore Bank Account
        </p>

        {/* ── Header row ── */}
        <div
          className={`bi-fade ${visible ? "go" : ""}`}
          style={{
            animationDelay: "60ms",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
            gap: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(22px,3vw,38px)",
              fontWeight: 800,
              color: "#0a1f1a",
              lineHeight: 1.2,
              maxWidth: "520px",
            }}
          >
            Stay Ahead with the Latest<br />News & Insights
          </h2>

          {/* Arrow buttons */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", paddingTop: "8px", flexShrink: 0 }}>
            <button className="bi-arrow-btn" onClick={() => scroll("left")}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button className="bi-arrow-btn" onClick={() => scroll("right")}>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* ── Cards row ── */}
        <div
          ref={scrollRef}
          className="bi-scroll"
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollSnapType: "x mandatory",
          }}
        >
          {articles.map((article, idx) => (
            <div
              key={article.id}
              data-card
              onClick={() => setActiveIndex(idx)}
              style={{ scrollSnapAlign: "start" }}
            >
              <ArticleCard
                article={article}
                active={idx === activeIndex}
                visible={visible}
                animIndex={idx}
              />
            </div>
          ))}
        </div>

        {/* ── Dots ── */}
        <div
          className={`bi-fade ${visible ? "go" : ""}`}
          style={{
            animationDelay: "500ms",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "24px",
          }}
        >
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                height: "8px",
                width: i === activeIndex ? "24px" : "8px",
                borderRadius: "999px",
                backgroundColor: i === activeIndex ? "#34BE86" : "#d1d5db",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BankingInsights;
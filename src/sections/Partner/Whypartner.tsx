import { useRef, useEffect } from "react";
import earningsImg from "../../assets/earnings.png";
import trustedImg from "../../assets/trusted.png";
import marketImg from "../../assets/market.png";
import cardBg from "../../assets/image.png";

const cards = [
  {
    img: earningsImg,
    title: "Premium Referral Earnings",
    desc: "Offshore incorporation commands real value. Generate $100–$500+ per successful referral, not small commissions on budget products.",
  },
  {
    img: trustedImg,
    title: "Trusted Since 2018",
    desc: "Over 7 years of proven operations and verified client reviews. Your audience receives a credible, professional service they can rely on.",
  },
  {
    img: marketImg,
    title: "A Market on the Rise",
    desc: "Remote founders and digital businesses are multiplying. Offshore solutions are no longer niche! They're in demand.",
  },
];

const WhyPartnerCard = ({
  img,
  title,
  desc,
  delay,
}: {
  img: string;
  title: string;
  desc: string;
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        /* Figma: radius 28px, padding 28/28/86.7/28, vertical, ~370px wide */
        borderRadius: "28px",
        padding: "28px 28px 86.7px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        flex: "1 1 0",
        minWidth: "280px",
        maxWidth: "370px",
        /* tiled background image */
        backgroundImage: `url(${cardBg})`,
        backgroundRepeat: "tile",
        backgroundSize: "auto",
        backgroundColor: "#e8f8f4", /* fallback */
        cursor: "pointer",
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, box-shadow 0.25s ease",
        fontFamily: "'Poppins', sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 36px rgba(58,175,169,0.18)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Card image */}
      <div style={{ marginBottom: "8px" }}>
        <img
          src={img}
          alt={title}
          style={{ width: "140px", height: "120px", objectFit: "contain" }}
        />
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#0F131E",
          margin: 0,
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: "14px",
          fontWeight: 400,
          color: "#4b5563",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {desc}
      </p>
    </div>
  );
};

const WhyPartner = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        .why-partner-section {
          background: #f8fffe;
          padding: 80px 24px 100px;
          font-family: 'Poppins', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 56px;
        }

        .why-partner-cards {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 1200px;
        }

        @media (max-width: 900px) {
          .why-partner-cards { gap: 20px; }
        }
        @media (max-width: 600px) {
          .why-partner-section { padding: 60px 16px 80px; gap: 40px; }
        }
      `}</style>

      <section className="why-partner-section">

        {/* Heading block */}
        <div
          ref={headingRef}
          style={{
            textAlign: "center",
            maxWidth: "560px",
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#3aafa9",
              margin: "0 0 14px 0",
            }}
          >
            WHY PARTNER
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 800,
              color: "#0F131E",
              margin: "0 0 16px 0",
              lineHeight: 1.15,
            }}
          >
            Built For Your Success
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#6b7280",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Structured support. Competitive commissions. A service your audience
            can depend on.
          </p>
        </div>

        {/* Cards */}
        <div className="why-partner-cards">
          {cards.map((card, i) => (
            <WhyPartnerCard key={card.title} {...card} delay={i * 120} />
          ))}
        </div>

      </section>
    </>
  );
};

export default WhyPartner;
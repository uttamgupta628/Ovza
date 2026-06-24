import contactHero from "../../assets/contactHero.png";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

  .ch-section {
    background: #5EC9B4;
    min-height: 420px;
    width: 100%;
    position: relative;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
  }

  /* decorative blobs */
  .ch-blob {
    position: absolute;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    pointer-events: none;
  }
  .ch-blob-1 { width: 320px; height: 320px; top: -80px; right: 30%; }
  .ch-blob-2 { width: 180px; height: 180px; bottom: -60px; left: 10%; }

  .ch-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 64px 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }

  .ch-left {
    flex: 1;
    max-width: 520px;
  }

  .ch-left h1 {
    font-size: clamp(26px, 4vw, 40px);
    font-weight: 800;
    color: #0D2D25;
    line-height: 1.2;
    margin: 0 0 16px;
  }

  .ch-left p {
    font-size: 14px;
    color: #1a4035;
    line-height: 1.7;
    margin: 0 0 28px;
    max-width: 420px;
  }

  .ch-scroll-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #0D2D25;
    background: rgba(255,255,255,0.25);
    border: 1.5px solid rgba(255,255,255,0.5);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    backdrop-filter: blur(4px);
  }
  .ch-scroll-btn:hover {
    background: rgba(255,255,255,0.38);
    transform: translateY(-1px);
  }

  .ch-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    min-height: 280px;
  }

  .ch-right img {
    width: 100%;
    max-width: 460px;
    object-fit: contain;
    display: block;
  }

  /* Chat widget */
  .ch-chat-widget {
    position: absolute;
    bottom: 20px;
    right: 0;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    overflow: hidden;
    min-width: 190px;
  }

  .ch-chat-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 500;
    color: #222;
    cursor: pointer;
    transition: background 0.15s;
    border: none;
    background: none;
    width: 100%;
    font-family: 'Poppins', sans-serif;
    text-align: left;
  }
  .ch-chat-item:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
  .ch-chat-item:hover { background: #f6fffe; }

  .ch-chat-icon {
    width: 28px; height: 28px;
    border-radius: 6px;
    background: #e8f8f5;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  /* Scroll-down floating btn */
  .ch-scroll-fab {
    position: absolute;
    bottom: -22px;
    right: 40px;
    width: 44px; height: 44px;
    border-radius: 50%;
    background: #5EC9B4;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    transition: background 0.2s, transform 0.15s;
    z-index: 10;
  }
  .ch-scroll-fab:hover {
    background: #4ab8a3;
    transform: translateY(2px);
  }

  @media (max-width: 768px) {
    .ch-inner {
      flex-direction: column;
      padding: 48px 24px 56px;
      text-align: center;
    }
    .ch-left { max-width: 100%; }
    .ch-left p { margin-left: auto; margin-right: auto; }
    .ch-right { min-height: 200px; width: 100%; }
    .ch-chat-widget { right: 50%; transform: translateX(50%); }
    .ch-scroll-fab { right: 24px; }
  }
`;

interface ContactHeroProps {
  onScrollDown?: () => void;
}

const ContactHero = ({ onScrollDown }: ContactHeroProps) => {
  // const [chatOpen, setChatOpen] = useState(true);

  const injectStyles = () => {
    const id = "ch-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = styles;
      document.head.appendChild(el);
    }
  };
  injectStyles();

  const handleScroll = () => {
    if (onScrollDown) {
      onScrollDown();
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="ch-section">
      {/* blobs */}
      <div className="ch-blob ch-blob-1" />
      <div className="ch-blob ch-blob-2" />

      <div className="ch-inner">
        {/* Left */}
        <div className="ch-left">
          <h1>Your Inquiry Will Reach the Right Desk</h1>
          <p>
            Use the form and contact addresses below to send your message through.
            Everything is received and carried along to the right desk accordingly.
          </p>
          <button className="ch-scroll-btn" onClick={handleScroll}>
            Scroll Down
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Right */}
        <div className="ch-right">
          <img src={contactHero} alt="Contact illustration" />

          {/* Chat / Call widget */}
          {/* {chatOpen && (
            <div className="ch-chat-widget">
              <button className="ch-chat-item">
                <span className="ch-chat-icon">
                  <svg width="14" height="14" fill="none" stroke="#5EC9B4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                Chat with us
              </button>
              <button className="ch-chat-item">
                <span className="ch-chat-icon">
                  <svg width="14" height="14" fill="none" stroke="#5EC9B4" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                Call Us
              </button>
            </div>
          )} */}
        </div>
      </div>

      {/* Scroll FAB */}
      {/* <button className="ch-scroll-fab" onClick={handleScroll} aria-label="Scroll down">
        <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button> */}
    </section>
  );
};

export default ContactHero;
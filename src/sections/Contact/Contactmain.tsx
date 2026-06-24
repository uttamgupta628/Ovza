import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

  .cm-wrap {
    font-family: 'Poppins', sans-serif;
    background: #fff;
  }

  /* ── Main two-col layout ── */
  .cm-body {
    max-width: 1280px;
    margin: 0 auto;
    padding: 60px 40px;
    display: grid;
    grid-template-columns: 1fr 1.1fr;
    gap: 48px;
    align-items: start;
  }

  /* ── LEFT PANEL ── */
  .cm-info-row {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    padding: 18px 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .cm-info-row:first-child { border-top: 1px solid #f0f0f0; }

  .cm-info-icon {
    width: 38px; height: 38px;
    border-radius: 8px;
    background: #e8f8f5;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .cm-info-label {
    font-size: 13px; font-weight: 700;
    color: #111;
    margin: 0 0 4px;
  }
  .cm-info-val {
    font-size: 13px; color: #555;
    margin: 0;
    line-height: 1.6;
  }
  .cm-info-val a { color: #555; text-decoration: none; }
  .cm-info-val a:hover { color: #5EC9B4; }

  /* Closed banner */
  .cm-closed-banner {
    margin: 16px 0 8px;
    background: #e53935;
    color: #fff;
    font-size: 13px; font-weight: 600;
    border-radius: 8px;
    padding: 10px 16px;
    display: flex; align-items: center; gap: 8px;
    justify-content: center;
  }

  /* Countdown */
  .cm-countdown-label {
    font-size: 12px; color: #777;
    text-align: center;
    margin: 4px 0 8px;
  }
  .cm-countdown {
    background: #5EC9B4;
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  .cm-cd-unit {
    text-align: center;
    color: #fff;
  }
  .cm-cd-num {
    font-size: 28px; font-weight: 700;
    line-height: 1;
    display: block;
  }
  .cm-cd-lbl {
    font-size: 11px; font-weight: 500;
    opacity: 0.85;
    display: block;
    margin-top: 4px;
  }

  /* Social links */
  .cm-social-label {
    font-size: 12px; font-weight: 600;
    color: #888; text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 4px 0 10px;
  }
  .cm-social-row {
    display: flex; gap: 14px;
    margin-bottom: 20px;
  }
  .cm-social-link {
    width: 32px; height: 32px;
    border-radius: 8px;
    background: #f4f4f4;
    display: flex; align-items: center; justify-content: center;
    color: #444;
    transition: background 0.15s, color 0.15s;
    text-decoration: none;
  }
  .cm-social-link:hover { background: #5EC9B4; color: #fff; }

  /* Dedicated contacts */
  .cm-dedicated {
    border: 1px solid #e8e8e8;
    border-radius: 10px;
    overflow: hidden;
  }
  .cm-dedicated-header {
    font-size: 12px; font-weight: 600;
    color: #333; padding: 10px 14px;
    background: #fafafa;
    border-bottom: 1px solid #e8e8e8;
  }
  .cm-dedicated-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px;
    font-size: 13px; color: #444;
    border-bottom: 1px solid #f0f0f0;
  }
  .cm-dedicated-row:last-child { border-bottom: none; }
  .cm-dedicated-row a {
    color: #5EC9B4; font-weight: 600;
    text-decoration: none; font-size: 12px;
  }
  .cm-dedicated-row a:hover { text-decoration: underline; }

  /* ── RIGHT PANEL (form) ── */
  .cm-form-panel {
    background: #f0fbf9;
    border-radius: 16px;
    padding: 36px 32px;
    position: relative;
  }

  /* decorative circle */
  .cm-form-deco {
    position: absolute;
    bottom: -40px; right: -40px;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(94,201,180,0.12);
    pointer-events: none;
  }

  .cm-form-panel h2 {
    font-size: 22px; font-weight: 700;
    color: #0D2D25;
    margin: 0 0 10px;
  }
  .cm-form-panel p {
    font-size: 13px; color: #555;
    line-height: 1.65;
    margin: 0 0 24px;
  }

  .cm-form-group { margin-bottom: 14px; }
  .cm-form-label {
    font-size: 11px; font-weight: 600;
    color: #777; text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block; margin-bottom: 5px;
  }
  .cm-form-input,
  .cm-form-textarea {
    width: 100%; box-sizing: border-box;
    padding: 10px 13px;
    font-size: 13px; font-family: 'Poppins', sans-serif;
    border: 1.5px solid #d8f0ec;
    border-radius: 8px;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
    color: #111;
  }
  .cm-form-input:focus,
  .cm-form-textarea:focus { border-color: #5EC9B4; }
  .cm-form-textarea { resize: vertical; min-height: 100px; }

  .cm-form-check {
    display: flex; align-items: flex-start; gap: 10px;
    margin: 14px 0 20px;
    font-size: 12px; color: #666;
    cursor: pointer;
  }
  .cm-form-check input[type="checkbox"] {
    margin-top: 2px; accent-color: #5EC9B4; cursor: pointer;
  }

  .cm-submit-btn {
    width: 100%;
    padding: 12px;
    font-size: 14px; font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #fff;
    background: #5EC9B4;
    border: none; border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    position: relative; z-index: 1;
  }
  .cm-submit-btn:hover { background: #4ab8a3; transform: translateY(-1px); }

  /* ── SUBSCRIBE STRIP ── */
  .cm-subscribe {
    background: #f9f9f9;
    border-top: 1px solid #eee;
  }
  .cm-subscribe-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
  }
  .cm-sub-left { flex: 1; }
  .cm-sub-left h3 {
    font-size: 18px; font-weight: 700;
    color: #111; margin: 0 0 8px;
  }
  .cm-sub-left p {
    font-size: 13px; color: #666;
    line-height: 1.6; margin: 0;
    max-width: 320px;
  }
  .cm-sub-right {
    display: flex; align-items: center; gap: 12px;
    flex: 1; justify-content: flex-end;
  }
  .cm-sub-input {
    flex: 1; max-width: 280px;
    padding: 11px 14px;
    font-size: 13px; font-family: 'Poppins', sans-serif;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px; outline: none;
    transition: border-color 0.2s;
    color: #111;
  }
  .cm-sub-input:focus { border-color: #5EC9B4; }
  .cm-sub-input::placeholder { color: #aaa; }
  .cm-sub-btn {
    padding: 11px 22px;
    font-size: 13px; font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #fff;
    background: #5EC9B4;
    border: none; border-radius: 8px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.15s;
  }
  .cm-sub-btn:hover { background: #4ab8a3; transform: translateY(-1px); }

  .cm-sub-icon {
    color: #5EC9B4;
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .cm-body {
      grid-template-columns: 1fr;
      padding: 40px 24px;
    }
    .cm-subscribe-inner {
      flex-direction: column;
      align-items: flex-start;
      padding: 32px 24px;
    }
    .cm-sub-right { width: 100%; justify-content: flex-start; }
    .cm-sub-input { max-width: 100%; }
  }
`;

/* ── helpers ── */
function pad(n: number) { return String(n).padStart(2, "0"); }

function useCountdown(targetHour = 9, targetMinute = 0) {
  const getNext = () => {
    const now = new Date();
    const next = new Date(now);
    next.setHours(targetHour, targetMinute, 0, 0);
    if (next <= now) next.setDate(next.getDate() + 1);
    return Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
  };
  const [secs, setSecs] = useState(getNext);
  useEffect(() => {
    const id = setInterval(() => setSecs(getNext()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return { h, m, s };
}

/* ── Social icons ── */
const FacebookIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);
const XIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);
const TikTokIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.77a4.85 4.85 0 01-1-.08z" />
  </svg>
);

/* ── Component ── */
const ContactMain = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", newsletter: false });
  const [subEmail, setSubEmail] = useState("");
  const { h, m, s } = useCountdown(9, 0); // next opening at 9:00 AM

  useEffect(() => {
    const id = "cm-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = styles;
      document.head.appendChild(el);
    }
  }, []);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="cm-wrap">
      {/* ── Main body ── */}
      <div className="cm-body">

        {/* LEFT: info */}
        <div>
          {/* Email */}
          <div className="cm-info-row">
            <div className="cm-info-icon">
              <svg width="16" height="16" fill="none" stroke="#5EC9B4" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="cm-info-label">Email</p>
              <p className="cm-info-val"><a href="mailto:info@ovza.com">info@ovza.com</a></p>
            </div>
          </div>

          {/* Address */}
          <div className="cm-info-row">
            <div className="cm-info-icon">
              <svg width="16" height="16" fill="none" stroke="#5EC9B4" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="cm-info-label">Address</p>
              <p className="cm-info-val">
                Saint Vincent &amp; the Grenadines: Euro House, Richmond<br />
                Hill Road, Kingstown
              </p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="cm-info-row">
            <div className="cm-info-icon">
              <svg width="16" height="16" fill="none" stroke="#5EC9B4" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <p className="cm-info-label">Business Hours</p>
              <p className="cm-info-val">
                <strong style={{ color: "#333" }}>Office Hours:</strong> Monday to Friday, 9 AM to 5:30 PM
              </p>
            </div>
          </div>

          {/* Closed banner */}
          <div className="cm-closed-banner">
            🔴 We're Closed
          </div>

          <p className="cm-countdown-label">We're opening in</p>
          <div className="cm-countdown">
            <div className="cm-cd-unit">
              <span className="cm-cd-num">{pad(h)}</span>
              <span className="cm-cd-lbl">Hours</span>
            </div>
            <div className="cm-cd-unit">
              <span className="cm-cd-num">{pad(m)}</span>
              <span className="cm-cd-lbl">Minutes</span>
            </div>
            <div className="cm-cd-unit">
              <span className="cm-cd-num">{pad(s)}</span>
              <span className="cm-cd-lbl">Seconds</span>
            </div>
          </div>

          {/* Social */}
          <p className="cm-social-label">Social Media Links</p>
          <div className="cm-social-row">
            <a href="#" className="cm-social-link" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="cm-social-link" aria-label="X"><XIcon /></a>
            <a href="#" className="cm-social-link" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href="#" className="cm-social-link" aria-label="YouTube"><YoutubeIcon /></a>
            <a href="#" className="cm-social-link" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" className="cm-social-link" aria-label="TikTok"><TikTokIcon /></a>
          </div>

          {/* Dedicated contacts */}
          <div className="cm-dedicated">
            <div className="cm-dedicated-header">Dedicated Contacts</div>
            <div className="cm-dedicated-row">
              <span>Law Enforcement Inquiries:</span>
              <a href="mailto:law@ovza.com">Email</a>
            </div>
            <div className="cm-dedicated-row">
              <span>For Media Inquiries:</span>
              <a href="mailto:media@ovza.com">Email</a>
            </div>
          </div>
        </div>

        {/* RIGHT: form */}
        <div className="cm-form-panel">
          <div className="cm-form-deco" />
          <h2>Reach Out, Begin Your Offshore Adventure</h2>
          <p>
            Complete the form below to connect with our offshore company formation specialists.
            From incorporation and notarisation to offshore bank account opening, our experts
            guide you through every step. All data is encrypted with 256-bit EV TLS security,
            ensuring your information remains strictly confidential and compliant.
          </p>

          <div className="cm-form-group">
            <label className="cm-form-label">Name *</label>
            <input
              className="cm-form-input"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="cm-form-group">
            <label className="cm-form-label">Email *</label>
            <input
              className="cm-form-input"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="cm-form-group">
            <label className="cm-form-label">Message *</label>
            <textarea
              className="cm-form-textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <label className="cm-form-check">
            <input
              type="checkbox"
              checked={formData.newsletter}
              onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
            />
            I agree to sign up for OVZA's newsletter
          </label>

          <button className="cm-submit-btn" onClick={handleSubmit}>
            Submit form
          </button>
        </div>
      </div>

      {/* ── Subscribe strip ── */}
      <div className="cm-subscribe">
        <div className="cm-subscribe-inner">
          <div className="cm-sub-left">
            <h3>Stay Updated: Subscribe Now!</h3>
            <p>
              Join the OVZA newsletter for premier offshore insights, expert
              guidance, and the latest tools for international growth.
            </p>
          </div>

          <svg className="cm-sub-icon" width="40" height="40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>

          <div className="cm-sub-right">
            <input
              className="cm-sub-input"
              type="email"
              placeholder="Enter email address"
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
            />
            <button className="cm-sub-btn">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMain;
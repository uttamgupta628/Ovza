import { useState, useEffect } from "react";

const chatStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

  @keyframes cw-slideUp {
    from { opacity: 0; transform: translateY(10px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
  }
  @keyframes cw-fadeIn {
    from { opacity: 0; transform: translateX(20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .cw-wrapper {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    font-family: 'Poppins', sans-serif;
    animation: cw-fadeIn 0.4s ease both;
  }

  .cw-panel {
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.16);
    overflow: hidden;
    min-width: 190px;
    animation: cw-slideUp 0.2s ease both;
  }

  .cw-panel-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 13px 16px;
    font-size: 13px;
    font-weight: 500;
    color: #374151;
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    transition: background 0.15s, color 0.15s;
  }
  .cw-panel-btn:not(:last-child) { border-bottom: 1px solid #f3f4f6; }
  .cw-panel-btn:hover { background: #f6fffe; color: #3aafa9; }
  .cw-panel-btn:hover .cw-icon { background: rgba(114,208,192,0.3); }

  .cw-icon {
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgba(114,208,192,0.15);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .cw-fab {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: #72D0C0;
    border: none;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(114,208,192,0.55);
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
    position: relative;
  }
  .cw-fab:hover {
    background: #5BBCAC;
    transform: scale(1.08);
    box-shadow: 0 6px 24px rgba(114,208,192,0.65);
  }
  .cw-fab.open {
    background: #0D1117;
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }
  .cw-fab.open:hover { background: #1a1f2e; }

  .cw-badge {
    position: absolute;
    top: 1px; right: 1px;
    width: 13px; height: 13px;
    border-radius: 50%;
    background: #ef4444;
    border: 2px solid #fff;
  }
`;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = "cw-global-styles";
    if (!document.getElementById(id)) {
      const el = document.createElement("style");
      el.id = id;
      el.textContent = chatStyles;
      document.head.appendChild(el);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const wrapper = document.getElementById("cw-wrapper-el");
      if (wrapper && !wrapper.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="cw-wrapper" id="cw-wrapper-el">
      {/* Panel — only shown when open */}
      {open && (
        <div className="cw-panel">
          <button className="cw-panel-btn">
            <span className="cw-icon">
              <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </span>
            Chat with us
          </button>
          <button className="cw-panel-btn">
            <span className="cw-icon">
              <svg width="14" height="14" fill="none" stroke="#3aafa9" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
            Call Us
          </button>
        </div>
      )}

      {/* FAB — always visible */}
      <button
        className={`cw-fab ${open ? "open" : ""}`}
        onClick={() => setOpen((p) => !p)}
        aria-label="Contact support"
      >
        {open ? (
          <svg width="18" height="18" fill="none" stroke="#fff" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" fill="none" stroke="#fff" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {!open && <span className="cw-badge" />}
      </button>
    </div>
  );
};

export default ChatWidget;
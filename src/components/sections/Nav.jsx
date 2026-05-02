import { useState } from "react";
import logoBlack from "../../assets/IG Logo-black.png";

export function Nav({ nav }) {
  const [mobileActive, setMobileActive] = useState(false);

  const closeMenu = () => setMobileActive(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: nav || mobileActive ? "rgba(255,255,255,0.92)" : "transparent",
      borderBottom: nav ? `1px solid rgba(139,31,122,.12)` : "1px solid transparent",
      backdropFilter: nav || mobileActive ? "blur(18px) saturate(180%)" : "none",
      WebkitBackdropFilter: nav || mobileActive ? "blur(18px) saturate(180%)" : "none",
      transition: "background .35s ease, border-color .35s ease, backdrop-filter .35s ease",
      padding: "12px 64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }} className="nav-container">
      {/* Logo — always black (light hero background) */}
      <a href="#" onClick={closeMenu} style={{ display: "flex", alignItems: "center", animation: "fadeDown .7s ease both", lineHeight: 0 }}>
        <img
          src={logoBlack}
          alt="InSource Group"
          style={{
            height: 52,
            width: "auto",
            objectFit: "contain",
            transition: "opacity .4s",
          }}
        />
      </a>

      {/* Mobile Toggle */}
      <button 
        className={`mobile-toggle ${mobileActive ? "active" : ""}`} 
        onClick={() => setMobileActive(!mobileActive)}
        aria-label="Toggle Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-menu ${mobileActive ? "active" : ""}`}>
        {["About", "Services", "Gallery", "Team", "Contact"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} onClick={closeMenu} className="nav-link">{n}</a>
        ))}
        {/* Mobile-only CTA */}
        <div className="mobile-only" style={{ marginTop: 20, display: "none" }}>
           <a href="#contact" onClick={closeMenu} className="btn-primary">Get a Quote</a>
        </div>
      </div>

      <a href="#contact" className="nav-cta btn-primary" style={{ fontSize: 10, padding: "10px 22px", animation: "fadeDown .7s ease .2s both" }}>Get a Quote</a>
    </nav>
  );
}


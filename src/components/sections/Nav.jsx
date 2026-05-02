import logoBlack from "../../assets/IG Logo-black.png";

export function Nav({ nav }) {
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: nav ? "rgba(255,255,255,0.96)" : "transparent",
      borderBottom: nav ? `1px solid rgba(139,31,122,.1)` : "1px solid transparent",
      backdropFilter: nav ? "blur(14px)" : "none",
      transition: "background .4s, border-color .4s",
      padding:"18px 64px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      {/* Logo — always black (light hero background) */}
      <a href="#" style={{ display:"flex", alignItems:"center", animation:"fadeDown .7s ease both", lineHeight:0 }}>
        <img
          src={logoBlack}
          alt="InSource Group"
          style={{
            height: 56,
            width: "auto",
            objectFit: "contain",
            transition: "opacity .4s",
          }}
        />
      </a>

      <div style={{ display:"flex", gap:36, animation:"fadeDown .7s ease .1s both" }}>
        {["About","Services","Gallery","Team","Contact"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} className="nav-link">{n}</a>
        ))}
      </div>

      <a href="#contact" className="btn-primary" style={{ fontSize:10, padding:"10px 22px", animation:"fadeDown .7s ease .2s both" }}>Get a Quote</a>
    </nav>
  );
}


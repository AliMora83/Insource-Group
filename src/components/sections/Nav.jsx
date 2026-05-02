import { PURPLE, PURPLE_LIGHT, WHITE, CHARCOAL, MUTED } from "../../constants/theme";

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
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:10, animation:"fadeDown .7s ease both" }}>
        <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${PURPLE} 0%,${PURPLE_LIGHT} 100%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:WHITE, lineHeight:1 }}>I</span>
        </div>
        <div>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:16, color:CHARCOAL, letterSpacing:".04em", lineHeight:1.1 }}>
            In<span style={{ color:PURPLE }}>Source</span><span style={{ color:PURPLE }}>.</span>
          </div>
          <div style={{ fontSize:8, letterSpacing:".22em", textTransform:"uppercase", color:MUTED, fontWeight:400 }}>Group</div>
        </div>
      </div>

      <div style={{ display:"flex", gap:36, animation:"fadeDown .7s ease .1s both" }}>
        {["About","Services","Gallery","Team","Contact"].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} className="nav-link">{n}</a>
        ))}
      </div>

      <a href="#contact" className="btn-primary" style={{ fontSize:10, padding:"10px 22px", animation:"fadeDown .7s ease .2s both" }}>Get a Quote</a>
    </nav>
  );
}

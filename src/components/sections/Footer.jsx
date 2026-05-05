
import logoWhite from "../../assets/IG Logo-white.png";

export function Footer() {
  return (
    <footer className="footer-container" style={{ background:"#111110", borderTop:"1px solid rgba(255,255,255,.06)", padding:"26px 64px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
      <div style={{ display:"flex", alignItems:"center" }}>
        <img src={logoWhite} alt="InSource Group" style={{ height: 36, width: "auto", objectFit: "contain", opacity: 0.9 }} />
      </div>
      <div style={{ fontSize:12, color:"rgba(255,255,255,.6)", letterSpacing:".06em", fontWeight:400 }}>
        © 2026 Insource Group · Centurion, South Africa
      </div>
      <div style={{ fontSize:11, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.5)", fontStyle:"italic", fontFamily:"'Playfair Display',serif" }}>
        Your Vision: Our Expertise, Flawless Execution.
      </div>
    </footer>
  );
}

import { PURPLE, WHITE } from "../../constants/theme";

export function Footer() {
  return (
    <footer style={{ background:"#111110", borderTop:"1px solid rgba(255,255,255,.06)", padding:"26px 64px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:26, height:26, borderRadius:"50%", background:PURPLE, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:12, fontWeight:700, color:WHITE }}>I</span>
        </div>
        <span style={{ fontFamily:"'DM Sans',sans-serif", fontWeight:500, fontSize:13, color:"rgba(255,255,255,.35)", letterSpacing:".04em" }}>
          In<span style={{ color:"rgba(176,78,160,.6)" }}>Source</span>. Group
        </span>
      </div>
      <div style={{ fontSize:11, color:"rgba(255,255,255,.22)", letterSpacing:".06em" }}>
        © 2025 Insource Group · Carletonville, South Africa
      </div>
      <div style={{ fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.2)", fontStyle:"italic", fontFamily:"'Playfair Display',serif" }}>
        Your Vision: Our Expertise, Flawless Execution.
      </div>
    </footer>
  );
}

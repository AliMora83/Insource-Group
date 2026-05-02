import { PURPLE, PURPLE_TINT, PURPLE_TINT2, CHARCOAL, BODY, MUTED, WHITE } from "../../constants/theme";
import { Label } from "../common/Label";
import { HeroCarousel } from "./HeroCarousel";

export function Hero() {
  return (
    <section style={{
      minHeight:"100vh",
      background:`linear-gradient(160deg, ${WHITE} 0%, ${PURPLE_TINT} 55%, ${PURPLE_TINT2} 100%)`,
      display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"110px 64px 80px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Subtle arch background */}
      <svg style={{ position:"absolute", top:0, right:0, pointerEvents:"none" }} width="340" height="340" viewBox="0 0 340 340" fill="none">
        <path d="M340 0 Q210 0 170 90 Q130 180 340 220 Z" fill={PURPLE} opacity=".04"/>
        <path d="M340 0 Q255 0 215 65 Q175 130 340 170 Z" fill={PURPLE} opacity=".06"/>
      </svg>

      {/* Two-column layout: text left, carousel right */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center", width:"100%", maxWidth:1280, margin:"0 auto" }}>

        {/* LEFT — copy */}
        <div style={{ position:"relative" }}>
          <div style={{ animation:"fadeUp .7s ease .2s both" }}>
            <Label>Proudly Woman-Owned · Carletonville, SA</Label>
          </div>
          <h1 className="serif" style={{
            fontSize:"clamp(38px,5.5vw,80px)", fontWeight:400, lineHeight:1.05,
            letterSpacing:"-.02em", marginBottom:24, color:CHARCOAL,
            animation:"fadeUp .9s ease .38s both",
          }}>
            Your Vision.<br />
            <em style={{ color:PURPLE, fontStyle:"italic" }}>Our Expertise.</em><br />
            Flawless Execution.
          </h1>
          <p style={{ fontSize:15, lineHeight:1.9, color:BODY, maxWidth:420, marginBottom:40, fontWeight:300, animation:"fadeUp .9s ease .54s both" }}>
            A dynamic multi-service company delivering innovative solutions across events, branding, supply, and production — with creativity and precision at our core.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap", animation:"fadeUp .9s ease .68s both" }}>
            <a href="#services" className="btn-primary">Explore Services</a>
            <a href="#contact" className="btn-outline">Start a Project</a>
          </div>

          {/* Stats row */}
          <div style={{ display:"flex", gap:40, flexWrap:"wrap", marginTop:48, animation:"fadeUp .9s ease .85s both" }}>
            {[{n:"5+",l:"Service Areas"},{n:"100%",l:"Client Focused"},{n:"∞",l:"Creative Energy"}].map(s => (
              <div key={s.n} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span className="serif" style={{ fontSize:34, fontWeight:400, color:PURPLE, lineHeight:1 }}>{s.n}</span>
                <span style={{ fontSize:9, letterSpacing:".12em", textTransform:"uppercase", color:MUTED, lineHeight:1.4 }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Image Carousel */}
        <div style={{ position:"relative", animation:"fadeUp .9s ease .5s both", height:"clamp(400px,60vh,680px)" }}>
          <HeroCarousel />
        </div>

      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
        <div style={{ width:1, height:40, background:`linear-gradient(to bottom,${PURPLE},transparent)`, animation:"pulse 2s ease-in-out infinite" }} />
        <span style={{ fontSize:8, letterSpacing:".2em", textTransform:"uppercase", color:MUTED }}>Scroll</span>
      </div>
    </section>
  );
}

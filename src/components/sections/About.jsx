import { PURPLE, PURPLE_TINT, PURPLE_TINT2, CHARCOAL, BODY, MUTED, WHITE, BORDER } from "../../constants/theme";
import { Reveal } from "../common/Reveal";
import { Label } from "../common/Label";

export function About() {
  return (
    <section id="about" style={{ padding:"120px 64px", background:WHITE }}>
      <div className="about-grid" style={{ maxWidth:1140, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"center" }}>

        {/* Brand graphic */}
        <Reveal dir="left">
          <div style={{ position:"relative" }}>
            <div style={{ background:PURPLE_TINT, borderRadius:4, aspectRatio:"4/5", display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${BORDER}`, position:"relative", overflow:"hidden" }}>
              {/* Real brand photo */}
              <img
                src="/NACAFRIDAY_627.JPG"
                alt="InSource Group at NACAFRIDAY"
                loading="lazy"
                style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top" }}
              />
              {/* Subtle gradient overlay so badges stay legible */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.35) 0%, transparent 50%)" }} />
              <div style={{ position:"absolute", top:20, left:20, background:WHITE, border:`1px solid ${BORDER}`, borderRadius:2, padding:"7px 14px", fontSize:9, letterSpacing:".16em", textTransform:"uppercase", color:PURPLE, fontWeight:500 }}>Woman-Owned</div>
              <div style={{ position:"absolute", bottom:20, right:20, background:PURPLE, borderRadius:2, padding:"7px 14px", fontSize:9, letterSpacing:".14em", textTransform:"uppercase", color:WHITE, fontWeight:500 }}>Multi-Service</div>
            </div>
            <div style={{ position:"absolute", inset:"-12px -12px 12px 12px", border:`2px solid ${PURPLE_TINT2}`, borderRadius:4, zIndex:-1 }} />
          </div>
        </Reveal>

        <div>
          <Reveal delay={100}>
            <Label>About Insource Group</Label>
            <h2 className="serif" style={{ fontSize:"clamp(32px,3.5vw,52px)", fontWeight:400, lineHeight:1.15, marginBottom:24, color:CHARCOAL }}>
              Beyond Service —<br /><em style={{ color:PURPLE, fontStyle:"italic" }}>We Partner.</em>
            </h2>
            <p style={{ fontSize:15, lineHeight:1.95, color:BODY, marginBottom:20, fontWeight:300 }}>
              Insource Group is a dynamic, multi-service company delivering innovative solutions across events, branding, supply, and production. We combine creative thinking with efficient execution to bring ideas to life.
            </p>
            <p style={{ fontSize:15, lineHeight:1.95, color:BODY, marginBottom:40, fontWeight:300 }}>
              With in-house resources and a strong supplier network, we provide seamless, end-to-end services that are reliable, flexible, and results-driven — creating lasting value for every client.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { label:"Our Mission", text:"Deliver innovative, reliable solutions that empower businesses and create lasting value for clients." },
                { label:"Our Vision",  text:"To be the leading multi-service company recognized for creativity, excellence, and impactful solutions." },
              ].map(item => (
                <div key={item.label} style={{ background:PURPLE_TINT, border:`1px solid ${BORDER}`, borderRadius:3, padding:"20px" }}>
                  <div style={{ fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:PURPLE, fontWeight:500, marginBottom:8 }}>{item.label}</div>
                  <p style={{ fontSize:13, lineHeight:1.8, color:BODY }}>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

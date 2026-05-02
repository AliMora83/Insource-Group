import { PURPLE, CHARCOAL, BODY, LIGHT_GRAY } from "../../constants/theme";
import { SERVICES } from "../../constants/data";
import { Reveal } from "../common/Reveal";
import { Label } from "../common/Label";
import { ICONS } from "../common/Ico";

export function Services() {
  return (
    <section id="services" style={{ padding:"120px 64px", background:LIGHT_GRAY }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <Label center>What We Do</Label>
            <h2 className="serif" style={{ fontSize:"clamp(32px,4vw,56px)", fontWeight:400, lineHeight:1.1, color:CHARCOAL, marginTop:8 }}>
              Our Core <em style={{ color:PURPLE, fontStyle:"italic" }}>Services</em>
            </h2>
            <p style={{ fontSize:15, color:BODY, maxWidth:520, margin:"18px auto 0", lineHeight:1.85, fontWeight:300 }}>
              Delivering innovative solutions and seamless experiences that elevate your brand and events.
            </p>
          </div>
        </Reveal>

        <div className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(210px, 1fr))", gap:18 }}>
          {SERVICES.map(({ num, icon, title, desc }, i) => (
            <Reveal key={num} delay={i * 90}>
              <div className="svc-card" style={{ height:"100%" }}>
                <div className="icon-bubble">{ICONS[icon]}</div>
                <div style={{ fontSize:10, letterSpacing:".14em", color:"rgba(139,31,122,.35)", fontWeight:500, marginBottom:8 }}>{num}</div>
                <h3 style={{ fontSize:16, fontWeight:500, color:CHARCOAL, marginBottom:12, lineHeight:1.35 }}>{title}</h3>
                <p style={{ fontSize:13.5, lineHeight:1.85, color:BODY, fontWeight:300 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

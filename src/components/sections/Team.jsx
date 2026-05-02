import { PURPLE, PURPLE_TINT, CHARCOAL, BODY, MUTED, WHITE, BORDER } from "../../constants/theme";
import { VALUES } from "../../constants/data";
import { Reveal } from "../common/Reveal";
import { Label } from "../common/Label";

export function Team() {
  return (
    <section id="team" style={{ padding:"120px 64px", background:WHITE }}>
      <div style={{ maxWidth:1140, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <Label center>Founder & Team</Label>
            <h2 className="serif" style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:400, lineHeight:1.1, color:CHARCOAL, marginTop:8 }}>
              Passionate People,<br /><em style={{ color:PURPLE, fontStyle:"italic" }}>Flawless Results.</em>
            </h2>
          </div>
        </Reveal>

        <div className="team-grid" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:80, alignItems:"center" }}>
          <Reveal dir="left" delay={100}>
            <p style={{ fontSize:16, lineHeight:2, color:BODY, marginBottom:24, fontWeight:300 }}>
              Insource Group is proudly woman-owned, led by a visionary founder with a strong focus on delivering innovative, reliable, and high-quality solutions across multiple service areas.
            </p>
            <p style={{ fontSize:16, lineHeight:2, color:BODY, marginBottom:40, fontWeight:300 }}>
              Our team brings energy, creativity, and expertise to every project — working collaboratively to ensure every detail is executed flawlessly, delivering experiences that are visually compelling and professionally managed.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
              {VALUES.map(v => (
                <div key={v} className="value-chip">
                  <span style={{ width:6, height:6, borderRadius:"50%", background:PURPLE, display:"block", flexShrink:0 }} />
                  {v}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal dir="right" delay={200}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {[
                { v:"5+",    l:"Service Areas" },
                { v:"100%",  l:"Client Focus" },
                { v:"∞",     l:"Creative Drive" },
                { v:"WO",    l:"Woman-Owned" },
              ].map(({ v, l }) => (
                <div key={l} style={{ background:PURPLE_TINT, border:`1px solid ${BORDER}`, borderRadius:3, padding:"28px 20px", textAlign:"center" }}>
                  <div className="serif" style={{ fontSize:36, fontWeight:400, color:PURPLE, marginBottom:6, lineHeight:1 }}>{v}</div>
                  <div style={{ fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:MUTED, fontWeight:500 }}>{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

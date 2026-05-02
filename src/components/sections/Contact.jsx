import { PURPLE_LIGHT, WHITE, CHARCOAL } from "../../constants/theme";
import { CONTACT_DETAILS } from "../../constants/data";
import { Reveal } from "../common/Reveal";
import { Label } from "../common/Label";

export function Contact() {
  return (
    <section id="contact" style={{ padding:"120px 64px", background:CHARCOAL, position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, right:0, width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle, rgba(139,31,122,.22) 0%, transparent 70%)` }} />
      <div style={{ position:"absolute", bottom:0, left:0, width:260, height:260, borderRadius:"50%", background:`radial-gradient(circle, rgba(176,78,160,.12) 0%, transparent 70%)` }} />

      <div style={{ maxWidth:1140, margin:"0 auto", position:"relative" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"start" }}>

          <div>
            <Reveal dir="left">
              <Label light>Contact Us</Label>
              <h2 className="serif" style={{ fontSize:"clamp(32px,4vw,56px)", fontWeight:400, lineHeight:1.1, color:WHITE, marginBottom:22 }}>
                Let's Create<br /><em style={{ color:PURPLE_LIGHT, fontStyle:"italic" }}>Something Great.</em>
              </h2>
              <p style={{ fontSize:15, lineHeight:1.9, color:"rgba(255,255,255,.5)", marginBottom:48, fontWeight:300 }}>
                Ready to elevate your brand or event? Reach out and let's partner to deliver results that exceed every expectation.
              </p>
            </Reveal>

            <Reveal dir="left" delay={150}>
              <div>
                {CONTACT_DETAILS.map(item => (
                  <a key={item.label} href={item.href} className="contact-row" style={{ color:"inherit" }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"rgba(139,31,122,.28)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:PURPLE_LIGHT, flexShrink:0 }}>
                      {item.sym}
                    </div>
                    <div>
                      <div style={{ fontSize:9, letterSpacing:".18em", textTransform:"uppercase", color:PURPLE_LIGHT, fontWeight:500, marginBottom:4 }}>{item.label}</div>
                      <div style={{ fontSize:14, color:"rgba(255,255,255,.72)" }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal dir="right" delay={200}>
            <div style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.1)", borderRadius:4, padding:"48px 40px", backdropFilter:"blur(8px)" }}>
              <h3 style={{ fontFamily:"'DM Sans',sans-serif", fontSize:18, fontWeight:500, color:WHITE, marginBottom:30 }}>Send a Message</h3>
              {["Your Name","Your Email","Subject"].map(p => (
                <div key={p} style={{ marginBottom:14 }}>
                  <input placeholder={p} style={{ width:"100%", padding:"13px 18px", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", borderRadius:2, color:WHITE, fontSize:14, fontFamily:"'DM Sans',sans-serif" }}
                    onFocus={e => e.target.style.borderColor = PURPLE_LIGHT}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"}
                  />
                </div>
              ))}
              <div style={{ marginBottom:22 }}>
                <textarea rows={4} placeholder="Tell us about your project..." style={{ width:"100%", padding:"13px 18px", resize:"vertical", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.12)", borderRadius:2, color:WHITE, fontSize:14, fontFamily:"'DM Sans',sans-serif" }}
                  onFocus={e => e.target.style.borderColor = PURPLE_LIGHT}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.12)"}
                />
              </div>
              <button className="btn-primary" style={{ width:"100%", textAlign:"center" }}>Send Message</button>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

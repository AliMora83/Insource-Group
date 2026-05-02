import { PURPLE, CHARCOAL, MUTED, WHITE } from "../../constants/theme";
import { Reveal } from "../common/Reveal";
import { Label } from "../common/Label";
import { GalleryPlaceholder } from "../common/GalleryPlaceholder";

export function Gallery() {
  return (
    <section id="gallery" style={{ padding:"120px 64px", background:WHITE }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        {/* Header */}
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:64, flexWrap:"wrap", gap:20 }}>
            <div>
              <Label>Our Work</Label>
              <h2 className="serif" style={{ fontSize:"clamp(32px,4vw,54px)", fontWeight:400, lineHeight:1.1, color:CHARCOAL, marginTop:4 }}>
                Moments We've<br /><em style={{ color:PURPLE, fontStyle:"italic" }}>Brought to Life.</em>
              </h2>
            </div>
            <p style={{ fontSize:14, lineHeight:1.85, color:MUTED, maxWidth:340, fontWeight:300 }}>
              A glimpse into the events, branding, and productions we've had the privilege of delivering.
            </p>
          </div>
        </Reveal>

        {/* Masonry-style grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(12, 1fr)", gridAutoRows:"minmax(200px,auto)", gap:14 }}>

          {/* Large feature — col 1-8, row 1-2 */}
          <div style={{ gridColumn:"1 / 8", gridRow:"1 / 3" }}>
            <Reveal style={{ height:"100%" }}>
              {/* IMAGE 1: Used for 'Events & Production' */}
              <GalleryPlaceholder index={0} label="Events & Production" image="/IG-Gallery-1.png" style={{ height:"100%", minHeight:420 }} />
            </Reveal>
          </div>

          {/* Top-right A — col 8-11, row 1 */}
          <div style={{ gridColumn:"8 / 11", gridRow:"1" }}>
            <Reveal delay={80} style={{ height:"100%" }}>
              {/* IMAGE 2: Used for 'Corporate Gifting' */}
              <GalleryPlaceholder index={1} label="Corporate Gifting" image="/IG-Gallery-2.png" style={{ height:"100%", minHeight:200 }} />
            </Reveal>
          </div>

          {/* Top-right B — col 11-13, row 1 */}
          <div style={{ gridColumn:"11 / 13", gridRow:"1" }}>
            <Reveal delay={140} style={{ height:"100%" }}>
              {/* IMAGE 3: Used for 'Branding' */}
              <GalleryPlaceholder index={2} label="Branding" image="/IG-Gallery-3.png" style={{ height:"100%", minHeight:200 }} />
            </Reveal>
          </div>

          {/* Mid-right wide — col 8-13, row 2 */}
          <div style={{ gridColumn:"8 / 13", gridRow:"2" }}>
            <Reveal delay={200} style={{ height:"100%" }}>
              {/* IMAGE 4: Used for 'Event Furniture & Décor' */}
              <GalleryPlaceholder index={3} label="Event Furniture & Décor" image="/IG-Gallery-4.png" style={{ height:"100%", minHeight:200 }} />
            </Reveal>
          </div>

          {/* Bottom row — 3 equal tiles, row 3 */}
          <div style={{ gridColumn:"1 / 5", gridRow:"3" }}>
            <Reveal delay={80} style={{ height:"100%" }}>
              {/* IMAGE 5: Used for 'Accreditation Services' */}
              <GalleryPlaceholder index={4} label="Accreditation Services" image="/IG-Gallery-5.png" style={{ height:"100%", minHeight:220 }} />
            </Reveal>
          </div>
          <div style={{ gridColumn:"5 / 9", gridRow:"3" }}>
            <Reveal delay={150} style={{ height:"100%" }}>
              {/* IMAGE 6: Used for 'Logistics Supply' */}
              <GalleryPlaceholder index={5} label="Logistics Supply" image="/IG-Gallery-6.png" style={{ height:"100%", minHeight:220 }} />
            </Reveal>
          </div>
          <div style={{ gridColumn:"9 / 13", gridRow:"3" }}>
            <Reveal delay={220} style={{ height:"100%" }}>
              {/* IMAGE 7: Used for 'Printing & Signage' */}
              <GalleryPlaceholder index={6} label="Printing & Signage" image="/IG-Gallery-7.png" style={{ height:"100%", minHeight:220 }} />
            </Reveal>
          </div>

        </div>

        {/* CTA */}
        <Reveal delay={100}>
          <div style={{ textAlign:"center", marginTop:52 }}>
            <p style={{ fontSize:13, color:MUTED, marginBottom:20, letterSpacing:".04em" }}>More work coming soon.</p>
            <a href="#contact" className="btn-outline">Work With Us</a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

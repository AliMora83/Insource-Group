import { useState, useEffect } from "react";
import { HERO_IMAGES } from "../../constants/heroImages";

export function HeroCarousel() {
  const [cur,  setCur]  = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | transition

  useEffect(() => {
    const id = setInterval(() => {
      setPhase("transition");
    }, 4500);
    return () => clearInterval(id);
  }, [cur]);

  // When transition starts, after animation duration advance the index
  useEffect(() => {
    if (phase !== "transition") return;
    const id = setTimeout(() => {
      setCur(c => (c + 1) % HERO_IMAGES.length);
      setPhase("idle");
    }, 1200);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <div style={{
      position:"relative", overflow:"hidden",
      borderRadius:4,
      width:"100%", height:"100%",
      minHeight:520,
    }}>
      {/* Outgoing/Current image */}
      <img
        key={"cur-"+cur}
        src={HERO_IMAGES[cur]}
        alt={`Insource Group ${cur+1}`}
        className={`carousel-slide ${phase==="transition" ? "slide-out" : ""}`}
        style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",zIndex:2 }}
      />
      
      {/* Incoming image for slide-in */}
      {phase==="transition" && (
        <img
          key={"next-"+((cur+1)%HERO_IMAGES.length)}
          src={HERO_IMAGES[(cur+1)%HERO_IMAGES.length]}
          alt=""
          className="carousel-slide slide-in"
          style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",zIndex:1 }}
        />
      )}
      {/* Dot indicators */}
      <div style={{ position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",display:"flex",gap:8,zIndex:10 }}>
        {HERO_IMAGES.map((_,i) => (
          <div key={i} style={{
            width: i===cur ? 22 : 7,
            height:7,
            borderRadius:4,
            background: i===cur ? "#8B1F7A" : "rgba(139,31,122,.3)",
            transition:"width .4s cubic-bezier(.4,0,.2,1), background .3s",
          }} />
        ))}
      </div>
    </div>
  );
}

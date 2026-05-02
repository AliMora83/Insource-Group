import { useState } from "react";
import { PURPLE, WHITE } from "../../constants/theme";
import { GALLERY_TINTS, GALLERY_ICONS } from "../../constants/data";

export function GalleryPlaceholder({ index, label, image, style = {} }) {
  const [hovered, setHovered] = useState(false);
  const hasImage = !!image;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hasImage ? "#000" : GALLERY_TINTS[index % GALLERY_TINTS.length],
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "box-shadow .35s, transform .35s",
        boxShadow: hovered ? "0 16px 48px rgba(139,31,122,.18)" : "0 2px 12px rgba(139,31,122,.07)",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        display: "flex", alignItems: "center", justifyContent: "center",
        ...style,
      }}
    >
      {/* Background Image */}
      {hasImage && (
        <img
          src={image}
          alt={label}
          loading="lazy"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", zIndex: 0,
            transition: "transform 0.6s ease, opacity 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            opacity: hovered ? 0.8 : 1
          }}
        />
      )}

      {/* Pattern overlay (only if no image) */}
      {!hasImage && (
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.12 }} viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id={`g${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.2" fill={PURPLE} />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#g${index})`} />
        </svg>
      )}

      {/* Diagonal accent line (only if no image) */}
      {!hasImage && (
        <div style={{
          position:"absolute", top:0, left:0, right:0, bottom:0,
          background:`linear-gradient(135deg, rgba(139,31,122,.06) 0%, transparent 50%)`,
        }} />
      )}

      {/* Image text contrast overlay */}
      {hasImage && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          opacity: hovered ? 0.95 : 0.65,
          transition: "opacity 0.4s"
        }} />
      )}

      {/* Centre content */}
      <div style={{ position:"relative", textAlign:"center", padding:"24px 20px", zIndex:2 }}>
        <div style={{
          fontSize:28, color: hasImage ? WHITE : `rgba(139,31,122,.25)`, marginBottom:14, lineHeight:1,
          transform: hovered ? "scale(1.2)" : "scale(1)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1), color 0.4s",
          opacity: hasImage ? (hovered ? 1 : 0.8) : 1
        }}>
          {GALLERY_ICONS[index % GALLERY_ICONS.length]}
        </div>
        <div style={{
          fontSize: 9, letterSpacing:".2em", textTransform:"uppercase",
          color: hasImage ? WHITE : `rgba(139,31,122,.55)`, fontWeight:500, lineHeight:1.4,
          transition: "color 0.4s",
          opacity: hasImage ? (hovered ? 1 : 0.9) : 1
        }}>{label}</div>
        <div style={{
          width:0, height:1.5, background: hasImage ? WHITE : PURPLE, margin:"10px auto 0",
          transition:"width .4s cubic-bezier(.16,1,.3,1)",
          ...(hovered ? { width:32 } : {}),
        }} />
      </div>

      {/* Hover overlay (only if no image) */}
      {!hasImage && (
        <div style={{
          position:"absolute", inset:0,
          background:`rgba(139,31,122,.04)`,
          opacity: hovered ? 1 : 0,
          transition:"opacity .35s",
        }} />
      )}

      {/* Top-right hint */}
      <div style={{
        position:"absolute", top:12, right:12,
        background: hasImage ? "rgba(0,0,0,.6)" : "rgba(255,255,255,.6)", borderRadius:2,
        padding:"5px 10px", fontSize:9, letterSpacing:".14em",
        textTransform:"uppercase", color: hasImage ? WHITE : PURPLE, fontWeight:500,
        opacity: hovered ? 1 : 0, transition:"opacity .3s",
        backdropFilter:"blur(4px)",
        zIndex: 2
      }}>{hasImage ? "View Details" : "+ Add Photo"}</div>
    </div>
  );
}

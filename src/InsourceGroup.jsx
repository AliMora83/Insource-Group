import { useState, useEffect } from "react";
import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Ticker } from "./components/sections/Ticker";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { Gallery } from "./components/sections/Gallery";
import { Team } from "./components/sections/Team";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { 
  WHITE, CHARCOAL, LIGHT_GRAY, PURPLE, BODY, BORDER, 
  PURPLE_TINT, PURPLE_DARK 
} from "./constants/theme";

/* ── Global CSS ───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: ${WHITE};
    color: ${CHARCOAL};
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${LIGHT_GRAY}; }
  ::-webkit-scrollbar-thumb { background: ${PURPLE}; border-radius: 2px; }

  .serif { font-family: 'Playfair Display', serif; }

  .reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  .reveal-left {
    opacity: 0; transform: translateX(-28px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-left.visible { opacity: 1; transform: translateX(0); }
  .reveal-right {
    opacity: 0; transform: translateX(28px);
    transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-right.visible { opacity: 1; transform: translateX(0); }

  @keyframes fadeDown  { from{opacity:0;transform:translateY(-14px);}to{opacity:1;transform:translateY(0);} }
  @keyframes fadeUp    { from{opacity:0;transform:translateY(22px);}to{opacity:1;transform:translateY(0);} }
  @keyframes pulse     { 0%,100%{opacity:.5;}50%{opacity:1;} }
  @keyframes floatRing { 0%,100%{transform:translateY(0) rotate(0deg);}50%{transform:translateY(-10px) rotate(8deg);} }
  @keyframes tickerSlide { 0%{transform:translateX(0);}100%{transform:translateX(-50%);} }
  @keyframes slideOutLeft  { from{opacity:1;transform:translateX(0) scale(1);}    to{opacity:0;transform:translateX(-40px) scale(0.96);} }
  @keyframes slideInRight  { from{opacity:0;transform:translateX(40px) scale(1.04);} to{opacity:1;transform:translateX(0) scale(1);} }
  .carousel-slide { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center; mix-blend-mode: multiply; }
  .slide-out { animation:slideOutLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .slide-in  { animation:slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

  .nav-link {
    color: ${BODY};
    text-decoration: none;
    font-size: 12px;
    letter-spacing: .14em;
    text-transform: uppercase;
    font-weight: 500;
    transition: color .25s;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -3px; left: 0; right: 0;
    height: 1.5px; background: ${PURPLE};
    transform: scaleX(0); transform-origin: left;
    transition: transform .3s cubic-bezier(.16,1,.3,1);
  }
  .nav-link:hover { color: ${PURPLE}; }
  .nav-link:hover::after { transform: scaleX(1); }

  .svc-card {
    background: ${WHITE};
    border: 1px solid ${BORDER};
    border-radius: 3px;
    padding: 40px 32px 36px;
    transition: box-shadow .35s, transform .35s, border-color .35s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }
  .svc-card::after {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: ${PURPLE};
    transform: scaleY(0); transform-origin: bottom;
    transition: transform .4s cubic-bezier(.16,1,.3,1);
  }
  .svc-card:hover {
    box-shadow: 0 12px 48px rgba(139,31,122,.1);
    transform: translateY(-4px);
    border-color: rgba(139,31,122,.3);
  }
  .svc-card:hover::after { transform: scaleY(1); }

  .icon-bubble {
    width: 56px; height: 56px; border-radius: 50%;
    background: ${PURPLE_TINT};
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
    transition: background .3s;
  }
  .svc-card:hover .icon-bubble { background: ${PURPLE}; }
  .svc-card:hover .icon-svg { stroke: ${WHITE} !important; }

  .btn-primary {
    display: inline-block;
    padding: 13px 36px;
    background: ${PURPLE};
    color: ${WHITE};
    text-decoration: none;
    font-size: 11px; letter-spacing: .18em; text-transform: uppercase; font-weight: 500;
    border-radius: 2px; border: 1.5px solid ${PURPLE};
    transition: background .3s, transform .2s; cursor: pointer; font-family: 'DM Sans',sans-serif;
  }
  .btn-primary:hover { background: ${PURPLE_DARK}; border-color: ${PURPLE_DARK}; transform: translateY(-1px); }

  .btn-outline {
    display: inline-block;
    padding: 13px 36px;
    background: transparent; color: ${PURPLE};
    text-decoration: none;
    font-size: 11px; letter-spacing: .18em; text-transform: uppercase; font-weight: 500;
    border-radius: 2px; border: 1.5px solid ${PURPLE};
    transition: background .3s, color .3s; cursor: pointer; font-family: 'DM Sans',sans-serif;
  }
  .btn-outline:hover { background: ${PURPLE_TINT}; }

  .contact-row {
    display: flex; align-items: flex-start; gap: 16px;
    padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,.08);
    text-decoration: none; transition: padding-left .3s;
  }
  .contact-row:hover { padding-left: 6px; }
  .contact-row:last-child { border-bottom: none; }

  .value-chip {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 18px; border: 1px solid rgba(139,31,122,.2);
    border-radius: 100px; font-size: 12px; letter-spacing: .06em;
    color: ${PURPLE_DARK}; font-weight: 500; background: ${PURPLE_TINT};
  }

  .ticker-wrap { overflow: hidden; }
  .ticker-inner { display: flex; width: max-content; animation: tickerSlide 22s linear infinite; }
  .ticker-item {
    display: flex; align-items: center; gap: 18px;
    padding: 0 28px; white-space: nowrap;
    font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: ${WHITE}; font-weight: 500;
  }

  input::placeholder, textarea::placeholder { color: rgba(255,255,255,.3); }
  input, textarea { outline: none; transition: border-color .25s; }
`;

export default function InsourceGroup() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  const nav = scrollY > 40;

  return (
    <>
      <style>{css}</style>
      <Nav nav={nav} />
      <Hero />
      <Ticker />
      <About />
      <Services />
      <Gallery />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}

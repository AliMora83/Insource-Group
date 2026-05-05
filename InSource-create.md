# InSource Group — Website Build Guide

> **Stack:** React.js · JavaScript · Vite · CSS-in-JS (inline styles)  
> **Repo:** https://github.com/AliMora83/Insource-Group.git  
> **Main file:** `InsourceGroup.jsx`

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Setup](#2-project-setup)
3. [Folder Structure](#3-folder-structure)
4. [Installing Dependencies](#4-installing-dependencies)
5. [Adding the Component](#5-adding-the-component)
6. [Adding Your Logo](#6-adding-your-logo)
7. [Adding Gallery Images](#7-adding-gallery-images)
8. [Running the Dev Server](#8-running-the-dev-server)
9. [Building for Production](#9-building-for-production)
10. [Deploying to GitHub Pages](#10-deploying-to-github-pages-optional)
11. [Customisation Reference](#11-customisation-reference)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Prerequisites

Make sure the following are installed on your machine before starting:

| Tool | Minimum Version | Check |
|------|----------------|-------|
| Node.js | 18.x or higher | `node -v` |
| npm | 9.x or higher | `npm -v` |
| Git | Any recent version | `git --version` |

Download Node.js from https://nodejs.org if not already installed.

---

## 2. Project Setup

### Clone the repository

```bash
git clone https://github.com/AliMora83/Insource-Group.git
cd Insource-Group
```

### Scaffold Vite + React inside the repo

If the repo is empty (no existing React app), run:

```bash
npm create vite@latest . -- --template react
```

> The `.` tells Vite to scaffold into the **current directory**.  
> If prompted about a non-empty directory, choose **"Ignore files and continue"**.

When prompted:
- **Framework:** React
- **Variant:** JavaScript

---

## 3. Folder Structure

After setup your project should look exactly like this:

```
Insource-Group/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── assets/
│   │   └── images/
│   │       │
│   │       ├── logo/
│   │       │   └── 📌 insource-logo.png        ← ADD YOUR LOGO HERE
│   │       │
│   │       ├── hero/
│   │       │   ├── IG-Hero-1.png               ← Hero carousel image 1
│   │       │   ├── IG-Hero-2.png               ← Hero carousel image 2
│   │       │   └── IG-Hero-3.png               ← Hero carousel image 3
│   │       │
│   │       └── gallery/
│   │           ├── 📌 gallery-01.jpg           ← ADD: Events & Production  (large hero tile)
│   │           ├── 📌 gallery-02.jpg           ← ADD: Corporate Gifting    (top-right small)
│   │           ├── 📌 gallery-03.jpg           ← ADD: Branding             (top-right small)
│   │           ├── 📌 gallery-04.jpg           ← ADD: Event Furniture & Décor (wide panoramic)
│   │           ├── 📌 gallery-05.jpg           ← ADD: Accreditation Services  (bottom row)
│   │           ├── 📌 gallery-06.jpg           ← ADD: Logistics Supply        (bottom row)
│   │           └── 📌 gallery-07.jpg           ← ADD: Printing & Signage      (bottom row)
│   │
│   ├── InsourceGroup.jsx                       ← Main one-page component
│   └── main.jsx                                ← App entry point
│
├── index.html
├── vite.config.js
├── package.json
└── InSource-create.md                          ← This guide
```

> 📌 **Items marked with 📌 are files YOU need to add.** See sections 6 and 7 for details.

---

## 4. Installing Dependencies

```bash
npm install
```

No additional libraries are required. The component uses only:

- **React** (`useState`, `useEffect`, `useRef`) — included by default
- **Google Fonts** — loaded via `@import` inside the component (requires internet connection on first load)

---

## 5. Adding the Component

**Step 1** — Copy `InsourceGroup.jsx` into `src/`:

```bash
cp InsourceGroup.jsx src/InsourceGroup.jsx
```

**Step 2** — Replace the entire contents of `src/main.jsx` with:

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import InsourceGroup from './InsourceGroup'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InsourceGroup />
  </React.StrictMode>
)
```

**Step 3** — Update the `<title>` in `index.html`:

```html
<title>InSource Group</title>
```

**Step 4** — Remove default Vite boilerplate files (no longer needed):

```bash
rm src/App.jsx src/App.css src/index.css
```

---

## 6. Adding Your Logo

The component currently renders a **text-based logo mark**. To replace it with your real logo:

### Step 1 — Place your logo file

```
src/assets/images/logo/insource-logo.png
```

Accepted formats: `.png` with transparent background (recommended), `.svg`, `.webp`

### Step 2 — Import it at the top of `InsourceGroup.jsx`

```js
import logoImg from './assets/images/logo/insource-logo.png';
```

### Step 3 — Find the nav logo block

Search for this block in the nav section (around line 285):

```jsx
<div style={{ display:"flex", alignItems:"center", gap:10, animation:"fadeDown .7s ease both" }}>
  <div style={{ width:36, height:36, borderRadius:"50%", background:... }}>
    <span ...>I</span>
  </div>
  <div>
    <div ...>In<span ...>Source</span>.</div>
    <div ...>Group</div>
  </div>
</div>
```

### Step 4 — Replace it with your logo image

```jsx
<div style={{ animation:"fadeDown .7s ease both" }}>
  <img
    src={logoImg}
    alt="InSource Group"
    style={{ height: 44, width: "auto", display: "block" }}
  />
</div>
```

> Adjust the `height` value (default `44px`) to match your logo's proportions.  
> The width will scale automatically to maintain the aspect ratio.

---

## 7. Adding Gallery Images

The gallery section has **7 placeholder tiles** that you can replace with real photos one at a time.

### Step 1 — Add your images

Place photos in `src/assets/images/gallery/` using the filenames below:

| File | Grid position | Recommended subject | Ideal size |
|------|--------------|---------------------|------------|
| `gallery-01.jpg` | **Large hero tile** — left side, 2 rows tall | Best flagship event photo | 1200 × 900px |
| `gallery-02.jpg` | Top-right small square | Corporate gifting flat-lay | 800 × 600px |
| `gallery-03.jpg` | Top-right small square | Branding / print work | 800 × 600px |
| `gallery-04.jpg` | **Wide panoramic** — mid right | Event venue setup / stage | 1400 × 530px |
| `gallery-05.jpg` | Bottom row tile | Accreditation / guest check-in | 900 × 675px |
| `gallery-06.jpg` | Bottom row tile | Logistics / equipment supply | 900 × 675px |
| `gallery-07.jpg` | Bottom row tile | Printing / signage output | 900 × 675px |

> **Compress before uploading.** Keep each image under 500 KB.  
> Use https://squoosh.app for free browser-based compression.

### Step 2 — Import images at the top of `InsourceGroup.jsx`

```js
import gallery01 from './assets/images/gallery/gallery-01.jpg';
import gallery02 from './assets/images/gallery/gallery-02.jpg';
import gallery03 from './assets/images/gallery/gallery-03.jpg';
import gallery04 from './assets/images/gallery/gallery-04.jpg';
import gallery05 from './assets/images/gallery/gallery-05.jpg';
import gallery06 from './assets/images/gallery/gallery-06.jpg';
import gallery07 from './assets/images/gallery/gallery-07.jpg';
```

### Step 3 — Add the `GalleryTile` component

Paste this component directly below the existing `GalleryPlaceholder` component in the file:

```jsx
function GalleryTile({ src, label, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        transition: "box-shadow .35s, transform .35s",
        boxShadow: hovered
          ? "0 16px 48px rgba(139,31,122,.2)"
          : "0 2px 12px rgba(0,0,0,.08)",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        ...style,
      }}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center",
          display: "block",
          transition: "transform .5s cubic-bezier(.16,1,.3,1)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />
      {/* Label overlay on hover */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(139,31,122,.75) 0%, transparent 55%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity .35s",
        display: "flex", alignItems: "flex-end",
        padding: "20px 18px",
      }}>
        <span style={{
          fontSize: 11, letterSpacing: ".16em",
          textTransform: "uppercase", color: "#fff", fontWeight: 500,
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}
```

### Step 4 — Swap placeholders for real tiles

In the gallery grid section, replace each `GalleryPlaceholder` with `GalleryTile` as you add photos.

**Before (placeholder):**
```jsx
<GalleryPlaceholder index={0} label="Events & Production" style={{ height:"100%", minHeight:420 }} />
```

**After (real image):**
```jsx
<GalleryTile src={gallery01} label="Events & Production" style={{ height:"100%", minHeight:420 }} />
```

Repeat for each of the 7 tiles. You can mix both components freely — replace tiles one at a time as images become available.

---

## 8. Running the Dev Server

```bash
npm run dev
```

Open in your browser: **http://localhost:5173**

The dev server supports **hot module replacement (HMR)** — changes to `InsourceGroup.jsx` reflect instantly in the browser without a full reload.

---

## 9. Building for Production

```bash
npm run build
```

Output is written to the `dist/` folder. All assets are automatically hashed and optimised by Vite.

Preview the production build locally before deploying:

```bash
npm run preview
```

---

## 10. Deploying to GitHub Pages (optional)

### Step 1 — Install the deploy package

```bash
npm install --save-dev gh-pages
```

### Step 2 — Update `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Insource-Group/',   // Must match your GitHub repo name exactly (case-sensitive)
})
```

### Step 3 — Add deploy scripts to `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 4 — Deploy

```bash
npm run deploy
```

Live site: **https://alimora83.github.io/Insource-Group/**

### Step 5 — Push source code

```bash
git add .
git commit -m "feat: InSource Group website initial build"
git push origin main
```

---

## 11. Customisation Reference

### Brand Colours

All colours are constants at the top of `InsourceGroup.jsx`. Edit them to update the entire site:

```js
const PURPLE       = "#8B1F7A";   // Primary brand purple
const PURPLE_DARK  = "#6A1660";   // Hover / active state
const PURPLE_LIGHT = "#B04EA0";   // Light accents
const PURPLE_TINT  = "#F7EFF6";   // Very light background tint
const PURPLE_TINT2 = "#EDD9EA";   // Slightly deeper tint
const CHARCOAL     = "#1C1C1E";   // Headline text
const BODY         = "#4A4A55";   // Body / paragraph text
const MUTED        = "#8A8A97";   // Secondary / muted text
const WHITE        = "#FFFFFF";   // Backgrounds
const LIGHT_GRAY   = "#F3F2F0";   // Section alternate background
```

### Typography

| Usage | Font | Applied via |
|-------|------|-------------|
| Display headings, hero | Playfair Display | `className="serif"` |
| Body, nav, buttons, labels | DM Sans | Default (no class needed) |

To change fonts, update the `@import` URL inside the `css` constant string at the top of the file.

### Services list

Find the `SERVICES` array (around line 225) to add, remove, or rename services:

```js
const SERVICES = [
  { num:"01", icon:"gift",  title:"Corporate Gifts & Clothing",          desc:"..." },
  { num:"02", icon:"print", title:"Branding & Printing",                 desc:"..." },
  { num:"03", icon:"badge", title:"RSVP & Event Accreditation Services", desc:"..." },
  { num:"04", icon:"truck", title:"Event Management & Logistics Supply", desc:"..." },
  { num:"05", icon:"sofa",  title:"Event Furniture & Décor",             desc:"..." },
];
```

### Contact details

Find the contact array in the contact section and update with current details:

```js
{ label:"General Enquiries",  value:"admin@insourcegroup.co.za",      href:"mailto:admin@insourcegroup.co.za" },
{ label:"Project Manager",    value:"production@insourcegroup.co.za", href:"mailto:production@insourcegroup.co.za" },
{ label:"Phone",              value:"075 201 2968  ·  084 819 8090",  href:"tel:0752012968" },
{ label:"Address",            value:"Benchmark Office Park, 1 Larch Nook, Zwartkop, Centurion, 0157", href:"#" },
```

### Hero carousel timing

Change how long each image displays (default: 3 seconds):

```js
// Inside HeroCarousel component, find:
const id = setInterval(() => {
  setPrev(cur);
  setPhase("transition");
}, 3000);   // ← Change this value in milliseconds (3000 = 3 seconds)
```

Change slide transition speed (default: 700ms):

```js
// In the phase === "transition" useEffect:
const id = setTimeout(() => {
  setCur(c => (c + 1) % HERO_IMAGES.length);
  ...
}, 700);   // ← Transition animation duration in milliseconds
```

---

## 12. Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Blank white page | React not mounting | Check browser console for errors. Ensure `main.jsx` imports `InsourceGroup` correctly |
| Fonts not loading | No internet / Google blocked | Self-host fonts: download from [Google Fonts](https://fonts.google.com) and place in `src/assets/fonts/` |
| Images not showing | Wrong import path | Verify the filename and path match exactly — file names are case-sensitive |
| `Module not found` error | Missing import statement | Ensure all gallery/logo imports are added at the top of `InsourceGroup.jsx` |
| GitHub Pages shows 404 | Wrong `base` in `vite.config.js` | Set `base: '/Insource-Group/'` — must match repo name exactly, including capitalisation |
| Build fails | Unused import | Remove any `import` statements for files that don't exist yet |
| Carousel images slow to load | Large image files | Compress with [squoosh.app](https://squoosh.app) — target under 300 KB per image |
| Gallery grid looks broken | Missing CSS grid support | Ensure the browser is Chrome 88+, Firefox 87+, or Safari 14.1+ |

---

## Quick-Start Checklist

Use this checklist to track your progress:

```
□  Node.js 18+ installed
□  Repo cloned from GitHub
□  Vite + React scaffolded:  npm create vite@latest . -- --template react
□  Dependencies installed:   npm install
□  InsourceGroup.jsx placed in src/
□  main.jsx updated to render <InsourceGroup />
□  index.html title set to "InSource Group"
□  Boilerplate files removed (App.jsx, App.css, index.css)

□  📌  LOGO added →     src/assets/images/logo/insource-logo.png
□  📌  Logo import added to top of InsourceGroup.jsx
□  📌  Nav logo block replaced with <img> tag

□  📌  GALLERY images added → src/assets/images/gallery/gallery-01.jpg  (×7)
□  📌  Gallery imports added to top of InsourceGroup.jsx
□  📌  GalleryTile component added to InsourceGroup.jsx
□  📌  GalleryPlaceholder components replaced with GalleryTile where images exist

□  Dev server tested:        npm run dev  →  http://localhost:5173
□  Production build tested:  npm run build && npm run preview
□  Changes pushed to GitHub: git push origin main
□  (Optional) Deployed:      npm run deploy  →  GitHub Pages live
```

---

*Built for InSource Group — Centurion, South Africa*  
*"Your Vision: Our Expertise, Flawless Execution."*

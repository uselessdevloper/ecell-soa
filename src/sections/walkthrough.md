# Walkthrough: Stage Tag Removal & "WHAT WE DO" Camera Shutter Typography Redesign

---

## 1. Removed Stage Tag Prefix Across All Pages
- Removed `stageTag` (`STAGE 01 // ...`, `STAGE 02 // ...`, etc.) completely from [StageHeader.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/components/UI/StageHeader.jsx) and all section calls:
  - [S2_WhoWeAre.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S2_WhoWeAre.jsx)
  - [S3_WhatWeDo.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S3_WhatWeDo.jsx)
  - [S4_Events.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S4_Events.jsx)
  - [S5_Teams.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S5_Teams.jsx)
  - [S6_Founders.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S6_Founders.jsx)
  - [S7_YourMove.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S7_YourMove.jsx)
- Removed `LAST STAGE ·` badge prefix from the Thank You finale block.

---

## 2. Redesigned "WHAT WE DO" Page ([S3_WhatWeDo.jsx](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S3_WhatWeDo.jsx) & [S3_WhatWeDo.module.css](file:///Users/utkarshsinha/Desktop/dominoweb/src/sections/S3_WhatWeDo.module.css))

### Stacked Big Display Typography (Reference Design)
- Replaced the previous 3 domino cards with a large, clean stacked typographic list with horizontal line dividers:
  - **`EVENTS`** — *Competitions · 36-Hr Buildathons · Flagship Summits*
  - **`MENTORSHIP`** — *Alumni Founders · 1-on-1 Advisory · Industry Titans*
  - **`EXPOSURE`** — *National VC Pipeline · Angel Rounds · Incubation*
- **Big & Visible Properly**: Set typography to `clamp(2.8rem, 5.5vw, 5.2rem)` in bold uppercase with high-contrast text shadows and metallic gold/cyan hover glow.

### Smooth Camera Shutter Photo Reel Background
- Cycles through all 6 images provided:
  1. `/founders-stage.jpg`
  2. `/exp-img-7878.jpg`
  3. `/exp-dsc-0120.jpg`
  4. `/events-domino.jpg`
  5. `/exp-events-crowd.jpg`
  6. `/DSC07299.JPG`
- **Low Opacity & Vignette**: Background slides set to `0.32` opacity with a deep radial vignette so the foreground text remains sharp, legible, and prominent.
- **Camera Shutter Flash Transition**: Automatically changes every 3.2s with a subtle white aperture flash (`180ms`), smooth zoom scale (`1.02` → `1.07`), and interactive hover switching.
- **Cinematic Viewfinder HUD**: Displays `REC 00:0X:24`, `ISO 400 · 1/250s · f/2.8`, frame counter, and center crosshair reticle.

---

## 3. Verification
- `npm run build` completed in 411ms with **0 errors**.
- All changes hot-reloaded and verified on the local development server.

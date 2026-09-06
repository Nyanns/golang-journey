---
name: frontend-design
description: World-class UI/UX Design System for React + TailwindCSS (Spatial, Glassmorphism, Micro-Interactions, Modern Dark/Light Mode)
---

# 🎨 World-Class UI/UX Design Skill for React & TailwindCSS

When generating, designing, or refactoring frontend interfaces, ALWAYS adhere to the following modern UI/UX design standards to create stunning, premium, and production-grade applications.

---

## 1. 🌈 Color System & Palette Philosophy (Anti-Generic Constraint)
- **NO Generic Colors**: Never use pure red (`#ff0000`), harsh pure black (`#000000`), or cheap neon gradients.
- **Light Mode Foundation (Default)**:
  - Canvas: `bg-slate-50` / `bg-white`
  - Surface/Cards: `bg-white` with crisp `border border-slate-200/90` and subtle micro-shadow `shadow-[0_1px_3px_rgba(0,0,0,0.04)]`
  - Text Primary: `text-slate-900`
  - Text Muted: `text-slate-500`
- **Dark Mode Palette**:
  - Background: `bg-[#121519]` / `bg-slate-950`
  - Surface/Cards: `bg-[#1a1e24]` / `bg-slate-900` with subtle border `border-slate-800`
  - Text Primary: `text-slate-100`
  - Text Muted: `text-slate-400`
- **Brand Accent Colors**:
  - Primary: Pixiv Sky Blue (`#0096fa` / `sky-500` / `sky-600`).
  - Active/Favorite: Rose (`rose-500` / `rose-600`) for likes/favorites.

---

## 2. 🪟 Surface & Depth (Zero Glassmorphism & Micro-Shadows)
- **NO Glassmorphism**:
  - ❌ Avoid `backdrop-blur-*` AI-slop soup.
  - ✅ Use crisp, solid surfaces (`bg-white` dark: `bg-[#1a1e24]`) with clean 1px borders (`border-slate-200` dark: `border-slate-800`).
- **Micro-Shadows**:
  - Clean elevation with subtle natural shadow: `shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md`
  - Card hover lift: `transition-all duration-200 ease-out hover:-translate-y-0.5`

---

## 3. ✍️ Typography & Visual Hierarchy
- **Font Family**: Modern clean sans-serif (Inter, Plus Jakarta Sans, Outfit).
- **Hierarchy Rules**:
  - Headings: `font-bold tracking-tight text-white`
  - Section Titles: Small uppercase with tracking (`text-xs font-semibold uppercase tracking-wider text-indigo-400`)
  - Body: `text-sm leading-relaxed text-slate-300`
  - Metadata / Subtitles: `text-xs text-slate-500`

---

## 4. ✨ Micro-Interactions & Animation
- **Hover Transitions**:
  Every interactive element MUST have smooth transitions:
  `transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]`
- **Interactive Buttons**:
  - Primary: `bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all`
  - Ghost/Secondary: `bg-slate-800/60 hover:bg-slate-800 text-slate-200 border border-slate-700/50`
- **Loading State**:
  Never use raw "Loading..." text. Always use animated skeleton shimmer or sleek spinners.
- **Empty States**:
  Beautiful empty states with a soft glowing icon container and a clear call-to-action button.

---

## 5. 📱 Layout, Spacing & Component Structure
- **Container Sizing**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Spacious Flow**: Generous padding (`p-6` or `p-8` on cards), comfortable gap spacing (`gap-6` or `gap-8`).
- **Icons**: Use [Lucide React](https://lucide.dev) with consistent stroke-width (`size={18}` or `size={20}`, `strokeWidth={1.75}`).
- **Badges/Tags**:
  `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20`

---

## 6. ⚡ Client-Side Media Preprocessing (Instagram-Style Standards)
- **Zero Raw Bloat Uploads**:
  Never upload 10MB–20MB uncompressed raw DSLR or digital painting files directly over the network.
- **Intelligent Client-Side Downscaling**:
  - Resample oversized images down to optimal web bounds (max 2560px for artworks/galleries, 500px for avatars, 1920px for headers) using high-quality HTML5 Canvas bicubic resampling (`ctx.imageSmoothingQuality = 'high'`).
- **High-Efficiency Encoding**:
  - Default to WebP with JPEG fallback at 0.88–0.90 quality factor (visually lossless, maintains crisp line-art, slashes payload size by 85%–95%).
- **Alpha-Channel Awareness**:
  - Inspect canvas pixel data for transparent alpha before converting to avoid black backgrounds on transparent illustrations or stickers.
- **User Agency & Transparent Feedback**:
  - Provide an Instagram-style optimizer status badge showing original vs optimized size (e.g. `14.8 MB → 740 KB (-95%)`).
  - Provide an explicit toggle for artists who specifically request raw uncompressed archival uploads.

---

## 7. 📱 Modern Responsive Web Design & Viewport Ergonomics (2026 Standards)

### Dynamic Viewport Heights (`dvh` & `svh` vs Static `vh`)
- **NEVER use static `vh` for full/split media stages or modals**:
  Mobile browsers (Safari iOS, Chrome Android) collapse/expand their address and navigation bars dynamically on scroll. Static `100vh` calculates height as if the address bar is hidden, causing bottom buttons and image controls to get cut off or trigger layout shifts (CLS).
- **Enforce Dynamic Viewport Heights**:
  - Use `max-h-[75dvh]` or `max-h-[85dvh]` with explicit responsive minimums: `min-h-[260px] sm:min-h-[420px]` and `object-contain`.
  - Use `svh` (Small Viewport Height) for fixed overlay bars or sheet backdrops where content must guarantee visibility even when mobile browser chrome is fully expanded.

### Mobile Thumb-Zone Ergonomics & Bottom Navigation
- **Primary Mobile Reachability**:
  Smartphone screens (6.1" to 6.8"+) make top-screen buttons unreachable with one hand.
  - Core navigation (Feed, Explore, Search, Bookmarks, Profile) and primary creation action (`+ Upload`) must be accessible within the lower thumb zone via a fixed `<BottomNav />` (< 768px).
  - Prominent center action button (e.g. elevated square/pill with subtle brand glow) for the primary conversion/creation loop.
- **Safe Area Inset Protection**:
  Mobile navigation bars must explicitly respect hardware notches, home indicator bars, and gesture areas:
  `pb-[max(0.75rem,env(safe-area-inset-bottom))]`
- **Bottom Clearance Padding**:
  Any page or container rendering above a fixed mobile bottom bar must provide clearance padding to prevent the bar from covering content or form submit buttons:
  `pb-24 md:pb-8` on the main page wrapper.

### Fluid Multi-Tier Grid Breakpoints
Galleries and media feeds must scale density gracefully across all modern display tiers:
- **Mobile (< 640px)**: `grid-cols-2 gap-3` (rich 2-column density, clean touch target cards).
- **Tablet / Phablet (640px - 768px)**: `sm:grid-cols-3 gap-3 sm:gap-4`.
- **Laptop / Small Desktop (768px - 1280px)**: `md:grid-cols-4 lg:grid-cols-4 gap-4`.
- **Desktop Widescreen (1280px - 1536px)**: `xl:grid-cols-5 gap-4`.
- **Ultrawide & High-DPI Displays (>= 1536px)**: `2xl:grid-cols-6 gap-4`.

### Touch Device State Handling (No Hover Traps)
- **Eliminate Invisible Touch Controls**:
  Elements relying strictly on `opacity-0 group-hover:opacity-100` are invisible on touch screens and frustrate mobile users.
  - On touch devices, provide gentle ambient visibility (`opacity-85 sm:opacity-0 group-hover:opacity-100`) or dedicated touch triggers.
  - Active states (`active:scale-95`) must give immediate haptic/tactile visual feedback for finger taps.



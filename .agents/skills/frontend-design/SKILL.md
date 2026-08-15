---
name: frontend-design
description: World-class UI/UX Design System for React + TailwindCSS (Spatial, Glassmorphism, Micro-Interactions, Modern Dark/Light Mode)
---

# 🎨 World-Class UI/UX Design Skill for React & TailwindCSS

When generating, designing, or refactoring frontend interfaces, ALWAYS adhere to the following modern UI/UX design standards to create stunning, premium, and production-grade applications.

---

## 1. 🌈 Color System & Palette Philosophy (Anti-Generic Constraint)
- **NO Generic Colors**: Never use pure red (`#ff0000`), harsh pure black (`#000000`), or cheap neon gradients.
- **Dark Mode Palette**:
  - Background: `bg-slate-950` or `bg-zinc-950`
  - Surface/Cards: `bg-slate-900/80` or `bg-zinc-900/70` with subtle border `border-slate-800/80`
  - Text Primary: `text-slate-100` / `text-zinc-100`
  - Text Muted: `text-slate-400` / `text-zinc-400`
- **Brand Accent Colors**:
  - Primary: Refined Indigo (`indigo-500` / `indigo-600`), Violet, or Emerald.
  - Glow & Gradients: Subtle mesh gradients (`bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-transparent`).

---

## 2. 🪟 Surface & Depth (Glassmorphism & Diffusion Shadows)
- **Glassmorphic Cards**:
  `backdrop-blur-xl bg-slate-900/60 border border-slate-700/40 rounded-2xl shadow-xl`
- **Diffusion Shadows**:
  Use multi-layered diffuse shadows instead of harsh dark outlines:
  `shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]`
- **Inner Highlights**:
  Add subtle top inner border for a glassy 3D look: `shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]`

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

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// ── Interactive Cosmic Sparkle & Ambient Stardust Engine ──
// High-performance canvas effect:
// 1. Interactive 4-pointed sparkle stars on mouse move, drag, and click burst.
// 2. Slow, ethereal ambient stardust & subtle aurora breathing in the background.
// 3. GPU-friendly, pooled particle memory (zero allocations in RAF loop).
// 4. Automatically suspends when disabled or tab is hidden.

const MAX_PARTICLES = 160;
const AMBIENT_COUNT = 35;

export const BackgroundEffect = () => {
  const { bgEffect, theme } = useTheme();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!bgEffect) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId = null;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    // Track mouse state
    let mouse = { x: -9999, y: -9999, px: -9999, py: -9999, down: false };
    let isMoving = false;
    let moveTimeout = null;

    // Fixed particle pool for zero-allocation performance
    // Types: 'sparkle' (4-pt star), 'ember' (tiny circle), 'ambient' (slow background star)
    const pool = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      pool.push({
        active: false,
        type: 'sparkle',
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        maxSize: 0,
        rotation: 0,
        vr: 0,
        alpha: 0,
        decay: 0,
        color: '#ffffff',
      });
    }

    // Initialize ambient stars
    const ambientStars = Array.from({ length: AMBIENT_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
    }));

    // Spawn helper from pool
    const spawnParticle = (type, x, y, vx, vy, size, decay, color, vr = 0) => {
      // Find inactive particle
      let p = pool.find((item) => !item.active);
      if (!p) {
        // If all active, steal the oldest (lowest alpha)
        p = pool.reduce((min, cur) => (cur.alpha < min.alpha ? cur : min), pool[0]);
      }
      p.active = true;
      p.type = type;
      p.x = x;
      p.y = y;
      p.vx = vx;
      p.vy = vy;
      p.size = size;
      p.maxSize = size;
      p.rotation = Math.random() * Math.PI * 2;
      p.vr = vr;
      p.alpha = 1.0;
      p.decay = decay;
      p.color = color;
    };

    // Helper: get current theme accent color or vibrant fallback
    const getAccentColors = () => {
      try {
        const computed = getComputedStyle(document.documentElement);
        const accent = computed.getPropertyValue('--ctp-accent').trim();
        if (accent && accent.startsWith('#')) {
          return [accent, '#ffffff', '#89dceb', '#f5c2e7'];
        }
      } catch (e) {}
      // Palette fallback: iridescent cyan, star white, lilac, gold
      return ['#89dceb', '#ffffff', '#cba6f7', '#fab387', '#007efc'];
    };

    // Draw 4-pointed diamond sparkle star
    const drawStar = (x, y, r, rotation, alpha, color) => {
      if (r <= 0.1 || alpha <= 0.01) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;

      ctx.beginPath();
      const r2 = r;
      const r1 = r * 0.22;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const radius = i % 2 === 0 ? r2 : r1;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();

      // Soft center light core
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    // Draw round stardust ember
    const drawEmber = (x, y, r, alpha, color) => {
      if (r <= 0.1 || alpha <= 0.01) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Resize handler
    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    // Mouse/Touch pointer move
    const onPointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const dx = mouse.px !== -9999 ? x - mouse.px : 0;
      const dy = mouse.py !== -9999 ? y - mouse.py : 0;
      const dist = Math.hypot(dx, dy);

      mouse.x = x;
      mouse.y = y;
      mouse.px = x;
      mouse.py = y;
      isMoving = true;
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);

      // Spawn on drag or significant movement
      const colors = getAccentColors();
      const threshold = mouse.down ? 4 : 12;

      if (dist > threshold) {
        const count = mouse.down ? 3 : 1;
        for (let i = 0; i < count; i++) {
          const jitterX = x + (Math.random() - 0.5) * 8;
          const jitterY = y + (Math.random() - 0.5) * 8;
          const speed = Math.random() * 0.9 + 0.3;
          const angle = Math.random() * Math.PI * 2;
          const vx = Math.cos(angle) * speed + dx * 0.06;
          const vy = Math.sin(angle) * speed + dy * 0.06 - 0.2; // slight upward float
          const size = Math.random() * 4.5 + 2.5;
          const decay = Math.random() * 0.025 + 0.018;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const vr = (Math.random() - 0.5) * 0.08;

          spawnParticle('sparkle', jitterX, jitterY, vx, vy, size, decay, color, vr);

          // Add a tiny trailing ember
          if (Math.random() > 0.4) {
            spawnParticle(
              'ember',
              jitterX + (Math.random() - 0.5) * 6,
              jitterY + (Math.random() - 0.5) * 6,
              vx * 0.5,
              vy * 0.5,
              Math.random() * 1.6 + 0.6,
              decay * 1.3,
              color
            );
          }
        }
      }
    };

    // Click burst: radiate 12-16 sparkling stars outward
    const onPointerDown = (e) => {
      mouse.down = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const colors = getAccentColors();
      const burstCount = 14;

      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        const speed = Math.random() * 2.8 + 1.2;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 0.3;
        const size = Math.random() * 6.5 + 3.5;
        const decay = Math.random() * 0.02 + 0.016;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const vr = (Math.random() - 0.5) * 0.12;

        spawnParticle('sparkle', e.clientX, e.clientY, vx, vy, size, decay, color, vr);

        // Sub-ember burst
        spawnParticle(
          'ember',
          e.clientX,
          e.clientY,
          vx * 0.6 + (Math.random() - 0.5),
          vy * 0.6 + (Math.random() - 0.5),
          Math.random() * 2.0 + 0.8,
          decay * 1.2,
          '#ffffff'
        );
      }
    };

    const onPointerUp = () => {
      mouse.down = false;
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    let t = 0;

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // ── 1. Subtle, slow ambient background aura (2 soft blobs) ──
      const isLight = theme === 'latte';
      const auraAlpha = isLight ? 0.05 : 0.11;

      // Primary blob
      const g1 = ctx.createRadialGradient(W * 0.2, H * 0.25, 0, W * 0.2, H * 0.25, W * 0.45);
      g1.addColorStop(0, `rgba(137, 180, 250, ${auraAlpha})`);
      g1.addColorStop(1, 'rgba(137, 180, 250, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);

      // Secondary blob
      const g2 = ctx.createRadialGradient(W * 0.82, H * 0.65, 0, W * 0.82, H * 0.65, W * 0.42);
      g2.addColorStop(0, `rgba(203, 166, 247, ${auraAlpha * 0.85})`);
      g2.addColorStop(1, 'rgba(203, 166, 247, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // ── 2. Ambient drifting stars ──
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        const s = ambientStars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const twinkle = s.alpha + Math.sin(t * s.speed + s.phase) * 0.18;
        const curAlpha = Math.max(0.04, Math.min(0.65, twinkle));
        drawEmber(s.x, s.y, s.r, curAlpha, '#cdd6f4');
      }

      // ── 3. Interactive Sparkles & Embers ──
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = pool[i];
        if (!p.active) continue;

        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.alpha -= p.decay;
        p.size *= 0.985; // gently shrink
        p.vx *= 0.97; // air friction
        p.vy *= 0.97;

        if (p.alpha <= 0.02 || p.size <= 0.3) {
          p.active = false;
          continue;
        }

        if (p.type === 'sparkle') {
          drawStar(p.x, p.y, p.size, p.rotation, p.alpha, p.color);
        } else {
          drawEmber(p.x, p.y, p.size, p.alpha, p.color);
        }
      }

      t += 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pause when tab hidden to save CPU/battery
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(moveTimeout);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [bgEffect, theme]);

  if (!bgEffect) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// ── Interactive Cosmic Sparkle & Stardust Trail Engine ──
// High-performance canvas effect:
// 1. Vibrant, glowing 4-pointed sparkle stars (✨) on mouse move, drag, and click.
// 2. High z-index (z-50) + pointer-events-none so sparkles float gracefully ABOVE all cards without blocking clicks.
// 3. Robust event listeners on `document` (mousemove, mousedown, touchmove, touchstart).
// 4. Zero-allocation particle pool for 60fps butter-smooth rendering.

const MAX_PARTICLES = 180;
const AMBIENT_COUNT = 40;

export const BackgroundEffect = () => {
  const { bgEffect, theme, accent } = useTheme();
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

    // Track mouse & drag state
    let isDown = false;
    let lastX = -9999;
    let lastY = -9999;

    // Fixed particle pool
    const pool = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      pool.push({
        active: false,
        type: 'sparkle', // 'sparkle' | 'ember' | 'ring'
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        rotation: 0,
        vr: 0,
        alpha: 0,
        decay: 0,
        color: '#ffffff',
        glowColor: '#89dceb',
      });
    }

    // Ambient background stars
    const ambientStars = Array.from({ length: AMBIENT_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.45 + 0.15,
      speed: Math.random() * 0.005 + 0.002,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
    }));

    // Color palette getter: includes current theme accent + radiant highlights
    const getPalette = () => {
      try {
        const computed = getComputedStyle(document.documentElement);
        const curAccent = computed.getPropertyValue('--ctp-accent').trim();
        if (curAccent) {
          return [curAccent, '#ffffff', '#89dceb', '#f5c2e7', '#f9e2af'];
        }
      } catch (e) {}
      return ['#89b4fa', '#ffffff', '#cba6f7', '#f5c2e7', '#89dceb', '#fab387'];
    };

    const spawn = (type, x, y, vx, vy, size, decay, color, glowColor, vr = 0) => {
      let p = pool.find((item) => !item.active);
      if (!p) {
        // Reuse particle with lowest alpha
        p = pool.reduce((min, cur) => (cur.alpha < min.alpha ? cur : min), pool[0]);
      }
      p.active = true;
      p.type = type;
      p.x = x;
      p.y = y;
      p.vx = vx;
      p.vy = vy;
      p.size = size;
      p.rotation = Math.random() * Math.PI * 2;
      p.vr = vr;
      p.alpha = 1.0;
      p.decay = decay;
      p.color = color;
      p.glowColor = glowColor || color;
    };

    // Draw 4-pointed glowing diamond sparkle star
    const drawSparkle = (x, y, r, rotation, alpha, color, glowColor) => {
      if (r <= 0.2 || alpha <= 0.02) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;

      // Outer luminous glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = glowColor;

      // 4-pointed star path
      ctx.beginPath();
      const r2 = r;
      const r1 = r * 0.20;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const radius = i % 2 === 0 ? r2 : r1;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Bright center core
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    // Draw circular ember dot
    const drawEmber = (x, y, r, alpha, color) => {
      if (r <= 0.2 || alpha <= 0.02) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // Handle mouse move & drag
    const handleMove = (x, y) => {
      const dx = lastX !== -9999 ? x - lastX : 0;
      const dy = lastY !== -9999 ? y - lastY : 0;
      const dist = Math.hypot(dx, dy);

      lastX = x;
      lastY = y;

      const palette = getPalette();
      // On drag: spawn more particles with higher velocity
      const threshold = isDown ? 3 : 8;

      if (dist > threshold) {
        const count = isDown ? 3 : 1;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 1.4 + 0.4;
          const vx = Math.cos(angle) * speed + dx * 0.08;
          const vy = Math.sin(angle) * speed + dy * 0.08 - 0.25; // float gently upward
          const size = Math.random() * 7 + 4.5;
          const decay = Math.random() * 0.022 + 0.015;
          const color = palette[Math.floor(Math.random() * palette.length)];
          const vr = (Math.random() - 0.5) * 0.12;

          spawn('sparkle', x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10, vx, vy, size, decay, color, color, vr);

          if (Math.random() > 0.3) {
            spawn('ember', x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8, vx * 0.6, vy * 0.6, Math.random() * 2.2 + 0.8, decay * 1.1, color, color);
          }
        }
      }
    };

    // Handle click burst
    const handleDown = (x, y) => {
      isDown = true;
      lastX = x;
      lastY = y;

      const palette = getPalette();
      const burstCount = 18; // radiant 18-particle starburst

      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const speed = Math.random() * 3.6 + 1.4;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 0.4;
        const size = Math.random() * 9 + 5.5; // prominent sparkle size
        const decay = Math.random() * 0.018 + 0.012; // lingers ~1.5s
        const color = palette[Math.floor(Math.random() * palette.length)];
        const vr = (Math.random() - 0.5) * 0.16;

        spawn('sparkle', x, y, vx, vy, size, decay, color, color, vr);

        // Radiant trailing embers
        spawn('ember', x, y, vx * 0.65, vy * 0.65, Math.random() * 2.5 + 1.0, decay * 1.2, '#ffffff', color);
      }
    };

    const handleUp = () => {
      isDown = false;
    };

    // Event listeners on `document` to guarantee capturing events everywhere
    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onMouseDown = (e) => handleDown(e.clientX, e.clientY);
    const onMouseUp = () => handleUp();

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        handleDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handleUp();

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown, { passive: true });
    document.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    let t = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // ── 1. Ambient Background Twinkling Dust ──
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        const s = ambientStars[i];
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = W;
        if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H;
        if (s.y > H) s.y = 0;

        const twinkle = s.alpha + Math.sin(t * s.speed + s.phase) * 0.2;
        const curAlpha = Math.max(0.05, Math.min(0.7, twinkle));
        drawEmber(s.x, s.y, s.r, curAlpha, '#cdd6f4');
      }

      // ── 2. Interactive Sparkles & Embers ──
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = pool[i];
        if (!p.active) continue;

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.alpha -= p.decay;
        p.size *= 0.982; // gentle shrink
        p.vx *= 0.965; // air drag
        p.vy *= 0.965;

        if (p.alpha <= 0.02 || p.size <= 0.4) {
          p.active = false;
          continue;
        }

        if (p.type === 'sparkle') {
          drawSparkle(p.x, p.y, p.size, p.rotation, p.alpha, p.color, p.glowColor);
        } else {
          drawEmber(p.x, p.y, p.size, p.alpha, p.color);
        }
      }

      t += 1;
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

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
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
    };
  }, [bgEffect, theme, accent]);

  if (!bgEffect) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

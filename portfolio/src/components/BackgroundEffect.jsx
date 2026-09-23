import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// ── Ethereal Aurora & Neural Constellation Background Engine ──
// Pure atmospheric background effect (zero mouse follower distraction):
// 1. Organic Constellation Nodes: Drifting stardust particles with soft dynamic neural interconnecting lines.
// 2. Ethereal Breathing Aurora: Two slow-moving luminous gradients reacting to current Catppuccin accent.
// 3. Twinkling Distant Diamond Stars: Subtle 4-pointed micro stars rotating gently in deep space.
// 4. Maximum Performance: Zero allocation in animation loop, pauses on tab hide or toggle off.

const NODE_COUNT = 65;
const STAR_COUNT = 18;
const MAX_CONNECT_DIST = 115;

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

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── 1. Constellation Nodes ──
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.42,
      vy: (Math.random() - 0.5) * 0.42,
      r: Math.random() * 1.6 + 0.8,
      baseAlpha: Math.random() * 0.45 + 0.25,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── 2. Distant Twinkling 4-Pointed Stars ──
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: Math.random() * 3.5 + 2.0,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.008,
      speed: Math.random() * 0.008 + 0.003,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
    }));

    // Helper: read current accent color
    const getAccentRGB = () => {
      try {
        const computed = getComputedStyle(document.documentElement);
        const hex = computed.getPropertyValue('--ctp-accent').trim();
        if (hex && hex.startsWith('#') && hex.length === 7) {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return [r, g, b];
        }
      } catch (e) {}
      return [137, 180, 250]; // default Sapphire / Blue
    };

    // Draw 4-pointed micro star
    const drawDiamondStar = (x, y, r, rotation, alpha, [ar, ag, ab]) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(${ar}, ${ag}, ${ab})`;

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

      // Bright white core
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    };

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      const [ar, ag, ab] = getAccentRGB();
      const isLight = theme === 'latte';
      const baseAlpha = isLight ? 0.07 : 0.14;

      // ── Layer 1: Ethereal Aurora Blobs (Slow Organic Drift) ──
      // Blob 1: Top-Left flowing around
      const ox1 = Math.sin(t * 0.003) * 60;
      const oy1 = Math.cos(t * 0.0025) * 45;
      const b1x = W * 0.18 + ox1;
      const b1y = H * 0.28 + oy1;
      const r1 = W * 0.45;

      const grad1 = ctx.createRadialGradient(b1x, b1y, 0, b1x, b1y, r1);
      grad1.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, ${baseAlpha * 1.3})`);
      grad1.addColorStop(0.5, `rgba(${ar}, ${ag}, ${ab}, ${baseAlpha * 0.4})`);
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, W, H);

      // Blob 2: Bottom-Right shifting
      const ox2 = Math.cos(t * 0.0028) * 55;
      const oy2 = Math.sin(t * 0.0032) * 50;
      const b2x = W * 0.82 + ox2;
      const b2y = H * 0.72 + oy2;
      const r2 = W * 0.48;

      const grad2 = ctx.createRadialGradient(b2x, b2y, 0, b2x, b2y, r2);
      grad2.addColorStop(0, `rgba(180, 190, 254, ${baseAlpha * 0.9})`);
      grad2.addColorStop(0.5, `rgba(${ar}, ${ag}, ${ab}, ${baseAlpha * 0.3})`);
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, W, H);

      // ── Layer 2: Constellation Interconnecting Lines ──
      // Update nodes positions
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges
        if (n.x < -10) n.x = W + 10;
        if (n.x > W + 10) n.x = -10;
        if (n.y < -10) n.y = H + 10;
        if (n.y > H + 10) n.y = -10;
      }

      // Draw connection lines between nearby nodes
      ctx.lineWidth = 0.85;
      for (let i = 0; i < NODE_COUNT; i++) {
        const p1 = nodes[i];
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < MAX_CONNECT_DIST) {
            const lineAlpha = (1 - dist / MAX_CONNECT_DIST) * (isLight ? 0.18 : 0.22);
            ctx.strokeStyle = `rgba(${ar}, ${ag}, ${ab}, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw constellation node circles
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodes[i];
        const pulse = Math.sin(t * n.speed + n.phase) * 0.2;
        const curAlpha = Math.max(0.1, Math.min(0.85, n.baseAlpha + pulse));

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ar}, ${ag}, ${ab}, ${curAlpha})`;
        ctx.fill();

        // White glowing center for prominent nodes
        if (n.r > 1.4) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${curAlpha * 0.9})`;
          ctx.fill();
        }
      }

      // ── Layer 3: Distant 4-Pointed Twinkling Stars ──
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.vr;

        if (s.x < -10) s.x = W + 10;
        if (s.x > W + 10) s.x = -10;
        if (s.y < -10) s.y = H + 10;
        if (s.y > H + 10) s.y = -10;

        const twinkle = Math.sin(t * s.speed + s.phase);
        const starAlpha = Math.max(0.12, Math.min(0.9, 0.45 + twinkle * 0.4));
        drawDiamondStar(s.x, s.y, s.size, s.rotation, starAlpha, [ar, ag, ab]);
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
      window.removeEventListener('resize', onResize);
    };
  }, [bgEffect, theme, accent]);

  if (!bgEffect) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

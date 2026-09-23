import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// ── Background Effect: Unix-style Starfield + Aurora Mesh ──
// Inspired by classic Unix terminal aesthetics + modern aurora
export const BackgroundEffect = () => {
  const { bgEffect } = useTheme();
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let t = 0;

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Generate starfield particles once
    particlesRef.current = Array.from({ length: 120 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.2,
      baseAlpha: Math.random() * 0.55 + 0.1,
      speed: Math.random() * 0.006 + 0.002,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.08, // slow drift
      vy: (Math.random() - 0.5) * 0.08,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // ── 1. Three large aurora blobs (slow, ethereal) ──
      const blobs = [
        // top-left — blue/indigo
        { cx: W * 0.1, cy: H * 0.15, r: W * 0.42, hue: 230, sat: 80, drift: 0.28 },
        // center-right — violet/purple
        { cx: W * 0.88, cy: H * 0.45, r: W * 0.38, hue: 270, sat: 70, drift: -0.22 },
        // bottom-center — teal/cyan
        { cx: W * 0.50, cy: H * 0.90, r: W * 0.35, hue: 190, sat: 65, drift: 0.15 },
      ];

      blobs.forEach((b) => {
        const ox = Math.sin(t * b.drift) * 50;
        const oy = Math.cos(t * b.drift * 0.8) * 35;
        const cx = b.cx + ox;
        const cy = b.cy + oy;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.r);
        grad.addColorStop(0, `hsla(${b.hue}, ${b.sat}%, 65%, 0.22)`);
        grad.addColorStop(0.4, `hsla(${b.hue + 15}, ${b.sat - 10}%, 58%, 0.10)`);
        grad.addColorStop(1, `hsla(${b.hue}, ${b.sat}%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ── 2. Twinkling starfield ──
      const stars = particlesRef.current;
      stars.forEach((s) => {
        // Drift slowly
        s.x += s.vx;
        s.y += s.vy;
        // Wrap around edges
        if (s.x < -2) s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        if (s.y > H + 2) s.y = -2;

        const twinkle = s.baseAlpha + Math.sin(t * s.speed + s.phase) * 0.22;
        const alpha = Math.max(0.02, Math.min(0.85, twinkle));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
        ctx.fill();
      });

      // ── 3. Subtle grid scanlines (Unix terminal feel) ──
      ctx.strokeStyle = 'rgba(100, 130, 200, 0.035)';
      ctx.lineWidth = 1;
      const gridSpacing = 40;
      for (let x = 0; x < W; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // ── 4. Diagonal light sweep (very subtle shimmer) ──
      const sweepY = ((t * 22) % (H + 300)) - 150;
      const sweepGrad = ctx.createLinearGradient(0, sweepY, W * 0.5, sweepY + 80);
      sweepGrad.addColorStop(0, 'rgba(200, 220, 255, 0)');
      sweepGrad.addColorStop(0.5, 'rgba(200, 220, 255, 0.03)');
      sweepGrad.addColorStop(1, 'rgba(200, 220, 255, 0)');
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, sweepY, W, 80);

      t += 0.003;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-700"
      style={{ opacity: bgEffect ? 1 : 0 }}
    />
  );
};

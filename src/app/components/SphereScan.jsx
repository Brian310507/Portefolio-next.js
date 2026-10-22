"use client";
import React, { useEffect, useRef } from "react";

/**
 * Sphère topographique scannée (globe en lignes de niveau, façon carte
 * holographique), réinterprétée dans la charte Cyberpunk 2077 du portfolio :
 * contours cyan translucides, halo bordeaux et ligne de scan rouge crimson
 * qui monte et descend le long du globe.
 *
 * 100 % API canvas native : aucune dépendance supplémentaire.
 */
const LINE_COUNT = 64; // nombre de parallèles (couches du globe)
const POINTS = 100; // points de résolution de chaque couche
const STAR_COUNT = 45; // poussières d'écran en arrière-plan

// Bruit organique procédural (somme de sinusoïdes à octaves croisées)
const noise = (x, y, t) =>
  Math.sin(x * 1.7 + t) * Math.cos(y * 1.3 - t * 0.6) +
  0.5 * Math.sin(x * 3.1 - t * 0.9) * Math.cos(y * 2.6 + t * 0.4) +
  0.25 * Math.sin((x + y) * 5.3 + t * 1.2);

const SphereScan = ({ className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let width = 1;
    let height = 1;
    let stars = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (timeMs) => {
      const t = timeMs * 0.001;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.4;

      ctx.clearRect(0, 0, width, height);

      // Halo de fond (dégradé nuit bordeaux du thème)
      const halo = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.1,
        cx,
        cy,
        radius * 1.7
      );
      halo.addColorStop(0, "rgba(26, 9, 14, 0.95)");
      halo.addColorStop(1, "rgba(10, 3, 6, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);

      // Poussières d'écran (scintillement cyan)
      for (const star of stars) {
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.9 + star.phase));
        ctx.globalAlpha = twinkle * 0.7;
        ctx.fillStyle = "#4DE8E8";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Ligne de scan : va et vient verticalement le long du globe
      const scanIndex = ((Math.sin(t * 0.35) + 1) / 2) * (LINE_COUNT - 1);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < LINE_COUNT; i += 1) {
        const phi = (i / (LINE_COUNT - 1)) * Math.PI;
        const baseY = cy - Math.cos(phi) * radius;
        const lineRadius = Math.sin(phi) * radius;
        if (lineRadius < 0.8) continue;

        const glow = Math.max(0, 1 - Math.abs(i - scanIndex) / 3);

        ctx.beginPath();
        for (let p = 0; p <= POINTS; p += 1) {
          const u = (p / POINTS) * 2 - 1;
          // Boursouflure du rayon => silhouette légèrement irrégulière
          const edge = 1 + 0.05 * noise(u * 1.4 + i * 0.3, i * 0.2, t * 0.3);
          // Ondulation verticale du trait (relief topographique)
          const wobble =
            noise(u * 2.4 + t * 0.25, i * 0.22, t * 0.4) *
            radius *
            0.075 *
            (0.35 + 0.65 * Math.sin(phi));
          const x = cx + u * lineRadius * edge;
          const y = baseY + wobble;
          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        if (glow > 0.02) {
          // Ligne scannée : rouge crimson avec halo néon
          ctx.strokeStyle = `rgba(255, 29, 61, ${0.25 + 0.75 * glow})`;
          ctx.shadowColor = "rgba(255, 29, 61, 0.85)";
          ctx.shadowBlur = 16 * glow;
          ctx.lineWidth = 1 + 1.4 * glow;
        } else {
          // Contours : cyan translucide, plus nets à l'équateur (profondeur)
          const alpha = 0.18 + 0.16 * Math.sin(phi);
          ctx.strokeStyle = `rgba(77, 232, 232, ${alpha.toFixed(3)})`;
          ctx.shadowBlur = 0;
          ctx.lineWidth = 1;
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    };

    const loop = (time) => {
      draw(time);
      rafId = requestAnimationFrame(loop);
    };

    resize();
    if (reducedMotion) {
      draw(1200); // image fixe pour les animations réduites
    } else {
      rafId = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(1200);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Globe holographique en cours de scan"
        className="block h-full w-full"
      />
    </div>
  );
};

export default SphereScan;
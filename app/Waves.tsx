"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

const noise3D = createNoise3D();

export default function Waves() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let lastTime = 0;
    let width = 0;
    let height = 0;
    let t = 0;
    let isActive = true;

    const pointer = { x: 0.5, y: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // cap DPR

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth;
      pointer.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", handlePointerMove);

    // Pause the heavy drawing work once the user is well past the hero area
    const handleScroll = () => {
      const cutoff = window.innerHeight * 1.5; // tweak if you like
      isActive = window.scrollY < cutoff;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const render = (now?: number) => {
      const currentTime = now ?? performance.now();
      const delta = currentTime - lastTime;

      // cap ~45fps
      if (delta < 1000 / 45) {
        animationId = requestAnimationFrame(render);
        return;
      }
      lastTime = currentTime;

      if (!isActive) {
        animationId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = "#050310";
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "#e5e5e5";

      // slightly sparser grid than before = fewer ops
      const xSpacing = 24; // was 18
      const yStep = 8;     // was 6
      const noiseScale = 0.012;

      const baseAmplitude = 12;
      const pointerAmplitude = 40;
      const radius = 0.3;
      const speed = 0.003 + pointer.x * 0.004;

      for (let x = -xSpacing; x < width + xSpacing; x += xSpacing) {
        ctx.beginPath();

        for (let y = 0; y <= height; y += yStep) {
          const nx = x / width;
          const ny = y / height;

          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let localFactor = 0;
          if (dist < radius) {
            const k = 1 - dist / radius;
            localFactor = k * k;
          }

          const amplitude = baseAmplitude + pointerAmplitude * localFactor;
          const n = noise3D(x * noiseScale, y * noiseScale, t);
          const offsetX = n * amplitude;

          const px = x + offsetX;
          const py = y;

          if (y === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.stroke();
      }

      t += speed;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-waves
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

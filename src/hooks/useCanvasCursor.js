import { useEffect, useRef } from "react";

const ACCENT = "#a78bfa";
const LERP = 0.15;

export function useCanvasCursor() {
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      const { x: tx, y: ty } = targetRef.current;
      let { x, y } = posRef.current;

      x += (tx - x) * LERP;
      y += (ty - y) * LERP;
      posRef.current = { x, y };

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const px = x;
      const py = y;

      ctx.save();

      // Glow exterior
      const gradient = ctx.createRadialGradient(px, py, 0, px, py, 24);
      gradient.addColorStop(0, `${ACCENT}40`);
      gradient.addColorStop(0.5, `${ACCENT}15`);
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(px, py, 24, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Círculo exterior
      ctx.beginPath();
      ctx.arc(px, py, 10, 0, Math.PI * 2);
      ctx.strokeStyle = `${ACCENT}60`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Núcleo
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = ACCENT;
      ctx.fill();

      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);

    posRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    rafRef.current = requestAnimationFrame(draw);

    document.documentElement.classList.add("canvas-cursor-active");

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.documentElement.classList.remove("canvas-cursor-active");
    };
  }, []);
}

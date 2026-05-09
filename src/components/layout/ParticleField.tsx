"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number; colorIdx: number;
  pulseSpeed: number; pulsePhase: number;
  type: "circle" | "diamond" | "ring";
}

const LIGHT_COLORS = [
  "99, 102, 241",   // indigo
  "139, 92, 246",   // violet
  "6, 182, 212",    // cyan
  "129, 140, 248",  // indigo-light
  "167, 139, 250",  // violet-light
  "34, 211, 238",   // cyan-light
];

const DARK_COLORS = [
  "129, 140, 248",  // indigo-bright
  "167, 139, 250",  // violet-bright
  "34, 211, 238",   // cyan-bright
  "99, 102, 241",   // indigo
  "196, 181, 253",  // violet-pale
  "103, 232, 249",  // cyan-pale
];

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const clickRipplesRef = useRef<{ x: number; y: number; time: number; maxR: number }[]>([]);
  const animFrameRef = useRef<number>(0);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const PARTICLE_COUNT = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000));
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 3 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      colorIdx: Math.floor(Math.random() * 6),
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
      type: (["circle", "diamond", "ring"] as const)[Math.floor(Math.random() * 3)],
    }));

    const handleMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const handleClick = (e: MouseEvent) => {
      clickRipplesRef.current.push({ x: e.clientX, y: e.clientY, time: Date.now(), maxR: 120 + Math.random() * 80 });
      if (clickRipplesRef.current.length > 5) clickRipplesRef.current.shift();
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now() * 0.001;
      const colors = isDarkRef.current ? DARK_COLORS : LIGHT_COLORS;
      const baseOpacityMul = isDarkRef.current ? 1.2 : 0.7;

      // Draw click ripples
      const nowMs = Date.now();
      clickRipplesRef.current = clickRipplesRef.current.filter((r) => {
        const age = (nowMs - r.time) / 1000;
        if (age > 1.2) return false;
        const progress = age / 1.2;
        const radius = r.maxR * progress;
        const alpha = (1 - progress) * 0.25;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${colors[0]}, ${alpha})`;
        ctx.lineWidth = 2 - progress * 1.5;
        ctx.stroke();
        // Inner ripple
        if (progress < 0.6) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius * 0.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colors[2]}, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        return true;
      });

      // Draw and update particles
      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160) {
          const force = (160 - dist) / 160;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }

        // Click ripple push
        clickRipplesRef.current.forEach((r) => {
          const rdx = p.x - r.x; const rdy = p.y - r.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const age = (nowMs - r.time) / 1000;
          const waveR = r.maxR * (age / 1.2);
          if (Math.abs(rdist - waveR) < 30 && rdist > 0) {
            p.vx += (rdx / rdist) * 0.8;
            p.vy += (rdy / rdist) * 0.8;
          }
        });

        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulse = Math.sin(now * p.pulseSpeed * 10 + p.pulsePhase) * 0.3 + 0.7;
        const currentOpacity = p.opacity * pulse * baseOpacityMul;
        const color = colors[p.colorIdx];

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentOpacity * 0.08})`;
        ctx.fill();

        if (p.type === "circle") {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${currentOpacity})`;
          ctx.fill();
        } else if (p.type === "diamond") {
          const s = p.radius * 1.2;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(now * 0.5 + p.pulsePhase);
          ctx.beginPath();
          ctx.moveTo(0, -s); ctx.lineTo(s, 0); ctx.lineTo(0, s); ctx.lineTo(-s, 0);
          ctx.closePath();
          ctx.fillStyle = `rgba(${color}, ${currentOpacity * 0.8})`;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color}, ${currentOpacity * 0.6})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      // Connections
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i]; const b = particlesRef.current[j];
          const dx = a.x - b.x; const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08 * baseOpacityMul;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${colors[0]}, ${opacity})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      // Mouse glow trail
      if (mouseRef.current.x > 0) {
        const gradient = ctx.createRadialGradient(mouseRef.current.x, mouseRef.current.y, 0, mouseRef.current.x, mouseRef.current.y, 100);
        gradient.addColorStop(0, `rgba(${colors[1]}, ${0.06 * baseOpacityMul})`);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[-5]" />;
}

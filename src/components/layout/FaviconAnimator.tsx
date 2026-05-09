"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/ThemeContext";

export default function FaviconAnimator() {
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const canvas = document.createElement("canvas");
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const lightColors = ["#6366F1", "#8B5CF6", "#06B6D4"];
    const darkColors = ["#818CF8", "#A78BFA", "#22D3EE"];
    let frame = 0;

    const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || (() => {
      const el = document.createElement("link");
      el.rel = "icon"; el.type = "image/png";
      document.head.appendChild(el);
      return el;
    })();

    const draw = () => {
      ctx.clearRect(0, 0, 32, 32);
      const t = frame * 0.02;
      const colors = isDarkRef.current ? darkColors : lightColors;
      const ci = Math.floor((t * 0.5) % colors.length);

      const radius = 10 + Math.sin(t) * 3;
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, radius + 4);
      gradient.addColorStop(0, colors[ci]);
      gradient.addColorStop(0.7, colors[(ci + 1) % colors.length]);
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(16, 16, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.fillStyle = isDarkRef.current ? "#0A0A14" : "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("C", 16, 17);

      const ox = 16 + Math.cos(t * 2) * 13;
      const oy = 16 + Math.sin(t * 2) * 13;
      ctx.beginPath();
      ctx.arc(ox, oy, 2, 0, Math.PI * 2);
      ctx.fillStyle = colors[(ci + 2) % colors.length];
      ctx.fill();

      // Second orbiting dot (opposite side)
      const ox2 = 16 + Math.cos(t * 2 + Math.PI) * 11;
      const oy2 = 16 + Math.sin(t * 2 + Math.PI) * 11;
      ctx.beginPath();
      ctx.arc(ox2, oy2, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = colors[(ci + 1) % colors.length];
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;

      link.href = canvas.toDataURL("image/png");
      frame++;
    };

    const interval = setInterval(draw, 50);
    draw();
    return () => clearInterval(interval);
  }, []);

  return null;
}

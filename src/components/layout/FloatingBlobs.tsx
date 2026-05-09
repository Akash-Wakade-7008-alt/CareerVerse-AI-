"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/lib/ThemeContext";

function getTimeOfDayMultiplier() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 0.7;
  if (hour >= 12 && hour < 17) return 0.85;
  if (hour >= 17 && hour < 21) return 0.75;
  return 0.5;
}

export default function FloatingBlobs() {
  const { isDark } = useTheme();
  const [timeMul, setTimeMul] = useState(getTimeOfDayMultiplier());
  useEffect(() => {
    const interval = setInterval(() => setTimeMul(getTimeOfDayMultiplier()), 60000);
    return () => clearInterval(interval);
  }, []);

  const opacity = isDark ? 0.5 : 0.4;

  const BLOBS = [
    { pos: "-top-48 -left-40", size: "h-[34rem] w-[34rem]", x: [0, 22, -14, 0], y: [0, -28, 16, 0], scale: [1, 1.12, 0.94, 1], dur: 20 },
    { pos: "top-1/4 -right-44", size: "h-[38rem] w-[38rem]", x: [0, -32, 20, 0], y: [0, 26, -18, 0], scale: [1.05, 0.9, 1.08, 1.05], dur: 24 },
    { pos: "-bottom-52 left-1/3", size: "h-[30rem] w-[30rem]", x: [0, 18, -20, 0], y: [0, -24, 12, 0], scale: [0.96, 1.08, 0.92, 0.96], dur: 26 },
    { pos: "top-1/2 left-1/4", size: "h-[26rem] w-[26rem]", x: [0, -16, 24, 0], y: [0, 20, -14, 0], scale: [1.02, 0.95, 1.1, 1.02], dur: 22 },
    { pos: "-top-20 right-1/4", size: "h-[22rem] w-[22rem]", x: [0, 14, -18, 0], y: [0, -16, 22, 0], scale: [0.98, 1.06, 0.94, 0.98], dur: 28 },
    { pos: "bottom-1/4 -right-20", size: "h-[28rem] w-[28rem]", x: [0, -20, 16, 0], y: [0, 18, -20, 0], scale: [1.04, 0.92, 1.06, 1.04], dur: 30 },
  ];

  const lightGradients = [
    "from-indigo-400/15 via-violet-400/10 to-cyan-400/8",
    "from-violet-400/12 via-indigo-400/8 to-purple-400/10",
    "from-cyan-400/10 via-blue-400/8 to-indigo-400/8",
    "from-purple-300/8 via-violet-300/6 to-indigo-300/6",
    "from-sky-300/10 via-cyan-300/6 to-violet-300/6",
    "from-indigo-300/8 via-blue-300/5 to-cyan-300/6",
  ];

  const darkGradients = [
    "from-indigo-600/25 via-violet-600/18 to-cyan-600/12",
    "from-violet-600/20 via-indigo-600/15 to-purple-600/18",
    "from-cyan-600/18 via-blue-600/14 to-indigo-600/12",
    "from-purple-500/14 via-violet-500/10 to-indigo-500/10",
    "from-sky-500/16 via-cyan-500/10 to-violet-500/10",
    "from-indigo-500/14 via-blue-500/8 to-cyan-500/10",
  ];

  const gradients = isDark ? darkGradients : lightGradients;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ opacity: opacity * timeMul }}>
      {BLOBS.map((blob, i) => (
        <motion.div key={i} className={`absolute rounded-full blur-[130px] animate-morph-blob ${blob.pos} ${blob.size} bg-gradient-to-br ${gradients[i]}`}
          style={{ animationDelay: `${i * -2}s` }}
          animate={{ x: blob.x, y: blob.y, scale: blob.scale }}
          transition={{ duration: blob.dur, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        />
      ))}

      {/* Aurora layers */}
      <div className="absolute inset-x-0 top-0 h-1/3 animate-aurora bg-gradient-to-b from-indigo-400/5 via-violet-400/3 to-transparent dark:from-indigo-600/8 dark:via-violet-600/5" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 animate-aurora bg-gradient-to-t from-cyan-400/4 via-blue-400/2 to-transparent dark:from-cyan-600/6 dark:via-blue-600/3" style={{ animationDelay: "-4s" }} />

      {/* Floating geometric shapes */}
      <motion.div className="absolute top-[15%] left-[10%] h-4 w-4 rotate-45 rounded-sm border border-indigo-400/20 dark:border-indigo-400/30"
        animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [45, 225, 405] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[35%] right-[8%] h-3 w-3 rounded-full border border-violet-400/20 dark:border-violet-400/30"
        animate={{ y: [0, -20, 0], x: [0, -10, 0], scale: [1, 1.5, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-[25%] left-[20%] h-5 w-5 rotate-12 border border-cyan-400/15 dark:border-cyan-400/25"
        animate={{ y: [0, -25, 0], rotate: [12, 192, 372] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[60%] right-[25%] h-3 w-3 rotate-45 rounded-sm border border-indigo-300/15 dark:border-indigo-300/25"
        animate={{ y: [0, -18, 0], x: [0, 12, 0], rotate: [45, -135, 45] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[80%] left-[60%] h-2 w-2 rounded-full bg-violet-400/10 dark:bg-violet-400/20"
        animate={{ y: [0, -35, 0], scale: [1, 2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-[10%] right-[40%] h-6 w-6 rounded-full border border-cyan-400/10 dark:border-cyan-400/20"
        animate={{ y: [0, -15, 0], scale: [1, 0.8, 1], rotate: [0, 180, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" />
    </div>
  );
}

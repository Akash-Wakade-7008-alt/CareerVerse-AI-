"use client";

import { motion } from "framer-motion";

const BLOBS = [
  {
    className:
      "-top-48 -left-40 h-[34rem] w-[34rem] bg-gradient-to-br from-indigo-500/35 via-sky-500/25 to-cyan-500/20",
    x: [0, 22, -14, 0],
    y: [0, -28, 16, 0],
    scale: [1, 1.12, 0.94, 1],
    duration: 20,
  },
  {
    className:
      "top-1/4 -right-44 h-[38rem] w-[38rem] bg-gradient-to-br from-blue-500/28 via-indigo-500/20 to-sky-400/22",
    x: [0, -32, 20, 0],
    y: [0, 26, -18, 0],
    scale: [1.05, 0.9, 1.08, 1.05],
    duration: 24,
  },
  {
    className:
      "-bottom-52 left-1/3 h-[30rem] w-[30rem] bg-gradient-to-br from-cyan-500/24 via-indigo-500/18 to-blue-500/20",
    x: [0, 18, -20, 0],
    y: [0, -24, 12, 0],
    scale: [0.96, 1.08, 0.92, 0.96],
    duration: 26,
  },
];

export default function FloatingBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {BLOBS.map((blob) => (
        <motion.div
          key={blob.className}
          className={`absolute rounded-full blur-[130px] ${blob.className}`}
          animate={{ x: blob.x, y: blob.y, scale: blob.scale }}
          transition={{
            duration: blob.duration,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      ))}

      <div className="absolute inset-0 grid-bg opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-950/8 to-slate-950/70" />
    </div>
  );
}

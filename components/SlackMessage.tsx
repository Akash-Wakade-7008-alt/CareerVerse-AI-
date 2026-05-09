"use client";

import { motion } from "framer-motion";

export default function SlackMessage({ sender, message }: { sender: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="glass surface-ring mb-2 flex gap-3 rounded-2xl p-3"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/90 to-sky-500/90 text-sm font-semibold text-white">
        {sender[0]?.toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-sky-200/90">{sender}</div>
        <div className="mt-0.5 text-sm text-white/82">{message}</div>
      </div>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";

export default function SlackMessage({ sender, message }: { sender: string; message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-3 glass rounded-xl p-3 mb-2"
    >
      <div className="w-8 h-8 rounded-lg bg-grad-purple flex items-center justify-center font-bold text-sm shrink-0">
        {sender[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-violet-300 font-semibold">{sender}</div>
        <div className="text-sm text-white/80">{message}</div>
      </div>
    </motion.div>
  );
}

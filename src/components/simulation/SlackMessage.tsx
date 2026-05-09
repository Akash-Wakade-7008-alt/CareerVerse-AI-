"use client";
import { motion } from "framer-motion";
import { Hash } from "lucide-react";

export default function SlackMessage({ sender, message }: { sender: string; message: string }) {
  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="max-w-md">
      <div className="glass surface-ring rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="mb-1 flex items-center gap-2">
          <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <Hash size={11} style={{ color: "var(--cv-brand-a)" }} />
          </motion.div>
          <span className="text-xs font-semibold" style={{ color: "var(--cv-brand-a)" }}>{sender}</span>
        </div>
        <p className="text-sm" style={{ color: "var(--cv-text-secondary)" }}>{message}</p>
      </div>
    </motion.div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Volume2 } from "lucide-react";
import SlackMessage from "./SlackMessage";
import { SimMessage } from "@/types";

type Props = {
  messages: SimMessage[];
  onChoose: (choice: string) => void;
  loading: boolean;
};

export default function SimulationChat({ messages, onChoose, loading }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  return (
    <div ref={ref} className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
      <AnimatePresence>
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {m.role === "ai" && (
              <div className="max-w-2xl">
                {m.meta?.metric && (
                  <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-2 text-xs">
                    <span className="text-white/50">{m.meta.metric.label}</span>
                    <span className="font-bold">{m.meta.metric.value}</span>
                    {m.meta.metric.trend === "up" ? (
                      <TrendingUp size={12} className="text-emerald-400" />
                    ) : (
                      <TrendingDown size={12} className="text-red-400" />
                    )}
                  </div>
                )}
                <div className="glass-strong rounded-3xl rounded-tl-md p-5 relative">
                  <button
                    onClick={() => speak(m.content)}
                    className="absolute top-3 right-3 text-white/40 hover:text-white transition"
                    aria-label="Read aloud"
                  >
                    <Volume2 size={14} />
                  </button>
                  <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap pr-6">
                    {m.content}
                  </div>
                  {m.options && (
                    <div className="mt-5 grid gap-2">
                      {m.options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01, x: 2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => onChoose(opt)}
                          disabled={loading}
                          className="text-left p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-400/60 hover:bg-violet-500/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          <span className="text-xs text-violet-300 font-bold mr-2">
                            {String.fromCharCode(65 + i)}.
                          </span>
                          <span className="text-sm">{opt}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {m.role === "slack" && (
              <SlackMessage sender={m.meta?.sender || "Team"} message={m.content} />
            )}

            {m.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-grad-purple rounded-3xl rounded-tr-md px-5 py-3 max-w-md text-sm btn-glow">
                  {m.content}
                </div>
              </div>
            )}

            {m.role === "system" && (
              <div className="text-center text-xs text-violet-300/70 italic py-2">
                ✦ {m.content} ✦
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {loading && (
        <div className="flex gap-1.5 items-center text-violet-300 text-sm">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: ".15s" }} />
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: ".3s" }} />
          <span className="ml-2 text-white/60">AI is thinking…</span>
        </div>
      )}
    </div>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingDown, TrendingUp, Volume2 } from "lucide-react";
import { SimMessage } from "@/types";
import SlackMessage from "./SlackMessage";

type Props = { messages: SimMessage[]; onChoose: (choice: string) => void; loading: boolean; };

export default function SimulationChat({ messages, onChoose, loading }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text); u.rate = 1.02; u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  return (
    <div ref={ref} className="flex-1 space-y-5 overflow-y-auto px-4 pb-8 pt-6 md:px-0">
      <AnimatePresence>
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
            {msg.role === "ai" && (
              <div className="max-w-2xl">
                {msg.meta?.metric && (
                  <div className="glass mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs" style={{ color: "var(--cv-text-secondary)" }}>
                    <span style={{ color: "var(--cv-muted)" }}>{msg.meta.metric.label}</span>
                    <span className="font-semibold">{msg.meta.metric.value}</span>
                    {msg.meta.metric.trend === "up" ? <TrendingUp size={12} className="text-emerald-500 animate-bounce-gentle" /> : <TrendingDown size={12} className="text-red-400 animate-bounce-gentle" />}
                  </div>
                )}
                <div className="glass-strong surface-ring relative rounded-3xl rounded-tl-md p-5">
                  <button onClick={() => speak(msg.content)} className="absolute right-3 top-3 rounded-md p-1 transition" style={{ color: "var(--cv-muted)" }} aria-label="Read aloud" type="button">
                    <Volume2 size={14} />
                  </button>
                  <div className="pr-7 text-sm leading-relaxed md:text-[15px]" style={{ color: "var(--cv-text)" }}>{msg.content}</div>
                  {msg.options && (
                    <div className="mt-5 grid gap-2">
                      {msg.options.map((opt, i) => (
                        <motion.button key={opt} whileHover={{ scale: 1.01, x: 2 }} whileTap={{ scale: 0.99 }}
                          onClick={() => onChoose(opt)} disabled={loading} type="button"
                          className="rounded-2xl p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-45"
                          style={{ border: "1px solid var(--cv-badge-border)", background: "var(--cv-badge-bg)" }}>
                          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: "var(--cv-brand-a)" }}>{String.fromCharCode(65 + i)}</span>
                          <span className="text-sm" style={{ color: "var(--cv-text)" }}>{opt}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            {msg.role === "slack" && <SlackMessage sender={msg.meta?.sender ?? "Team"} message={msg.content} />}
            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="btn-glow max-w-md rounded-3xl rounded-tr-md bg-grad-purple px-5 py-3 text-sm text-white">{msg.content}</div>
              </div>
            )}
            {msg.role === "system" && <div className="py-2 text-center text-xs italic" style={{ color: "var(--cv-brand-a)", opacity: 0.7 }}>{msg.content}</div>}
          </motion.div>
        ))}
      </AnimatePresence>
      {loading && (
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs" style={{ color: "var(--cv-text-secondary)" }}>
          <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: "var(--cv-brand-a)" }} />
          <span className="h-2 w-2 animate-bounce rounded-full [animation-delay:.12s]" style={{ background: "var(--cv-brand-b)" }} />
          <span className="h-2 w-2 animate-bounce rounded-full [animation-delay:.24s]" style={{ background: "var(--cv-brand-c)" }} />
          <span className="ml-1">AI is computing the next branch...</span>
        </div>
      )}
    </div>
  );
}

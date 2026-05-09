"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingDown, TrendingUp, Volume2 } from "lucide-react";
import { SimMessage } from "@/types";
import SlackMessage from "./SlackMessage";

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
    if (typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.02;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div ref={ref} className="flex-1 space-y-5 overflow-y-auto px-4 pb-8 pt-6 md:px-0">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            {message.role === "ai" && (
              <div className="max-w-2xl">
                {message.meta?.metric && (
                  <div className="glass mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/80">
                    <span className="text-white/60">{message.meta.metric.label}</span>
                    <span className="font-semibold">{message.meta.metric.value}</span>
                    {message.meta.metric.trend === "up" ? (
                      <TrendingUp size={12} className="text-emerald-300" />
                    ) : (
                      <TrendingDown size={12} className="text-rose-300" />
                    )}
                  </div>
                )}

                <div className="glass-strong surface-ring relative rounded-3xl rounded-tl-md p-5">
                  <button
                    onClick={() => speak(message.content)}
                    className="absolute right-3 top-3 rounded-md p-1 text-white/46 transition hover:bg-white/10 hover:text-white"
                    aria-label="Read aloud"
                    type="button"
                  >
                    <Volume2 size={14} />
                  </button>

                  <div className="pr-7 text-sm leading-relaxed text-white/90 md:text-[15px]">
                    {message.content}
                  </div>

                  {message.options && (
                    <div className="mt-5 grid gap-2">
                      {message.options.map((option, optionIndex) => (
                        <motion.button
                          key={option}
                          whileHover={{ scale: 1.01, x: 2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => onChoose(option)}
                          disabled={loading}
                          type="button"
                          className="rounded-2xl border border-white/20 bg-slate-950/40 p-3 text-left transition hover:border-sky-400/50 hover:bg-sky-500/10 disabled:cursor-not-allowed disabled:opacity-45"
                        >
                          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.15em] text-sky-300">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="text-sm text-white/90">{option}</span>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {message.role === "slack" && <SlackMessage sender={message.meta?.sender ?? "Team"} message={message.content} />}

            {message.role === "user" && (
              <div className="flex justify-end">
                <div className="btn-glow max-w-md rounded-3xl rounded-tr-md bg-grad-purple px-5 py-3 text-sm text-white">
                  {message.content}
                </div>
              </div>
            )}

            {message.role === "system" && (
              <div className="py-2 text-center text-xs italic text-cyan-200/70">{message.content}</div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {loading && (
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-white/70">
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300 [animation-delay:.12s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-sky-300 [animation-delay:.24s]" />
          <span className="ml-1">AI is computing the next branch...</span>
        </div>
      )}
    </div>
  );
}

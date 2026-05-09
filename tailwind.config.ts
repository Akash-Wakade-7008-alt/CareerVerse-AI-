import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAFBFE",
        foreground: "#1A1D2E",
        primary: { DEFAULT: "#6366F1", foreground: "#fff" },
        accent: { DEFAULT: "#8B5CF6", foreground: "#fff" },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Manrope", "sans-serif"],
      },
      backgroundImage: {
        "grad-purple": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)",
        "grad-cosmic": "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #06B6D4 100%)",
        "grad-warm": "linear-gradient(135deg, #818CF8 0%, #A78BFA 50%, #22D3EE 100%)",
      },
      animation: {
        "blob": "blob 12s infinite ease-in-out",
        "float": "float 6s infinite ease-in-out",
        "glow": "glow 2.5s infinite alternate",
        "shimmer": "shimmer 3s linear infinite",
        "aurora": "aurora 12s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float-subtle": "float-subtle 4s ease-in-out infinite",
        "text-glow": "text-glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "icon-draw": "icon-draw 6s ease-in-out infinite",
      },
      keyframes: {
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-60px) scale(1.15)" },
          "66%": { transform: "translate(-30px,30px) scale(0.9)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(99,102,241,.3)" },
          "100%": { boxShadow: "0 0 40px rgba(139,92,246,.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        aurora: {
          "0%,100%": { opacity: "0.15", transform: "translateX(-20%) scaleY(1)" },
          "25%": { opacity: "0.3", transform: "translateX(10%) scaleY(1.2)" },
          "50%": { opacity: "0.2", transform: "translateX(20%) scaleY(0.8)" },
          "75%": { opacity: "0.35", transform: "translateX(-10%) scaleY(1.1)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 20px rgba(99,102,241,.2), 0 0 60px rgba(139,92,246,.08)" },
          "50%": { boxShadow: "0 0 40px rgba(99,102,241,.35), 0 0 80px rgba(139,92,246,.14)" },
        },
        "float-subtle": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "text-glow": {
          "0%,100%": { textShadow: "0 0 12px rgba(99,102,241,.2)" },
          "50%": { textShadow: "0 0 24px rgba(139,92,246,.35)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "icon-draw": {
          "0%": { strokeDashoffset: "100" },
          "50%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "100" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;

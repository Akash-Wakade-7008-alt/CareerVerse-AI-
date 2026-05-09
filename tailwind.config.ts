import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05010F",
        foreground: "#F5F3FF",
        primary: { DEFAULT: "#8B5CF6", foreground: "#fff" },
        accent: { DEFAULT: "#3B82F6", foreground: "#fff" },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Manrope", "sans-serif"],
      },
      backgroundImage: {
        "grad-purple": "linear-gradient(135deg,#8B5CF6 0%,#3B82F6 100%)",
        "grad-cosmic": "linear-gradient(135deg,#7C3AED 0%,#2563EB 50%,#06B6D4 100%)",
      },
      animation: {
        "blob": "blob 12s infinite ease-in-out",
        "float": "float 6s infinite ease-in-out",
        "glow": "glow 2.5s infinite alternate",
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
          "0%": { boxShadow: "0 0 20px rgba(139,92,246,.4)" },
          "100%": { boxShadow: "0 0 40px rgba(59,130,246,.7)" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;

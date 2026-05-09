import type { Metadata } from "next";
import "./globals.css";
import AnimatedBackground from "@/components/layout/AnimatedBackground";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata: Metadata = {
  title: "CareerVerse AI | Explore Careers in Simulated Workdays",
  description:
    "CareerVerse AI helps students experience careers through immersive simulations, skill analytics, and personalized alignment reports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="font-sans min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            <AnimatedBackground />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

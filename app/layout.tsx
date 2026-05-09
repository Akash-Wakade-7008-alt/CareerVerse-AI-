import type { Metadata } from "next";
import "./globals.css";
import FloatingBlobs from "@/components/FloatingBlobs";

export const metadata: Metadata = {
  title: "CareerVerse AI | Explore Careers in Simulated Workdays",
  description:
    "CareerVerse AI helps students experience careers through immersive simulations, skill analytics, and personalized alignment reports.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-background text-foreground font-sans">
        <FloatingBlobs />
        {children}
      </body>
    </html>
  );
}

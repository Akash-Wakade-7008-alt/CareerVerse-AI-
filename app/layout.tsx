import type { Metadata } from "next";
import "./globals.css";
import FloatingBlobs from "@/components/FloatingBlobs";

export const metadata: Metadata = {
  title: "CareerVerse AI — Experience careers before choosing them",
  description: "AI-powered career simulations for students. Live the job before picking it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-background text-foreground">
        <FloatingBlobs />
        {children}
      </body>
    </html>
  );
}

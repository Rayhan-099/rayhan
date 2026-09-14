import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Rayhan Khan | AI / Full-Stack Engineer",
  description: "Portfolio of Rayhan Khan, a Software Engineer specializing in AI/ML, Backend, and Full-Stack Development.",
  keywords: ["Software Engineer", "AI/ML", "React", "Python", "Rayhan Khan", "Full-Stack Developer"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${outfit.variable} ${mono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30 selection:text-primary`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

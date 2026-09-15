import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { ThemeProvider } from "@/context/ThemeContext";

const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ['300', '400', '500', '600', '700'], variable: "--font-serif", style: ['normal', 'italic'] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Rayhan Khan | AI / Full-Stack Engineer",
  description: "Portfolio of Rayhan Khan, a Software Engineer specializing in AI/ML, Backend, and Full-Stack Development.",
  keywords: ["Software Engineer", "AI/ML", "React", "Python", "Rayhan Khan", "Full-Stack Developer"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#110e12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary`}>
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

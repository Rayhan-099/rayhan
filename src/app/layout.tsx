import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Rayhan Khan | Software Engineer & AI Systems Architect",
  description:
    "Engineering portfolio of Rayhan Khan. Computer science undergraduate at AKTU specializing in full-stack architecture, machine learning inference, computer vision with DINOv2, and remote sensing pipelines.",
  keywords: [
    "Rayhan Khan",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "FastAPI",
    "React",
    "DINOv2",
    "Sentinel SAR",
    "Full-Stack Developer",
    "AKTU",
    "Noida"
  ],
  authors: [{ name: "Rayhan Khan", url: "https://github.com/Rayhan-099" }],
  creator: "Rayhan Khan",
  metadataBase: new URL("https://rayhank.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rayhan Khan | Software Engineer & AI Systems Architect",
    description:
      "Engineering portfolio showcasing full-stack platforms, machine learning systems, and computer vision research.",
    url: "https://rayhank.vercel.app",
    siteName: "Rayhan Khan Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayhan Khan | Software Engineer",
    description:
      "Building resilient full-stack systems and machine learning applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-eclipse-black text-porcelain selection:bg-crimson selection:text-porcelain flex flex-col">
        <SmoothScrollProvider>
          <Navigation />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

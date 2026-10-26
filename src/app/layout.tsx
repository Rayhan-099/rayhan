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
    "Noida",
  ],
  authors: [{ name: "Rayhan Khan", url: "https://github.com/Rayhan-099" }],
  creator: "Rayhan Khan",
  metadataBase: new URL("https://rayhan.runs-on.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rayhan Khan | Software Engineer & AI Systems Architect",
    description:
      "Engineering portfolio showcasing full-stack platforms, machine learning systems, and computer vision research.",
    url: "https://rayhan.runs-on.dev",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://rayhan.runs-on.dev/#person",
      name: "Rayhan Khan",
      url: "https://rayhan.runs-on.dev/",
      jobTitle: "Software Engineer & AI Systems Architect",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Dr. A.P.J. Abdul Kalam Technical University",
        alternateName: "AKTU",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "India",
      },
      sameAs: [
        "https://github.com/Rayhan-099",
        "https://www.linkedin.com/in/rayhan-khan-099/",
        "https://leetcode.com/u/Rayhan_099/",
      ],
      knowsAbout: [
        "Full-Stack Architecture",
        "Machine Learning Inference",
        "Computer Vision",
        "DINOv2",
        "Sentinel-1 SAR",
        "FastAPI",
        "React",
        "Next.js",
        "TypeScript",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://rayhan.runs-on.dev/#website",
      url: "https://rayhan.runs-on.dev/",
      name: "Rayhan Khan Portfolio",
      publisher: {
        "@id": "https://rayhan.runs-on.dev/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-eclipse-black text-porcelain selection:bg-crimson selection:text-porcelain flex flex-col">
        {/* Accessible Skip-to-Content Landmark */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-ember focus:text-eclipse-black focus:font-mono focus:text-xs focus:font-semibold focus:shadow-xl focus:outline-none focus:rounded-sm transition-transform"
        >
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Navigation />
          <main className="flex-1 w-full" id="main-content">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

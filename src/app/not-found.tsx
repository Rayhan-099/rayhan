import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Rayhan Khan',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(118,93,103,0.1)_0%,transparent_50%)] pointer-events-none" />
      <div className="relative z-10 text-center">
        <h1 className="font-serif text-8xl md:text-9xl text-foreground italic mb-4">404</h1>
        <p className="font-sans text-xl text-foreground-secondary tracking-widest uppercase mb-12">Page not found.</p>
        <Link 
          href="/" 
          className="group relative overflow-hidden inline-flex justify-center items-center px-8 py-3.5 bg-transparent border border-white/20 text-white font-sans text-xs uppercase tracking-widest transition-all hover:border-white hover:bg-white/5 rounded-full"
        >
          <span className="relative z-10">Return Home</span>
        </Link>
      </div>
    </main>
  );
}

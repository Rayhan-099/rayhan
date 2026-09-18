import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Rayhan Khan',
  description: 'Privacy policy for Rayhan Khan\'s portfolio.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
      <h1 className="font-serif text-5xl md:text-7xl mb-12 text-foreground italic">Privacy Policy</h1>
      <div className="font-sans text-base md:text-lg text-foreground-secondary leading-relaxed space-y-8">
        <p>This is a personal portfolio. No personal data is actively collected from visitors.</p>
        <p>Standard analytical data (like referring domains, generic geography, browser types) may be collected automatically by the hosting provider (Vercel) for operational and security purposes.</p>
        <p>If you contact me via email, your email address and any other information you provide will only be used to respond to your inquiry.</p>
        <p className="pt-12 text-sm text-foreground-muted uppercase tracking-widest">Last Updated: September 2026</p>
      </div>
    </main>
  );
}

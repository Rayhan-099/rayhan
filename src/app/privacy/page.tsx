import React from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/CustomIcons";

export const metadata = {
  title: "Privacy Policy | Rayhan Khan Portfolio",
  description: "Privacy policy and data handling disclosures for the portfolio of Rayhan Khan.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-32 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans font-medium text-xs uppercase tracking-wider text-steel hover:text-ember transition-colors mb-6"
        >
          <span>Return to Master System</span>
          <IconArrowRight className="w-3.5 h-3.5 rotate-180" />
        </Link>
        <span className="font-mono text-xs uppercase tracking-telemetry text-crimson block mb-2">
          Data Governance
        </span>
        <h1 className="text-4xl md:text-5xl font-syne font-extrabold uppercase tracking-tight text-porcelain">
          Privacy Policy
        </h1>
        <p className="font-sans text-xs text-steel mt-2">
          Effective Date: October 2026 | Noida, Uttar Pradesh, India
        </p>
      </div>

      <div className="space-y-8 text-sm md:text-base text-porcelain/85 leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-ember">
            Principles of Transparency
          </h2>
          <p>
            Your privacy is respected. This static portfolio website is engineered to operate with minimal data collection. We do not sell, rent, monetize, or trade visitor data under any circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-ember">
            Cookies and Tracking Technologies
          </h2>
          <p>
            This website does not use tracking cookies, advertising trackers, or profiling scripts. No Google Analytics, Meta Pixel, or third-party behavioral monitors are embedded in this website.
          </p>
          <p>
            Client-side browser storage (such as localStorage) is strictly used for functional user experience preferences, such as remembering your operating system reduced-motion accessibility preference.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-ember">
            Hosting Infrastructure and Server Telemetry
          </h2>
          <p>
            This portfolio is hosted via standard cloud infrastructure (including runs-on.dev and content delivery networks). Like all web hosting platforms, edge servers automatically log basic HTTP request metadata:
          </p>
          <ul className="space-y-1.5 font-mono text-xs text-steel pl-4">
            <li>› Requesting IP address (often anonymized)</li>
            <li>› Operating system and browser user agent</li>
            <li>› Timestamp and requested resource URL</li>
            <li>› HTTP status code and response size</li>
          </ul>
          <p className="text-xs text-steel">
            These logs are collected solely for security auditing, DDoS prevention, and network performance optimization.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-ember">
            User-Initiated Contact
          </h2>
          <p>
            When you send an email to khanrayhan8307@gmail.com or initiate contact via verified professional channels, the personal data you choose to disclose (such as your name, corporate email, and message contents) will be used exclusively to reply to your inquiry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-semibold text-xs uppercase tracking-wider text-ember">
            Data Protection Inquiries
          </h2>
          <p>
            To request information about any correspondence or data retention, contact Rayhan Khan directly at:
          </p>
          <p className="font-mono text-xs text-porcelain bg-eclipse-surface p-3 rounded border border-gunmetal">
            khanrayhan8307@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}

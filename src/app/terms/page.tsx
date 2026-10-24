import React from "react";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/CustomIcons";

export const metadata = {
  title: "Terms of Service | Rayhan Khan Portfolio",
  description: "Terms of service and usage guidelines for the engineering portfolio of Rayhan Khan.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-32 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-steel hover:text-ember transition-colors mb-6"
        >
          <span>Return to Master System</span>
          <IconArrowRight className="w-3.5 h-3.5 rotate-180" />
        </Link>
        <span className="font-mono text-xs uppercase tracking-telemetry text-crimson block mb-2">
          Legal Framework
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-porcelain">
          Terms of Service.
        </h1>
        <p className="font-mono text-xs text-steel mt-2">
          Effective Date: October 2026 | Noida, Uttar Pradesh, India
        </p>
      </div>

      <div className="space-y-8 text-sm md:text-base text-porcelain/85 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ember">
            01 / Scope and Purpose
          </h2>
          <p>
            This website is the professional personal portfolio of Rayhan Khan. Its purpose is to showcase software engineering projects, machine learning architecture, research outcomes, and academic credentials to prospective employers, collaborators, and clients.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ember">
            02 / Intellectual Property and Open Source
          </h2>
          <p>
            The portfolio design, custom vector assets, copy, and layout arrangements are the intellectual property of Rayhan Khan, unless otherwise noted.
          </p>
          <p>
            Open source repositories and software systems linked on this website (such as Lumine AI, SatQuery AI, and Current Capital) are governed by their respective repository licenses (typically MIT or Apache 2.0). Visitors are encouraged to review the specific LICENSE file in each public GitHub repository before reusing source code.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ember">
            03 / External Links and Live Deployments
          </h2>
          <p>
            This website provides links to external domains, including GitHub repositories, Vercel deployments, LinkedIn profiles, LeetCode accounts, and Coursera certificate verification registries.
          </p>
          <p>
            Rayhan Khan does not control external third-party services and accepts no responsibility for their content, uptime, availability, or operational practices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ember">
            04 / Limitation of Liability
          </h2>
          <p>
            All information and technical demonstrations on this website are provided on an as-is basis without warranties of any kind. Rayhan Khan is not liable for damages resulting from the use or inability to use the information, code snippets, or linked deployments on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-wider text-ember">
            05 / Inquiries and Communications
          </h2>
          <p>
            For questions concerning these Terms of Service or potential technical collaboration, please reach out directly via email at:
          </p>
          <p className="font-mono text-xs text-porcelain bg-eclipse-surface p-3 rounded border border-gunmetal">
            khanrayhan8307@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}

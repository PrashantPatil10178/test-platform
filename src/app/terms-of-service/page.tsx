import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Terms of Service - MHT CET Prep",
  description:
    "Read our Terms of Service regarding the use of our MHT CET preparation platform.",
};

export default function TermsOfServicePage() {
  return (
    <ScrollArea className="h-[100dvh]">
      <div className="bg-background relative min-h-screen w-full font-sans">
        <LandingHeader />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground mb-8 flex items-center gap-2 text-sm transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <div className="prose dark:prose-invert mx-auto max-w-4xl">
              <h1 className="mb-8 text-4xl font-bold tracking-tight">
                Terms of Service
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Last updated: January 21, 2026
              </p>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  1. Acceptance of Terms
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  By accessing and using this website, you accept and agree to
                  be bound by the terms and provision of this agreement. In
                  addition, when using this website's particular services, you
                  shall be subject to any posted guidelines or rules applicable
                  to such services.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  2. Provision of Services
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We are constantly innovating in order to provide the best
                  possible experience for our users. You acknowledge and agree
                  that the form and nature of the services which we provide may
                  change from time to time without prior notice to you.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  3. Use of the Site
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You agree to use the site only for lawful purposes and in a
                  way that does not infringe the rights of, restrict or inhibit
                  anyone else's use and enjoyment of the site. Prohibited
                  behavior includes harassing or causing distress or
                  inconvenience to any other user, transmitting obscene or
                  offensive content or disrupting the normal flow of dialogue
                  within our site.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  4. Intellectual Property
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The content, organization, graphics, design, compilation,
                  magnetic translation, digital conversion and other matters
                  related to the Site are protected under applicable copyrights,
                  trademarks and other proprietary (including but not limited to
                  intellectual property) rights. The copying, redistribution,
                  use or publication by you of any such matters or any part of
                  the Site is strictly prohibited.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">5. Disclaimer</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The materials on our website are provided on an 'as is' basis.
                  We makes no warranties, expressed or implied, and hereby
                  disclaims and negates all other warranties including, without
                  limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">6. Limitations</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  In no event shall we or our suppliers be liable for any
                  damages (including, without limitation, damages for loss of
                  data or profit, or due to business interruption) arising out
                  of the use or inability to use the materials on our website.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  7. Governing Law
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Any claim relating to our website shall be governed by the
                  laws of India without regard to its conflict of law
                  provisions.
                </p>
              </section>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </ScrollArea>
  );
}

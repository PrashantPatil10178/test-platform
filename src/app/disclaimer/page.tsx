import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type Metadata } from "next";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Disclaimer - MHT CET Prep",
  description:
    "Read our disclaimer to understand the terms and conditions of using MHT CET Prep platform.",
};

export default function DisclaimerPage() {
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
                Disclaimer
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Last updated: January 21, 2026
              </p>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  1. General Information
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The information provided by MHT CET Prep ("we," "us," or
                  "our") on mhtcet.app (the "Site") is for general informational
                  and educational purposes only. All information on the Site is
                  provided in good faith, however we make no representation or
                  warranty of any kind, express or implied, regarding the
                  accuracy, adequacy, validity, reliability, availability or
                  completeness of any information on the Site.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  2. Educational Content
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The content provided on this platform, including practice
                  questions, mock tests, study materials, and analytics, is
                  designed to assist students in their preparation for the MHT
                  CET examination. However, we do not guarantee specific results
                  or outcomes. Success in examinations depends on various factors
                  including individual effort, aptitude, and preparation time.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  3. Third-Party Links and Content
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The Site may contain (or you may be sent through the Site)
                  links to other websites or content belonging to or originating
                  from third parties or links to websites and features in
                  banners or other advertising. Such external links are not
                  investigated, monitored, or checked for accuracy, adequacy,
                  validity, reliability, availability or completeness by us.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We do not warrant, endorse, guarantee, or assume
                  responsibility for the accuracy or reliability of any
                  information offered by third-party websites linked through the
                  site or any website or feature linked in any banner or other
                  advertising.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  4. Advertising Disclaimer
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  This Site is affiliated with Google AdSense and other
                  advertising partners. We may display advertisements and
                  promotional content from third parties. The appearance of
                  advertisements on our website does not constitute an
                  endorsement, guarantee, warranty, or recommendation by MHT CET
                  Prep.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We are not responsible for the content of advertisements, the
                  promises made, or the quality or reliability of the products
                  or services offered in any advertisement. Users should
                  exercise due diligence before purchasing any product or
                  service advertised on our platform.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  5. Accuracy of Information
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  While we strive to ensure that the information provided on the
                  Site is accurate and up-to-date, we make no representations or
                  warranties of any kind about the completeness, accuracy,
                  reliability, suitability or availability of the information,
                  products, services, or related graphics contained on the Site.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Examination patterns, syllabi, and marking schemes may change.
                  We recommend that students verify all information with
                  official sources and examination conducting authorities.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  6. No Professional Advice
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The information on this Site is provided for educational
                  purposes only and should not be construed as professional
                  advice. You should not act or refrain from acting on the basis
                  of any content included on the Site without seeking appropriate
                  professional advice.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  7. Limitation of Liability
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Under no circumstances shall MHT CET Prep, its officers,
                  directors, employees, or agents be liable for any direct,
                  indirect, incidental, special, consequential, or punitive
                  damages arising out of your access to, or use of, the Site.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  8. Changes to This Disclaimer
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We reserve the right to make changes to this disclaimer at any
                  time. Any changes will be posted on this page with an updated
                  revision date. Your continued use of the Site following the
                  posting of changes constitutes your acceptance of such
                  changes.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">9. Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have any questions about this disclaimer, please
                  contact us at:{" "}
                  <a
                    href="mailto:support@mhtcet.app"
                    className="text-primary hover:underline"
                  >
                    support@mhtcet.app
                  </a>
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

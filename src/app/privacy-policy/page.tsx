import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { type Metadata } from "next";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Privacy Policy - MHT CET Prep",
  description:
    "Read our Privacy Policy to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Last updated: January 21, 2026
              </p>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">1. Introduction</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Welcome to MHT CET Prep ("we," "our," or "us"). We respect
                  your privacy and are committed to protecting your personal
                  data. This privacy policy will inform you as to how we look
                  after your personal data when you visit our website
                  (mhtcet.app) and tell you about your privacy rights and how
                  the law protects you.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  2. Information We Collect
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We may collect, use, store and transfer different kinds of
                  personal data about you which we have grouped together
                  follows:
                </p>
                <ul className="mb-4 list-outside list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Identity Data:</strong> includes first name, last
                    name, username or similar identifier.
                  </li>
                  <li>
                    <strong>Contact Data:</strong> includes email address and
                    telephone number.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> includes internet protocol
                    (IP) address, your login data, browser type and version,
                    time zone setting and location, browser plug-in types and
                    versions, operating system and platform.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> includes information about how
                    you use our website, products and services.
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  3. How We Use Your Data
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data in the following
                  circumstances:
                </p>
                <ul className="mb-4 list-outside list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                  <li>
                    Where we need to perform the contract we are about to enter
                    into or have entered into with you.
                  </li>
                  <li>
                    Where it is necessary for our legitimate interests (or those
                    of a third party) and your interests and fundamental rights
                    do not override those interests.
                  </li>
                  <li>
                    Where we need to comply with a legal or regulatory
                    obligation.
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  4. Advertising and Analytics
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We use third-party advertising companies to serve content and
                  advertisements when you visit our website, which may use
                  cookies. These cookies enable us to track and target the
                  interests of our users to enhance the experience on our site.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  For more information about Google AdSense and how it uses
                  cookies and data, please visit{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google AdSense Privacy & Terms
                  </a>
                  .
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  5. Data Security
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used or
                  accessed in an unauthorized way, altered or disclosed. In
                  addition, we limit access to your personal data to those
                  employees, agents, contractors and other third parties who
                  have a business need to know.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  6. Information for Kids
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We do not knowingly collect personally identifiable
                  information from children under 13. If you become aware that a
                  child has provided us with Personal Data, please contact us.
                  If we become aware that we have collected Personal Data from
                  children without verification of parental consent, we take
                  steps to remove that information from our servers.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">7. Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have any questions about this privacy policy or our
                  privacy practices, please contact us at:{" "}
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

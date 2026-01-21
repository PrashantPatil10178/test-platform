import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Cookie Policy - MHT CET Prep",
  description:
    "Learn about how we use cookies to improve your user experience.",
};

export default function CookiePolicyPage() {
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
                Cookie Policy
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Last updated: January 21, 2026
              </p>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  1. What Are Cookies
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  As is common practice with almost all professional websites
                  this site uses cookies, which are tiny files that are
                  downloaded to your computer, to improve your experience. This
                  page describes what information they gather, how we use it and
                  why we sometimes need to store these cookies. We will also
                  share how you can prevent these cookies from being stored
                  however this may downgrade or 'break' certain elements of the
                  sites functionality.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  2. How We Use Cookies
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We use cookies for a variety of reasons detailed below.
                  Unfortunately in most cases there are no industry standard
                  options for disabling cookies without completely disabling the
                  functionality and features they add to this site. It is
                  recommended that you leave on all cookies if you are not sure
                  whether you need them or not in case they are used to provide
                  a service that you use.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  3. Third Party Cookies
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  In some special cases we also use cookies provided by trusted
                  third parties. The following section details which third party
                  cookies you might encounter through this site.
                </p>
                <ul className="mb-4 list-outside list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Google AdSense:</strong> We use Google AdSense to
                    serve advertising. Google uses cookies to serve ads based on
                    a user's prior visits to your website or other websites.
                    Google's use of advertising cookies enables it and its
                    partners to serve ads to your users based on their visit to
                    your sites and/or other sites on the Internet. Users may opt
                    out of personalized advertising by visiting{" "}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google Ads Settings
                    </a>
                    .
                  </li>
                  <li>
                    <strong>Analytics:</strong> This site uses Google Analytics
                    which is one of the most widespread and trusted analytics
                    solutions on the web for helping us to understand how you
                    use the site and ways that we can improve your experience.
                    These cookies may track things such as how long you spend on
                    the site and the pages that you visit so we can continue to
                    produce engaging content.
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">
                  4. More Information
                </h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Hopefully that has clarified things for you and as was
                  previously mentioned if there is something that you aren't
                  sure whether you need or not it's usually safer to leave
                  cookies enabled in case it does interact with one of the
                  features you use on our site.
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

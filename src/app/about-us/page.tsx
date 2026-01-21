import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "About Us - MHT CET Prep",
  description:
    "Learn about our mission to democratize MHT CET preparation with AI-powered learning.",
};

export default function AboutUsPage() {
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
                About Us
              </h1>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  At MHT CET Prep, our mission is to democratize access to
                  high-quality entrance exam preparation for students across
                  Maharashtra and India. We believe that every student deserves
                  the chance to excel and secure admission to their dream
                  engineering college.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">What We Do</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We provide a comprehensive, AI-powered platform designed
                  specifically for the MHT CET examination. Our platform offers
                  personalized learning paths, adaptive practice tests, and
                  detailed analytics to help students identify their strengths
                  and weaknesses. By simulating real exam conditions, we help
                  build confidence and improve time management skills.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Unlike generic test prep platforms, we are laser-focused on
                  the MHT CET syllabus, pattern, and difficulty level, ensuring
                  that your preparation is 100% relevant.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Founded in 2024, MHT CET Prep was born out of the innovative
                  idea that technology can bridge the gap between hard work and
                  smart work. We realized that many students work incredibly
                  hard but lack the data-driven insights to optimize their
                  scores. We set out to change that.
                </p>
              </section>

              <section className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">Why Choose Us?</h2>
                <ul className="mb-4 list-outside list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Data-Driven:</strong> Our algorithms analyze your
                    performance to suggest the most impactful areas for
                    improvement.
                  </li>
                  <li>
                    <strong>Realistic Simulations:</strong> Practice with tests
                    that look and feel just like the actual CET exam.
                  </li>
                  <li>
                    <strong>Affordable:</strong> Premium quality education at a
                    fraction of the cost of traditional coaching classes.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </ScrollArea>
  );
}

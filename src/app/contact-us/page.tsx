import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata: Metadata = {
  title: "Contact Us - MHT CET Prep",
  description:
    "Get in touch with the MHT CET Prep team for support, queries, or feedback.",
};

export default function ContactUsPage() {
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
            <div className="prose dark:prose-invert lg:prose-lg mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
              <div>
                <h1 className="mb-6 text-4xl font-bold tracking-tight">
                  Contact Us
                </h1>
                <p className="text-muted-foreground mb-8 text-lg">
                  Have questions? We'd love to hear from you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Mail className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground text-sm">
                        Our friendly team is here to help.
                      </p>
                      <a
                        href="mailto:support@mhtcet.app"
                        className="text-primary hover:underline"
                      >
                        support@mhtcet.app
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <MapPin className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Office</h3>
                      <p className="text-muted-foreground text-sm">
                        Come say hello at our office.
                      </p>
                      <p className="text-foreground mt-1 text-sm">
                        100 React Street, Tech City,
                        <br />
                        Maharashtra 400001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                      <Phone className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground text-sm">
                        Mon-Fri from 8am to 6pm.
                      </p>
                      <p className="text-foreground mt-1 text-sm">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-2xl border p-8">
                <h2 className="mb-6 text-2xl font-bold">Send us a message</h2>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label
                        htmlFor="firstName"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        First name
                      </label>
                      <input
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        id="firstName"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="lastName"
                        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Last name
                      </label>
                      <input
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        id="lastName"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      id="email"
                      placeholder="john@example.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Message
                    </label>
                    <textarea
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      id="message"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button
                    className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    type="submit"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <LandingFooter />
      </div>
    </ScrollArea>
  );
}

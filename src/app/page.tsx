import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Target,
  Trophy,
  Users,
  CheckCircle,
  BarChart3,
} from "lucide-react";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="bg-background relative min-h-screen overflow-hidden">
        <div className="dot-pattern absolute inset-0"></div>
        <div className="floating-shapes absolute inset-0"></div>

        <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
          <div className="container mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="clean-gradient relative flex h-8 w-8 items-center justify-center rounded-lg">
                  <div className="pulse-dot absolute inset-0 rounded-lg bg-blue-500 opacity-30"></div>
                  <Brain className="relative z-10 h-5 w-5 text-white" />
                </div>
                <span className="text-foreground text-xl font-bold">
                  AI-CET Prep
                </span>
              </div>

              <nav className="hidden items-center space-x-8 md:flex">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Product
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Docs
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Resources
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Pricing
                </Link>
              </nav>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Log in
                </Button>
                <Button className="clean-gradient smooth-transition text-white hover:opacity-90">
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10">
          <section className="relative py-20 lg:py-32">
            <div className="mesh-gradient absolute inset-0 opacity-30"></div>
            <div className="relative container mx-auto px-6">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div>
                  <div className="mb-6">
                    <Badge className="relative border-blue-200 bg-blue-50 font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-blue-500"></div>
                      BUILD SMART PREPARATION
                    </Badge>
                  </div>

                  <h1 className="text-foreground mb-6 text-5xl leading-tight font-bold lg:text-6xl">
                    The AI platform
                    <br />
                    for{" "}
                    <span className="text-gradient-blue">MHT CET success</span>
                  </h1>

                  <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
                    Personalized learning paths, adaptive testing, and real-time
                    analytics to help engineering aspirants excel in MHT CET.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      size="lg"
                      className="clean-gradient smooth-transition relative overflow-hidden px-8 py-3 text-white hover:opacity-90"
                    >
                      <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 hover:translate-x-[100%]"></div>
                      <span className="relative">Start Building</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="hover-lift relative px-8 py-3"
                    >
                      Get a Demo
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="geometric-bg absolute -inset-4 rounded-2xl opacity-40"></div>
                  <div className="bg-muted shadow-elegant-lg relative overflow-hidden rounded-lg p-8 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr from-green-400/20 to-blue-400/20 blur-xl"></div>

                    <div className="relative">
                      <div className="mb-6 grid grid-cols-3 gap-4">
                        <div className="bg-card shadow-elegant border-border hover-lift relative overflow-hidden rounded-lg border p-4">
                          <div className="absolute top-0 right-0 h-8 w-8 rounded-full bg-blue-500/10"></div>
                          <div className="relative mb-2 h-6 w-6 rounded bg-blue-100 dark:bg-blue-900">
                            <div className="pulse-dot absolute inset-0 rounded bg-blue-500/20"></div>
                          </div>
                          <div className="text-muted-foreground text-xs">
                            Physics
                          </div>
                          <div className="text-foreground text-sm font-semibold">
                            89%
                          </div>
                        </div>
                        <div className="bg-card shadow-elegant border-border hover-lift relative overflow-hidden rounded-lg border p-4">
                          <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-green-500/10"></div>
                          <div className="mb-2 h-6 w-6 rounded bg-green-100 dark:bg-green-900"></div>
                          <div className="text-muted-foreground text-xs">
                            Chemistry
                          </div>
                          <div className="text-foreground text-sm font-semibold">
                            76%
                          </div>
                        </div>
                        <div className="bg-card shadow-elegant border-border hover-lift relative overflow-hidden rounded-lg border p-4">
                          <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-orange-500/10"></div>
                          <div className="mb-2 h-6 w-6 rounded bg-orange-100 dark:bg-orange-900"></div>
                          <div className="text-muted-foreground text-xs">
                            Maths
                          </div>
                          <div className="text-foreground text-sm font-semibold">
                            92%
                          </div>
                        </div>
                      </div>

                      <div className="bg-card shadow-elegant border-border relative overflow-hidden rounded-lg border p-6">
                        <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                        <div className="relative mb-4 flex items-center justify-between">
                          <h3 className="text-foreground font-semibold">
                            AI Recommendations
                          </h3>
                          <Badge className="relative bg-blue-50 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            <div className="pulse-dot absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            Live
                          </Badge>
                        </div>
                        <div className="relative space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="pulse-dot h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-muted-foreground text-sm">
                              Focus on Organic Chemistry
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div
                              className="pulse-dot h-2 w-2 rounded-full bg-green-500"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                            <span className="text-muted-foreground text-sm">
                              Practice more Calculus
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div
                              className="pulse-dot h-2 w-2 rounded-full bg-orange-500"
                              style={{ animationDelay: "1s" }}
                            ></div>
                            <span className="text-muted-foreground text-sm">
                              Review Thermodynamics
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-muted relative py-20">
            <div className="grid-pattern absolute inset-0 opacity-30"></div>
            <div className="relative container mx-auto px-6">
              <div className="mb-16 text-center">
                <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                  Trusted by top students
                </h2>
                <p className="text-muted-foreground text-xl">
                  Join thousands who achieved their engineering dreams
                </p>
              </div>

              <div className="grid grid-cols-2 items-center gap-8 opacity-60 md:grid-cols-4 lg:grid-cols-7">
                {["IIT", "NIT", "VJTI", "COEP", "PICT", "ICT", "SPIT"].map(
                  (college, index) => (
                    <div
                      key={college}
                      className="relative flex items-center justify-center"
                    >
                      <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                      <div className="text-muted-foreground relative text-xl font-bold">
                        {college}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          <section className="relative py-20">
            <div className="dot-pattern-dense absolute inset-0 opacity-40"></div>
            <div className="relative container mx-auto px-6">
              <div className="mb-16 text-center">
                <Badge className="relative mb-4 border-blue-200 bg-blue-50 font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-blue-500"></div>
                  FEATURES
                </Badge>
                <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                  Everything you need to succeed
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                  Our platform combines AI technology with proven teaching
                  methods to deliver personalized learning experiences.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    icon: Brain,
                    title: "AI-Powered Learning",
                    description:
                      "Personalized study plans that adapt to your learning style and pace.",
                    color: "blue",
                  },
                  {
                    icon: Target,
                    title: "Smart Practice",
                    description:
                      "Targeted questions based on your weak areas for maximum improvement.",
                    color: "green",
                  },
                  {
                    icon: BarChart3,
                    title: "Real-time Analytics",
                    description:
                      "Track your progress with detailed insights and performance metrics.",
                    color: "purple",
                  },
                  {
                    icon: BookOpen,
                    title: "Comprehensive Content",
                    description:
                      "50,000+ questions covering all MHT CET topics with detailed solutions.",
                    color: "orange",
                  },
                  {
                    icon: Trophy,
                    title: "Performance Tracking",
                    description:
                      "Monitor improvement with detailed progress reports and milestones.",
                    color: "indigo",
                  },
                  {
                    icon: Users,
                    title: "Expert Guidance",
                    description:
                      "Connect with top educators and successful alumni for mentorship.",
                    color: "pink",
                  },
                ].map((feature, index) => (
                  <Card
                    key={feature.title}
                    className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden border"
                  >
                    <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 transition-transform duration-500 group-hover:scale-150"></div>
                    <CardHeader className="relative">
                      <div
                        className={`h-12 w-12 bg-${feature.color}-100 dark:bg-${feature.color}-900 relative mb-4 flex items-center justify-center overflow-hidden rounded-lg`}
                      >
                        <div
                          className={`absolute inset-0 bg-${feature.color}-500/10 pulse-dot`}
                        ></div>
                        <feature.icon
                          className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400 relative z-10`}
                        />
                      </div>
                      <CardTitle className="text-foreground">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-muted relative py-20">
            <div className="geometric-bg absolute inset-0 opacity-20"></div>
            <div className="relative container mx-auto px-6">
              <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
                {[
                  { number: "15K+", label: "Active Students" },
                  { number: "50K+", label: "Practice Questions" },
                  { number: "98%", label: "Success Rate" },
                  { number: "4.9/5", label: "User Rating" },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className="hover-lift smooth-transition group relative"
                  >
                    <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="text-foreground relative mb-2 text-4xl font-bold">
                      <span className="relative z-10">{stat.number}</span>
                      <div
                        className="pulse-dot absolute -top-2 -right-2 h-3 w-3 rounded-full bg-blue-500/20"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      ></div>
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-20">
            <div className="mesh-gradient absolute inset-0 opacity-20"></div>
            <div className="relative container mx-auto px-6">
              <div className="relative mx-auto max-w-3xl text-center">
                <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 transform rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"></div>
                <h2 className="text-foreground relative mb-6 text-3xl font-bold lg:text-4xl">
                  Ready to start your MHT CET preparation?
                </h2>
                <p className="text-muted-foreground mb-8 text-xl">
                  Join thousands of students who achieved their engineering
                  dreams with our AI-powered platform.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="clean-gradient smooth-transition group relative overflow-hidden px-8 py-3 text-white hover:opacity-90"
                  >
                    <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]"></div>
                    <span className="relative flex items-center">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover-lift relative px-8 py-3"
                  >
                    Schedule Demo
                  </Button>
                </div>

                <div className="text-muted-foreground mt-6 flex items-center justify-center gap-6 text-sm">
                  {[
                    "14-day free trial",
                    "No credit card required",
                    "Cancel anytime",
                  ].map((text, index) => (
                    <div key={text} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-border bg-card relative border-t py-12">
          <div className="dot-pattern absolute inset-0 opacity-20"></div>
          <div className="relative container mx-auto px-6">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="mb-6 flex items-center space-x-2 md:mb-0">
                <div className="clean-gradient relative flex h-8 w-8 items-center justify-center rounded-lg">
                  <div className="pulse-dot absolute inset-0 rounded-lg bg-blue-500 opacity-20"></div>
                  <Brain className="relative z-10 h-5 w-5 text-white" />
                </div>
                <span className="text-foreground text-xl font-bold">
                  AI-CET Prep
                </span>
              </div>

              <div className="flex space-x-8">
                {["Privacy", "Terms", "Contact"].map((link) => (
                  <Link
                    key={link}
                    href="#"
                    className="text-muted-foreground hover:text-foreground smooth-transition group relative"
                  >
                    <span className="relative z-10">{link}</span>
                    <div className="bg-primary absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
              © 2025 AI-CET Prep. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </HydrateClient>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Target,
  Trophy,
  Users,
  CheckCircle2,
  BarChart3,
  Sparkles,
  Zap,
  GraduationCap,
  PlayCircle,
  Star,
  Quote,
  BrainIcon as IconBrain,
} from "lucide-react";
import { ProfileAvatar } from "@/components/profile-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";

// Utility for conditional classes
const cn = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <ScrollArea className="h-[100dvh]">
        <div className="bg-background relative min-h-screen w-full overflow-hidden font-sans selection:bg-blue-500/20">
          {/* Global Background Effects */}
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute top-0 -left-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
            <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          <LandingHeader />

          <main className="relative z-10 pt-24">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
              <div className="relative container mx-auto px-4 md:px-6">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                  <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <Badge
                      variant="outline"
                      className="animate-in fade-in slide-in-from-bottom-4 mb-6 border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-400"
                    >
                      <Sparkles className="mr-2 h-3.5 w-3.5" />
                      New: AI Analysis Engine v2.0
                    </Badge>

                    <h1 className="text-foreground animate-in fade-in slide-in-from-bottom-6 mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                      Crack MHT CET with
                      <br />
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Superhuman Intelligence
                      </span>
                    </h1>

                    <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom-8 mb-8 max-w-[600px] text-lg sm:text-xl">
                      Stop guessing what to study. Our AI analyzes your weak
                      points and builds a personalized roadmap to your dream
                      engineering college.
                    </p>

                    <div className="animate-in fade-in slide-in-from-bottom-10 flex flex-col gap-4 sm:flex-row">
                      <Button
                        size="lg"
                        className="h-12 bg-blue-600 px-8 text-base shadow-xl shadow-blue-500/20 hover:bg-blue-700"
                        asChild
                      >
                        <Link href="/signup">
                          Start Free Trial
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-12 border-2 px-8 text-base"
                        asChild
                      >
                        <Link href="/demo">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Watch Demo
                        </Link>
                      </Button>
                    </div>

                    <div className="animate-in fade-in slide-in-from-bottom-12 text-muted-foreground mt-10 flex items-center gap-4 text-sm">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="border-background bg-muted h-8 w-8 rounded-full border-2"
                          />
                        ))}
                      </div>
                      <p>
                        Trusted by <span className="font-semibold">15k+</span>{" "}
                        students
                      </p>
                    </div>
                  </div>

                  {/* 3D Perspective Hero Image */}
                  <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
                    <div className="relative z-10 rounded-xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-xl lg:rotate-x-[12deg] lg:rotate-y-[-12deg] lg:transform lg:transition-transform lg:duration-500 lg:hover:rotate-0 dark:bg-black/40">
                      {/* Fake Browser Header */}
                      <div className="mb-2 flex items-center gap-2 border-b border-white/10 px-2 pb-2">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                      </div>

                      {/* Dashboard Content Mockup */}
                      <div className="bg-background grid gap-4 rounded-lg p-4 sm:p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              Performance Overview
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              Last 7 days activity
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-green-500/10 text-green-600 hover:bg-green-500/20"
                          >
                            +12% Improvement
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { label: "Physics", val: 78, color: "bg-blue-500" },
                            {
                              label: "Chem",
                              val: 88,
                              color: "bg-purple-500",
                            },
                            { label: "Maths", val: 62, color: "bg-pink-500" },
                          ].map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-card rounded-lg border p-3"
                            >
                              <div className="text-muted-foreground text-xs">
                                {stat.label}
                              </div>
                              <div className="mt-2 text-2xl font-bold">
                                {stat.val}%
                              </div>
                              <div className="bg-muted mt-2 h-1.5 w-full rounded-full">
                                <div
                                  className={`h-full rounded-full ${stat.color}`}
                                  style={{ width: `${stat.val}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                          <div className="flex items-start gap-3">
                            <Zap className="mt-0.5 h-5 w-5 text-blue-500" />
                            <div>
                              <div className="text-sm font-medium">
                                AI Suggestion
                              </div>
                              <div className="text-muted-foreground text-xs">
                                Focus on <strong>Rotational Dynamics</strong>.
                                You missed 3 questions on Moment of Inertia.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Decorative Blobs behind 3D Card */}
                    <div className="absolute -top-12 -right-12 -z-10 h-72 w-72 rounded-full bg-purple-500/30 blur-[60px]" />
                    <div className="absolute -bottom-12 -left-12 -z-10 h-72 w-72 rounded-full bg-blue-500/30 blur-[60px]" />
                  </div>
                </div>
              </div>
            </section>

            {/* Logo Cloud */}
            <section className="bg-muted/30 border-y border-white/5 py-10 backdrop-blur-sm">
              <div className="container mx-auto px-6 text-center">
                <p className="text-muted-foreground mb-6 text-sm font-semibold tracking-wider uppercase">
                  Students from these colleges trust us
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:gap-16">
                  {["IIT Bombay", "VJTI", "COEP", "PICT", "SPIT", "ICT"].map(
                    (college) => (
                      <div
                        key={college}
                        className="text-xl font-bold md:text-2xl"
                      >
                        {college}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 lg:py-32">
              <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                    Engineered for efficiency
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Traditional coaching is one-size-fits-all. We built a
                    platform that adapts to <em>you</em>.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: Brain,
                      title: "Adaptive Learning Engine",
                      desc: "The difficulty adjusts instantly. If you're acing it, it gets harder. Struggling? We break it down.",
                      color: "text-blue-500",
                    },
                    {
                      icon: Target,
                      title: "Weakness Targeting",
                      desc: "We don't just tell you your score. We tell you exactly which concepts you're forgetting.",
                      color: "text-red-500",
                    },
                    {
                      icon: BarChart3,
                      title: "Predictive Analytics",
                      desc: "Know your probable rank before the exam. Our algorithm predicts your percentile with 95% accuracy.",
                      color: "text-purple-500",
                    },
                    {
                      icon: BookOpen,
                      title: "50k+ Question Bank",
                      desc: "Curated from last 20 years of PYQs and top reference books, with detailed video solutions.",
                      color: "text-green-500",
                    },
                    {
                      icon: Trophy,
                      title: "Gamified Progress",
                      desc: "Maintain streaks, earn XP, and climb the leaderboard. Making studying addictive.",
                      color: "text-yellow-500",
                    },
                    {
                      icon: Users,
                      title: "24/7 Doubt Solving",
                      desc: "Stuck at 2 AM? Post a photo of your doubt and get a solution within minutes.",
                      color: "text-pink-500",
                    },
                  ].map((feature, i) => (
                    <Card
                      key={i}
                      className="group border-muted bg-card/50 hover:border-primary/20 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <CardHeader>
                        <div
                          className={`bg-background ring-border mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg shadow-sm ring-1 ${feature.color}`}
                        >
                          <feature.icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">
                          {feature.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials - Styled as cards */}
            <section
              id="testimonials"
              className="bg-muted/50 relative border-y py-20"
            >
              <div className="container mx-auto px-4 md:px-6">
                <div className="mb-12 flex flex-col items-center text-center">
                  <Badge className="mb-4 bg-green-500/10 text-green-600 hover:bg-green-500/20">
                    Success Stories
                  </Badge>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Don't just take our word for it
                  </h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                  {[
                    {
                      name: "Rahul Sharma",
                      college: "IIT Bombay",
                      text: "I was stuck at 90 percentile. The AI pointed out my specific errors in Rotational Dynamics. Within a month, I pushed to 99.8.",
                      score: "99.8%ile",
                    },
                    {
                      name: "Anjali Gupta",
                      college: "VJTI, CS",
                      text: "The mock tests are harder than the actual exam. When I sat for the real CET, it felt like a breeze. Highly recommended!",
                      score: "99.5%ile",
                    },
                    {
                      name: "Soham Patil",
                      college: "COEP",
                      text: "Analytics showed me I was wasting too much time on Chemistry calculations. Fixed my strategy and saved 15 mins in the exam.",
                      score: "99.2%ile",
                    },
                  ].map((t, i) => (
                    <Card
                      key={i}
                      className="bg-background border-none shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex gap-1 text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <Quote className="text-muted-foreground/20 mb-2 h-8 w-8" />
                        <p className="text-muted-foreground">{t.text}</p>
                      </CardContent>
                      <CardFooter className="bg-muted/20 flex items-center gap-4 border-t py-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 font-bold text-white">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{t.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {t.college} •{" "}
                            <span className="font-medium text-green-600">
                              {t.score}
                            </span>
                          </p>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-20 lg:py-32">
              <div className="container mx-auto px-4 md:px-6">
                <div className="mb-16 text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight">
                    Simple, transparent pricing
                  </h2>
                  <p className="text-muted-foreground">
                    Invest in your future for less than the cost of a coffee a
                    day.
                  </p>
                </div>

                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                  {[
                    {
                      title: "Starter",
                      price: "₹999",
                      features: [
                        "10 Full Mock Tests",
                        "Basic Analytics",
                        "Physics & Chem only",
                      ],
                    },
                    {
                      title: "Pro",
                      price: "₹1,999",
                      popular: true,
                      features: [
                        "Unlimited Mock Tests",
                        "AI Weakness Analysis",
                        "All Subjects (PCM/B)",
                        "Video Solutions",
                      ],
                    },
                    {
                      title: "Elite",
                      price: "₹3,999",
                      features: [
                        "1-on-1 Mentorship",
                        "Custom Study Plan",
                        "College Counseling",
                        "Priority Support",
                      ],
                    },
                  ].map((plan, i) => (
                    <Card
                      key={i}
                      className={cn(
                        "relative flex flex-col transition-all hover:shadow-xl",
                        plan.popular
                          ? "border-primary z-10 scale-105 shadow-lg"
                          : "border-border hover:-translate-y-1",
                      )}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 right-0 left-0 mx-auto w-fit rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow-lg">
                          Most Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl">{plan.title}</CardTitle>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-extrabold tracking-tight">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground ml-1 text-sm font-medium">
                            /month
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center text-sm"
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className={cn(
                            "w-full",
                            plan.popular
                              ? "bg-primary hover:bg-primary/90"
                              : "variant-outline",
                          )}
                          variant={plan.popular ? "default" : "outline"}
                          asChild
                        >
                          <Link href="/signup">Choose {plan.title}</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="bg-primary text-primary-foreground relative overflow-hidden border-y py-24">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
              <div className="absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[100px]"></div>

              <div className="relative container mx-auto px-4 text-center md:px-6">
                <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to secure your seat at a top college?
                </h2>
                <p className="text-primary-foreground/80 mx-auto mb-10 max-w-2xl text-lg">
                  Join thousands of students optimizing their prep with AI. No
                  credit card required for the trial.
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-14 px-8 text-lg font-semibold shadow-lg transition-transform hover:scale-105"
                    asChild
                  >
                    <Link href="/signup">
                      Get Started for Free{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20">
              <div className="container mx-auto max-w-3xl px-4 md:px-6">
                <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      q: "Is this helpful for JEE Mains too?",
                      a: "Yes! While optimized for MHT CET, the Physics and Chemistry syllabus overlaps 90% with JEE Mains. Many students use it for both.",
                    },
                    {
                      q: "Can I use it on my phone?",
                      a: "Absolutely. We have dedicated apps for iOS and Android, and the web platform is fully responsive.",
                    },
                    {
                      q: "How accurate is the score prediction?",
                      a: "Our AI model has been trained on 5 years of result data. It typically predicts your percentile within a +/- 2% margin.",
                    },
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>
          </main>

          {/* Footer */}
          <LandingFooter />
        </div>
      </ScrollArea>
    </HydrateClient>
  );
}

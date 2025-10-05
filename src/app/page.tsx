import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  CheckCircle,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { ProfileAvatar } from "@/components/profile-avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Color mapping for feature cards
const colorStyles = {
  blue: {
    bg: "bg-blue-100 dark:bg-blue-900",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    gradient: "from-blue-500/5 to-purple-500/5",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-900",
    text: "text-green-600 dark:text-green-400",
    dot: "bg-green-500",
    gradient: "from-green-500/5 to-teal-500/5",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-900",
    text: "text-purple-600 dark:text-purple-400",
    dot: "bg-purple-500",
    gradient: "from-purple-500/5 to-pink-500/5",
  },
  orange: {
    bg: "bg-orange-100 dark:bg-orange-900",
    text: "text-orange-600 dark:text-orange-400",
    dot: "bg-orange-500",
    gradient: "from-orange-500/5 to-red-500/5",
  },
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-900",
    text: "text-indigo-600 dark:text-indigo-400",
    dot: "bg-indigo-500",
    gradient: "from-indigo-500/5 to-blue-500/5",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-900",
    text: "text-pink-600 dark:text-pink-400",
    dot: "bg-pink-500",
    gradient: "from-pink-500/5 to-purple-500/5",
  },
};

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <ScrollArea className="h-[100dvh]">
        <div className="bg-background min-h-screen overflow-scroll">
          <div className="dot-pattern pointer-events-none fixed inset-0 z-0"></div>
          <div className="floating-shapes pointer-events-none fixed inset-0 z-0"></div>

          {/* Enhanced Header */}
          <header className="border-border bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur-xl">
            <div className="container mx-auto px-6">
              <div className="flex h-16 items-center justify-between">
                <Link
                  href="/"
                  className="group flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-blue-500/50">
                    <div className="pulse-dot absolute inset-0 rounded-xl bg-blue-400 opacity-40"></div>
                    <Brain className="relative z-10 h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground text-xl font-bold">
                    AI-CET Prep
                  </span>
                </Link>

                <nav className="hidden items-center space-x-8 md:flex">
                  {[
                    { name: "Features", href: "#features" },
                    { name: "Pricing", href: "#pricing" },
                    { name: "Success Stories", href: "#success-stories" },
                    { name: "FAQ", href: "#faq" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group text-muted-foreground hover:text-foreground relative font-medium transition-colors duration-300"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center space-x-4">
                  {session ? (
                    <div className="flex items-center space-x-4">
                      <div className="hidden items-center space-x-3 sm:flex">
                        <ProfileAvatar user={session.user} />
                        <div className="flex flex-col">
                          <span className="text-foreground text-sm font-semibold">
                            {session.user?.name?.split(" ")[0] || "User"}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            Welcome back
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover-lift transition-all duration-300"
                        asChild
                      >
                        <Link href="/dashboard">Dashboard</Link>
                      </Button>
                      <form action="/api/auth/signout" method="post">
                        <Button
                          variant="ghost"
                          size="sm"
                          type="submit"
                          className="transition-colors duration-300 hover:text-red-500"
                        >
                          Log out
                        </Button>
                      </form>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="hover:bg-accent hidden transition-all duration-300 sm:flex"
                        asChild
                      >
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button
                        className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50"
                        asChild
                      >
                        <Link href="/signup">
                          <span className="relative z-10 flex items-center">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Start Free Trial
                          </span>
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-500 transition-transform duration-500 group-hover:translate-x-0"></div>
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="relative z-10">
            {/* Enhanced Hero Section */}
            <section className="relative py-20 lg:py-32">
              <div className="mesh-gradient pointer-events-none absolute inset-0 opacity-30"></div>
              <div className="relative container mx-auto px-6">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                  <div className="animate-fade-in-up space-y-8">
                    <Badge className="group relative border-blue-200 bg-blue-50 px-4 py-1.5 font-medium text-blue-700 shadow-sm transition-all duration-300 hover:shadow-md dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-blue-500"></div>
                      <Sparkles className="mr-2 inline h-4 w-4" />
                      AI-POWERED PREPARATION PLATFORM
                    </Badge>

                    <h1 className="text-foreground text-5xl leading-tight font-bold lg:text-6xl">
                      Master MHT CET with{" "}
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        AI Intelligence
                      </span>
                    </h1>

                    <p className="text-muted-foreground text-xl leading-relaxed">
                      Transform your engineering entrance preparation with
                      personalized learning paths, adaptive testing, and
                      real-time performance analytics. Join{" "}
                      <span className="text-foreground font-semibold">
                        15,000+
                      </span>{" "}
                      successful students.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Button
                        size="lg"
                        className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                        asChild
                      >
                        <Link href="/signup">
                          <span className="relative z-10 flex items-center text-base">
                            <Brain className="mr-2 h-5 w-5" />
                            Start Free Trial
                          </span>
                          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-500 transition-transform duration-500 group-hover:translate-x-0"></div>
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="hover-lift hover:bg-accent border-2 px-8 py-6 text-base shadow-lg transition-all duration-300 hover:shadow-xl"
                        asChild
                      >
                        <Link href="/demo">
                          <Target className="mr-2 h-5 w-5" />
                          View Demo
                        </Link>
                      </Button>
                    </div>

                    <div className="text-muted-foreground flex flex-wrap items-center gap-6 text-sm">
                      {[
                        "14-day free trial",
                        "No credit card required",
                        "Cancel anytime",
                      ].map((text) => (
                        <div key={text} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Dashboard Preview */}
                  <div className="animate-fade-in-right relative">
                    <div className="geometric-bg pointer-events-none absolute -inset-4 rounded-2xl opacity-40"></div>
                    <div className="border-border bg-card/50 relative overflow-hidden rounded-2xl border p-8 shadow-2xl backdrop-blur-xl">
                      <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl"></div>
                      <div className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr from-green-400/20 to-blue-400/20 blur-2xl"></div>

                      <div className="relative space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-foreground text-lg font-semibold">
                            Your AI Learning Dashboard
                          </h3>
                          <Badge className="relative bg-green-50 text-xs font-medium text-green-700 shadow-sm dark:bg-green-950 dark:text-green-300">
                            <div className="pulse-dot absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                            Live Data
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { subject: "Physics", score: 89, color: "blue" },
                            { subject: "Chemistry", score: 76, color: "green" },
                            { subject: "Maths", score: 92, color: "orange" },
                          ].map((item) => {
                            const colors =
                              colorStyles[
                                item.color as keyof typeof colorStyles
                              ] || colorStyles.blue;
                            return (
                              <div
                                key={item.subject}
                                className="hover-lift group border-border bg-card relative overflow-hidden rounded-xl border p-4 shadow-lg transition-all duration-300 hover:shadow-xl"
                              >
                                <div
                                  className={`pointer-events-none absolute top-0 right-0 h-12 w-12 rounded-full bg-gradient-to-br ${colors.gradient} blur-xl transition-opacity duration-300 group-hover:opacity-100`}
                                ></div>
                                <div
                                  className={`relative mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} shadow-sm`}
                                >
                                  <div
                                    className={`pulse-dot absolute inset-0 rounded-lg ${colors.dot} opacity-20`}
                                  ></div>
                                </div>
                                <div className="relative space-y-1">
                                  <div className="text-muted-foreground text-xs font-medium">
                                    {item.subject}
                                  </div>
                                  <div className="text-foreground text-2xl font-bold">
                                    {item.score}%
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="border-border bg-card relative overflow-hidden rounded-xl border p-6 shadow-lg">
                          <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                          <div className="relative space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-foreground font-semibold">
                                AI Recommendations
                              </h3>
                              <Badge className="relative bg-blue-50 text-xs font-medium text-blue-700 shadow-sm dark:bg-blue-950 dark:text-blue-300">
                                <div className="pulse-dot absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                Active
                              </Badge>
                            </div>
                            <div className="space-y-3">
                              {[
                                {
                                  text: "Focus on Organic Chemistry - High priority",
                                  color: "bg-blue-500",
                                  delay: "0s",
                                },
                                {
                                  text: "Practice more Calculus problems",
                                  color: "bg-green-500",
                                  delay: "0.5s",
                                },
                                {
                                  text: "Review Thermodynamics concepts",
                                  color: "bg-orange-500",
                                  delay: "1s",
                                },
                              ].map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center space-x-3"
                                >
                                  <div
                                    className={`pulse-dot h-2 w-2 rounded-full ${item.color}`}
                                    style={{ animationDelay: item.delay }}
                                  ></div>
                                  <span className="text-muted-foreground text-sm">
                                    {item.text}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Trusted Colleges Section */}
            <section className="bg-muted relative py-20">
              <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30"></div>
              <div className="relative container mx-auto px-6">
                <div className="mb-16 text-center">
                  <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                    Trusted by top students
                  </h2>
                  <p className="text-muted-foreground text-xl">
                    Join thousands who achieved their engineering dreams
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4 lg:grid-cols-7">
                  {["IIT", "NIT", "VJTI", "COEP", "PICT", "ICT", "SPIT"].map(
                    (college) => (
                      <div
                        key={college}
                        className="hover-lift group relative flex items-center justify-center"
                      >
                        <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg"></div>
                        <div className="text-muted-foreground group-hover:text-foreground relative text-2xl font-bold transition-all duration-300 group-hover:scale-110">
                          {college}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section id="success-stories" className="relative py-20">
              <div className="dot-pattern-dense pointer-events-none absolute inset-0 opacity-40"></div>
              <div className="relative container mx-auto px-6">
                <div className="mb-16 text-center">
                  <Badge className="relative mb-4 border-green-200 bg-green-50 px-4 py-1.5 font-medium text-green-700 shadow-sm dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                    <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-green-500"></div>
                    SUCCESS STORIES
                  </Badge>
                  <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                    What our students say
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    Real stories from students who transformed their MHT CET
                    preparation with our AI platform.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Rahul Sharma",
                      college: "IIT Bombay",
                      score: "98.5%",
                      quote:
                        "The AI recommendations helped me focus on my weak areas. I improved from 65% to 98.5% in just 3 months!",
                      avatar: "RS",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      name: "Priya Patel",
                      college: "VJTI Mumbai",
                      score: "96.2%",
                      quote:
                        "The personalized study plans and real-time analytics made all the difference. Highly recommended!",
                      avatar: "PP",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      name: "Arjun Kumar",
                      college: "COEP Pune",
                      score: "97.8%",
                      quote:
                        "The platform's adaptive testing helped me identify and overcome my mistakes. Best investment ever!",
                      avatar: "AK",
                      color: "from-green-500 to-teal-500",
                    },
                  ].map((testimonial) => (
                    <Card
                      key={testimonial.name}
                      className="hover-lift group border-border relative overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-2xl"
                    >
                      <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br from-green-500/10 to-blue-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150"></div>
                      <CardHeader className="relative">
                        <div className="mb-4 flex items-center space-x-4">
                          <div
                            className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} shadow-lg`}
                          >
                            <div className="pulse-dot absolute inset-0 rounded-full bg-white/20"></div>
                            <span className="relative z-10 text-lg font-bold text-white">
                              {testimonial.avatar}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-foreground font-semibold">
                              {testimonial.name}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {testimonial.college}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4 flex items-center space-x-2">
                          <Badge className="bg-green-50 font-semibold text-green-700 shadow-sm dark:bg-green-950 dark:text-green-300">
                            {testimonial.score}
                          </Badge>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="h-4 w-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>

                        <CardDescription className="text-muted-foreground italic">
                          "{testimonial.quote}"
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-muted relative py-20">
              <div className="dot-pattern-dense pointer-events-none absolute inset-0 opacity-40"></div>
              <div className="relative container mx-auto px-6">
                <div className="mb-16 text-center">
                  <Badge className="relative mb-4 border-blue-200 bg-blue-50 px-4 py-1.5 font-medium text-blue-700 shadow-sm dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
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
                        "Personalized study plans that adapt to your learning style and pace with machine learning algorithms.",
                      color: "blue",
                      features: [
                        "Adaptive difficulty",
                        "Smart recommendations",
                        "Progress prediction",
                      ],
                    },
                    {
                      icon: Target,
                      title: "Precision Testing",
                      description:
                        "Targeted questions based on your weak areas for maximum improvement and efficient preparation.",
                      color: "green",
                      features: [
                        "Weakness analysis",
                        "Custom test generation",
                        "Instant feedback",
                      ],
                    },
                    {
                      icon: BarChart3,
                      title: "Advanced Analytics",
                      description:
                        "Comprehensive performance tracking with detailed insights and predictive success metrics.",
                      color: "purple",
                      features: [
                        "Performance trends",
                        "Time analytics",
                        "Comparative ranking",
                      ],
                    },
                    {
                      icon: BookOpen,
                      title: "Rich Content Library",
                      description:
                        "50,000+ questions covering all MHT CET topics with detailed solutions and explanations.",
                      color: "orange",
                      features: [
                        "Video solutions",
                        "Concept explanations",
                        "Practice sets",
                      ],
                    },
                    {
                      icon: Trophy,
                      title: "Achievement System",
                      description:
                        "Gamified learning experience with badges, streaks, and milestone celebrations.",
                      color: "indigo",
                      features: [
                        "Daily streaks",
                        "Achievement badges",
                        "Progress milestones",
                      ],
                    },
                    {
                      icon: Users,
                      title: "Community Support",
                      description:
                        "Connect with top educators and successful alumni for mentorship and doubt clearing.",
                      color: "pink",
                      features: [
                        "Expert mentorship",
                        "Peer discussions",
                        "24/7 support",
                      ],
                    },
                  ].map((feature) => {
                    const colors =
                      colorStyles[feature.color as keyof typeof colorStyles] ||
                      colorStyles.blue;
                    return (
                      <Card
                        key={feature.title}
                        className="hover-lift group border-border relative overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-2xl"
                      >
                        <div
                          className={`pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br ${colors.gradient} blur-2xl transition-transform duration-500 group-hover:scale-150`}
                        ></div>
                        <CardHeader className="relative">
                          <div
                            className={`relative mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl ${colors.bg} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
                          >
                            <div
                              className={`pulse-dot absolute inset-0 ${colors.dot} opacity-20`}
                            ></div>
                            <feature.icon
                              className={`relative z-10 h-8 w-8 ${colors.text}`}
                            />
                          </div>
                          <CardTitle className="text-foreground text-xl">
                            {feature.title}
                          </CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {feature.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="relative">
                          <ul className="space-y-2">
                            {feature.features.map((item) => (
                              <li
                                key={item}
                                className="flex items-center space-x-3 text-sm"
                              >
                                <div
                                  className={`h-1.5 w-1.5 rounded-full ${colors.dot}`}
                                ></div>
                                <span className="text-muted-foreground">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="relative py-20">
              <div className="geometric-bg pointer-events-none absolute inset-0 opacity-20"></div>
              <div className="relative container mx-auto px-6">
                <div className="mb-16 text-center">
                  <Badge className="relative mb-4 border-purple-200 bg-purple-50 px-4 py-1.5 font-medium text-purple-700 shadow-sm dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-purple-500"></div>
                    PRICING
                  </Badge>
                  <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                    Choose your learning path
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    Flexible plans designed for every student's needs and
                    budget.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {[
                    {
                      name: "Starter",
                      price: "₹999",
                      period: "/month",
                      description:
                        "Perfect for getting started with MHT CET preparation",
                      features: [
                        "Access to 10,000+ questions",
                        "Basic AI recommendations",
                        "Progress tracking",
                        "Mobile app access",
                        "Email support",
                      ],
                      popular: false,
                    },
                    {
                      name: "Pro",
                      price: "₹1,999",
                      period: "/month",
                      description: "Most popular choice for serious aspirants",
                      features: [
                        "Access to 50,000+ questions",
                        "Advanced AI recommendations",
                        "Real-time analytics",
                        "Performance insights",
                        "Priority support",
                        "Mock tests & analysis",
                        "Study plan customization",
                      ],
                      popular: true,
                    },
                    {
                      name: "Premium",
                      price: "₹2,999",
                      period: "/month",
                      description:
                        "Complete preparation package with mentorship",
                      features: [
                        "Everything in Pro",
                        "1-on-1 mentorship sessions",
                        "Expert doubt clearing",
                        "College selection guidance",
                        "Interview preparation",
                        "24/7 support",
                        "Custom study materials",
                      ],
                      popular: false,
                    },
                  ].map((plan) => (
                    <Card
                      key={plan.name}
                      className={`hover-lift group relative overflow-hidden border shadow-lg transition-all duration-300 hover:shadow-2xl ${
                        plan.popular
                          ? "scale-105 border-purple-500/50 ring-2 ring-purple-500/20"
                          : "border-border"
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 transform">
                          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-white shadow-lg">
                            ⭐ Most Popular
                          </Badge>
                        </div>
                      )}

                      <div className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl transition-transform duration-500 group-hover:scale-150"></div>

                      <CardHeader className="relative pt-8 text-center">
                        <CardTitle className="text-foreground text-2xl">
                          {plan.name}
                        </CardTitle>
                        <div className="mt-4">
                          <span className="text-foreground text-5xl font-bold">
                            {plan.price}
                          </span>
                          <span className="text-muted-foreground">
                            {plan.period}
                          </span>
                        </div>
                        <CardDescription className="text-muted-foreground mt-3">
                          {plan.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="relative space-y-6">
                        <ul className="space-y-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start space-x-3"
                            >
                              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                              <span className="text-muted-foreground text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className={`group relative w-full overflow-hidden text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                            plan.popular
                              ? "bg-gradient-to-r from-purple-500 to-pink-600"
                              : "bg-gradient-to-r from-blue-500 to-purple-600"
                          }`}
                          size="lg"
                          asChild
                        >
                          <Link href="/signup">
                            <span className="relative z-10">Get Started</span>
                            <div
                              className={`absolute inset-0 -translate-x-full transition-transform duration-500 group-hover:translate-x-0 ${
                                plan.popular
                                  ? "bg-gradient-to-r from-pink-600 to-purple-500"
                                  : "bg-gradient-to-r from-purple-600 to-blue-500"
                              }`}
                            ></div>
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <p className="text-muted-foreground">
                    All plans include a 14-day free trial. No credit card
                    required.
                  </p>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="bg-muted relative py-20">
              <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30"></div>
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
                      className="hover-lift group relative transition-all duration-300"
                    >
                      <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-lg"></div>
                      <div className="relative">
                        <div className="text-foreground mb-2 text-5xl font-bold">
                          <span className="relative z-10">{stat.number}</span>
                          <div
                            className="pulse-dot absolute -top-2 -right-2 h-3 w-3 rounded-full bg-blue-500/30"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          ></div>
                        </div>
                        <div className="text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24">
              <div className="mesh-gradient pointer-events-none absolute inset-0 opacity-20"></div>
              <div className="relative container mx-auto px-6">
                <div className="relative mx-auto max-w-4xl text-center">
                  <div className="pointer-events-none absolute top-0 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"></div>

                  <h2 className="text-foreground relative mb-6 text-4xl font-bold lg:text-5xl">
                    Ready to start your MHT CET preparation?
                  </h2>
                  <p className="text-muted-foreground mb-10 text-xl">
                    Join thousands of students who achieved their engineering
                    dreams with our AI-powered platform.
                  </p>

                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-6 text-lg text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
                      asChild
                    >
                      <Link href="/signup">
                        <span className="relative z-10 flex items-center">
                          Start Free Trial
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-purple-600 to-blue-500 transition-transform duration-500 group-hover:translate-x-0"></div>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="hover-lift hover:bg-accent border-2 px-10 py-6 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                      asChild
                    >
                      <Link href="/demo">Schedule Demo</Link>
                    </Button>
                  </div>

                  <div className="text-muted-foreground mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
                    {[
                      "14-day free trial",
                      "No credit card required",
                      "Cancel anytime",
                    ].map((text) => (
                      <div key={text} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="bg-muted relative py-20">
              <div className="dot-pattern-dense pointer-events-none absolute inset-0 opacity-40"></div>
              <div className="relative container mx-auto px-6">
                <div className="mb-16 text-center">
                  <Badge className="relative mb-4 border-orange-200 bg-orange-50 px-4 py-1.5 font-medium text-orange-700 shadow-sm dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300">
                    <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-orange-500"></div>
                    FAQ
                  </Badge>
                  <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                    Everything you need to know about our AI-powered MHT CET
                    preparation platform.
                  </p>
                </div>

                <div className="mx-auto max-w-3xl">
                  <Accordion type="single" collapsible className="w-full">
                    {[
                      {
                        question: "How does the AI personalization work?",
                        answer:
                          "Our AI analyzes your performance patterns, learning style, and weak areas to create customized study plans. It adapts in real-time based on your progress and provides targeted recommendations.",
                      },
                      {
                        question: "Is there a free trial available?",
                        answer:
                          "Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can explore the platform and see how it works for your preparation.",
                      },
                      {
                        question:
                          "Can I access the platform on mobile devices?",
                        answer:
                          "Absolutely! Our platform is fully responsive and works seamlessly on all devices. We also have dedicated mobile apps for iOS and Android for the best experience.",
                      },
                      {
                        question:
                          "How many questions are in the question bank?",
                        answer:
                          "We have over 50,000+ practice questions covering Physics, Chemistry, and Mathematics for MHT CET. All questions include detailed solutions and explanations.",
                      },
                      {
                        question: "Do you provide mentorship support?",
                        answer:
                          "Yes, our Pro and Premium plans include access to expert mentors. You can get personalized guidance, doubt clearing, and college selection advice from successful alumni and educators.",
                      },
                      {
                        question:
                          "What makes this different from other MHT CET apps?",
                        answer:
                          "Our AI-driven approach provides truly personalized learning, real-time analytics, and adaptive testing. Unlike other apps, our platform learns from your performance and continuously optimizes your study plan.",
                      },
                    ].map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-border border-b"
                      >
                        <AccordionTrigger className="text-foreground hover:text-primary text-left font-semibold">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-border bg-card relative border-t py-12">
            <div className="dot-pattern pointer-events-none absolute inset-0 opacity-20"></div>
            <div className="relative container mx-auto px-6">
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <Link
                  href="/"
                  className="group flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                    <div className="pulse-dot absolute inset-0 rounded-xl bg-blue-400 opacity-30"></div>
                    <Brain className="relative z-10 h-5 w-5 text-white" />
                  </div>
                  <span className="text-foreground text-xl font-bold">
                    AI-CET Prep
                  </span>
                </Link>

                <div className="flex space-x-8">
                  {["Privacy", "Terms", "Contact"].map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="group text-muted-foreground hover:text-foreground relative transition-colors duration-300"
                    >
                      <span className="relative z-10">{link}</span>
                      <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-border text-muted-foreground mt-8 border-t pt-8 text-center">
                <p>© 2025 AI-CET Prep. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </ScrollArea>
    </HydrateClient>
  );
}

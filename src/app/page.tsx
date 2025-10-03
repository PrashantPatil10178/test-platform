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
  User,
} from "lucide-react";
import { api } from "@/trpc/server";
// Helper function to get initials from name
const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  if (names.length === 1) return names[0]?.charAt(0).toUpperCase() || "U";
  return (
    (names[0]?.charAt(0).toUpperCase() || "U") +
    (names[names.length - 1]?.charAt(0).toUpperCase() || "")
  );
};

// Helper function to generate a consistent color based on name
const getNameColor = (name: string) => {
  const colors = [
    "from-blue-500 to-purple-500",
    "from-green-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-purple-500 to-pink-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-blue-500",
  ];

  // Simple hash function to get consistent color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

export default async function Home() {
  const session = await auth();
  const data = await api.post.hello({ text: "from tRPC" });
  console.log("tRPC data:", data);
  console.log("User session:", session);
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
                  href="/Features"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Pricing
                </Link>
                <Link
                  href="#testimonials"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Success Stories
                </Link>
                <Link
                  href="#faq"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  FAQ
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                {session ? (
                  <div className="flex items-center space-x-4">
                    <div className="hidden items-center space-x-2 sm:flex">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt="User Avatar"
                          className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                        />
                      ) : (
                        <div
                          className={`h-8 w-8 rounded-full bg-gradient-to-br ${getNameColor(session.user?.name || "User")} flex items-center justify-center text-sm font-bold text-white shadow-sm`}
                        >
                          {getInitials(session.user?.name || "User")}
                        </div>
                      )}
                      <span className="text-foreground font-medium">
                        {session.user?.name?.split(" ")[0] || "User"}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <form action="/api/auth/signout" method="post">
                      <Button
                        variant="ghost"
                        size="sm"
                        type="submit"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        Log out
                      </Button>
                    </form>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="text-muted-foreground hover:text-foreground hidden sm:flex"
                      asChild
                    >
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button
                      className="clean-gradient smooth-transition text-white hover:opacity-90"
                      asChild
                    >
                      <Link href="/signup">Start Free Trial</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>
        <main className="relative z-10">
          <section className="relative py-20 lg:py-32">
            <div className="mesh-gradient absolute inset-0 opacity-30"></div>
            <div className="relative container mx-auto px-6">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="animate-fade-in-up">
                  <div className="mb-6">
                    <Badge className="relative border-blue-200 bg-blue-50 font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-blue-500"></div>
                      🚀 AI-POWERED PREPARATION PLATFORM
                    </Badge>
                  </div>
                  <h1 className="text-foreground mb-6 text-5xl leading-tight font-bold lg:text-6xl">
                    Master MHT CET with{" "}
                    <span className="text-gradient-blue">AI Intelligence</span>
                  </h1>
                  <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
                    Transform your engineering entrance preparation with
                    personalized learning paths, adaptive testing, and real-time
                    performance analytics. Join 15,000+ successful students.
                  </p>
                  <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                    <Button
                      size="lg"
                      className="clean-gradient smooth-transition relative overflow-hidden px-8 py-3 text-white hover:opacity-90"
                      asChild
                    >
                      <Link href="/signup">
                        <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 hover:translate-x-[100%]"></div>
                        <span className="relative flex items-center">
                          <Brain className="mr-2 h-5 w-5" />
                          Start Free Trial
                        </span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="hover-lift relative px-8 py-3"
                      asChild
                    >
                      <Link href="/demo">
                        <span className="flex items-center">
                          <Target className="mr-2 h-5 w-5" />
                          View Demo
                        </span>
                      </Link>
                    </Button>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      14-day free trial
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      No credit card required
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Cancel anytime
                    </div>
                  </div>
                </div>
                <div className="animate-fade-in-right relative">
                  <div className="geometric-bg absolute -inset-4 rounded-2xl opacity-40"></div>
                  <div className="bg-muted shadow-elegant-lg relative overflow-hidden rounded-lg p-8 backdrop-blur-sm">
                    <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr from-green-400/20 to-blue-400/20 blur-xl"></div>
                    <div className="relative">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="text-foreground font-semibold">
                          Your AI Learning Dashboard
                        </h3>
                        <Badge className="relative bg-green-50 text-xs text-green-700 dark:bg-green-950 dark:text-green-300">
                          <div className="pulse-dot absolute -top-1 -left-1 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                          Live Data
                        </Badge>
                      </div>
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
                            Active
                          </Badge>
                        </div>
                        <div className="relative space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="pulse-dot h-2 w-2 rounded-full bg-blue-500"></div>
                            <span className="text-muted-foreground text-sm">
                              Focus on Organic Chemistry - High priority
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div
                              className="pulse-dot h-2 w-2 rounded-full bg-green-500"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                            <span className="text-muted-foreground text-sm">
                              Practice more Calculus problems
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div
                              className="pulse-dot h-2 w-2 rounded-full bg-orange-500"
                              style={{ animationDelay: "1s" }}
                            ></div>
                            <span className="text-muted-foreground text-sm">
                              Review Thermodynamics concepts
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
          <section id="testimonials" className="relative py-20">
            <div className="dot-pattern-dense absolute inset-0 opacity-40"></div>
            <div className="relative container mx-auto px-6">
              <div className="mb-16 text-center">
                <Badge className="relative mb-4 border-green-200 bg-green-50 font-medium text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
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
                    color: "blue",
                  },
                  {
                    name: "Priya Patel",
                    college: "VJTI Mumbai",
                    score: "96.2%",
                    quote:
                      "The personalized study plans and real-time analytics made all the difference. Highly recommended!",
                    avatar: "PP",
                    color: "purple",
                  },
                  {
                    name: "Arjun Kumar",
                    college: "COEP Pune",
                    score: "97.8%",
                    quote:
                      "The platform's adaptive testing helped me identify and overcome my mistakes. Best investment ever!",
                    avatar: "AK",
                    color: "green",
                  },
                ].map((testimonial, index) => (
                  <Card
                    key={testimonial.name}
                    className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden border"
                  >
                    <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-green-500/5 to-blue-500/5 transition-transform duration-500 group-hover:scale-150"></div>
                    <CardHeader className="relative">
                      <div className="mb-4 flex items-center space-x-4">
                        <div
                          className={`h-12 w-12 bg-${testimonial.color}-100 dark:bg-${testimonial.color}-900 relative flex items-center justify-center rounded-full`}
                        >
                          <div
                            className={`absolute inset-0 bg-${testimonial.color}-500/10 pulse-dot`}
                          ></div>
                          <span
                            className={`text-${testimonial.color}-600 dark:text-${testimonial.color}-400 relative z-10 font-bold`}
                          >
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
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
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
                ].map((feature, index) => (
                  <Card
                    key={feature.title}
                    className="border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden border"
                  >
                    <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 transition-transform duration-500 group-hover:scale-150"></div>
                    <CardHeader className="relative">
                      <div
                        className={`h-14 w-14 bg-${feature.color}-100 dark:bg-${feature.color}-900 relative mb-4 flex items-center justify-center overflow-hidden rounded-xl`}
                      >
                        <div
                          className={`absolute inset-0 bg-${feature.color}-500/10 pulse-dot`}
                        ></div>
                        <feature.icon
                          className={`h-7 w-7 text-${feature.color}-600 dark:text-${feature.color}-400 relative z-10`}
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
                        {feature.features.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <div
                              className={`h-1.5 w-1.5 rounded-full bg-${feature.color}-500`}
                            ></div>
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          <section id="pricing" className="bg-muted relative py-20">
            <div className="geometric-bg absolute inset-0 opacity-20"></div>
            <div className="relative container mx-auto px-6">
              <div className="mb-16 text-center">
                <Badge className="relative mb-4 border-purple-200 bg-purple-50 font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300">
                  <div className="pulse-dot absolute -top-1 -left-1 h-2 w-2 rounded-full bg-purple-500"></div>
                  PRICING
                </Badge>
                <h2 className="text-foreground mb-4 text-3xl font-bold lg:text-4xl">
                  Choose your learning path
                </h2>
                <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                  Flexible plans designed for every student's needs and budget.
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
                    color: "blue",
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
                    color: "purple",
                  },
                  {
                    name: "Premium",
                    price: "₹2,999",
                    period: "/month",
                    description: "Complete preparation package with mentorship",
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
                    color: "green",
                  },
                ].map((plan, index) => (
                  <Card
                    key={plan.name}
                    className={`border-border shadow-elegant hover:shadow-elegant-lg smooth-transition hover-lift group relative overflow-hidden border ${
                      plan.popular ? "ring-2 ring-purple-500/20" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                        <Badge className="bg-purple-500 text-white">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div
                      className={`absolute -top-10 -right-10 h-20 w-20 rounded-full bg-gradient-to-br from-${plan.color}-500/5 to-${plan.color}-500/5 transition-transform duration-500 group-hover:scale-150`}
                    ></div>
                    <CardHeader className="relative text-center">
                      <CardTitle className="text-foreground text-2xl">
                        {plan.name}
                      </CardTitle>
                      <div className="mt-4">
                        <span className="text-foreground text-4xl font-bold">
                          {plan.price}
                        </span>
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
                      </div>
                      <CardDescription className="text-muted-foreground mt-2">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center space-x-3"
                          >
                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                            <span className="text-muted-foreground text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className={`mt-6 w-full ${
                          plan.popular
                            ? "purple-gradient text-white hover:opacity-90"
                            : "clean-gradient text-white hover:opacity-90"
                        }`}
                        size="lg"
                        asChild
                      >
                        <Link href="/signup">Get Started</Link>
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
          <section className="bg-muted relative py-20">
            <div className="grid-pattern absolute inset-0 opacity-30"></div>
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
                    asChild
                  >
                    <Link href="/signup">
                      <div className="absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 group-hover:translate-x-[100%]"></div>
                      <span className="relative flex items-center">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover-lift relative px-8 py-3"
                    asChild
                  >
                    <Link href="/demo">Schedule Demo</Link>
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
        <section id="faq" className="bg-muted relative py-20">
          <div className="dot-pattern-dense absolute inset-0 opacity-40"></div>
          <div className="relative container mx-auto px-6">
            <div className="mb-16 text-center">
              <Badge className="relative mb-4 border-orange-200 bg-orange-50 font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300">
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
                    question: "Can I access the platform on mobile devices?",
                    answer:
                      "Absolutely! Our platform is fully responsive and works seamlessly on all devices. We also have dedicated mobile apps for iOS and Android for the best experience.",
                  },
                  {
                    question: "How many questions are in the question bank?",
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
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
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


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
import { HydrateClient } from "@/trpc/server";
import {
  BookOpen,
  Brain,
  Target,
  Trophy,
  Users,
  BarChart3,
} from "lucide-react";

const features = [
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
  ];

export default async function FeaturesPage() {
    const session = await auth();

  return (
    <HydrateClient>
      <div className="bg-background relative min-h-screen overflow-hidden">
        <div className="dot-pattern absolute inset-0"></div>
        <div className="floating-shapes absolute inset-0"></div>
        <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
          <div className="container mx-auto px-6">
            <div className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="clean-gradient relative flex h-8 w-8 items-center justify-center rounded-lg">
                  <div className="pulse-dot absolute inset-0 rounded-lg bg-blue-500 opacity-30"></div>
                  <Brain className="relative z-10 h-5 w-5 text-white" />
                </div>
                <span className="text-foreground text-xl font-bold">
                  AI-CET Prep
                </span>
              </Link>
              <nav className="hidden items-center space-x-8 md:flex">
                <Link
                  href="/Features"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Features
                </Link>
                <Link
                  href="/#pricing"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Pricing
                </Link>
                <Link
                  href="/#testimonials"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  Success Stories
                </Link>
                <Link
                  href="/#faq"
                  className="text-muted-foreground hover:text-foreground smooth-transition font-medium"
                >
                  FAQ
                </Link>
              </nav>
              <div className="flex items-center space-x-4">
                {session ? (
                  <div className="flex items-center space-x-4">
                    <div className="hidden items-center space-x-2 sm:flex">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                        {session.user?.image && (
                          <img
                            src={session.user.image}
                            alt="User Avatar"
                            className="h-8 w-8 rounded-full"
                          />
                        )}
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
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
                {features.map((feature) => (
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
        </main>
      </div>
    </HydrateClient>
  );
}

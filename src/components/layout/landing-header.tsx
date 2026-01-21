import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BrainIcon as IconBrain } from "lucide-react";
import { ProfileAvatar } from "@/components/profile-avatar";
import { auth } from "@/server/auth";

export async function LandingHeader() {
  const session = await auth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/50 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20 dark:border-white/5 dark:bg-black/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <div className="bg-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
              <IconBrain className="text-primary h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              MHT CET Prep
            </span>
          </Link>

          <nav className="hidden items-center space-x-6 md:flex">
            {[
              { name: "Features", href: "/#features" },
              { name: "Success Stories", href: "/#testimonials" },
              { name: "Pricing", href: "/#pricing" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hidden sm:flex"
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <ProfileAvatar user={session.user} />
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/signin">Log in</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-105 hover:shadow-blue-500/40"
                  asChild
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

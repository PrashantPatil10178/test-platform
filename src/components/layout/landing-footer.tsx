import Link from "next/link";
import { Brain } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-muted/30 border-t py-12 text-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-lg font-bold">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20">
                <Brain className="text-primary h-4 w-4" />
              </div>
              MHT CET Prep
            </div>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Empowering students with data-driven preparation strategies for a
              brighter engineering future.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/#features" className="hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="hover:text-foreground">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/about-us" className="hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-foreground">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-foreground">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-muted-foreground mt-12 border-t pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} MHT CET Prep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

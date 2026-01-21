import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/sonner";
import { fontVariables } from "@/lib/font";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import "./theme.css";
import { Geist } from "next/font/google";
import Script from "next/script";

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const metadata: Metadata = {
  title: "MHT CET Prep - Master MHT CET with AI-Powered Learning",
  description:
    "Transform your MHT CET preparation with personalized learning paths, adaptive testing, and real-time performance analytics at mhtcet.app",
  keywords: [
    "MHT CET",
    "engineering entrance exam",
    "Maharashtra CET",
    "exam preparation",
    "online learning",
    "adaptive testing",
    "physics preparation",
    "chemistry preparation",
    "mathematics preparation",
    "mock tests",
    "AI learning",
  ],
  authors: [{ name: "MHT CET Prep Team" }],
  creator: "MHT CET Prep",
  publisher: "MHT CET Prep",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ca-pub-6873000234871999",
  },
  metadataBase: new URL("https://mhtcet.app"),
  alternates: {
    canonical: "https://mhtcet.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhtcet.app",
    siteName: "MHT CET Prep",
    title: "MHT CET Prep - Master MHT CET with AI-Powered Learning",
    description:
      "Transform your MHT CET preparation with personalized learning paths, adaptive testing, and real-time performance analytics",
  },
  twitter: {
    card: "summary_large_image",
    title: "MHT CET Prep - Master MHT CET with AI-Powered Learning",
    description:
      "Transform your MHT CET preparation with personalized learning paths, adaptive testing, and real-time performance analytics",
  },
  other: {
    "google-adsense-account": "ca-pub-6873000234871999",
  },
};

export const viewport: Viewport = {
  themeColor: META_THEME_COLORS.light,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        className={cn(
          "bg-background overflow-hidden overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
          fontVariables,
        )}
      >
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6873000234871999"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <Providers activeThemeValue={activeThemeValue as string}>
              <Toaster />
              {children}
            </Providers>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}

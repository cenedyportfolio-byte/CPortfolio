import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisitorProvider } from "@/components/providers/VisitorProvider";
import { SchemaOrg } from "@/components/seo/SchemaOrg";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cenedypalma.com"),
  title: {
    default: "Cenedy Udoy Palma | Backend Developer & AI Engineer",
    template: "%s | Cenedy Udoy Palma"
  },
  description: "Cenedy Udoy Palma is a Senior Backend Developer and AI Product Builder from Bangladesh specializing in Laravel, Node.js, React, and Python.",
  applicationName: "Cenedy Udoy Palma Portfolio",
  authors: [{ name: "Cenedy Udoy Palma", url: "https://www.cenedypalma.com" }],
  creator: "Cenedy Udoy Palma",
  publisher: "Cenedy Udoy Palma",
  generator: "Next.js",
  keywords: [
    "Cenedy", "Cenedy Palma", "Udoy", "Udoy Palma", "Cenedy Udoy Palma", "Canady Palma", "Canedy", "Cenady",
    "Palma Developer", "Palma Programmer", "Developer Cenedy", "Backend Developer Cenedy", "AI Engineer Cenedy",
    "Laravel Cenedy", "Node.js Cenedy", "React Cenedy", "TypeScript Cenedy", "Full Stack Cenedy", 
    "Bangladesh Backend Developer Cenedy", "Senior Backend Developer Bangladesh", "AI Product Builder Bangladesh", 
    "Portfolio Cenedy", "GitHub Cenedy", "Cenedy GitHub", "Software Architect", "AI Engineer", "Product Engineer",
    "Laravel Developer", "Node.js Developer", "Full Stack Developer", "Backend Architecture", "Microservices"
  ],
  alternates: {
    canonical: "https://cenedypalma.com",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cenedypalma.com",
    title: "Cenedy Udoy Palma | Backend Developer & AI Engineer",
    description: "Senior Backend Developer and AI Product Builder from Bangladesh specializing in Laravel, Node.js, React, and Python. Discover my portfolio and architecture expertise.",
    siteName: "Cenedy Udoy Palma Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cenedy Udoy Palma - Backend Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cenedy Udoy Palma | Backend Developer & AI Engineer",
    description: "Senior Backend Developer and AI Product Builder specializing in Laravel, Node.js, React, and Python.",
    images: ["/images/og-image.png"],
    creator: "@cenedypalma",
    site: "@cenedypalma",
  },
  verification: {
    google: "google-site-verification-placeholder",
    yandex: "yandex-verification-placeholder",
    yahoo: "yahoo-verification-placeholder",
    other: {
      me: ['cenedyportfolio@gmail.com', 'https://cenedypalma.com'],
    },
  },
  appleWebApp: {
    title: "Cenedy Palma",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  category: "technology",
};

import { ClientWidgets } from "@/components/ui/ClientWidgets";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
      suppressHydrationWarning
    >
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-H200WJENPD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-H200WJENPD');
          `}
        </Script>
        <SchemaOrg type="WebSite" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <VisitorProvider>
            <ClientWidgets />
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-primary focus:text-white focus:font-bold focus:top-0 focus:left-0"
            >
              Skip to content
            </a>
            {children}
            <SpeedInsights />
          </VisitorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

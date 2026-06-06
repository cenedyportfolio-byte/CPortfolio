import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { VisitorProvider } from "@/components/providers/VisitorProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cenedypalma.com"),
  title: {
    default: "Cenedy Udoy Palma | Software Engineer & Product Builder",
    template: "%s | Cenedy Udoy Palma"
  },
  description: "I research problems, plan solutions, design experiences, and build scalable full-stack applications. Discover the portfolio of Cenedy Udoy Palma.",
  keywords: [
    "Cenedy Udoy Palma",
    "Cenedy Palma",
    "Full Stack Developer",
    "Product Builder",
    "Product Lifecycle",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Web Developer Dhaka",
    "Portfolio"
  ],
  authors: [{ name: "Cenedy Udoy Palma", url: "https://cenedypalma.com" }],
  creator: "Cenedy Udoy Palma",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cenedypalma.com",
    title: "Cenedy Udoy Palma | Full Stack Developer & Product Builder",
    description: "I research problems, plan solutions, design experiences, and build scalable full-stack applications. Discover my work.",
    siteName: "Cenedy Udoy Palma Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cenedy Udoy Palma Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cenedy Udoy Palma | Full Stack Developer & Product Builder",
    description: "I research problems, plan solutions, design experiences, and build scalable full-stack applications.",
    images: ["/images/og-image.png"],
    creator: "@cenedypalma",
  },
};

import { InteractivePet } from "@/components/ui/InteractivePet";
import { PetPlayground } from "@/components/ui/PetPlayground";
import { SuggestionBox } from "@/components/ui/SuggestionBox";
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
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <VisitorProvider>
            <CustomCursor />
            <SuggestionBox />
            <InteractivePet />
            <PetPlayground />
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-primary focus:text-white focus:font-bold focus:top-0 focus:left-0"
            >
              Skip to content
            </a>
            {children}
          </VisitorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

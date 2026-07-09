import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProblemSolverSection } from "@/components/sections/ProblemSolverSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { InteractiveConsole } from "@/components/sections/InteractiveConsole";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://cenedypalma.com/#person",
      "name": "Cenedy Udoy Palma",
      "givenName": "Cenedy",
      "familyName": "Palma",
      "additionalName": "Udoy",
      "alternateName": ["Cenedy", "Cenedy Palma", "Canady Palma", "Canedy", "Cenady", "Udoy Palma"],
      "jobTitle": "Senior Backend Developer & AI Engineer",
      "url": "https://cenedypalma.com",
      "image": "https://cenedypalma.com/images/hero.png",
      "description": "Senior Backend Developer and AI Product Builder from Bangladesh specializing in Laravel, Node.js, React, and Python.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      },
      "knowsAbout": [
        "Backend Architecture",
        "AI Engineering",
        "Software Architecture",
        "Microservices",
        "Laravel",
        "Node.js",
        "React",
        "TypeScript",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Redis",
        "Python",
        "Computer Vision",
        "REST APIs",
        "Cloud Systems",
        "Automation"
      ],
      "sameAs": [
        "https://github.com/cenedypalma",
        "https://www.linkedin.com/in/cenedy-palma-9560a7253/",
        "https://x.com/cenedypalma"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://cenedypalma.com/#website",
      "url": "https://cenedypalma.com",
      "name": "Cenedy Udoy Palma Portfolio",
      "publisher": {
        "@id": "https://cenedypalma.com/#person"
      },
      "inLanguage": "en-US"
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": "https://cenedypalma.com/#profilepage",
      "url": "https://cenedypalma.com",
      "name": "Cenedy Udoy Palma | Backend Developer & AI Engineer",
      "isPartOf": {
        "@id": "https://cenedypalma.com/#website"
      },
      "about": {
        "@id": "https://cenedypalma.com/#person"
      },
      "mainEntity": {
        "@id": "https://cenedypalma.com/#person"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Navbar />
      
      <main id="main-content">
        <HeroSection />
        <InteractiveConsole />
        <AboutSection />
        <ProblemSolverSection />

        <FeaturedProjectsSection />
        <TechStackSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

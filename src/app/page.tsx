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
import { RabbitAnimation } from "@/components/ui/RabbitAnimation";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Cenedy Udoy Palma",
      "alternateName": "Cenedy Palma",
      "jobTitle": "Software Engineer & Product Builder",
      "url": "https://cenedypalma.com",
      "image": "https://cenedypalma.com/images/hero.png",
      "description": "I research problems, plan solutions, design experiences, and build scalable full-stack applications. I own the complete product lifecycle: Research, Planning, UI/UX, Frontend, Backend, Deployment, and Product Growth.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      },
      "knowsAbout": [
        "Full Stack Development",
        "Product Lifecycle",
        "React",
        "Next.js",
        "TypeScript",
        "Laravel",
        "PHP",
        "Node.js",
        "REST APIs",
        "Docker",
        "System Architecture"
      ],
      "sameAs": [
        "https://github.com/cenedypalma",
        "https://www.linkedin.com/in/cenedy-palma-9560a7253/",
        "https://x.com/cenedypalma"
      ]
    }
  };

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
        <RabbitAnimation />
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

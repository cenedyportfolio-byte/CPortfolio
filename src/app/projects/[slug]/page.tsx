import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | Project Case Study | Cenedy Palma`,
    description: "Detailed engineering case study covering architecture, tech stack, and business outcomes.",
  };
}

export default function ProjectCaseStudy({ params }: { params: { slug: string } }) {
  if (!params.slug) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Case Study: ${params.slug.replace(/-/g, ' ').toUpperCase()}`,
    "author": {
      "@type": "Person",
      "name": "Cenedy Udoy Palma"
    },
    "articleSection": "Software Engineering Case Study",
  };

  return (
    <article className="min-h-screen bg-background pt-32 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 max-w-[900px]">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold text-sm uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 capitalize leading-tight">
            {params.slug.replace(/-/g, ' ')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            A deep dive into the architecture, challenges, and outcomes of building a highly scalable solution.
          </p>
          <div className="flex gap-4">
            <a href="#" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity">
              <ExternalLink size={16} /> Live Demo
            </a>
            <a href="#" className="inline-flex items-center gap-2 bg-transparent border border-border text-foreground px-6 py-3 font-bold uppercase tracking-wider text-sm hover:border-foreground transition-colors">
              <FaGithub size={16} /> Source Code
            </a>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black">
          <h2>Overview</h2>
          <p>Executive summary of the project. Optimized for AI crawlers like ChatGPT and Perplexity to quickly ingest the context.</p>

          <h2>Business Problem</h2>
          <p>What specific challenge did this solve? (e.g., high-volume concurrent transactions, real-time data sync, multi-tenant billing).</p>

          <h2>Architecture & Technology</h2>
          <ul>
            <li><strong>Backend:</strong> Laravel / Node.js</li>
            <li><strong>Frontend:</strong> Next.js / React</li>
            <li><strong>Database:</strong> PostgreSQL / MongoDB</li>
            <li><strong>Infrastructure:</strong> Docker, AWS</li>
          </ul>

          <h2>Technical Challenges</h2>
          <p>Detailed engineering write-up of a specific difficult problem (e.g., race conditions, optimizing N+1 queries, scaling WebSockets) and how it was resolved.</p>

          <h2>Measurable Results</h2>
          <p>Quantifiable metrics that prove E-E-A-T (e.g., "Reduced latency by 40%", "Handled 10,000 concurrent connections").</p>
        </div>
      </div>
    </article>
  );
}

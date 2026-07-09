import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// In a real application, you would fetch this from a CMS or local MDX files.
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug.replace(/-/g, ' ')} | Cenedy Palma Blog`,
    description: "In-depth engineering article by Cenedy Udoy Palma.",
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  // Demo check, fallback to 404
  if (!params.slug) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": params.slug.replace(/-/g, ' ').toUpperCase(),
    "author": {
      "@type": "Person",
      "name": "Cenedy Udoy Palma",
      "url": "https://cenedypalma.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cenedy Udoy Palma Portfolio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cenedypalma.com/images/hero.png"
      }
    }
  };

  return (
    <article className="min-h-screen bg-background pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 max-w-[800px]">
        <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-bold text-sm uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <header className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-6 capitalize leading-tight">
            {params.slug.replace(/-/g, ' ')}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground font-medium">
            <time dateTime="2026-07-09">July 9, 2026</time>
            <span>•</span>
            <span>10 min read</span>
            <span>•</span>
            <span className="text-primary">Backend Engineering</span>
          </div>
        </header>
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-a:text-primary">
          <p className="lead text-xl text-muted-foreground mb-8">
            This is a dynamically generated blog post template. In production, this area will be populated by MDX or a Headless CMS containing 2000+ words of highly technical, SEO-optimized content without fluff.
          </p>
          <h2>Core Concepts</h2>
          <p>
            Detailed exploration of the topic, incorporating code snippets, architecture diagrams, and performance metrics.
          </p>
        </div>
      </div>
    </article>
  );
}

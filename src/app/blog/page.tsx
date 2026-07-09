import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Engineering Insights",
  description: "Deep technical dives into Backend Architecture, AI Engineering, Next.js, and scaling software systems.",
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-[1000px]">
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Engineering Blog</h1>
          <p className="text-xl text-muted-foreground">Technical deep-dives into Laravel, Node.js, AI, and scalable architectures.</p>
        </header>

        <div className="grid gap-8">
          {/* Placeholder for blog posts. To be populated via CMS or MDX */}
          <article className="p-8 border border-border rounded-xl bg-card hover:border-primary transition-colors">
            <div className="flex gap-4 items-center mb-4 text-sm font-bold text-primary">
              <span>Backend Architecture</span>
              <span>•</span>
              <time dateTime="2026-07-09">July 9, 2026</time>
            </div>
            <h2 className="text-2xl font-bold mb-4">
              <Link href="/blog/scaling-websockets-in-production" className="hover:underline">
                Scaling WebSockets in Production: A Case Study
              </Link>
            </h2>
            <p className="text-muted-foreground mb-6">
              Learn how to engineer robust real-time communication systems using Node.js and Redis pub/sub.
            </p>
            <Link href="/blog/scaling-websockets-in-production" className="font-bold text-foreground flex items-center gap-2 group">
              Read Article <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </article>
        </div>
      </div>
    </div>
  );
}

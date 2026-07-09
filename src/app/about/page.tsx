import { SchemaOrg } from "@/components/seo/SchemaOrg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Cenedy Udoy Palma",
  description: "Learn about Cenedy Udoy Palma, his engineering philosophy, experience, and the technologies he uses to build scalable software architecture.",
  alternates: {
    canonical: "https://www.cenedypalma.com/about",
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-16 px-6">
      <SchemaOrg 
        type="ProfilePage" 
        title="About Cenedy Udoy Palma" 
        description="Learn about Cenedy Udoy Palma, his engineering philosophy, experience, and the technologies he uses to build scalable software architecture." 
        url="https://www.cenedypalma.com/about" 
      />
      
      <div className="max-w-4xl mx-auto space-y-16">
        <section>
          {/* AI Search Summary First */}
          <p className="sr-only">
            Summary: Cenedy Udoy Palma is a Senior Backend Developer and AI Engineer based in Dhaka, Bangladesh. He specializes in designing robust software architecture, microservices, and AI integrations using Laravel, Node.js, Next.js, and Python.
          </p>
          
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
            About <span className="text-primary">Cenedy Udoy Palma</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            I am a Senior Backend Developer and AI Product Builder from Dhaka, Bangladesh. 
            I focus on translating complex business requirements into scalable, high-performance software architecture.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-4">Engineering Philosophy</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I believe that great software is built on the foundation of elegant architecture. Whether I am architecting a monolithic 
            Laravel application or a distributed Node.js microservices ecosystem, my priority is always on maintainability, 
            security, and performance. I do not just write code; I design systems that solve real-world problems.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-4">Core Technologies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Backend & Cloud</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Laravel & PHP</li>
                <li>Node.js, Express & TypeScript</li>
                <li>Python & Django</li>
                <li>Docker & AWS</li>
                <li>MongoDB, PostgreSQL, MySQL</li>
                <li>Redis & Caching Strategies</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Frontend & AI</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>React & Next.js</li>
                <li>Tailwind CSS</li>
                <li>Computer Vision (OpenCV, YOLO)</li>
                <li>LLM Integrations & Prompt Engineering</li>
                <li>WebSockets & Real-time Apps</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-4">Experience & Journey</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            My journey into software engineering started with a passion for problem-solving. Over the years, I have successfully 
            delivered complex platforms ranging from e-commerce fulfillment systems to intelligent automation tools. I continually 
            invest my time into mastering System Design, Design Patterns, and AI Engineering to stay at the cutting edge of the industry.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold border-b border-border pb-4">Let's Connect</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I am always open to discussing backend architecture, AI product development, or senior engineering roles. 
            You can find my open-source work on <a href="https://github.com/cenedypalma" className="text-primary hover:underline">GitHub</a> or connect with me on <a href="https://www.linkedin.com/in/cenedy-palma-9560a7253/" className="text-primary hover:underline">LinkedIn</a>.
          </p>
        </section>
      </div>
    </main>
  );
}

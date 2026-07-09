import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "anthropic-ai", "ClaudeBot", "PerplexityBot", "Omgilibot"],
        allow: "/",
      },
    ],
    sitemap: "https://cenedypalma.com/sitemap.xml",
  };
}

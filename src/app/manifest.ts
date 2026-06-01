import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cenedy Udoy Palma — Portfolio",
    short_name: "Cenedy Palma",
    description:
      "I research problems, plan solutions, design experiences, and build scalable full-stack applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAFA",
    theme_color: "#6366F1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

import React from 'react';

type SchemaType = 'WebSite' | 'ProfilePage' | 'Article' | 'TechArticle';

interface SchemaProps {
  type?: SchemaType;
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  articleBody?: string;
}

export function SchemaOrg({
  type = 'WebSite',
  title,
  description,
  url = 'https://www.cenedypalma.com',
  image = 'https://www.cenedypalma.com/images/hero.png',
  datePublished,
  dateModified,
  articleBody,
}: SchemaProps) {
  
  const siteUrl = 'https://www.cenedypalma.com';

  // Base Person Entity (Canonical Identity)
  const personSchema = {
    "@type": "Person",
    "name": "Cenedy Udoy Palma",
    "alternateName": ["Cenedy Palma", "Udoy Palma", "Cenedy"],
    "givenName": "Cenedy",
    "familyName": "Palma",
    "jobTitle": "Senior Backend Developer & AI Engineer",
    "url": siteUrl,
    "image": `${siteUrl}/images/hero.png`,
    "description": "Cenedy Udoy Palma is a Senior Backend Developer and AI Product Builder specializing in Laravel, Node.js, Next.js, and Python.",
    "nationality": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "sameAs": [
      "https://github.com/cenedypalma",
      "https://www.linkedin.com/in/cenedy-palma-9560a7253/",
      "https://twitter.com/cenedypalma",
      "https://medium.com/@cenedypalma",
      "https://dev.to/cenedypalma"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Backend Architecture",
      "Artificial Intelligence",
      "Laravel",
      "Node.js",
      "TypeScript",
      "Python",
      "React",
      "Next.js",
      "Microservices",
      "System Design"
    ]
  };

  // Base Organization Schema (for brand identity)
  const organizationSchema = {
    "@type": "Organization",
    "name": "Cenedy Palma",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "founder": {
      "@id": `${siteUrl}/#person`
    }
  };

  const schemas: any[] = [
    { ...personSchema, "@id": `${siteUrl}/#person` },
    { ...organizationSchema, "@id": `${siteUrl}/#organization` }
  ];

  if (type === 'WebSite') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Cenedy Udoy Palma - Portfolio",
      "description": "Portfolio of Cenedy Udoy Palma, Senior Backend Developer & AI Engineer.",
      "publisher": {
        "@id": `${siteUrl}/#organization`
      },
      "author": {
        "@id": `${siteUrl}/#person`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    });
  }

  if (type === 'ProfilePage') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${url}/#webpage`,
      "url": url,
      "name": title || "About Cenedy Udoy Palma",
      "description": description || personSchema.description,
      "mainEntity": {
        "@id": `${siteUrl}/#person`
      }
    });
  }

  if (type === 'Article' || type === 'TechArticle') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": type,
      "@id": `${url}/#article`,
      "url": url,
      "headline": title,
      "description": description,
      "image": image,
      "datePublished": datePublished,
      "dateModified": dateModified || datePublished,
      "author": {
        "@id": `${siteUrl}/#person`
      },
      "publisher": {
        "@id": `${siteUrl}/#organization`
      },
      "articleBody": articleBody
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

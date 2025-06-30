import React, { useEffect } from "react";

const metadata = {
  viewport: "width=device-width, initial-scale=1.0",
  httpEquiv: "IE=edge",
  description:
    "Darknet-Portal is a cyberpunk-inspired hacker terminal site offering an immersive experience with tools like Crypto Miner, Password Cracker, Neural Network simulations, Surveillance systems, Compilers, Terminal commands, Camera access, and Satellite controls.",
  author: "UjjwalS aka DecryptX",
  keywords:
    "Darknet-Portal, cyberpunk, hacker terminal, crypto miner, password cracker, neural networks, surveillance, compilers, terminal commands, camera access, satellite control, digital exploration, security breaches, tech enthusiasts",
  ogTitle: "Darknet-Portal: Cyberpunk Hacker Terminal",
  ogDescription:
    "Dive into the world of digital exploration and security breaches with Darknet-Portal — a cyberpunk-inspired platform packed with powerful hacking and surveillance tools.",
  ogImage: "/hack1.png",
  ogUrl: "http://localhost:8080/",
  ogType: "website",
  ogLocale: "en_US",
  ogSiteName: "Darknet-Portal",
  twitterCard: "summary_large_image",
  twitterTitle: "Darknet-Portal: Cyberpunk Hacker Terminal",
  twitterDescription:
    "Explore futuristic hacking tools and digital breaches with Darknet-Portal, your cyberpunk playground for tech exploration and security thrills.",
  twitterImage: "/hack1.png",
  twitterSite: "@DarknetPortal",
  twitterCreator: "@UjjwalSaini0007",
  canonical: "http://localhost:8080/",
  robots: "index, follow",
  themeColor: "#0f0f0f, #1a1a1a",
  rating: "General",
  distribution: "Global",
  copyright: "Darknet-Portal ©2025",
  applicationName: "Darknet-Portal",
  appleMobileWebAppTitle: "Darknet-Portal",
  appleMobileWebAppCapable: "yes",
};

const LayoutMetaData: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    document.title = metadata.ogTitle;

    const upsertMeta = (
      attrName: string,
      attrValue: string,
      content: string
    ) => {
      let element = document.querySelector(
        `meta[${attrName}="${attrValue}"]`
      ) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Basic Meta tags
    upsertMeta("name", "viewport", metadata.viewport);
    upsertMeta("http-equiv", "X-UA-Compatible", metadata.httpEquiv);
    upsertMeta("name", "description", metadata.description);
    upsertMeta("name", "author", metadata.author);
    upsertMeta("name", "keywords", metadata.keywords);
    upsertMeta("name", "robots", metadata.robots);
    upsertMeta("name", "theme-color", metadata.themeColor);
    upsertMeta("name", "rating", metadata.rating);
    upsertMeta("name", "distribution", metadata.distribution);
    upsertMeta("name", "copyright", metadata.copyright);
    upsertMeta("name", "application-name", metadata.applicationName);
    upsertMeta(
      "name",
      "apple-mobile-web-app-title",
      metadata.appleMobileWebAppTitle
    );
    upsertMeta(
      "name",
      "apple-mobile-web-app-capable",
      metadata.appleMobileWebAppCapable
    );

    // Open Graph
    upsertMeta("property", "og:title", metadata.ogTitle);
    upsertMeta("property", "og:description", metadata.ogDescription);
    upsertMeta("property", "og:image", metadata.ogImage);
    upsertMeta("property", "og:url", metadata.ogUrl);
    upsertMeta("property", "og:type", metadata.ogType);
    upsertMeta("property", "og:locale", metadata.ogLocale);
    upsertMeta("property", "og:site_name", metadata.ogSiteName);

    // Twitter Cards
    upsertMeta("name", "twitter:card", metadata.twitterCard);
    upsertMeta("name", "twitter:title", metadata.twitterTitle);
    upsertMeta("name", "twitter:description", metadata.twitterDescription);
    upsertMeta("name", "twitter:image", metadata.twitterImage);
    upsertMeta("name", "twitter:site", metadata.twitterSite);
    upsertMeta("name", "twitter:creator", metadata.twitterCreator);

    // Canonical link
    let link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", metadata.canonical);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f0f] bg-cover to-muted/80 p-2 py-10 flex flex-col justify-between">
      {children}
    </div>
  );
};

export default LayoutMetaData;

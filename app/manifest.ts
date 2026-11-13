import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luma — Practical online courses",
    short_name: "Luma",
    description:
      "Practical courses taught by people who do the work every day. Learn design, technology, business and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#f9f8f3",
    theme_color: "#f9f8f3",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

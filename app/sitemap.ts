import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: "https://freya-head-spa-sibiu.vercel.app", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }]; }

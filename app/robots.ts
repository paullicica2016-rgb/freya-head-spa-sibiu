import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://freya-head-spa-sibiu.vercel.app/sitemap.xml" }; }

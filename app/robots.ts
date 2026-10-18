import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://freya-head-spa-sibiu.paullicica2016.chatgpt.site/sitemap.xml" }; }

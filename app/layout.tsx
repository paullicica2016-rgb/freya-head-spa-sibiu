import type { Metadata } from "next";
import "./globals.css";
import "./premium.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://freya-head-spa-sibiu.paullicica2016.chatgpt.site"),
  title: "Freya Head Spa Sibiu | Relaxare & Îngrijirea Scalpului",
  description: "Descoperă Freya Head Spa Sibiu – ritualuri de relaxare, Head Spa, masaje și tratamente pentru îngrijirea scalpului într-o atmosferă creată pentru momentele tale de liniște.",
  alternates: { canonical: "/" }, icons: { icon: "/favicon.svg" },
  openGraph: { title: "Freya Head Spa Sibiu", description: "Pauza de care aveai nevoie.", type: "website", locale: "ro_RO", images: [{ url: "/images/freya-ritual.jpeg", width: 1536, height: 2048, alt: "Freya Head Spa Sibiu" }] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "BeautySalon", name: "Freya Head Spa Sibiu", telephone: "+40742969279", address: { "@type": "PostalAddress", streetAddress: "Strada Daniel Renard nr. 1", addressLocality: "Sibiu-Cisnădie", addressCountry: "RO" }, sameAs: ["https://www.instagram.com/freya_headspasibiu/"] };
  return <html lang="ro"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />{children}</body></html>;
}

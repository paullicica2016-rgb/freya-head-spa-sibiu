"use client";

import { useEffect, useState } from "react";
import ScrollHero from "./scroll-hero";
import Gallery3D from "./gallery-3d";
import DepthEffects from "./depth-effects";

const phone = "0742969279";
const whatsapp = `https://wa.me/40${phone.slice(1)}?text=${encodeURIComponent("Bună! Am văzut website-ul Freya Head Spa și aș dori să fac o programare. 🌿")}`;
const mainServices = [
  { title: "Head Spa", time: "40 minute", price: "150 lei", text: "Masaj capilar, gât și umeri, infuzie, spălat, hidratare și uscat.", image: "/images/head-spa-waterfall-detail.jpeg" },
  { title: "Head Spa Glow", time: "60 minute", price: "200 lei", badge: "Experiență completă", text: "Masaj facial, capilar, gât și umeri, infuzie, spălat, hidratare și uscat.", image: "/images/freya-ritual.jpeg" },
  { title: "Face Spa", time: "30 minute", price: "100 lei", text: "Masaj facial, gât, decolteu, umeri și scalp. Nu include spălarea părului.", image: "/images/head-spa-waterfall-wide.jpeg" },
];
const treatments = [
  { name: "Scalp Detox", for: "scalp gras / încărcat", body: "Detoxifiere profundă a scalpului și masaj." },
  { name: "Scalp Boost", for: "îngrijirea scalpului și a părului predispus la cădere", body: "Tratament pentru scalp, masaj și terapie cu lumină LED." },
  { name: "Scalp Hydra", for: "scalp deshidratat", body: "Hidratare, masaj și terapie cu abur." },
];
const steps = ["Te așezi și uiți de grabă.", "Descoperim ce are nevoie scalpul și părul tău.", "Începe ritualul de curățare și îngrijire.", "Masaj, abur și momente de relaxare.", "Părul este hidratat, spălat și uscat.", "Pleci mai relaxată decât ai venit."];
const faqs = [
  ["Ce este Head Spa?", "Un ritual care combină îngrijirea scalpului și părului cu tehnici de masaj, hidratare și relaxare."],
  ["Cât durează o ședință?", "În funcție de ritual: 30, 40 sau 60 de minute. Durata fiecărei experiențe este indicată în lista de servicii."],
  ["Trebuie să vin cu părul spălat?", "Nu este nevoie. Serviciile Head Spa includ spălarea părului."],
  ["Face Spa include spălarea părului?", "Nu. Face Spa este un ritual pentru față, gât, decolteu, umeri și scalp și nu include spălarea părului."],
  ["Ce tratament aleg pentru scalp?", "Ne poți scrie înainte de programare, iar împreună alegem ritualul potrivit nevoilor tale."],
  ["Pot cumpăra un voucher cadou?", "Scrie-ne pentru a afla disponibilitatea voucherelor cadou."],
];

function LeafMark() { return <span className="leaf-mark" aria-hidden="true">✦</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 22); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const close = () => setMenuOpen(false);
  return <main>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#acasa" onClick={close}><LeafMark /><span>FREYA</span><small>HEAD SPA SIBIU</small></a>
      <nav className={menuOpen ? "nav-open" : ""} aria-label="Navigație principală">
        <a href="#experienta" onClick={close}>Experiența Freya</a><a href="#servicii" onClick={close}>Servicii</a><a href="#galerie" onClick={close}>Galerie</a><a href="#despre" onClick={close}>Despre</a><a href="#contact" onClick={close}>Contact</a><a className="mobile-nav-cta" href={whatsapp} onClick={close}>Programează-te</a>
      </nav>
      <a className="header-cta" href={whatsapp}>Programează-te <span>↗</span></a>
      <button className="menu-button" aria-label={menuOpen ? "Închide meniul" : "Deschide meniul"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><i /><i /></button>
    </header>

    <ScrollHero whatsapp={whatsapp} />
    <DepthEffects />

    <section className="intro section" id="intro"><div className="intro-image image-wrap reveal"><img src="/images/head-spa-waterfall-wide.jpeg" alt="Ritual Head Spa cu infuzie la Freya" /></div><div className="intro-copy reveal"><p className="eyebrow">FREYA HEAD SPA</p><h2>Mai mult decât un tratament.<br /><em>Un moment pentru tine.</em></h2><p>La Freya Head Spa, îngrijirea scalpului se întâlnește cu relaxarea profundă. Fiecare ritual este creat pentru a te ajuta să încetinești, să te relaxezi și să oferi părului și scalpului atenția pe care o merită.</p><a className="text-link" href="#servicii">Vezi ritualurile <span>↗</span></a></div></section>

    <section className="what section section-tint"><div className="section-heading centered reveal"><p className="eyebrow">UN RITUAL CU SENS</p><h2>Ce este <em>Head Spa?</em></h2><p>Un ritual care combină îngrijirea scalpului și părului cu tehnici de masaj, hidratare și relaxare.</p></div><div className="benefits reveal"><div><b>01</b><h3>Relaxare<br />profundă</h3></div><div><b>02</b><h3>Curățarea<br />scalpului</h3></div><div><b>03</b><h3>Hidratarea părului<br />și scalpului</h3></div><div><b>04</b><h3>Relaxarea capului,<br />gâtului și umerilor</h3></div></div></section>

    <section className="services section" id="servicii"><div className="section-heading reveal"><p className="eyebrow">RITUALURI</p><h2>Alege timpul<br /><em>care îți aparține.</em></h2></div><div className="service-grid">{mainServices.map((service, index) => <article className={`service-card reveal service-${index + 1}`} key={service.title}><div className="service-image"><img src={service.image} alt={service.title} loading="lazy" />{service.badge && <span className="service-badge">{service.badge}</span>}</div><div className="service-info"><div className="service-top"><div><p className="service-time">{service.time}</p><h3>{service.title}</h3></div><strong>{service.price}</strong></div><p>{service.text}</p><a className="text-link" href={whatsapp}>Alege acest ritual <span>↗</span></a></div></article>)}</div></section>

    <section className="treatments section section-forest"><div className="treatments-head reveal"><p className="eyebrow light">ÎNGRIJIRE PENTRU SCALP</p><h2>De ce are nevoie<br /><em>scalpul tău?</em></h2><p>O alegere atentă, potrivită momentului în care ești.</p></div><div className="treatment-list reveal">{treatments.map((t, index) => <article key={t.name}><span>0{index + 1}</span><div><h3>{t.name}</h3><p>Pentru: <em>{t.for}</em></p></div><p>{t.body}</p><strong>100 lei</strong></article>)}</div></section>

    <section className="offer section"><div className="offer-image"><video src="/videos/freya-massage.mp4" poster="/images/freya-ritual.jpeg" autoPlay muted loop playsInline aria-label="Masaj capilar la Freya" /></div><div className="offer-copy reveal"><p className="eyebrow">PACHET PROMO</p><p className="small-title">TIMP PENTRU TINE</p><h2>Ritualul<br /><em>complet</em></h2><p className="offer-detail">Tratament scalp <b>+</b> ședință Head Spa</p><div className="price-line"><strong>200 lei</strong><a className="button button-green" href={whatsapp}>Vreau această experiență <span>↗</span></a></div></div></section>

    <section className="experience section" id="experienta"><div className="experience-title reveal"><p className="eyebrow">DINCOLO DE GRABĂ</p><h2>Cum arată o<br /><em>experiență Freya</em></h2></div><div className="steps">{steps.map((step, index) => <article className="reveal" key={step}><span>0{index + 1}</span><p>{step}</p></article>)}</div></section>

    <Gallery3D />

    <section className="about section" id="despre"><div className="about-visual reveal"><img src="/images/freya-ritual.jpeg" alt="Atmosfera spa Freya" loading="lazy" /><span>F</span></div><div className="about-copy reveal"><p className="eyebrow">DESPRE FREYA</p><h2>Un spațiu creat pentru momentele în care ai nevoie să <em>încetinești.</em></h2><p>Freya Head Spa a fost creat ca un spațiu dedicat relaxării și îngrijirii, unde fiecare experiență este gândită în jurul persoanei și nevoilor sale.</p><div className="about-words"><span>RELAXARE</span><i>•</i><span>ÎNGRIJIRE</span><i>•</i><span>RECONECTARE</span></div></div></section>

    <section className="faq section"><div className="section-heading reveal"><p className="eyebrow">ÎNTREBĂRI FRECVENTE</p><h2>Înainte de<br /><em>momentul tău</em></h2></div><div className="faq-list reveal">{faqs.map(([question, answer], index) => <article className={activeFaq === index ? "faq-active" : ""} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}><span>{question}</span><b>{activeFaq === index ? "−" : "+"}</b></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></section>

    <section className="contact" id="contact"><div className="contact-inner"><p className="eyebrow light">FREYA HEAD SPA SIBIU</p><h2>Pauza ta<br /><em>începe aici.</em></h2><p className="contact-lead">Scrie-ne sau sună-ne pentru programare.</p><div className="contact-actions"><a className="button button-gold" href={whatsapp}>Programează-te pe WhatsApp <span>↗</span></a><a className="text-link light-link" href={`tel:${phone}`}>Sună pentru programare <span>↗</span></a></div><div className="contact-details"><a href="tel:0742969279">0742 969 279</a><span>Strada Daniel Renard nr. 1<br />Cartierul Arhitecților · Sibiu-Cisnădie</span><a href="https://www.instagram.com/freya_headspasibiu/" target="_blank" rel="noreferrer">@freya_headspasibiu ↗</a></div></div></section>

    <footer><a className="brand footer-brand" href="#acasa"><LeafMark /><span>FREYA</span><small>HEAD SPA SIBIU</small></a><p>Relaxare • Îngrijire • Reconectare</p><span>© {new Date().getFullYear()} Freya Head Spa Sibiu</span></footer><div className="mobile-cta"><a href={`tel:${phone}`}>Sună</a><a href={whatsapp}>Programează-te <span>↗</span></a></div>
  </main>;
}

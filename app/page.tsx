"use client";

import { useEffect, useRef, useState } from "react";
import ScrollHero from "./scroll-hero";
import Gallery3D from "./gallery-3d";
import DepthEffects from "./depth-effects";

const phone = "0742969279";
const whatsapp = `https://wa.me/40${phone.slice(1)}?text=${encodeURIComponent("Bună! Am văzut website-ul Freya Head Spa și aș dori să fac o programare. 🌿")}`;
const bookingWhatsapp = (ritual: string, duration?: string, price?: string) => {
  const details = [ritual, duration, price].filter(Boolean).join(" · ");
  return `https://wa.me/40${phone.slice(1)}?text=${encodeURIComponent(`Bună! Aș dori o programare pentru ${details}. 🌿`)}`;
};
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
const googleReviewsUrl = "https://www.google.ro/maps/place/Freya+Head+Spa/@45.7548729,24.141999,17z/data=!4m8!3m7!1s0x474c5d626a253c3f:0xc0310fa54124cc07!8m2!3d45.7548729!4d24.1445739!9m1!1b1!16s%2Fg%2F11yfn7ss3m";
const reviews = [
  { name: "Gabriela Ioana Filip", initials: "GF", quote: "Cel mai plăcut loc, cu atmosferă foarte bună, personalul foarte amabil si prietenos.", url: "https://maps.app.goo.gl/XBithdofcxafbCeY8", avatar: "https://lh3.googleusercontent.com/a/ACg8ocIl7ezumGN1llrljDTrZhjivRx_qis0V1R-lGJfn2aldgTlU-k=w45-h45-p-rp-mo-br100" },
  { name: "Carolina Novac", initials: "CN", quote: "Atmosfera este relaxantă, personalul foarte atent și profesionist...", url: "https://maps.app.goo.gl/7UHhNCzGCtHKhhWU7", avatar: "https://lh3.googleusercontent.com/a/ACg8ocLVHC7RccgehaX45flT3_Gv0UUHFm48RyV1OGkNobtZhJeOkA=w45-h45-p-rp-mo-br100" },
  { name: "Luminita Soportocean", initials: "LS", quote: "De la muzica ambientală până la masajul scalpului, totul a fost perfect.", url: "https://maps.app.goo.gl/g1ciFquzv8hXry3A8", avatar: "https://lh3.googleusercontent.com/a/ACg8ocKiu6OpaZX2dygn4yrRGoanwxNCOYAioaK41hqzs-ssXHGo1Q=w45-h45-p-rp-mo-br100" },
  { name: "Nico", initials: "N", quote: "Tratamentul pentru păr a fost extrem de plăcut...", url: "https://maps.app.goo.gl/XAGqQv17z2BSYkPk7", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWzjo3KxGIHlo6LN_jdY1pIyHcZbqRfxRGxlxWDuTYltsjYlYUd=w45-h45-p-rp-mo-br100" },
  { name: "Miruna Emilia", initials: "ME", quote: "...aici am găsit exact ce aveam nevoie.", url: "https://maps.app.goo.gl/JK5DMyhdWtiYESHK9", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVDA8DWbAIj-v8YFSUfdqZWLF9Ivo6aIKAZUHLUjJxwAoxORX7D=w45-h45-p-rp-mo-br100" },
  { name: "Larisa Amzoiu", initials: "LA", quote: "Masajul scalpului ... a fost pur rasfat pt mine", url: "https://maps.app.goo.gl/rjznXuX5Juvb4k3PA", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUAI1LhsCnjjVQRx0FRaiUg3KezOjrpZQ_M1ovbhmraz6lXsHA=w45-h45-p-rp-mo-br100" },
  { name: "Iulia-Denisa Diac", initials: "ID", quote: "Profesionalism, grijă și răsfăț la superlativ!", url: "https://maps.app.goo.gl/KEz8JwRCadEFLSW66", avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVlx7F-lOU1yye7oXITqAo0X-FcaI4b2HpY80TN7PwSEYL7jGA=w45-h45-p-rp-mo-ba12-br100" },
];
const experienceMoments = [
  { title: "Te așezi și uiți de grabă.", label: "Sosirea", copy: "Începe cu un moment în care lași ritmul de afară la ușă.", src: "/images/freya-ritual.jpeg", video: false },
  { title: "Descoperim ce are nevoie scalpul și părul tău.", label: "Alegerea", copy: "Privim împreună de ce are nevoie părul tău, fără grabă.", src: "/images/head-spa-waterfall-detail.jpeg", video: false },
  { title: "Începe ritualul de curățare și îngrijire.", label: "Îngrijirea", copy: "Apa, aburul și produsele potrivite pregătesc scalpul pentru relaxare.", src: "/videos/head-spa-waterfall.mp4", video: true },
  { title: "Masaj, abur și momente de relaxare.", label: "Relaxarea", copy: "Mâinile, căldura și apa transformă îngrijirea într-o pauză adevărată.", src: "/videos/freya-massage.mp4", video: true },
  { title: "Părul este hidratat, spălat și uscat.", label: "Finalul", copy: "Totul se așază în ritmul tău, cu atenție până la ultimul detaliu.", src: "/images/freya-paturi-abur.jpeg", video: false },
  { title: "Pleci mai relaxată decât ai venit.", label: "Pauza rămâne", copy: "Cu scalpul îngrijit, părul proaspăt și mai mult spațiu pentru tine.", src: "/images/head-spa-waterfall-wide.jpeg", video: false },
] as const;
const faqs = [
  ["Ce este Head Spa?", "Un ritual care combină îngrijirea scalpului și părului cu tehnici de masaj, hidratare și relaxare."],
  ["Cât durează o ședință?", "În funcție de ritual: 30, 40 sau 60 de minute. Durata fiecărei experiențe este indicată în lista de servicii."],
  ["Trebuie să vin cu părul spălat?", "Nu este nevoie. Serviciile Head Spa includ spălarea părului."],
  ["Face Spa include spălarea părului?", "Nu. Face Spa este un ritual pentru față, gât, decolteu, umeri și scalp și nu include spălarea părului."],
  ["Ce tratament aleg pentru scalp?", "Ne poți scrie înainte de programare, iar împreună alegem ritualul potrivit nevoilor tale."],
  ["Pot cumpăra un voucher cadou?", "Scrie-ne pentru a afla disponibilitatea voucherelor cadou."],
];

function LeafMark() { return <span className="leaf-mark" aria-hidden="true">✦</span>; }

function ExperienceSequence() {
  const [active, setActive] = useState(0);
  const stepsRef = useRef<(HTMLElement | null)[]>([]);
  const moment = experienceMoments[active];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.step));
    }, { rootMargin: "-30% 0px -42% 0px", threshold: [0, 0.35, 0.7] });
    stepsRef.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <section className="experience section" id="experienta">
    <div className="experience-copy experience-title"><p className="eyebrow">DINCOLO DE GRABĂ</p><h2>Cum arată o<br /><em>experiență Freya</em></h2><p>Derulează prin ritual, pas cu pas.</p></div>
    <div className="experience-sequence">
      <div className="experience-visual" aria-live="polite">
        <div className="experience-media" key={moment.src}>
          {moment.video ? <video src={moment.src} muted autoPlay loop playsInline preload="metadata" aria-label={moment.title} /> : <img src={moment.src} alt={moment.title} loading="lazy" />}
          <div><span>{String(active + 1).padStart(2, "0")} / {String(experienceMoments.length).padStart(2, "0")}</span><strong>{moment.label}</strong></div>
        </div>
      </div>
      <div className="experience-steps">
        {experienceMoments.map((item, index) => <article className={active === index ? "is-active" : ""} data-step={index} key={item.title} ref={(element) => { stepsRef.current[index] = element; }}>
          <span>{String(index + 1).padStart(2, "0")}</span><div><p className="experience-step-label">{item.label}</p><h3>{item.title}</h3><p>{item.copy}</p></div>
        </article>)}
      </div>
    </div>
  </section>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 22); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const close = () => setMenuOpen(false);
  const [reviewScroll, setReviewScroll] = useState({ left: false, right: true });
  const reviewTrack = useRef<HTMLDivElement>(null);
  const scrollReviews = (direction: -1 | 1) => {
    const track = reviewTrack.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const step = cards[1] ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };
  const updateReviewScroll = () => {
    const track = reviewTrack.current;
    if (!track) return;
    setReviewScroll({ left: track.scrollLeft > 4, right: track.scrollLeft < track.scrollWidth - track.clientWidth - 4 });
  };
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

    <section className="services section" id="servicii"><div className="section-heading reveal"><p className="eyebrow">RITUALURI</p><h2>Alege timpul<br /><em>care îți aparține.</em></h2></div><div className="service-grid">{mainServices.map((service, index) => <article className={`service-card reveal service-${index + 1}`} key={service.title}><div className="service-image"><img src={service.image} alt={service.title} loading="lazy" />{service.badge && <span className="service-badge">{service.badge}</span>}</div><div className="service-info"><div className="service-top"><div><p className="service-time">{service.time}</p><h3>{service.title}</h3></div><strong>{service.price}</strong></div><p>{service.text}</p><a className="text-link" href={bookingWhatsapp(service.title, service.time, service.price)}>Alege acest ritual <span>↗</span></a></div></article>)}</div></section>

    <section className="treatments section section-forest"><div className="treatments-head reveal"><p className="eyebrow light">ÎNGRIJIRE PENTRU SCALP</p><h2>De ce are nevoie<br /><em>scalpul tău?</em></h2><p>O alegere atentă, potrivită momentului în care ești.</p></div><div className="treatment-list reveal">{treatments.map((t, index) => <article key={t.name}><span>0{index + 1}</span><div><h3>{t.name}</h3><p>Pentru: <em>{t.for}</em></p></div><p>{t.body}</p><strong>100 lei</strong></article>)}</div></section>

    <section className="offer section"><div className="offer-image"><video src="/videos/freya-massage.mp4" poster="/images/freya-ritual.jpeg" autoPlay muted loop playsInline aria-label="Masaj capilar la Freya" /></div><div className="offer-copy reveal"><p className="eyebrow">PACHET PROMO</p><p className="small-title">TIMP PENTRU TINE</p><h2>Ritualul<br /><em>complet</em></h2><p className="offer-detail">Tratament scalp <b>+</b> ședință Head Spa</p><div className="price-line"><strong>200 lei</strong><a className="button button-green" href={bookingWhatsapp("Ritualul complet", "tratament scalp + ședință Head Spa", "200 lei")}>Vreau această experiență <span>↗</span></a></div></div></section>

    <ExperienceSequence />

    <section className="ritual-film section" id="ritual" aria-labelledby="ritual-film-title"><div className="ritual-film-heading reveal"><p className="eyebrow light">DIN SALON</p><h2 id="ritual-film-title">Ritualul,<br /><em>așa cum este.</em></h2><p>Vezi infuzia de apă și masajul, filmate la Freya. Clipurile pornesc doar când alegi tu.</p><a className="text-link light-link" href="https://www.instagram.com/freya_headspasibiu/" target="_blank" rel="noreferrer">Mai multe imagini pe Instagram <span>↗</span></a></div><div className="ritual-film-grid"><figure className="ritual-film-card reveal"><video controls playsInline preload="none" poster="/images/head-spa-waterfall-detail.jpeg" aria-label="Ritual Head Spa cu infuzie de apă"><source src="/videos/head-spa-waterfall.mp4" type="video/mp4" />Browserul tău nu poate reda acest videoclip.</video><figcaption><span>01 / INFUZIE</span><strong>Infuzia de apă</strong></figcaption></figure><figure className="ritual-film-card reveal"><video controls playsInline preload="none" poster="/images/freya-ritual.jpeg" aria-label="Masaj în timpul ritualului Freya"><source src="/videos/freya-massage.mp4" type="video/mp4" />Browserul tău nu poate reda acest videoclip.</video><figcaption><span>02 / MASAJ</span><strong>Masajul capilar</strong></figcaption></figure></div></section>

    <Gallery3D />

    <section className="about section" id="despre"><div className="about-visual reveal"><img src="/images/freya-ritual.jpeg" alt="Atmosfera spa Freya" loading="lazy" /><span>F</span></div><div className="about-copy reveal"><p className="eyebrow">DESPRE FREYA</p><h2>Un spațiu creat pentru momentele în care ai nevoie să <em>încetinești.</em></h2><p>Freya Head Spa a fost creat ca un spațiu dedicat relaxării și îngrijirii, unde fiecare experiență este gândită în jurul persoanei și nevoilor sale.</p><div className="about-words"><span>RELAXARE</span><i>•</i><span>ÎNGRIJIRE</span><i>•</i><span>RECONECTARE</span></div></div></section>

    <section className="reviews section" aria-labelledby="reviews-title"><div className="reviews-top reveal"><div><p className="eyebrow">RECENZII REALE · GOOGLE MAPS</p><h2 id="reviews-title">Spus de cei<br /><em>care au fost aici.</em></h2></div><div className="review-actions"><a className="text-link" href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">Toate recenziile pe Google <span>↗</span></a><div className="review-controls" aria-label="Controlează caruselul de recenzii"><button type="button" aria-label="Recenzii anterioare" onClick={() => scrollReviews(-1)} disabled={!reviewScroll.left}>←</button><button type="button" aria-label="Recenzii următoare" onClick={() => scrollReviews(1)} disabled={!reviewScroll.right}>→</button></div></div></div><div className="review-grid" ref={reviewTrack} onScroll={updateReviewScroll} role="region" aria-roledescription="carusel" aria-label="Șapte recenzii de la clienți Freya" tabIndex={0}>{reviews.map((review) => <article className="review-card" key={review.name}><div className="review-stars" aria-label="5 din 5 stele">★★★★★</div><blockquote>„{review.quote}”</blockquote><div className="review-bottom"><div className="review-person"><span className="review-avatar"><span>{review.initials}</span><img src={review.avatar} alt="" loading="lazy" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.display = "none"; }} /></span><strong>{review.name}</strong></div><a href={review.url} target="_blank" rel="noopener noreferrer" aria-label={`Citește recenzia scrisă de ${review.name} pe Google Maps`}>Vezi recenzia <span>↗</span></a></div></article>)}</div></section>

    <section className="faq section"><div className="section-heading reveal"><p className="eyebrow">ÎNTREBĂRI FRECVENTE</p><h2>Înainte de<br /><em>momentul tău</em></h2></div><div className="faq-list reveal">{faqs.map(([question, answer], index) => <article className={activeFaq === index ? "faq-active" : ""} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}><span>{question}</span><b>{activeFaq === index ? "−" : "+"}</b></button><div className="faq-answer"><p>{answer}</p></div></article>)}</div></section>

    <section className="contact" id="contact"><div className="contact-inner"><p className="eyebrow light">FREYA HEAD SPA SIBIU</p><h2>Pauza ta<br /><em>începe aici.</em></h2><p className="contact-lead">Scrie-ne sau sună-ne pentru programare.</p><div className="contact-actions"><a className="button button-gold" href={whatsapp}>Programează-te pe WhatsApp <span>↗</span></a><a className="text-link light-link" href={`tel:${phone}`}>Sună pentru programare <span>↗</span></a></div><div className="contact-details"><a href="tel:0742969279">0742 969 279</a><span>Strada Daniel Renard nr. 1<br />Cartierul Arhitecților · Sibiu-Cisnădie</span><a href="https://www.instagram.com/freya_headspasibiu/" target="_blank" rel="noreferrer">@freya_headspasibiu ↗</a></div></div></section>

    <footer><a className="brand footer-brand" href="#acasa"><LeafMark /><span>FREYA</span><small>HEAD SPA SIBIU</small></a><p>Relaxare • Îngrijire • Reconectare</p><span>© {new Date().getFullYear()} Freya Head Spa Sibiu</span></footer><div className="mobile-cta"><a href={`tel:${phone}`}>Sună</a><a href={whatsapp}>Programează-te <span>↗</span></a></div>
  </main>;
}

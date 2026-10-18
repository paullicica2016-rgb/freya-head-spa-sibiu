"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Real photos and footage on a curved 3D carousel; vertical scroll turns it.
const ITEMS = [
  { src: "/images/head-spa-waterfall-detail.jpeg", alt: "Infuzie de apă în ritualul Head Spa", title: "Infuzia de apă", copy: "Căldură, apă și timp doar pentru tine." },
  { src: "/videos/freya-massage.mp4", video: true, alt: "Masaj capilar la Freya", title: "Masajul capilar", copy: "Mișcări lente care eliberează tensiunea." },
  { src: "/images/freya-ritual.jpeg", alt: "Ritual de îngrijire Freya", title: "Ritualul Freya", copy: "Fiecare gest are locul și ritmul lui." },
  { src: "/images/freya-paturi-abur.jpeg", alt: "Paturile de head spa cu abur", title: "Locul tău", copy: "Un spațiu pregătit pentru liniște." },
  { src: "/videos/head-spa-waterfall.mp4", video: true, alt: "Cascada de apă caldă prin arcul auriu", title: "Cascada de apă", copy: "Un moment care schimbă tot ritmul." },
  { src: "/images/freya-cascada-apa.jpeg", alt: "Apă caldă pe păr sub arcul auriu", title: "Detaliile", copy: "Îngrijirea se simte în fiecare etapă." },
  { src: "/images/head-spa-waterfall-wide.jpeg", alt: "Ritual Head Spa cu infuzie", title: "Pauza ta", copy: "Un ritual de care îți vei aminti." },
];

export default function Gallery3D() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const cards = [...track.current!.children] as HTMLElement[];
    const vids = cards.map(c => c.querySelector("video"));
    let target = 0, cur = 0, raf = 0, last = -1;
    const tick = () => {
      const el = section.current!; const r = el.getBoundingClientRect(), h = el.offsetHeight - innerHeight;
      target = h > 0 ? clamp(-r.top / h) * (ITEMS.length - 1) : 0;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cur += (target - cur) * 0.1;
      const narrow = innerWidth < 680, step = narrow ? innerWidth * 0.5 : Math.min(innerWidth * 0.2, 300);
      cards.forEach((c, i) => {
        const o = i - cur, a = Math.abs(o);
        c.style.transform = `translate(-50%, -50%) translateX(${o * step}px) translateZ(${-a * (narrow ? 160 : 230)}px) rotateY(${clamp(-o * 38, -70, 70)}deg)`;
        c.style.opacity = clamp(1.25 - a * 0.28, 0, 1).toFixed(3);
        c.style.zIndex = String(100 - Math.round(a * 10));
        const v = vids[i];
        if (v) { if (a < 1.6 && v.paused) v.play().catch(() => {}); else if (a >= 1.6 && !v.paused) v.pause(); }
      });
      const idx = Math.round(cur);
      if (idx !== last) { last = idx; count.current!.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(ITEMS.length).padStart(2, "0")}`; setActive(idx); }
    };
    addEventListener("scroll", tick, { passive: true }); addEventListener("resize", tick);
    tick(); loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("scroll", tick); removeEventListener("resize", tick); };
  }, []);

  return <section className="gallery3d section-tint" id="galerie" ref={section}>
    <div className="gallery3d-sticky">
      <div className="gallery-top">
        <div><p className="eyebrow">FREYA, ÎN IMAGINI</p><h2>Un spațiu pentru<br /><em>liniștea ta.</em></h2></div>
        <div className="gallery3d-meta"><span ref={count}>01 / 07</span><div className="gallery3d-caption" aria-live="polite"><strong>{ITEMS[active].title}</strong><p>{ITEMS[active].copy}</p></div><span className="gallery3d-hint">Derulează pentru a descoperi ↓</span><a className="text-link" href="https://www.instagram.com/freya_headspasibiu/" target="_blank" rel="noreferrer">Vezi mai multe pe Instagram <span>↗</span></a></div>
      </div>
      <div className="gallery3d-stage">
        <div className="gallery3d-track" ref={track}>
          {ITEMS.map(it => <figure className="gallery3d-card" key={it.src}>
            {it.video ? <video src={it.src} muted loop playsInline preload="metadata" aria-label={it.alt} /> : <img src={it.src} alt={it.alt} loading="lazy" />}
          </figure>)}
        </div>
      </div>
    </div>
  </section>;
}

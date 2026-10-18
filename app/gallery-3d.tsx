"use client";

import { useEffect, useRef, useState } from "react";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// Real photos and footage on a curved 3D carousel; arrows, swipe or a click on a side card turn it.
const ITEMS = [
  { src: "/images/head-spa-waterfall-detail.jpeg", alt: "Infuzie de apă în ritualul Head Spa" },
  { src: "/videos/freya-massage.mp4", video: true, alt: "Masaj capilar la Freya" },
  { src: "/images/freya-ritual.jpeg", alt: "Ritual de îngrijire Freya" },
  { src: "/images/freya-paturi-abur.jpeg", alt: "Paturile de head spa cu abur" },
  { src: "/videos/head-spa-waterfall.mp4", video: true, alt: "Cascada de apă caldă prin arcul auriu" },
  { src: "/images/freya-cascada-apa.jpeg", alt: "Apă caldă pe păr sub arcul auriu" },
  { src: "/images/head-spa-waterfall-wide.jpeg", alt: "Ritual Head Spa cu infuzie" },
];
const LAST = ITEMS.length - 1;

export default function Gallery3D() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const target = useRef(0);
  const touched = useRef(false);

  const go = (i: number) => { target.current = clamp(i, 0, LAST); setActive(Math.round(target.current)); };
  const nudge = (d: number) => { touched.current = true; go(Math.round(target.current) + d); };

  useEffect(() => {
    const cards = [...track.current!.children] as HTMLElement[];
    const vids = cards.map(c => c.querySelector("video"));
    let cur = 0, raf = 0, visible = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      cur += (target.current - cur) * 0.1;
      const narrow = innerWidth < 680, step = narrow ? innerWidth * 0.5 : Math.min(innerWidth * 0.2, 300);
      cards.forEach((c, i) => {
        const o = i - cur, a = Math.abs(o);
        c.style.transform = `translate(-50%, -50%) translateX(${o * step}px) translateZ(${-a * (narrow ? 160 : 230)}px) rotateY(${clamp(-o * 38, -70, 70)}deg)`;
        c.style.opacity = clamp(1.25 - a * 0.28, 0, 1).toFixed(3);
        c.style.zIndex = String(100 - Math.round(a * 10));
        const v = vids[i];
        if (v) { if (a < 1.6 && v.paused) v.play().catch(() => {}); else if (a >= 1.6 && !v.paused) v.pause(); }
      });
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(section.current!);
    loop();

    // slow autoplay until the visitor takes over
    const auto = setInterval(() => {
      if (!visible || touched.current || document.hidden) return;
      go(Math.round(target.current) >= LAST ? 0 : Math.round(target.current) + 1);
    }, 4500);

    // swipe / drag
    const stage = track.current!.parentElement!;
    let startX = 0, startT = 0, dragging = false;
    const down = (e: PointerEvent) => { dragging = true; startX = e.clientX; startT = target.current; touched.current = true; };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const step = innerWidth < 680 ? innerWidth * 0.5 : Math.min(innerWidth * 0.2, 300);
      target.current = clamp(startT - (e.clientX - startX) / step, 0, LAST);
    };
    const up = () => { if (!dragging) return; dragging = false; go(Math.round(target.current)); };
    stage.addEventListener("pointerdown", down);
    addEventListener("pointermove", move, { passive: true });
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);

    return () => {
      cancelAnimationFrame(raf); io.disconnect(); clearInterval(auto);
      stage.removeEventListener("pointerdown", down);
      removeEventListener("pointermove", move); removeEventListener("pointerup", up); removeEventListener("pointercancel", up);
    };
  }, []);

  return <section className="gallery3d section-tint" id="galerie" ref={section}>
    <div className="gallery-top">
      <div><p className="eyebrow">FREYA, ÎN IMAGINI</p><h2>Un spațiu pentru<br /><em>liniștea ta.</em></h2></div>
      <div className="gallery3d-meta">
        <div className="gallery3d-controls">
          <span>{String(active + 1).padStart(2, "0")} / {String(ITEMS.length).padStart(2, "0")}</span>
          <button type="button" aria-label="Imaginea anterioară" onClick={() => nudge(-1)} disabled={active === 0}>←</button>
          <button type="button" aria-label="Imaginea următoare" onClick={() => nudge(1)} disabled={active === LAST}>→</button>
        </div>
        <a className="text-link" href="https://www.instagram.com/freya_headspasibiu/" target="_blank" rel="noreferrer">Vezi mai multe pe Instagram <span>↗</span></a>
      </div>
    </div>
    <div className="gallery3d-stage" role="region" aria-roledescription="carusel" aria-label="Imagini din salonul Freya" tabIndex={0}
      onKeyDown={e => { if (e.key === "ArrowLeft") nudge(-1); if (e.key === "ArrowRight") nudge(1); }}>
      <div className="gallery3d-track" ref={track}>
        {ITEMS.map((it, i) => <figure className="gallery3d-card" key={it.src} onClick={() => { touched.current = true; go(i); }}>
          {it.video ? <video src={it.src} muted loop playsInline preload="metadata" aria-label={it.alt} /> : <img src={it.src} alt={it.alt} loading="lazy" draggable={false} />}
        </figure>)}
      </div>
    </div>
  </section>;
}

"use client";

import { useEffect } from "react";

// Page-wide depth: sections rise out of the page on scroll, service cards tilt
// toward the cursor, and the dark green sections carry the same gold dust as the hero.
export default function DepthEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const offs: (() => void)[] = [];

    // 1. depth reveal, scroll-driven sweep (IntersectionObserver misses big anchor jumps)
    const reveals = [...document.querySelectorAll<HTMLElement>(".reveal")];
    reveals.forEach(el => {
      const sibs = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains("reveal")) : [];
      if (sibs.length > 1) el.style.setProperty("--d", `${sibs.indexOf(el) * 90}ms`);
    });
    if (!reduced) root.classList.add("depth-ready");
    const sweep = () => {
      const vh = innerHeight;
      for (const el of reveals) {
        if (el.classList.contains("visible")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.88 && r.bottom > 0) el.classList.add("visible");
      }
    };
    addEventListener("scroll", sweep, { passive: true });
    addEventListener("resize", sweep);
    requestAnimationFrame(() => requestAnimationFrame(sweep));
    offs.push(() => { removeEventListener("scroll", sweep); removeEventListener("resize", sweep); });

    // 2. tilt on the service cards (mouse only)
    if (!reduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>(".service-card").forEach(card => {
        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          card.style.setProperty("--rx", `${(0.5 - y) * 9}deg`);
          card.style.setProperty("--ry", `${(x - 0.5) * 11}deg`);
          card.style.setProperty("--mx", `${x * 100}%`);
          card.style.setProperty("--my", `${y * 100}%`);
          card.classList.add("is-tilting");
        };
        const leave = () => { card.classList.remove("is-tilting"); card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        offs.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); });
      });
    }

    // 3. gold dust in the green sections
    if (!reduced) {
      document.querySelectorAll<HTMLElement>(".section-forest, .contact").forEach(sec => {
        const canvas = document.createElement("canvas");
        canvas.className = "gold-dust"; canvas.setAttribute("aria-hidden", "true");
        sec.prepend(canvas);
        const ctx = canvas.getContext("2d")!;
        const dpr = Math.min(devicePixelRatio, 2);
        let w = 0, h = 0, visible = false, raf = 0;
        const dots = Array.from({ length: innerWidth < 680 ? 45 : 90 }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.8, s: 0.00015 + Math.random() * 0.0005, a: 0.25 + Math.random() * 0.55 }));
        const size = () => { w = sec.offsetWidth; h = sec.offsetHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
        size();
        const draw = () => {
          raf = requestAnimationFrame(draw);
          if (!visible) return;
          ctx.clearRect(0, 0, w, h);
          for (const d of dots) {
            d.y -= d.s; if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
            const g = ctx.createRadialGradient(d.x * w, d.y * h, 0, d.x * w, d.y * h, d.r * 3);
            g.addColorStop(0, `rgba(227,205,168,${d.a})`); g.addColorStop(1, "rgba(227,205,168,0)");
            ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r * 3, 0, Math.PI * 2); ctx.fill();
          }
        };
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
        io.observe(sec); draw();
        addEventListener("resize", size);
        offs.push(() => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener("resize", size); canvas.remove(); });
      });
    }

    return () => { offs.forEach(f => f()); root.classList.remove("depth-ready"); };
  }, []);
  return null;
}

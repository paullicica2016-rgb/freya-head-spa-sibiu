"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

// Real salon footage and photos, hung as gold-framed panels along a 3D corridor.
const MEDIA = [
  { src: "/videos/head-spa-waterfall.mp4", video: true, w: 9, h: 16, label: "Cascada de apă caldă" },
  { src: "/images/freya-ritual.jpeg", w: 3, h: 4, label: "Îngrijire atentă" },
  { src: "/images/freya-paturi-abur.jpeg", w: 624, h: 420, label: "Abur și liniște" },
  { src: "/videos/freya-massage.mp4", video: true, w: 9, h: 16, label: "Masajul capilar" },
  { src: "/images/head-spa-waterfall-detail.jpeg", w: 3, h: 4, label: "Ritualul apei" },
  { src: "/images/freya-cascada-apa.jpeg", w: 454, h: 576, label: "Relaxare profundă" },
  { src: "/images/head-spa-waterfall-wide.jpeg", w: 3, h: 4, label: "Reconectare" },
];
const GAP = 7, FIRST = -4, CAM_START = 6;

export default function ScrollHero({ whatsapp }: { whatsapp: string }) {
  const section = useRef<HTMLElement>(null);
  const mount = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const outro = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const capIndex = useRef<HTMLSpanElement>(null);
  const capLabel = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLElement>(null);
  const cue = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false, cleanup = () => {};
    (async () => {
      const THREE = await import("three");
      if (disposed || !mount.current) return;
      const host = mount.current;
      const mobile = matchMedia("(max-width: 680px)").matches;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ antialias: !mobile, powerPreference: "high-performance" }); }
      catch { section.current?.classList.add("tour-nogl"); return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x0c2f27);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0c2f27, 5, mobile ? 20 : 24);
      const camera = new THREE.PerspectiveCamera(mobile ? 62 : 48, 1, 0.1, 80);
      camera.position.set(0, 0, CAM_START);

      // panels
      const loader = new THREE.TextureLoader();
      const videos: HTMLVideoElement[] = [];
      const panels: { group: InstanceType<typeof THREE.Group>; baseY: number; video?: HTMLVideoElement; z: number }[] = [];
      const xOff = mobile ? 0.95 : 2.7, H = mobile ? 3.4 : 3.3;
      MEDIA.forEach((m, i) => {
        const w = H * m.w / m.h, side = i % 2 === 0 ? 1 : -1;
        let tex: InstanceType<typeof THREE.Texture>, video: HTMLVideoElement | undefined;
        if (m.video) {
          video = Object.assign(document.createElement("video"), { src: m.src, muted: true, loop: true, playsInline: true, preload: "auto" });
          video.setAttribute("playsinline", "");
          videos.push(video);
          tex = new THREE.VideoTexture(video);
        } else tex = loader.load(m.src);
        tex.colorSpace = THREE.SRGBColorSpace;
        const group = new THREE.Group();
        const frame = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.16, H + 0.16), new THREE.MeshBasicMaterial({ color: 0xc4a574 }));
        const pic = new THREE.Mesh(new THREE.PlaneGeometry(w, H), new THREE.MeshBasicMaterial({ map: tex }));
        pic.position.z = 0.01;
        group.add(frame, pic);
        const z = FIRST - i * GAP, baseY = (i % 3 - 1) * 0.25;
        group.position.set(side * xOff, baseY, z);
        group.rotation.y = -side * (mobile ? 0.18 : 0.32);
        scene.add(group);
        panels.push({ group, baseY, video, z });
      });
      const CAM_END = panels[panels.length - 1].z + 3.2;

      // drifting gold dust / steam
      const COUNT = mobile ? 700 : 1600;
      const pos = new Float32Array(COUNT * 3), speed = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 16;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        pos[i * 3 + 2] = CAM_START - Math.random() * (CAM_START - CAM_END + 20);
        speed[i] = 0.002 + Math.random() * 0.006;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      // soft round sprite, otherwise points render as hard squares
      const dot = document.createElement("canvas"); dot.width = dot.height = 64;
      const g = dot.getContext("2d")!, grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)"); grad.addColorStop(0.4, "rgba(255,255,255,.5)"); grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad; g.fillRect(0, 0, 64, 64);
      const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xe3cda8, map: new THREE.CanvasTexture(dot), size: mobile ? 0.14 : 0.12, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
      scene.add(dust);

      const resize = () => {
        const w = host.clientWidth, h = host.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      resize();

      let progress = 0, camZ = CAM_START, mx = 0, my = 0, sx = 0, sy = 0, lastIdx = -1;
      const tick = () => {
        const el = section.current; if (!el) return;
        const r = el.getBoundingClientRect(), h = el.offsetHeight - innerHeight;
        progress = h > 0 ? clamp(-r.top / h) : 0;
        const p = progress;
        const out = range(p, 0.03, 0.11);
        intro.current!.style.opacity = (1 - out).toFixed(3);
        intro.current!.style.transform = `translateY(${-out * 40}px)`;
        intro.current!.style.pointerEvents = out > 0.6 ? "none" : "";
        cue.current!.style.opacity = (1 - range(p, 0.01, 0.06)).toFixed(3);
        caption.current!.style.opacity = (range(p, 0.08, 0.14) * (1 - range(p, 0.86, 0.92))).toFixed(3);
        bar.current!.style.transform = `scaleX(${p.toFixed(4)})`;
        const inn = range(p, 0.9, 0.98);
        outro.current!.style.opacity = inn.toFixed(3);
        outro.current!.style.transform = `translateY(${(1 - inn) * 40}px)`;
        outro.current!.style.pointerEvents = inn > 0.5 ? "auto" : "none";
      };
      const onMove = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
      addEventListener("scroll", tick, { passive: true });
      addEventListener("resize", resize);
      addEventListener("pointermove", onMove, { passive: true });
      tick();

      let raf = 0, t = 0, visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
      io.observe(host);
      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;
        t += 0.016;
        const targetZ = CAM_START + (CAM_END - CAM_START) * progress;
        camZ += (targetZ - camZ) * 0.08;
        sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
        camera.position.set(sx * 0.9, -sy * 0.5, camZ);
        camera.lookAt(sx * 0.3, 0, camZ - 10);

        panels.forEach((pn, i) => {
          pn.group.position.y = pn.baseY + Math.sin(t * 0.6 + i) * 0.08;
          if (pn.video) {
            const near = Math.abs(pn.z - camZ) < 16;
            if (near && pn.video.paused) pn.video.play().catch(() => {});
            else if (!near && !pn.video.paused) pn.video.pause();
          }
        });
        const arr = dustGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          arr[i * 3 + 1] += speed[i];
          if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
        }
        dustGeo.attributes.position.needsUpdate = true;

        const idx = Math.max(0, Math.min(MEDIA.length - 1, Math.round((FIRST + 3.2 - camZ) / GAP)));
        if (idx !== lastIdx) {
          lastIdx = idx;
          capIndex.current!.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(MEDIA.length).padStart(2, "0")}`;
          capLabel.current!.textContent = MEDIA[idx].label;
        }
        renderer.render(scene, camera);
      };
      frame();

      cleanup = () => {
        cancelAnimationFrame(raf); io.disconnect();
        removeEventListener("scroll", tick); removeEventListener("resize", resize); removeEventListener("pointermove", onMove);
        videos.forEach(v => { v.pause(); v.removeAttribute("src"); v.load(); });
        scene.traverse(o => {
          const mesh = o as InstanceType<typeof THREE.Mesh>;
          mesh.geometry?.dispose();
          const mat = mesh.material as InstanceType<typeof THREE.MeshBasicMaterial> | undefined;
          mat?.map?.dispose(); mat?.dispose?.();
        });
        renderer.dispose(); renderer.domElement.remove();
      };
    })();
    return () => { disposed = true; cleanup(); };
  }, []);

  return <section className="tour" id="acasa" ref={section}>
    <div className="tour-sticky">
      <div className="tour-canvas" ref={mount} aria-hidden="true" />
      <div className="tour-shade" aria-hidden="true" />

      <div className="hero-content tour-intro" ref={intro}>
        <p className="eyebrow light">HEAD SPA · SIBIU</p>
        <h1>Pauza de care<br /><em>aveai nevoie.</em></h1>
        <p className="hero-copy">Ritualuri de îngrijire a scalpului și relaxare profundă, create pentru un moment doar al tău.</p>
        <div className="hero-actions"><a className="button button-gold" href={whatsapp}>Rezervă momentul tău <span>↗</span></a><a className="text-link light-link" href="#servicii">Explorează ritualurile <span>↓</span></a></div>
      </div>

      <div className="tour-caption" ref={caption} aria-hidden="true">
        <span className="tour-cap-index" ref={capIndex}>01 / 07</span>
        <span className="tour-cap-label" ref={capLabel}>{MEDIA[0].label}</span>
        <i><b ref={bar} /></i>
      </div>

      <div className="tour-outro" ref={outro}>
        <p className="eyebrow light">FREYA HEAD SPA · SIBIU</p>
        <h2>Aici începe<br /><em>pauza ta.</em></h2>
        <a className="button button-gold" href={whatsapp}>Programează-te pe WhatsApp <span>↗</span></a>
      </div>

      <div className="hero-signature" ref={cue}><span>INTRĂ ÎN RITUALUL FREYA</span><span>DERULEAZĂ <b>↓</b></span></div>
    </div>
  </section>;
}

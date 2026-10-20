"use client";

import * as React from "react";

/**
 * LedgerParticles — hero effect for the Asentar landing.
 * A cloud of on-chain "movements" settles into the Asentar mark (Debe, Haber,
 * double rule). The Haber bar goes from --review (pending) to --sello
 * (reconciled) once particles settle. The cursor pushes particles away.
 *
 * Colors are read from tokens (--foreground, --sello, --review) on the canvas
 * element, so it adapts to light, dark and any `.dark` wrapper. On the landing
 * the hero is wrapped in `.dark` (brand rule: dark = on-chain).
 * Geometry mirrors brand/logo.tsx (viewBox 30x27). Do not change it.
 */

type Props = {
  className?: string;
  /** Called with true when the mark is settled ("Conciliado"). */
  onSettledChange?: (settled: boolean) => void;
  /** External pause control (pause button). */
  paused?: boolean;
  /** Delay before the cloud starts settling, ms. */
  settleDelay?: number;
};

type P = {
  x: number; y: number; vx: number; vy: number;
  tx: number; ty: number; hx: number; hy: number;
  haber: boolean; ph: number; sp: number; r: number; a: number;
};

const RECTS: [number, number, number, number, boolean][] = [
  [0, 0, 26, 6, false], // Debe
  [8, 10, 22, 6, true], // Haber
  [0, 21, 30, 2, false], // rule
  [0, 25, 30, 2, false], // rule
];
const AREA = RECTS.reduce((a, r) => a + r[2] * r[3], 0);

function toRgb(probe: CanvasRenderingContext2D, color: string): [number, number, number] {
  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = "#000";
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const d = probe.getImageData(0, 0, 1, 1).data;
  return [d[0], d[1], d[2]];
}

export function LedgerParticles({ className, onSettledChange, paused = false, settleDelay = 900 }: Props) {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const pausedRef = React.useRef(paused);
  pausedRef.current = paused;
  const cbRef = React.useRef(onSettledChange);
  cbRef.current = onSettledChange;

  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const host = cv.parentElement ?? cv;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const probe = document.createElement("canvas").getContext("2d", { willReadFrequently: true })!;

    let W = 0, H = 0, parts: P[] = [], mode: "cloud" | "mark" = "cloud", mix = 0, visible = true, raf = 0;
    let lastSettled: boolean | null = null;
    const mouse = { x: -9999, y: -9999, on: false, last: 0 };
    // Hover push: full while the cursor moves, fades to 0 between 0.3 s and 1 s
    // after it stops, so a resting cursor never leaves a hole in the mark.
    const push = (now: number) => {
      if (!mouse.on) return 0;
      const idle = now - mouse.last;
      return idle < 300 ? 1 : Math.max(0, 1 - (idle - 300) / 700);
    };
    const t0 = performance.now();
    let C = { ink: [0, 0, 0], sello: [0, 0, 0], review: [0, 0, 0] } as Record<string, [number, number, number]>;

    const refreshColors = () => {
      const cs = getComputedStyle(cv);
      C = {
        ink: toRgb(probe, cs.getPropertyValue("--foreground").trim()),
        sello: toRgb(probe, cs.getPropertyValue("--sello").trim()),
        review: toRgb(probe, cs.getPropertyValue("--review").trim()),
      };
    };

    const layout = () => {
      const r = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mobile = W < 900;
      const n = mobile ? 2600 : 6500;
      const mh = mobile ? Math.min(200, H * 0.28) : Math.min(H * 0.5, ((W * 0.32) / 30) * 27);
      const s = mh / 27, mw = 30 * s;
      const cx = mobile ? W / 2 : W * 0.73, cy = mobile ? H - 160 : H * 0.5;
      const ox = cx - mw / 2, oy = cy - mh / 2;
      const old = parts; parts = [];
      for (let i = 0; i < n; i++) {
        let k = Math.random() * AREA, R = RECTS[0];
        for (const q of RECTS) { if (k < q[2] * q[3]) { R = q; break; } k -= q[2] * q[3]; }
        const tx = ox + (R[0] + Math.random() * R[2]) * s, ty = oy + (R[1] + Math.random() * R[3]) * s;
        const u = Math.random(), spread = (Math.random() + Math.random() + Math.random() - 1.5) * 0.55;
        const hx = u * W * 1.1 - W * 0.05, hy = H * (0.18 + 0.55 * u) + spread * H * 0.5;
        const p = old[i] ?? { x: hx, y: hy, vx: 0, vy: 0 };
        parts.push({ x: p.x, y: p.y, vx: p.vx, vy: p.vy, tx, ty, hx, hy, haber: R[4],
          ph: Math.random() * 6.283, sp: 0.25 + Math.random() * 0.6,
          r: Math.random() < 0.15 ? 1.9 : 1.35, a: 0.55 + Math.random() * 0.45 });
      }
      if (reduce) { for (const p of parts) { p.x = p.tx; p.y = p.ty; } mix = 1; draw(); }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const hc = C.review.map((v, i) => Math.round(v + (C.sello[i] - v) * mix));
      const ink = `rgba(${C.ink.join(",")},`, hab = `rgba(${hc.join(",")},`;
      for (const p of parts) { ctx.fillStyle = (p.haber ? hab : ink) + p.a + ")"; ctx.fillRect(p.x, p.y, p.r, p.r); }
    };

    const step = (now: number) => {
      const t = (now - t0) / 1000, target = mode === "mark", st = push(now);
      let off = 0;
      for (const p of parts) {
        let gx: number, gy: number;
        if (target) { gx = p.tx; gy = p.ty; }
        else { gx = p.hx + Math.sin(t * p.sp + p.ph) * 28 + Math.sin(t * 0.13) * 40; gy = p.hy + Math.cos(t * p.sp * 0.8 + p.ph) * 18; }
        const k = target ? 0.018 : 0.006;
        p.vx = p.vx * 0.88 + (gx - p.x) * k; p.vy = p.vy * 0.88 + (gy - p.y) * k;
        if (st > 0) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy, R = 90;
          if (d2 < R * R) { const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 2.6 * st; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        }
        p.x += p.vx; p.y += p.vy;
        if (target) off += Math.min(1, Math.hypot(p.x - p.tx, p.y - p.ty) / 40);
      }
      const want = target && 1 - off / parts.length > 0.9 ? 1 : 0;
      mix += (want - mix) * 0.06;
      const settled = mix > 0.5;
      if (settled !== lastSettled) { lastSettled = settled; cbRef.current?.(settled); }
      draw();
    };

    const loop = (now: number) => { if (!pausedRef.current && visible) step(now); raf = requestAnimationFrame(loop); };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; mouse.last = performance.now();
    };
    const onLeave = () => { mouse.on = false; };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; });
    io.observe(host);
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(() => layout());
    ro.observe(host);
    const mo = new MutationObserver(() => { refreshColors(); if (reduce) draw(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

    refreshColors();
    layout();
    let timer = 0;
    if (reduce) { cbRef.current?.(true); }
    else { timer = window.setTimeout(() => { mode = "mark"; }, settleDelay); raf = requestAnimationFrame(loop); }

    return () => {
      cancelAnimationFrame(raf); clearTimeout(timer);
      host.removeEventListener("pointermove", onMove); host.removeEventListener("pointerleave", onLeave);
      io.disconnect(); ro.disconnect(); mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [settleDelay]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={["absolute inset-0 h-full w-full touch-pan-y", className].filter(Boolean).join(" ")}
    />
  );
}

export default LedgerParticles;

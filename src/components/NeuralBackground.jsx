import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../utils/motion";

/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  NEURAL FIELD — Refined Cosmos                                ║
 * ╠═══════════════════════════════════════════════════════════════╣
 * ║  Quiet at rest, rewarding on interaction.                     ║
 * ║                                                               ║
 * ║  AMBIENT (always on, deliberately restrained):                ║
 * ║   • 3-layer parallax starfield                                ║
 * ║   • Cosmic dust, occasional shooting stars                    ║
 * ║   • Node network with proximity connections                   ║
 * ║   • Cursor aura + plasma tendrils                             ║
 * ║   • Depth vignette                                            ║
 * ║                                                               ║
 * ║  INTERACTION (earned spectacle — the easter eggs):            ║
 * ║   HOLD ........ wormhole / event horizon                      ║
 * ║   RELEASE ..... supernova: flash, shockwaves, sparks          ║
 * ║   DBL-CLICK ... constellation stamp                           ║
 * ║                                                               ║
 * ║  The maximalist layers this file once drew every frame are    ║
 * ║  switched off in STAGES below. They competed with the content ║
 * ║  for attention and cost real frame budget. Flip one back on   ║
 * ║  only if it earns its place.                                  ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

/* Draw-stage discipline. `false` = kept in the file, not drawn. */
const STAGES = {
  // ── Cut: louder than the content ──
  tilt: false,            // CSS perspective wobble on the whole canvas
  perspectiveGrid: false, // receding 3D floor grid
  aurora: false,          // fbm noise nebula field
  warpStars: false,       // fly-through-space streaks
  galaxyVortex: false,
  colorWaves: false,
  lightning: false,       // recursive fractal bolts
  glitch: false,          // chromatic aberration
  filmGrain: false,
  bloom: false,           // full-canvas self-drawImage blur pass

  // ── Kept: the quiet core ──
  atmosphere: true,
  starfield: true,
  dust: true,
  shootingStars: true,
  comet: true,
  constellations: true,
  connections: true,
  cursorAura: true,
  nodes: true,
  vignette: true,

  // ── Kept: interaction easter eggs ──
  wormhole: true,
  shockwaves: true,
  sparks: true,
  flash: true,
  remnants: true,
};

const MAX_DPR = 1.5;

export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animId, W, H;
    let time = 0;
    let mouse = { x: -1e4, y: -1e4, px: -1e4, py: -1e4, isDown: false, holdTime: 0, radius: 170 };
    let rotate = { x: 0, y: 0, tx: 0, ty: 0 };
    const M = window.innerWidth < 768; // mobile flag
    const reduced = prefersReducedMotion();

    // DPR capped — the field is decorative and does not warrant
    // rendering 4x the pixels on a high-density display.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ═══════════════════════════════════════
    //  PALETTE
    // ═══════════════════════════════════════
    const C = [
      [0, 240, 255], [139, 92, 246], [255, 0, 128],
      [0, 255, 170], [255, 215, 0], [255, 80, 40],
      [120, 200, 255], [200, 80, 255],
    ];
    const rgba = (c, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    const lerpc = (a, b, t) => [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];
    const pick = () => C[~~(Math.random() * C.length)];
    const TAU = Math.PI * 2;

    // ═══════════════════════════════════════
    //  SIMPLEX-ISH NOISE (fast 2D)
    // ═══════════════════════════════════════
    const perm = new Uint8Array(512);
    for (let i = 0; i < 256; i++) perm[i] = i;
    for (let i = 255; i > 0; i--) { const j = ~~(Math.random() * (i + 1)); [perm[i], perm[j]] = [perm[j], perm[i]]; }
    for (let i = 0; i < 256; i++) perm[i + 256] = perm[i];
    const grad2 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
    function noise2(x, y) {
      const X = ~~Math.floor(x) & 255, Y = ~~Math.floor(y) & 255;
      x -= Math.floor(x); y -= Math.floor(y);
      const u = x * x * (3 - 2 * x), v = y * y * (3 - 2 * y);
      const aa = perm[perm[X] + Y] & 7, ab = perm[perm[X] + Y + 1] & 7;
      const ba = perm[perm[X + 1] + Y] & 7, bb = perm[perm[X + 1] + Y + 1] & 7;
      const dot = (g, dx, dy) => g[0] * dx + g[1] * dy;
      const x1 = dot(grad2[aa], x, y) * (1 - u) + dot(grad2[ba], x - 1, y) * u;
      const x2 = dot(grad2[ab], x, y - 1) * (1 - u) + dot(grad2[bb], x - 1, y - 1) * u;
      return x1 * (1 - v) + x2 * v;
    }
    function fbm(x, y, oct = 4) {
      let v = 0, amp = 0.5, freq = 1;
      for (let i = 0; i < oct; i++) { v += noise2(x * freq, y * freq) * amp; amp *= 0.5; freq *= 2; }
      return v;
    }

    // ═══════════════════════════════════════
    //  STARFIELD (3 parallax layers)
    // ═══════════════════════════════════════
    // Roughly halved from the maximalist build — the field should read
    // as depth behind the content, not as the subject of the page.
    const STAR_COUNTS = M ? [45, 28, 14] : [110, 62, 30];
    const starLayers = [0.008, 0.06, 0.22].map((speed, li) =>
      Array.from({ length: STAR_COUNTS[li] }, () => ({
        x: Math.random() * 4000 - 1000,
        y: Math.random() * 3000 - 500,
        r: 0.3 + Math.random() * (li * 0.5 + 0.5),
        twinkle: Math.random() * TAU,
        twinkleSpeed: 1 + Math.random() * 3,
        color: Math.random() > 0.7 ? pick() : [200 + ~~(Math.random()*55), 200 + ~~(Math.random()*55), 255],
        speed,
      }))
    );

    // ═══════════════════════════════════════
    //  SHOOTING STARS
    // ═══════════════════════════════════════
    let shootingStars = [];
    const maybeShootingStar = () => {
      // Rare enough to feel like an event rather than weather.
      if (Math.random() < (M ? 0.0006 : 0.0012)) {
        const angle = -Math.PI / 6 + (Math.random() - 0.5) * 0.3;
        shootingStars.push({
          x: Math.random() * W * 1.5 - W * 0.25,
          y: -20,
          vx: Math.cos(angle) * (8 + Math.random() * 12),
          vy: Math.sin(angle + Math.PI / 2) * (8 + Math.random() * 12),
          life: 1, color: pick(), len: 30 + Math.random() * 60,
        });
      }
    };

    // ═══════════════════════════════════════
    //  COSMIC DUST (ambient particles)
    // ═══════════════════════════════════════
    const dustCount = M ? 16 : 38;
    const dust = Array.from({ length: dustCount }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.15,
      r: 0.3 + Math.random() * 1.2, alpha: 0.1 + Math.random() * 0.3,
      color: pick(), phase: Math.random() * TAU,
    }));

    // ═══════════════════════════════════════
    //  WARP SPEED STARS (fly-through-space)
    // ═══════════════════════════════════════
    const warpCount = M ? 40 : 120;
    const warpStars = Array.from({ length: warpCount }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: Math.random(),
      speed: 0.001 + Math.random() * 0.004,
      color: Math.random() > 0.6 ? pick() : [200 + ~~(Math.random()*55), 220 + ~~(Math.random()*35), 255],
    }));

    // ═══════════════════════════════════════
    //  3D PERSPECTIVE GRID CONFIG
    // ═══════════════════════════════════════
    const gridVanishY = 0.38;

    // ═══════════════════════════════════════
    //  PARTICLE POOLS
    // ═══════════════════════════════════════
    let shockwaves = [], sparks = [], trail = [], lightnings = [];
    let colorWaves = [], constellations = [], nebulaRemnants = [];
    let screenFlash = 0, screenGlitch = 0;
    let vortex = { active: false, x: 0, y: 0, strength: 0, angle: 0 };

    // ═══════════════════════════════════════
    //  NODE — with depth + orbital ring
    // ═══════════════════════════════════════
    const NODE_COUNT = M ? 32 : 72;
    const CONN_DIST = M ? 115 : 185;

    class Node {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = (Math.random() - 0.5) * 0.9;
        this.depth = 0.3 + Math.random() * 0.7; // 0.3=far, 1=close
        this.baseR = (0.8 + Math.random() * 2.5) * this.depth * this.depth;
        this.r = this.baseR;
        this.color = pick();
        this.phase = Math.random() * TAU;
        this.orbitAngle = Math.random() * TAU;
        this.orbitSpeed = (Math.random() - 0.5) * 0.04;
        this.highlighted = 0;
      }
      update() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        const mRad = mouse.radius * this.depth; // depth-scaled interaction

        if (dist < mRad && dist > 0) {
          const f = (mRad - dist) / mRad;
          if (mouse.isDown) {
            const a = Math.atan2(dy, dx);
            // Spiral suction with depth-based intensity
            const pull = (2.5 + mouse.holdTime * 0.4) * this.depth;
            this.vx += (Math.cos(a) * pull + Math.cos(a + 1.4) * pull * 0.4) * f;
            this.vy += (Math.sin(a) * pull + Math.sin(a + 1.4) * pull * 0.4) * f;
            this.r = this.baseR + f * 8 * this.depth;
          } else {
            this.vx -= (dx / dist) * f * 1.8 * this.depth;
            this.vy -= (dy / dist) * f * 1.8 * this.depth;
            this.r = this.baseR + f * 3;
          }
        } else {
          this.r += (this.baseR - this.r) * 0.08;
        }

        // Vortex
        if (vortex.active) {
          const vdx = vortex.x - this.x, vdy = vortex.y - this.y;
          const vd = Math.hypot(vdx, vdy);
          if (vd < 450 && vd > 0) {
            const vf = ((450 - vd) / 450) * vortex.strength * this.depth;
            const va = Math.atan2(vdy, vdx);
            this.vx += Math.cos(va + Math.PI / 2) * vf * 2.5 + Math.cos(va) * vf * 0.4;
            this.vy += Math.sin(va + Math.PI / 2) * vf * 2.5 + Math.sin(va) * vf * 0.4;
          }
        }

        // Color wave hits
        for (const cw of colorWaves) {
          const cd = Math.hypot(this.x - cw.x, this.y - cw.y);
          if (Math.abs(cd - cw.radius) < 50) {
            this.highlighted = 1;
            this.color = cw.color;
          }
        }
        this.highlighted *= 0.94;

        this.x += this.vx * this.depth;
        this.y += this.vy * this.depth;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.vx += (Math.random() - 0.5) * 0.08;
        this.vy += (Math.random() - 0.5) * 0.08;
        this.orbitAngle += this.orbitSpeed;

        // Parallax offset from mouse (stronger = more 3D)
        if (mouse.x > -1e3) {
          const pFactor = (1 - this.depth) * 0.035;
          this.x += (W / 2 - mouse.x) * pFactor;
          this.y += (H / 2 - mouse.y) * pFactor;
        }

        const pad = 100;
        if (this.x < -pad) this.x = W + pad;
        if (this.x > W + pad) this.x = -pad;
        if (this.y < -pad) this.y = H + pad;
        if (this.y > H + pad) this.y = -pad;
      }
      draw() {
        const pulse = Math.sin(time * 2.5 + this.phase) * 0.3 + 0.7;
        const depthSq = this.depth * this.depth;
        const depthScale = 0.3 + this.depth * 0.7;
        const glowR = this.r * (3 + this.highlighted * 4) * pulse * depthScale;
        const bAlpha = (0.07 + this.highlighted * 0.4) * depthSq;

        // Depth fog color shift (far nodes → cooler/bluer)
        const foggedColor = this.depth > 0.55
          ? this.color
          : lerpc(this.color, [30, 50, 100], (0.55 - this.depth) * 2.5);

        // 3D shadow (offset below, far nodes = larger diffuse shadow)
        const shOff = (1.3 - this.depth) * 12;
        const shR = this.r * (3.5 + (1 - this.depth) * 5) * pulse;
        const shG = ctx.createRadialGradient(this.x, this.y + shOff, 0, this.x, this.y + shOff, shR);
        shG.addColorStop(0, rgba([0, 0, 8], 0.1 * (1.3 - this.depth)));
        shG.addColorStop(1, rgba([0, 0, 8], 0));
        ctx.beginPath();
        ctx.arc(this.x, this.y + shOff, shR, 0, TAU);
        ctx.fillStyle = shG;
        ctx.fill();

        // Deep aurora halo (depth-scaled)
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowR);
        g.addColorStop(0, rgba(foggedColor, (bAlpha + 0.2) * depthScale));
        g.addColorStop(0.4, rgba(foggedColor, bAlpha * 0.3 * depthScale));
        g.addColorStop(1, rgba(foggedColor, 0));
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowR, 0, TAU);
        ctx.fillStyle = g;
        ctx.fill();

        // Orbital ring
        if (this.depth > 0.5 && this.r > 2) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.orbitAngle);
          ctx.scale(1, 0.35);
          ctx.beginPath();
          ctx.arc(0, 0, this.r * 3.5 * pulse * depthScale, 0, TAU);
          ctx.strokeStyle = rgba(this.color, 0.2 * pulse * depthSq);
          ctx.lineWidth = 0.4 + this.depth * 0.5;
          ctx.stroke();
          ctx.restore();
        }

        // Core (depth-scaled)
        const coreR = this.r * pulse * depthScale;
        ctx.beginPath();
        ctx.arc(this.x, this.y, coreR, 0, TAU);
        ctx.fillStyle = rgba(foggedColor, (0.7 + this.highlighted * 0.3) * depthSq);
        ctx.fill();

        // Specular highlight (3D sphere illusion for close nodes)
        if (this.depth > 0.55 && coreR > 1.2) {
          const specX = this.x - coreR * 0.28;
          const specY = this.y - coreR * 0.28;
          const specR = coreR * 0.65;
          const specG = ctx.createRadialGradient(specX, specY, 0, specX, specY, specR);
          specG.addColorStop(0, rgba([255, 255, 255], 0.35 * pulse * this.depth));
          specG.addColorStop(0.5, rgba([255, 255, 255], 0.06 * pulse * this.depth));
          specG.addColorStop(1, rgba([255, 255, 255], 0));
          ctx.beginPath();
          ctx.arc(specX, specY, specR, 0, TAU);
          ctx.fillStyle = specG;
          ctx.fill();
        }

        // Hot white center
        if (this.r > 2 && this.depth > 0.4) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r * 0.3 * pulse * depthScale, 0, TAU);
          ctx.fillStyle = rgba([255, 255, 255], 0.6 * pulse * depthSq);
          ctx.fill();
        }
      }
    }

    const nodes = Array.from({ length: NODE_COUNT }, () => new Node());

    // ═══════════════════════════════════════
    //  FRACTAL LIGHTNING (recursive branching)
    // ═══════════════════════════════════════
    const genLightning = (x1, y1, x2, y2, color, depth = 0) => {
      const segs = [];
      const steps = 5 + ~~(Math.random() * 4);
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const jitter = (1 - Math.abs(t - 0.5) * 2) * (35 - depth * 8);
        segs.push({
          x: x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter,
          y: y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter,
        });
      }
      lightnings.push({ segs, color, alpha: 1, width: Math.max(0.5, 2.5 - depth * 0.7) });
      // Branch
      if (depth < 3 && Math.random() < 0.5 - depth * 0.12) {
        const bi = 1 + ~~(Math.random() * (steps - 1));
        const bAngle = Math.atan2(y2 - y1, x2 - x1) + (Math.random() - 0.5) * 1.5;
        const bLen = Math.hypot(x2 - x1, y2 - y1) * (0.3 + Math.random() * 0.3);
        genLightning(
          segs[bi].x, segs[bi].y,
          segs[bi].x + Math.cos(bAngle) * bLen,
          segs[bi].y + Math.sin(bAngle) * bLen,
          color, depth + 1
        );
      }
    };

    // ═══════════════════════════════════════
    //  SUPERNOVA EXPLOSION
    // ═══════════════════════════════════════
    const supernova = (x, y, power = 1) => {
      screenFlash = 0.7 * power;

      // Multi-layered shockwaves
      for (let k = 0; k < 5; k++) {
        shockwaves.push({
          x, y, radius: 3 + k * 12, speed: 14 + k * 7,
          alpha: 1 - k * 0.15, decay: 0.008 + k * 0.003, color: pick(),
        });
      }

      // Color infection wave
      colorWaves.push({ x, y, radius: 0, speed: 10 * power, alpha: 1, color: pick() });

      // Nebula remnant cloud
      for (let i = 0; i < (M ? 3 : 6); i++) {
        nebulaRemnants.push({
          x: x + (Math.random() - 0.5) * 60,
          y: y + (Math.random() - 0.5) * 60,
          r: 40 + Math.random() * 80,
          alpha: 0.5, color: pick(), born: time,
          vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
        });
      }

      // Blast nodes
      for (const n of nodes) {
        const dx = n.x - x, dy = n.y - y, d = Math.hypot(dx, dy);
        if (d < 600 * power && d > 0) {
          const f = ((600 * power) - d) / (18 / power) * n.depth;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
      }

      // Radial spark burst
      const sc = ~~(80 * power);
      for (let i = 0; i < sc; i++) {
        const a = (TAU * i) / sc + (Math.random() - 0.5) * 0.6;
        const spd = 3 + Math.random() * 22 * power;
        sparks.push({
          x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd,
          life: 1, color: pick(), size: 1 + Math.random() * 3.5,
        });
      }

      // Fractal lightning burst
      const boltCount = M ? 4 : 8;
      for (let i = 0; i < boltCount; i++) {
        const a = Math.random() * TAU;
        const len = 100 + Math.random() * 300 * power;
        genLightning(x, y, x + Math.cos(a) * len, y + Math.sin(a) * len, pick());
      }
    };

    // ═══════════════════════════════════════
    //  CONSTELLATION STAMP + REALITY FRACTURE
    // ═══════════════════════════════════════
    const stampConstellation = (x, y) => {
      const shapes = [
        [[0,-40],[30,20],[-30,20]],
        [[0,-45],[35,0],[0,45],[-35,0]],
        [[0,-45],[12,-14],[42,-14],[18,7],[27,42],[0,20],[-27,42],[-18,7],[-42,-14],[-12,-14]],
        [[35,0],[17,30],[-17,30],[-35,0],[-17,-30],[17,-30]],
        [[0,-50],[15,-15],[50,-10],[22,12],[30,48],[0,28],[-30,48],[-22,12],[-50,-10],[-15,-15]], // 10-pt star
      ];
      const pts = shapes[~~(Math.random() * shapes.length)].map(([px, py]) => [px + x, py + y]);
      constellations.push({ pts, color: pick(), alpha: 1, born: time });
      screenGlitch = 0.6; // reality fracture trigger
      supernova(x, y, 0.6);
    };

    // ═══════════════════════════════════════
    //  ░░  M A I N   D R A W   L O O P  ░░
    // ═══════════════════════════════════════
    const frame = () => {
      time += 0.007;

      // ── PSEUDO 3D TILT (subtle CSS perspective) ──
      if (STAGES.tilt) {
        if (mouse.x > -1e3) {
          rotate.tx = ((mouse.y / H) - 0.5) * -6;
          rotate.ty = ((mouse.x / W) - 0.5) * 6;
        } else {
          rotate.tx = Math.sin(time * 0.15) * 1.5;
          rotate.ty = Math.cos(time * 0.12) * 1.5;
        }
        rotate.x += (rotate.tx - rotate.x) * 0.04;
        rotate.y += (rotate.ty - rotate.y) * 0.04;
        canvas.style.transform = `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.15)`;
      }

      ctx.clearRect(0, 0, W, H);

      // ── 0. DEEP SPACE BLACK ──
      ctx.fillStyle = "#000407";
      ctx.fillRect(0, 0, W, H);

      // ── 0.5. 3D PERSPECTIVE GRID ──
      if (STAGES.perspectiveGrid && !M) {
        const vpx = W / 2 + (mouse.x > -1e3 ? (mouse.x - W / 2) * 0.08 : Math.sin(time * 0.3) * 40);
        const vpy = H * gridVanishY;
        const gridPulse = 0.03 + Math.sin(time * 0.7) * 0.008;
        const gc = C[0];
        // Horizontal receding lines
        for (let i = 1; i <= 24; i++) {
          const t = i / 24;
          const y = vpy + (H - vpy + 80) * Math.pow(t, 2.2);
          const spread = t * 2.8;
          const x1 = vpx - W * spread;
          const x2 = vpx + W * spread;
          const a = gridPulse * (0.12 + t * 0.88) * (1 + Math.sin(time * 2 + i * 0.4) * 0.15);
          ctx.beginPath(); ctx.moveTo(x1, y); ctx.lineTo(x2, y);
          ctx.strokeStyle = rgba(gc, a);
          ctx.lineWidth = 0.3 + t * 1.2;
          ctx.stroke();
        }
        // Vertical converging lines
        for (let i = -10; i <= 10; i++) {
          const bottomX = vpx + i * (W / 8);
          const a = gridPulse * Math.max(0, 1 - Math.abs(i) / 12) * 0.7;
          if (a <= 0) continue;
          ctx.beginPath(); ctx.moveTo(vpx, vpy); ctx.lineTo(bottomX, H + 80);
          ctx.strokeStyle = rgba(gc, a);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        // Vanishing point glow
        const vpG = ctx.createRadialGradient(vpx, vpy, 0, vpx, vpy, 200);
        vpG.addColorStop(0, rgba(gc, 0.06));
        vpG.addColorStop(0.4, rgba(C[1], 0.02));
        vpG.addColorStop(1, rgba(gc, 0));
        ctx.beginPath(); ctx.arc(vpx, vpy, 200, 0, TAU);
        ctx.fillStyle = vpG; ctx.fill();
      }

      // ── 0.7. DEPTH ATMOSPHERE ──
      if (STAGES.atmosphere) {
        const fogG = ctx.createLinearGradient(0, 0, 0, H * 0.55);
        fogG.addColorStop(0, 'rgba(5, 2, 20, 0.12)');
        fogG.addColorStop(0.6, 'rgba(3, 5, 15, 0.04)');
        fogG.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = fogG;
        ctx.fillRect(0, 0, W, H * 0.55);
      }

      // ── 1. AURORA / NEBULA ──
      if (STAGES.aurora && (!M || time % 3 < 0.02)) { // mobile: only update infrequently
        const auroraAlpha = 0.025 + Math.sin(time * 0.8) * 0.01;
        const step = M ? 80 : 50;
        for (let bx = 0; bx < W; bx += step) {
          for (let by = 0; by < H; by += step) {
            const n1 = fbm(bx * 0.0012 + time * 0.3, by * 0.0012, 3);
            const n2 = fbm(bx * 0.001 - time * 0.2, by * 0.0015 + time * 0.15, 3);
            const ci = Math.abs(n1 + n2);
            const cIdx = ~~(ci * 5) % C.length;
            const cIdx2 = (cIdx + 1) % C.length;
            const frac = (ci * 5) % 1;
            const col = lerpc(C[cIdx], C[cIdx2], frac);
            const a = (0.5 + n1 * 0.5) * auroraAlpha;
            if (a > 0.005) {
              ctx.fillStyle = rgba(col, a);
              ctx.fillRect(bx, by, step + 1, step + 1);
            }
          }
        }
      }

      // ── 2. STARFIELD PARALLAX ──
      if (STAGES.starfield) for (const layer of starLayers) {
        for (const s of layer) {
          // Parallax shift from mouse
          const px = mouse.x > -1e3 ? (W / 2 - mouse.x) * s.speed : 0;
          const py = mouse.x > -1e3 ? (H / 2 - mouse.y) * s.speed : 0;
          const sx = ((s.x + px) % (W + 200)) + (s.x + px < 0 ? W + 200 : 0) - 100;
          const sy = ((s.y + py) % (H + 200)) + (s.y + py < 0 ? H + 200 : 0) - 100;
          const twinkle = (Math.sin(time * s.twinkleSpeed + s.twinkle) + 1) * 0.5;
          const alpha = 0.3 + twinkle * 0.7;
          ctx.beginPath();
          ctx.arc(sx, sy, s.r * (0.7 + twinkle * 0.3), 0, TAU);
          ctx.fillStyle = rgba(s.color, alpha);
          ctx.fill();
        }
      }

      // ── 2.5. WARP SPEED STARS (fly-through-space) ──
      if (STAGES.warpStars) {
        const wvpx = W / 2 + (mouse.x > -1e3 ? (mouse.x - W / 2) * 0.12 : 0);
        const wvpy = H / 2 + (mouse.x > -1e3 ? (mouse.y - H / 2) * 0.12 : 0);
        for (const ws of warpStars) {
          ws.z -= ws.speed;
          if (ws.z <= 0.005) {
            ws.z = 0.7 + Math.random() * 0.3;
            ws.x = (Math.random() - 0.5) * 2;
            ws.y = (Math.random() - 0.5) * 2;
          }
          const persp = 1 / ws.z;
          const sx = wvpx + ws.x * persp * W * 0.28;
          const sy = wvpy + ws.y * persp * H * 0.28;
          if (sx < -100 || sx > W + 100 || sy < -100 || sy > H + 100) {
            ws.z = 0.7 + Math.random() * 0.3;
            ws.x = (Math.random() - 0.5) * 2;
            ws.y = (Math.random() - 0.5) * 2;
            continue;
          }
          const size = Math.max(0.2, (1 - ws.z) * 2.8);
          const alpha = Math.pow(1 - ws.z, 2) * 0.85;
          // Trail streak
          const trailZ = Math.min(ws.z + ws.speed * 14, 1);
          const tp = 1 / trailZ;
          const tx = wvpx + ws.x * tp * W * 0.28;
          const ty = wvpy + ws.y * tp * H * 0.28;
          const sg = ctx.createLinearGradient(tx, ty, sx, sy);
          sg.addColorStop(0, rgba(ws.color, 0));
          sg.addColorStop(1, rgba(ws.color, alpha));
          ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(sx, sy);
          ctx.lineWidth = size; ctx.strokeStyle = sg; ctx.stroke();
          // Bright head
          if (size > 0.7) {
            ctx.beginPath(); ctx.arc(sx, sy, size * 0.5, 0, TAU);
            ctx.fillStyle = rgba([255, 255, 255], alpha * 0.7);
            ctx.fill();
          }
        }
      }

      // ── 3. COSMIC DUST ──
      if (STAGES.dust) for (const d of dust) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
        const da = d.alpha * (Math.sin(time * 1.5 + d.phase) * 0.3 + 0.7);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, TAU);
        ctx.fillStyle = rgba(d.color, da);
        ctx.fill();
      }

      // ── 4. SHOOTING STARS ──
      if (STAGES.shootingStars) maybeShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx; ss.y += ss.vy; ss.life -= 0.015;
        if (ss.life <= 0 || ss.y > H + 50) { shootingStars.splice(i, 1); continue; }
        const tailX = ss.x - (ss.vx / Math.hypot(ss.vx, ss.vy)) * ss.len * ss.life;
        const tailY = ss.y - (ss.vy / Math.hypot(ss.vx, ss.vy)) * ss.len * ss.life;
        const g = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        g.addColorStop(0, rgba(ss.color, 0));
        g.addColorStop(1, rgba(ss.color, ss.life));
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(ss.x, ss.y);
        ctx.lineWidth = 1.5; ctx.strokeStyle = g; ctx.stroke();
        // Head
        ctx.beginPath(); ctx.arc(ss.x, ss.y, 2, 0, TAU);
        ctx.fillStyle = rgba([255, 255, 255], ss.life); ctx.fill();
      }

      // ── 5. NEBULA REMNANTS (from supernova) ──
      for (let i = nebulaRemnants.length - 1; i >= 0; i--) {
        const nr = nebulaRemnants[i];
        nr.x += nr.vx; nr.y += nr.vy;
        nr.vx *= 0.995; nr.vy *= 0.995;
        nr.r += 0.3;
        nr.alpha -= 0.002;
        if (nr.alpha <= 0) { nebulaRemnants.splice(i, 1); continue; }
        const g = ctx.createRadialGradient(nr.x, nr.y, 0, nr.x, nr.y, nr.r);
        g.addColorStop(0, rgba(nr.color, nr.alpha * 0.5));
        g.addColorStop(0.5, rgba(nr.color, nr.alpha * 0.15));
        g.addColorStop(1, rgba(nr.color, 0));
        ctx.beginPath(); ctx.arc(nr.x, nr.y, nr.r, 0, TAU);
        ctx.fillStyle = g; ctx.fill();
      }

      // ── 6. COMET TRAIL ──
      if (mouse.x > -1e3) {
        const speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
        const cnt = Math.min(~~(speed / 2.5), M ? 5 : 10);
        for (let i = 0; i < cnt; i++) {
          const t = i / Math.max(cnt, 1);
          trail.push({
            x: mouse.px + (mouse.x - mouse.px) * t + (Math.random() - 0.5) * 6,
            y: mouse.py + (mouse.y - mouse.py) * t + (Math.random() - 0.5) * 6,
            life: 1, color: pick(), r: 1.5 + Math.random() * 3.5,
          });
        }
      }
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.025; p.r *= 0.975;
        if (p.life <= 0) { trail.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, TAU);
        ctx.fillStyle = rgba(p.color, p.life * 0.5);
        ctx.fill();
      }

      // ── 7. WORMHOLE / EVENT HORIZON (on hold) ──
      if (mouse.isDown && mouse.x > -1e3) {
        mouse.holdTime = Math.min(mouse.holdTime + 0.016, 3);
        const ht = mouse.holdTime;
        const mx = mouse.x, my = mouse.y;

        // Accretion disk
        ctx.save();
        ctx.translate(mx, my);
        const diskLayers = ~~(3 + ht * 3);
        for (let d = diskLayers; d >= 0; d--) {
          const dr = 20 + d * 18 + ht * 25;
          ctx.save();
          ctx.rotate(time * (3 + d * 0.5) * (d % 2 ? 1 : -1));
          ctx.scale(1, 0.3 + ht * 0.05);
          ctx.beginPath(); ctx.arc(0, 0, dr, 0, TAU);
          const ci = d % C.length;
          ctx.strokeStyle = rgba(C[ci], (0.08 + ht * 0.05) * (1 - d / (diskLayers + 1)));
          ctx.lineWidth = 2 + ht;
          ctx.stroke();
          ctx.restore();
        }

        // Event horizon (dark center)
        const ehR = 8 + ht * 18;
        const ehG = ctx.createRadialGradient(0, 0, 0, 0, 0, ehR * 2.5);
        ehG.addColorStop(0, rgba([0, 0, 0], 0.9));
        ehG.addColorStop(0.3, rgba([20, 0, 40], 0.5 * ht));
        ehG.addColorStop(0.7, rgba(C[2], 0.15 * ht));
        ehG.addColorStop(1, rgba(C[0], 0));
        ctx.beginPath(); ctx.arc(0, 0, ehR * 2.5, 0, TAU);
        ctx.fillStyle = ehG; ctx.fill();

        // Spiraling inflow lines
        for (let arm = 0; arm < 6; arm++) {
          ctx.beginPath();
          const startA = time * 4 + (arm * TAU) / 6;
          for (let r = ehR; r < ehR + 120 + ht * 80; r += 2) {
            const theta = startA + (r - ehR) * 0.035;
            ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r * (0.3 + ht * 0.06));
          }
          ctx.strokeStyle = rgba(C[arm % C.length], 0.12 + ht * 0.06);
          ctx.lineWidth = 1 + ht * 0.5;
          ctx.stroke();
        }
        ctx.restore();

        // Gravitational lensing: distort nearby connections
        // (visual: extra bright arcs around the black hole)
        for (let a = 0; a < 12; a++) {
          const ga = time * 1.5 + (a * TAU) / 12;
          const gr = ehR * 2 + 30 + Math.sin(time * 5 + a) * 10;
          ctx.beginPath();
          ctx.arc(mx, my, gr, ga, ga + 0.4);
          ctx.strokeStyle = rgba([255, 255, 255], 0.06 + ht * 0.04);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      // ── 8. GALAXY VORTEX (scroll) ──
      if (STAGES.galaxyVortex && vortex.active) {
        vortex.strength *= 0.94;
        vortex.angle += vortex.strength * 0.025;
        if (vortex.strength < 0.04) vortex.active = false;
        ctx.save();
        ctx.translate(vortex.x, vortex.y);
        for (let arm = 0; arm < 4; arm++) {
          ctx.beginPath();
          const sa = vortex.angle + (arm * TAU) / 4;
          for (let r = 5; r < 300; r += 2) {
            const theta = sa + r * 0.03 + Math.sin(r * 0.02 + time) * 0.15;
            ctx.lineTo(Math.cos(theta) * r, Math.sin(theta) * r);
          }
          ctx.strokeStyle = rgba(C[(arm + ~~time) % C.length], 0.08 * vortex.strength);
          ctx.lineWidth = 1.5 + vortex.strength * 0.5;
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── 9. SHOCKWAVES ──
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += sw.speed; sw.alpha -= sw.decay;
        if (sw.alpha <= 0) { shockwaves.splice(i, 1); continue; }
        // Outer ring
        ctx.beginPath(); ctx.arc(sw.x, sw.y, sw.radius, 0, TAU);
        ctx.lineWidth = Math.max(1, sw.radius * 0.025);
        ctx.strokeStyle = rgba(sw.color, sw.alpha);
        ctx.stroke();
        // Inner glow ring
        ctx.beginPath(); ctx.arc(sw.x, sw.y, sw.radius * 0.85, 0, TAU);
        ctx.lineWidth = Math.max(0.5, sw.radius * 0.01);
        ctx.strokeStyle = rgba(sw.color, sw.alpha * 0.35);
        ctx.stroke();
      }

      // ── 10. COLOR WAVES ──
      if (STAGES.colorWaves) for (let i = colorWaves.length - 1; i >= 0; i--) {
        const cw = colorWaves[i];
        cw.radius += cw.speed; cw.alpha -= 0.005;
        if (cw.alpha <= 0) { colorWaves.splice(i, 1); continue; }
        ctx.beginPath(); ctx.arc(cw.x, cw.y, cw.radius, 0, TAU);
        ctx.lineWidth = 30; ctx.strokeStyle = rgba(cw.color, cw.alpha * 0.06);
        ctx.stroke();
      }

      // ── 11. SPARKS ──
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx; s.y += s.vy;
        s.vx *= 0.95; s.vy *= 0.95; s.vy += 0.06;
        s.life -= 0.014;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        // Tapered tail
        const tx = s.x - s.vx * 4, ty = s.y - s.vy * 4;
        ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(s.x, s.y);
        ctx.lineWidth = s.size * s.life;
        ctx.strokeStyle = rgba(s.color, s.life);
        ctx.stroke();
        // Glow head
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size * s.life * 2, 0, TAU);
        ctx.fillStyle = rgba(s.color, s.life * 0.4);
        ctx.fill();
      }

      // ── 12. FRACTAL LIGHTNING ──
      if (STAGES.lightning) for (let i = lightnings.length - 1; i >= 0; i--) {
        const l = lightnings[i];
        l.alpha -= 0.045;
        if (l.alpha <= 0) { lightnings.splice(i, 1); continue; }
        // Outer glow
        ctx.beginPath();
        ctx.moveTo(l.segs[0].x, l.segs[0].y);
        for (let s = 1; s < l.segs.length; s++) ctx.lineTo(l.segs[s].x, l.segs[s].y);
        ctx.lineWidth = l.width * 3;
        ctx.strokeStyle = rgba(l.color, l.alpha * 0.25);
        ctx.stroke();
        // White core
        ctx.beginPath();
        ctx.moveTo(l.segs[0].x, l.segs[0].y);
        for (let s = 1; s < l.segs.length; s++) ctx.lineTo(l.segs[s].x, l.segs[s].y);
        ctx.lineWidth = l.width;
        ctx.strokeStyle = rgba([255, 255, 255], l.alpha * 0.9);
        ctx.stroke();
      }

      // ── 13. CONSTELLATIONS ──
      for (let i = constellations.length - 1; i >= 0; i--) {
        const c = constellations[i];
        c.alpha = Math.max(0, 1 - (time - c.born) * 0.1);
        if (c.alpha <= 0) { constellations.splice(i, 1); continue; }
        const p = Math.sin(time * 3 + i) * 0.2 + 0.8;
        ctx.beginPath();
        ctx.moveTo(c.pts[0][0], c.pts[0][1]);
        for (let j = 1; j < c.pts.length; j++) ctx.lineTo(c.pts[j][0], c.pts[j][1]);
        ctx.closePath();
        ctx.lineWidth = 1.5; ctx.strokeStyle = rgba(c.color, c.alpha * p * 0.6);
        ctx.stroke();
        for (const [px, py] of c.pts) {
          ctx.beginPath(); ctx.arc(px, py, 3.5 * p, 0, TAU);
          ctx.fillStyle = rgba(c.color, c.alpha * p); ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, 10 * p, 0, TAU);
          ctx.fillStyle = rgba(c.color, c.alpha * p * 0.15); ctx.fill();
        }
      }

      // ── 14. CONNECTIONS ──
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];

        // Node→Cursor plasma tendrils
        if (mouse.x > -1e3) {
          const mdx = ni.x - mouse.x, mdy = ni.y - mouse.y;
          const md = Math.hypot(mdx, mdy);
          if (md < CONN_DIST * 1.4 * ni.depth) {
            const a = (1 - md / (CONN_DIST * 1.4 * ni.depth)) * (mouse.isDown ? 0.65 : 0.2) * ni.depth;
            // Bezier tendril instead of straight line
            const cx1 = ni.x + (mouse.x - ni.x) * 0.3 + Math.sin(time * 5 + i) * 20;
            const cy1 = ni.y + (mouse.y - ni.y) * 0.3 + Math.cos(time * 4 + i) * 20;
            ctx.beginPath(); ctx.moveTo(ni.x, ni.y);
            ctx.quadraticCurveTo(cx1, cy1, mouse.x, mouse.y);
            ctx.strokeStyle = mouse.isDown ? rgba(C[2], a) : rgba(C[0], a);
            ctx.lineWidth = mouse.isDown ? 2.5 : 1;
            ctx.stroke();
          }
        }

        // Node→Node
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x, dy = ni.y - nj.y;
          const d = Math.hypot(dx, dy);
          const depthAvg = (ni.depth + nj.depth) / 2;
          if (d >= CONN_DIST * depthAvg) continue;

          const midX = (ni.x + nj.x) / 2, midY = (ni.y + nj.y) / 2;
          const mDist = Math.hypot(midX - mouse.x, midY - mouse.y);

          let alpha = (1 - d / (CONN_DIST * depthAvg)) * 0.15 * depthAvg * depthAvg;
          let lw = 0.25 + 0.6 * depthAvg * depthAvg;
          let col = C[0];

          if (mDist < mouse.radius) {
            const inf = 1 - mDist / mouse.radius;
            alpha += inf * 0.5;
            lw += inf * 2.5;
            if (mouse.isDown) col = C[2];
            // Spontaneous lightning
            if (Math.random() < inf * 0.006 && d < CONN_DIST * 0.6) {
              genLightning(ni.x, ni.y, nj.x, nj.y, pick());
            }
          }

          const hi = Math.max(ni.highlighted, nj.highlighted);
          if (hi > 0.2) {
            col = ni.highlighted > nj.highlighted ? ni.color : nj.color;
            alpha += hi * 0.35;
          }

          ctx.beginPath(); ctx.moveTo(ni.x, ni.y); ctx.lineTo(nj.x, nj.y);
          ctx.strokeStyle = rgba(col, alpha);
          ctx.lineWidth = lw;
          ctx.stroke();
        }
      }

      // ── 15. CURSOR AURA + ORBITAL RINGS ──
      if (mouse.x > -1e3 && !mouse.isDown) {
        const mp = Math.sin(time * 4) * 0.15 + 0.85;
        // Inner glow
        const mRad = 40 * mp;
        const mG = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mRad);
        mG.addColorStop(0, rgba(C[0], 0.2)); mG.addColorStop(1, rgba(C[0], 0));
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, mRad, 0, TAU);
        ctx.fillStyle = mG; ctx.fill();
        // Dual orbital rings
        for (let r = 0; r < 2; r++) {
          ctx.save();
          ctx.translate(mouse.x, mouse.y);
          ctx.rotate(time * (3 + r * 2) * (r % 2 ? -1 : 1));
          ctx.scale(1, 0.35);
          ctx.beginPath(); ctx.arc(0, 0, 30 + r * 18, 0, TAU);
          ctx.strokeStyle = rgba(C[r * 2], 0.2 * mp);
          ctx.lineWidth = 1;
          ctx.stroke();
          // Orbiting dot
          const dotAngle = time * (5 + r * 3);
          const dotR = 30 + r * 18;
          ctx.beginPath();
          ctx.arc(Math.cos(dotAngle) * dotR, Math.sin(dotAngle) * dotR, 2, 0, TAU);
          ctx.fillStyle = rgba(C[r * 2], 0.8);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── 16. UPDATE & DRAW NODES ──
      for (const n of nodes) { n.update(); n.draw(); }

      // ── 17. HDR BLOOM PASS ──
      // A full-canvas blurred self-composite — the single most expensive
      // operation in the loop, and the one that made everything hazy.
      if (STAGES.bloom) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.filter = `blur(${M ? 6 : 10}px)`;
        ctx.globalAlpha = 0.08 + Math.sin(time * 2) * 0.02;
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
        ctx.filter = "none";
      }

      // ── 17.5. DEPTH VIGNETTE ──
      if (STAGES.vignette) {
        const vigR = Math.max(W, H) * 0.78;
        const vig = ctx.createRadialGradient(W / 2, H / 2, vigR * 0.25, W / 2, H / 2, vigR);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(0.55, 'rgba(0,1,4,0.06)');
        vig.addColorStop(1, 'rgba(0,1,4,0.45)');
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
      }

      // ── 18. SCREEN FLASH ──
      if (screenFlash > 0) {
        ctx.fillStyle = `rgba(255,255,255,${screenFlash})`;
        ctx.fillRect(0, 0, W, H);
        screenFlash *= 0.85;
        if (screenFlash < 0.01) screenFlash = 0;
      }

      // ── 19. REALITY GLITCH ──
      if (STAGES.glitch && screenGlitch > 0) {
        const sliceCount = ~~(screenGlitch * 12);
        for (let g = 0; g < sliceCount; g++) {
          const sy = ~~(Math.random() * H);
          const sh = 2 + ~~(Math.random() * 20);
          const sx = ~~((Math.random() - 0.5) * 40 * screenGlitch);
          ctx.drawImage(canvas, 0, sy, W, sh, sx, sy, W, sh);
        }
        // Chromatic aberration
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.globalAlpha = screenGlitch * 0.15;
        ctx.drawImage(canvas, -3 * screenGlitch, 0);
        ctx.globalAlpha = screenGlitch * 0.1;
        ctx.drawImage(canvas, 3 * screenGlitch, 0);
        ctx.restore();
        screenGlitch *= 0.92;
        if (screenGlitch < 0.01) screenGlitch = 0;
      }

      // ── 20. FILM GRAIN (extremely subtle) ──
      if (STAGES.filmGrain && !M) {
        ctx.save();
        ctx.globalAlpha = 0.015;
        const grainSize = 3;
        for (let gx = 0; gx < W; gx += grainSize * 8) {
          for (let gy = 0; gy < H; gy += grainSize * 8) {
            if (Math.random() < 0.3) {
              const v = ~~(Math.random() * 255);
              ctx.fillStyle = `rgb(${v},${v},${v})`;
              ctx.fillRect(gx, gy, grainSize, grainSize);
            }
          }
        }
        ctx.restore();
      }

      mouse.px = mouse.x;
      mouse.py = mouse.y;
      // Reduced motion draws exactly one frame — a static field.
      if (!reduced) animId = requestAnimationFrame(frame);
    };

    /* ═════ EVENT HANDLERS ═════ */
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseDown = (e) => { if (e.button === 0) { mouse.isDown = true; mouse.holdTime = 0; mouse.radius = 400; } };
    const onMouseUp = () => {
      if (mouse.isDown) supernova(mouse.x, mouse.y, 0.5 + mouse.holdTime * 0.5);
      mouse.isDown = false; mouse.holdTime = 0; mouse.radius = 170;
    };
    const onMouseLeave = () => { mouse.x = mouse.y = mouse.px = mouse.py = -1e4; mouse.isDown = false; mouse.holdTime = 0; };
    const onDblClick = (e) => { stampConstellation(e.clientX, e.clientY); };
    const onTouchStart = (e) => { if (e.touches[0]) { mouse.x = mouse.px = e.touches[0].clientX; mouse.y = mouse.py = e.touches[0].clientY; mouse.isDown = true; mouse.holdTime = 0; mouse.radius = 400; } };
    const onTouchMove = (e) => { if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; } };
    const onTouchEnd = () => {
      if (mouse.isDown) supernova(mouse.x, mouse.y, 0.5 + mouse.holdTime * 0.5);
      mouse.isDown = false; mouse.holdTime = 0; mouse.radius = 170;
      mouse.x = mouse.y = mouse.px = mouse.py = -1e4;
    };

    // The field asserts itself at the hero, then recedes so the content
    // sections sit on calm near-black and the typography can carry them.
    const onScroll = () => {
      const t = Math.min(window.scrollY / (window.innerHeight * 0.9), 1);
      canvas.style.opacity = (1 - t * 0.62).toFixed(3);
    };
    onScroll();

    // Nothing to animate behind a hidden tab.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else if (!reduced) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(frame);
      }
    };

    /* ═════ LISTENERS ═════ */
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("dblclick", onDblClick);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    frame();

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("dblclick", onDblClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-field"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}

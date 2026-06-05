# OMC S.A.S. de C.V. — DESIGN.md

> Despacho de consultoría contable y fiscal en El Salvador.
> Dirección visual: **Light premium / paper · wealth-management editorial**.
> Nivel de interacción: **L3** (cinematográfico, pin-scrub, WebGL signature).
> Mercado: **El Salvador** (USD, DGII, IVA 13%, ISSS, DTE).

---

## 1. Visual Theme & Atmosphere

**Filosofía**: papel de archivo notarial reinterpretado como producto digital premium. La sensación es la de un *annual report* de banca privada: jerarquía editorial pesada, mucho aire, una sola voz cromática (verde-bosque) y un segundo color cálido (cobre) que aparece sólo en momentos firmados. Nada de glassmorphism oscuro, nada de gradientes neón, nada de iconos genéricos coloridos.

**Palabras clave**: paper, editorial, ledger, stewardship, sobrio, costoso, calmo, cifras, archivo, tinta.

**Una frase definitoria**:
> El estado financiero hecho landing page: blanco hueso, tinta verde-bosque, columnas largas, un solo número grande por pantalla.

**Atmósfera por sección**:
- **Hero**: papel hueso, gran display serif con masking reveal, una sola cifra ámbar girando en 3D sutil (WebGL), grano de papel animado.
- **Servicios**: pin-scrub clásico — título a la izquierda fijo, tarjetas servicios a la derecha intercambiándose con scroll. Cada servicio aparece como una página de cuaderno.
- **Resultados**: números enormes en Fraunces 144opt, contador scroll-driven, líneas finas tipo libro mayor.
- **Equipo**: retratos blanco y negro alto contraste con duotone verde, hover revela color.
- **Planes**: tres columnas tipo tarifa de bufete legal, una sola CTA por columna, sin gradientes.
- **Contacto**: una hoja de papel grande con formulario embebido, sello (stamp) animado al enviar.

---

## 2. Color Palette & Roles

```css
:root {
  /* ===== PAPER (fondos claros, 80% del sitio) ===== */
  --paper:           #F4F1EA;  /* fondo principal — off-white cálido */
  --paper-rgb:       244, 241, 234;
  --paper-deep:      #ECE7DC;  /* fondo de sección alterna */
  --paper-deep-rgb:  236, 231, 220;
  --paper-edge:      #DDD6C5;  /* divisores, bordes muy sutiles */
  --paper-edge-rgb:  221, 214, 197;

  /* ===== INK (textos sobre paper) ===== */
  --ink:             #14201C;  /* casi-negro con underspun verde — body */
  --ink-rgb:         20, 32, 28;
  --ink-soft:        #3C4842;  /* secondary text */
  --ink-soft-rgb:    60, 72, 66;
  --ink-mute:        #8A9089;  /* labels, meta, captions */
  --ink-mute-rgb:    138, 144, 137;

  /* ===== EMERALD (acento principal — verde bosque profundo) ===== */
  --emerald:         #1F4D3C;  /* CTAs, números, marca */
  --emerald-rgb:     31, 77, 60;
  --emerald-deep:    #0F2E24;  /* hover, fondos de sección oscura */
  --emerald-deep-rgb:15, 46, 36;
  --emerald-soft:    #5B8A75;  /* estados disabled, iconos secundarios */
  --emerald-soft-rgb:91, 138, 117;
  --emerald-tint:    rgba(31, 77, 60, 0.08); /* highlight de bloque, hover ligero */

  /* ===== COPPER (acento secundario — cobre cálido editorial) ===== */
  --copper:          #B8794A;  /* sólo en signature moments: 1 número, 1 sello, 1 dato */
  --copper-rgb:      184, 121, 74;
  --copper-light:    #D9A074;  /* shimmer, halo del 3D coin */
  --copper-light-rgb:217, 160, 116;

  /* ===== INVERTED (secciones oscuras puntuales: footer, "ledger" interludio) ===== */
  --ink-paper:       #0F1714;  /* fondo invertido */
  --ink-paper-rgb:   15, 23, 20;
  --paper-on-ink:    #F4F1EA;  /* texto sobre ink */

  /* ===== SEMÁNTICOS ===== */
  --success: var(--emerald);
  --warning: var(--copper);
  --danger:  #8E2E2E;

  /* ===== GLASS sobre papel (para tooltips, overlays) ===== */
  --paper-glass:     rgba(244, 241, 234, 0.72);
  --ink-glass:       rgba(15, 23, 20, 0.62);
}
```

**Reglas de uso de color**:
- `--paper` ocupa **≥70% del sitio**. `--emerald` es el ÚNICO color para CTAs y enlaces.
- `--copper` aparece **máximo 3 veces por página completa** (Hero coin · 1 número grande en Resultados · sello del formulario).
- Textos sobre `--paper`: jamás `#000` puro. Siempre `--ink` o `--ink-soft`.
- En secciones invertidas (`--ink-paper`), el acento es `--copper-light`, NO `--emerald-soft` (queda lavado).

---

## 3. Typography Rules

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..700,0..100,0..1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Fraunces', 'Times New Roman', Georgia, serif;
  --font-sans:    'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', 'SF Mono', Menlo, monospace;
}
```

**Escala tipográfica (mobile → desktop, fluid)**:

| Token | Tamaño | Familia | Peso | Tracking | Uso |
|-------|--------|---------|------|----------|-----|
| `--t-display-1` | `clamp(3rem, 9vw, 7.5rem)` | Fraunces opsz 144 | 400 | `-0.04em` | Hero H1 único |
| `--t-display-2` | `clamp(2.5rem, 5vw, 4.75rem)` | Fraunces opsz 96 | 400 | `-0.03em` | Section H2 |
| `--t-h3` | `clamp(1.5rem, 2.5vw, 2rem)` | Fraunces opsz 36 | 500 | `-0.02em` | Card titles |
| `--t-h4` | `1.25rem` | Inter | 600 | `-0.01em` | Sub-titles, plan names |
| `--t-body-lg` | `1.125rem` | Inter | 400 | `0` | Lead paragraph |
| `--t-body` | `1rem` | Inter | 400 | `0` | Body default |
| `--t-small` | `0.875rem` | Inter | 500 | `0.005em` | Meta, captions |
| `--t-micro` | `0.75rem` | Inter | 600 | `0.14em` UPPERCASE | Eyebrow labels, section tags |
| `--t-numeric` | `clamp(4rem, 10vw, 9rem)` | Fraunces opsz 144 | 300, `font-variant-numeric: tabular-nums` | `-0.05em` | Big stats |
| `--t-mono` | `0.875rem` | JetBrains Mono | 400 | `0` | Códigos, IDs, ledger lines |

**Reglas de uso**:
- **Una sola fuente serif** display: Fraunces. Optical size cambia de 9 (small caps) a 144 (display gigante).
- Cuerpo: Inter sin excepciones. Nada de Space Grotesk, Syne, Manrope.
- Mono solo para datos puntuales: códigos DTE, NIT, "DGII-XXX".
- `line-height`: 1.05 para display, 1.2 para H3, **1.65 para body** (lectura larga).
- Cifras: `font-variant-numeric: tabular-nums` SIEMPRE en estadísticas y precios.
- **PROHIBIDO**: gradientes en titulares de display (rompe el papel). Sólo `--ink` o `--emerald`.

**Excepción signature**: el número grande de "ahorro fiscal promedio" en Resultados puede ir en `--copper`. Una sola vez en el sitio.

---

## 4. Component Stylings

### 4.1 Buttons

```css
/* PRIMARY — verde bosque sólido */
.btn-primary {
  display: inline-flex; align-items: center; gap: 0.625rem;
  padding: 1rem 1.75rem;
  font-family: var(--font-sans); font-weight: 500; font-size: 1rem;
  color: var(--paper);
  background: var(--emerald);
  border: 1px solid var(--emerald);
  border-radius: 999px;
  letter-spacing: -0.005em;
  position: relative; overflow: hidden;
  cursor: pointer;
  transition: background 0.4s var(--ease), transform 0.6s var(--ease), box-shadow 0.4s var(--ease);
}
.btn-primary:hover {
  background: var(--emerald-deep);
  transform: translateY(-1px);
  box-shadow: 0 12px 32px -12px rgba(var(--emerald-rgb), 0.5);
}
.btn-primary:active { transform: translateY(0); }
.btn-primary:focus-visible {
  outline: 2px solid var(--copper);
  outline-offset: 3px;
}
.btn-primary[disabled] {
  background: var(--emerald-soft);
  border-color: var(--emerald-soft);
  cursor: not-allowed;
  opacity: 0.6;
}

/* SECONDARY — outline ink sobre paper */
.btn-secondary {
  display: inline-flex; align-items: center; gap: 0.625rem;
  padding: 1rem 1.75rem;
  font-family: var(--font-sans); font-weight: 500; font-size: 1rem;
  color: var(--ink);
  background: transparent;
  border: 1px solid var(--ink);
  border-radius: 999px;
  transition: background 0.35s var(--ease), color 0.35s var(--ease), transform 0.6s var(--ease);
}
.btn-secondary:hover {
  background: var(--ink);
  color: var(--paper);
  transform: translateY(-1px);
}
.btn-secondary:active { transform: translateY(0); }
.btn-secondary:focus-visible { outline: 2px solid var(--emerald); outline-offset: 3px; }
.btn-secondary[disabled] { opacity: 0.4; cursor: not-allowed; }

/* GHOST — link discreto con underline animado */
.btn-ghost {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-sans); font-weight: 500; font-size: 0.95rem;
  color: var(--emerald);
  background: none; border: none;
  padding: 0.5rem 0;
  position: relative;
  cursor: pointer;
}
.btn-ghost::after {
  content: ''; position: absolute; left: 0; bottom: 2px;
  width: 100%; height: 1px;
  background: var(--emerald);
  transform: scaleX(0.3); transform-origin: left;
  transition: transform 0.5s var(--ease);
}
.btn-ghost:hover::after { transform: scaleX(1); }
.btn-ghost:focus-visible { outline: 2px solid var(--copper); outline-offset: 4px; border-radius: 4px; }
```

### 4.2 Cards (papel)

```css
.card {
  background: var(--paper);
  border: 1px solid var(--paper-edge);
  border-radius: 18px;
  padding: 2rem 2rem 2.25rem;
  position: relative;
  transition: transform 0.6s var(--ease), box-shadow 0.6s var(--ease), border-color 0.4s var(--ease);
}
.card::before {
  /* esquina doblada estilo papel */
  content: '';
  position: absolute; top: 0; right: 0;
  width: 28px; height: 28px;
  background: linear-gradient(225deg, var(--paper-deep) 50%, transparent 50%);
  border-bottom-left-radius: 4px;
  opacity: 0; transition: opacity 0.4s var(--ease);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px -24px rgba(var(--ink-rgb), 0.18);
  border-color: var(--emerald-soft);
}
.card:hover::before { opacity: 1; }
.card:focus-within { border-color: var(--emerald); }

/* Variante destacada (plan recomendado) */
.card--featured {
  background: var(--ink-paper);
  color: var(--paper-on-ink);
  border-color: var(--ink-paper);
}
.card--featured .card-title { color: var(--paper-on-ink); }
.card--featured:hover { box-shadow: 0 32px 64px -28px rgba(var(--ink-rgb), 0.6); }
```

### 4.3 Navbar

```css
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  background: transparent;
  transition: background 0.4s var(--ease), backdrop-filter 0.4s, padding 0.4s, border-color 0.4s;
}
.navbar.is-scrolled {
  padding: 0.75rem 0;
  background: var(--paper-glass);
  backdrop-filter: blur(14px) saturate(120%);
  -webkit-backdrop-filter: blur(14px) saturate(120%);
  border-bottom: 1px solid var(--paper-edge);
}
.nav-link {
  font-family: var(--font-sans); font-weight: 500; font-size: 0.95rem;
  color: var(--ink-soft);
  position: relative; padding: 0.5rem 0;
  transition: color 0.3s var(--ease);
}
.nav-link::after {
  content: ''; position: absolute; left: 0; bottom: 0;
  width: 100%; height: 1px;
  background: var(--emerald);
  transform: scaleX(0); transform-origin: right;
  transition: transform 0.5s var(--ease);
}
.nav-link:hover { color: var(--ink); }
.nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
.nav-link.is-active { color: var(--emerald); }
.nav-link.is-active::after { transform: scaleX(1); background: var(--emerald); }
.nav-link:focus-visible { outline: 2px solid var(--copper); outline-offset: 4px; border-radius: 4px; }
```

### 4.4 Inputs (formulario contacto)

```css
.field { position: relative; padding-top: 1.5rem; }
.field-input {
  width: 100%;
  font-family: var(--font-sans); font-size: 1.0625rem; color: var(--ink);
  background: transparent;
  border: none; border-bottom: 1px solid var(--paper-edge);
  padding: 0.5rem 0;
  outline: none;
  transition: border-color 0.4s var(--ease);
}
.field-input::placeholder { color: transparent; }
.field-label {
  position: absolute; left: 0; top: 1.5rem;
  font-family: var(--font-sans); font-size: 1.0625rem;
  color: var(--ink-mute);
  pointer-events: none;
  transition: transform 0.4s var(--ease), color 0.4s var(--ease), font-size 0.4s var(--ease);
}
.field-input:focus,
.field-input:not(:placeholder-shown) {
  border-bottom-color: var(--emerald);
}
.field-input:focus + .field-label,
.field-input:not(:placeholder-shown) + .field-label {
  transform: translateY(-1.5rem);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--emerald);
}
.field-input[aria-invalid="true"] { border-bottom-color: var(--danger); }
.field-input[aria-invalid="true"] + .field-label { color: var(--danger); }
.field-input[disabled] { opacity: 0.4; cursor: not-allowed; }
```

### 4.5 Tag / Eyebrow

```css
.eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--emerald);
}
.eyebrow::before {
  content: ''; width: 24px; height: 1px; background: var(--emerald);
}

.tag {
  display: inline-flex; align-items: center;
  padding: 0.375rem 0.75rem;
  font-family: var(--font-sans); font-size: 0.75rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--emerald);
  background: var(--emerald-tint);
  border: 1px solid transparent;
  border-radius: 4px;
}
.tag:hover { border-color: var(--emerald-soft); }
```

### 4.6 Link inline

```css
.link {
  color: var(--emerald);
  text-decoration: none;
  background-image: linear-gradient(var(--emerald), var(--emerald));
  background-repeat: no-repeat;
  background-size: 100% 1px;
  background-position: 0 100%;
  padding-bottom: 1px;
  transition: background-size 0.5s var(--ease);
}
.link:hover { background-size: 100% 2px; }
.link:focus-visible { outline: 2px solid var(--copper); outline-offset: 3px; border-radius: 2px; }
```

---

## 5. Layout Principles

### Grid & container
```css
:root {
  --container:     1240px;
  --container-pad: clamp(1.25rem, 4vw, 2.5rem);
  --gutter:        clamp(1rem, 2.5vw, 2rem);
}

.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--container-pad); }
.section   { padding-block: clamp(5rem, 12vw, 10rem); }
```

### Spacing scale (rítmica `1.5x`)
```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192
```

Tokens: `--s-1: 4px` … `--s-11: 192px`. Padding interno de cards usa 24/32. Gap entre secciones 96–160.

### Columns
- Hero: `grid-template-columns: 1.1fr 0.9fr` desktop · stack mobile.
- Servicios pin-scrub: `grid-template-columns: 0.4fr 0.6fr` (título fijo izquierda).
- Resultados: 4 columnas asimétricas (1 stat enorme + 3 medianos).
- Equipo: grid de 4 columnas → 2 columnas tablet → 1 columna móvil.

### Container ancho de lectura
Texto largo (descripciones, FAQ): `max-width: 62ch`. Centrado.

### Tracking baseline
Todos los anchos de display alineados a una grilla vertical de 8px. Headings empiezan en múltiplos de 8px desde el top de la sección.

---

## 6. Depth & Elevation

Filosofía: el papel **no flota**, descansa. Sombras nunca son borrosas: son **proyecciones largas y suaves** que sugieren altura mínima.

```css
:root {
  --shadow-paper:    0 1px 0 var(--paper-edge);
  --shadow-card:     0 24px 48px -24px rgba(var(--ink-rgb), 0.12);
  --shadow-card-hover: 0 32px 64px -28px rgba(var(--ink-rgb), 0.22);
  --shadow-overlay:  0 40px 80px -32px rgba(var(--ink-rgb), 0.35);
  --shadow-stamp:    0 2px 0 rgba(var(--copper-rgb), 0.35);
  --ring-focus:      0 0 0 2px var(--paper), 0 0 0 4px var(--copper);
}
```

**Reglas**:
- Nunca usar `box-shadow` con blur > 64px.
- Nunca usar 2 sombras superpuestas en el mismo elemento (excepto focus ring).
- Cards hover suben **4px máximo**.
- Sin neumorfismo. Sin shadows de gradientes.

---

## 7. Animation & Interaction

### Easing & duración
```css
:root {
  --ease:       cubic-bezier(0.22, 1, 0.36, 1);    /* default */
  --ease-cinema: cubic-bezier(0.83, 0, 0.17, 1);   /* pin transitions */
  --ease-paper: cubic-bezier(0.4, 0, 0.2, 1);      /* sutil */
  --dur-fast:   0.35s;
  --dur-base:   0.6s;
  --dur-slow:   1.1s;
}
```

### Dependencias (L3)
```html
<!-- En index.html antes de </body> -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js"></script>
<script type="module" src="https://cdn.jsdelivr.net/npm/ogl@1.0.7/+esm"></script>
```

### Signature moments (6 requeridos por L3)

**1 · Text — Hero H1 (SplitText reveal por línea + mask)**
```js
const split = new SplitText('.hero-title', { type: 'lines', linesClass: 'line-wrap' });
gsap.from(split.lines, {
  yPercent: 110, duration: 1.1, stagger: 0.12, ease: 'expo.out'
});
```
Cada línea tiene `overflow: hidden`; las líneas internas vienen de abajo.

**2 · Text — Section H2 (ScrollFloat: cada palabra entra con leve rotación)**
```js
document.querySelectorAll('.section-title').forEach(el => {
  const split = new SplitText(el, { type: 'words' });
  gsap.from(split.words, {
    scrollTrigger: { trigger: el, start: 'top 80%' },
    y: 40, opacity: 0, rotateZ: 2,
    duration: 0.8, stagger: 0.04, ease: 'expo.out',
  });
});
```

**3 · Text — Body (ScrollReveal char-by-char en el lead paragraph del Hero)**
```js
const lead = new SplitText('.hero-lead', { type: 'chars,words' });
gsap.from(lead.chars, { opacity: 0.15, stagger: 0.012,
  scrollTrigger: { trigger: '.hero-lead', start: 'top 90%', end: 'top 40%', scrub: true }
});
```

**4 · Element — Magnetic CTA + Copper sparkle on click**
```js
// Magnet en todos los .btn-primary, .btn-secondary
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('pointermove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 14;
    gsap.to(btn, { x, y, duration: 0.4, ease: 'power3.out' });
  });
  btn.addEventListener('pointerleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }));
});
// Click spark de cobre (rAF)
btn.addEventListener('click', (e) => spawnSparks(e.clientX, e.clientY, 'var(--copper)'));
```

**5 · Component — Servicios pin-scrub (left title fixed, right swap)**
```js
ScrollTrigger.create({
  trigger: '#servicios',
  start: 'top top',
  end: () => `+=${document.querySelectorAll('.service-panel').length * 80}%`,
  pin: '.servicios-left',
  scrub: 1,
});
// Cada .service-panel hace cross-fade + slight y-shift al entrar viewport
gsap.utils.toArray('.service-panel').forEach((panel, i) => {
  gsap.from(panel, {
    opacity: 0, y: 60,
    scrollTrigger: { trigger: panel, start: 'top 70%', end: 'top 30%', scrub: true }
  });
});
```

**6 · Background — Hero WebGL coin (OGL, 1 escena, IntersectionObserver pausa)**
- Una moneda dorada en bajo-poly (geometría torus) girando lentamente, material con env-map sutil.
- `gl.canvas` con `pointer-events: none`, tamaño 480×480 max, posición absoluta detrás del display-1.
- Pausa con `IntersectionObserver` cuando hero sale de viewport.
- Mobile: degrada a SVG estático de la misma moneda con `@keyframes spin 24s linear infinite`.

### Lenis (smooth scroll)
```js
const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)) });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t*1000));
gsap.ticker.lagSmoothing(0);
```

### Custom cursor (sólo desktop, hover-capable)
```js
if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
  // dot 6px verde + ring 28px outline ink
  // sobre [data-cursor="view"]: ring crece a 64px con label "Ver"
}
```
Móvil: cursor nativo, `body { cursor: auto; }`.

### Marquee
Mantenemos el strip de servicios pero en `--ink-paper` background con `--paper-on-ink` text + dot separador `--copper`. CSS-only `transform: translateX` 40s lineal.

### prefers-reduced-motion (DEGRADACIÓN COMPLETA)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
```js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reduce) {
  lenis.destroy?.();
  ScrollTrigger.getAll().forEach(st => st.kill());
  // WebGL coin → static SVG
  // SplitText → directly visible (gsap.set(target, { opacity: 1, y: 0 }))
}
```

---

## 8. Do's and Don'ts

### Do's
1. **DO** usar Fraunces sólo en H1/H2/H3 y en cifras grandes. Body siempre Inter.
2. **DO** mantener `--copper` para máximo 3 momentos por página. Es el "subrayado de oro" del editor.
3. **DO** dejar respirar: secciones con `padding-block ≥ 96px`. Texto largo con `max-width: 62ch`.
4. **DO** alinear todo a la grilla vertical de 8px. Los bloques de cifras a tabular-nums.
5. **DO** localizar todo el copy a El Salvador: USD, DGII, IVA 13%, ISSS, AFP, DTE, ISR, NIT, NRC, "Ministerio de Hacienda", "anticipo a cuenta".
6. **DO** numerar los servicios (01 → 06) en Fraunces light, alineados al baseline del título.
7. **DO** hacer la sección Equipo en duotone verde + paper; hover revela color real (proporciona warmth).
8. **DO** validar que cada CTA tenga `:focus-visible` con outline cobre.

### Don'ts
1. **DON'T** introducir gradientes en titulares display (sólo `--ink` o `--emerald`). Rompe el "papel".
2. **DON'T** usar emojis ni iconos coloridos. Sólo lucide o lineart monocromo en `--ink` o `--emerald`.
3. **DON'T** mezclar otra serif (Playfair, Cormorant, etc.). Sólo Fraunces.
4. **DON'T** usar glassmorphism oscuro (legado del diseño anterior). El glass que queda es paper-glass (claro semi-translúcido) sobre fondos oscuros puntuales.
5. **DON'T** poner sombras blur > 64px ni neumorfismo. La elevación es discreta.
6. **DON'T** llenar de mesh-orbs o blobs de color en el fondo. El grano de papel es el único patrón ambient.
7. **DON'T** referenciar SAT, IMSS, INFONAVIT, CFDI, CDMX, MXN — todo eso es México. OMC es **salvadoreño**.
8. **DON'T** usar más de 1 escena WebGL en toda la página (la moneda del hero). Cero Three.js complejo, sólo OGL ligero.
9. **DON'T** activar custom cursor en móvil ni en pointer:coarse.
10. **DON'T** olvidar `prefers-reduced-motion`: cada animación L3 debe tener un fallback static.

---

## 9. Responsive Behavior

### Breakpoints
```css
/* mobile-first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md  — tablet portrait */ }
@media (min-width: 1024px) { /* lg  — tablet landscape / small laptop */ }
@media (min-width: 1280px) { /* xl  — desktop */ }
@media (min-width: 1536px) { /* 2xl — large desktop */ }
```

### Folding strategy

| Sección | < 768 | 768–1023 | ≥ 1024 |
|---------|-------|----------|--------|
| Nav | Hamburger fullscreen overlay | Inline 4 items | Inline 7 items + CTA |
| Hero | Stack: título → desc → CTAs → coin abajo | 2 col 60/40, coin más chica | 2 col 55/45 con coin grande WebGL |
| Servicios | Grid 1 col scroll vertical, sin pin | Grid 2 col, sin pin | Pin-scrub título izq / paneles der |
| Resultados | 1 stat grande arriba + 3 abajo en col | 2×2 | 1 enorme + 3 verticales |
| Planes | Stack columnas, plan featured arriba | 2 col + 1 abajo | 3 col paralelas |
| Equipo | 1 col duotone | 2 col | 4 col duotone con hover color |
| FAQ | Acordeón full-width | Acordeón centered 62ch | Acordeón centered 62ch |
| Footer | Stack | 2 col | 4 col |

### Touch targets
- Mínimo 44×44px en todos los botones, enlaces de nav, items de acordeón.
- En móvil, padding vertical de `.btn-primary` sube a `1.125rem`.
- Inputs del formulario: altura mínima 48px con `font-size: 16px` (evita zoom iOS).

### Móvil — degradaciones
- Sin custom cursor.
- Sin pin-scrub (los servicios se vuelven una lista vertical de tarjetas con fade-in stagger).
- WebGL coin → SVG estático girando vía `@keyframes`.
- Lenis sigue activo (mejora UX) pero con `duration: 0.8`.
- Marquee mantiene velocidad pero con menos texto duplicado.

### Imágenes
- `srcset` 1x / 2x para retratos del equipo.
- `loading="lazy"` excepto Hero coin/imagen above-the-fold.
- Aspect ratio fijo en CSS para evitar CLS.

---

## Anexo · Inventario y migración desde diseño actual

**Lo que rescatamos** del sitio actual:
- Estructura de secciones (Hero → Servicios → Nosotros → Resultados → Planes → Testimonios → Equipo → FAQ → Contacto).
- Idea del dashboard fiscal en Hero → se convierte en **moneda WebGL + 1 tarjeta editorial sobria** ("Última declaración: ✓ Al día con DGII").
- Marquee de servicios (cambia a fondo oscuro `--ink-paper`).
- Cards bento de servicios → se vuelven **paneles de papel pin-scrub**.

**Lo que descartamos**:
- Toda la paleta dark + gold actual.
- Fuentes Syne y Space Grotesk.
- Mesh orbs, glow effects, mix-blend-mode difference cursor.
- Iconos Font Awesome → migramos a **Lucide** (lineart monocromo).
- Referencias a SAT, IMSS, CFDI, MXN, CDMX.

**Lo nuevo**:
- Sección "El Ledger" — interludio editorial entre Resultados y Planes con fondo `--ink-paper`, una sola cita en serif, atribución pequeña. Da respiro y signature.
- Sello de cobre en formulario contacto al enviar (sparkle + sound opcional).
- Sección de cumplimiento normativo SV (logos lineart de DGII / ISSS / Ministerio de Hacienda como "garantes").

---

_Última actualización: 2026-06-05 · Nelson Morales · OMC S.A.S. de C.V._

/* ================================================================
   OMC — Main interactions (L3)
   GSAP + ScrollTrigger + Lenis (CDN globals)
   ================================================================ */
(function () {
  'use strict';

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverFine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isTouch = matchMedia('(pointer: coarse)').matches;

  /* ----- Loader ----- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 600);
  });
  // safety
  setTimeout(() => loader && loader.classList.add('is-hidden'), 2400);

  /* ----- Year ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Lenis smooth scroll ----- */
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ----- Anchor links via Lenis ----- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -64, duration: 1.2 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav if open
      navMenu && navMenu.classList.remove('is-open');
      navToggle && (navToggle.classList.remove('is-open'), navToggle.setAttribute('aria-expanded', 'false'));
    });
  });

  /* ----- Navbar scrolled state + active section ----- */
  const nav = document.getElementById('nav');
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = ['inicio','servicios','nosotros','resultados','planes','equipo','faq','contacto']
    .map((id) => document.getElementById(id)).filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 20);

    // Active section
    let activeId = sections[0] && sections[0].id;
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.top <= 120 && r.bottom > 120) { activeId = s.id; break; }
    }
    navLinks.forEach((l) => {
      const ok = l.getAttribute('href') === '#' + activeId;
      l.classList.toggle('is-active', ok);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ----- Mobile nav toggle ----- */
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ----- Custom cursor ----- */
  const cursor = document.getElementById('cursor');
  if (cursor && hoverFine && !reduceMotion) {
    document.body.classList.add('cursor-on');
    let tx = 0, ty = 0, cx = 0, cy = 0;
    document.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
    (function loop() {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('pointerdown', () => cursor.classList.add('is-press'));
    document.addEventListener('pointerup', () => cursor.classList.remove('is-press'));
    document.querySelectorAll('a, button, [data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-view'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-view'));
    });
  }

  /* ----- Magnetic CTAs ----- */
  if (!isTouch && !reduceMotion && window.gsap) {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      const strength = 14;
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength * 2;
        gsap.to(btn, { x, y, duration: 0.4, ease: 'power3.out' });
      });
      btn.addEventListener('pointerleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      });
      btn.addEventListener('click', (e) => spawnSparks(e.clientX, e.clientY));
    });
  }

  /* ----- Copper sparks on click ----- */
  function spawnSparks(x, y) {
    if (reduceMotion) return;
    const n = 9;
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.style.cssText = `
        position: fixed; left: ${x}px; top: ${y}px;
        width: 4px; height: 4px; border-radius: 50%;
        background: var(--copper-light);
        pointer-events: none; z-index: 9998;
        transform: translate(-50%,-50%);
      `;
      document.body.appendChild(s);
      const angle = (Math.PI * 2 * i) / n + Math.random() * 0.4;
      const dist = 36 + Math.random() * 30;
      gsap.to(s, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        opacity: 0,
        scale: 0.2,
        duration: 0.7 + Math.random() * 0.3,
        ease: 'power3.out',
        onComplete: () => s.remove(),
      });
    }
  }

  /* ================================================================
     SCROLL-DRIVEN ANIMATIONS (GSAP + ScrollTrigger)
     ================================================================ */
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* --- Lightweight line-split utility (manual, no SplitText plugin) --- */
    function splitLines(el) {
      const html = el.innerHTML;
      // Wrap each .line child in inner span we can animate
      el.querySelectorAll('.line').forEach((line) => {
        const inner = document.createElement('span');
        inner.className = 'line-inner';
        inner.style.cssText = 'display:block;will-change:transform;';
        while (line.firstChild) inner.appendChild(line.firstChild);
        line.style.cssText = 'display:block;overflow:hidden;';
        line.appendChild(inner);
      });
      return el.querySelectorAll('.line-inner');
    }
    function splitWords(el) {
      const text = el.textContent;
      el.textContent = '';
      const parts = text.split(/(\s+)/);
      const words = [];
      parts.forEach((p) => {
        if (/^\s+$/.test(p)) {
          el.appendChild(document.createTextNode(p));
        } else if (p.length) {
          const w = document.createElement('span');
          w.className = 'w';
          w.textContent = p;
          w.style.cssText = 'display:inline-block;will-change:transform,opacity;';
          el.appendChild(w);
          words.push(w);
        }
      });
      return words;
    }

    /* 1 · Hero H1 — line stagger reveal */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      const lines = splitLines(heroTitle);
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.4,
      });
    }

    /* Hero supporting reveals */
    gsap.from('.hero .eyebrow, .hero-lead, .hero-actions, .hero-meta, .hero-card', {
      opacity: 0, y: 24,
      duration: 1, stagger: 0.12, ease: 'expo.out',
      delay: 0.9,
    });

    /* 2 · Section H2 — word-by-word stagger */
    document.querySelectorAll('.section-title').forEach((el) => {
      if (el.closest('.hero')) return;
      const words = splitWords(el);
      gsap.set(words, { yPercent: 60, opacity: 0 });
      gsap.to(words, {
        yPercent: 0, opacity: 1,
        duration: 0.85, stagger: 0.04, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 82%' },
      });
    });

    /* Generic reveals: section-lead, .eyebrow not in hero */
    gsap.utils.toArray('.section-lead, .about-stats > div, .results-grid > article, .plan, .team-card, .faq-item, .contact-list > div, .contact-form').forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 30,
        duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    });

    /* 3 · Ledger quote — char-by-char scrub */
    const ledgerChars = document.querySelector('.reveal-chars');
    if (ledgerChars) {
      const text = ledgerChars.textContent.trim();
      ledgerChars.textContent = '';
      const charSpans = [];
      for (const ch of text) {
        const s = document.createElement('span');
        s.textContent = ch;
        s.style.cssText = 'display:inline; will-change:opacity;';
        ledgerChars.appendChild(s);
        if (ch.trim().length) charSpans.push(s);
      }
      gsap.fromTo(charSpans,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.018,
          ease: 'none',
          scrollTrigger: {
            trigger: '.ledger',
            start: 'top 78%',
            end: 'bottom 30%',
            scrub: true,
          },
        }
      );
    }

    /* 5 · Servicios pin-scrub — title left fixed, panels scroll */
    const servicesSection = document.getElementById('servicios');
    const servicesLeft = document.querySelector('.services-left-inner');
    const panels = gsap.utils.toArray('.service-panel');
    if (servicesSection && servicesLeft && panels.length && window.innerWidth >= 1025) {
      // Title gets pinned by sticky CSS; we add scrub fades to each panel
      panels.forEach((panel, i) => {
        gsap.fromTo(panel,
          { opacity: 0.3, y: 60 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.8,
            },
          }
        );
        // Subtle number scale-in
        const num = panel.querySelector('.service-num');
        if (num) {
          gsap.fromTo(num,
            { letterSpacing: '-0.1em', opacity: 0 },
            {
              letterSpacing: '-0.04em', opacity: 1,
              duration: 0.6,
              scrollTrigger: { trigger: panel, start: 'top 75%' },
            }
          );
        }
      });
    } else if (servicesSection && panels.length) {
      // Mobile: simple reveal
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0, y: 24,
          duration: 0.7, ease: 'expo.out',
          scrollTrigger: { trigger: panel, start: 'top 90%' },
        });
      });
    }

    /* Big-number scrubs (results-grid) */
    gsap.utils.toArray('.result-num, .result-hero-num, .stat').forEach((el) => {
      gsap.from(el, {
        opacity: 0, y: 40,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      });
    });

    /* Hero coin gentle parallax */
    gsap.to('.coin-stage', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  } else {
    // reduced motion: make sure splits/hidden elements are visible
    document.querySelectorAll('.line').forEach((l) => { l.style.overflow = 'visible'; });
  }

  /* ================================================================
     FAQ accordion
     ================================================================ */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Set max-height to content scroll height for accurate animation
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
    });
  });

  /* ================================================================
     Contact form — fake submit + copper stamp
     ================================================================ */
  const form = document.getElementById('contactForm');
  const stamp = document.getElementById('contactStamp');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach((f) => {
        if (!f.value.trim()) {
          f.setAttribute('aria-invalid', 'true');
          ok = false;
        } else {
          f.removeAttribute('aria-invalid');
        }
      });
      if (!ok) return;

      // Stamp animation
      if (stamp) {
        stamp.classList.add('is-on');
        // Sparks at stamp center
        const r = stamp.getBoundingClientRect();
        spawnSparks(r.left + r.width / 2, r.top + r.height / 2);
      }
      const submit = form.querySelector('.contact-submit');
      if (submit) {
        submit.innerHTML = '<span>Solicitud recibida</span>';
        submit.setAttribute('disabled', 'true');
      }
      // TODO: enviar a backend real (mailto, formspree, supabase, etc.)
    });

    form.querySelectorAll('.field-input').forEach((f) => {
      f.addEventListener('input', () => f.removeAttribute('aria-invalid'));
    });
  }
})();

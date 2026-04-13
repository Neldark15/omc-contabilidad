/* ================================================================
   OMC S.A.S De C.V — Advanced Interactions
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============= LOADER =============
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1800);
  });
  // Fallback
  setTimeout(() => loader.classList.add('hidden'), 3000);

  // ============= CUSTOM CURSOR =============
  const cursor = document.getElementById('cursor');
  const cursorGlow = document.getElementById('cursorGlow');
  let cursorX = 0, cursorY = 0, glowX = 0, glowY = 0;

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    function animateCursor() {
      glowX += (cursorX - glowX) * 0.12;
      glowY += (cursorY - glowY) * 0.12;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    document.querySelectorAll('a, button, .bento-card, .faq-question, .team-member, .price-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        cursor.style.background = 'transparent';
        cursor.style.border = '1px solid var(--gold)';
        cursorGlow.style.width = '60px';
        cursorGlow.style.height = '60px';
        cursorGlow.style.borderColor = 'rgba(212,168,83,0.4)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = 'var(--gold)';
        cursor.style.border = 'none';
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
        cursorGlow.style.borderColor = 'rgba(212,168,83,0.3)';
      });
    });
  }

  // ============= NAVBAR =============
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNav();
    updateScrollLine();
  });

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  // Mobile menu
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // ============= SCROLL LINE (Hero) =============
  function updateScrollLine() {
    const line = document.getElementById('scrollLine');
    if (!line) return;
    const heroH = document.querySelector('.hero')?.offsetHeight || 1;
    const pct = Math.min(window.scrollY / heroH, 1);
    line.style.height = (pct * 100) + '%';
  }

  // ============= REVEAL ON SCROLL =============
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));

  // Stagger children reveals
  document.querySelectorAll('.services-bento .bento-card, .team-cards .team-member, .pricing-cards .price-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
    el.classList.add('reveal-text');
    revealObserver.observe(el);
  });

  // ============= COUNTER ANIMATION =============
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.dataset.animated) return;
        el.dataset.animated = 'true';
        const target = parseInt(el.dataset.count);
        const duration = 2200;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.floor(target * ease).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = target.toLocaleString();
        }
        requestAnimationFrame(update);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  // Stat bars animation
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.stat-fill');
        if (fill) {
          const w = fill.style.width;
          fill.style.width = '0';
          setTimeout(() => { fill.style.width = w; }, 200);
        }
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-block').forEach(el => barObserver.observe(el));

  // ============= ROTATING WORDS =============
  const wordsContainer = document.getElementById('rotatingWords');
  if (wordsContainer) {
    const words = wordsContainer.querySelectorAll('.word');
    let wordIdx = 0;
    setInterval(() => {
      words[wordIdx].classList.remove('active');
      wordIdx = (wordIdx + 1) % words.length;
      words[wordIdx].classList.add('active');
    }, 2800);
  }

  // ============= TESTIMONIAL SLIDER =============
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsC = document.getElementById('sliderDots');

  if (track) {
    const cards = track.querySelectorAll('.testi-card');
    let idx = 0;

    function perView() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function totalSlides() { return Math.max(1, cards.length - perView() + 1); }

    function buildDots() {
      dotsC.innerHTML = '';
      for (let i = 0; i < totalSlides(); i++) {
        const d = document.createElement('div');
        d.classList.add('slider-dot');
        if (i === 0) d.classList.add('active');
        d.addEventListener('click', () => goTo(i));
        dotsC.appendChild(d);
      }
    }

    function goTo(i) {
      idx = Math.max(0, Math.min(i, totalSlides() - 1));
      const gap = 20;
      const cardW = cards[0].offsetWidth + gap;
      track.style.transform = `translateX(-${idx * cardW}px)`;
      dotsC.querySelectorAll('.slider-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
    }

    prevBtn.addEventListener('click', () => goTo(idx - 1));
    nextBtn.addEventListener('click', () => goTo(idx + 1));
    buildDots();
    window.addEventListener('resize', () => { buildDots(); goTo(Math.min(idx, totalSlides() - 1)); });

    // Auto-slide
    let auto = setInterval(() => goTo(idx >= totalSlides() - 1 ? 0 : idx + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => {
      auto = setInterval(() => goTo(idx >= totalSlides() - 1 ? 0 : idx + 1), 5000);
    });
  }

  // ============= FAQ ACCORDION =============
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ============= PRICING TOGGLE =============
  const pToggle = document.getElementById('pricingToggle');
  if (pToggle) {
    pToggle.addEventListener('change', () => {
      const isAnnual = pToggle.checked;
      document.querySelectorAll('.price-monthly').forEach(el => el.style.display = isAnnual ? 'none' : 'block');
      document.querySelectorAll('.price-annual').forEach(el => el.style.display = isAnnual ? 'block' : 'none');
    });
  }

  // ============= CONTACT FORM =============
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Enviando...</span>';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<span><i class="fas fa-check"></i> Enviado</span>';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.style.background = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ============= MAGNETIC BUTTONS =============
  if (window.innerWidth > 768) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ============= MESH ORB PARALLAX =============
  if (window.innerWidth > 768) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.querySelectorAll('.mesh-orb').forEach((orb, i) => {
        const speed = (i + 1) * 12;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  // ============= PROCESS STEPS ACTIVATION =============
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = document.querySelectorAll('.p-step');
        steps.forEach((step, i) => {
          setTimeout(() => step.classList.add('active'), i * 300);
        });
        const progress = document.getElementById('processProgress');
        if (progress) {
          let w = 0;
          const interval = setInterval(() => {
            w += 2;
            progress.style.width = w + '%';
            if (w >= 100) clearInterval(interval);
          }, 30);
        }
        processObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const processSection = document.querySelector('.process-horizontal');
  if (processSection) processObserver.observe(processSection);

  // ============= TILT EFFECT ON CARDS =============
  if (window.innerWidth > 768) {
    document.querySelectorAll('.dash-main, .bento-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
      });
    });
  }

});

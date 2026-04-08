/* ========== OMC S.A.S De C.V - Main JavaScript ========== */

document.addEventListener('DOMContentLoaded', () => {

  // ========== NAVBAR SCROLL ==========
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ========== MOBILE MENU ==========
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

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

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========== COUNTER ANIMATION ==========
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        counter.dataset.animated = 'true';
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.floor(target * ease).toLocaleString();
          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = target.toLocaleString();
        }
        requestAnimationFrame(update);
      }
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ========== AOS (Animate On Scroll) ==========
  function handleAOS() {
    document.querySelectorAll('[data-aos]').forEach(el => {
      const rect = el.getBoundingClientRect();
      const delay = parseInt(el.dataset.aosDelay || 0);
      if (rect.top < window.innerHeight * 0.88) {
        setTimeout(() => el.classList.add('visible'), delay);
      }
    });
  }

  window.addEventListener('scroll', handleAOS);
  handleAOS();

  // ========== TESTIMONIAL SLIDER ==========
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('sliderDots');

  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    function getCardsPerView() {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 1024) return 2;
      return 3;
    }

    function getTotalSlides() {
      return Math.max(1, cards.length - cardsPerView + 1);
    }

    function createDots() {
      dotsContainer.innerHTML = '';
      const total = getTotalSlides();
      for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function goToSlide(index) {
      const total = getTotalSlides();
      currentIndex = Math.max(0, Math.min(index, total - 1));
      const cardWidth = cards[0].offsetWidth + 24;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      document.querySelectorAll('.slider-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    createDots();

    window.addEventListener('resize', () => {
      cardsPerView = getCardsPerView();
      createDots();
      goToSlide(Math.min(currentIndex, getTotalSlides() - 1));
    });

    // Auto-slide
    let autoSlide = setInterval(() => {
      const total = getTotalSlides();
      goToSlide(currentIndex >= total - 1 ? 0 : currentIndex + 1);
    }, 5000);

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        const total = getTotalSlides();
        goToSlide(currentIndex >= total - 1 ? 0 : currentIndex + 1);
      }, 5000);
    });
  }

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }

  // ========== FAQ ACCORDION ==========
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ========== PRICING TOGGLE ==========
  const pricingToggle = document.getElementById('pricingToggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('change', () => {
      const monthly = document.querySelectorAll('.price-monthly');
      const annual = document.querySelectorAll('.price-annual');
      const isAnnual = pricingToggle.checked;
      monthly.forEach(el => el.style.display = isAnnual ? 'none' : 'block');
      annual.forEach(el => el.style.display = isAnnual ? 'block' : 'none');
    });
  }

  // ========== TYPING EFFECT (Hero) ==========
  const typingEl = document.querySelector('.typing-text');
  if (typingEl) {
    const words = JSON.parse(typingEl.dataset.words || '[]');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = words[wordIndex];
      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex--);
      } else {
        typingEl.textContent = current.substring(0, charIndex++);
      }

      let delay = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === current.length + 1) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 500;
      }

      setTimeout(typeEffect, delay);
    }

    if (words.length) typeEffect();
  }

  // ========== PARALLAX on shapes ==========
  window.addEventListener('mousemove', e => {
    const shapes = document.querySelectorAll('.shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 8;
      shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

});

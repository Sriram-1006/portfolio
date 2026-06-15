// ===================================
// PORTFOLIO — INTERACTIVITY
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cursor Glow ----
  const glow = document.getElementById('cursorGlow');
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  } else if (glow) {
    glow.style.display = 'none';
  }

  // ---- Navbar Scroll ----
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Active Nav Link ----
  const sections  = document.querySelectorAll('.section, .hero');
  const navLinks  = document.querySelectorAll('.nav-link');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));

  // ---- Mobile Nav Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinksEl = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  // ---- Typewriter Effect ----
  const phrases = [
    'beautiful web experiences.',
    'performant applications.',
    'stunning user interfaces.',
    'scalable solutions.',
    'delightful interactions.'
  ];
  const typeEl = document.getElementById('typewriter');
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      typeEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      setTimeout(type, 60);
    } else {
      typeEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  setTimeout(type, 1200);

  // ---- Counter Animation ----
  const stats = document.querySelectorAll('.stat');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const numEl  = el.querySelector('.stat-number');
        let current  = 0;
        const step   = Math.max(1, Math.ceil(target / 50));
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          numEl.textContent = current;
        }, 30);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => countObserver.observe(s));

  // ---- Skill Bar Animation ----
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(f => skillObserver.observe(f));

  // ---- Scroll Reveal ----
  const revealEls = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .contact-method, .about-text, .about-image, .contact-form'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // ---- Staggered Reveal ----
  document.querySelectorAll('.skills-grid, .projects-grid').forEach(grid => {
    const items = grid.children;
    Array.from(items).forEach((item, i) => {
      item.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  // ---- Project Filter ----
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeUp 0.5s var(--ease-out-expo) forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ---- Hero Particle Field ----
  const particleContainer = document.getElementById('heroParticles');
  const particleCount = window.innerWidth < 768 ? 30 : 60;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    Object.assign(p.style, {
      position:        'absolute',
      width:           size + 'px',
      height:          size + 'px',
      borderRadius:    '50%',
      background:      Math.random() > 0.5
        ? 'rgba(102, 126, 234, ' + (Math.random() * 0.4 + 0.1) + ')'
        : 'rgba(118, 75, 162, ' + (Math.random() * 0.4 + 0.1) + ')',
      left:            Math.random() * 100 + '%',
      top:             Math.random() * 100 + '%',
      animation:       'particleFloat ' + (Math.random() * 10 + 8) + 's ease-in-out infinite',
      animationDelay:  -(Math.random() * 10) + 's',
    });
    particleContainer.appendChild(p);
  }
  // Inject particle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0%, 100% { transform: translate(0, 0) scale(1);   opacity: 0.6; }
      25%      { transform: translate(30px, -40px) scale(1.2); opacity: 1; }
      50%      { transform: translate(-20px, -80px) scale(0.8); opacity: 0.4; }
      75%      { transform: translate(40px, -30px) scale(1.1); opacity: 0.9; }
    }
  `;
  document.head.appendChild(style);

  // ---- Contact Form ----
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<span>Sent! ✨</span>';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    showToast('Message sent successfully! I\'ll get back to you soon.');
    setTimeout(() => {
      form.reset();
      btn.innerHTML = `<span>Send Message</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 2-7 20-4-9-9-4z"/><path d="m22 2-11 11"/></svg>`;
      btn.disabled = false;
      btn.style.opacity = '1';
    }, 3000);
  });

  // ---- Toast Notification ----
  function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.classList.add('visible');
      setTimeout(() => toast.classList.remove('visible'), 3500);
    });
  }

  // ---- Smooth scroll for CTA buttons ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Hide scroll indicator on scroll ----
  const scrollInd = document.getElementById('scrollIndicator');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      scrollInd.style.opacity = '0';
    } else {
      scrollInd.style.opacity = '';
    }
  }, { passive: true });

});

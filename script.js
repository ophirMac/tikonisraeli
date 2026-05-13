'use strict';

// ── Ticket URL ──────────────────────────────────────────────────────────────
const TICKETS_URL = 'https://www.google.com';

// ── Scroll reveal via IntersectionObserver ──────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger siblings inside the same grid
  el.style.setProperty('--i', i % 6);
  revealObserver.observe(el);
});

// ── Back-to-top button ──────────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
const ticketsFloat = document.getElementById('ticketsFloat');

document.querySelectorAll('.btn-tickets, .btn-tickets-float').forEach(el => {
  el.href = TICKETS_URL;
});

const toggleBackToTop = () => {
  const past = window.scrollY > 500;
  backToTop.classList.toggle('visible', past);
  ticketsFloat.classList.toggle('visible', past);
};

window.addEventListener('scroll', toggleBackToTop, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Parallax on hero divider stripes ───────────────────────────────────────
const heroDivider = document.querySelector('.hero-divider');
const heroSection = document.querySelector('.hero');

if (heroDivider && heroSection && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  const onScroll = () => {
    const scrolled = window.scrollY;
    const heroH = heroSection.offsetHeight;
    if (scrolled < heroH) {
      const parallaxY = scrolled * 0.18;
      heroDivider.style.transform = `translateY(${parallaxY}px)`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ── Smooth scroll for any in-page anchor links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

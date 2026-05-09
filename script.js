gsap.registerPlugin(ScrollTrigger);

/* ===== LOADER ===== */
const loader = document.querySelector('.loader');
const loaderBar = document.querySelector('.loader-bar span');
let progress = 0;
const loaderInterval = setInterval(() => {
  progress += Math.random() * 15 + 8;
  if (progress >= 100) { progress = 100; clearInterval(loaderInterval); }
  loaderBar.style.width = progress + '%';
  if (progress >= 100) {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0, duration: 0.8, ease: 'power2.inOut',
        onComplete: () => { loader.style.display = 'none'; document.body.style.overflow = ''; startHeroAnimation(); }
      });
    }, 300);
  }
}, 160);
document.body.style.overflow = 'hidden';

/* ===== HERO ENTRANCE ===== */
function startHeroAnimation() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.hero-badge', { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
    .from('.split-text .line span', { y: 140, opacity: 0, rotationX: -60, duration: 1.4, stagger: 0.12 }, '-=0.5')
    .from('.hero-sub', { y: 40, opacity: 0, duration: 1 }, '-=0.8')
    .from('.hero-cta', { y: 40, opacity: 0, scale: 0.85, duration: 1, ease: 'back.out(1.8)' }, '-=0.6')
    .from('.scroll-indicator', { opacity: 0, y: 30, duration: 0.8 }, '-=0.3')
    .fromTo('.hero-bg-text', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, '-=1.5');
}

/* ===== CURSOR ===== */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mx = 0, my = 0;
if (window.matchMedia('(pointer: fine)').matches) {
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animCursor() {
    if (dot) gsap.set(dot, { x: mx - 4, y: my - 4 });
    if (ring) gsap.to(ring, { x: mx - 20, y: my - 20, duration: 0.5, ease: 'power3.out' });
    requestAnimationFrame(animCursor);
  })();
  document.querySelectorAll('a, button, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
  });
}

/* ===== NAV ===== */
const nav = document.querySelector('.nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
  lastScroll = window.scrollY;
});
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
hamburger.addEventListener('click', () => { mobileMenu.classList.toggle('active'); });
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('active')));

/* ===== HERO PARALLAX ===== */
gsap.to('.hero-bg-text', { y: -150, scale: 1.4, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
gsap.to('#heroCanvas', { opacity: 0, scrollTrigger: { trigger: '.hero', start: '50% top', end: 'bottom top', scrub: 1 } });

/* ===== PARTICLE CANVAS ===== */
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
let W, H;
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize(); window.addEventListener('resize', resize);
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.size = Math.random() * 1.8 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.08;
  }
  update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset(); }
  draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(20,184,166,${this.opacity})`; ctx.fill(); }
}
const particles = Array.from({ length: 90 }, () => new Particle());
function drawLines() {
  for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
    const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
    if (d < 130) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.strokeStyle = `rgba(20,184,166,${0.05 * (1 - d / 130)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
  }
}
(function animate() { ctx.clearRect(0, 0, W, H); particles.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(animate); })();

/* ===== MARQUEE ===== */
gsap.to('.marquee-track', { x: '-50%', duration: 25, ease: 'none', repeat: -1 });

/* ===== SECTION ANIMATIONS ===== */
// About
gsap.from('.about-visual', { x: -120, opacity: 0, rotation: -3, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: '#about', start: 'top 75%' } });
gsap.from('.about-text .section-label', { x: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: '#about', start: 'top 70%' } });
gsap.from('.about-text .section-title', { y: 50, opacity: 0, duration: 1, scrollTrigger: { trigger: '#about', start: 'top 65%' } });
gsap.from('.about-text .section-desc', { y: 40, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '#about', start: 'top 60%' } });
gsap.from('.about-float', { scale: 0, opacity: 0, rotation: 10, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: '#about', start: 'top 50%' } });
gsap.from('.stat', { y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.about-stats', start: 'top 85%' } });

// Services
gsap.from('#services .section-label, #services .section-title, #services .section-desc', { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: '#services', start: 'top 72%' } });
gsap.from('.service-card', { y: 100, opacity: 0, scale: 0.92, stagger: 0.1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.services-grid', start: 'top 78%' } });

// Projects
gsap.from('#projects .section-label, #projects .section-title, #projects .section-desc', { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: '#projects', start: 'top 72%' } });
document.querySelectorAll('.project-card').forEach((card, i) => {
  gsap.from(card, {
    y: 120, opacity: 0, rotation: i % 2 === 0 ? -2 : 2,
    duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 85%' }
  });
});

// Process
gsap.from('#process .section-label, #process .section-title, #process .section-desc', { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: '#process', start: 'top 72%' } });
gsap.from('.process-step', { y: 80, opacity: 0, scale: 0.9, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.process-timeline', start: 'top 78%' } });

// Testimonial
gsap.from('#testimonials .section-label, #testimonials .section-title', { y: 50, opacity: 0, stagger: 0.1, duration: 0.9, scrollTrigger: { trigger: '#testimonials', start: 'top 72%' } });
gsap.from('.testimonial-card', { y: 80, opacity: 0, scale: 0.92, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.testimonial-card', start: 'top 82%' } });

// Contact
gsap.from('#contact .section-label, #contact .section-title, #contact .section-desc', { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, scrollTrigger: { trigger: '#contact', start: 'top 72%' } });
gsap.from('.contact-form', { y: 80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-form', start: 'top 88%' } });

// Footer
gsap.from('.footer', { y: 30, opacity: 0, duration: 0.8, scrollTrigger: { trigger: '.footer', start: 'top 95%' } });

/* ===== COUNTERS ===== */
const counters = document.querySelectorAll('.stat-num[data-target]');
ScrollTrigger.create({
  trigger: '.about-stats', start: 'top 90%',
  onEnter: () => {
    counters.forEach(c => {
      const target = +c.dataset.target, suffix = c.dataset.suffix || '';
      gsap.to({ v: 0 }, { v: target, duration: 2.2, ease: 'power2.out', onUpdate() { c.textContent = Math.floor(this.targets()[0].v) + suffix; } });
    });
  }, once: true
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.hero-cta, .submit-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    gsap.to(btn, { x: (e.clientX - r.left - r.width/2) * 0.2, y: (e.clientY - r.top - r.height/2) * 0.2, duration: 0.3 });
  });
  btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }));
});

/* ===== TILT CARDS ===== */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    gsap.to(card, { rotateY: ((e.clientX - r.left)/r.width - 0.5) * 10, rotateX: -((e.clientY - r.top)/r.height - 0.5) * 10, transformPerspective: 800, duration: 0.4 });
  });
  card.addEventListener('mouseleave', () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power2.out' }));
});

/* ===== SERVICE GLOW ===== */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', (e.clientX - r.left) + 'px');
    card.style.setProperty('--glow-y', (e.clientY - r.top) + 'px');
  });
});

/* ===== SMOOTH ANCHORS ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => { e.preventDefault(); const t = document.querySelector(a.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
});

/* ===== PARALLAX SECTIONS ===== */
document.querySelectorAll('.about-img, .testimonial-card').forEach(el => {
  gsap.to(el, { y: -30, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 } });
});

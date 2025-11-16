
(() => {
  // helpers
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = $('#menuBtn');
    const mainNav = $('#mainNav');
    const themeToggle = $('#themeToggle');
    const btnTop = $('#btnTop');
    const contactForm = $('#contactForm');

    // -- MENU HAMBURGUESA RESPONSIVE --
    if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
        const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!expanded));
        mainNav.classList.toggle('open');
    });
    }

    // -- THEME (persistente) --
    const storageKey = 'dronex_theme';
    const saved = localStorage.getItem(storageKey);
    if (saved === 'light') document.body.classList.add('light-mode');
    if (themeToggle) {
      // reflect current state
    themeToggle.setAttribute('aria-pressed', document.body.classList.contains('light-mode'));
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        themeToggle.setAttribute('aria-pressed', isLight);
        themeToggle.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem(storageKey, isLight ? 'light' : 'dark');
    });
    }

    // -- INTERSECTION OBSERVER PARA ANIMACIONES --
    const animTargets = $$('.fade-in, .slide-up');
    if (animTargets.length) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            // opcional: dejar de observar para performance
            obs.unobserve(e.target);
        }
        });
    }, { threshold: 0.25 });
    animTargets.forEach(t => obs.observe(t));
    }

    // -- BOTÓN VOLVER ARRIBA --
    const toggleBackToTop = () => {
    if (window.scrollY > 360) btnTop.style.display = 'block';
    else btnTop.style.display = 'none';
    };
    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();
    if (btnTop) btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // -- FORMULARIO: VALIDACIÓN Y FEEDBACK (simulado) --
    if (contactForm) {
    contactForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const feedback = $('#formFeedback') || document.createElement('p');
        // HTML5 validity check
        if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        if (!$('#formFeedback')) {
            feedback.id = 'formFeedback';
            feedback.className = 'form-feedback';
            contactForm.appendChild(feedback);
        }
        feedback.textContent = 'Por favor completa correctamente los campos obligatorios.';
        return;
        }
        // Simular envío (aquí conectarías con tu backend)
        feedback.textContent = 'Enviando mensaje...';
        setTimeout(() => {
        feedback.textContent = 'Mensaje enviado. Gracias — te contactaremos pronto.';
        contactForm.reset();
        }, 900);
    });
    }

    // Accessibility: close nav on resize if needed
    window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    }
    });
});
})();

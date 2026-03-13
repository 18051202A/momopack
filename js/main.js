/* ─────────────────────────────────────────────
   MomoPack — Main JavaScript
   ───────────────────────────────────────────── */

/* ── Page Loader ─────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 700);

  // Hero bg zoom-out animate in
  const heroBg = document.getElementById('heroBg');
  setTimeout(() => heroBg.classList.add('loaded'), 100);
});

/* ── Navbar: scroll state & active link ──────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  updateActiveNav();
}, { passive: true });

function updateActiveNav() {
  const sections = ['hero', 'products', 'about', 'whyus', 'certifications', 'inquiry'];
  const links    = document.querySelectorAll('.nav-links a');
  let current    = 'hero';

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── Mobile menu ─────────────────────────────── */
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () =>
    document.getElementById('navLinks').classList.remove('open')
  )
);

/* ── Scroll reveal (Intersection Observer) ────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Hero parallax on scroll ─────────────────── */
const heroBg = document.getElementById('heroBg');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y < window.innerHeight) {
    heroBg.style.transform = `translateY(${y * 0.3}px)`;
  }
}, { passive: true });

/* ── Category card → pre-fill inquiry form ───── */
document.querySelectorAll('.cat-card:not(.cat-card--soon)').forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't intercept clicks on the CTA button itself (it already links to #inquiry)
    if (e.target.closest('.cat-cta-btn')) return;

    const name = card.querySelector('.cat-name').textContent;
    document.getElementById('inquiry').scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      const productSelect = document.querySelector('select[name="product"]');
      const msgField      = document.querySelector('textarea[name="message"]');

      // Try to match the category name to a select option
      if (productSelect) {
        Array.from(productSelect.options).forEach(opt => {
          if (opt.text.toLowerCase().includes(name.toLowerCase().split(' ')[0])) {
            productSelect.value = opt.value;
          }
        });
      }

      if (msgField && !msgField.value) {
        msgField.value = `I am interested in the "${name}" category and would like to receive a quotation.`;
      }
    }, 800);
  });
});

/* ── Certifications lightbox ─────────────────── */
(function () {
  const lightbox   = document.getElementById('certLightbox');
  const lbImg      = document.getElementById('lightboxImg');
  const lbCaption  = document.getElementById('lightboxCaption');
  const lbClose    = document.getElementById('lightboxClose');
  const lbBackdrop = document.getElementById('lightboxBackdrop');
  const lbPrev     = document.getElementById('lightboxPrev');
  const lbNext     = document.getElementById('lightboxNext');

  const cards = Array.from(document.querySelectorAll('.cert-card'));
  let current = 0;

  function openAt(index) {
    current = index;
    const card    = cards[current];
    const src     = card.dataset.cert;
    const caption = card.querySelector('.cert-name').textContent;

    lbImg.src        = src;
    lbCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { openAt((current - 1 + cards.length) % cards.length); }
  function next() { openAt((current + 1) % cards.length); }

  cards.forEach((card, i) => card.addEventListener('click', () => openAt(i)));

  lbClose.addEventListener('click', close);
  lbBackdrop.addEventListener('click', close);
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); next(); });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });
})();

/* ── Language selector ───────────────────────── */
(function () {
  const langSelector = document.getElementById('langSelector');
  const langBtn      = document.getElementById('langBtn');
  const langCurrent  = document.getElementById('langCurrent');
  if (!langBtn) return;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = langSelector.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      langCurrent.textContent = opt.dataset.code;
      langSelector.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!langSelector.contains(e.target)) {
      langSelector.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      langSelector.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── Inquiry form submit ─────────────────────── */
document.getElementById('inquiryForm').addEventListener('submit', function (e) {
  e.preventDefault();
  this.style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
});

// ================================
// NAVBAR – Scroll effect
// ================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ================================
// NAVBAR – Menu burger mobile
// ================================
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

if (burger) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
  });

  // Fermer le menu en cliquant sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('active');
    });
  });
}

// ================================
// ANIMATIONS – Apparition au scroll
// ================================
const fadeElements = document.querySelectorAll('.fade-in');

const appearObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      appearObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => appearObserver.observe(el));

// ================================
// COMPTEUR ANIMÉ
// ================================
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const isPercent = el.nextElementSibling?.textContent.includes('%');

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + (isPercent ? '' : '+');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (isPercent ? '' : '+');
    }
  }, 16);
}

const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ================================
// FORMULAIRE CONTACT – Validation
// ================================
function envoyerMessage() {
  const nom = document.getElementById('nom');
  const email = document.getElementById('email');
  const sujet = document.getElementById('sujet');
  const message = document.getElementById('message');
  const successMsg = document.getElementById('successMsg');
  const errorMsg = document.getElementById('errorMsg');

  if (!nom || !email || !sujet || !message) return;

  // Reset
  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';
  [nom, email, sujet, message].forEach(el => el.style.borderColor = '');

  let valid = true;

  if (!nom.value.trim()) { nom.style.borderColor = '#ef4444'; valid = false; }
  if (!email.value.trim() || !email.value.includes('@')) { email.style.borderColor = '#ef4444'; valid = false; }
  if (!sujet.value) { sujet.style.borderColor = '#ef4444'; valid = false; }
  if (!message.value.trim()) { message.style.borderColor = '#ef4444'; valid = false; }

  if (valid) {
    successMsg.style.display = 'flex';
    [nom, email, message].forEach(el => el.value = '');
    sujet.value = '';
    setTimeout(() => successMsg.style.display = 'none', 5000);
  } else {
    errorMsg.style.display = 'flex';
    setTimeout(() => errorMsg.style.display = 'none', 4000);
  }
}

// ================================
// BURGER – Animation des barres
// ================================
const style = document.createElement('style');
style.textContent = `
  .burger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .burger.active span:nth-child(2) {
    opacity: 0;
    transform: translateX(-10px);
  }
  .burger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;
document.head.appendChild(style);

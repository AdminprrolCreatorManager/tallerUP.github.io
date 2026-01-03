// VOID GARAGE — Cinematic Core
console.log("Void Garage: Precision loaded. Cinematic animations active.");

// === NAVBAR SHRINK ON SCROLL ===
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    document.body.classList.remove('scrolled');
    return;
  }

  if (currentScroll > lastScroll && currentScroll > 80) {
    document.body.classList.add('scrolled');
  } else if (currentScroll < lastScroll && currentScroll < 80) {
    document.body.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// === SMOOTH ANCHOR SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// === DROPDOWN TOGGLE ===
const dropdown = document.querySelector('.nav-dropdown');
const toggle = document.querySelector('.dropdown-toggle');

if (toggle) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

// === SCROLL ANIMATIONS (DUAL SERVICES + SERVICES GRID) ===
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('service-image')) {
          entry.target.classList.add('animate');
        }
        if (entry.target.classList.contains('services-section')) {
          const items = entry.target.querySelectorAll('.services-column, .section-title');
          items.forEach((item, i) => {
            item.style.opacity = '1';
          });
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-image').forEach(img => observer.observe(img));
  document.querySelectorAll('.services-section').forEach(section => observer.observe(section));
});

// === FIXED TESTIMONIAL CAROUSEL ===
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const totalItems = 3;
  let currentIndex = 0;

  // Auto-rotate every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalItems;
    // Move carousel to next item (33.33% per item)
    carousel.style.transform = `translateX(-${currentIndex * 33.33}%)`;
  }, 5000);
});

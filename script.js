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

  const totalItems = 4; // 4 items for seamless loop
  let currentIndex = 0;

  // Auto-rotate every 5 seconds
  setInterval(() => {
    currentIndex++;
    if (currentIndex >= totalItems) {
      // Jump back to start without animation for seamless loop
      carousel.style.transition = 'none';
      carousel.style.transform = 'translateX(0)';
      setTimeout(() => {
        carousel.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        currentIndex = 1;
        carousel.style.transform = `translateX(-25%)`;
      }, 20);
    } else {
      carousel.style.transform = `translateX(-${currentIndex * 25}%)`;
    }
  }, 5000);
});

// === BACK TO TOP BUTTON ===
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  // Calculate when to show: just below the hero section
  const heroSection = document.querySelector('.hero');
  const triggerOffset = heroSection ? heroSection.offsetHeight + heroSection.offsetTop : 600;

  window.addEventListener('scroll', () => {
    if (window.scrollY > triggerOffset) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

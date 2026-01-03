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
      const offsetTop = target.offsetTop - 80; // compensates for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// === DROPDOWN TOGGLE (MOBILE + DESKTOP) ===
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

// === SCROLL-TRIGGERED ANIMATIONS (IMAGES + SLASH) ===
document.addEventListener('DOMContentLoaded', () => {
  // Observer for cinematic fade+slide
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate service images
        if (entry.target.classList.contains('service-image')) {
          entry.target.classList.add('animate');
        }
        // Animate slash divider once (when first image appears)
        const slash = document.querySelector('.divider-slash');
        if (slash && !slash.classList.contains('animate')) {
          slash.classList.add('animate');
        }
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px" // trigger slightly before fully in view
  });

  // Observe both images
  document.querySelectorAll('.service-image').forEach(img => {
    observer.observe(img);
  });
});

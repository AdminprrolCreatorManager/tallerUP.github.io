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
  // Observer for cinematic fade
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('service-image')) {
          entry.target.classList.add('animate');
        }
        // Trigger services section animation
        if (entry.target.classList.contains('services-section')) {
          const items = entry.target.querySelectorAll('.services-column, .section-title');
          items.forEach((item, i) => {
            setTimeout(() => item.style.opacity = '1', i * 200);
          });
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-image').forEach(img => observer.observe(img));
  document.querySelectorAll('.services-section').forEach(section => observer.observe(section));
});

// === TESTIMONIAL CAROUSEL ===
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const items = carousel.querySelectorAll('.testimonial-item');
  let currentIndex = 0;
  const totalItems = 3; // Only 3 unique items

  // Initialize
  items.forEach((item, index) => {
    item.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    if (index === 1) item.classList.add('center'); // Start with first real item centered
  });

  // Auto-rotate every 5 seconds
  setInterval(() => {
    // Remove center class from current
    items[currentIndex % items.length]?.classList.remove('center');
    
    // Move to next
    currentIndex++;
    
    // Add center to new current
    const newCenterIndex = (currentIndex + 1) % items.length;
    items[newCenterIndex]?.classList.add('center');
    
    // Shift carousel position for seamless loop
    const offset = -newCenterIndex * 324; // 300px item + 24px margin
    carousel.style.transform = `translateX(${offset}px)`;
  }, 5000);
});

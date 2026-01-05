// VOID GARAGE — Mobile-First Core
console.log("Void Garage: Mobile-first loaded. Responsive animations active.");

// === NAVBAR SHRINK ON SCROLL (desktop only) ===
const navbar = document.querySelector('.navbar');
if (window.matchMedia('(min-width: 769px)').matches && navbar) {
  let lastScroll = 0;
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
}

// === SMOOTH ANCHOR SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Offset accounts for fixed navbar height
      const offset = window.matchMedia('(min-width: 769px)').matches ? 80 : 60;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  });
});

// === DROPDOWN TOGGLE ===
const dropdown = document.querySelector('.nav-dropdown');
const toggle = document.querySelector('.dropdown-toggle');

if (toggle && dropdown) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = dropdown.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
      toggle.setAttribute(' aria-expanded', 'false');
    }
  });
}

// === SCROLL ANIMATIONS ===
const animateOnScroll = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('service-image')) {
          entry.target.classList.add('animate');
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-image').forEach(img => observer.observe(img));
};

// Trigger after DOM and images are likely ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
  animateOnScroll();
}

// === TESTIMONIAL CAROUSEL ===
const initTestimonials = () => {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;

  const items = carousel.querySelectorAll('.testimonial-item');
  const total = items.length;
  if (total === 0) return;

  // Duplicate first item for seamless loop
  const firstClone = items[0].cloneNode(true);
  carousel.appendChild(firstClone);

  let currentIndex = 0;
  const updateCarousel = () => {
    const percent = (currentIndex / (total + 1)) * 100;
    carousel.style.transform = `translateX(-${percent}%)`;
    currentIndex = (currentIndex + 1) % (total + 1);
  };

  // Auto-rotate
  setInterval(updateCarousel, 5000);
};

document.addEventListener('DOMContentLoaded', initTestimonials);

// === BACK TO TOP BUTTON ===
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  const updateBackToTop = () => {
    // Show after 60vh
    if (window.scrollY > window.innerHeight * 0.6) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', updateBackToTop);
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === SERVICES TOGGLE ===
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.services-toggle-button');
  const columns = document.querySelector('.services-columns');

  if (toggleBtn && columns) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = columns.classList.contains('show');
      if (isExpanded) {
        columns.classList.remove('show');
        toggleBtn.textContent = 'VIEW ALL SERVICES';
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        columns.classList.add('show');
        toggleBtn.textContent = 'HIDE SERVICES';
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
});

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

  const items = carousel.querySelectorAll('.testimonial-item');
  const totalItems = items.length;
  let currentIndex = 0;
  let isPaused = false;
  let autoRotateInterval;
  
  // Function to move carousel
  function moveCarousel() {
    if (isPaused) return;
    
    currentIndex++;
    if (currentIndex >= totalItems) {
      currentIndex = 0;
    }
    
    const translateX = -currentIndex * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
  }
  
  // Auto-rotate every 5 seconds
  function startAutoRotate() {
    clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(moveCarousel, 5000);
  }
  
  startAutoRotate();
  
  // Pause on hover
  const container = document.querySelector('.testimonials-container');
  if (container) {
    container.addEventListener('mouseenter', () => {
      isPaused = true;
    });
    
    container.addEventListener('mouseleave', () => {
      isPaused = false;
      startAutoRotate();
    });
  }
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

// === SERVICES SECTION TOGGLE — CINEMATIC DROPDOWN + STAGGERED REVEAL ===
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.services-toggle-button');
  const servicesColumns = document.querySelector('.services-columns');

  if (toggleButton && servicesColumns) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = servicesColumns.classList.contains('show');
      
      if (isExpanded) {
        // Collapse: animate height down, then reset classes
        servicesColumns.style.height = servicesColumns.scrollHeight + 'px';
        servicesColumns.offsetHeight; // Force reflow
        servicesColumns.style.height = '0';
        
        // Remove animation classes
        const columns = servicesColumns.querySelectorAll('.services-column');
        columns.forEach(col => {
          col.classList.remove('animate-0', 'animate-1', 'animate-2', 'animate-3');
        });
        
        // Wait for animation to finish
        setTimeout(() => {
          servicesColumns.classList.remove('show');
          toggleButton.textContent = 'VIEW ALL SERVICES';
        }, 600);
      } else {
        // Expand: set height to auto to get correct value, then animate to that height
        servicesColumns.classList.add('show');
        servicesColumns.style.height = 'auto';
        const targetHeight = servicesColumns.scrollHeight;
        servicesColumns.style.height = '0';
        servicesColumns.offsetHeight; // Force reflow
        
        // Start animation
        servicesColumns.style.height = targetHeight + 'px';
        toggleButton.textContent = 'HIDE SERVICES';
        
        // Trigger staggered column reveal after 300ms
        setTimeout(() => {
          const columns = servicesColumns.querySelectorAll('.services-column');
          columns.forEach((col, index) => {
            if (index < 4) {
              col.classList.add(`animate-${index}`);
            }
          });
        }, 300);
      }
    });
  }
});

// Hero section is fully CSS-driven — no JS required yet.
// Placeholder for future scroll/hover/glitch enhancements.

// Example: Add scroll-triggered class (optional, not active now)
// window.addEventListener('scroll', () => {
//   document.body.classList.toggle('scrolled', window.scrollY > 10);
// });

// For now: silent. Aggressive. Ready.
console.log("Hero loaded. Dark mode activated.");


// Animate dual services on scroll into view
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.service').forEach(el => {
    observer.observe(el);
  });
});

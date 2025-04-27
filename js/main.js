function main() {
    console.log("Hello, This' SuruhKami.solo");
  }
  
  main();
    // Initialize AOS animations with modified settings for mobile compatibility
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      offset: 50,
      disable: 'phone',
      startEvent: 'DOMContentLoaded'
  });
  
  // Force AOS refresh on window resize and orientation change
  window.addEventListener('resize', function() {
      AOS.refresh();
  });
  
  window.addEventListener('orientationchange', function() {
      setTimeout(function() {
          AOS.refresh();
      }, 100);
  });
  
  // Manually trigger AOS animations for mobile devices
  if (window.innerWidth < 768) {
      document.addEventListener('scroll', function() {
          AOS.refresh();
      }, { passive: true });
  }
  
  // Initialize carousel with smooth transition
  const testimonialCarousel = new bootstrap.Carousel(document.getElementById('testimonialCarousel'), {
      interval: 5000,
      touch: true
  });
  
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });
// Dove Haven Poultry Farm Cover Page Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar & Mobile Menu Toggle
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // 2. Animated Counter Numbers
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // Formatting numbers (integers vs decimals)
        if (Number.isInteger(target)) {
          stat.textContent = Math.floor(current).toLocaleString();
        } else {
          stat.textContent = current.toFixed(1);
        }
      }, stepTime);
    });
  };

  // Trigger counter animation on scroll into view
  const heroStatsSection = document.querySelector('.hero-stats');
  if (heroStatsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroStatsSection);
  }

  // 3. Contact Form Submission Simulation
  const contactForm = document.getElementById('inquiryForm');
  const alertToast = document.getElementById('alertToast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show toast
      if (alertToast) {
        alertToast.classList.add('show');
        setTimeout(() => {
          alertToast.classList.remove('show');
        }, 4000);
      }
      
      contactForm.reset();
    });
  }

  // 4. Smooth Anchor Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

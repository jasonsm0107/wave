document.addEventListener('DOMContentLoaded', function() {
  // Custom cursor
  const cursor = document.querySelector('.custom-cursor');
  const interactiveElements = document.querySelectorAll('a, button, .logo, .nav-link');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      
      if (element.classList.contains('primary-btn') || 
          element.classList.contains('launch-app-btn') || 
          element.classList.contains('cta-button')) {
        cursor.classList.add('hover-accent');
      }
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      cursor.classList.remove('hover-accent');
    });
  });
  
  // Fullpage Scroll
  const sections = document.querySelectorAll('.section');
  let currentSection = 0;
  let isScrolling = false;
  
  function scrollToSection(index) {
    if (index < 0) index = 0;
    if (index > sections.length - 1) index = sections.length - 1;
    
    isScrolling = true;
    currentSection = index;
    
    window.scrollTo({
      top: sections[index].offsetTop,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
    
    // Update navigation
    updateNavigation();
  }
  
  function updateNavigation() {
    // If we implemented navigation dots, we would update them here
  }
  
  document.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    if (e.deltaY > 0) {
      // Scroll down
      scrollToSection(currentSection + 1);
    } else {
      // Scroll up
      scrollToSection(currentSection - 1);
    }
  });
  
  // Key navigation (arrow keys)
  document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      scrollToSection(currentSection + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      scrollToSection(currentSection - 1);
    } else if (e.key === 'Home') {
      scrollToSection(0);
    } else if (e.key === 'End') {
      scrollToSection(sections.length - 1);
    }
  });
  
  // Touch support
  let touchStartY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  
  document.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) < 50) return;
    
    if (diff > 0) {
      // Swipe up -> go down
      scrollToSection(currentSection + 1);
    } else {
      // Swipe down -> go up
      scrollToSection(currentSection - 1);
    }
  });
  
  // Animate on scroll
  const animateOnScroll = () => {
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scroll = window.scrollY;
      
      // If section is in viewport
      if (scroll > sectionTop - windowHeight / 1.5 && 
          scroll < sectionTop + sectionHeight - windowHeight / 3) {
        section.classList.add('in-view');
        
        // Hero section specific animations
        if (index === 0) {
          document.querySelector('.glitch-text').classList.add('animate-glitch');
        }
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  
  // Navigation menu scroll
  document.querySelectorAll('.nav-links a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSection(index);
      
      // Update active class
      document.querySelectorAll('.nav-links a').forEach(navLink => {
        navLink.classList.remove('active');
      });
      link.classList.add('active');
    });
  });
  
  // Parallax effect
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    document.querySelectorAll('.float-element').forEach(element => {
      const speed = element.getAttribute('data-speed');
      
      const x = (window.innerWidth - mouseX * speed) / 100;
      const y = (window.innerHeight - mouseY * speed) / 100;
      
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  });
  
  // Glitch animation for text
  function glitchAnimation() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    setInterval(() => {
      glitchText.classList.add('animate-glitch');
      
      setTimeout(() => {
        glitchText.classList.remove('animate-glitch');
      }, 200);
    }, 3000);
  }
  
  glitchAnimation();
  
  // Navbar transparency on scroll
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = 'var(--text-dark)';
      });
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      navbar.style.boxShadow = 'none';
      document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
      });
    }
  });
  
  // Initialize animations
  animateOnScroll();
});

// Animation for security rings
document.addEventListener('DOMContentLoaded', function() {
  const rings = document.querySelectorAll('.ring');
  
  rings.forEach((ring, index) => {
    ring.style.animationDelay = `${index * 0.5}s`;
  });
  
  // Connection lines animation in anonymity section
  const connections = document.querySelectorAll('.connection');
  
  connections.forEach(conn => {
    setInterval(() => {
      conn.style.opacity = '0.7';
      
      setTimeout(() => {
        conn.style.opacity = '0.3';
      }, 800);
    }, 2000);
  });
  
  // Animate nodes in anonymity section
  const nodes = document.querySelectorAll('.node');
  
  nodes.forEach((node, index) => {
    node.style.animationDelay = `${index * 0.3}s`;
    
    setInterval(() => {
      node.style.transform = 'scale(1.2)';
      
      setTimeout(() => {
        node.style.transform = 'scale(1)';
      }, 500);
    }, 3000 + index * 500);
  });
});
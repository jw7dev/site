    /* ==========================================
       PAGE LOADER
    ========================================== */
    window.addEventListener('load', function() {
      const loader = document.getElementById('pageLoader');
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 400);
    });

    /* ==========================================
       HEADER SCROLL EFFECT
    ========================================== */
    const header = document.getElementById('header');
    let lastScrollY = 0;

    function handleHeaderScroll() {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = scrollY;
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    /* ==========================================
       MOBILE MENU
    ========================================== */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
      const isActive = hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMobileMenu();
      }
    });

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    /* ==========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = header.offsetHeight;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    /* ==========================================
       SCROLL ANIMATIONS (Intersection Observer)
    ========================================== */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      animatedElements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback for older browsers
      animatedElements.forEach(function(el) {
        el.classList.add('is-visible');
      });
    }

    /* ==========================================
       TIMELINE PROGRESS ANIMATION
    ========================================== */
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineSection = document.getElementById('process');

    if ('IntersectionObserver' in window && timelineProgress) {
      let progressAnimated = false;
      const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !progressAnimated) {
            progressAnimated = true;
            timelineProgress.classList.add('animate');

            // Animate steps sequentially
            const steps = document.querySelectorAll('.timeline-step');
            steps.forEach(function(step, index) {
              setTimeout(function() {
                step.classList.add('active');
              }, 300 + (index * 250));
            });
          }
        });
      }, { threshold: 0.3 });

      timelineObserver.observe(timelineSection);
    }

    /* ==========================================
       SCROLL TO TOP BUTTON
    ========================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', function() {
      if (window.scrollY > 600) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ==========================================
       PHONE INPUT MASK
    ========================================== */
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
      whatsappInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 6) {
          value = '(' + value.slice(0,2) + ') ' + value.slice(2,7) + '-' + value.slice(7);
        } else if (value.length > 2) {
          value = '(' + value.slice(0,2) + ') ' + value.slice(2);
        } else if (value.length > 0) {
          value = '(' + value;
        }

        e.target.value = value;
      });
    }

    /* ==========================================
       CONTACT FORM HANDLING
    ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const projectType = document.getElementById('project-type').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !whatsapp || !projectType || !message) {
          alert('Por favor, preencha todos os campos obrigatórios.');
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Por favor, insira um email válido.');
          return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.form-submit .btn');
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        setTimeout(function() {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
        }, 1500);
      });
    }

    /* ==========================================
       ACTIVE NAV LINK HIGHLIGHTING
    ========================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function highlightNav() {
      const scrollPos = window.scrollY + 200;

      sections.forEach(function(section) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(function(link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--blue)';
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    /* ==========================================
       COUNTER ANIMATION FOR HERO STATS
    ========================================== */
    function animateCounters() {
      const counters = document.querySelectorAll('.hero-stat-number');
      counters.forEach(function(counter) {
        const text = counter.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[1]);
        const suffix = text.replace(match[1], '');
        let current = 0;
        const increment = Math.ceil(target / 60);
        const duration = 2000;
        const stepTime = duration / (target / increment);

        function updateCounter() {
          current += increment;
          if (current >= target) {
            counter.textContent = text;
            return;
          }
          counter.textContent = current + suffix;
          setTimeout(updateCounter, stepTime);
        }

        updateCounter();
      });
    }

    // Trigger counter animation when hero is visible
    const heroSection = document.getElementById('hero');
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            setTimeout(animateCounters, 500);
            heroObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      heroObserver.observe(heroSection);
    } else {
      animateCounters();
    }

    /* ==========================================
       LAZY LOADING IMAGES (if any are added)
    ========================================== */
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(function(img) {
        imageObserver.observe(img);
      });
    }

/**
 * Irfan Hossain - Portfolio Main JavaScript
 * High performance, zero unnecessary bloat, fully interactive
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initTypewriter();
  initProjectFilters();
  initPlayground();
  initContactForm();
  initCopyEmail();
  initScrollTop();
  initIntersectionAnimations();
  initProjectModals();
});

/* ===================================================================
   1. Theme Toggle (Dark / Light)
   =================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('irfan_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('irfan_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('themeToggleIcon');
  if (!themeIcon) return;
  if (theme === 'dark') {
    themeIcon.className = 'bi bi-sun-fill';
  } else {
    themeIcon.className = 'bi bi-moon-stars-fill';
  }
}

/* ===================================================================
   2. Navbar Scroll & Active Link Tracking
   =================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active state
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Close mobile hamburger on nav link click
  const navToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        navToggler.click();
      }
    });
  });
}

/* ===================================================================
   3. Hero Typewriter Effect
   =================================================================== */
function initTypewriter() {
  const typedTarget = document.getElementById('typedTarget');
  if (!typedTarget) return;

  const words = [
    'Frontend Web Developer',
    'HTML5 • CSS3 • JavaScript',
    'Bootstrap 5 UI Specialist',
    'Fluent English Communicator',
    'Pixel-Perfect Craftsman'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 90;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedTarget.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typedTarget.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1600; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ===================================================================
   4. Project Filtering
   =================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory.includes(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, 30);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px) scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ===================================================================
   5. Interactive Playground (Live Code Demo)
   =================================================================== */
function initPlayground() {
  // Tabs
  const tabBtns = document.querySelectorAll('.playground-tab-btn');
  const panels = document.querySelectorAll('.playground-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.add('d-none'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPanel) {
        targetPanel.classList.remove('d-none');
      }
    });
  });

  // Tab 1: Live Accent Generator
  const accentSwatches = document.querySelectorAll('.color-swatch-btn');
  accentSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      const colorName = swatch.getAttribute('data-name');
      const previewCard = document.getElementById('playgroundPreviewCard');
      const previewText = document.getElementById('previewAccentLabel');

      if (previewCard) {
        previewCard.style.borderColor = color;
        previewCard.style.boxShadow = `0 10px 30px ${color}33`;
      }
      if (previewText) {
        previewText.textContent = colorName;
        previewText.style.color = color;
      }
      showToast(`Selected theme accent: ${colorName}`);
    });
  });

  // Tab 2: JavaScript Live State & Counter
  const countDisplay = document.getElementById('liveCountVal');
  const btnInc = document.getElementById('btnCountInc');
  const btnDec = document.getElementById('btnCountDec');
  const btnReset = document.getElementById('btnCountReset');
  const stateBadge = document.getElementById('counterStateBadge');

  if (countDisplay && btnInc && btnDec && btnReset) {
    let count = 0;

    const updateDisplay = () => {
      countDisplay.textContent = count;
      if (count > 0) {
        stateBadge.className = 'badge bg-success';
        stateBadge.textContent = 'Positive State';
      } else if (count < 0) {
        stateBadge.className = 'badge bg-danger';
        stateBadge.textContent = 'Negative State';
      } else {
        stateBadge.className = 'badge bg-secondary';
        stateBadge.textContent = 'Neutral State (0)';
      }
    };

    btnInc.addEventListener('click', () => {
      count++;
      updateDisplay();
    });

    btnDec.addEventListener('click', () => {
      count--;
      updateDisplay();
    });

    btnReset.addEventListener('click', () => {
      count = 0;
      updateDisplay();
    });
  }

  // Tab 3: CSS Glassmorphism Live Tweaker
  const sliderBlur = document.getElementById('sliderBlur');
  const sliderOpacity = document.getElementById('sliderOpacity');
  const sliderRadius = document.getElementById('sliderRadius');
  const glassPreview = document.getElementById('glassLivePreview');
  const glassCode = document.getElementById('glassOutputCode');

  function updateGlassStyle() {
    if (!glassPreview) return;
    const blur = sliderBlur ? sliderBlur.value : 16;
    const opacity = sliderOpacity ? sliderOpacity.value / 100 : 0.75;
    const radius = sliderRadius ? sliderRadius.value : 18;

    glassPreview.style.backdropFilter = `blur(${blur}px)`;
    glassPreview.style.webkitBackdropFilter = `blur(${blur}px)`;
    glassPreview.style.background = `rgba(18, 26, 47, ${opacity})`;
    glassPreview.style.borderRadius = `${radius}px`;

    if (glassCode) {
      glassCode.textContent = `background: rgba(18, 26, 47, ${opacity});\nbackdrop-filter: blur(${blur}px);\nborder-radius: ${radius}px;\nborder: 1px solid rgba(255, 255, 255, 0.1);`;
    }
  }

  if (sliderBlur && sliderOpacity && sliderRadius) {
    sliderBlur.addEventListener('input', updateGlassStyle);
    sliderOpacity.addEventListener('input', updateGlassStyle);
    sliderRadius.addEventListener('input', updateGlassStyle);
    updateGlassStyle();
  }
}

/* ===================================================================
   6. Project Details Modal Logic
   =================================================================== */
const projectData = {
  task: {
    title: 'OmniTask - Kanban & Task Management',
    category: 'JavaScript Application & Bootstrap 5',
    description: 'A fully responsive drag-and-drop task tracking system built with vanilla JavaScript and modern CSS. Features local storage persistence, priority badges, sprint status tracking, and fluid transitions without relying on heavy frameworks.',
    tech: ['HTML5 Drag & Drop API', 'CSS3 Grid/Flexbox', 'JavaScript ES6+', 'Bootstrap 5 Components', 'LocalStorage Sync'],
    highlights: [
      'Implemented native HTML5 Drag and Drop event listeners with state management',
      'Persistent tasks saved to browser LocalStorage with automatic JSON serialization',
      'Dynamic task filtering, column counting, and custom edit modals'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  },
  fintech: {
    title: 'NexusPay - SaaS Banking & Financial Dashboard',
    category: 'Modern UI/UX & Responsive CSS',
    description: 'A pixel-perfect fintech web portal featuring clean data visualization, responsive glassmorphic cards, currency formatting, and transaction tracking. Engineered to display real-time financial stats with responsive table and grid layouts.',
    tech: ['Bootstrap 5.3', 'Modern CSS Variables', 'JavaScript DOM', 'SVG Vector Charts', 'Mobile-First Layout'],
    highlights: [
      'Interactive cashflow charts with custom SVG gradients and tooltips',
      'Fully responsive credit card simulation with dynamic cardholder name updates',
      'Optimized accessible color contrast adhering to WCAG 2.1 AA standards'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  },
  weather: {
    title: 'WeatherPulse - Real-time Forecast Web App',
    category: 'Asynchronous JavaScript & REST APIs',
    description: 'A dynamic weather application leveraging modern JavaScript Fetch API and async/await to retrieve and display live weather conditions, 5-day forecasts, wind speeds, and UV indices with geolocation support.',
    tech: ['JavaScript Async/Await', 'Fetch API', 'CSS Glassmorphism', 'Dynamic SVG Weather Icons', 'HTML5 Geolocation'],
    highlights: [
      'Asynchronous REST API calls with robust error handling and loading skeletons',
      'Dynamic day/night backdrop theme switching based on local city sunset times',
      'Smooth city search with client-side debouncing for instant search feedback'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  },
  portfolio: {
    title: 'DevFolio - Interactive Theme Engine',
    category: 'CSS3 Architecture & JavaScript State',
    description: 'A developer portfolio engine built with custom CSS variables, runtime theme toggling, and interactive code preview snippets. Explores advanced CSS layout paradigms and zero-dependency animations.',
    tech: ['CSS Custom Properties', 'Modern HTML5 Semantics', 'JavaScript Event Delegation', 'CSS Grid & Flexbox'],
    highlights: [
      'Instant dark/light theme switching with zero page flicker using CSS custom properties',
      'Interactive live CSS variable editor demonstrating real-time DOM styling',
      'Sub-second load times with lightweight semantic code and zero bloat'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  },
  restaurant: {
    title: 'CulinaryCraft - Gourmet Dining & Reservation Portal',
    category: 'Bootstrap 5 & Interactive Forms',
    description: 'A sophisticated dining landing page designed for an artisan restaurant. Includes interactive menu category filtering, dietary restriction tags, table reservation form validation, and customer review sliders.',
    tech: ['Bootstrap 5 Forms', 'CSS Animations', 'JavaScript Form Validation', 'Responsive Media Queries'],
    highlights: [
      'Custom JavaScript date and party size reservation validation with instant feedback',
      'Interactive tabbed menu items with instant price calculation and item previews',
      'Rich visual hierarchy with warm aesthetic typography and responsive imagery'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  },
  crypto: {
    title: 'CryptoTrack - Live Market Tracker & Sparklines',
    category: 'JavaScript ES6+ & Data Visualization',
    description: 'A high-frequency cryptocurrency price tracker featuring real-time sparkline trend curves, top movers list, time-range selectors (24H, 7D, 1M, 1Y), and live simulated price fluctuation indicators.',
    tech: ['JavaScript ES6+', 'HTML5 Canvas / SVG', 'CSS Keyframe Animations', 'Bootstrap Grid System'],
    highlights: [
      'Simulated real-time streaming price updates with animated green/red delta badges',
      'Custom SVG vector trend curves rendered dynamically from dataset arrays',
      'Responsive multi-coin portfolio summary with search filter and sort features'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  }
};

function initProjectModals() {
  const modalElem = document.getElementById('projectDetailsModal');
  if (!modalElem) return;

  const bsModal = new bootstrap.Modal(modalElem);
  const detailButtons = document.querySelectorAll('[data-project-key]');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-project-key');
      const data = projectData[key];
      if (!data) return;

      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectCategory').textContent = data.category;
      document.getElementById('modalProjectDesc').textContent = data.description;

      const techContainer = document.getElementById('modalProjectTech');
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const pill = document.createElement('span');
        pill.className = 'tech-pill';
        pill.textContent = t;
        techContainer.appendChild(pill);
      });

      const highlightContainer = document.getElementById('modalProjectHighlights');
      highlightContainer.innerHTML = '';
      data.highlights.forEach(h => {
        const li = document.createElement('li');
        li.className = 'mb-2 text-muted-custom';
        li.innerHTML = `<i class="bi bi-check2-circle text-cyan me-2"></i> ${h}`;
        highlightContainer.appendChild(li);
      });

      bsModal.show();
    });
  });
}

/* ===================================================================
   7. Contact Form & Celebration
   =================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'warning');
      return;
    }

    // Trigger confetti celebration if library available
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    showToast(`Thank you, ${name}! Your message has been sent successfully.`);
    form.reset();
  });
}

/* ===================================================================
   8. One-Click Email Copy
   =================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email') || 'irfanhossainreza@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalHtml = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> Copied to Clipboard!';
      showToast(`Copied ${email} to clipboard!`);
      setTimeout(() => {
        copyBtn.innerHTML = originalHtml;
      }, 2500);
    }).catch(() => {
      showToast('Failed to copy. Please select manually.', 'warning');
    });
  });
}

/* ===================================================================
   9. Scroll to Top
   =================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ===================================================================
   10. Intersection Observer Scroll Animations
   =================================================================== */
function initIntersectionAnimations() {
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

// Add dynamic CSS class for animated elements
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  </style>
`);

/* ===================================================================
   Toast Utility
   =================================================================== */
function showToast(message, type = 'success') {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast-custom';
    document.body.appendChild(toast);
  }

  const iconClass = type === 'warning' ? 'bi-exclamation-triangle-fill text-warning' : 'bi-check-circle-fill text-cyan';
  toast.innerHTML = `
    <i class="bi ${iconClass} fs-5"></i>
    <span class="fw-semibold text-main">${message}</span>
  `;

  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}


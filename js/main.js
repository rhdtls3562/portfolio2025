// ============================================
// MODERN PORTFOLIO - INSPIRED BY ADCAPSULE
// ============================================

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all modules
  initLoader();
  initCursor();
  initNavigation();
  initHero();
  initAnimations();
  initProjects();
  initSkills();
  initContactForm();
  initCounters();
  initScrollEffects();
});

// ============================================
// LOADING SCREEN
// ============================================
function initLoader() {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingProgress = document.querySelector(".loader-progress-bar");

  if (!loadingScreen) return;

  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Hide loading screen after a short delay
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Remove from DOM after transition
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 500);
    }

    if (loadingProgress) {
      loadingProgress.style.width = progress + "%";
    }
  }, 100);
}

// ============================================
// CUSTOM CURSOR - LOGO INSPIRED DESIGN
// ============================================
function initCursor() {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  if (!cursor || !cursorFollower) return;

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  // Update cursor position
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = mouseX - 4 + "px";
    cursor.style.top = mouseY - 4 + "px";
  });

  // Smooth follower animation with easing
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    cursorFollower.style.left = followerX - 16 + "px";
    cursorFollower.style.top = followerY - 16 + "px";

    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Enhanced cursor interactions
  const clickableElements = document.querySelectorAll(
    "a, button, .btn, .logo-circle, .keyword-badge, .story-number"
  );

  const hoverElements = document.querySelectorAll(
    ".service-card, .logo-card, .skill-item, .testimonial-item, .contact-item, .tool-item"
  );

  const textElements = document.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, span:not(.keyword-badge), .story-content, .hero-description"
  );

  // Clickable elements (buttons, links)
  clickableElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("click");
      cursorFollower.classList.add("click");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("click");
      cursorFollower.classList.remove("click");
    });
  });

  // Hoverable elements (cards, items)
  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
      cursorFollower.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
      cursorFollower.classList.remove("hover");
    });
  });

  // Text elements
  textElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("text");
      cursorFollower.classList.add("text");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("text");
      cursorFollower.classList.remove("text");
    });
  });

  // Special interaction for logo
  const logoCircle = document.querySelector(".logo-circle");
  if (logoCircle) {
    logoCircle.addEventListener("mouseenter", () => {
      cursor.style.background = "var(--light-color)";
      cursor.style.boxShadow =
        "0 0 0 3px var(--dark-color), 0 0 30px rgba(45, 52, 54, 0.4)";
    });

    logoCircle.addEventListener("mouseleave", () => {
      cursor.style.background = "";
      cursor.style.boxShadow = "";
    });
  }

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    cursorFollower.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    cursorFollower.style.opacity = "0.6";
  });
}

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const header = document.querySelector(".header");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Scroll header behavior
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop;
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        }

        // Update active link
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // Update active navigation based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// ============================================
// HERO SECTION
// ============================================
function initHero() {
  // Typing effect
  const typingText = document.querySelector(".typing-text");
  if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing after loading screen
    setTimeout(typeWriter, 2500);
  }

  // Floating shapes animation
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    // Random movement
    setInterval(() => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000 + index * 500);
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initAnimations() {
  // GSAP ScrollTrigger animations
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray("section").forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate service cards
    gsap.utils.toArray(".service-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Animate timeline items
    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }
}

// ============================================
// PROJECTS SECTION
// ============================================
function initProjects() {
  const projectsData = [
    // 웹사이트 프로젝트
    {
      id: 1,
      title: "Socialize 소셜 플랫폼",
      category: "웹사이트",
      description: "소셜 네트워킹 서비스 웹사이트 UI/UX 디자인 및 퍼블리싱",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive"],
      image: "img/socilize.jpg",
      link: "#",
    },
    {
      id: 2,
      title: "Binggo PC 게임 플랫폼",
      category: "웹사이트",
      description: "온라인 게임 플랫폼 웹사이트 디자인 및 개발",
      technologies: ["Web Design", "UI/UX", "Gaming Interface"],
      image: "img/binggo_pc.png",
      link: "#",
    },
    {
      id: 3,
      title: "학원 홈페이지",
      category: "웹사이트",
      description: "교육기관 홈페이지 디자인 및 반응형 퍼블리싱",
      technologies: ["Web Design", "HTML/CSS", "Responsive", "Educational"],
      image: "img/academy_logo.jpg",
      link: "#",
    },
    {
      id: 4,
      title: "서연성형외과 홈페이지",
      category: "웹사이트",
      description: "의료기관 홈페이지 디자인 및 UI/UX 개발",
      technologies: ["Medical Web", "UI/UX", "Responsive", "Healthcare"],
      image: "img/27.jpg",
      link: "#",
    },
    
    // 브랜딩 프로젝트
    {
      id: 5,
      title: "AKJ 아카데미 브랜드",
      category: "브랜딩",
      description: "교육기관 로고 및 브랜드 아이덴티티 디자인",
      technologies: ["Illustrator", "Logo Design", "Brand Identity"],
      image: "img/akj_logo.jpg",
      link: "#",
    },
    {
      id: 6,
      title: "Bekerry 제과점 브랜드",
      category: "브랜딩",
      description: "제과제빵 브랜드 로고 및 패키지 디자인",
      technologies: ["Illustrator", "Package Design", "Brand Strategy"],
      image: "img/bekerry_logo.jpg",
      link: "#",
    },
    {
      id: 7,
      title: "PR몽땅 기업 브랜딩",
      category: "브랜딩",
      description: "마케팅 에이전시 브랜드 디자인 및 회사 소개서",
      technologies: ["Corporate Design", "Brand Identity", "Marketing"],
      image: "img/prmongttang.jpg",
      link: "#",
    },

    // 디자인 프로젝트
    {
      id: 8,
      title: "카페 브랜드 로고",
      category: "디자인",
      description: "카페 브랜드 로고 디자인 (작업일 1일, 기여도 100%)",
      technologies: ["Illustrator", "Logo Design", "Typography"],
      image: "img/coffe_logo.jpg",
      link: "#",
    },
    {
      id: 9,
      title: "플라워샵 로고",
      category: "디자인",
      description: "꽃집 브랜드 로고 디자인 (작업일 1일, 기여도 100%)",
      technologies: ["Illustrator", "Floral Design", "Brand Identity"],
      image: "img/flower_logo.jpg",
      link: "#",
    },
    {
      id: 10,
      title: "웹 배너 디자인",
      category: "디자인",
      description: "다양한 웹 배너 디자인 작업물 (작업일 1일, 기여도 100%)",
      technologies: ["Photoshop", "Web Banner", "Digital Design"],
      image: "img/23.jpg",
      link: "#",
    },
    {
      id: 11,
      title: "편집 디자인 포트폴리오",
      category: "디자인",
      description: "전단지 및 편집 디자인 작업물 컬렉션",
      technologies: ["Photoshop", "Illustrator", "Print Design"],
      image: "img/18.jpg",
      link: "#",
    },
    {
      id: 12,
      title: "제품 굿즈 디자인",
      category: "디자인",
      description: "제품 디자인 및 굿즈 제작 (작업일 1일, 기여도 100%)",
      technologies: ["Product Design", "Illustrator", "Goods Design"],
      image: "img/316.jpg",
      link: "#",
    },
  ];

  const projectsGrid = document.querySelector(".projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!projectsGrid) return;

  // Render projects
  function renderProjects(projects) {
    projectsGrid.innerHTML = projects
      .map(
        (project) => `
      <div class="project-item" data-category="${project.category}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" loading="lazy">
          <div class="project-overlay">
            <div class="project-links">
              <a href="${project.link}" class="project-link">
                <i class="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="project-content">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-technologies">
            ${project.technologies
              .map((tech) => `<span class="tech-tag">${tech}</span>`)
              .join("")}
          </div>
        </div>
      </div>
    `
      )
      .join("");

    // Add project item styles
    const style = document.createElement("style");
    style.textContent = `
      .project-item {
        background: var(--light-color);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--shadow-light);
        transition: var(--transition-normal);
      }
      
      .project-item:hover {
        transform: translateY(-10px);
        box-shadow: var(--shadow-heavy);
      }
      
      .project-image {
        position: relative;
        overflow: hidden;
        height: 250px;
      }
      
      .project-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: var(--transition-normal);
      }
      
      .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(108, 92, 231, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: var(--transition-normal);
      }
      
      .project-item:hover .project-overlay {
        opacity: 1;
      }
      
      .project-item:hover .project-image img {
        transform: scale(1.1);
      }
      
      .project-link {
        width: 50px;
        height: 50px;
        background: var(--light-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        text-decoration: none;
        font-size: 1.2rem;
        transition: var(--transition-normal);
      }
      
      .project-link:hover {
        transform: scale(1.1);
      }
      
      .project-content {
        padding: 2rem;
      }
      
      .project-content h3 {
        font-size: var(--font-size-xl);
        font-weight: 700;
        color: var(--dark-color);
        margin-bottom: 1rem;
      }
      
      .project-content p {
        color: var(--gray-color);
        margin-bottom: 1.5rem;
        line-height: 1.6;
      }
      
      .project-technologies {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      
      .tech-tag {
        background: var(--gray-lighter);
        color: var(--primary-color);
        padding: 0.25rem 0.75rem;
        border-radius: 15px;
        font-size: var(--font-size-xs);
        font-weight: 500;
      }
    `;
    document.head.appendChild(style);
  }

  // Filter projects
  function filterProjects(category) {
    const filteredProjects =
      category === "all"
        ? projectsData
        : projectsData.filter((project) => project.category === category);

    renderProjects(filteredProjects);

    // Animate project items
    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".project-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
        }
      );
    }
  }

  // Initial render - show all projects
  renderProjects(projectsData);
}

// ============================================
// SKILLS SECTION
// ============================================
function initSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillBars.length === 0) return;

  // Animate skill bars when in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.getAttribute("data-width");

          setTimeout(() => {
            skillBar.style.width = width + "%";
          }, 200);

          observer.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// ============================================
// COUNTERS
// ============================================
function initCounters() {
  const counters = document.querySelectorAll(".stat-number[data-target]");

  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          let current = 0;
          const increment = target / 100;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            counter.textContent = Math.ceil(current);
          }, 20);

          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  // EmailJS 초기화
  emailjs.init("YOUR_PUBLIC_KEY"); // 실제 사용 시 EmailJS 공개 키로 교체

  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const formStatus = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // 폼 유효성 검사
    const inputs = form.querySelectorAll(".form-input[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.borderColor = "#e74c3c";
        isValid = false;
      } else {
        input.style.borderColor = "#27ae60";
      }
    });

    if (!isValid) {
      showFormStatus("모든 필드를 올바르게 입력해주세요.", "error");
      return;
    }

    // 전송 중 상태
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>전송 중...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
      // EmailJS를 통한 이메일 전송 (임시로 mailto 링크 사용)
      const formData = new FormData(form);
      const name = formData.get('from_name');
      const email = formData.get('from_email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // mailto 링크로 기본 이메일 클라이언트 열기
      const mailtoLink = `mailto:rhdtls3562@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}`
      )}`;
      
      window.location.href = mailtoLink;

      // 성공 메시지 표시
      showFormStatus("메시지가 전송되었습니다! 곧 연락드리겠습니다.", "success");
      
      // 폼 초기화
      setTimeout(() => {
        form.reset();
        inputs.forEach((input) => (input.style.borderColor = ""));
        formStatus.style.display = "none";
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
      showFormStatus("전송 중 오류가 발생했습니다. 직접 이메일로 연락해주세요.", "error");
    } finally {
      // 버튼 상태 복원
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });

  // 실시간 유효성 검사
  const inputs = form.querySelectorAll(".form-input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim()) {
        input.style.borderColor = "#27ae60";
      } else {
        input.style.borderColor = "";
      }
    });
  });

  // 폼 상태 메시지 표시 함수
  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = "block";
  }
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
  // Parallax effect for hero background
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".floating-shapes");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Reveal animations for elements
  const revealElements = document.querySelectorAll(
    ".stat-item, .service-card, .timeline-item, .contact-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    revealObserver.observe(element);
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll to element
function scrollToElement(element) {
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Throttle function for performance
function throttle(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Console welcome message
console.log(`
  ╔══════════════════════════════════════╗
  ║            SEROUM PORTFOLIO          ║
  ║        Modern & Professional         ║
  ║     Inspired by Adcapsule Design     ║
  ╚══════════════════════════════════════╝
`);

// Performance monitoring
window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});

// ============================================
// MODERN PORTFOLIO - INSPIRED BY ADCAPSULE
// ============================================

// DOM Content Loaded with Performance Optimization
document.addEventListener("DOMContentLoaded", function () {
  // Critical path initialization
  initLoader();
  initNavigation();

  // Defer non-critical initializations
  requestIdleCallback(() => {
    initCursor();
    initHero();
    initAnimations();
    initScrollEffects();
    initBackToTop();
  });

  // Lazy load sections when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          switch (sectionId) {
            case "projects":
              initProjects();
              break;
            case "skills":
              initSkills();
              break;
            case "contact":
              initContactForm();
              break;
            case "about":
              initCounters();
              break;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "50px" }
  );

  // Observe sections for lazy initialization
  ["projects", "skills", "contact", "about"].forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
});

// ============================================
// LOADING SCREEN
// ============================================
function initLoader() {
  const loadingScreen = document.querySelector(".loading-screen");
  const loadingProgress = document.querySelector(".loader-progress-bar");

  if (!loadingScreen) return;

  // Faster loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 25; // 더 빠른 진행
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      // Hide loading screen immediately
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        // Remove from DOM after transition
        setTimeout(() => {
          loadingScreen.remove();
        }, 300); // 더 빠른 제거
      }, 200); // 더 빠른 숨김
    }

    if (loadingProgress) {
      loadingProgress.style.width = progress + "%";
    }
  }, 50); // 더 자주 업데이트
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
        setTimeout(typeWriter, 50); // 100ms에서 50ms로 변경 (2배 빠르게)
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

    // Animate project cards
    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 30,
          scale: 0.95,
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
      title: "아모레 BTS 프로젝트 퍼블리싱",
      category: "프로젝트",
      description:
        "아모레퍼시픽 BTS(Beauty Technology Service), 챗봇, 립 AR, 두피 진단 등 뷰티 기술 서비스의 UI/UX 디자인 및 반응형 웹 퍼블리싱",
      technologies: [
        "UI/UX Design",
        "Chatbot Service",
        "React",
        "Tailwind",
        "JavaScript",
      ],
      image: "img/bts.png",
      link: "https://i-dev-beautytech.amorepacific.com/login/",
    },
    {
      id: 15,
      title: "Ginigen AI 웹사이트 디자인 및 퍼블리싱",
      category: "웹사이트",
      description: "AI 웹사이트 디자인 및 UI/UX 개발",
      technologies: ["Web Design", "UI/UX", "HTML", "CSS", "JavaScript"],
      image: "img/ginigen.jpg",
      link: "https://ginigen.com/",
    },
    {
      id: 15,
      title: "chavron 회사 홈페이지 퍼블리싱",
      category: "웹사이트",
      description: "회사 홈페이지 웹사이트 디자인 및 개발",
      technologies: ["Web Design", "React", "Tailwind", "JavaScript"],
      image: "img/chavron.jpg",
      link: "https://www.chavron.co.kr/",
    },
    {
      id: 15,
      title: "음반제작 회사 디자인 및 퍼블리싱",
      category: "웹사이트",
      description: "음악 프로듀싱 웹사이트 디자인 및 반응형 퍼블리싱",
      technologies: [
        "Web Design",
        "UI/UX",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Brand Identity",
      ],
      image: "img/in8.jpg",
      link: "https://rhdtls3562.github.io/IN8/",
    },
    {
      id: 15,
      title: "Socialize 의류 플랫폼 퍼블리싱",
      category: "웹사이트",
      description: "소셜 네트워킹 서비스 웹사이트 UI/UX 디자인 및 퍼블리싱",
      technologies: ["HTML", "CSS", "JavaScript", "Web Design", "UI/UX"],
      image: "img/socilize.jpg",
      link: "https://rhdtls3562.github.io/socialize/",
    },

    {
      id: 15,
      title: "학원 디자인 및 퍼블리싱",
      category: "웹사이트",
      description: "교육기관 홈페이지 디자인 및 반응형 퍼블리싱",
      technologies: [
        "Web Design",
        "UI/UX",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Brand Identity",
      ],
      image: "img/study.jpg",
      link: "https://rhdtls3562.github.io/SEROUM_STUDY_SCHOOL/",
    },

    // 브랜딩 프로젝트
    {
      id: 15,
      title: "성형외과 디자인 및 퍼블리싱",
      category: "웹사이트",
      description: "성형외과 웹사이트 디자인 및 반응형 퍼블리싱",
      technologies: [
        "Web Design",
        "UI/UX",
        "HTML5",
        "CSS3",
        "JavaScript",
        "Brand Identity",
      ],
      image: "img/hospital.jpg",
      link: "https://rhdtls3562.github.io/SEROUM-HOSPITAL/",
    },

    {
      id: 15,
      title: "기업 브랜딩",
      category: "브랜딩",
      description: "마케팅 에이전시 브랜드 디자인 및 회사 소개서",
      technologies: ["Corporate Design", "Brand Identity", "Marketing"],
      image: "img/prmongttang.jpg",
      link: "img/피알몽땅 제안서.pdf",
    },

    // 디자인 프로젝트
    {
      id: 15,
      title: "카페 브랜딩",
      category: "브랜딩",
      description: "카페 브랜드 로고 디자인",
      technologies: ["Illustrator", "Logo Design", "Typography"],
      image: "img/coffe_logo.jpg",
      link: "#",
    },
    {
      id: 15,
      title: "꽃집 브랜딩",
      category: "브랜딩",
      description: "꽃집 브랜드 로고 디자인",
      technologies: ["Illustrator", "Floral Design", "Brand Identity"],
      image: "img/flower_logo.jpg",
      link: "#",
    },
    {
      id: 15,
      title: "명함 디자인",
      category: "디자인",
      description: "다양한 웹 배너 디자인 작업물",
      technologies: ["Photoshop", "Web Banner", "Digital Design"],
      image: "img/23.jpg",
      link: "#",
    },
    {
      id: 15,
      title: "제품 디자인",
      category: "디자인",
      description: "제품 디자인 및 굿즈 제작",
      technologies: ["Product Design", "Illustrator", "Goods Design"],
      image: "img/24.jpg",
      link: "#",
    },
    {
      id: 15,
      title: "주짓수 학원 브랜딩",
      category: "브랜딩",
      description: "로고 및 브랜딩 제작",
      technologies: [
        "Corporate Design",
        "Brand Identity",
        "Marketing",
        "Logo design",
      ],
      image: "img/akj_logo.jpg",
      link: "https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2Fakjiujitsu%2Freels%2F&is_from_rle",
    },
    {
      id: 15,
      title: "제품 디자인",
      category: "디자인",
      description: "제품 디자인 및 굿즈 제작",
      technologies: ["Product Design", "Illustrator", "Goods Design"],
      image: "img/t.gif",
      link: "#",
    },
    {
      id: 15,
      title: "제품 디자인",
      category: "디자인",
      description: "제품 디자인 및 굿즈 제작",
      technologies: ["Product Design", "Illustrator", "Goods Design"],
      image: "img/27.jpg",
      link: "#",
    },
  ];

  const projectsGrid = document.querySelector(".projects-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!projectsGrid) return;

  // 극한 최적화된 렌더링 함수
  function renderProjects(projects) {
    // DocumentFragment 사용으로 리플로우 최소화
    const fragment = document.createDocumentFragment();

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";
      projectCard.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${
        project.title
      }" loading="lazy" decoding="async" width="350" height="250">
          ${
            project.link && project.link !== "#"
              ? '<div class="project-link-icon"><i class="fas fa-external-link-alt"></i></div>'
              : ""
          }
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-tech">
            ${project.technologies
              .map((tech) => `<span>${tech}</span>`)
              .join("")}
          </div>
        </div>
      `;

      // 프로젝트 카드 클릭 이벤트 추가
      projectCard.addEventListener("click", () => {
        if (project.link && project.link !== "#") {
          // PDF 파일인 경우 새 탭에서 열기
          if (project.link.endsWith(".pdf")) {
            window.open(project.link, "_blank");
          } else {
            window.open(project.link, "_blank");
          }
        }
      });

      // 클릭 가능한 커서 스타일 추가
      projectCard.style.cursor = "pointer";

      fragment.appendChild(projectCard);
    });

    // 한 번에 DOM 업데이트
    projectsGrid.innerHTML = "";
    projectsGrid.appendChild(fragment);

    // GSAP ScrollTrigger 재새로고침 (필터링 후 새로운 카드들에 애니메이션 적용)
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }

  // 최적화된 프로젝트 필터링 (부드러운 등장 효과 포함)
  function filterProjects(category) {
    const filteredProjects =
      category === "all"
        ? projectsData
        : projectsData.filter((project) => project.category === category);

    // 기존 카드들을 페이드아웃 후 새 카드 렌더링
    const existingCards = document.querySelectorAll(".project-card");

    if (existingCards.length > 0) {
      existingCards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(-10px) translateZ(0)";
      });

      setTimeout(() => {
        renderProjects(filteredProjects);
      }, 200); // 페이드아웃 완료 후 렌더링
    } else {
      renderProjects(filteredProjects);
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
// CONTACT FORM - FormSubmit 서비스 사용
// ============================================
function initContactForm() {
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
    submitBtn.innerHTML =
      '<span>전송 중...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    try {
      // FormSubmit을 통한 이메일 전송 (설치 불필요)
      const formData = new FormData(form);

      // 추가 정보 포함
      formData.append("_subject", "[포트폴리오] 새로운 문의가 도착했습니다");
      formData.append("_captcha", "false"); // 캡차 비활성화
      formData.append("_template", "table"); // 테이블 형식으로 이메일 받기

      const response = await fetch(
        "https://formsubmit.co/rhdtls3562@naver.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // 성공 메시지 표시
        showFormStatus(
          "메시지가 성공적으로 전송되었습니다! 곧 연락드리겠습니다.",
          "success"
        );

        // 폼 초기화
        setTimeout(() => {
          form.reset();
          inputs.forEach((input) => (input.style.borderColor = ""));
          formStatus.style.display = "none";
        }, 3000);
      } else {
        throw new Error("전송 실패");
      }
    } catch (error) {
      console.error("전송 실패:", error);

      // 실패 시 대안으로 mailto 링크 사용
      const formData = new FormData(form);
      const name = formData.get("from_name");
      const email = formData.get("from_email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      const mailtoLink = `mailto:rhdtls3562@naver.com?subject=${encodeURIComponent(
        `[포트폴리오 문의] ${subject}`
      )}&body=${encodeURIComponent(
        `이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}\n\n---\n포트폴리오 웹사이트에서 전송됨`
      )}`;

      window.open(mailtoLink);

      showFormStatus(
        "이메일 클라이언트가 열렸습니다. 메시지를 확인하고 전송해주세요.",
        "info"
      );
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
// Lenis 스무스 스크롤 초기화 (극한 최적화)
function initScrollEffects() {
  // Lenis 라이브러리로 부드러운 스크롤 구현
  if (typeof Lenis !== "undefined") {
    window.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      window.lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 네비게이션 링크에 스무스 스크롤 적용
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.lenis.scrollTo(target);
        }
      });
    });
  }

  // 다른 섹션 요소들의 등장 애니메이션
  const otherElements = document.querySelectorAll(
    ".stat-item, .service-card, .timeline-item, .contact-item"
  );

  if (otherElements.length > 0) {
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) translateZ(0)";
            elementObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    // 초기 상태 설정 및 관찰 시작
    otherElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px) translateZ(0)";
      element.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      elementObserver.observe(element);
    });
  }

  // Featured Projects 섹션 스크롤 애니메이션 추가
  const projectsSection = document.querySelector("#projects");

  if (projectsSection) {
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 프로젝트 카드들을 순차적으로 애니메이션
            const cards = entry.target.querySelectorAll(".project-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) translateZ(0)";
              }, index * 100); // 100ms 간격으로 순차 등장
            });
            projectObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    // 프로젝트 카드들 초기 상태 설정
    const projectCards = projectsSection.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px) translateZ(0)";
      card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    });

    // 프로젝트 섹션 관찰 시작
    projectObserver.observe(projectsSection);
  }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  // 스크롤 위치에 따라 버튼 표시/숨김
  const toggleBackToTop = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }, 100);

  // 스크롤 이벤트 리스너
  window.addEventListener("scroll", toggleBackToTop);

  // 버튼 클릭 시 맨 위로 스크롤
  backToTopBtn.addEventListener("click", () => {
    // Lenis가 있으면 Lenis로 스크롤, 없으면 기본 스크롤
    if (typeof Lenis !== "undefined" && window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });

  // 초기 상태 설정
  toggleBackToTop();
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

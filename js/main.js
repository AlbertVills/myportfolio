/**
 * Main Interactive Application Script
 * Albert S. Villasor - Front-End Developer & UI/UX Designer
 */

// Global resilient image error handler (handles both images/ and assets/images/ paths across Vercel / GitHub deployments)
if (!window.__imgFallbackRegistered) {
  window.__imgFallbackRegistered = true;
  window.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") {
      const img = e.target;
      let step = parseInt(img.dataset.fallbackStep || "0", 10);
      const src = img.getAttribute("src") || "";
      const candidates = [];
      if (src.includes("assets/images/")) {
        candidates.push(src.replace("assets/images/", "images/"));
        candidates.push("./" + src.replace("assets/images/", "images/"));
      } else if (src.includes("assets/")) {
        candidates.push(src.replace("assets/", ""));
      }
      if (step < candidates.length) {
        img.dataset.fallbackStep = String(step + 1);
        img.src = candidates[step];
      }
    }
  }, true);
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initHeroEntranceAndParallax();
  initProjects();
  initPrototypeLab();
  initPhotoGallery();
  initResumeModal();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initStatsCounter();
  initSkillFilters();
  initTagSphere();

  // Initialize Lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeToggleMobileBtn = document.getElementById("theme-toggle-mobile");
  const html = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem("av_theme") || "dark";
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === "light") {
      html.classList.remove("dark");
      html.classList.add("light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
    }
    localStorage.setItem("av_theme", theme);
    updateThemeIcons(theme);

    // Re-trigger particles redraw if available
    if (window.updateParticlesTheme) {
      window.updateParticlesTheme(theme);
    }
  }

  function updateThemeIcons(theme) {
    const isDark = theme === "dark";
    const darkIcons = document.querySelectorAll(".theme-icon-dark");
    const lightIcons = document.querySelectorAll(".theme-icon-light");

    darkIcons.forEach(icon => icon.classList.toggle("hidden", isDark));
    lightIcons.forEach(icon => icon.classList.toggle("hidden", !isDark));
  }

  function toggleTheme() {
    const currentTheme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener("click", toggleTheme);
  if (themeToggleMobileBtn) themeToggleMobileBtn.addEventListener("click", toggleTheme);
}

/* ==========================================================================
   2. Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById("main-header") || document.querySelector("header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-mobile-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky header glass effect on scroll (guarded with null check)
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header.classList.add("header-scrolled");
      } else {
        header.classList.remove("header-scrolled");
      }
    }, { passive: true });
  }

  // Mobile menu toggle
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = !mobileMenu.classList.contains("hidden");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", closeMobileMenu);
    }

    // Close on clicking mobile links
    mobileNavLinks.forEach(link => {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "";
  }

  // Active section indicator using IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${currentId}`) {
              link.classList.add("nav-active");
            } else {
              link.classList.remove("nav-active");
            }
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: "-80px 0px -50% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // Top of page scroll spy fallback for Home
  window.addEventListener("scroll", () => {
    if (window.scrollY < 120) {
      navLinks.forEach((link) => {
        if (link.getAttribute("href") === "#home") {
          link.classList.add("nav-active");
        } else {
          link.classList.remove("nav-active");
        }
      });
    }
  }, { passive: true });

  // Smooth scroll click handler for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: "smooth" });
          navLinks.forEach((l) => l.classList.remove("nav-active"));
          link.classList.add("nav-active");
        }
      }
    });
  });
}

/* ==========================================================================
   2.1. Hero Entrance & 3D Interactive Parallax
   (Inspired by Dymas Alfin Editorial Portfolio)
   ========================================================================== */
function initHeroEntranceAndParallax() {
  const heroSection = document.getElementById("home");
  const heroCanvas = document.querySelector(".hero-canvas");
  const portrait = document.querySelector(".hero-stage-portrait");
  const glow = document.querySelector(".hero-glow-backlight");
  const backdrop = document.querySelector(".hero-backdrop-name");

  // Mark hero-ready after initial entrance animation finishes (1.6s)
  setTimeout(() => {
    if (heroCanvas) heroCanvas.classList.add("hero-ready");
    if (heroSection) heroSection.classList.add("hero-ready");
  }, 1600);

  // If user prefers reduced motion or is on mobile touch device, skip mouse parallax
  if (
    !heroSection ||
    !portrait ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return;
  }

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    // Normalize -1 to +1
    mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  });

  heroSection.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (portrait) {
      portrait.style.transform = `translateX(calc(-50% + ${currentX * 12}px)) translateY(${currentY * 6}px)`;
    }
    if (glow) {
      glow.style.transform = `translateX(calc(-50% - ${currentX * 18}px)) translateY(${-currentY * 10}px)`;
    }
    if (backdrop) {
      backdrop.style.transform = `translate(calc(-50% + ${currentX * 6}px), calc(-50% + ${currentY * 4}px))`;
    }

    rafId = requestAnimationFrame(updateParallax);
  }

  // Start smooth parallax after entrance animation completes
  setTimeout(() => {
    rafId = requestAnimationFrame(updateParallax);
  }, 1600);
}

/* ==========================================================================
   3. Projects Showcase & Interactive Paper Stack Experience
   ========================================================================== */
function initProjects() {
  const stackContainer = document.getElementById("projects-paper-stack");

  if (!window.projectsData || !stackContainer) return;

  // Initialize Interactive Paper Stack
  initPaperStack(stackContainer);
}

  // --------------------------------------------------------------------------
  // Additive Interactive Paper Stack ("Pile of Papers" with Undo)
  // --------------------------------------------------------------------------
  function initPaperStack(container) {
    const projects = window.projectsData;
    const total = projects.length;

    // Defined organic paper tilt angles for physical realism
    const rotations = [-1.8, 2.2, -1.4, 1.9, -2.4, 1.3];

    // State:
    // stackLevel:
    // 0 = Initial Starter ("Tap to See Projects")
    // 1 to total = Projects 1 to 6 placed on stack (active top is stackLevel - 1)
    // total + 1 = Completion Card placed on top
    let stackLevel = 0;
    let isAnimating = false;

    // Render Initial Starter Cover
    function renderStarterCover() {
      container.innerHTML = "";
      stackLevel = 0;

      // Background decorative paper edge
      const paperDecor = document.createElement("div");
      paperDecor.className = "paper-card bg-slate-200/90 dark:bg-slate-900/60 border border-slate-300 dark:border-white/5 pointer-events-none";
      paperDecor.style.transform = "translate3d(0, 16px, -20px) scale(0.96) rotate(2deg)";
      paperDecor.style.opacity = "0.5";
      paperDecor.style.zIndex = "5";

      const starterCard = document.createElement("div");
      starterCard.className = "paper-card is-active-top cursor-pointer p-6 sm:p-8 md:p-10 bg-white/95 dark:bg-[#0c1222]/95 border-2 border-slate-300 dark:border-cyan-500/30 backdrop-blur-xl flex items-center justify-center paper-landing shadow-2xl";
      starterCard.style.setProperty("--paper-rot", "0deg");
      starterCard.style.zIndex = "10";
      starterCard.id = "starter-paper-card";

      starterCard.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-transparent to-cyan-500/15 pointer-events-none rounded-3xl"></div>
        
        <div class="relative z-10 text-center">
          <button id="tap-start-btn" class="tap-cta-pulse inline-flex items-center gap-3.5 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-[#00d2ff] text-white font-bold text-base sm:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300 group">
            <span class="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
              <i data-lucide="layers" class="w-4 h-4 text-white"></i>
            </span>
            <span class="tracking-wide">Tap to See Projects</span>
            <i data-lucide="arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      `;

      container.appendChild(paperDecor);
      container.appendChild(starterCard);

      starterCard.addEventListener("click", () => {
        advanceStack();
      });

      if (window.lucide) window.lucide.createIcons();
    }

    // Advance stack (adds the next paper strictly ABOVE the previous paper like a real pile)
    function advanceStack() {
      if (isAnimating) return;
      if (stackLevel > total) return;
      isAnimating = true;

      // 1. Mark current top card as covered underneath
      const prevTop = container.querySelector(".paper-card.is-active-top");
      if (prevTop) {
        prevTop.classList.remove("is-active-top");
        prevTop.classList.add("is-covered");
      }

      stackLevel++;

      // 2. Append new top paper
      let newCard;
      if (stackLevel <= total) {
        const projectIdx = stackLevel - 1;
        newCard = createStackedPaper(projects[projectIdx], projectIdx, true, true);
      } else {
        newCard = createCompletionPaper(true);
      }

      container.appendChild(newCard);
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        isAnimating = false;
      }, 420);
    }

    // Undo stack (lifts the top paper off the pile with an animation, revealing the covered card underneath)
    function undoStack() {
      if (isAnimating) return;
      if (stackLevel === 0) return;
      isAnimating = true;

      const topCard = container.querySelector(".paper-card.is-active-top");
      if (topCard) {
        topCard.classList.remove("paper-landing");
        topCard.classList.add("paper-lifting-off");
      }

      setTimeout(() => {
        if (topCard && topCard.parentNode) {
          topCard.parentNode.removeChild(topCard);
        }
        stackLevel--;

        // Uncover the previous card so it becomes active top again
        const remainingCards = container.querySelectorAll(".paper-card:not(.pointer-events-none)");
        if (remainingCards.length > 0) {
          const newTop = remainingCards[remainingCards.length - 1];
          if (newTop) {
            newTop.classList.remove("is-covered");
            newTop.classList.add("is-active-top");
          }
        }
        isAnimating = false;
      }, 360);
    }

    // Create a Stacked Project Paper Card
    function createStackedPaper(project, idx, isTop, shouldAnimate) {
      const card = document.createElement("div");
      const rot = rotations[idx % rotations.length];
      const zIndex = (idx + 1) * 10;

      card.className = `paper-card bg-white/95 dark:bg-[#0c1222]/95 border-2 border-slate-300 dark:border-white/15 backdrop-blur-xl ${isTop ? "is-active-top" : "is-covered"} ${shouldAnimate ? "paper-landing" : ""}`;
      card.style.zIndex = String(zIndex);
      card.style.setProperty("--paper-rot", `${rot}deg`);
      card.style.transform = `translate3d(0, 0, 0) rotate(${rot}deg)`;

      const badgeStyle = project.category === "ui-ux" 
        ? { bg: "bg-sky-500/10", text: "text-sky-700 dark:text-[#00d2ff]", border: "border-sky-400/30 dark:border-cyan-500/30", dot: "bg-sky-600 dark:bg-[#00d2ff]" }
        : project.category === "web"
        ? { bg: "bg-purple-500/10", text: "text-purple-700 dark:text-purple-300", border: "border-purple-400/30 dark:border-purple-500/30", dot: "bg-purple-600 dark:bg-purple-400" }
        : project.category === "game"
        ? { bg: "bg-rose-500/10", text: "text-rose-700 dark:text-rose-300", border: "border-rose-400/30 dark:border-rose-500/30", dot: "bg-rose-600 dark:bg-rose-400" }
        : { bg: "bg-sky-500/10", text: "text-sky-700 dark:text-sky-300", border: "border-sky-400/30 dark:border-sky-500/30", dot: "bg-sky-600 dark:bg-sky-400" };

      const tagsHtml = project.tags
        .slice(0, 3)
        .map(t => `<span class="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 text-slate-700 border border-slate-200/90 dark:bg-slate-950/80 dark:text-slate-300 dark:border-white/10 font-mono font-medium">${t}</span>`)
        .join("");

      const dotsHtml = projects.map((p, dIdx) => `
        <span class="h-1.5 rounded-full transition-all duration-300 ${dIdx === idx ? 'w-5 bg-[#00d2ff]' : dIdx < idx ? 'w-2 bg-purple-500/80' : 'w-2 bg-slate-300 dark:bg-slate-700'}"></span>
      `).join("");

      const isLastProject = idx === total - 1;
      const nextBtnLabel = isLastProject ? "Finish Deck" : "Next Project";

      card.innerHTML = `
        <!-- Cover Image with Gradient -->
        <div class="relative w-full h-[210px] sm:h-[240px] overflow-hidden bg-slate-100 dark:bg-slate-950 flex-shrink-0">
          <img 
            src="${project.coverImage}" 
            alt="${project.title}" 
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent dark:from-[#0c1222] dark:via-[#0c1222]/40 dark:to-transparent"></div>

          <!-- Top Overlay Badges -->
          <div class="absolute top-4 inset-x-4 flex items-center justify-between z-10">
            <span class="px-3 py-1 rounded-full text-xs font-mono font-semibold backdrop-blur-md border ${badgeStyle.border} ${badgeStyle.bg} ${badgeStyle.text} shadow-md inline-flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full ${badgeStyle.dot}"></span>
              <span>${project.badge}</span>
            </span>
            
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 text-xs font-mono font-semibold rounded-full bg-white/90 dark:bg-slate-950/85 text-slate-800 dark:text-white backdrop-blur-md border border-slate-200 dark:border-white/20 shadow-md">
                ${idx + 1} / ${total}
              </span>
            </div>
          </div>

          <!-- Role Tag -->
          <div class="absolute bottom-3 left-4 z-10">
            <span class="px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-sky-700 dark:text-[#00d2ff] bg-white/95 dark:bg-slate-950/90 rounded-md border border-sky-400/40 dark:border-cyan-500/30 shadow-sm">
              ${project.role}
            </span>
          </div>
        </div>

        <!-- Middle Info Body -->
        <div class="p-5 sm:p-6 space-y-3 flex-grow flex flex-col justify-between">
          <div class="space-y-1.5">
            <h3 class="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-2">
              ${project.title}
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
              ${project.shortDesc}
            </p>
          </div>

          <!-- Tech tags -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            ${tagsHtml}
          </div>

          <!-- Step Progress Dots -->
          <div class="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-slate-400">
            <div class="flex items-center gap-1.5">
              ${dotsHtml}
            </div>
            <span class="font-mono text-[11px] text-sky-700 dark:text-cyan-400 font-semibold">Stack: ${idx + 1} of ${total}</span>
          </div>
        </div>

        <!-- Bottom Actions (View Project, Next / Stack Above, Undo) -->
        <div class="p-4 sm:p-5 pt-3 bg-slate-50/90 dark:bg-slate-950/70 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 sm:gap-3">
          <!-- Undo Button -->
          <button class="btn-undo-paper px-3 sm:px-3.5 py-3 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700 hover:border-purple-400/60 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:scale-[1.03] active:scale-95 transition-all shadow-sm" title="Undo / Lift top paper off">
            <i data-lucide="undo-2" class="w-4 h-4 text-purple-600 dark:text-purple-400"></i>
            <span class="hidden sm:inline">Undo</span>
          </button>

          <!-- View Project Button (Calls openProjectModal) -->
          <button class="btn-view-card flex-1 py-3 px-3 sm:px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-[#00d2ff] hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-95 transition-all">
            <i data-lucide="eye" class="w-4 h-4"></i>
            <span>View Project</span>
          </button>

          <!-- Next Project / Cover Above Button -->
          <button class="btn-next-paper flex-1 py-3 px-3 sm:px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-white border border-slate-900 dark:border-slate-700 hover:border-cyan-400/70 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 transition-all group shadow-sm">
            <span>${nextBtnLabel}</span>
            <i data-lucide="layers" class="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform"></i>
          </button>
        </div>
      `;

      // Event Listeners for card actions
      const btnView = card.querySelector(".btn-view-card");
      const btnNext = card.querySelector(".btn-next-paper");
      const btnUndo = card.querySelector(".btn-undo-paper");

      if (btnView) {
        btnView.addEventListener("click", (e) => {
          e.stopPropagation();
          openProjectModal(project);
        });
      }

      if (btnNext) {
        btnNext.addEventListener("click", (e) => {
          e.stopPropagation();
          advanceStack();
        });
      }

      if (btnUndo) {
        btnUndo.addEventListener("click", (e) => {
          e.stopPropagation();
          undoStack();
        });
      }

      // Clicking anywhere on the card outside buttons also advances to next project
      card.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest("a")) return;
        advanceStack();
      });

      return card;
    }

    // Create Final Completion Paper ("You've Explored All Projects!")
    function createCompletionPaper(shouldAnimate) {
      const compCard = document.createElement("div");
      compCard.className = `paper-card is-active-top p-6 sm:p-8 md:p-10 bg-white/95 dark:bg-[#0c1222]/95 border-2 border-slate-300 dark:border-cyan-500/40 backdrop-blur-xl flex flex-col justify-between shadow-2xl ${shouldAnimate ? "paper-landing" : ""}`;
      compCard.style.zIndex = "80";
      compCard.style.setProperty("--paper-rot", "0deg");
      compCard.style.transform = "translate3d(0, 0, 0) rotate(0deg)";

      compCard.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-transparent to-cyan-500/15 pointer-events-none rounded-3xl"></div>

        <div class="relative z-10 flex items-center justify-between">
          <span class="px-3.5 py-1 rounded-full text-xs font-mono font-semibold text-sky-700 dark:text-[#00d2ff] bg-sky-500/10 border border-sky-400/30 dark:border-cyan-400/30 uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm">
            <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
            <span>All 6 Papers Stacked</span>
          </span>
        </div>

        <div class="relative z-10 my-auto py-6 text-center space-y-6">
          <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-[#00d2ff] p-0.5 shadow-2xl shadow-cyan-500/20">
            <div class="w-full h-full bg-white dark:bg-[#0c1222] rounded-[22px] flex items-center justify-center shadow-inner">
              <i data-lucide="sparkles" class="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 dark:text-[#00d2ff] animate-pulse"></i>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              You've Explored All Projects!
            </h3>
          </div>

          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button id="btn-restart-stack" class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
              <span>Explore Again</span>
            </button>

            <button id="btn-undo-completion" class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white dark:border-slate-700 hover:border-purple-400/80 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-sm">
              <i data-lucide="undo-2" class="w-4 h-4 text-purple-600 dark:text-purple-400"></i>
              <span>Undo</span>
            </button>
          </div>
        </div>
      `;

      const btnRestart = compCard.querySelector("#btn-restart-stack");
      if (btnRestart) {
        btnRestart.addEventListener("click", () => {
          renderStarterCover();
        });
      }

      const btnUndoFinish = compCard.querySelector("#btn-undo-completion");
      if (btnUndoFinish) {
        btnUndoFinish.addEventListener("click", () => {
          undoStack();
        });
      }

      return compCard;
    }

    // Touch Swipe Gesture Support for Mobile
    let touchStartX = 0;
    let touchStartY = 0;
    container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    container.addEventListener("touchend", (e) => {
      const diffX = e.changedTouches[0].screenX - touchStartX;
      const diffY = e.changedTouches[0].screenY - touchStartY;

      // Horizontal swipe threshold: 50px
      if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          // Swipe Left -> Next Project (Stack Above)
          advanceStack();
        } else {
          // Swipe Right -> Undo (Lift Off Top Paper)
          undoStack();
        }
      }
    }, { passive: true });

    // Initialize stack at starter cover
    renderStarterCover();
  }

  function createProjectCard(project, index, isBento) {
    const card = document.createElement("div");

    // Photo 2 Editorial Bento Grid Layout Mapping (6 Projects):
    // Row 1: SolarWarden (4) + Fashion Pulse (5 - not too large) + SafeDrive (3) = 12 cols
    // Row 2: SoundFlow (3) + Exmouth View Hotel (5 - not too large) + Tag or Die (4) = 12 cols
    let bentoSpan = "col-span-1 md:col-span-1 lg:col-span-6 min-h-[340px]";
    let imgFit = "object-cover object-center";

    if (isBento) {
      if (index === 0) {
        // 1. SolarWarden
        bentoSpan = "col-span-1 md:col-span-1 lg:col-span-4 min-h-[340px] lg:min-h-[370px]";
        imgFit = "object-cover object-center";
      } else if (index === 1) {
        // 2. Fashion Pulse (moderate 5 cols, not too large!)
        bentoSpan = "col-span-1 md:col-span-1 lg:col-span-5 min-h-[340px] lg:min-h-[370px]";
        imgFit = "object-cover object-top";
      } else if (index === 2) {
        // 3. SafeDrive (compact 3 cols)
        bentoSpan = "col-span-1 md:col-span-1 lg:col-span-3 min-h-[340px] lg:min-h-[370px]";
        imgFit = "object-cover object-center";
      } else if (index === 3) {
        // 4. SoundFlow (compact 3 cols)
        bentoSpan = "col-span-1 md:col-span-1 lg:col-span-3 min-h-[340px] lg:min-h-[370px]";
        imgFit = "object-cover object-center";
      } else if (index === 4) {
        // 5. Exmouth View Hotel (moderate 5 cols, not too large!)
        bentoSpan = "col-span-1 md:col-span-1 lg:col-span-5 min-h-[340px] lg:min-h-[370px]";
        imgFit = "object-cover object-center";
      } else if (index === 5) {
        // 6. Tag or Die (Roblox Experience - 4 cols)
        bentoSpan = "col-span-1 md:col-span-1 lg:col-span-4 min-h-[340px] lg:min-h-[370px]";
        imgFit = "object-cover object-center";
      }
    } else {
      bentoSpan = "col-span-1 md:col-span-6 lg:col-span-6 min-h-[360px]";
    }

    card.className = `project-bento-card group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-slate-700/60 dark:border-white/10 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all duration-500 shadow-xl hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] flex flex-col justify-between bg-slate-950 ${bentoSpan}`;
    card.setAttribute("data-aos-delay", `${index * 80}`);

    const badgeStyle = project.category === "ui-ux" 
      ? { bg: "bg-slate-950/90", text: "text-emerald-300", border: "border-emerald-500/50", dot: "bg-emerald-400" }
      : project.category === "web"
      ? { bg: "bg-slate-950/90", text: "text-purple-200", border: "border-purple-500/60", dot: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]" }
      : project.category === "game"
      ? { bg: "bg-slate-950/90", text: "text-rose-300", border: "border-rose-500/50", dot: "bg-rose-400" }
      : { bg: "bg-slate-950/90", text: "text-cyan-300", border: "border-cyan-500/50", dot: "bg-cyan-400" };

    const tagsHtml = project.tags
      .slice(0, 3)
      .map(t => `<span class="px-2.5 py-1 text-[11px] rounded-full bg-slate-950/80 text-slate-200 border border-white/15 backdrop-blur-md font-mono font-medium">${t}</span>`)
      .join("");

    card.innerHTML = `
      <!-- Full Display Image Background -->
      <div class="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
        <img 
          src="${project.coverImage}" 
          alt="${project.title}" 
          class="w-full h-full ${imgFit} transition-transform duration-700 ease-out group-hover:scale-105" 
          loading="lazy"
        />
        <!-- Ambient Vignette & Scrim Gradient for Contrast -->
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20 opacity-85 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>

      <!-- Top Header Tags -->
      <div class="relative z-10 p-4 sm:p-5 flex items-center justify-between w-full pointer-events-none">
        <span class="px-3 py-1 rounded-full text-[11px] font-mono font-semibold backdrop-blur-md border ${badgeStyle.border} ${badgeStyle.bg} ${badgeStyle.text} shadow-md inline-flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full ${badgeStyle.dot}"></span>
          <span>${project.badge}</span>
        </span>
        <span class="px-2.5 py-1 text-xs font-mono rounded-full bg-slate-950/85 text-white backdrop-blur-md border border-white/20 shadow-md">
          ${project.year}
        </span>
      </div>

      <!-- Center Hover Action Pill -->
      <div class="relative z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 pointer-events-none my-auto">
        <div class="px-5 py-2.5 rounded-full bg-white/95 dark:bg-slate-950/95 text-slate-900 dark:text-white backdrop-blur-md border border-white/20 text-xs font-bold flex items-center gap-2 shadow-2xl">
          <span>Explore Project Info</span>
          <i data-lucide="arrow-up-right" class="w-4 h-4 text-cyan-400"></i>
        </div>
      </div>

      <!-- Bottom Information Overlay -->
      <div class="relative z-10 p-5 sm:p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col justify-end">
        <div class="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-1">
          <span>${project.role}</span>
        </div>
        <h3 class="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
          ${project.title}
        </h3>
        
        <div class="flex flex-wrap items-center gap-1.5 mt-2.5">
          ${tagsHtml}
        </div>

        <div class="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 group-hover:text-cyan-300 transition-colors">
            <i data-lucide="info" class="w-3.5 h-3.5 text-cyan-400"></i>
            <span>Click picture to view full case study</span>
          </span>
          
          <div class="flex items-center gap-2">
            ${project.robloxLink ? `
              <a href="${project.robloxLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="Play on Roblox" class="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95">
                <i data-lucide="gamepad-2" class="w-3 h-3"></i>
                <span>Play</span>
              </a>
            ` : ""}
            ${(project.demoLink || project.figmaLink) && !project.robloxLink ? `
              <a href="${project.demoLink || project.figmaLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="Live Prototype" class="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95">
                <i data-lucide="external-link" class="w-3 h-3"></i>
                <span>Live</span>
              </a>
            ` : ""}
            ${(project.githubLink && project.githubLink !== "#") ? `
              <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="GitHub" class="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/10 text-[11px] flex items-center transition-all hover:scale-105 active:scale-95">
                <svg class="w-3.5 h-3.5 text-cyan-400 fill-current shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
            ` : (project.figmaLink ? `
              <a href="${project.figmaLink}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()" title="Figma Canvas" class="p-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-white/10 text-[11px] flex items-center transition-all hover:scale-105 active:scale-95">
                <svg class="w-3.5 h-3.5 shrink-0" viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/><path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/><path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/><path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/></svg>
              </a>
            ` : "")}
          </div>
        </div>
      </div>
    `;

    // Click trigger for details modal anywhere on the picture/card
    card.addEventListener("click", () => {
      openProjectModal(project);
    });

    return card;
  }

/* ==========================================================================
   4. Project Details Modal with Tab Switching
   ========================================================================== */
function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("project-modal-content");
  if (!modal || !modalContent) return;

  // Build Modal Content with Tabs
  modalContent.innerHTML = `
    <!-- Modal Header -->
    <div class="sticky top-0 z-20 flex items-center justify-between px-6 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div>
        <span class="text-xs font-semibold text-purple-600 dark:text-primary-400 tracking-wider uppercase">${project.role} • ${project.year}</span>
        <h2 class="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">${project.title}</h2>
      </div>
      <button id="close-modal-btn" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Modal Tabs Nav -->
    <div class="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-6 overflow-x-auto gap-4">
      <button class="modal-tab-btn active-tab py-3.5 px-3 text-sm font-semibold border-b-2 border-purple-600 dark:border-primary-500 text-purple-700 dark:text-white flex items-center gap-2 whitespace-nowrap" data-tab="overview">
        <i data-lucide="info" class="w-4 h-4"></i>
        <span>Overview & Impact</span>
      </button>
      <button class="modal-tab-btn py-3.5 px-3 text-sm font-semibold border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-2 whitespace-nowrap" data-tab="ux-process">
        <i data-lucide="workflow" class="w-4 h-4"></i>
        <span>UX & Architecture</span>
      </button>
      <button class="modal-tab-btn py-3.5 px-3 text-sm font-semibold border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-2 whitespace-nowrap" data-tab="features">
        <i data-lucide="layout-grid" class="w-4 h-4"></i>
        <span>Features & Telemetry</span>
      </button>
      <button class="modal-tab-btn py-3.5 px-3 text-sm font-semibold border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-2 whitespace-nowrap" data-tab="gallery">
        <i data-lucide="images" class="w-4 h-4"></i>
        <span>Screens & Prototype</span>
      </button>
    </div>

    <!-- Modal Body -->
    <div class="p-6 md:p-8 space-y-6">
      <!-- Tab 1: Overview -->
      <div class="tab-pane active" id="pane-overview">
        <div class="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-6 bg-slate-950">
          <img src="${project.coverImage}" alt="${project.title}" class="w-full max-h-96 object-cover object-top" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-4">
            <h4 class="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <i data-lucide="file-text" class="w-5 h-5 text-purple-600 dark:text-primary-400"></i>
              Project Summary
            </h4>
            <p class="text-slate-600 dark:text-slate-300 leading-relaxed text-base">${project.overview}</p>

            <h4 class="text-lg font-bold text-slate-900 dark:text-white pt-4 flex items-center gap-2">
              <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 dark:text-emerald-400"></i>
              Key Deliverables & Highlights
            </h4>
            <ul class="space-y-2">
              ${project.highlights.map(h => `
                <li class="flex items-start gap-3 text-slate-700 dark:text-slate-300 text-sm">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                  <span>${h}</span>
                </li>
              `).join("")}
            </ul>
          </div>

          <div class="rounded-2xl p-6 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
            <div>
              <h5 class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3">Project Metadata</h5>
              <div class="space-y-3 text-sm">
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block text-xs">Role</span>
                  <span class="font-medium text-slate-900 dark:text-white">${project.role}</span>
                </div>
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block text-xs">Category</span>
                  <span class="font-medium text-slate-900 dark:text-white">${project.badge}</span>
                </div>
                <div>
                  <span class="text-slate-500 dark:text-slate-400 block text-xs">Timeline</span>
                  <span class="font-medium text-slate-900 dark:text-white">${project.year}</span>
                </div>
              </div>

              <h5 class="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mt-6 mb-3">Tech & Tools</h5>
              <div class="flex flex-wrap gap-2">
                ${project.techStack.map(t => `
                  <span class="px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                    ${t.name}
                  </span>
                `).join("")}
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200 dark:border-slate-700/60 space-y-2">
              ${project.robloxLink ? `
                <a href="${project.robloxLink}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]">
                  <i data-lucide="gamepad-2" class="w-4 h-4"></i>
                  <span>Play Experience on Roblox</span>
                </a>
              ` : ""}
              ${project.figmaLink ? `
                <a href="${project.figmaLink}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition-colors">
                  <svg class="w-4 h-4 shrink-0" viewBox="0 0 38 57" fill="none"><path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/><path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/><path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/><path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/><path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/></svg>
                  <span>Open in Figma Design</span>
                </a>
              ` : ""}
              ${project.demoLink && !project.robloxLink && project.demoLink !== project.figmaLink ? `
                <a href="${project.demoLink}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-medium text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors">
                  <i data-lucide="play" class="w-4 h-4"></i>
                  <span>Interactive Prototype</span>
                </a>
              ` : ""}
              ${project.githubLink && project.githubLink !== "#" ? `
                <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-medium text-sm flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-colors">
                  <svg class="w-4 h-4 text-cyan-500 fill-current shrink-0" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  <span>View Repository on GitHub</span>
                </a>
              ` : ""}
            </div>
          </div>
        </div>
      </div>

      <!-- Tab 2: UX Process -->
      <div class="tab-pane hidden" id="pane-ux-process">
        <div class="space-y-6">
          <div class="p-4 rounded-xl bg-purple-50 dark:bg-primary-500/10 border border-purple-200 dark:border-primary-500/20 text-purple-800 dark:text-primary-300 text-sm">
            💡 <strong>UI/UX Design Methodology:</strong> User-centered research, responsive hierarchy, iterative component prototyping, and ergonomic design guidelines.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${project.uxProcess.map(step => `
              <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                <span class="text-xs font-mono font-bold text-purple-600 dark:text-primary-400 uppercase tracking-wider mb-2">${step.step}</span>
                <p class="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">${step.description}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Tab 3: Key Features -->
      <div class="tab-pane hidden" id="pane-features">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${project.keyFeatures.map(f => `
            <div class="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
              <div class="p-3 rounded-xl bg-purple-100 dark:bg-primary-500/10 text-purple-700 dark:text-primary-400 border border-purple-200 dark:border-primary-500/20 flex-shrink-0">
                <i data-lucide="${f.icon || 'star'}" class="w-5 h-5"></i>
              </div>
              <div>
                <h5 class="text-base font-semibold text-slate-900 dark:text-white mb-1">${f.title}</h5>
                <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">${f.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Tab 4: Screens & Gallery -->
      <div class="tab-pane hidden" id="pane-gallery">
        <div class="space-y-6">
          <p class="text-sm text-slate-600 dark:text-slate-400">High-resolution board preview and prototype assets:</p>
          ${project.gallery.map(img => `
            <div class="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 p-2">
              <img src="${img}" alt="Preview Screen" class="w-full rounded-xl object-contain cursor-zoom-in" onclick="openPhotoLightbox('${img}', '${project.title}')" />
            </div>
          `).join("")}
          ${project.figmaLink ? `
            <div class="p-6 rounded-2xl bg-gradient-to-r from-purple-100 via-indigo-50 to-slate-100 dark:from-purple-950/40 dark:to-slate-900 border border-purple-200 dark:border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h5 class="text-base font-bold text-slate-900 dark:text-white">Experience Live Figma Canvas</h5>
                <p class="text-xs text-slate-600 dark:text-slate-400">Inspect full vector nodes, artboards, and transitions directly on Figma.</p>
              </div>
              <a href="${project.figmaLink}" target="_blank" rel="noopener noreferrer" class="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm flex items-center gap-2 whitespace-nowrap transition-colors shadow-md">
                <span>View Full Figma File</span>
                <i data-lucide="external-link" class="w-4 h-4"></i>
              </a>
            </div>
          ` : ""}
        </div>
      </div>
    </div>
  `;

  // Open Modal
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Re-init lucide icons in modal
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Close handlers
  const closeBtn = document.getElementById("close-modal-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  document.onkeydown = (e) => {
    if (e.key === "Escape") closeModal();
  };

  function closeModal() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
    document.onkeydown = null;
  }

  // Tab switching inside modal
  const tabBtns = modalContent.querySelectorAll(".modal-tab-btn");
  const panes = modalContent.querySelectorAll(".tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      tabBtns.forEach(b => {
        b.classList.remove("active-tab", "border-purple-600", "dark:border-primary-500", "text-purple-700", "dark:text-white");
        b.classList.add("border-transparent", "text-slate-500", "dark:text-slate-400");
      });
      btn.classList.add("active-tab", "border-purple-600", "dark:border-primary-500", "text-purple-700", "dark:text-white");
      btn.classList.remove("border-transparent", "text-slate-500", "dark:text-slate-400");

      panes.forEach(pane => {
        pane.classList.add("hidden");
        if (pane.id === `pane-${targetTab}`) {
          pane.classList.remove("hidden");
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive UI/UX Prototype Lab (Device Frames)
   ========================================================================== */
function initPrototypeLab() {
  const labSelectBtns = document.querySelectorAll(".lab-project-btn");
  if (!labSelectBtns || labSelectBtns.length === 0) return;
  const deviceScreen = document.getElementById("lab-screen-img");
  const labTitle = document.getElementById("lab-project-title");
  const labDesc = document.getElementById("lab-project-desc");
  const labLink = document.getElementById("lab-figma-link");
  const mobileFrame = document.getElementById("lab-mobile-frame");
  const desktopFrame = document.getElementById("lab-desktop-frame");
  const desktopScreen = document.getElementById("lab-desktop-img");

  const labProjects = {
    solarwarden: {
      type: "mobile",
      title: "SolarWarden — IoT Solar Tracking & Panel Monitoring",
      desc: "Interactive mobile UI prototype with live telemetry, automated obstruction diagnostics, and cleaner triggers designed in Figma.",
      screen: "images/solarwarden-figma.png",
      figma: "https://www.figma.com/design/qR8RTnQgU09SgX2auEqLV8/PROTOTYPE-capstone-?node-id=0-1&t=Okb7KvRZAGEPW6UT-1"
    },
    resort: {
      type: "desktop",
      title: "Exmouth View Hotel — Luxury Coastal Resort & Web Experience",
      desc: "Luxury dark-mode hospitality interface with dynamic daily culinary menu showcase and hotel booking workflows.",
      screen: "images/project-exmouth.jpg",
      figma: "https://www.figma.com/design/cklyNi3mkIxAfuTIZj1qvF/Untitled?node-id=0-1&t=Okb7KvRZAGEPW6UT-1"
    },
    fashionpulse: {
      type: "desktop",
      title: "Fashion Pulse — Dynamic Trend Discovery Platform",
      desc: "Editorial layout, Style Lens visual discovery feed, and high-fashion trend curation platform.",
      screen: "images/fashionpulse/style1.png",
      figma: "https://www.figma.com/design/cklyNi3mkIxAfuTIZj1qvF/Untitled?node-id=0-1&t=Okb7KvRZAGEPW6UT-1"
    }
  };

  labSelectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      labSelectBtns.forEach(b => b.classList.remove("active-lab"));
      btn.classList.add("active-lab");

      const key = btn.getAttribute("data-lab");
      const data = labProjects[key];
      if (!data) return;

      if (labTitle) labTitle.textContent = data.title;
      if (labDesc) labDesc.textContent = data.desc;
      if (labLink) labLink.setAttribute("href", data.figma);

      if (data.type === "mobile") {
        if (mobileFrame) mobileFrame.classList.remove("hidden");
        if (desktopFrame) desktopFrame.classList.add("hidden");
        if (deviceScreen) deviceScreen.src = data.screen;
      } else {
        if (mobileFrame) mobileFrame.classList.add("hidden");
        if (desktopFrame) desktopFrame.classList.remove("hidden");
        if (desktopScreen) desktopScreen.src = data.screen;
      }
    });
  });
}

/* ==========================================================================
   6. Photo Gallery & Lightbox
   ========================================================================== */
function initPhotoGallery() {
  const photos = document.querySelectorAll(".lifestyle-photo-trigger");
  photos.forEach(img => {
    img.addEventListener("click", () => {
      const src = img.getAttribute("src");
      const caption = img.getAttribute("alt") || "Albert S. Villasor";
      openPhotoLightbox(src, caption);
    });
  });
}

function openPhotoLightbox(src, caption) {
  let lightbox = document.getElementById("photo-lightbox");
  if (!lightbox) {
    lightbox = document.createElement("div");
    lightbox.id = "photo-lightbox";
    lightbox.className = "fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4";
    lightbox.innerHTML = `
      <button id="close-lightbox" class="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      <div class="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-700 shadow-2xl bg-slate-900">
        <img id="lightbox-img" src="" alt="" class="max-w-full max-h-[75vh] object-contain" />
        <div id="lightbox-caption" class="p-4 text-center text-sm font-medium text-slate-300 bg-slate-900 border-t border-slate-800"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
    if (window.lucide) window.lucide.createIcons();

    lightbox.querySelector("#close-lightbox").onclick = () => {
      lightbox.classList.add("hidden");
      document.body.style.overflow = "";
    };
    lightbox.onclick = (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add("hidden");
        document.body.style.overflow = "";
      }
    };
  }

  lightbox.querySelector("#lightbox-img").src = src;
  lightbox.querySelector("#lightbox-caption").textContent = caption;
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

/* ==========================================================================
   7. Resume / CV Interactive Modal & Print
   ========================================================================== */
function initResumeModal() {
  const openResumeBtns = document.querySelectorAll(".open-resume-btn");
  const resumeModal = document.getElementById("resume-modal");
  const closeResumeBtn = document.getElementById("close-resume-btn");
  const printResumeBtn = document.getElementById("print-resume-btn");

  if (!resumeModal) return;

  openResumeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      resumeModal.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeResumeBtn) {
    closeResumeBtn.addEventListener("click", () => {
      resumeModal.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }

  resumeModal.onclick = (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.add("hidden");
      document.body.style.overflow = "";
    }
  };

  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ==========================================================================
   8. Contact Form & Feedback Toasts
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Sending Message...</span>
    `;

    // Simulated network delay
    setTimeout(() => {
      showToast("Message sent successfully! Thank you for reaching out, I'll reply promptly.");
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  });
}

/* ==========================================================================
   9. One-Click Copy Email
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll(".copy-email-btn");
  const email = "albertvillasor6@gmail.com";

  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(email).then(() => {
        showToast("Email copied to clipboard: " + email);
      }).catch(() => {
        showToast("Direct email: " + email);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "fixed bottom-8 right-8 z-50 px-5 py-3.5 rounded-2xl bg-slate-900 text-white border border-purple-500/40 shadow-2xl backdrop-blur-md flex items-center gap-3 transform translate-y-12 opacity-0 transition-all duration-300 text-sm font-medium";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i data-lucide="check-circle" class="w-5 h-5 text-emerald-400"></i>
    <span>${message}</span>
  `;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.remove("translate-y-12", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-12", "opacity-0");
  }, 3500);
}

/* ==========================================================================
   10. Back To Top Floating Trigger
   ========================================================================== */
function initBackToTop() {
  const bttBtn = document.getElementById("back-to-top");
  if (!bttBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      bttBtn.classList.remove("hidden", "opacity-0");
      bttBtn.classList.add("flex", "opacity-100");
    } else {
      bttBtn.classList.add("opacity-0");
      setTimeout(() => {
        if (window.scrollY <= 400) bttBtn.classList.add("hidden");
      }, 300);
    }
  });

  bttBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================================================
   11. Stats Counter Animated Increment
   ========================================================================== */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-counter");
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetNum = parseInt(target.getAttribute("data-target"), 10);
        let current = 0;
        const increment = Math.ceil(targetNum / 30);
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNum) {
            target.textContent = targetNum;
            clearInterval(timer);
          } else {
            target.textContent = current;
          }
        }, 30);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
}

/* ==========================================================================
   12. Technical Skills Interactive Category Filter
   ========================================================================== */
function initSkillFilters() {
  const filterBtns = document.querySelectorAll(".skill-tab-btn");
  const skillCards = document.querySelectorAll(".tech-skill-card");
  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active-skill-tab"));
      btn.classList.add("active-skill-tab");

      const category = btn.getAttribute("data-category");

      skillCards.forEach(card => {
        const cardCat = card.getAttribute("data-category") || "";
        if (category === "all" || cardCat.includes(category)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   13. 3D Rotating Tag Sphere (Matching 2nd Photo Style)
   ========================================================================== */
function initTagSphere() {
  const container = document.getElementById("tag-sphere");
  if (!container) return;

  const skills = [
    { text: "HTML", isCore: true, size: 28 },
    { text: "CSS", isCore: true, size: 28 },
    { text: "JavaScript", isCore: true, size: 32 },
    { text: "Java", isCore: true, size: 28 },
    { text: "C++", isCore: true, size: 28 },
    { text: "Flutter", isCore: true, size: 28 },
    { text: "Figma", isCore: true, size: 28 },
    { text: "HTML5", isCore: false, size: 17 },
    { text: "CSS3", isCore: false, size: 17 },
    { text: "Dart", isCore: false, size: 18 },
    { text: "Tailwind", isCore: false, size: 17 },
    { text: "Responsive", isCore: false, size: 16 },
    { text: "UI/UX", isCore: false, size: 19 },
    { text: "Git", isCore: false, size: 17 },
    { text: "ES6+", isCore: false, size: 16 },
    { text: "REST APIs", isCore: false, size: 15 },
    { text: "Prototyping", isCore: false, size: 15 },
    { text: "Wireframing", isCore: false, size: 15 },
    { text: "OOP", isCore: false, size: 16 },
    { text: "JSON", isCore: false, size: 14 },
    { text: "Algorithms", isCore: false, size: 15 },
    { text: "Mobile Apps", isCore: false, size: 16 },
    { text: "Clean Code", isCore: false, size: 15 },
  ];

  container.innerHTML = "";
  const count = skills.length;

  function getRadius() {
    const w = container.offsetWidth || 500;
    return Math.min(w * 0.44, 220);
  }

  let radius = getRadius();

  // Create DOM elements and compute Fibonacci sphere coordinates
  const items = skills.map((skill, i) => {
    const el = document.createElement("span");
    el.className = "sphere-tag";
    el.textContent = skill.text;

    if (skill.isCore) {
      el.classList.add("sphere-tag-core");
    } else {
      el.classList.add("sphere-tag-sub");
    }

    el.style.fontSize = `${skill.size}px`;
    container.appendChild(el);

    // Golden spiral distribution on sphere
    const phi = Math.acos(-1 + (2 * i + 1) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;

    return {
      el,
      skill,
      x: radius * Math.cos(theta) * Math.sin(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(phi),
    };
  });

  let vx = 0.0025;
  let vy = 0.003;
  let targetVx = 0.0025;
  let targetVy = 0.003;

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (e.clientX - cx) / (rect.width / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    targetVy = nx * 0.016;
    targetVx = -ny * 0.016;
  });

  container.addEventListener("mouseleave", () => {
    targetVx = 0.002;
    targetVy = 0.0025;
  });

  // Touch support for mobile devices
  container.addEventListener("touchmove", (e) => {
    if (!e.touches.length) return;
    const rect = container.getBoundingClientRect();
    const touch = e.touches[0];
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (touch.clientX - cx) / (rect.width / 2);
    const ny = (touch.clientY - cy) / (rect.height / 2);
    targetVy = nx * 0.02;
    targetVx = -ny * 0.02;
  }, { passive: true });

  window.addEventListener("resize", () => {
    radius = getRadius();
  });

  function render() {
    vx += (targetVx - vx) * 0.07;
    vy += (targetVy - vy) * 0.07;

    const cosX = Math.cos(vx);
    const sinX = Math.sin(vx);
    const cosY = Math.cos(vy);
    const sinY = Math.sin(vy);

    const isLight = document.documentElement.classList.contains("light");

    items.forEach(item => {
      // Rotate around X
      const y1 = item.y * cosX - item.z * sinX;
      const z1 = item.y * sinX + item.z * cosX;

      // Rotate around Y
      const x2 = item.x * cosY + z1 * sinY;
      const z2 = -item.x * sinY + z1 * cosY;

      item.x = x2;
      item.y = y1;
      item.z = z2;

      // Depth from 0 (farthest back) to 1 (closest front)
      const depth = (item.z + radius) / (2 * radius);
      const scale = 0.65 + depth * 0.58; // 0.65 to 1.23
      const alpha = 0.22 + depth * 0.78; // 0.22 to 1.0

      item.el.style.transform = `translate(-50%, -50%) translate3d(${item.x}px, ${item.y}px, 0px) scale(${scale})`;
      item.el.style.opacity = alpha;
      item.el.style.zIndex = Math.round(depth * 100);

      // Depth color lighting for 3D sphere (adaptive for dark & light mode)
      if (isLight) {
        if (item.skill.isCore) {
          item.el.style.color = depth > 0.35 ? "#0284c7" : "#0369a1";
          item.el.style.textShadow = depth > 0.35 ? "0 2px 10px rgba(2, 132, 199, 0.35)" : "none";
          item.el.style.fontWeight = "800";
        } else {
          item.el.style.color = depth > 0.45 ? "#334155" : "#64748b";
          item.el.style.textShadow = "none";
          item.el.style.fontWeight = "600";
        }
      } else {
        if (item.skill.isCore) {
          item.el.style.color = depth > 0.35 ? "#00d2ff" : "#0ea5e9";
          item.el.style.textShadow = depth > 0.35 ? "0 0 18px rgba(0, 210, 255, 0.75)" : "none";
          item.el.style.fontWeight = "800";
        } else {
          item.el.style.color = depth > 0.45 ? "#38bdf8" : "#64748b";
          item.el.style.textShadow = depth > 0.45 ? "0 0 10px rgba(56, 189, 248, 0.4)" : "none";
          item.el.style.fontWeight = "600";
        }
      }
    });

    requestAnimationFrame(render);
  }

  window.addEventListener("resize", () => {
    const oldR = radius;
    radius = getRadius();
    if (oldR > 0 && radius !== oldR) {
      const ratio = radius / oldR;
      items.forEach(it => {
        it.x *= ratio;
        it.y *= ratio;
        it.z *= ratio;
      });
    }
  }, { passive: true });

  render();
}

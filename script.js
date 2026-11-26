const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
const linkedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

document.querySelectorAll(".gallery-carousel").forEach((carousel) => {
  const gallery = carousel.querySelector(".industrial-gallery");
  const slides = [...gallery.querySelectorAll("figure")];
  const nextButton = carousel.querySelector("[data-gallery-next]");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });

  slides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.removeAttribute("role");
    clone.removeAttribute("aria-roledescription");
    clone.removeAttribute("aria-label");
    gallery.append(clone);
  });

  const getCycleWidth = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(gallery).columnGap);
    return slides.length * (slideWidth + gap);
  };

  const resetLoopPosition = () => {
    const cycleWidth = getCycleWidth();
    if (gallery.scrollLeft < cycleWidth - 1) return;

    gallery.scrollTo({
      left: gallery.scrollLeft - cycleWidth,
      behavior: "instant",
    });
  };

  let loopResetTimer;
  gallery.addEventListener("scrollend", resetLoopPosition);
  gallery.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(loopResetTimer);
      loopResetTimer = window.setTimeout(resetLoopPosition, 350);
    },
    { passive: true },
  );

  const moveGalleryForward = () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(gallery).columnGap);
    const behavior = prefersReducedMotion.matches
      ? "auto"
      : "smooth";

    gallery.scrollTo({
      left: gallery.scrollLeft + slideWidth + gap,
      behavior,
    });
  };

  nextButton.addEventListener("click", moveGalleryForward);

  let isVisible = false;
  let autoplayTimer;

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  };

  const startAutoplay = () => {
    if (
      !isVisible ||
      prefersReducedMotion.matches ||
      autoplayTimer
    ) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      if (
        !isVisible ||
        prefersReducedMotion.matches
      ) {
        stopAutoplay();
        return;
      }

      moveGalleryForward();
    }, 2500);
  };

  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      if (isVisible) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    },
    { threshold: 0.15 },
  );

  prefersReducedMotion.addEventListener("change", () => {
    if (prefersReducedMotion.matches) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });
  visibilityObserver.observe(carousel);
});

let scrollUpdateScheduled = false;

const updateActiveSection = () => {
  const activationPoint = document.querySelector(".site-header").offsetHeight + 1;
  const currentSection = linkedSections.find((section) => {
    const bounds = section.getBoundingClientRect();
    return bounds.top <= activationPoint && bounds.bottom > activationPoint;
  });
  const isAtPageBottom =
    window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  const activeSection =
    currentSection || (isAtPageBottom ? linkedSections[linkedSections.length - 1] : null);

  sectionLinks.forEach((link) => {
    const isActive = activeSection
      ? link.getAttribute("href") === `#${activeSection.id}`
      : false;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const scheduleActiveSectionUpdate = () => {
  if (scrollUpdateScheduled) return;
  scrollUpdateScheduled = true;
  window.requestAnimationFrame(() => {
    updateActiveSection();
    scrollUpdateScheduled = false;
  });
};

window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate);
updateActiveSection();

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealTargets = [
    ...document.querySelectorAll("main > section:not(#home)"),
  ];
  let lastRevealScrollY = window.scrollY;
  let isScrollingDown = false;
  let revealUpdateScheduled = false;

  window.addEventListener(
    "scroll",
    () => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY > lastRevealScrollY;
      lastRevealScrollY = currentScrollY;
      if (!isScrollingDown || revealUpdateScheduled) return;

      revealUpdateScheduled = true;
      window.requestAnimationFrame(() => {
        if (!isScrollingDown) {
          revealUpdateScheduled = false;
          return;
        }

        revealTargets.forEach((target) => {
          if (target.dataset.scrollRevealed) return;

          const bounds = target.getBoundingClientRect();
          if (bounds.top >= window.innerHeight || bounds.bottom <= 0) return;

          target.dataset.scrollRevealed = "true";
          target.animate(
            [
              { opacity: 0, transform: "translateY(32px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 700,
              delay: 100,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "both",
            },
          );
        });
        revealUpdateScheduled = false;
      });
    },
    { passive: true },
  );
}

document.getElementById("year").textContent = new Date().getFullYear();

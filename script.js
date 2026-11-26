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
  const previousButton = carousel.querySelector("[data-gallery-prev]");
  const nextButton = carousel.querySelector("[data-gallery-next]");

  slides.forEach((slide, index) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${slides.length}`);
  });

  const updateControls = () => {
    previousButton.disabled = gallery.scrollLeft <= 1;
    nextButton.disabled =
      gallery.scrollLeft + gallery.clientWidth >= gallery.scrollWidth - 1;
  };

  const scrollBySlide = (direction) => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(gallery).columnGap);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    gallery.scrollBy({ left: direction * (slideWidth + gap), behavior });
  };

  previousButton.addEventListener("click", () => scrollBySlide(-1));
  nextButton.addEventListener("click", () => scrollBySlide(1));
  gallery.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  updateControls();
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

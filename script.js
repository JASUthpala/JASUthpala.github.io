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

document.getElementById("year").textContent = new Date().getFullYear();

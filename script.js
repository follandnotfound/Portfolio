const navLinks = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const defaultSection = "about";

function setActiveSection(sectionId) {
  sections.forEach((section) => {
    const isActive = section.id === sectionId;
    section.classList.toggle("active", isActive);
    section.classList.toggle("section-transition", false);
    if (isActive) {
      section.offsetWidth; // force reflow to restart animation
      section.classList.add("section-transition");
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", targetId === sectionId);
  });
}

function navigateToHash() {
  const hash = window.location.hash.replace("#", "");
  const sectionId = hash && document.getElementById(hash) ? hash : defaultSection;
  setActiveSection(sectionId);
  history.replaceState(null, "", `#${sectionId}`);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute("href").replace("#", "");
    if (document.getElementById(sectionId)) {
      setActiveSection(sectionId);
      history.replaceState(null, "", `#${sectionId}`);
    }
  });
});

function createSkillPill(name) {
  const pill = document.createElement("span");
  pill.textContent = name;
  pill.dataset.skill = name;
  return pill;
}

const skillsGrid = document.getElementById("skills-grid");

skillsGrid.addEventListener("click", (event) => {
  if (event.target.matches("#skills-grid span")) {
    const skill = event.target.dataset.skill || event.target.textContent.trim();
    if (confirm(`Remove ${skill}?`)) {
      event.target.remove();
    }
  }
});

window.addEventListener("hashchange", navigateToHash);
window.addEventListener("DOMContentLoaded", () => {
  navigateToHash();
});

const projectsContainer = document.querySelector(".projects");
if (projectsContainer) {
  projectsContainer.addEventListener("wheel", (event) => {
    if (event.deltaY === 0 && event.deltaX === 0) return;
    event.preventDefault();
    projectsContainer.scrollLeft += event.deltaY + event.deltaX;
  }, { passive: false });

  let isDragging = false;
  let dragStartX = 0;
  let scrollStart = 0;

  projectsContainer.addEventListener("mousedown", (event) => {
    isDragging = true;
    projectsContainer.classList.add("dragging");
    dragStartX = event.pageX - projectsContainer.offsetLeft;
    scrollStart = projectsContainer.scrollLeft;
  });

  projectsContainer.addEventListener("mouseleave", () => {
    isDragging = false;
    projectsContainer.classList.remove("dragging");
  });

  projectsContainer.addEventListener("mouseup", () => {
    isDragging = false;
    projectsContainer.classList.remove("dragging");
  });

  projectsContainer.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.pageX - projectsContainer.offsetLeft;
    const walk = (x - dragStartX) * 1;
    projectsContainer.scrollLeft = scrollStart - walk;
  });
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("menu-open");
});

// Close mobile menu after clicking a navigation link
document.querySelectorAll(".navbar nav a").forEach(link => {
  link.addEventListener("click", () => navbar.classList.remove("menu-open"));
});

// Hero color slider
const sliderButtons = document.querySelectorAll("[data-slide]");
const hero = document.querySelector(".hero");
const heroColors = ["#eee9f1", "#e8e2eb", "#f0edf2", "#e4dfe8"];
let heroIndex = 0;

sliderButtons.forEach(button => {
  button.addEventListener("click", () => {
    heroIndex += Number(button.dataset.slide);
    if (heroIndex < 0) heroIndex = heroColors.length - 1;
    if (heroIndex >= heroColors.length) heroIndex = 0;
    hero.style.backgroundColor = heroColors[heroIndex];
  });
});

// Marketplace category filters + search
const filters = document.querySelectorAll(".filter");
const marketCards = document.querySelectorAll(".market-card");
const marketSearch = document.getElementById("marketSearch");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

function updateMarketplace() {
  const query = marketSearch.value.toLowerCase().trim();
  let visible = 0;

  marketCards.forEach(card => {
    const category = card.dataset.category;
    const name = card.dataset.name.toLowerCase();

    const matchesFilter = activeFilter === "all" || category === activeFilter;
    const matchesSearch = !query || name.includes(query);

    const show = matchesFilter && matchesSearch;
    card.style.display = show ? "" : "none";

    if (show) visible++;
  });

  emptyState.style.display = visible ? "none" : "block";
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");
    activeFilter = filter.dataset.filter;
    updateMarketplace();
  });
});

marketSearch.addEventListener("input", updateMarketplace);

// Active section in navbar
const sections = document.querySelectorAll("main > section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.target.id}`
      );
    });
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));

// Simple reveal animation
const revealItems = document.querySelectorAll(
  ".product-card, .market-card, .partner-row, .partner-feature, .about-copy"
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "opacity .6s ease, transform .6s ease";
  revealObserver.observe(item);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".revealed").forEach(item => {
    item.style.opacity = "1";
    item.style.transform = "translateY(0)";
  });
});

// Keep reveal styles working when the class is added dynamically.
const style = document.createElement("style");
style.textContent = `
  .revealed {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

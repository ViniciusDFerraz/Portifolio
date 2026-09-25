document.addEventListener("DOMContentLoaded", () => {
  const rule = document.getElementById("heroRule");
  if (rule) {
    // single orchestrated reveal on load
    requestAnimationFrame(() => rule.classList.add("draw"));
  }

  initLanguageToggle();
  initScrollSpy();
});

function initScrollSpy() {
  const sections = document.querySelectorAll("main .section, main .hero");
  const navLinks = document.querySelectorAll(".titleblock__nav a[href^='#']");
  if (!sections.length || !navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => {
    if (section.id) observer.observe(section);
  });
}

function initLanguageToggle() {
  const en = {
    "nav.projects": "Projects",
    "nav.education": "Education",
    "nav.contact": "Contact",
    "hero.eyebrow": "Capivari, Brazil",
    "hero.role": "Computer Engineering student — software, applied AI and electrical maintenance",
    "hero.lede": "I like technology and modernization — applying that both in code and in everyday processes.",
    "section.projects": "Projects",
    "project.tagline": "Tiro de Guerra Management System",
    "project.desc": "Multi-tenant SaaS platform for Brazilian Tiro de Guerra units: recruit management, attendance and disciplinary tracking, official document generation, service schedules and recurring billing through a payment gateway.",
    "project.link.site": "Visit site",
    "project.empty": "More projects in progress.",
    "section.education": "Education",
    "edu.univesp.title": "Computer Engineering",
    "edu.univesp.detail": "Algorithms, programming, databases, automation.",
    "edu.senai.title": "Maintenance Electrician",
    "edu.senai.detail": "Predictive and preventive maintenance, electrical installations.",
    "edu.cert.period": "Certificate",
    "edu.cert.title": "AI Professional",
    "section.contact": "Contact"
  };

  const toggle = document.getElementById("langToggle");
  const nodes = document.querySelectorAll("[data-i18n]");
  const pt = {};
  nodes.forEach((node) => {
    pt[node.getAttribute("data-i18n")] = node.innerHTML;
  });

  let current = "pt";

  function apply(lang) {
    nodes.forEach((node) => {
      const key = node.getAttribute("data-i18n");
      node.innerHTML = lang === "en" ? (en[key] ?? pt[key]) : pt[key];
    });
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    if (toggle) toggle.textContent = lang === "en" ? "PT" : "EN";
    current = lang;
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      apply(current === "pt" ? "en" : "pt");
    });
  }
}

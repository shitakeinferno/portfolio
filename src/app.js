const header = document.querySelector(".site-header");
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 12);
}

function updateActiveLink() {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top < window.innerHeight * 0.35)
    .at(-1);

  navLinks.forEach((link) => {
    link.toggleAttribute("aria-current", current && link.hash === `#${current.id}`);
  });
}

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
});

updateHeader();
updateActiveLink();

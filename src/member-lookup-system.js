const scanQr = document.querySelector("#scanQr");
const clearSearch = document.querySelector("#clearSearch");
const lookupForm = document.querySelector("#lookupForm");
const lookupState = document.querySelector("#lookupState");
const scanLine = document.querySelector("#scanLine");
const selectedMember = document.querySelector("#selectedMember");
const modeButtons = [...document.querySelectorAll(".search-mode-grid button")];
const candidateCards = [...document.querySelectorAll(".candidate-card")];
const navItems = [...document.querySelectorAll(".side-nav a")];

function setState(text) {
  lookupState.textContent = text;
}

function runSearch(source) {
  setState(`${source} search`);
  scanLine.textContent = `${source} matched`;
  window.setTimeout(() => setState("Ready"), 1200);
}

scanQr.addEventListener("click", () => {
  runSearch("QR");
});

lookupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runSearch("Manual");
});

clearSearch.addEventListener("click", () => {
  lookupForm.reset();
  setState("Cleared");
  scanLine.textContent = "Scan standby";
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    setState(`${button.textContent.trim()} mode`);
  });
});

candidateCards.forEach((card) => {
  card.addEventListener("click", () => {
    candidateCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    selectedMember.textContent = card.dataset.member;
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

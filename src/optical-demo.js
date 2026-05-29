const navItems = [...document.querySelectorAll(".side-nav a")];
const inventoryTabs = [...document.querySelectorAll(".inventory-tabs button")];
const metricToggles = [...document.querySelectorAll("[data-metric-toggle]")];

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

metricToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const metric = document.querySelector(`[data-metric="${toggle.dataset.metricToggle}"]`);
    metric.hidden = !toggle.checked;
  });
});

inventoryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    inventoryTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
  });
});

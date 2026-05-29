const advanceWork = document.querySelector("#advanceWork");
const resetWork = document.querySelector("#resetWork");
const selectedWork = document.querySelector("#selectedWork");
const handoffState = document.querySelector("#handoffState");
const contactState = document.querySelector("#contactState");
const sendContact = document.querySelector("#sendContact");
const checkProgress = document.querySelector("#checkProgress");
const workCards = [...document.querySelectorAll(".work-card")];
const checkboxes = [...document.querySelectorAll(".checklist-grid input")];
const navItems = [...document.querySelectorAll(".side-nav a")];

const stageOrder = ["waiting", "processing", "inspection", "ready"];
const stageLabels = {
  waiting: "加工待ち",
  processing: "加工中",
  inspection: "検品",
  ready: "受け渡し待ち",
};

let activeStageIndex = 0;

function updateChecklist() {
  const checked = checkboxes.filter((item) => item.checked).length;
  checkProgress.textContent = `${checked} / ${checkboxes.length} checked`;
  handoffState.textContent = checked === checkboxes.length ? "Ready" : "Not ready";
}

function setActiveCard(card) {
  workCards.forEach((item) => item.classList.remove("active"));
  card.classList.add("active");
  selectedWork.textContent = card.dataset.order;
}

function updateStageText() {
  const stage = stageOrder[activeStageIndex];
  advanceWork.textContent = stage === "ready" ? "受け渡し待ち" : "次の工程へ";
  selectedWork.textContent = `A-1024 / ${stageLabels[stage]}`;
}

advanceWork.addEventListener("click", () => {
  activeStageIndex = Math.min(activeStageIndex + 1, stageOrder.length - 1);
  updateStageText();
});

resetWork.addEventListener("click", () => {
  activeStageIndex = 0;
  checkboxes.forEach((item, index) => {
    item.checked = index < 2;
  });
  contactState.textContent = "検品完了後にSMS送信";
  updateStageText();
  updateChecklist();
});

workCards.forEach((card) => {
  card.addEventListener("click", () => setActiveCard(card));
});

checkboxes.forEach((item) => {
  item.addEventListener("change", updateChecklist);
});

sendContact.addEventListener("click", () => {
  contactState.textContent = "SMS送信済み。来店予定を確認中";
  handoffState.textContent = "Contacted";
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

updateStageText();
updateChecklist();

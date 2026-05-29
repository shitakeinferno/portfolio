const confirmSale = document.querySelector("#confirmSale");
const resetSale = document.querySelector("#resetSale");
const saleState = document.querySelector("#saleState");
const stockState = document.querySelector("#stockState");
const subtotal = document.querySelector("#subtotal");
const discountDisplay = document.querySelector("#discountDisplay");
const grandTotal = document.querySelector("#grandTotal");
const balanceAmount = document.querySelector("#balanceAmount");
const discountAmount = document.querySelector("#discountAmount");
const depositAmount = document.querySelector("#depositAmount");
const frameStockText = document.querySelector("#frameStockText");
const lensStockText = document.querySelector("#lensStockText");
const workTaskText = document.querySelector("#workTaskText");
const taskCount = document.querySelector("#taskCount");
const afterSaleTasks = document.querySelector("#afterSaleTasks");
const lineItems = [...document.querySelectorAll(".line-item input[type='checkbox']")];
const navItems = [...document.querySelectorAll(".side-nav a")];

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

function selectedTotal() {
  return lineItems
    .filter((item) => item.checked)
    .reduce((total, item) => total + Number(item.dataset.price), 0);
}

function updateTotals() {
  const rawSubtotal = selectedTotal();
  const discount = Math.min(Number(discountAmount.value) || 0, rawSubtotal);
  const total = Math.max(0, rawSubtotal - discount);
  const deposit = Math.min(Number(depositAmount.value) || 0, total);

  subtotal.textContent = yen.format(rawSubtotal);
  discountDisplay.textContent = `-${yen.format(discount)}`;
  grandTotal.textContent = yen.format(total);
  balanceAmount.textContent = yen.format(total - deposit);
}

function setEstimateState() {
  saleState.textContent = "見積中";
  stockState.textContent = "確認中";
  frameStockText.textContent = "販売確定前: 自店在庫 2本";
  lensStockText.textContent = "販売確定前: 右眼在庫 0枚、発注候補に追加予定";
  workTaskText.textContent = "販売確定後に加工待ちタスクを作成";
}

lineItems.forEach((item) => {
  item.addEventListener("change", updateTotals);
});

[discountAmount, depositAmount].forEach((input) => {
  input.addEventListener("input", updateTotals);
});

confirmSale.addEventListener("click", () => {
  saleState.textContent = "販売確定";
  stockState.textContent = "引当済み";
  frameStockText.textContent = "販売確定後: 自店在庫 2本 → 1本、販売引当済";
  lensStockText.textContent = "販売確定後: 右眼レンズを発注候補に登録済";
  workTaskText.textContent = "販売確定後: 加工待ちタスクを作成済";

  const registeredTask = document.createElement("article");
  registeredTask.innerHTML = `
    <div>
      <strong>販売登録完了</strong>
      <p>${grandTotal.textContent}で販売確定。フレーム引当、発注候補、加工待ちを作成。</p>
    </div>
    <span class="status ready">完了</span>
  `;
  afterSaleTasks.prepend(registeredTask);
  taskCount.textContent = `${afterSaleTasks.children.length}件`;
});

resetSale.addEventListener("click", () => {
  setEstimateState();
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((link) => link.classList.remove("active"));
    item.classList.add("active");
  });
});

setEstimateState();
updateTotals();

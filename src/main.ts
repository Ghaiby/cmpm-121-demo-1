import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Football Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// add clicker button
let clicks: number = 0;
const button = document.createElement("button");
button.innerText = "🏈";
app.append(button);
button.addEventListener("click", () => {
  clicks++;
  updateDisplay();
});

//Add div to show count
const countDiv = document.createElement("div");
countDiv.innerText = "Touchdowns: 0";
app.append(countDiv);

//automatic one second clicker
// setInterval(() => {
//   clicks++;
//   countDiv.innerText = `Touchdowns: ${clicks}`;
// }, 1000);

//upgrade buttons
const upgrades: string[] = [];
let growthRate: number = 0;
const inventory: number[] = [];
const Run = document.createElement("button");
Run.className = "upgradeButton";
Run.name = "Run";
let priceRun: number = 10;
Run.innerText = `+0.1 auto TD/s: ${priceRun} TDs`;
app.append(Run);
upgrades.push(Run.name);
Run.addEventListener("click", () => {
  if (clicks >= priceRun) {
    clicks -= priceRun; // Deduct cost of the upgrade
    growthRate += 0.1;
    priceRun *= 1.15;
    updateDisplay();
    if (inventory[0]) {
      inventory[0] += 1;
    } else {
      inventory[0] = 1;
    }
  }
});

const Pass = document.createElement("button");
Pass.className = "upgradeButton";
Pass.name = "Pass";
let pricePass: number = 100;
Run.innerText = `+2 auto TD/s: ${pricePass} TDs`;
app.append(Pass);
upgrades.push(Pass.name);
Pass.addEventListener("click", () => {
  if (clicks >= pricePass) {
    clicks -= pricePass; // Deduct cost of the upgrade
    growthRate += 2;
    pricePass *= 1.15;
    updateDisplay();
    if (inventory[0]) {
      inventory[0] += 1;
    } else {
      inventory[0] = 1;
    }
  }
});

const HM = document.createElement("button");
HM.className = "upgradeButton";
HM.name = "Hail Mary";
let priceHM: number = 1000;
HM.innerText = `+50 auto TD/s: ${priceHM} TDs`;
app.append(HM);
upgrades.push(HM.name);
HM.addEventListener("click", () => {
  if (clicks >= priceHM) {
    clicks -= priceHM; // Deduct cost of the upgrade
    growthRate += 50;
    priceHM *= 1.15;
    updateDisplay();
    if (inventory[0]) {
      inventory[0] += 1;
    } else {
      inventory[0] = 1;
    }
  }
});

// Update the display and manage the upgrade button's state
function updateDisplay() {
  countDiv.innerText = `Touchdowns: ${clicks} \n`;
  countDiv.innerText += ` Growth Rate: ${growthRate}\n`;
  for (let i = 0; i < upgrades.length; i++) {
    if (!inventory[i]) {
      inventory[i] = 0;
    }
    countDiv.innerText += ` ${upgrades[i]} : ${inventory[i]}`;
  }
  Run.disabled = clicks < 10;
  Pass.disabled = clicks < 100;
  HM.disabled = clicks < 1000;
  Run.innerText = `RUN \n+0.1 auto TD/s: ${priceRun} TDs`;
  Pass.innerText = `PASS \n+2 auto TD/s: ${pricePass} TDs`;
  HM.innerText = `HAIL MARY \n+50 auto TD/s: ${priceHM} TDs`;
}

//continuous growth
let lastTimestamp = performance.now();
function updateCounter(timestamp: number) {
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  clicks += growthRate * deltaTime;
  updateDisplay();
  requestAnimationFrame(updateCounter);
}
requestAnimationFrame(updateCounter);

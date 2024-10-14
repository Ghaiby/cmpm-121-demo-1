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
const A = document.createElement("button");
A.className = "upgradeButton";
A.name = "A";
let priceA: number = 10;
A.innerText = `+0.1 auto TD/s: ${priceA} TDs`;
app.append(A);
upgrades.push(A.name);
A.addEventListener("click", () => {
  if (clicks >= priceA) {
    clicks -= priceA; // Deduct cost of the upgrade
    growthRate += 0.1;
    priceA *= 1.15; 
    updateDisplay();
    if (inventory[0]) {
      inventory[0] += 1;
    } else {
      inventory[0] = 1;
    }
  }
});

const B = document.createElement("button");
B.className = "upgradeButton";
B.name = "B";
let priceB: number = 100;
B.innerText = `+2 auto TD/s: ${priceB} TDs`;
app.append(B);
upgrades.push(B.name);
B.addEventListener("click", () => {
  if (clicks >= priceB) {
    clicks -= priceB; // Deduct cost of the upgrade
    growthRate += 2;
    priceB *=1.15;
    updateDisplay();
    if (inventory[0]) {
      inventory[0] += 1;
    } else {
      inventory[0] = 1;
    }
  }
});

const C = document.createElement("button");
C.className = "upgradeButton";
C.name = "C";
let priceC: number = 1000;
C.innerText = `+50 auto TD/s: ${priceC} TDs`;
app.append(C);
upgrades.push(C.name);
C.addEventListener("click", () => {
  if (clicks >= priceC) {
    clicks -= priceC; // Deduct cost of the upgrade
    growthRate += 50;
    priceC *= 1.15
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
  A.disabled = clicks < 10;
  B.disabled = clicks < 100;
  C.disabled = clicks < 1000;
  A.innerText = `+0.1 auto TD/s: ${priceA} TDs`;
  B.innerText = `+2 auto TD/s: ${priceB} TDs`;
  C.innerText = `+50 auto TD/s: ${priceC} TDs`;
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

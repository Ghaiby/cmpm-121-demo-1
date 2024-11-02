import "./style.css";

const MARKUP = 1.15;
const SECOND = 1000; 
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

interface Item {
  name: string;
  cost: number;
  rate: number;
  index: number;
  desc: string;
}

const availableItems: Item[] = [
  {
    name: "RUN",
    cost: 10,
    rate: 0.1,
    index: 0,
    desc: "Old school power football",
  },
  {
    name: "PASS",
    cost: 100,
    rate: 2,
    index: 1,
    desc: "WR is down there somewhere",
  },
  {
    name: "HAIL MARRY",
    cost: 1000,
    rate: 50,
    index: 2,
    desc: "A desperation throw",
  },
  { name: "PICK 6", cost: 2500, rate: 100, index: 3, desc: "Back all the way" },
  { name: "OVERTIME TD", cost: 9999, rate: 999, index: 4, desc: "Game Over" },
];

let growthRate: number = 0;
const inventory: number[] = [];
const buttons: HTMLButtonElement[] = [];
availableItems.forEach((item) => {
  const B = document.createElement("button");
  B.className = "upgradeButton";
  B.name = item.name;
  B.innerText = `${item.name} \n+${item.rate} auto TD/s: ${item.cost} TDs \n "${item.desc}"`;
  app.append(B);
  B.addEventListener("click", () => {
    if (clicks >= item.cost) {
      clicks -= item.cost; // Deduct cost of the upgrade
      growthRate += 0.1;
      item.cost *= MARKUP;
      updateDisplay();
      inventory[item.index]++;
    }
  });
  buttons.push(B);
  inventory.push(0);
});

// Update the display and manage the upgrade button's state
function updateDisplay() {
  countDiv.innerText = `Touchdowns: ${clicks} \n`;
  countDiv.innerText += ` Growth Rate: ${growthRate}\n`;
  for (let i = 0; i < availableItems.length; i++) {
    countDiv.innerText += ` ${availableItems[i].name} : ${inventory[i]}`;
  }
  for (let i = 0; i < availableItems.length; i++) {
    const item = availableItems[i];
    buttons[i].disabled = clicks < item.cost;
    buttons[i].innerText =
      `${item.name} \n+${item.rate} auto TD/s: ${item.cost} TDs \n "${item.desc}"`;
  }
}

//continuous growth
let lastTimestamp = performance.now();
function updateCounter(timestamp: number) {
  const deltaTime = (timestamp - lastTimestamp) / SECOND;
  lastTimestamp = timestamp;

  clicks += growthRate * deltaTime;
  updateDisplay();
  requestAnimationFrame(updateCounter);
}
requestAnimationFrame(updateCounter);

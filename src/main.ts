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

//upgrade button
let growthRate: number = 0;
const upgradeButton = document.createElement('button');
upgradeButton.innerText = "+1 auto TD/s: 10 TDs";
upgradeButton.className = "upgradeButton"
app.append(upgradeButton);
upgradeButton.addEventListener('click', () => {
    if (clicks >= 10) {
        clicks -= 10; // Deduct cost of the upgrade
        growthRate++; // Increase growth rate by 1
        updateDisplay();
    }
});

// Update the display and manage the upgrade button's state
function updateDisplay() {
    countDiv.innerText = `Touchdowns: ${clicks} `;
    upgradeButton.disabled = clicks < 10;
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

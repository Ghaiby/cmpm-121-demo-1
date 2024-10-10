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
  countDiv.innerText = `Touchdowns: ${clicks}`;
});

//Add div to show count
const countDiv = document.createElement("div");
countDiv.innerText = "Touchdowns: 0";
app.append(countDiv);

//automatic one second clicker
setInterval(() => {
  clicks++;
  countDiv.innerText = `Touchdowns: ${clicks}`;
}, 1000);


//continuous growth
let lastTimestamp = performance.now();
function updateCounter(timestamp: number) {
    const deltaTime = (timestamp - lastTimestamp) / 1000; 
    lastTimestamp = timestamp;

    clicks += deltaTime; 
    countDiv.innerText = `Touchdowns: ${clicks}`;

    requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);



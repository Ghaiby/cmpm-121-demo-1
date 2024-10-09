import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Football Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let clicks: number = 0; 
const button = document.createElement("button");
button.innerText = "🏈";
app.append(button);
button.addEventListener("click", () => {
    clicks++;
    countDiv.innerText = `Touchdowns: ${clicks}`;
});


const countDiv = document.createElement('div');
countDiv.innerText = 'Touchdowns: 0';
app.append(countDiv)

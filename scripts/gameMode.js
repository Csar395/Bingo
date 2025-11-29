import { createPopup, showErrorPopup } from "./utils.js";
import { giveCellsTheirText } from "./bingo.js";
import { hide, block } from "./utils.js";

const christmasMovieBingo = [
    "Snowfall in the opening scene",
    "Santa Claus appears",
    "Family argues at Christmas dinner",
    "An unexpected romance begins",
    "The Christmas present gets lost",
    "Someone learns the 'true meaning of Christmas'",
    "A big speech about love and togetherness",
    "The Christmas miracle happens",
    "Children save the day",
    "The villain turns good",
    "Dog or cat in a Christmas costume",
    "Embarrassing Christmas sweater",
    "String lights explode",
    "A cookie recipe is passed down",
    "Someone falls into the snow",
    "There is a conflict that gets resolved later",
    "The Christmas tree is being decorated",
    "Christmas songs play in the background",
    "Someone crafts a handmade gift",
    "The protagonist starts out as a Christmas grump",
    "The neighbor is annoying",
    "Travel problems on Christmas Eve",
    "Someone goes sledding",
    "Someone gets a kiss under the mistletoe",
    "The movie ends with a group photo"
];
const marioKartBingo = [
    "Someone gets hit by a blue shell",
    "A player falls off the track",
    "Someone shouts ‘No way!’",
    "A banana peel ruins a perfect turn",
    "Lightning shrinks everyone",
    "Someone blames the controller",
    "A red shell hits right before the finish line",
    "Someone drifts too early",
    "Player celebrates a lucky item",
    "Someone gets annoyed by the rubber-banding",
    "Bullet Bill saves a bad run",
    "Someone picks the same character every time",
    "A green shell ricochets and hits its owner",
    "Someone complains about Rainbow Road",
    "A star pushes others off the track",
    "Player refuses to give up first place",
    "Someone screams during the final lap",
    "A shell hits from completely off-screen",
    "A player forgets to accelerate at the start",
    "Someone says ‘I was robbed!’",
    "Player gets triple red shells",
    "Someone boosts into a wall",
    "Victory pose lasts too long",
    "Player intentionally targets the leader",
    "Someone insists the game is unfair"
];
const footballMatchBingo = [
    "Ref makes a controversial call",
    "Player dramatically falls after light contact",
    "Coach yells at the referee",
    "Someone argues about offside",
    "Crowd starts chanting loudly",
    "A player complains about a foul",
    "Goalkeeper shouts instructions",
    "Ball goes far over the goal",
    "Commentator says ‘They should have scored that’",
    "A corner kick leads to nothing",
    "Someone gets a yellow card",
    "Fans wave their scarves",
    "Player removes grass from his boots",
    "Commentator mentions past statistics",
    "The ball hits the crossbar",
    "Assistant coach gets animated",
    "A player asks for VAR",
    "Two players get into a small argument",
    "Someone claims it was handball",
    "A substitution takes longer than expected",
    "Commentator says ‘This could change everything’",
    "Fans boo the opposite team",
    "A player ties his shoelaces",
    "Camera shows a disappointed fan",
    "Commentator says ‘Incredible atmosphere tonight’"
];


export function addYourOwnCells() {

    const inputArray = []

    const createDiv = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "create-own-cells");
    label.innerText = `Add Cell Text: `;
    createDiv.appendChild(label);
    const input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'create-own-cells');
    input.setAttribute('class', 'intro-input');
    input.setAttribute('placeholder', 'Enter here');
    createDiv.appendChild(input);

    createPopup(document.getElementById("game-mode-container"), createDiv, {
        title: "Create your own cells",
        buttons: [
            {
                text: "Add Input", handler: () => {
                    if (input.value === "") {
                        document.getElementById("create-own-cells").style.border = "2px solid red";
                    } else {
                        inputArray.push(document.getElementById("create-own-cells").value);
                        document.getElementById('create-own-cells').value =  "";
                        document.getElementById("create-own-cells").style.border = "none";
                    }
                }
            },
            {
                text: "Show",
                handler: () => {
                    showErrorPopup(`${inputArray}`)
                    document.getElementById("create-own-cells").style.border = "none";
                }
            },
            {
                text: "Start Game", handler: () => {
                    if (inputArray.length <= 24) {
                        document.getElementById("create-own-cells").style.border = "2px solid red";
                    } else {
                        giveCellsTheirText(inputArray);
                        document.querySelector(".popup-overlay").remove();
                        hide(document.getElementById("game-mode-container"));
                        block(document.getElementById("bingo-outer-container"));
                        localStorage.removeItem("actualState");
                        localStorage.setItem("actualState", "bingo");
                    }
                }
            }
        ]
    })
}
export function addYourOwnCellsInFiveMinutes() {

    const inputArray = [];

    const createDiv = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "create-own-cells");
    label.innerText = `Add Cell Text: `;
    createDiv.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "create-own-cells");
    input.setAttribute("class", "intro-input");
    input.setAttribute("placeholder", "Enter here");
    createDiv.appendChild(input);

    // Countdown-Anzeige hinzufügen
    const countdownDisplay = document.createElement("div");
    countdownDisplay.setAttribute("id", "countdown-timer");
    countdownDisplay.style.marginTop = "10px";
    countdownDisplay.style.textAlign = "center";
    countdownDisplay.style.fontSize = "18px";
    createDiv.appendChild(countdownDisplay);

    // Countdown starten
    startCountdown(5, countdownDisplay, () => {
        // Aktion nach Ablauf des Countdowns
        if (document.querySelector(".popup-overlay")) {
            document.querySelector(".popup-overlay").remove();
        }
        giveCellsTheirText(inputArray);
        hide(document.getElementById("game-mode-container"));
        block(document.getElementById("bingo-outer-container"));
        localStorage.removeItem("actualState");
        localStorage.setItem("actualState", "bingo");
    });

    createPopup(document.getElementById("game-mode-container"), createDiv, {
        title: "Create your own cells",
        buttons: [
            {
                text: "Add Input",
                handler: () => {
                    if (input.value === "") {
                        document.getElementById("create-own-cells").style.border = "2px solid red";
                    } else {
                        inputArray.push(input.value);
                        input.value = "";
                        document.getElementById("create-own-cells").style.border = "none";
                    }
                }
            },
            {
                text: "Show",
                handler: () => {
                    showErrorPopup(`${inputArray}`);
                }
            }
        ]
    });
}

// Countdown-Funktion
function startCountdown(minutes, displayElement, onComplete) {
    const durationInSeconds = minutes * 60;
    let remainingTime = durationInSeconds;

    const interval = setInterval(() => {
        const mins = Math.floor(remainingTime / 60);
        const secs = remainingTime % 60;

        displayElement.textContent = `Verbleibende Zeit: ${mins}:${secs.toString().padStart(2, "0")}`;

        if (remainingTime <= 0) {
            clearInterval(interval); // Countdown stoppen
            displayElement.textContent = "Zeit abgelaufen!";
            if (typeof onComplete === "function") {
                onComplete(); // Führe die Abschlussaktion aus
            }
        }

        remainingTime--;
    }, 1000);
}


export function returnPreparedCells(select) {

    if (select === "1") {
        return christmasMovieBingo
    } else if (select === "2") {
        return marioKartBingo
    } else if (select === "3") {
        return footballMatchBingo
    }
}
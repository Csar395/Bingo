const submitBtn = document.getElementById("submitBtn");
const loginContainer = document.getElementById("login-container");
const bingoContainer = document.getElementById("bingo-container");
const bingoButtons = document.getElementsByClassName("bingo-button"); // Sammlung aller Buttons
const textContainer = document.getElementById("game-mode-container");
const h1Username = document.getElementById("h1-username");

document.addEventListener("DOMContentLoaded", () => {
    const savedName = localStorage.getItem("username");

    if (savedName) {
        hideAndBlock(loginContainer, bingoContainer);
        textContainer.style.display = "none";
        const savedCells = JSON.parse(localStorage.getItem("bingoState") || "[]");
        h1Username.innerText = `${savedName}'s Bingo-Plate`;

        if (savedCells.length > 0) {
            // Wiederherstellen des Textes und des Klickstatus
            savedCells.forEach((cell) => {
                const cellElement = document.querySelector(`[data-id="${cell.id}"]`);
                if (cellElement) {
                    cellElement.textContent = cell.text; // Text wiederherstellen
                    if (cell.clicked) {
                        cellElement.classList.add("clicked"); // Klickstatus wiederherstellen
                    }
                }
            });

            // Überschreibe das bestehende Array mit dem gespeicherten Zustand
            bingoCells.splice(0, bingoCells.length, ...savedCells);
        } else {
            giveCellsTheirText(); // Nur wenn kein gespeicherter Zustand existiert
        }
    }

    submitBtn.addEventListener("click", () => {
        safeName();
        hideAndBlock(loginContainer, bingoContainer);
        giveCellsTheirText(); // Nach dem Einloggen immer neu mischen
    });

    // Event-Listener für die Bingo-Buttons
    for (let button of bingoButtons) {
        button.addEventListener("click", () => {
            clickACell(button);
        });
    }


});

const bingoCells = [
    {id: 1, clicked: false, text: ""},
    {id: 2, clicked: false, text: ""},
    {id: 3, clicked: false, text: ""},
    {id: 4, clicked: false, text: ""},
    {id: 5, clicked: false, text: ""},
    {id: 6, clicked: false, text: ""},
    {id: 7, clicked: false, text: ""},
    {id: 8, clicked: false, text: ""},
    {id: 9, clicked: false, text: ""},
    {id: 10, clicked: false, text: ""},
    {id: 11, clicked: false, text: ""},
    {id: 12, clicked: false, text: ""},
    {id: 13, clicked: false, text: ""},
    {id: 14, clicked: false, text: ""},
    {id: 15, clicked: false, text: ""},
    {id: 16, clicked: false, text: ""},
    {id: 17, clicked: false, text: ""},
    {id: 18, clicked: false, text: ""},
    {id: 19, clicked: false, text: ""},
    {id: 20, clicked: false, text: ""},
    {id: 21, clicked: false, text: ""},
    {id: 22, clicked: false, text: ""},
    {id: 23, clicked: false, text: ""},
    {id: 24, clicked: false, text: ""},
    {id: 25, clicked: false, text: ""},
]

function safeName() {
    const usernameInput = document.getElementById("username");
    const usernameValue = usernameInput.value;

    if (usernameValue) {
        localStorage.setItem("username", usernameValue);
        h1Username.innerText = usernameValue;
    } else {
        alert("Please enter username");
    }
}

function hideAndBlock(hide, block) {
    hide.style.display = "none";
    block.style.display = "block";
}

function clickACell(buttonElement) {
    const fieldId = parseInt(buttonElement.getAttribute("data-id")); // Umwandlung in Zahl
    const field = bingoCells.find((cell) => cell.id === fieldId); // Passendes Objekt im Array finden

    if (field) {
        field.clicked = !field.clicked; // Status umschalten
        localStorage.setItem("bingoState", JSON.stringify(bingoCells))

        if (field.clicked) {
            buttonElement.classList.add("clicked"); // Button markieren
        } else {
            buttonElement.classList.remove("clicked"); // Markierung entfernen
        }

        console.log(`Feld ${fieldId} Status:`, field); // Debugging-Info
    }
    checkForWin()
}

// bingoCell Inhalt Verteilung Logik:

const bingoTexts = [
    'B1', 'I1', 'N1', 'G1', 'O1',
    'B2', 'I2', 'N2', 'G2', 'O2',
    'B3', 'I3', 'N3', 'G3', 'O3',
    'B4', 'I4', 'N4', 'G4', 'O4',
    'B5', 'I5', 'N5', 'G5', 'O5'
];

function shuffleArray(array) {
    let newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function giveCellsTheirText() {
    const randomTexts = shuffleArray(bingoTexts);
    for (let i = 0; i < bingoCells.length; i++) {
        bingoCells[i].text = randomTexts[i];
    }
    assignCellsTheirText()
}

function assignCellsTheirText() {
    bingoCells.forEach((cell, index) => {
        const button = document.querySelector(`[data-id="${index + 1}"]`);
        if (button) {
            button.textContent = cell.text;
        }
    })
    localStorage.setItem("bingoState", JSON.stringify(bingoCells));
}

// Gewinn Logik

function checkForWin() {
    const savedName = localStorage.getItem("username") || "Player";

    // Gewinnbedingungen dynamisch berechnen: Reihen, Spalten, Diagonalen
    const winConst = [
        // Zeilen
        bingoCells[0].clicked && bingoCells[1].clicked && bingoCells[2].clicked && bingoCells[3].clicked && bingoCells[4].clicked,
        bingoCells[5].clicked && bingoCells[6].clicked && bingoCells[7].clicked && bingoCells[8].clicked && bingoCells[9].clicked,
        bingoCells[10].clicked && bingoCells[11].clicked && bingoCells[12].clicked && bingoCells[13].clicked && bingoCells[14].clicked,
        bingoCells[15].clicked && bingoCells[16].clicked && bingoCells[17].clicked && bingoCells[18].clicked && bingoCells[19].clicked,
        bingoCells[20].clicked && bingoCells[21].clicked && bingoCells[22].clicked && bingoCells[23].clicked && bingoCells[24].clicked,

        // Spalten
        bingoCells[0].clicked && bingoCells[5].clicked && bingoCells[10].clicked && bingoCells[15].clicked && bingoCells[20].clicked,
        bingoCells[1].clicked && bingoCells[6].clicked && bingoCells[11].clicked && bingoCells[16].clicked && bingoCells[21].clicked,
        bingoCells[2].clicked && bingoCells[7].clicked && bingoCells[12].clicked && bingoCells[17].clicked && bingoCells[22].clicked,
        bingoCells[3].clicked && bingoCells[8].clicked && bingoCells[13].clicked && bingoCells[18].clicked && bingoCells[23].clicked,
        bingoCells[4].clicked && bingoCells[9].clicked && bingoCells[14].clicked && bingoCells[19].clicked && bingoCells[24].clicked,

        // Diagonalen
        bingoCells[0].clicked && bingoCells[6].clicked && bingoCells[12].clicked && bingoCells[18].clicked && bingoCells[24].clicked, // Hauptdiagonale
        bingoCells[4].clicked && bingoCells[8].clicked && bingoCells[12].clicked && bingoCells[16].clicked && bingoCells[20].clicked  // Nebendiagonale
    ];

    // Überprüfen, ob eine der Gewinnbedingungen erfüllt ist
    if (winConst.some(condition => condition)) {
        bingoContainer.innerHTML += `
            <div class="win-box">
                <h2>YOU WON!!!!!</h2>
                <p>You are a machine, ${savedName}!</p>
                <button id="restart-button">RESTART</button>
            </div>
        `;
    }
    const resetButton = document.getElementById("restart-button")
    resetButton.addEventListener("click", restartGame);
}

// Restart Logik

function restartGame() {
    // Popup-Bestätigung
    const confirmation = confirm("Bist du sicher, dass du das Spiel neustarten möchtest?");

    if (confirmation) {
        // 1. Bingo-Zellen zurücksetzen
        bingoCells.forEach(cell => {
            cell.clicked = false;
            cell.text = ""; // Optional, wenn du die Texte auch neu setzen willst
        });

        // 2. Bingo-Feld neu rendern
        giveCellsTheirText(); // Vergibt neue Texte und zeigt sie an

        // 3. Alle Button-Klassen zurücksetzen (Markierungen entfernen)
        for (let button of bingoButtons) {
            button.classList.remove("clicked");

            button.removeEventListener("click", clickACell);
            button.addEventListener("click", () => clickACell(button));
        }

        // 4. Local Storage nur für Bingo-Zustand leeren (Username bleibt erhalten)
        localStorage.removeItem("bingoState");

        // Optional: Erfolgsmeldung
        alert("Das Spiel wurde erfolgreich zurückgesetzt!");
        document.querySelector(".win-box").remove();
    }
}



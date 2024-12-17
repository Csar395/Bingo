import { bingoCells } from "./bingo.js";
import { giveCellsTheirText } from "./bingo.js";
import { createPopup, hide, block } from "./utils.js";

// Funktion zur Überprüfung auf einen Gewinn
export function checkForWin() {
    const savedName = localStorage.getItem("username") || "Player";

    // Gewinnbedingungen: Zeilen, Spalten, Diagonalen
    const winConditions = [
        // Zeilen
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],

        // Spalten
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],

        // Diagonalen
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ];

    // Überprüfen, ob eine der Bedingungen erfüllt ist
    const hasWon = winConditions.some((condition) =>
        condition.every((index) => bingoCells[index].clicked)
    );

    if (hasWon) {
        // Gewinnmeldung anzeigen
        const bingoContainer = document.getElementById("bingo-container");
        const restartDiv = document.createElement("div");
        const p = document.createElement("p");
        p.innerText = `BINGO, ${localStorage.getItem("username")} !!!`;
        restartDiv.appendChild(p);

        createPopup(bingoContainer, restartDiv, {
            title: "You won",
            buttons: [
                {
                    text: "Restart", handler: () => {
                        hide(document.getElementById("bingo-outer-container"));
                        block(document.getElementById("game-mode-container"));
                        localStorage.removeItem("bingoState");
                        localStorage.removeItem("gameMode");
                        document.querySelector(".popup-overlay").remove();
                        bingoCells.forEach(cell => {
                            if (cell.clicked) {
                                cell.clicked = false;
                            }
                        })
                    },
                }
            ]
        });
    }
}


// bingo.scripts

import { shuffleArray } from './utils.js';
import { checkForWin } from "./win.js";

/**
 * Die Zellen des Bingo-Feldes.
 */
export const bingoCells = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    clicked: false,
    text: "",
}));

/**
 * Mischt die Texte und verteilt sie auf die Bingo-Zellen.
 */
export function giveCellsTheirText(array) {
    // Falls das Array mehr als 25 Elemente hat, wähle zufällig 25 aus
    const randomTexts = array.length > 25
        ? shuffleArray(array).slice(0, 25) // Nur die ersten 25 nach Mischen
        : shuffleArray(array); // Ansonsten alle verwenden

    bingoCells.forEach((cell, i) => {
        cell.text = randomTexts[i];
    });
    assignCellsTheirText();
}


/**
 * Weist die Texte den HTML-Buttons zu.
 */
export function assignCellsTheirText() {
    bingoCells.forEach((cell) => {
        const button = document.querySelector(`[data-id="${cell.id}"]`);
        if (button) {
            button.textContent = cell.text;
        }
    });
}

/**
 * Markiert oder entmarkiert eine Zelle als geklickt.
 * @param {HTMLElement} buttonElement - Der Button, der geklickt wurde.
 */
export function clickACell(buttonElement) {
    const fieldId = parseInt(buttonElement.getAttribute("data-id"));
    const field = bingoCells.find((cell) => cell.id === fieldId);

    if (field) {
        field.clicked = !field.clicked; // Klickstatus toggeln
        localStorage.setItem("bingoState", JSON.stringify(bingoCells));

        if (field.clicked) {
            buttonElement.classList.add("clicked");
        } else {
            buttonElement.classList.remove("clicked");
        }
    }

    // Gewinn prüfen
    checkForWin();
}

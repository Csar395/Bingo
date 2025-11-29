import { shuffleArray } from './utils.js';
import { checkForWin } from "./win.js";


export const bingoCells = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    clicked: false,
    text: "",
}));

export function giveCellsTheirText(array) {
    const randomTexts = array.length > 25
        ? shuffleArray(array).slice(0, 25)
        : shuffleArray(array);

    bingoCells.forEach((cell, i) => {
        cell.text = randomTexts[i];
    });
    assignCellsTheirText();
}

export function assignCellsTheirText() {
    bingoCells.forEach((cell) => {
        const button = document.querySelector(`[data-id="${cell.id}"]`);
        if (button) {
            button.textContent = cell.text;
        }
    });
}

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
    checkForWin();
}

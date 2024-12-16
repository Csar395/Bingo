import { login, logout } from './scripts/login.js';
import { updateUI, saveBingoState, saveGameMode } from "./scripts/storage.js";
import { checkCode, joinOrCreateNextStep, generateGroupCode } from './scripts/joinOrCreate.js'
import { hide, block, createPopup, showErrorPopup, adjustFontSizeForButtons } from "./scripts/utils.js";
import {addYourOwnCells, addYourOwnCellsInFiveMinutes, returnPreparedCells} from "./scripts/gameMode.js";
import { giveCellsTheirText, clickACell, bingoCells } from "./scripts/bingo.js";

document.addEventListener("DOMContentLoaded", () => {
    updateUI();
});

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', () => {
    localStorage.removeItem('actualState');
    localStorage.setItem("actualState", "join-or-create");
    login();
});

const joinButton = document.getElementById('join-group-mode');
joinButton.addEventListener('click', () => {

    localStorage.removeItem("actualState");
    localStorage.setItem("actualState", "game-mode");
    // Inhalt für das Popup erstellen
    const joinDiv = document.createElement('div');

    const label = document.createElement("label");
    label.setAttribute('for', 'groupCode');
    label.innerText = "Group ID:";
    joinDiv.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'groupCode');
    input.setAttribute('class', 'intro-input');
    input.setAttribute('name', 'groupCode');
    input.setAttribute('placeholder', 'Enter here');
    joinDiv.appendChild(input);

    // Popup erstellen
    createPopup(document.getElementById("join-or-create-box"), joinDiv, {
        title: "Join a Group",
        buttons: [
            {
                text: "Submit",
                handler: () => {
                    const groupCodeInput = document.getElementById('groupCode'); // Korrekte ID
                    if (checkCode(groupCodeInput.value)) {
                        document.querySelector(".popup-overlay").remove(); // Popup schließen
                        joinOrCreateNextStep(); // Group Code übergeben
                        localStorage.setItem("groupCode", groupCodeInput.value);
                    } else {
                        showErrorPopup("Invalid code: " + groupCodeInput.value);
                    }
                }
            }
        ]
    });
});

const createButton = document.getElementById('create-group-mode');
createButton.addEventListener('click', () => {

    localStorage.removeItem("actualState");
    localStorage.setItem("actualState", "game-mode");

    const groupId = generateGroupCode();
    const createDiv = document.createElement('div');
    const h2 = document.createElement("h2");
    h2.innerText = `${groupId}`;
    createDiv.appendChild(h2);


    createPopup(document.getElementById("join-or-create-box"), createDiv, {
        title: "Your new GroupID",
        buttons: [
            {
                text: "Okay",
                handler: () => {
                    document.querySelector(".popup-overlay").remove();
                    joinOrCreateNextStep();
                    document.getElementById('group-id').innerText = `Group ID: ${groupId}`;
                    block(document.getElementById("group-id"));
                    localStorage.setItem("groupId", groupId);
                },
            }
        ]
    })
})

const gameModeOne = document.getElementById('five-minute-input-button');
gameModeOne.addEventListener('click', () => {
    addYourOwnCellsInFiveMinutes();
})

const gameModeTwo = document.getElementById('add-your-own-cells-button');
gameModeTwo.addEventListener('click', () => {
    addYourOwnCells()
})

const select = document.getElementById('choose-prepared-cells-dropdown');
const gameModeThree = document.getElementById('submit-prepared-cells');
select.addEventListener('change', () => {
    if (select.value) { // Prüfen, ob eine Option gewählt wurde
        gameModeThree.style.display = 'block';
    }
});

gameModeThree.addEventListener('click', () => {
    const chosenCells = returnPreparedCells(select.value);
    hide(document.getElementById("game-mode-container"))
    block(document.getElementById("bingo-outer-container"))
    giveCellsTheirText(chosenCells);
    adjustFontSizeForButtons()
    document.getElementById("h1-username").innerText = `${localStorage.getItem("username")}' Bingo-Plate`;
    saveBingoState(bingoCells);
    saveGameMode(select.value);
    localStorage.removeItem("actualState");
    localStorage.setItem("actualState", "bingo");
})

const bingoButtons = document.getElementsByClassName("bingo-button");
for (let button of bingoButtons) {
    button.addEventListener("click", () => {
        clickACell(button);
    });
}

/* ========== navbar Buttons ========== */

const logoutButton = document.getElementById("nav-bar-logout");

logoutButton.addEventListener("click", (event) => {
    // Verhindert, dass das Dropdown-Menü schließt
    event.stopPropagation();
    const logoutDiv = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = "Are you sure you want to logout?";
    logoutDiv.appendChild(p);
    createPopup(document.getElementById(`${localStorage.getItem("actualState")}-box`), logoutDiv, {
        title: "Logout",
        buttons: [
            {
                text: "logout",
                handler: () => {
                    logout();
                    document.querySelector(".popup-overlay").remove();
                }
            },
            {
                text: "Cancel",
                handler: () => {
                    document.querySelector(".popup-overlay").remove();
                }
            }
        ]
    });
});

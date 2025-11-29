import {hide, block, adjustFontSizeForButtons } from './utils.js'
import { assignCellsTheirText, bingoCells } from "./bingo.js";

export function saveBingoState(cells) {
    localStorage.setItem('bingoState', JSON.stringify(cells));
}

export function restoreBingoState() {
    const savedCells = JSON.parse(localStorage.getItem('bingoState') || '[]');
    if (savedCells.length > 0) {
        bingoCells.forEach((cell, index) => {
            cell.text = savedCells[index]?.text || "";
            cell.clicked = savedCells[index]?.clicked || false;
        });
    }
}

export function saveGameMode(mode) {
    localStorage.setItem("gameMode", mode)
}

export function updateUI() {

    const login = document.getElementById("login-container");
    const joinOrCreate = document.getElementById("join-or-create-container");
    const gameMode = document.getElementById("game-mode-container");
    const bingo = document.getElementById("bingo-outer-container");

    if (localStorage.getItem('username')) {
        hide(login);
        block(joinOrCreate);
        block(document.getElementById('nav-bar-button-profile'));
        document.getElementById("welcome-message").innerText = `Welcome ${localStorage.getItem('username')}!`;
        if (localStorage.getItem('groupId')) {
            hide(joinOrCreate);
            block(gameMode);
            block(document.getElementById('nav-bar-button-group'));
            block(document.getElementById('group-id'));
            document.getElementById('group-id').innerText = `Group ID: ${localStorage.getItem('groupId')}`;
            if (localStorage.getItem('bingoState')) {
                adjustFontSizeForButtons()
                hide(gameMode);
                block(bingo);
                restoreBingoState();
                assignCellsTheirText();
                document.getElementById('h1-username').innerText = localStorage.getItem('username') + "'s Bingo-Card"
            } else {
                block(gameMode);
            }
        } else {
            block(document.getElementById('join-or-create-container'));
        }
    } else {
        block(document.getElementById('login-container'));
    }
}

import { hide, block } from "./utils.js";

export function checkCode(code) {
    const groupRegex = /^[0-9]{6}$/
    return groupRegex.test(code);
}

export function joinOrCreateNextStep() {
    hide(document.getElementById("join-or-create-container"));
    block(document.getElementById("game-mode-container"));
    block(document.getElementById("nav-bar-button-group"));
}

export function generateGroupCode() {
    const code = Math.floor(Math.random() * 1_000_000).toString();
    return code.padStart(6, '0');
    }
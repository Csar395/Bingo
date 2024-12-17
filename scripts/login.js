import { hide, block} from "./utils.js";

export function login() {
    const username = document.getElementById("username");

    if (username.value === "") {
        username.style.border = "2px solid red";
    } else {
        localStorage.setItem("username", username.value);
        document.getElementById("welcome-message").innerText = `Welcome ${username.value}`;
        hide(document.querySelector(".login-container"));
        block(document.querySelector(".join-or-create-container"));
        block(document.getElementById("nav-bar-button-profile"));
    }
}

export function logout() {
    localStorage.clear();
    hide(document.getElementById("join-or-create-container"));
    hide(document.getElementById("game-mode-container"));
    hide(document.getElementById("bingo-outer-container"));
    block(document.getElementById("login-container"));
}

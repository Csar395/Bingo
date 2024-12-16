import { createPopup, showErrorPopup } from "./utils.js";
import { giveCellsTheirText } from "./bingo.js";
import { hide, block } from "./utils.js";

const larsBingo = [
    "Kommt zu spät",
    "Erzählt einen schlechten Witz",
    "Stellt eine Rückfrage",
    "Gibt keine klare Antwort",
    "Vergisst etwas",
    "Fragt nach Kaffee",
    "Macht eine sarkastische Bemerkung",
    "Sagt „Das habe ich dir doch gesagt“",
    "Diskutiert endlos über ein Detail",
    "Lacht über seinen eigenen Witz",
    "Klopft auf den Tisch",
    "Nutzt Fachbegriffe, die keiner versteht",
    "Zückt sein Handy",
    "Rollt mit den Augen",
    "Sagt „Ich hab keine Zeit dafür“",
    "Fragt „Was meinst du?“",
    "Sagt „Gibt’s dazu eine Präsentation?“",
    "Kommt unvorbereitet",
    "Korrigiert jemand anderen",
    "Sagt „Machen wir später“",
    "Übersieht eine E-Mail",
    "Sagt „Worum geht’s hier?“",
    "Isst etwas während der Besprechung",
    "Tippt auf dem Laptop",
    "Beschwert sich über das Wetter"
];
const martinBingo = [
    "Macht einen Flachwitz",
    "Sagt „Das wäre jetzt noch besser“",
    "Streitet über Fußball",
    "Sagt „Ich hab da mal was gehört“",
    "Trinkt aus seiner Lieblingstasse",
    "Sagt „Klassiker!“",
    "Redet sich in Rage",
    "Hat den falschen Tab geöffnet",
    "Sagt „Warte kurz“",
    "Stellt eine Frage, die nicht zum Thema passt",
    "Erzählt von seinem Wochenende",
    "Trägt ein kariertes Hemd",
    "Korrigiert die Aussprache",
    "Lacht schallend",
    "Ruft jemanden beim falschen Namen",
    "Schickt ein GIF in den Chat",
    "Sagt „Moment mal“",
    "Verwechselt zwei Begriffe",
    "Erzählt eine Geschichte zum dritten Mal",
    "Fragt „Habt ihr das schon gesehen?“",
    "Trinkt während eines Zoom-Calls",
    "Hat ein technisches Problem",
    "Gibt ungefragt eine Meinung ab",
    "Sagt „So läuft das bei uns immer“",
    "Lässt etwas fallen"
];
const weihnachtsfilmBingo = [
    "Schneefall in der ersten Szene",
    "Santa Claus taucht auf",
    "Familie streitet beim Weihnachtsessen",
    "Eine Romanze beginnt unerwartet",
    "Das Weihnachtsgeschenk geht verloren",
    "Jemand lernt die „wahre Bedeutung von Weihnachten“",
    "Eine große Rede über Liebe und Zusammenhalt",
    "Das Weihnachtswunder passiert",
    "Kinder retten den Tag",
    "Bösewicht wird gut",
    "Hund oder Katze in Weihnachtskostüm",
    "Peinlicher Weihnachts-Pullover",
    "Lichterkette explodiert",
    "Ein Keksrezept wird weitergegeben",
    "Jemand fällt in den Schnee",
    "Es gibt Streit, der später gelöst wird",
    "Der Weihnachtsbaum wird geschmückt",
    "Weihnachtslieder im Hintergrund",
    "Jemand bastelt ein Geschenk",
    "Der Protagonist ist anfangs ein Weihnachtsmuffel",
    "Der Nachbar nervt",
    "Reiseprobleme am Heiligabend",
    "Jemand geht Schlittenfahren",
    "Jemand bekommt einen Kuss unter dem Mistelzweig",
    "Der Film endet mit einem Gruppenfoto"
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
                        document.getElementById('current-val').innerText += 1;
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

export function returnPreparedCells(select) {

    if (select === "1") {
        return larsBingo
    } else if (select === "2") {
        return martinBingo
    } else if (select === "3") {
        return weihnachtsfilmBingo
    }
}
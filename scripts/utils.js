// utils.scripts

/**
 * Mischt ein Array zufällig durch.
 * @param {Array} array - Das zu mischende Array.
 * @returns {Array} Das gemischte Array.
 */
export function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Zeigt ein Element an und versteckt ein anderes.
 * @param {HTMLElement} hide - Das zu versteckende Element.
 * @param {HTMLElement} show - Das zu zeigende Element.
 */
export function hideAndBlock(hide, show) {
    hide.style.display = "none";
    show.style.display = "block";
}

export function hide(hide) {
    hide.style.display = "none";
}

export function block(block) {
    block.style.display = "block";
}

/**
 * Erstellt ein flexibles Popup über einem Zielbereich.
 * @param {HTMLElement} targetElement - Das Element, über dem das Popup erscheinen soll.
 * @param {HTMLElement | string} content - Der Inhalt des Popups (Text oder HTML).
 * @param {Object} [options] - Zusätzliche Optionen.
 * @param {string} [options.title] - Ein optionaler Titel für das Popup.
 * @param {Array} [options.buttons] - Buttons für das Popup (Array von Objekten mit Text und Handler).
 */
export function createPopup(targetElement, content, options = {}) {
    // Overlay erstellen
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    // Popup-Container erstellen
    const container = document.createElement("div");
    container.classList.add("popup-container");

    // Schließen-Button hinzufügen
    const closeButton = document.createElement("button");
    closeButton.classList.add("popup-close");
    closeButton.innerText = "✖";
    closeButton.addEventListener("click", () => {
        overlay.remove(); // Entfernt das Popup und das Overlay
    });
    container.appendChild(closeButton);

    // Optionalen Titel hinzufügen
    if (options.title) {
        const titleElement = document.createElement("h2");
        titleElement.classList.add("popup-title");
        titleElement.innerText = options.title;
        container.appendChild(titleElement);
    }

    // Inhalt hinzufügen
    if (typeof content === "string") {
        const contentElement = document.createElement("p");
        contentElement.classList.add("popup-content");
        contentElement.innerText = content;
        container.appendChild(contentElement);
    } else if (content instanceof HTMLElement) {
        container.appendChild(content);
    }

    // Buttons hinzufügen (falls angegeben)
    if (options.buttons && Array.isArray(options.buttons)) {
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("popup-buttons");

        options.buttons.forEach((buttonConfig) => {
            const button = document.createElement("button");
            button.classList.add("popup-button");
            button.innerText = buttonConfig.text;

            if (buttonConfig.color) {
                button.style.backgroundColor = buttonConfig.color;
            }

            button.addEventListener("click", buttonConfig.handler);
            buttonContainer.appendChild(button);
        });

        container.appendChild(buttonContainer);
    }

    // Popup und Overlay ins DOM einfügen
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Schließen, wenn Overlay geklickt wird
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

/**
 * Erstellt ein Popup für Fehlermeldungen.
 * @param {string} errorMessage - Die anzuzeigende Fehlermeldung.
 */
export function showErrorPopup(errorMessage) {
    // Overlay erstellen
    const overlay = document.createElement("div");
    overlay.classList.add("error-popup-overlay");

    // Popup-Container erstellen
    const container = document.createElement("div");
    container.classList.add("error-popup-container");

    // Fehlermeldung hinzufügen
    const message = document.createElement("p");
    message.innerText = errorMessage;
    container.appendChild(message);

    // "Okay"-Button hinzufügen
    const button = document.createElement("button");
    button.innerText = "Okay";
    button.classList.add("error-popup-button");
    button.addEventListener("click", () => overlay.remove());
    container.appendChild(button);

    // Popup und Overlay ins DOM einfügen
    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

export function adjustFontSizeForButtons() {
    const buttons = document.querySelectorAll('.bingo-container button');

    buttons.forEach((button) => {
        let fontSize = 24; // Startgröße in Pixel
        const maxHeight = button.clientHeight;
        const maxWidth = button.clientWidth;

        // Text so lange verkleinern, bis er passt
        while (
            (button.scrollHeight > maxHeight || button.scrollWidth > maxWidth) &&
            fontSize > 8 // Mindestgröße
            ) {
            fontSize -= 1;
            button.style.fontSize = `${fontSize}px`;
        }
    });
}

// Bei Größenänderungen erneut prüfen


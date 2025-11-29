export function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

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

export function createPopup(targetElement, content, options = {}) {
    const overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    const container = document.createElement("div");
    container.classList.add("popup-container");

    const closeButton = document.createElement("button");
    closeButton.classList.add("popup-close");
    closeButton.innerText = "✖";
    closeButton.addEventListener("click", () => {
        overlay.remove();
    });
    container.appendChild(closeButton);

    if (options.title) {
        const titleElement = document.createElement("h2");
        titleElement.classList.add("popup-title");
        titleElement.innerText = options.title;
        container.appendChild(titleElement);
    }

    if (typeof content === "string") {
        const contentElement = document.createElement("p");
        contentElement.classList.add("popup-content");
        contentElement.innerText = content;
        container.appendChild(contentElement);
    } else if (content instanceof HTMLElement) {
        container.appendChild(content);
    }

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

    overlay.appendChild(container);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

export function showErrorPopup(errorMessage) {
    const overlay = document.createElement("div");
    overlay.classList.add("error-popup-overlay");

    const container = document.createElement("div");
    container.classList.add("error-popup-container");

    const message = document.createElement("p");
    message.innerText = errorMessage;
    container.appendChild(message);

    const button = document.createElement("button");
    button.innerText = "Okay";
    button.classList.add("error-popup-button");
    button.addEventListener("click", () => overlay.remove());
    container.appendChild(button);

    overlay.appendChild(container);
    document.body.appendChild(overlay);
}

export function adjustFontSizeForButtons() {
    const buttons = document.querySelectorAll('.bingo-container button');

    buttons.forEach((button) => {
        let fontSize = 24; // Startgröße in Pixel
        const maxHeight = button.clientHeight;
        const maxWidth = button.clientWidth;

        while (
            (button.scrollHeight > maxHeight || button.scrollWidth > maxWidth) &&
            fontSize > 8
            ) {
            fontSize -= 1;
            button.style.fontSize = `${fontSize}px`;
        }
    });
}
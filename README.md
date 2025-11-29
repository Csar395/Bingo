# Bingo Game

This is a web-based Bingo game, a fun and interactive front-end application built with vanilla JavaScript, HTML, and CSS. Players can join existing groups or create their own to play Bingo with friends. The game offers both predefined Bingo cards and the option to create custom ones. User sessions and game states are managed using `localStorage`.

## Features

*   **User Authentication:** Simple login and logout functionality.
*   **Group Management:** Create new game groups or join existing ones using a 6-digit code.
*   **Multiple Game Modes:**
    *   Predefined Bingo cards (e.g., "Christmas Movie", "Mario Kart", "Football Match").
    *   Option to create custom Bingo cards.
    *   Time-limited custom card creation.
*   **Interactive Bingo Board:** Click on cells to mark them and check for win conditions.
*   **State Persistence:** Game progress and user sessions are saved locally using `localStorage`.

## Project Structure

The project follows a modular architecture, with JavaScript files organized by their specific functionalities:

*   `index.html`: The main HTML file that structures the application's user interface.
*   `main.js`: The primary entry point for the application logic, handling overall user interactions and orchestrating different modules.
*   `scripts/`: Contains all JavaScript modules:
    *   `login.js`: Manages user login and logout.
    *   `joinOrCreate.js`: Handles the creation and joining of game groups.
    *   `gameMode.js`: Defines and manages the various game modes and Bingo card options.
    *   `bingo.js`: Implements the core Bingo game mechanics, including board setup and cell interactions.
    *   `win.js`: Contains the logic for checking Bingo win conditions.
    *   `storage.js`: Responsible for saving and restoring application state using `localStorage`.
    *   `utils.js`: A collection of utility functions used across the application (e.g., array shuffling, DOM manipulation, popup creation).
*   `styles/`: Contains the CSS stylesheets:
    *   `styles.css`: Main application styles.
    *   `popup.css`: Styles specifically for pop-up elements.

## Getting Started

Since this is a purely front-end application, there's no complex build process involved.

### Running the Application

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Bingo.git
    cd Bingo
    ```
    *(Note: Replace `https://github.com/your-username/Bingo.git` with the actual repository URL)*
2.  **Open `index.html`:** Simply open the `index.html` file in your preferred web browser.

The game should now be running in your browser!

## Development

### Technologies Used

*   HTML5
*   CSS3
*   JavaScript (ES6 Modules)

### Conventions

*   **Modularity:** Code is organized into small, focused modules.
*   **DOM Manipulation:** Direct manipulation of the Document Object Model (DOM) is used for UI updates.
*   **Local Storage:** `localStorage` is utilized for client-side data persistence.

## Contributing

...

## License

...

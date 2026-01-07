# Icon Matching Game

A fun and interactive memory card matching game built with HTML, CSS, and JavaScript, integrated with Firebase for global leaderboard functionality.

## 🎮 Features

- **Multiple Difficulty Levels:** Choose between Easy, Medium, and Hard modes to adjust the grid size.
- **Real-time Leaderboard:** Compete for the best time and fewest moves. Scores are saved and retrieved using Firebase Firestore.
- **AI Solve:** Includes an "AI Solve 🤖" feature that automatically matches cards for you.
- **Theme Toggle:** Switch between light and dark modes (🌙).
- **Dynamic Scoring:** Tracks your moves, time elapsed, and calculates a star rating (1-3 stars).
- **Immersive UI:** Features a background video and responsive design.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6 modules)
- **Icons:** Font Awesome 6.5
- **Backend:** Firebase v10
  - **Authentication:** Anonymous Sign-in
  - **Firestore:** Database for storing leaderboard stats

## 🚀 Getting Started

### Prerequisites

You need a modern web browser to run this game. No complex build tools are required.

### Installation

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/yourusername/icon-matching-game.git
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd icon-matching-game
    ```
3.  **Run the game**:
    - Simply double-click `index.html` to open it in your browser.
    - *Recommended:* Use a local development server (like VS Code's "Live Server" extension) to ensure modules load correctly without CORS issues.

## 📂 Project Structure

- `index.html`: Main entry point. Contains the HTML structure and the Firebase configuration/initialization script.
- `style.css`: Contains all styling, animations, and responsive layout rules.
- `script.js`: Handles the game logic, card shuffling, matching mechanics, and UI updates.
- `bg.mp4`: Background video loop.

## ⚙️ Configuration

The project is currently configured with a specific Firebase project in `index.html`. If you wish to host your own leaderboard:

1.  Create a new project at the Firebase Console.
2.  Enable **Authentication** (Anonymous provider).
3.  Enable **Cloud Firestore** and set up security rules to allow reads/writes.
4.  Replace the `firebaseConfig` object in `index.html` with your own project credentials.

## 🕹️ How to Play

1.  Select a difficulty level from the dropdown menu.
2.  Click on cards to flip them over.
3.  Find matching pairs of icons to clear them from the board.
4.  Complete the game as fast as possible with the fewest moves to top the leaderboard!
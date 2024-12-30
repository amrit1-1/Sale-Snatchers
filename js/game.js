// Variables to track score, time, and game interval
let score = 0;
let timeLeft = 60;
let gameInterval;
let speedMultiplier = 1; // Base speed multiplier

// DOM elements
const startButton = document.getElementById('start-button');
const titleCard = document.getElementById('title-card');
const gameContainer = document.getElementById('game-container');
const trolley = document.getElementById('trolley');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Start button click event to begin the game
startButton.addEventListener('click', startGame);

function startGame() {
    titleCard.classList.add('hidden');
    gameContainer.classList.remove('hidden');

    gameInterval = setInterval(() => {
        for (let i = 0; i < 2; i++) { // Creates two objects every interval
            createFallingObject();
        }
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft === 30) {
            timerDisplay.style.fontSize = '40px';
            speedMultiplier = 1.5;  // Increase speed of falling objects
        }

        if (timeLeft === 20) {
            timerDisplay.style.fontSize = '50px';
            timerDisplay.style.color = 'orange';
        }

        if (timeLeft === 10) {
            timerDisplay.style.fontSize = '60px';
            timerDisplay.style.color = 'red';
            speedMultiplier = 2;  // Further increase the speed of falling objects
        }

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            showGameOverPage();
        }
    }, 1000);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

// Move the trolley
moveTrolleySmoothly();

function handleTimeBonus() {
    timeLeft += 5; // Add 5 seconds to the timer
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    // Show a popup message
    showPopup('+5 Seconds!', trolley.getBoundingClientRect());
}

function handleTimePenalty() {
    timeLeft = Math.max(0, timeLeft - 5); // Subtract 5 seconds but don't go below 0
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    // Show a popup message
    showPopup('-5 Seconds!', trolley.getBoundingClientRect());
}

// Reference to the quit button
const quitButton = document.getElementById('quit-button');

// Event listener for quitting the game
quitButton.addEventListener('click', () => {
  // Stop the game interval
  clearInterval(gameInterval);

  // Reset game variables
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = `Savings: £${score}`;
  timerDisplay.textContent = `Time: ${timeLeft}s`;

  // Hide the game container and show the title card
  gameContainer.classList.add('hidden');
  titleCard.classList.remove('hidden');
});
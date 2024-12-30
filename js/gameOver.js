const gameOverPage = document.getElementById('game-over');
const gameOverMessage = document.getElementById('game-over-message');
const scoreMessage = document.getElementById('score-message');

function showGameOverPage() {
    gameContainer.classList.add('hidden');
    gameOverPage.classList.remove('hidden');
    scoreMessage.textContent = `Your total savings: £${score}`;

    let customMessage = "";
    if (score < 9000) {
        customMessage = "Damn...not looking to grab too much, are ya?";
    } else if (score >= 9000 && score < 16000) {
        customMessage = "Nice job. You saved a good amount!";
    } else if (score >= 16000) {
        customMessage = "Wow amazing! You have holiday gifts for years now!";
    }

    gameOverMessage.textContent = customMessage;
}

function endGameWithLawsuit() {
    // Stop any active game intervals
    clearInterval(gameInterval);

    // Hide the game container and show the game-over page
    gameContainer.classList.add('hidden');
    gameOverPage.classList.remove('hidden');

    // Set a custom lawsuit message
    gameOverMessage.textContent = "Uh oh...you caught the lawsuit. The sales over for everyone now - thanks for that. Game over.";
    scoreMessage.textContent = ""; // Hide the score message
}

function restartGame() {
    gameOverPage.classList.add('hidden');
    titleCard.classList.remove('hidden');
    score = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Savings: £${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}
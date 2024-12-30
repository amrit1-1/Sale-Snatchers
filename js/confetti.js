// Get or create the global confetti container
let confettiContainer = document.getElementById('confetti');
if (!confettiContainer) {
    confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti';
    document.body.appendChild(confettiContainer);
}

// Apply styles to make the confetti container global and visible
confettiContainer.style.position = 'fixed';
confettiContainer.style.top = '0';
confettiContainer.style.left = '0';
confettiContainer.style.width = '100%';
confettiContainer.style.height = '100%';
confettiContainer.style.pointerEvents = 'none'; // Prevent interaction with the confetti
confettiContainer.style.zIndex = '1000'; // Ensure it's above all other elements

/* Creates a single confetti piece with random attributes and adds it to the container. */
function createConfetti() {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti');

    // Randomize the size, color, and starting position
    const size = Math.floor(Math.random() * 10) + 5;
    const color = Math.random() < 0.5 ? 'red' : 'white';
    const startPosition = Math.floor(Math.random() * window.innerWidth);

    // Apply styles for the confetti piece
    confettiPiece.style.position = 'absolute';
    confettiPiece.style.width = `${size}px`;
    confettiPiece.style.height = `${size}px`;
    confettiPiece.style.backgroundColor = color;
    confettiPiece.style.left = `${startPosition}px`;
    confettiPiece.style.top = `-20px`; // Start off-screen

    // Append the confetti piece to the container
    confettiContainer.appendChild(confettiPiece);

    // Randomize animation duration and apply it
    const animationDuration = Math.floor(Math.random() * 3) + 3; // Duration between 3s and 6s
    confettiPiece.style.animation = `fall ${animationDuration}s linear`;

    // Remove the confetti piece after its animation completes
    setTimeout(() => {
        confettiPiece.remove();
    }, animationDuration * 1000);
}

// Set up a recurring interval to create confetti
setInterval(createConfetti, 300);
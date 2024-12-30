// Movement variables for trolley
let isMovingLeft = false;
let isMovingRight = false;
let moveSpeed = 1;  // Initial speed
let maxSpeed = 3;  // Maximum speed when key is held down
let acceleration = 0.1;  // How quickly the speed increases when holding the key

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        isMovingLeft = true;
    } else if (event.key === 'ArrowRight') {
        isMovingRight = true;
    }
}

function handleKeyUp(event) {
    if (event.key === 'ArrowLeft') {
        isMovingLeft = false;
    } else if (event.key === 'ArrowRight') {
        isMovingRight = false;
    }
}

function moveTrolleySmoothly() {
    const trolleyRect = trolley.getBoundingClientRect();

    if (isMovingLeft && trolleyRect.left > 0) {
        moveSpeed = Math.min(moveSpeed + acceleration, maxSpeed);
        trolley.style.left = `${trolley.offsetLeft - moveSpeed}px`;
    } else if (isMovingRight && trolleyRect.right < window.innerWidth) {
        moveSpeed = Math.min(moveSpeed + acceleration, maxSpeed);
        trolley.style.left = `${trolley.offsetLeft + moveSpeed}px`;
    }

    // Only reset moveSpeed when neither key is pressed
    if (!isMovingLeft && !isMovingRight) {
        moveSpeed = 1; // Reset speed to initial when no key is pressed
    }

    requestAnimationFrame(moveTrolleySmoothly);
}
moveTrolleySmoothly(); // Initialize the animation loop
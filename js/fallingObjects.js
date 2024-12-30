// List of objects with their images and values
const objects = [
    { img: 'images/airpods.png', value: 100 },
    { img: 'images/blue-handbag.png', value: 200 },
    { img: 'images/bracelet.png', value: 149 },
    { img: 'images/bread.png', value: 2 },
    { img: 'images/champagne.png', value: 40 },
    { img: 'images/chocolate.png', value: 3 },
    { img: 'images/cookies.png', value: 4 },
    { img: 'images/crisps.png', value: 1 },
    { img: 'images/dress.png', value: 49 },
    { img: 'images/eggs.png', value: 2 },
    { img: 'images/eye-palette.png', value: 29 },
    { img: 'images/glasses.png', value: 119 },
    { img: 'images/hdr.png', value: 79 },
    { img: 'images/heels.png', value: 99 },
    { img: 'images/iphone.png', value: 299 },
    { img: 'images/lipstick.png', value: 69 },
    { img: 'images/macbook.png', value: 499 },
    { img: 'images/necklace.png', value: 249 },
    { img: 'images/pens.png', value: 6 },
    { img: 'images/perfume.png', value: 45 },
    { img: 'images/purse.png', value: 169 },
    { img: 'images/smartwatch.png', value: 329 },
    { img: 'images/toilet-paper.png', value: 6 },
    { img: 'images/trainers.png', value: 49 },
    { img: 'images/tv.png', value: 599 },
    { img: 'images/vision-pro.png', value: 799 },
    { img: 'images/watch.png', value: 199 },
    { img: 'images/water.png', value: 1 },
    { img: 'images/yellow-handbag.png', value: 65 },
    { img: 'images/lawsuit.png', type: 'lawsuit' },
    { img: 'images/more-time.png', type: 'time-bonus' },
    { img: 'images/less-time.png', type: 'time-penalty' }
];

// Variables for tracking bonuses and item collections
let itemsCollected = 0; // Counts how many items have been collected
let bonusTimeout; // Timer for the "TRIPLE THREAT" bonus
let popupYOffset = 0; // Track the current Y-offset for stacking popups
const bonusTimeoutDuration = 300; // Time window (0.3 seconds) to collect 3 items
const bonusAmount = 500;  // Value of the "TRIPLE THREAT" bonus

function createFallingObject() {
    const randomObject = objects[Math.floor(Math.random() * objects.length)];

    // Create the falling object as a div
    const objectElement = document.createElement("div");
    objectElement.classList.add("falling-object");
    objectElement.style.position = "absolute";
    objectElement.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    objectElement.style.top = "0px";

    // Add special behavior for the new objects
    if (randomObject.type) {
        objectElement.dataset.type = randomObject.type; // Mark object by type
    } else {
        objectElement.dataset.value = randomObject.value; // Store the object's value
    }

    // Add the image of the object to the div
    const objectImage = document.createElement("img");
    objectImage.src = randomObject.img;
    objectImage.style.width = "100%";
    objectImage.style.height = "100%";
    objectImage.style.objectFit = "contain";
    objectElement.appendChild(objectImage);

    // Add the object to the game container
    gameContainer.appendChild(objectElement);

    // Initialize the object's movement
    let topPosition = 0;
    const speed = (Math.random() * 3 + 2) * speedMultiplier;

    // Move the object down and handle collisions
    const fallInterval = setInterval(() => {
        topPosition += speed;
        objectElement.style.top = `${topPosition}px`;

        // Check if the object collides with the trolley
        if (checkCollision(objectElement, trolley.getBoundingClientRect())) {
            clearInterval(fallInterval); // Stop the object's movement
            objectElement.remove(); // Remove the object from the DOM

            // Handle collision with different types of objects
            if (objectElement.dataset.type === 'time-bonus') {
                handleTimeBonus();
            } else if (objectElement.dataset.type === 'time-penalty') {
                handleTimePenalty();
            } else if (objectElement.dataset.type === 'lawsuit') {
                endGameWithLawsuit(); // Handle lawsuit collision
            } else {
                // Update the score for regular objects
                score += parseInt(objectElement.dataset.value);
                scoreDisplay.textContent = `Savings: £${score}`;
                showPopup(`+ £${objectElement.dataset.value}`, trolley.getBoundingClientRect());
                handleItemCollection(trolley.getBoundingClientRect());
            }
        }

        // Remove the object if it goes out of bounds
        if (topPosition > window.innerHeight) {
            clearInterval(fallInterval);
            objectElement.remove();
        }
    }, 15); // Update position every 15ms
}

/**
 * Checks if a falling object has collided with the trolley.
 */
function checkCollision(fallingObject, trolleyRect) {
    const objectRect = fallingObject.getBoundingClientRect();
    return (
        objectRect.bottom > trolleyRect.top &&
        objectRect.left < trolleyRect.right &&
        objectRect.right > trolleyRect.left
    );
}

/**
 * Handles the collection of items and triggers the "TRIPLE THREAT" bonus if applicable.
 */
function handleItemCollection(trolleyRect) {
    itemsCollected++; // Increment the count of collected items

    // Clear the previous timeout to restart the time window
    clearTimeout(bonusTimeout);

    // Check if 3 items have been collected in quick succession
    if (itemsCollected === 3) {
        triggerTripleThreatBonus(trolleyRect); // Trigger the bonus
        itemsCollected = 0; // Reset the count
    } else {
        // Start/reset the timer for the "TRIPLE THREAT" window
        bonusTimeout = setTimeout(() => {
            itemsCollected = 0; // Reset the count if time window is missed
        }, bonusTimeoutDuration);
    }
}

function showPopup(text, trolleyRect) {
    const popup = document.createElement("div");
    popup.classList.add("popup-value");
    popup.textContent = text;

    // Position the popup above the trolley, with an offset for stacking
    const baseOffsetY = 40; // Base distance above the trolley
    popup.style.left = `${trolleyRect.left + trolleyRect.width / 2}px`;
    popup.style.top = `${trolleyRect.top - baseOffsetY - popupYOffset}px`; // Adjust with stacking offset
    popup.style.transform = "translateX(-50%)";

    // Add the popup to the game container
    gameContainer.appendChild(popup);

    // Increment the stacking offset for the next popup
    popupYOffset += 40; // Adjust as needed to create enough spacing between popups

    // Fade out and remove the popup after 1 second
    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.remove();
            popupYOffset -= 40; // Decrement the stacking offset when the popup is removed
        }, 500); // Ensure the popup is removed after fade-out
    }, 1000);
}
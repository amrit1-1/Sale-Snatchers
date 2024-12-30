function triggerTripleThreatBonus(trolleyRect) {
    score += bonusAmount;
    scoreDisplay.textContent = `Savings: £${score}`;

    const bonusPopup = document.createElement("div");
    bonusPopup.classList.add("popup-value");
    bonusPopup.textContent = "TRIPLE THREAT!\n+ £500!";
    bonusPopup.style.backgroundColor = "red";
    bonusPopup.style.color = "white";
    bonusPopup.style.left = `${trolleyRect.left + trolleyRect.width / 2}px`;
    bonusPopup.style.top = `${trolleyRect.top - 60}px`;
    bonusPopup.style.transform = "translateX(-50%)";

    gameContainer.appendChild(bonusPopup);

    setTimeout(() => {
        bonusPopup.style.opacity = "0";
        setTimeout(() => bonusPopup.remove(), 500);
    }, 2000);
}

function showPopup(text, trolleyRect = null) {
    const popup = document.createElement("div");
    popup.classList.add("popup-value");
    popup.textContent = text;

    const offsetY = 40 + popupYOffset;
    popup.style.left = `${trolleyRect.left + trolleyRect.width / 2}px`;
    popup.style.top = `${trolleyRect.top - offsetY}px`;
    popup.style.transform = "translateX(-50%)";

    gameContainer.appendChild(popup);

    popupYOffset += 40;

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.remove();
            popupYOffset -= 40;
        }, 500);
    }, 2000);
}
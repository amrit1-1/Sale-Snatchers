function initMute() {
    // Get references to the audio element and mute buttons
    const backgroundMusic = document.getElementById('background-music');
  
    // Buttons and their corresponding icons
    const muteButtons = {
      title: document.getElementById('mute-button-title'),
      game: document.getElementById('mute-button-game'),
      gameOver: document.getElementById('mute-button-game-over')
    };
  
    const muteIcons = {
      title: document.querySelector('#mute-button-title img'),
      game: document.querySelector('#mute-button-game img'),
      gameOver: document.querySelector('#mute-button-game-over img')
    };
  
    // Track mute state
    let isMuted = false;
  
    // Toggle mute state and update icons
    function toggleMute() {
      isMuted = !isMuted;
      backgroundMusic.muted = isMuted;
  
      // Update all mute button icons
      Object.values(muteIcons).forEach(icon => {
        icon.src = isMuted ? 'images/muted.png' : 'images/unmuted.png';
      });
    }
  
    // Add event listeners to all mute buttons
    Object.values(muteButtons).forEach(button => {
      button.addEventListener('click', toggleMute);
    });
  }
  
  // Initialize the mute functionality after the DOM is loaded
  document.addEventListener('DOMContentLoaded', initMute);
// Get the background music element from the DOM
const backgroundMusic = document.getElementById('backgroundMusic');

// Get the play, pause, info, and exit buttons from the DOM
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const infoButton = document.getElementById('infoButton');
const exitButton = document.getElementById('exitButton');

// Get the info pop-up element from the DOM
const infoPopup = document.getElementById('infoPopup');

// Play the background music when the play button is clicked
playButton.addEventListener('click', () => {
    backgroundMusic.play();
});

// Pause the background music when the pause button is clicked
pauseButton.addEventListener('click', () => {
    backgroundMusic.pause();
});

// Show the info pop-up when the info button is clicked
infoButton.addEventListener('click', () => {
    infoPopup.style.display = 'block';
});

// Hide the info pop-up when the exit button is clicked
exitButton.addEventListener('click', () => {
    infoPopup.style.display = 'none';
});

// Hide the info pop-up when clicking outside of it
document.addEventListener('click', (event) => {
    // Check if the clicked element is neither the info button nor the info pop-up
    if (event.target !== infoButton && event.target !== infoPopup) {
        infoPopup.style.display = 'none';
    }
});

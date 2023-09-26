const backgroundMusic = document.getElementById('backgroundMusic');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const infoButton = document.getElementById('infoButton');
const infoPopup = document.getElementById('infoPopup');

playButton.addEventListener('click', () => {
    backgroundMusic.play();
});

pauseButton.addEventListener('click', () => {
    backgroundMusic.pause();
});

// Show info pop-up when the info button is clicked
infoButton.addEventListener('click', () => {
    infoPopup.style.display = 'block';
});

// Hide the info pop-up when clicking outside of it
document.addEventListener('click', (event) => {
    if (event.target !== infoButton && event.target !== infoPopup) {
        infoPopup.style.display = 'none';
    }
});

// ... (previous code) ...

// Show info pop-up when the info button is clicked
infoButton.addEventListener('click', () => {
    infoPopup.style.display = 'block';
});

// Hide the info pop-up when the exit button is clicked
const exitButton = document.getElementById('exitButton');
exitButton.addEventListener('click', () => {
    infoPopup.style.display = 'none';
});

// Hide the info pop-up when clicking outside of it
document.addEventListener('click', (event) => {
    if (event.target !== infoButton && event.target !== infoPopup) {
        infoPopup.style.display = 'none';
    }
});

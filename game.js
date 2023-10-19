// Get the canvas element and its 2D rendering context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Initialize ball properties
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4, // Increase the horizontal speed
    dy: -4, // Increase the vertical speed
    color: "#000000", // Initial ball color
    hitPaddle: false, // Flag to track if the ball hit the paddle
};

// Initialize paddle properties
const paddle = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 10,
};

// Initialize variables for key presses, game state, and score
let rightPressed = false;
let leftPressed = false;
let gameStarted = false;
let score = 0;

// Event listeners for keydown and keyup events to control paddle movement
document.addEventListener("keydown", (e) => {
    if (gameStarted) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }
});

document.addEventListener("keyup", (e) => {
    if (gameStarted) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = false;
        }
    }
});

// Function to draw the ball on the canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

// Function to draw the paddle on the canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#FFC0CB"; // Pink color for the paddle
    ctx.fill();
    ctx.closePath();
}

// Function to draw the score on the canvas
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);
}

// Main draw function for animating the game
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update ball position
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Reflect the ball on canvas edges
    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    // Check if the ball hits the paddle
    if (
        ball.y + ball.dy > canvas.height - ball.radius - paddle.height &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
    ) {
        ball.dy = -ball.dy;
        ball.hitPaddle = true; // Set the flag when the ball hits the paddle
        score++;
    }

    // Reflect the ball on the top edge
    if (ball.y < 0) {
        ball.dy = -ball.dy;
    }

    // Reset the ball position and speed if it goes beyond the bottom edge
    if (ball.y + ball.radius > canvas.height) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4;
        ball.dy = -4;
    }

    // Move the paddle based on key presses
    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }

    // Change ball color and reset flag if it hits the paddle
    if (ball.hitPaddle) {
        ball.color = "#FFC0CB"; // Set the ball color to pink
        setTimeout(() => {
            ball.color = "#000000"; // Reset the ball color after 3 seconds
            ball.hitPaddle = false; // Reset the flag
        }, 1000);
    }

    // Draw elements on the canvas
    drawBall();
    drawPaddle();
    drawScore();

    // Continue the animation if the game is started
    if (gameStarted) {
        requestAnimationFrame(draw);
    }
}

// Styling for the canvas
canvas.style.border = "2px solid #000";
canvas.style.display = "block";
canvas.style.margin = "auto";

// Create a container for buttons
const buttonContainer = document.createElement("div");
buttonContainer.style.textAlign = "center";
document.body.appendChild(buttonContainer);

// Create a start button element
const startButton = document.createElement("button");
startButton.textContent = "Start Game";
buttonContainer.appendChild(startButton);

// Create an end button element
const endButton = document.createElement("button");
endButton.textContent = "End Game";
buttonContainer.appendChild(endButton);

// Styling for the buttons
const buttonStyle = `
    font-size: 18px;
    padding: 10px 20px;
    margin: 10px;
    background-color: #3498db;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
`;

startButton.style = buttonStyle;
endButton.style = buttonStyle;

// Event listeners for button clicks
startButton.addEventListener("click", () => {
    gameStarted = true;
    startButton.style.display = "none";
    score = 0;
    draw();
});

endButton.addEventListener("click", () => {
    gameStarted = false;
    startButton.style.display = "block";
    score = 0;
    draw();
});
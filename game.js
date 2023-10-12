const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 4, // Increase the horizontal speed
    dy: -4, // Increase the vertical speed
};


const paddle = {
    width: 75,
    height: 10,
    x: (canvas.width - 75) / 2,
    y: canvas.height - 10,
};

let rightPressed = false;
let leftPressed = false;
let gameStarted = false;
let score = 0;

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fillStyle = "#FFC0CB";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Score: " + score, canvas.width - 100, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx = -ball.dx;
    }

    if
        (ball.y + ball.dy > canvas.height - ball.radius - paddle.height &&
           ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width)
       
    {   ball.dy = -ball.dy;
        score++;
    }
    
    if (ball.y < 0) {ball.dy = -ball.dy}

    if (ball.y + ball.radius > canvas.height) {
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
        ball.dx = 4;
        ball.dy = -4;
    }

    if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 7;
    } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 7;
    }

    drawBall();
    drawPaddle();
    drawScore();

    if (gameStarted) {
        requestAnimationFrame(draw);
    }

    if (paddle.istouching (ball)) {
drawBall ctx.fillStyle = "#000000";
    }
}

// Style the canvas
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

// Style the buttons
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

const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const boxSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let gameSpeed = 100; 
let gameInterval;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

function update() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    if (head.x === food.x && head.y === food.y) {
        snake.unshift({ ...food });
        generateFood();
    } else {
        snake.unshift(head);
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / boxSize)),
        y: Math.floor(Math.random() * (canvas.height / boxSize))
    };
}

function showGameOverModal() {
    const gameOverModal = document.getElementById('gameOverModal');
    const scoreElement = document.getElementById('score');
    const startAgainBtn = document.getElementById('startAgainBtn');
    const goToLandingPageBtn = document.getElementById('goToLandingPageBtn');

    scoreElement.textContent = 'Your score: ' + (snake.length - 1);

    gameOverModal.style.display = 'block';

    startAgainBtn.addEventListener('click', function () {
        gameOverModal.style.display = 'none';
        resetGame();
    });

    goToLandingPageBtn.removeEventListener('click', handleGoToLandingPage);
    goToLandingPageBtn.addEventListener('click', handleGoToLandingPage);
}

function handleGoToLandingPage() {
    window.location.href = "https://Denertova.github.io/SnakeApp/About";
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width / boxSize || head.y >= canvas.height / boxSize) {
        showGameOverModal();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            showGameOverModal();
        }
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    generateFood();
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            direction = 'up';
            break;
        case 'ArrowDown':
            direction = 'down';
            break;
        case 'ArrowLeft':
            direction = 'left';
            break;
        case 'ArrowRight':
            direction = 'right';
            break;
    }
});

function handleStartAgain() {
    gameOverModal.style.display = 'none';
    resetGame();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, gameSpeed);
}

const speedButtons = document.querySelectorAll('.speed-btn');
speedButtons.forEach(button => {
    button.addEventListener('click', function() {
        gameSpeed = parseInt(this.dataset.speed);
        handleStartAgain();
    });
});

gameInterval = setInterval(gameLoop, gameSpeed);

function gameLoop() {
    update();
    checkCollision();
    draw();
}
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 500;
canvas.height = 500;

const boxSize = 25; // Size of each segment of the snake
let snake = [{ x: 250, y: 250 }]; // Initial snake position
let direction = 'RIGHT'; // Initial direction
let food = generateFood();
let score = 0;

// Event listener for keypresses
document.addEventListener('keydown', changeDirection);

// Game loop
setInterval(updateGame, 100);

function updateGame() {
  clearCanvas();
  drawFood();
  moveSnake();
  drawSnake();
  checkCollision();
  showScore();
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });
}

function moveSnake() {
  const head = { ...snake[0] };

  // Change position based on direction
  if (direction === 'RIGHT') head.x += boxSize;
  if (direction === 'LEFT') head.x -= boxSize;
  if (direction === 'UP') head.y -= boxSize;
  if (direction === 'DOWN') head.y += boxSize;

  // Make the snake appear on the opposite side when crossing boundaries
  if (head.x >= canvas.width) head.x = 0;
  if (head.x < 0) head.x = canvas.width - boxSize;
  if (head.y >= canvas.height) head.y = 0;
  if (head.y < 0) head.y = canvas.height - boxSize;

  snake.unshift(head);

  // Check if the snake eats food
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    score++;
  } else {
    snake.pop(); // Remove the last segment if no food eaten
  }
}

function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

function generateFood() {
  const foodX = Math.floor((Math.random() * canvas.width) / boxSize) * boxSize;
  const foodY = Math.floor((Math.random() * canvas.height) / boxSize) * boxSize;
  return { x: foodX, y: foodY };
}

function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

function checkCollision() {
  const head = snake[0];

  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  alert(`Game Over! Your score: ${score}`);
  snake = [{ x: 250, y: 250 }];
  direction = 'RIGHT';
  food = generateFood();
  score = 0;
}

function showScore() {
  ctx.fillStyle = 'white';
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

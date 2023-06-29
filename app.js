document.addEventListener("DOMContentLoaded", function () {});

var canvas = document.getElementById("myCanvas");
// var canvasRect = canvas.getBoundingClientRect();
// var canvasX = canvasRect.left;
// var canvasY = canvasRect.top;

var context = canvas.getContext("2d");

const devicePixelRatio = window.devicePixelRatio || 1;

// Set the canvas dimensions
canvas.width = canvas.offsetWidth * devicePixelRatio;
canvas.height = canvas.offsetHeight * devicePixelRatio;

// Scale the canvas using CSS
canvas.style.width = canvas.offsetWidth + "px";
canvas.style.height = canvas.offsetHeight + "px";

// Scale the drawing context
context.scale(devicePixelRatio, devicePixelRatio);

var gridSize = 40;
var gridWidth = canvas.width / gridSize;
var gridHeight = canvas.height / gridSize;
var snake = [{ x: 0, y: 0 }];
var snakeLength = 1;
var direction = "right";
var scoreTextBox = document.getElementById("score");

var apple = { x: 30, y: 30 };
var gameOverPopup = document.getElementById("gameOverPopup");
var gameInterval;
var gameOver = false;
function startGame() {
  if (gameOver == true) {
    clearInterval(gameInterval);
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake = [{ x: 0, y: 0 }];
    snakeLength = 1;
    direction = "right";
    document.getElementById("score").textContent = "Score : " + 0;
    scoreTextBox.style.visibility = "visible";
    apple = { x: 30, y: 30 };
    gameOver = false;
    gameInterval = setInterval(update, 400);
    gameOverPopup.style.visibility = "hidden";
  } else {
    clearInterval(gameInterval);
    gameInterval = setInterval(update, 400);
  }
}
function pauseGame() {
  gameInterval = clearInterval(gameInterval);
}
var scoreElement = document.getElementById("scorePop");
function showGameOverPopup() {
  gameOverPopup.style.visibility = "visible";
  scoreTextBox.style.visibility = "hidden";
  gameOver = true;
  pauseGame();
}
function getRandomMultipleOf30() {
  const min = 0; // Minimum value for the random number (inclusive)
  const max = 560; // Maximum value for the random number (inclusive)
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  apple.x = Math.ceil(randomNum / 30) * 30;
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  apple.y = Math.ceil(randomNum / 30) * 30;
}

function drawApples() {
  //   apple.x = getRandomMultipleOf30();
  //   apple.y = getRandomMultipleOf30();
  context.fillStyle = "blue";
  context.fillRect(apple.x, apple.y, gridWidth, gridHeight);
}
function drawSnake() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  snake.forEach((element) => {
    context.fillStyle = "red";
    context.fillRect(element.x, element.y, gridWidth, gridHeight);
  });
  drawApples();
}

function update() {
  var head = { x: snake[0].x, y: snake[0].y };
  console.log("Head X:", head.x);
  console.log("Head Y:", head.y);
  // if (direction == "right") {
  //   head.x += gridWidth;
  //   if(head.x>canvas.width) head.x=0;
  // }
  // if (direction == "left") {
  //   head.x -= gridWidth;
  //   head.x = canvas.width;
  // }
  // if (direction == "up") {
  //   head.y -= gridHeight;
  // }
  // if (direction == "down") {
  //   head.y += gridHeight;
  // }

  if (direction == "right") {
    head.x += gridWidth;
    if (head.x >= canvas.width / devicePixelRatio) {
      head.x = 0;
    }
  }
  if (direction == "left") {
    head.x -= gridWidth;
    if (head.x < 0) {
      head.x = canvas.width / devicePixelRatio - gridWidth;
    }
  }
  if (direction == "up") {
    head.y -= gridHeight;
    if (head.y < 0) {
      head.y = canvas.height / devicePixelRatio - gridHeight;
    }
  }
  if (direction == "down") {
    head.y += gridHeight;
    if (head.y >= canvas.height / devicePixelRatio) {
      head.y = 0;
    }
  }

  if (head.x === apple.x && head.y === apple.y) {
    getRandomMultipleOf30();
    snakeLength++;
    scoreTextBox.textContent = "Score : " + snake.length;
    scoreElement.textContent = snake.length;
  }
  if (checkSelfBite() == true) {
    showGameOverPopup();
  }

  snake.unshift(head);

  if (snake.length > snakeLength) {
    snake.pop();
  }

  drawSnake();
}
function checkSelfBite() {
  var bodySet = new Set(); // Create a hash set to store the snake's body segments

  // Iterate over the snake's body segments
  for (var i = 0; i < snake.length; i++) {
    var segment = snake[i];
    var segmentKey = segment.x + "-" + segment.y; // Generate a unique key for the segment

    // Check if the segment is already in the hash set
    if (bodySet.has(segmentKey)) {
      return true; // Snake has bitten itself
    }

    // Add the segment to the hash set
    bodySet.add(segmentKey);
  }

  return false; // Snake has not bitten itself
}
function handleKeydown(event) {
  if (directionChangeAllowed) {
    if (event.key === "ArrowRight" && direction !== "left") {
      direction = "right";
      directionChangeAllowed = false;
    }
    if (event.key === "ArrowLeft" && direction !== "right") {
      direction = "left";
      directionChangeAllowed = false;
    }
    if (event.key === "ArrowUp" && direction !== "down") {
      direction = "up";
      directionChangeAllowed = false;
    }
    if (event.key === "ArrowDown" && direction !== "up") {
      direction = "down";
      directionChangeAllowed = false;
    }
  }
}

function handleKeyup(event) {
  directionChangeAllowed = true; // Reset the flag when the key is released
}

// Set up event listeners for keyboard input
document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyup);
drawSnake();
drawApples();

// var x = 50;  // Initial x-coordinate of the rectangle
// var y = 50;  // Initial y-coordinate of the rectangle

// // Set the fill color and draw the rectangle
// // ctx.fillStyle = "blue";
// // ctx.fillRect(x, y, 200, 100);
// var snake = {
//     x: 240,
//     y: 240,

//     // snake velocity. moves one grid length every frame in either the x or y direction
//     dx: grid,
//     dy: 0,

//     // keep track of all grids the snake body occupies
//     cells: [],

//     // length of the snake. grows when eating an apple
//     maxCells: 4
//   };
//   sna

// // Listen for keydown event
// document.addEventListener("keydown", function(event) {
//   // Get the key code of the pressed key
//   var keyCode = event.keyCode || event.which;

//   // Handle different key codes to move the rectangle
//   switch (keyCode) {
//     case 37:  // Left arrow key
//       x -= 10;  // Move the rectangle left by 10 pixels
//       break;
//     case 38:  // Up arrow key
//       y -= 10;  // Move the rectangle up by 10 pixels
//       break;
//     case 39:  // Right arrow key
//       x += 10;  // Move the rectangle right by 10 pixels
//       break;
//     case 40:  // Down arrow key
//       y += 10;  // Move the rectangle down by 10 pixels
//       break;
//     default:
//       return;  // Ignore other keys
//   }

//   // Clear the canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Draw the rectangle at the new position
//   ctx.fillRect(x, y, 200, 100);
// });

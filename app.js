var canvas = document.getElementById("myCanvas");
var canvasRect = canvas.getBoundingClientRect();
var canvasX = canvasRect.left;
var canvasY = canvasRect.top;


console.log("Canvas X:", canvasX);
console.log("Canvas Y:", canvasY);
var ctx = canvas.getContext("2d");

var x = 50;  // Initial x-coordinate of the rectangle
var y = 50;  // Initial y-coordinate of the rectangle

// Set the fill color and draw the rectangle
ctx.fillStyle = "blue";
ctx.fillRect(x, y, 200, 100);

// Listen for keydown event
document.addEventListener("keydown", function(event) {
  // Get the key code of the pressed key
  var keyCode = event.keyCode || event.which;

  // Handle different key codes to move the rectangle
  switch (keyCode) {
    case 37:  // Left arrow key
      x -= 10;  // Move the rectangle left by 10 pixels
      break;
    case 38:  // Up arrow key
      y -= 10;  // Move the rectangle up by 10 pixels
      break;
    case 39:  // Right arrow key
      x += 10;  // Move the rectangle right by 10 pixels
      break;
    case 40:  // Down arrow key
      y += 10;  // Move the rectangle down by 10 pixels
      break;
    default:
      return;  // Ignore other keys
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the rectangle at the new position
  ctx.fillRect(x, y, 200, 100);
});
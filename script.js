import Player from "./player.js";
import Circle from "./circles.js";
import Input from "./input.js";
import Gift from "./gift.js";

//canvas set up
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

//canvas size
const canvasWidth = (canvas.width = 700);
const canvasHeight = (canvas.height = 700);

//game variables
let gameFrame = 0;
let count = 0;

let playerRadius = 35;
let enemyRadius = 25;

let circleSpeed = 1;
let playerSpeed = 2;

let gameOver = false;
let start = false;

let spawnFunctionCalled = false;
let spawnFrames = 0;

let newCircle = {};
let allCircles = [];
let gifts = [];

//input variable
let up = false;
let down = false;
let left = false;
let right = false;

//creating player
let userInput = new Input(up, down, left, right);
let player = new Player(350, 350, playerRadius, "red", gameFrame);
//creating background
const backgroundImage = new Image();
backgroundImage.src = "images/Background.png";

//event listener to start game
window.addEventListener("keydown", (event) => {
	if (event.key === "k") {
		start = true;
	}
});

function endScreen() {
	console.log("game over");
	context.textAlign = "center";
	context.font = "50px Arial";
	context.fillStyle = "white";
	context.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
	context.font = "20px Arial";
	context.fillText(
		"Press Ctrl + [R] to play again",
		canvas.width / 2,
		canvas.height / 2 + 20
	);
	context.font = "25px Arial";
	context.fillText(`Score: ${count}`, canvas.width / 2, canvas.height / 2 + 60);
}

function drawScore() {
	context.textAlign = "left";
	context.font = "25px Arial";
	context.fillStyle = "white";
	context.fillText(`Score: ${count}`, 10, 30);
}

function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(backgroundImage, 0, 0);

	if (!start) {
		context.textAlign = "center";
		context.font = "30px Arial";
		context.fillText(
			"Press [k] to start",
			canvas.width / 2,
			canvas.height / 2 + 20
		);
		context.font = "20px Arial";
		context.fillText(
			"Use the arrow keys to avoid the aliens and collect the gems",
			canvas.width / 2,
			canvas.height / 2 + 50
		);
	} else {
		gameFrame++;

		player.update(player, userInput, playerSpeed);

		//creates first enemy
		if (allCircles.length === 0) {
			let firstCircle = new Circle(enemyRadius, circleSpeed, 350, 175);
			allCircles.push(firstCircle);
			firstCircle.update(player);
		}

		//creates additional enemies
		if (gameFrame % 1000 === 0 && allCircles.length < 10) {
			let randomX = Math.random() * (675 - enemyRadius) + enemyRadius;
			let randomY = Math.random() * (675 - enemyRadius) + enemyRadius;
			newCircle = new Circle(enemyRadius, circleSpeed, randomX, randomY);
			spawnCircle();
			spawnFrames = 250;
			spawnFunctionCalled = true;
			setTimeout(() => {
				allCircles.push(newCircle);
			}, 3000);
			circleSpeed += 0.5;
			playerSpeed += 0.5;
		}
		if (gameFrame % 500 === 0) {
			playerSpeed += 0.2;
		}

		//ensures spawn function is only called for 250 frames
		if (spawnFunctionCalled) {
			if (spawnFrames > 0) {
				spawnCircle();
				spawnFrames--;
			} else {
				spawnFunctionCalled = false;
			}
		}
		function spawnCircle() {
			newCircle.spawnCircle(context, gameFrame);
		}

		for (let circle of allCircles) {
			circle.update(player);

			if (circle.distance < circle.radius + player.radius) {
				gameOver = true;
			}
		}

		//GIFTS
		if (gameFrame % 50 === 0 && gifts.length < 1) {
			let gift = new Gift(20);
			gifts.push(gift);
		}
		for (let gift of gifts) {
			gift.update(context, player);

			if (gift.distance < gift.radius + player.radius) {
				gifts.shift();
				count += 1;
			} else gift.color = "orange";
		}
	}

	if (!gameOver) {
		requestAnimationFrame(animate);
	} else endScreen();
	drawScore();
}

animate();

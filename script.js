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
let radius = 25;
let circleSpeed = 1;
let playerSpeed = 2;
let gameOver = false;

let allCircles = [];
let gifts = [];
//input variable
let up = false;
let down = false;
let left = false;
let right = false;

let userInput = new Input(up, down, left, right);
let player = new Player(350, 350, radius, "red", gameFrame);

function animate() {
	if (!gameOver) {
		requestAnimationFrame(animate);
	}
	context.clearRect(0, 0, canvas.width, canvas.height);
	gameFrame++;
	player.update(player, userInput, playerSpeed);

	context.font = "25px Arial";
	context.fillText(`Score: ${count}`, 10, 30);

	if (allCircles.length === 0) {
		let firstCircle = new Circle(radius, circleSpeed);
		allCircles.push(firstCircle);
		firstCircle.update(player);
	}

	if (gameFrame % 700 === 0 && allCircles.length < 10) {
		let newCircle = new Circle(radius, circleSpeed);
		allCircles.push(newCircle);
		circleSpeed += 0.5;
		playerSpeed += 0.5;
	}
	for (let circle of allCircles) {
		circle.update(player);

		if (circle.distance < circle.radius + player.radius) {
			gameOver = true;
		} else circle.color = "black";
	}

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

animate();

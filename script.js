import Player from "./player.js";
import Circle from "./circles.js";

//canvas set up
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
//canvas size
const canvasWidth = (canvas.width = 700);
const canvasHeight = (canvas.height = 700);

let allCircles = [];
let radius = 25;

let player = new Player(350, 350, radius, "red");

for (let i = 0; allCircles.length < 10; i++) {
	let newCircle = new Circle(radius);
	allCircles.push(newCircle);
}

function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);

	player.update(player);

	for (let circle of allCircles) {
		circle.update(player);

		if (circle.distance < circle.radius + player.radius) {
			circle.color = "blue";
		} else circle.color = "black";
	}
}

animate();

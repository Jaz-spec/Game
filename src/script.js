//canvas set up
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
//canvas size
const canvasWidth = (canvas.width = 700);
const canvasHeight = (canvas.height = 700);

let radius = 50;
let max = canvas.width - radius;
let allCircles = [];

class Circle {
	constructor() {
		this.x = Math.random() * (max - radius + 1) + radius;
		this.y = Math.random() * (max - radius + 1) + radius;
		this.radius = radius;
		this.speed = Math.random() * 6;
		this.color = "black";

		this.dx = 1 * this.speed;
		this.dy = 1 * this.speed;
	}

	drawCircle(context) {
		//draws the circles
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	}

	update() {
		this.drawCircle(context);
		this.x += this.dx;
		this.y += this.dy;

		//keeps object within the canvas
		if (this.x > canvas.width - radius) {
			this.dx = -this.dx;
		}
		if (this.y > canvas.height - radius) {
			this.dy = -this.dy;
		}
		if (this.x < radius) {
			this.dx = -this.dx;
		}
		if (this.y < radius) {
			this.dy = -this.dy;
		}

		this.a = this.x - player.x;
		this.b = this.y - player.y;
		this.distance = Math.sqrt(this.a * this.a + this.b * this.b);
	}
}

class Player {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}

	drawPlayer() {
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	}
}

let player = new Player(350, 350, radius, "red");

for (i = 0; allCircles.length < 10; i++) {
	let newCircle = new Circle();
	allCircles.push(newCircle);
}

//animates the circles using the update function
function animate() {
	requestAnimationFrame(animate);
	context.clearRect(0, 0, canvas.width, canvas.height);
	player.drawPlayer();

	for (let circle of allCircles) {
		circle.update();
		if (circle.distance < circle.radius + player.radius) {
			circle.color = "blue";
		} else circle.color = "black";
	}
}

animate();

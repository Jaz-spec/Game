//canvas set up
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
//canvas size
const canvasWidth = (canvas.width = 700);
const canvasHeight = (canvas.height = 700);
//circle values
let radius = 25;
let max = canvas.width - radius;
let allCircles = [];

class Circle {
	constructor(x, y, radius, speed) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.speed = speed;

		this.dx = 1 * this.speed;
		this.dy = 1 * this.speed;
	}

	drawCircle(context) {
		//draws the circles
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	}

	update() {
		//updates position of object
		context.clearRect(0, 0, canvas.width, canvas.height);
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
	}
}

let newCircle = new Circle(100, 25, radius, 5);
newCircle.drawCircle(context);

function animate() {
	requestAnimationFrame(animate);
	newCircle.update();
}
animate();

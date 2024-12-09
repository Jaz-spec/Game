const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let radius = 25;

export default class Circle {
	constructor(radius) {
		this.x = Math.random() * (675 - radius) + radius;
		this.y = Math.random() * (675 - radius) + radius;
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

	update(player) {
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

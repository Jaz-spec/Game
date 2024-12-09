const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = (canvas.width = 700);
const canvasHeight = (canvas.height = 700);

export default class Player {
	constructor(x, y, radius, color, gameFrame) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.gameFrame = gameFrame;
	}

	drawPlayer() {
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	}

	update(player, userInput, speed) {
		player.drawPlayer();
		this.speed = speed;
		this.dx = 1 * this.speed;
		this.dy = 1 * this.speed;

		if (userInput.up) {
			this.y -= this.dy;
		}
		if (userInput.down) {
			this.y += this.dy;
		}
		if (userInput.left) {
			this.x -= this.dx;
		}
		if (userInput.right) {
			this.x += this.dx;
		}

		//canvas boundaries
		if (this.x < this.radius) {
			this.x = this.radius;
		} else if (this.x > canvas.width - this.radius) {
			this.x = canvas.width - this.radius;
		}
		if (this.y < this.radius) {
			this.y = this.radius;
		} else if (this.y > canvas.height - this.radius) {
			this.y = canvas.height - this.radius;
		}
	}
}

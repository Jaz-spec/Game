const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = (canvas.width = 700);
const canvasHeight = (canvas.height = 700);

const playerImage = new Image();
playerImage.src = "sprite2.png";

export default class Player {
	constructor(x, y, radius, color, gameFrame) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.gameFrame = gameFrame;
	}

	drawPlayer() {
		context.drawImage(
			playerImage,
			this.x - this.radius - 3,
			this.y - this.radius + 3,
			250,
			300
		);
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

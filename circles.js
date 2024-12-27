const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let radius = 25;

const enemyImage = new Image();
enemyImage.src = "images/sprite3.png";

export default class Circle {
	constructor(radius, speed) {
		this.x = Math.random() * (675 - radius) + radius;
		this.y = Math.random() * (675 - radius) + radius;
		this.radius = radius;
		this.speed = speed;
		this.color = "black";
		this.dx = Math.random() < 0.5 ? 1 : -1 * this.speed;
		this.dy = Math.random() < 0.5 ? 1 : -1 * this.speed;
	}

	drawCircle(context) {
		context.drawImage(
			enemyImage,
			this.x - this.radius,
			this.y - this.radius,
			175,
			225
		);
	}

	spawnCircle(context, gameFrame) {
		this.frame = Math.floor((gameFrame % 100) / 10);
		if (
			this.frame === 3 ||
			this.frame === 4 ||
			this.frame === 5 ||
			this.frame === 8 ||
			this.frame === 9
		) {
			this.drawCircle(context);
		}
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

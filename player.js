const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

export default class Player {
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

	update(player) {
		player.drawPlayer();
	}
}

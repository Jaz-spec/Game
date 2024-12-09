export default class Gift {
	constructor(radius) {
		this.x = Math.random() * (675 - radius) + radius;
		this.y = Math.random() * (675 - radius) + radius;
		this.radius = radius;
		this.color = "orange";
	}

	draw(context) {
		context.beginPath();
		context.fillStyle = this.color;
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		context.fill();
		context.closePath();
	}

	update(context, player) {
		this.draw(context);
		this.a = this.x - player.x;
		this.b = this.y - player.y;
		this.distance = Math.sqrt(this.a * this.a + this.b * this.b);
	}
}

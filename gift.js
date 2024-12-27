const giftImage = new Image();
giftImage.src = "images/sprite1.png";

export default class Gift {
	constructor(radius) {
		this.x = Math.random() * (675 - radius) + radius;
		this.y = Math.random() * (675 - radius) + radius;
		this.radius = radius;
		this.color = "orange";
	}

	draw(context) {
		context.drawImage(
			giftImage,
			this.x - this.radius,
			this.y - this.radius,
			145,
			185
		);
	}

	update(context, player) {
		this.draw(context);
		this.a = this.x - player.x;
		this.b = this.y - player.y;
		this.distance = Math.sqrt(this.a * this.a + this.b * this.b);
	}
}

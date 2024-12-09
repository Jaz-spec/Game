export default class Input {
	constructor(up, down, left, right) {
		this.up = up;
		this.down = down;
		this.left = left;
		this.right = right;

		window.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "ArrowUp":
					this.up = true;
					break;
				case "ArrowDown":
					this.down = true;
					break;
				case "ArrowLeft":
					this.left = true;
					break;
				case "ArrowRight":
					this.right = true;
					break;
			}
		});
		window.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "ArrowUp":
					this.up = false;
					break;
				case "ArrowDown":
					this.down = false;
					break;
				case "ArrowLeft":
					this.left = false;
					break;
				case "ArrowRight":
					this.right = false;
					break;
			}
		});
	}
}

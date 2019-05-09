window.onload = function() {
	initYay();
};

// window.addEventListener("resize");

function initYay() {
	const el = document.querySelector(".yay");
	const textFX = new TextFX(el);
	textFX.hide().then(() => textFX.show());

	const button = document.querySelector("#yay-button");
	button.addEventListener("click", () =>
		textFX.hide().then(() => textFX.show())
	);
}

class TextFX {
	/**
	borrowed from:
	https://github.com/codrops/TextTrailEffect/blob/master/js/demo4.js
  */

	constructor(el) {
		this.DOM = { el: el };
		this.DOM.texts = [...this.DOM.el.querySelectorAll(".text")];
		this.middleIdx = Math.floor(this.DOM.texts.length / 2);
		this.loopInterval = 80;
	}

	// main show/hide methods
	show({ dir = "both", halfwayCallback = null } = {}) {
		return new Promise((resolve, reject) => {
			const loopHide = pos => {
				if (this.middleIdx - pos === this.middleIdx) {
					setTimeout(resolve, this.loopInterval);
					return;
				}
				this.hideText(pos, dir);
				setTimeout(() => loopHide(pos - 1), this.loopInterval);
			};
			const loopShow = pos => {
				if (this.middleIdx - pos > this.middleIdx) {
					if (halfwayCallback && typeof halfwayCallback === "function") {
						halfwayCallback();
					}
					loopHide(this.middleIdx);
					return;
				}
				this.showText(pos, dir);
				setTimeout(() => loopShow(pos - 1), this.loopInterval);
			};
			loopShow(this.middleIdx);
		});
	}
	hide({ dir = "both", halfwayCallback = null } = {}) {
		return new Promise((resolve, reject) => {
			const loopHide = pos => {
				if (this.middleIdx - pos < 0) {
					setTimeout(resolve, this.loopInterval);
					return;
				}
				this.hideText(pos, dir);
				setTimeout(() => loopHide(pos + 1), this.loopInterval);
			};
			const loopShow = pos => {
				if (this.middleIdx - pos < 0) {
					if (halfwayCallback && typeof halfwayCallback === "function") {
						halfwayCallback();
					}
					loopHide(0);
					return;
				}
				this.showText(pos, dir);
				setTimeout(() => loopShow(pos + 1), this.loopInterval);
			};
			loopShow(1);
		});
	}

	// helper methods
	hideText(pos, dir) {
		this.toggleText("hide", pos, dir);
	}
	showText(pos, dir) {
		this.toggleText("show", pos, dir);
	}
	toggleText(action, pos, dir) {
		const changeStyle = {
			up: () => {
				this.DOM.texts[this.middleIdx - pos].style.opacity =
					action === "show" ? 1 : 0;
				this.DOM.texts[this.middleIdx - pos].style.transform = `translateX(${
					pos === 0 && action === "show" ? 0 : -pos * 40
				}px)`;
			},
			down: () => {
				this.DOM.texts[this.middleIdx + pos].style.opacity =
					action === "show" ? 1 : 0;
				this.DOM.texts[this.middleIdx + pos].style.transform = `translateX(${
					pos === 0 && action === "show" ? 0 : pos * 40
				}px)`;
			}
		};
		if (dir === "both") {
			changeStyle["up"]();
			changeStyle["down"]();
		} else {
			changeStyle[dir]();
		}
	}
}

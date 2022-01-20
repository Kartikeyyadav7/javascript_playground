class Timer {
	constructor(durationInput, startButton, pauseButton, callback) {
		this.durationInput = durationInput;
		this.pauseButton = pauseButton;
		this.startButton = startButton;
		if (callback) {
			this.onStart = callback.onStart;
			this.onTick = callback.onTick;
			this.onComplete = callback.onComplete;
		}
		this.startButton.addEventListener("click", this.start);
		this.pauseButton.addEventListener("click", this.pause);
	}

	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemaining);
		}
		this.tick();
		//* We can define a variable like const intervalId but then we won't be able to access the variable inside of the pause method so we have use this to get the refernce in the global
		this.intervalId = setInterval(this.tick, 50);
	};

	pause = () => {
		clearInterval(this.intervalId);
	};

	// tick = () => {
	// 	const timeRemaining = this.durationInput.value;
	// 	this.durationInput.value = timeRemaining - 1;
	// };

	//* This implementation down below is using getter and setter in JS

	tick = () => {
		if (this.timeRemaining <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemaining = this.timeRemaining - 0.05;
			if (this.onTick) {
				this.onTick(this.timeRemaining);
			}
		}
	};

	get timeRemaining() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemaining(time) {
		this.durationInput.value = time.toFixed(2);
	}
}

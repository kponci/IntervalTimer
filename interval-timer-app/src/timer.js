export class Timer {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration; // in seconds
        this.elapsed = 0;
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            if (this.elapsed < this.duration) {
                this.elapsed += 1;
                this.updateDisplay();
            } else {
                this.stop();
            }
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.elapsed = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const timerDisplay = document.getElementById('timer-details');
        if (timerDisplay) {
            const remaining = this.duration - this.elapsed;
            timerDisplay.textContent = `${this.formatTime(this.elapsed)} / ${this.formatTime(this.duration)} (Remaining: ${this.formatTime(remaining)})`;
        }
        console.log(this.name, this.formatTime(this.elapsed));
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    moveForward(seconds) {
        this.elapsed = Math.min(this.elapsed + seconds, this.duration);
        this.updateDisplay();
    }

    moveBackward(seconds) {
        this.elapsed = Math.max(this.elapsed - seconds, 0);
        this.updateDisplay();
    }
}
export class Timer {
    constructor(name, intervals) {
        this.name = name;
        this.intervals = intervals; // Array of { name: string, duration: number }
        this.currentIntervalIndex = 0;
        this.elapsed = 0;
        this.interval = null;
    }

    // run tab helper functions
    run(updateDisplayCallback) {
        if (this.isRunning()) {
            console.log("ERROR: Timer is already running. Stop it first.");
            return;
        }
        this.interval = setInterval(() => {
            if (this.elapsed < this.getCurrentInterval().duration) {
                this.elapsed += 1;
                updateDisplayCallback(this);
            } else {
                this.nextInterval(updateDisplayCallback);
            }
        }, 1000);
    }

    isRunning(){
        return this.interval !== null;
    }

    isFinished(){
        return this.currentIntervalIndex === this.intervals.length - 1 && this.elapsed === this.getCurrentInterval().duration;
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
    }

    reset() {
        clearInterval(this.interval);
        this.interval = null;
        this.elapsed = 0;
        this.currentIntervalIndex = 0;
    }

    nextInterval(updateDisplayCallback) {
        if (this.isFinished()) {
            this.currentIntervalIndex += 1;
            this.elapsed = 0;
            updateDisplayCallback(this);
        } else {
            this.pause();
        }
    }

    getNextIntervalName() {
        if (this.currentIntervalIndex < this.intervals.length - 1) {
            return this.intervals[this.currentIntervalIndex + 1].name;
        } else {
            return "Finished";
        }
    }

    getPreviousIntervalName() {
        if (this.currentIntervalIndex > 0) {
            return this.intervals[this.currentIntervalIndex - 1].name;
        } else {
            return "null";
        }
    }

    getTotalElapsed() {
        let total = 0;
        for (let i = 0; i < this.currentIntervalIndex; i++) {
            total += this.intervals[i].duration;
        }
        return total + this.elapsed;
    }

    getTotalRemaining() {
        let total = 0;
        for (let i = this.currentIntervalIndex; i < this.intervals.length; i++) {
            total += this.intervals[i].duration;
        }
        return total - this.elapsed;
    }

    getCurrentInterval() {
        return this.intervals[this.currentIntervalIndex];
    }

    timeForward(seconds) {
        const currentInterval = this.getCurrentInterval();
        if (this.elapsed + seconds >= currentInterval.duration) {
            if (this.currentIntervalIndex < this.intervals.length - 1) {
                this.elapsed = this.elapsed + seconds - currentInterval.duration;
                this.currentIntervalIndex += 1;
            } else {
                this.elapsed = currentInterval.duration;
            }
        } else {
            this.elapsed += seconds;
        }
    }

    timeBackward(seconds) {
        if (this.elapsed - seconds < 0) {
            if (this.currentIntervalIndex > 0) {
                this.currentIntervalIndex -= 1;
                const previousInterval = this.getCurrentInterval();
                this.elapsed = previousInterval.duration + (this.elapsed - seconds);
            } else {
                this.elapsed = 0;
            }
        } else {
            this.elapsed -= seconds;
        }
    }

    intervalForward() {
        if (this.currentIntervalIndex < this.intervals.length - 1) {
            this.currentIntervalIndex += 1;
            this.elapsed = 0;
        }
    }

    intervalBackward() {
        if (this.currentIntervalIndex > 0) {
            this.currentIntervalIndex -= 1;
            this.elapsed = 0;
        }
    }

    // edit tab helper functions
    addBasicTimer(name, duration) {
        this.intervals.push({ name, duration });
    }

    moveBasicTimer(from, to){
        if(from < 0 || from >= this.intervals.length || to < 0 || to >= this.intervals.length){
            console.log("ERROR: Invalid index: " + from + " or " + to);
            return;
        }
        const temp = this.intervals[from];
        this.intervals[from] = this.intervals[to];
        this.intervals[to] = temp;
    }
}
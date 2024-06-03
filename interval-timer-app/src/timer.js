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
        if (this.isFinished()){
            return;
        }
        if (this.isRunning()) {
            console.log("ERROR: Timer is already running. Stop it first.");
            return;
        }
        this.interval = setInterval(() => {
            if (this.elapsed < this.getCurrentInterval().duration-1) {
                this.elapsed += 1;
                updateDisplayCallback(this);
                if(this.getCurrentInterval().duration - this.elapsed <= 3){
                    document.getElementById('beep-07a').play();
                }
            } else {
                this.nextInterval(updateDisplayCallback);
                if (this.isFinished()){
                    document.getElementById('beep-11').play();
                }
                else{
                    document.getElementById('beep-04').play();
                }
            }
        }, 1000);
    }

    isRunning(){
        return this.interval !== null;
    }

    isFinished(){
        return this.currentIntervalIndex === this.intervals.length - 1 && this.elapsed >= this.getCurrentInterval().duration-1;
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
            this.elapsed += 1;
            updateDisplayCallback(this);
            this.pause();
        } else {
            this.currentIntervalIndex += 1;
            this.elapsed = 0;
            updateDisplayCallback(this);
        }
    }

    getNextIntervalName() {
        if (this.currentIntervalIndex < this.intervals.length - 1) {
            return this.intervals[this.currentIntervalIndex + 1].name;
        } else {
            return "null";
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
        if (this.elapsed + seconds >= currentInterval.duration-1) {
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
    addBasicTimer(basicTimer) {
        this.intervals.push(basicTimer);
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
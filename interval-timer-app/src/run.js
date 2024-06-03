function getTimerWithDisplay() {
    const intervalTimer = window.selectedIntervalTimer;
    const timerDisplay = document.getElementById('run-timer-details');
    if (timerDisplay == null) {
        alert("ERROR: Timer display not found")
        return [null, null];
    }
    if (intervalTimer == null) {
        alert("ERROR: Timer not found")
        return [null, null];
    }
    return [intervalTimer, timerDisplay];
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function addInfo(infoName, infoValue) {
    return `<div class="info-elem">
        <div>${infoName}:</div>
        <div>${infoValue}</div>
      </div>`;
}

function createProgressBar(greenPart, total) {
    const redPart = total - greenPart;

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';

    const greenDiv = document.createElement('div');
    greenDiv.className = 'progress-bar-green';
    greenDiv.style.width = `${(greenPart / total) * 100}%`;
    progressBar.appendChild(greenDiv);

    return progressBar;
}

function showBasicTimerStats(basicTimerId, isMinor) {
    const intervalTimer = window.selectedIntervalTimer;
    if (basicTimerId < 0 || basicTimerId >= intervalTimer.intervals.length) {
        return `<div class="timer-info non-existent">
        Placeholder
        ${addInfo(" ", " ")}
        ${addInfo(" ", " ")}
        ${addInfo(" ", " ")}
        ${createProgressBar(basicTimerId > 0 ? 0 : 100, 100).outerHTML}
      </div>`;
    }

    const basicTimer = intervalTimer.intervals[basicTimerId];
    let elapsedTime = 0;
    if (intervalTimer.currentIntervalIndex < basicTimerId) {
        elapsedTime = 0;
    }
    else if (intervalTimer.currentIntervalIndex == basicTimerId) {
        elapsedTime = intervalTimer.elapsed;
    }
    else {
        elapsedTime = basicTimer.duration;
    }
    const remainingTime = basicTimer.duration - elapsedTime;

    return `<div class="timer-info ${isMinor ? 'minor' : ''}">
        <b>${basicTimer.name}</b>
        ${addInfo("Remaining", formatTime(remainingTime))}
        ${addInfo("Elapsed", formatTime(elapsedTime))}
        ${addInfo("Duration", formatTime(basicTimer.duration))}
        ${createProgressBar(elapsedTime, basicTimer.duration).outerHTML}
      </div>`;
}

function showIntervalTimerStats() {
    const intervalTimer = window.selectedIntervalTimer;
    const totalRemaining = intervalTimer.getTotalRemaining();
    const totalElapsed = intervalTimer.getTotalElapsed();
    const totalTime = totalRemaining + totalElapsed;

    return `<div class="timer-info interval">
        <h1>${intervalTimer.name}</h1>
        ${addInfo("Total Remaining", formatTime(totalRemaining))}
        ${addInfo("Total Elapsed", formatTime(totalElapsed))}
        ${addInfo("Total Duration", formatTime(totalTime))}
        ${addInfo("Progress", `${Math.floor(totalElapsed / totalTime * 100)}%`)}
        ${createProgressBar(totalElapsed, totalTime).outerHTML}
      </div>`;
}

function updateDisplay() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    const currentInterval = intervalTimer.getCurrentInterval();
    const remaining = currentInterval.duration - intervalTimer.elapsed;

    const prevTimerDiv = showBasicTimerStats(intervalTimer.currentIntervalIndex - 1, true);
    const currTimerDiv = showBasicTimerStats(intervalTimer.currentIntervalIndex, false);
    const nextTimerDiv = showBasicTimerStats(intervalTimer.currentIntervalIndex + 1, true);

    const intervalTimerDiv = showIntervalTimerStats();

    timerDisplay.innerHTML = intervalTimerDiv + prevTimerDiv + currTimerDiv + nextTimerDiv;
}

function startPauseButtonHandler() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    const startOrPauseButton = document.getElementById('startPauseButton');
    if (intervalTimer.isRunning()) {
        intervalTimer.pause();
        startOrPauseButton.innerHTML = '<i class="material-icons">play_arrow</i>';
    } else {
        intervalTimer.run(updateDisplay);
        startOrPauseButton.innerHTML = '<i class="material-icons">pause</i>';
    }
}

function timeForthButtonHandler() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    intervalTimer.timeForward(10);
    updateDisplay();
}

function timeBackButtonHandler() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    intervalTimer.timeBackward(10);
    updateDisplay();
}

function intervalForthButtonHandler() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    intervalTimer.intervalForward();
    updateDisplay();
}

function intervalBackButtonHandler() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    intervalTimer.intervalBackward();
    updateDisplay();
}

function resetButtonHandler() {
    const [intervalTimer, timerDisplay] = getTimerWithDisplay();
    intervalTimer.reset();
    updateDisplay();
}

export function initializeRunPage() {

    updateDisplay(); // Initial display update
    document.getElementById('startPauseButton').addEventListener('click', startPauseButtonHandler);
    document.getElementById('timeForthButton').addEventListener('click', timeForthButtonHandler);
    document.getElementById('timeBackButton').addEventListener('click', timeBackButtonHandler);
    document.getElementById('intervalForthButton').addEventListener('click', intervalForthButtonHandler);
    document.getElementById('intervalBackButton').addEventListener('click', intervalBackButtonHandler);
    document.getElementById('resetButton').addEventListener('click', resetButtonHandler);
}


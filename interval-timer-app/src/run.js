// src/run.js

function getTimerWithDisplay() {
    const timer = window.selectedTimer;
    const timerDisplay = document.getElementById('run-timer-details');
    if (timerDisplay == null) {
        console.log("ERROR: Timer display not found")
        return [null, null];
    }
    if (timer == null) {
        console.log("ERROR: Timer not found")
        return [null, null];
    }
    return [timer, timerDisplay];
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function addInfo(infoName, infoValue) {
    return `<div class="timer-info">
        <div>${infoName}:</div>
        <div>${infoValue}</div>
      </div>`;
}

function updateDisplay() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    const currentInterval = timer.getCurrentInterval();
    const remaining = currentInterval.duration - timer.elapsed;
    timerDisplay.innerHTML = `
      <h1>${timer.name}</h1>
      ${addInfo('Current Interval', currentInterval.name)}
      ${addInfo('Duration', formatTime(currentInterval.duration))}
      ${addInfo('Remaining time', formatTime(remaining))}
      ${addInfo('Elapsed time', formatTime(timer.elapsed))}
      ${addInfo('Previous Interval', timer.getPreviousIntervalName())}
      ${addInfo('Next Interval', timer.getNextIntervalName())}
      ${addInfo('Total Remaining time', formatTime(timer.getTotalRemaining()))}
      ${addInfo('Total Elapsed time', formatTime(timer.getTotalElapsed()))}
    `;
}

function startPauseButtonHandler() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    const startOrPauseButton = document.getElementById('startPauseButton');
    if (timer.isRunning()) {
        timer.pause();
        startOrPauseButton.innerHTML = '<i class="material-icons">play_arrow</i>';
    } else {
        timer.run(updateDisplay);
        startOrPauseButton.innerHTML = '<i class="material-icons">pause</i>';
    }
}

function timeForthButtonHandler() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    timer.timeForward(10);
    updateDisplay();
}

function timeBackButtonHandler() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    timer.timeBackward(10);
    updateDisplay();
}

function intervalForthButtonHandler() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    timer.intervalForward();
    updateDisplay();
}

function intervalBackButtonHandler() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    timer.intervalBackward();
    updateDisplay();
}

function resetButtonHandler() {
    const [timer, timerDisplay] = getTimerWithDisplay();
    timer.reset();
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


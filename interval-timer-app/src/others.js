import { setDraggableCanvas, setDraggableElement, deleteDraggableElement } from "./draggables.js";

export function initializeOthersPage() {
    const intervalTimersContainer = document.querySelector('.timers-container');
    intervalTimersContainer.innerHTML = ''; // Clear any existing content

    for (let i = 0; i < allIntervalTimers.length; i++) {
        const intervalTimerStruct = allIntervalTimers[i];
        addTimerElement(intervalTimersContainer, intervalTimerStruct, i);
    }

    setDraggableCanvas(intervalTimersContainer);

    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('mouseover', () => {
        addBtn.textContent = 'add_circle';
    });
    addBtn.addEventListener('mouseout', () => {
        addBtn.textContent = 'add_circle_outline';
    });
    addBtn.addEventListener('click', () => {
        const basicTimerStruct = { name: 'New Timer', duration: 60 };
        const intervalTimerStruct = { name: 'New Interval Timer', intervals: [basicTimerStruct] };
        allIntervalTimers.push(intervalTimerStruct);
        addTimerElement(intervalTimersContainer, intervalTimerStruct, allIntervalTimers.length - 1);
    });
}

// function setBasicTimerName(event, index) {
//     selectedIntervalTimer.intervals[index].name = event.target.value;
// }

// function setBasicTimerDuration(event, index) {
//     selectedIntervalTimer.intervals[index].duration = parseInt(event.target.value);
// }

function removeTimer(timerDiv) {
    if (allIntervalTimers.length <= 1) {
        alert('There needs to be at least one interval timer present.');
        return;
    }
    deleteDraggableElement(document.querySelector('.timers-container'),
        allIntervalTimers,
        timerDiv);
}

function setRmBtnFunctionality(rmBtn) {
    rmBtn.addEventListener('mouseover', () => {
        rmBtn.textContent = 'remove_circle';
    });
    rmBtn.addEventListener('mouseout', () => {
        rmBtn.textContent = 'remove_circle_outline';
    });
    rmBtn.addEventListener('click', () => {
        removeTimer(rmBtn.parentElement);
    });
}

function addTimerElement(intervalTimersContainer, intervalTimer, index) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'basic-timer draggable';
    // timerDiv.draggable = true;
    timerDiv.dataset.index = index;

    timerDiv.innerHTML = `
      <label for="timer-name-${index}">Name:</label>
      <input type="text" id="timer-name-${index}" value="${intervalTimer.name}">
      <label for="timer-duration-${index}">Duration (seconds):</label>
      <input type="number" id="timer-duration-${index}" value="${intervalTimer.duration}">
      <button class="remove-btn material-icons">remove_circle_outline</button>
      <button class="drag-btn material-icons" draggable="true">drag_handle</button>
    `;

    let rmBtn = timerDiv.querySelector('.remove-btn');
    setRmBtnFunctionality(rmBtn);

    setDraggableElement(intervalTimersContainer, timerDiv, selectedIntervalTimer.intervals);
    intervalTimersContainer.appendChild(timerDiv, index);
}

window.initializeOthersPage = initializeOthersPage;

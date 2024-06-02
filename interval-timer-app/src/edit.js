import { setDraggableCanvas, setDraggableElement, deleteDraggableElement } from "./draggables.js";

export function initializeEditPage() {
    // change value in interval-name to the selectedIntervalTimer.name   
    document.getElementById('interval-name').value = selectedIntervalTimer.name;

    const basicTimersContainer = document.querySelector('.timers-container');
    basicTimersContainer.innerHTML = ''; // Clear any existing content

    console.log("selectedIntervalTimer.intervals: " + selectedIntervalTimer.intervals);
    for (let i = 0; i < selectedIntervalTimer.intervals.length; i++) {
        const basicTimerStruct = selectedIntervalTimer.intervals[i];
        addTimerElement(basicTimersContainer, basicTimerStruct, i);
    }

    // const draggables = document.querySelectorAll('.draggable');
    setDraggableCanvas(basicTimersContainer);

    const addBtn = document.querySelector('.add-btn');
    addBtn.addEventListener('mouseover', () => {
        addBtn.textContent = 'add_circle';
    });
    addBtn.addEventListener('mouseout', () => {
        addBtn.textContent = 'add_circle_outline';
    });
    addBtn.addEventListener('click', () => {
        const basicTimerStruct = { name: 'New Timer', duration: 60 };
        selectedIntervalTimer.addBasicTimer(basicTimerStruct);
        addTimerElement(basicTimersContainer, basicTimerStruct, selectedIntervalTimer.intervals.length - 1);
    });
}

function setBasicTimerName(event, index) {
    selectedIntervalTimer.intervals[index].name = event.target.value;
}

function setBasicTimerDuration(event, index) {
    selectedIntervalTimer.intervals[index].duration = parseInt(event.target.value);
}

function removeTimer(timerDiv) {
    if (selectedIntervalTimer.intervals.length <= 1) {
        alert('The interval timer must consist of at least one basic timer.');
        return;
    }
    deleteDraggableElement(document.querySelector('.timers-container'),
        window.selectedIntervalTimer.intervals,
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

function addTimerElement(basicTimersContainer, timer, index) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'basic-timer draggable';
    // timerDiv.draggable = true;
    timerDiv.dataset.index = index;

    timerDiv.innerHTML = `
      <label for="timer-name-${index}">Name:</label>
      <input type="text" id="timer-name-${index}" value="${timer.name}">
      <label for="timer-duration-${index}">Duration (seconds):</label>
      <input type="number" id="timer-duration-${index}" value="${timer.duration}">
      <button class="remove-btn material-icons">remove_circle_outline</button>
      <button class="drag-btn material-icons" draggable="true">drag_handle</button>
    `;

    let rmBtn = timerDiv.querySelector('.remove-btn');
    setRmBtnFunctionality(rmBtn);

    setDraggableElement(basicTimersContainer, timerDiv, selectedIntervalTimer.intervals);
    basicTimersContainer.appendChild(timerDiv, index);
}

window.initializeEditPage = initializeEditPage;

import { setDraggableCanvas, setDraggableElement, deleteDraggableElement } from "./draggables.js";

export function initializeEditPage() {
    // change value in interval-name to the selectedIntervalTimer.name   
    document.getElementById('interval-name').value = selectedIntervalTimer.name;

    const basicTimersContainer = document.getElementById('timers-container');
    basicTimersContainer.innerHTML = ''; // Clear any existing content

    console.log("selectedIntervalTimer.intervals: " + selectedIntervalTimer.intervals);
    for (let i = 0; i < selectedIntervalTimer.intervals.length; i++) {
        const basicTimerStruct = selectedIntervalTimer.intervals[i];
        addTimerElement(basicTimersContainer, basicTimerStruct, i);
    }

    const draggables = document.querySelectorAll('.draggable');
    setDraggableCanvas(basicTimersContainer);

    const addBtn = document.getElementById('add-basic-timer');
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

function removeTimer(index) {
    if (selectedIntervalTimer.intervals.length <= 1) {
        alert('The interval timer must consist of at least one basic timer.');
        return;
    }
    // console.log("selectedTimer before splicing: " + JSON.stringify(window.selectedIntervalTimer));
    // selectedIntervalTimer.intervals.splice(index, 1);
    console.log("selectedTimer before deleting draggable element: " + JSON.stringify(window.selectedIntervalTimer));
    deleteDraggableElement(document.getElementById('timers-container'), selectedIntervalTimer.intervals, index);
    console.log("selectedTimer after deleting draggable element: " + JSON.stringify(window.selectedIntervalTimer));


    // initializeEditPage();           // TODO: there might be a better solution...
}

function setRmBtnFunctionality(rmBtn, index) {
    rmBtn.addEventListener('mouseover', () => {
        rmBtn.textContent = 'remove_circle';
    });
    rmBtn.addEventListener('mouseout', () => {
        rmBtn.textContent = 'remove_circle_outline';
    });
    rmBtn.addEventListener('click', () => {
        removeTimer(index);
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
    setRmBtnFunctionality(rmBtn, index);

    setDraggableElement(basicTimersContainer, timerDiv, selectedIntervalTimer.intervals);
    basicTimersContainer.appendChild(timerDiv, index);
}

window.initializeEditPage = initializeEditPage;

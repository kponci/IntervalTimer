import { setDraggableCanvas, setDraggableElement, deleteDraggableElement } from "./draggables.js";
import { Timer } from './timer.js';
import { convertTimerInstancesToStructArr } from './app.js';

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
        const newInstantiatedInterval = new Timer('New Interval Timer', [basicTimerStruct]);
        allIntervalTimers.push(newInstantiatedInterval);
        addTimerElement(intervalTimersContainer, newInstantiatedInterval, allIntervalTimers.length - 1);
        localStorage.setItem('allIntervalTimers', JSON.stringify(convertTimerInstancesToStructArr(allIntervalTimers)));
        setFocusToIntervalTimer(allIntervalTimers.length - 1);
    });
}

function setFocusToIntervalTimer(intervalTimerId) {
    window.selectedIntervalTimer = window.allIntervalTimers[intervalTimerId];
    window.showPage('edit');
}

function removeTimer(timerDiv) {
    if (allIntervalTimers.length <= 1) {
        alert('There needs to be at least one interval timer present.');
        return;
    }
    deleteDraggableElement(document.querySelector('.timers-container'),
        allIntervalTimers,
        timerDiv);
    window.selectedIntervalTimer = window.allIntervalTimers[0];
}

function setRmBtnFunctionality(rmBtn) {
    rmBtn.addEventListener('mouseover', () => {
        rmBtn.textContent = 'remove_circle';
    });
    rmBtn.addEventListener('mouseout', () => {
        rmBtn.textContent = 'remove_circle_outline';
    });
    rmBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeTimer(rmBtn.parentElement.parentElement);
    });
}

function getIntervalTimerTotalTime(intervalTimer) {
    let totalTime = 0;
    for (let i = 0; i < intervalTimer.intervals.length; i++) {
        totalTime += intervalTimer.intervals[i].duration;
    }
    return totalTime;
}

function addTimerElement(intervalTimersContainer, intervalTimerObject, index) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer-div interval draggable';
    timerDiv.dataset.index = index;

    const totalTime = getIntervalTimerTotalTime(intervalTimerObject);
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;

    const totalMinutesStr = totalMinutes.toString().padStart(2, '0');
    const totalSecondsStr = totalSeconds.toString().padStart(2, '0');
    const intervalName = intervalTimerObject.name;
    
    timerDiv.innerHTML = `
    <label class="timer-name narrow-shrinkable"><b class="narrow-removable">Name:</b>${intervalName}</label>
    <label><b class="narrow-removable">Time:</b> ${totalMinutesStr}:${totalSecondsStr}</label>
    <div>
        <button class="remove-btn material-icons">remove_circle_outline</button>
        <button class="drag-btn material-icons" draggable="true">drag_handle</button>
    </div>`;

    let rmBtn = timerDiv.querySelector('.remove-btn');
    setRmBtnFunctionality(rmBtn);

    setDraggableElement(intervalTimersContainer, timerDiv, allIntervalTimers);
    timerDiv.addEventListener('click', () => {
        setFocusToIntervalTimer(Array.prototype.indexOf.call(intervalTimersContainer.children, timerDiv));
    });
    intervalTimersContainer.appendChild(timerDiv, index);
}

window.initializeOthersPage = initializeOthersPage;

import { setDraggableCanvas, setDraggableElement, deleteDraggableElement } from "./draggables.js";

export function initializeEditPage() {
    // change value in interval-name to the selectedIntervalTimer.name   
    if (selectedIntervalTimer == null){
        alert("No interval timer selected");
        // return;
        selectedIntervalTimer = window.allIntervalTimers[0];
    }
    document.getElementById('interval-name').value = window.selectedIntervalTimer.name;
    document.getElementById('interval-name').addEventListener('change', handleInputChange);

    const basicTimersContainer = document.querySelector('.timers-container');
    basicTimersContainer.innerHTML = ''; // Clear any existing content

    for (let i = 0; i < selectedIntervalTimer.intervals.length; i++) {
        const basicTimerStruct = selectedIntervalTimer.intervals[i];
        addTimerElement(basicTimersContainer, basicTimerStruct, i);
    }

    // const draggables = document.querySelectorAll('.draggable');
    setDraggableCanvas(basicTimersContainer);
    // basicTimersContainer.addEventListener("input", handleInputChange);

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
        removeTimer(rmBtn.parentElement.parentElement);
    });
}

function handleInputChange(event) {
    const srcElement = event.srcElement;
    if (srcElement.type === 'text') {       // name of the interval timer or name of a basic timer 
        if (event.target.value.length == 0){
            alert("Name cannot be empty");
            return;
        }
        if (event.target.value.length > 20){
            alert("Name cannot be longer than 20 characters");
            return;
        }
        if (srcElement.id === 'interval-name') {
            selectedIntervalTimer.name = event.target.value;
        } else {
            const index = event.target.closest('.timer-div').dataset.index;
            selectedIntervalTimer.intervals[index].name = event.target.value;
        }
    }
    else {                                  // time of a basic timer
        const index = srcElement.closest('.timer-div').dataset.index;
        const minutesField = srcElement.closest('.timer-div').querySelector('.mins');
        const secondsField = srcElement.closest('.timer-div').querySelector('.secs');

        // check if input is a valid number
        if (event.target.value.length == 0){
            event.target.value = "0";
        }
        const integerValue = parseInt(event.target.value);
        if (isNaN(integerValue) || integerValue < 0 || integerValue > 59){
            alert("Please enter a valid number between 0 and 59");
            event.target.value = 0;
            if (minutesField == 0 && secondsField < 3){
                secondsField.value = 3;
            }
        }
        
        let duration = parseInt(minutesField.value, 10) * 60 + parseInt(secondsField.value, 10);
        if (duration < 3) {
            alert("Duration must be at least 3 seconds");
            minutesField.value = 0;
            secondsField.value = 3;
            duration = 3;
        }

        if(!isNaN(integerValue)){
            // remove trailing zeros
            event.target.value = integerValue;
        }

        selectedIntervalTimer.intervals[index].duration = duration;
    }
}

function unfocusOnEnter(event) {
    if (event.key === 'Enter') {
        event.target.blur();
    }
}

function addTimerElement(basicTimersContainer, timer, index) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'timer-div draggable';
    // timerDiv.draggable = true;
    timerDiv.dataset.index = index;

    const minutes = Math.floor(timer.duration / 60);
    const seconds = timer.duration % 60;

    timerDiv.innerHTML = `
    <div>
        <label>Name:</label>
        <input type="text" placeholder="Sample basic timer" value="${timer.name}">
    </div>
    <div>
        <label>Time:</label>
        <input class="time-input mins" type="number" value="${minutes}" min="0" max="59" placeholder="10">m
        :
        <input class="time-input secs" type="number" value="${seconds}" min="0" max="59" placeholder="10">s
    </div>
    <div>
        <button class="remove-btn material-icons">remove_circle_outline</button>
        <button class="drag-btn material-icons" draggable="true">drag_handle</button>
    </div>`;

    ['input[type="text"]', '.time-input.mins', '.time-input.secs'].forEach(selector => {
        let inputEl = timerDiv.querySelector(selector);
        inputEl.addEventListener('input', handleInputChange);
        inputEl.addEventListener('keydown', unfocusOnEnter);
    });

    let rmBtn = timerDiv.querySelector('.remove-btn');
    setRmBtnFunctionality(rmBtn);

    setDraggableElement(basicTimersContainer, timerDiv, selectedIntervalTimer.intervals);
    basicTimersContainer.appendChild(timerDiv, index);
}

window.initializeEditPage = initializeEditPage;

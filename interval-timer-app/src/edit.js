export function initializeEditPage() {
    // change value in interval-name to the selectedTimer.name   
    document.getElementById('interval-name').value = selectedTimer.name;

    const container = document.getElementById('timers-container');
    container.innerHTML = ''; // Clear any existing content

    console.log("selectedTimer.intervals: " + selectedTimer.intervals);
    for (let i = 0; i < selectedTimer.intervals.length; i++) {
        const timer = selectedTimer.intervals[i];
        addTimerElement(container, timer, i);
    }

    document.getElementById('add-timer').addEventListener('click', () => {
        const newBasicTimer = { name: 'New Timer', duration: 60 };
        selectedTimer.addBasicTimer(newBasicTimer);
        addTimerElement(container, newTimer, timers.length - 1);
    });


    const draggables = document.querySelectorAll('.draggable');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    })

    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
}

function setBasicTimerName(event, index) {
    selectedTimer.intervals[index].name = event.target.value;
}

function setBasicTimerDuration(event, index) {
    selectedTimer.intervals[index].duration = parseInt(event.target.value);
}

function addTimerElement(container, timer, index) {
    const timerDiv = document.createElement('div');
    timerDiv.className = 'draggable';
    timerDiv.draggable = true;
    timerDiv.dataset.index = index;
    console.log("index: " + index);
    console.log("timerDiv: " + timerDiv);
    console.log("timer.name: " + timer.name);
    console.log("timer.duration: " + timer.duration);

    timerDiv.innerHTML = `
      <label for="timer-name-${index}">Name:</label>
      <input type="text" id="timer-name-${index}" value="${timer.name}">
      <label for="timer-duration-${index}">Duration (seconds):</label>
      <input type="number" id="timer-duration-${index}" value="${timer.duration}">
      <button onclick="removeTimer(${index})">Remove</button>
    `;

    container.appendChild(timerDiv);
}

function removeTimer(index) {
    timers.splice(index, 1);
    initializeEditPage();
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}

window.initializeEditPage = initializeEditPage;

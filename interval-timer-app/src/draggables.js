// Using a recursive function to print the nested object
function printNestedObject(obj, indent = 0) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            console.log(`${' '.repeat(indent)}${key}:`);
            printNestedObject(obj[key], indent + 4);
        } else {
            console.log(`${' '.repeat(indent)}${key}: ${obj[key]}`);
        }
    }
}

export default function setDraggables(container, draggables, list2change) {
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', () => {
            printNestedObject(list2change);
            draggable.classList.remove('dragging');

            updateListOrder(container, list2change);
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

function updateListOrder(container, list2change) {
    const elements = [...container.querySelectorAll('.draggable')];
    const newOrder = elements.map(element => parseInt(element.dataset.index, 10));

    // Reorder the list based on the new indices
    const reorderedList = newOrder.map(index => list2change[index]);

    // Update the original list with the reordered list by reassigning the array
    list2change.length = 0;
    list2change.push(...reorderedList);
}
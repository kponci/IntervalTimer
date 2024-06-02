export function setDraggableCanvas(container) {
    container.addEventListener('dragover', e => {
        console.log("dragover")
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
}

export function setDraggableElement(container, element, list2change) {
    // element MUST contain button with class drag-btn

    const dragButton = element.querySelector('.drag-btn');
    dragButton.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData("plain/text", element);
        // event.preventDefault();
        console.log("dragstart");
        element.classList.add('dragging');
    });

    dragButton.addEventListener('dragend', () => {
        console.log("dragend");
        element.classList.remove('dragging');
        updateListOrder(container, list2change);
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

function updateListOrder(container, changedList) {
    const elements = [...container.querySelectorAll('.draggable')];
    const newOrder = elements.map(element => parseInt(element.dataset.index, 10));

    // Reorder the list based on the new indices
    const reorderedList = newOrder.map(index => changedList[index]);

    // Update the original list with the reordered list by reassigning the array
    changedList.length = 0;
    changedList.push(...reorderedList);
}

// New function to delete a draggable element at a given index
export function deleteDraggableElement(container, list2change, idx) {
    const element = container.querySelector(`.draggable[data-index="${idx}"]`);
    if (element) {
        container.removeChild(element);
        list2change.splice(idx, 1);

        // Reassign data indices to remaining elements
        [...container.querySelectorAll('.draggable')].forEach((el, newIndex) => {
            el.dataset.index = newIndex;
        });

        updateListOrder(container, list2change);
    }
}
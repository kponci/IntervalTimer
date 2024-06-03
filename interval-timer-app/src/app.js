import { Timer } from './timer.js';
import { initializeRunPage } from './run.js';
import { initializeEditPage } from './edit.js';
import { initializeOthersPage } from './others.js';

export function convertTimerInstancesToStructArr(timerInstances) {
    return timerInstances.map(timer => {
        return {
            name: timer.name,
            intervals: timer.intervals
        }
    });
}

function convertTimerStructsToInstances(timerStructs) {
    return timerStructs.map(timerStruct => {
        return new Timer(timerStruct.name, timerStruct.intervals);
    });
}

let selectedIntervalTimer = null;
let allIntervalTimers = null;
if (localStorage.getItem('allIntervalTimers') === null) {
    selectedIntervalTimer = new Timer(
        "Sample timer",
        [
            { name: 'Warm-up', duration: 60 },
            { name: 'Exercise', duration: 120 },
            { name: 'Rest', duration: 30 }
        ]
    );
    allIntervalTimers = [selectedIntervalTimer];
    localStorage.setItem('allIntervalTimers', JSON.stringify(convertTimerInstancesToStructArr(allIntervalTimers)));
}
else {
    const timerStructs = JSON.parse(localStorage.getItem('allIntervalTimers'));
    allIntervalTimers = convertTimerStructsToInstances(timerStructs);
    console.log("allIntervalTimers: " + JSON.stringify(allIntervalTimers));
    selectedIntervalTimer = allIntervalTimers[0];
}


function updateNavbar(page) {
    const navbarButtons = document.querySelectorAll('.navbar button');
    navbarButtons.forEach(button => {
        if (button.id == `${page}-nav`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function showPage(page) {
    updateNavbar(page);
    const content = document.getElementById('main-body-content');
    content.innerHTML = '';
    fetch(`../public/pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            const scriptEl = document.createRange().createContextualFragment(html);
            content.append(scriptEl)
            // content.innerHTML = html;
            // Dynamically load and execute corresponding script
            if (page === 'run') {
                initializeRunPage();
            }
            else if (page === 'edit') {
                initializeEditPage();
            }
            else if (page === 'others') {
                initializeOthersPage();
            }
        })
        .catch(err => console.warn('Error loading page:', err));
}

window.showPage = showPage;
window.selectedIntervalTimer = selectedIntervalTimer;
window.allIntervalTimers = allIntervalTimers;
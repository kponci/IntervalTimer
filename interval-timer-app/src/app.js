import { Timer } from './timer.js';
import { initializeRunPage } from './run.js';

let selectedTimer = new Timer(
    "Timer 1",
    [
        { name: 'Warm-up', duration: 60 },
        { name: 'Exercise', duration: 120 },
        { name: 'Rest', duration: 30 }
    ]
);
let timers = [selectedTimer];


function showPage(page) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    fetch(`../public/pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            const scriptEl = document.createRange().createContextualFragment(html);
            content.append(scriptEl)
            // content.innerHTML = html;
            if (page === 'run') {
                // Dynamically load and execute run.js
                initializeRunPage();
            }
            // Add similar initialization for 'edit' and 'others' if needed
        })
        .catch(err => console.warn('Error loading page:', err));
}

window.showPage = showPage;
window.selectedTimer = selectedTimer;
window.timers = timers;
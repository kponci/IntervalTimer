import { Timer } from './timer.js';
import { initializeRunPage } from './run.js';
import { initializeEditPage } from './edit.js';

let selectedIntervalTimer = new Timer(
    "Timer 1",
    [
        { name: 'Warm-up', duration: 60 },
        { name: 'Exercise', duration: 120 },
        { name: 'Rest', duration: 30 }
    ]
);
let timers = [selectedIntervalTimer];


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
            // Dynamically load and execute run.js
            if (page === 'run') {
                initializeRunPage();
            }
            else if (page === 'edit') {
                initializeEditPage();
            }
            // else if (page === 'others') {
            //     initializeEothersPage();
            // }
        })
        .catch(err => console.warn('Error loading page:', err));
}

window.showPage = showPage;
window.selectedIntervalTimer = selectedIntervalTimer;
window.timers = timers;
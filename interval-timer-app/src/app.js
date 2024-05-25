import { Timer } from './timer.js';
import {initializeRunPage} from './run.js';

let selectedTimer = new Timer('Example Timer', 120);
let timers = [selectedTimer];


function showPage(page) {
  const content = document.getElementById('content');
  fetch(`../public/pages/${page}.html`)
    .then(response => response.text())
    .then(html => {
      content.innerHTML = html;
      if (page === 'run') {
        // Dynamically load and execute run.js
        initializeRunPage(selectedTimer);
      }
      // Add similar initialization for 'edit' and 'others' if needed
    })
    .catch(err => console.warn('Error loading page:', err));
}

window.showPage = showPage;
window.selectedTimer = selectedTimer;
window.timers = timers;
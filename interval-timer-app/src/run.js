// src/run.js
import { Timer } from './timer.js';

export function initializeRunPage(timer) {
//   timer = new Timer('Example Timer', 120); // 2 minutes
  timer.updateDisplay(); // Initial display update
}

window.initializeRunPage = initializeRunPage;
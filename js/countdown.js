/**
 * Countdown Timer Module
 * Counts down to the wedding date: August 2, 2026
 */

'use strict';

let countdownInterval;

/**
 * Initialize the countdown timer
 */
function initCountdown() {
    const weddingDate = new Date('August 2, 2026 08:00:00').getTime();
    
    // Update immediately
    updateCountdown(weddingDate);
    
    // Update every second
    countdownInterval = setInterval(function() {
        updateCountdown(weddingDate);
    }, 1000);
}

/**
 * Update countdown display
 * @param {number} weddingDate - Target wedding date timestamp
 */
function updateCountdown(weddingDate) {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    // Check if countdown has ended
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display with formatted numbers
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = formatNumber(days);
    if (hoursElement) hoursElement.textContent = formatNumber(hours);
    if (minutesElement) minutesElement.textContent = formatNumber(minutes);
    if (secondsElement) secondsElement.textContent = formatNumber(seconds);
}

/**
 * Format number with leading zero
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Stop countdown (cleanup function)
 */
function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initCountdown, stopCountdown };
}

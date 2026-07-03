/**
 * Main Script - Wedding Invitation Website
 * Handles initialization and coordinates all modules
 */

'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wedding Invitation Website Loaded');
    
    // Initialize guest name from URL
    if (typeof getGuestNameFromURL === 'function') {
        getGuestNameFromURL();
    }
    
    // Initialize opening cover
    initOpeningCover();
});

/**
 * Initialize opening cover functionality
 */
function initOpeningCover() {
    const openingCover = document.getElementById('openingCover');
    const btnOpen = document.getElementById('btnOpen');
    const mainContent = document.getElementById('mainContent');
    const body = document.body;
    
    if (!openingCover || !btnOpen || !mainContent) return;
    
    btnOpen.addEventListener('click', function() {
        // Add opened class to slide up the cover
        openingCover.classList.add('opened');
        
        // Show main content
        setTimeout(() => {
            mainContent.classList.add('visible');
            body.classList.remove('locked');
            
            // Initialize other modules after opening
            initializeAfterOpen();
        }, 300);
        
        // Play music
        playMusic();
        
        // Store in session that invitation is opened
        sessionStorage.setItem('invitationOpened', 'true');
    });
}

/**
 * Initialize modules after opening the invitation
 */
function initializeAfterOpen() {
    // Initialize countdown
    if (typeof initCountdown === 'function') {
        initCountdown();
    }
    
    // Initialize gallery
    if (typeof initGallery === 'function') {
        initGallery();
    }
    
    // Initialize music control
    if (typeof initMusicControl === 'function') {
        initMusicControl();
    }
    
    // Initialize animations
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
    
    // Initialize RSVP form
    if (typeof initRSVPForm === 'function') {
        initRSVPForm();
    }
    
    // Initialize copy buttons
    if (typeof initCopyButtons === 'function') {
        initCopyButtons();
    }
}

/**
 * Play background music
 */
function playMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.5; // Set volume to 50%
        bgMusic.play().catch(function(error) {
            console.log('Autoplay prevented:', error);
        });
    }
}

/**
 * Utility function to format numbers with leading zeros
 */
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Utility function to check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function for performance optimization
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

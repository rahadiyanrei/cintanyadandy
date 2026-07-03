/**
 * Animation Module
 * Handles scroll animations using Intersection Observer
 */

'use strict';

let observer = null;
let parallaxElements = [];

/**
 * Initialize all animations
 */
function initAnimations() {
    // Initialize reveal animations with Intersection Observer
    initRevealAnimations();
    
    // Initialize parallax effects
    initParallaxEffects();
    
    // Initialize counter animations
    initCounterAnimations();
}

/**
 * Initialize reveal animations using Intersection Observer
 */
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (!revealElements.length) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // If user prefers reduced motion, just show all elements
        revealElements.forEach(el => el.classList.add('active'));
        return;
    }
    
    // Create Intersection Observer
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });
    
    // Observe all reveal elements
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Initialize parallax effects on scroll
 */
function initParallaxEffects() {
    parallaxElements = document.querySelectorAll('.parallax');
    
    if (!parallaxElements.length) return;
    
    // Throttle scroll event for performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Update parallax positions
 */
function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
    });
}

/**
 * Initialize counter animations for countdown
 */
function initCounterAnimations() {
    const countdownNumbers = document.querySelectorAll('.countdown-number');
    
    if (!countdownNumbers.length) return;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    });
    
    countdownNumbers.forEach(num => counterObserver.observe(num));
}

/**
 * Animate counter from 0 to target value
 * @param {HTMLElement} element - Counter element
 */
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 16);
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
 * Add fade-in animation to element
 * @param {HTMLElement} element - Element to animate
 * @param {string} direction - Animation direction (up, down, left, right)
 */
function fadeIn(element, direction = 'up') {
    const animations = {
        up: 'fadeInUp',
        down: 'fadeInDown',
        left: 'fadeInLeft',
        right: 'fadeInRight'
    };
    
    element.style.opacity = '0';
    element.style.animation = `${animations[direction]} 0.8s ease forwards`;
}

/**
 * Add zoom-in animation to element
 * @param {HTMLElement} element - Element to animate
 */
function zoomIn(element) {
    element.style.opacity = '0';
    element.style.transform = 'scale(0.8)';
    element.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
    }, 100);
}

/**
 * Cleanup animations
 */
function cleanupAnimations() {
    if (observer) {
        observer.disconnect();
        observer = null;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAnimations, cleanupAnimations };
}

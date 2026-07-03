/**
 * Gallery Module
 * Handles lightbox functionality with swipe support for mobile
 */

'use strict';

let currentImageIndex = 0;
let images = [];
let touchStartX = 0;
let touchEndX = 0;

/**
 * Initialize gallery functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!galleryItems.length || !lightbox) return;
    
    // Collect all image sources
    images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return img ? img.src : '';
    });
    
    // Add click event to each gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Previous button
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPreviousImage);
    }
    
    // Next button
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Close on backdrop click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Touch events for swipe
    setupTouchEvents(lightbox);
}

/**
 * Setup touch events for swipe navigation
 * @param {HTMLElement} lightbox - Lightbox element
 */
function setupTouchEvents(lightbox) {
    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

/**
 * Handle swipe gesture
 */
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) < swipeThreshold) return;
    
    if (diff > 0) {
        // Swipe left - next image
        showNextImage();
    } else {
        // Swipe right - previous image
        showPreviousImage();
    }
}

/**
 * Open lightbox with specified image
 * @param {number} index - Index of image to display
 */
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightbox || !lightboxImage) return;
    
    currentImageIndex = index;
    lightboxImage.src = images[currentImageIndex];
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (!lightbox) return;
    
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
    
    // Clear image after animation
    setTimeout(() => {
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.src = '';
        }
    }, 300);
}

/**
 * Show previous image
 */
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

/**
 * Show next image
 */
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

/**
 * Update lightbox image with fade effect
 */
function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightboxImage) return;
    
    // Fade out
    lightboxImage.style.opacity = '0';
    
    setTimeout(() => {
        // Change source
        lightboxImage.src = images[currentImageIndex];
        
        // Fade in when loaded
        lightboxImage.onload = function() {
            lightboxImage.style.opacity = '1';
        };
    }, 200);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initGallery, openLightbox, closeLightbox };
}

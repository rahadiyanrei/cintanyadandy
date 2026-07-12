/**
 * Music Module
 * Handles background music playback control
 */

'use strict';

let isPlaying = false;
let bgMusic = null;
let pausedByVisibility = false; // true only if WE paused it due to tab going inactive

/**
 * Initialize music control button
 */
function initMusicControl() {
    bgMusic = document.getElementById('bgMusic');
    const btnMusic = document.getElementById('btnMusic');
    
    if (!btnMusic) return;
    
    // Set initial volume
    if (bgMusic) {
        bgMusic.volume = 0.5;
    }
    
    // Add click event to toggle music
    btnMusic.addEventListener('click', toggleMusic);
    
    // Update icon when music ends
    if (bgMusic) {
        bgMusic.addEventListener('ended', function() {
            isPlaying = false;
            updateMusicIcon();
        });
        
        bgMusic.addEventListener('play', function() {
            isPlaying = true;
            updateMusicIcon();
        });
        
        bgMusic.addEventListener('pause', function() {
            isPlaying = false;
            updateMusicIcon();
        });
    }
    
    // Only allow playback while the tab is active/visible.
    // Auto-pause on hide, and only auto-resume if WE were the ones
    // who paused it (don't override a manual pause by the user).
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

/**
 * Pause music when tab becomes hidden; resume it when tab becomes
 * visible again, but only if it was auto-paused by this handler.
 */
function handleVisibilityChange() {
    if (!bgMusic) return;
    
    if (document.hidden) {
        if (isPlaying) {
            pausedByVisibility = true;
            pauseMusic();
        }
    } else {
        if (pausedByVisibility) {
            pausedByVisibility = false;
            playMusic();
        }
    }
}

/**
 * Toggle music play/pause
 */
function toggleMusic() {
    if (!bgMusic) return;
    
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

/**
 * Play music
 */
function playMusic() {
    if (!bgMusic) return;
    
    bgMusic.play().then(() => {
        isPlaying = true;
        updateMusicIcon();
    }).catch(error => {
        console.log('Music playback failed:', error);
        showError('Maaf, audio tidak dapat diputar.');
    });
}

/**
 * Pause music
 */
function pauseMusic() {
    if (!bgMusic) return;
    
    bgMusic.pause();
    isPlaying = false;
    updateMusicIcon();
}

/**
 * Update music button icon based on playing state
 * FIXED: Uses classList to play nice with Tailwind's .hidden class
 */
function updateMusicIcon() {
    const btnMusic = document.getElementById('btnMusic');
    if (!btnMusic) return;
    
    const iconPlaying = btnMusic.querySelector('.icon-playing');
    const iconPaused = btnMusic.querySelector('.icon-paused');
    
    if (!iconPlaying || !iconPaused) return;
    
    if (isPlaying) {
        iconPlaying.classList.remove('hidden');
        iconPaused.classList.add('hidden');
        btnMusic.style.animation = 'pulse 2s ease-in-out infinite';
    } else {
        iconPlaying.classList.add('hidden');
        iconPaused.classList.remove('hidden');
        btnMusic.style.animation = 'none';
    }
}

/**
 * Show error message for music
 * @param {string} message - Error message
 */
function showError(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(26, 35, 126, 0.95);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-size: 0.9rem;
            animation: fadeInUp 0.3s ease;
        ">
            ${message}
        </div>
        <style>
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        </style>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMusicControl, toggleMusic, playMusic, pauseMusic };
}
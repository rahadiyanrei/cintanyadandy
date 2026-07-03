/**
 * Guest Module
 * Handles guest name from URL and RSVP form functionality
 */

'use strict';

/**
 * Get guest name from URL parameter
 */
function getGuestNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    
    if (guestName) {
        // Decode and display the guest name
        const decodedName = decodeURIComponent(guestName);
        
        // Update opening cover
        const openingGuestName = document.getElementById('guestName');
        if (openingGuestName) {
            openingGuestName.textContent = decodedName;
        }
        
        // Update hero section
        const heroGuestName = document.getElementById('heroGuestName');
        if (heroGuestName) {
            heroGuestName.textContent = decodedName;
        }
    }
}

/**
 * Initialize RSVP form handling
 */
function initRSVPForm() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (!rsvpForm) return;
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const nama = document.getElementById('nama').value.trim();
        const jumlah = document.getElementById('jumlah').value;
        const konfirmasi = document.getElementById('konfirmasi').value;
        const pesan = document.getElementById('pesan').value.trim();
        
        // Validate form
        if (!validateRSVPForm(nama, jumlah, konfirmasi)) {
            return;
        }
        
        // Create confirmation data
        const confirmationData = {
            nama: nama,
            jumlah: jumlah,
            konfirmasi: konfirmasi,
            pesan: pesan,
            timestamp: new Date().toISOString()
        };
        
        // Store in localStorage (simulating backend)
        saveRSVPConfirmation(confirmationData);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        rsvpForm.reset();
    });
}

/**
 * Validate RSVP form fields
 * @param {string} nama - Guest name
 * @param {string} jumlah - Number of guests
 * @param {string} konfirmasi - Confirmation status
 * @returns {boolean} Validation result
 */
function validateRSVPForm(nama, jumlah, konfirmasi) {
    // Validate name
    if (!nama || nama.length < 3) {
        showError('Nama lengkap harus diisi dengan minimal 3 karakter.');
        return false;
    }
    
    // Validate number of guests
    if (!jumlah || (jumlah !== '1' && jumlah !== '2')) {
        showError('Silakan pilih jumlah tamu (1 atau 2).');
        return false;
    }
    
    // Validate confirmation
    if (!konfirmasi) {
        showError('Silakan pilih konfirmasi kehadiran.');
        return false;
    }
    
    return true;
}

/**
 * Save RSVP confirmation to localStorage
 * @param {Object} data - Confirmation data
 */
function saveRSVPConfirmation(data) {
    try {
        // Get existing confirmations
        const existing = localStorage.getItem('rsvpConfirmations') || '[]';
        const confirmations = JSON.parse(existing);
        
        // Add new confirmation
        confirmations.push(data);
        
        // Save back to localStorage
        localStorage.setItem('rsvpConfirmations', JSON.stringify(confirmations));
        
        console.log('RSVP saved:', data);
    } catch (error) {
        console.error('Error saving RSVP:', error);
    }
}

/**
 * Show success message after form submission
 */
function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 2px;
            box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
            z-index: 10001;
            animation: slideDown 0.5s ease;
            font-family: var(--font-body);
            font-size: 0.875rem;
        ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Terima kasih! Konfirmasi Anda telah terkirim.
        </div>
        <style>
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        </style>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
            color: white;
            padding: 1rem 2rem;
            border-radius: 2px;
            box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
            z-index: 10001;
            animation: slideDown 0.5s ease;
            font-family: var(--font-body);
            font-size: 0.875rem;
        ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-right: 8px;">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            ${message}
        </div>
        <style>
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
        </style>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        const element = notification.firstChild;
        if (element) {
            element.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

/**
 * Initialize copy buttons for bank account
 */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-account');
            
            if (!accountNumber) return;
            
            // Copy to clipboard
            navigator.clipboard.writeText(accountNumber).then(() => {
                // Show success feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Tersalin!
                `;
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                showError('Gagal menyalin nomor rekening.');
            });
        });
    });
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getGuestNameFromURL, initRSVPForm, initCopyButtons };
}

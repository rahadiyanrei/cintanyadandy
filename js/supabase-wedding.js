// 1. Initialize Supabase Client
// Replace these values with your actual project credentials from Settings > API
const SUPABASE_URL = 'https://terfhdgbfirpdvsvrrdp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ci2dwPZQcS5ZqJqiGX4dbA_pUW4zpMY';

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const rsvpForm = document.getElementById('rsvpForm');
const wishesContainer = document.getElementById('wishesContainer');

/**
 * 2. READ OPERATION: Fetch wishes from Supabase and display them
 */
async function loadWishes() {
    // Fetch data safely sorted by the newest entry
    const { data: wishes, error } = await _supabase
        .from('wishes')
        .select('name, comment, is_attend, created_at') // <--- Updated column name
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching wishes:', error);
        return;
    }

    // Clear static placeholders safely
    wishesContainer.innerHTML = '';

    if (wishes.length === 0) {
        wishesContainer.innerHTML = '<p class="text-center opacity-60">Belum ada ucapan. Jadilah yang pertama!</p>';
        return;
    }

    // Render loop
    wishes.forEach(wish => {
        // Create elements dynamically to guarantee safe plain-text rendering (Anti-XSS)
        const card = document.createElement('div');
        card.className = 'wish-card reveal';

        const header = document.createElement('div');
        header.className = 'wish-header';

        const avatar = document.createElement('div');
        avatar.className = 'wish-avatar';
        avatar.textContent = wish.name ? wish.name.charAt(0).toUpperCase() : '?';

        const info = document.createElement('div');
        info.className = 'wish-info';

        const h4 = document.createElement('h4');
        h4.textContent = wish.name; // <--- SECURE text assignment

        const timeSpan = document.createElement('span');
        timeSpan.className = 'wish-time text-xs opacity-60 ml-2';
        
        // Handle boolean evaluation directly for badge output
        timeSpan.textContent = wish.is_attend === true ? '(Hadir)' : '(Tidak Hadir)';

        const message = document.createElement('p');
        message.className = 'wish-message';
        message.textContent = wish.comment; // <--- SECURE text assignment

        // Structural assembly
        info.appendChild(h4);
        h4.appendChild(timeSpan);
        header.appendChild(avatar);
        header.appendChild(info);
        card.appendChild(header);
        card.appendChild(message);

        wishesContainer.appendChild(card);
    });
}

/**
 * 3. WRITE OPERATION: Intercept Form Submit and Send data to Supabase
 */
rsvpForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = rsvpForm.querySelector('.btn-submit');
    
    // UI Feedback: Disable button to stop double submissions
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';

    const name = document.getElementById('nama').value.trim();
    // Converts the string choice 'hadir' directly into a clean JavaScript boolean (true/false)
    const is_attend = document.getElementById('konfirmasi').value === 'hadir'; 
    const comment = document.getElementById('pesan').value.trim();

    // Insert payload using correct schema parameters
    const { error } = await _supabase
        .from('wishes')
        .insert([{ name, comment, is_attend }]); // <--- Passes strict boolean value

    if (error) {
        console.error('Error saving RSVP:', error.message);
        alert('Gagal mengirim konfirmasi. Silakan coba lagi.');
        
        // Re-enable UI components on error
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    } else {
        alert('Terima kasih atas konfirmasi dan doa indahnya! ❤️');
        rsvpForm.reset();
        
        // Re-enable UI elements
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Instantly reload comments container to show changes
        loadWishes();
    }
});

// 4. Load wishes immediately on document ready
document.addEventListener('DOMContentLoaded', loadWishes);
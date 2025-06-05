// Password Protection
function checkPassword() {
    const password = document.getElementById('passwordInput').value.trim().toLowerCase();
    const correctPassword = "ilovetimsee";
    
    if (password === correctPassword) {
        // Hide password modal and show content
        document.getElementById('passwordModal').style.display = 'none';
        document.getElementById('siteContent').classList.remove('hidden');
        document.getElementById('footer').classList.remove('hidden');
        
        // Initialize site features
        showPage('about');
        createFloatingHearts();
        startCountdown();
        
        // Play a welcome sound
        const welcomeSound = new Audio('notification-sound.mp3');
        welcomeSound.volume = 0.3;
        welcomeSound.play();
    } else {
        // Wrong password handling with animation
        const input = document.getElementById('passwordInput');
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
        input.value = '';
        input.focus();
    }
}

// Event Listeners
function setupEventListeners() {
    // Password input
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPassword();
    });
    
    // Mobile navigation toggle
    document.getElementById('mobileNavToggle').addEventListener('click', () => {
        document.getElementById('mobileNavContainer').classList.toggle('show');
    });
    
    // Footer love message
    document.querySelector('footer').addEventListener('click', showLoveMessage);
    
    // Surprise button
    const surpriseBtn = document.querySelector('.surprise-btn');
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', showSurprise);
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Show requested page
    document.getElementById(pageId).classList.remove('hidden');
    
    // Update active nav buttons
    updateActiveNavButtons(pageId);
    
    // Scroll to top and handle music
    window.scrollTo(0, 0);
    if (pageId !== 'music') pauseSong();
}

function updateActiveNavButtons(pageId) {
    // Update desktop and mobile nav buttons
    document.querySelectorAll('.nav-btn').forEach(button => {
        button.classList.remove('active');
        const onclickAttr = button.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(pageId)) {
            button.classList.add('active');
        }
    });
}

// Heart Animations
function createHeart(e) {
    const heart = document.createElement('div');
    heart.className = 'heart-pop';
    heart.innerHTML = '💜';
    heart.style.left = `${e.clientX - 10}px`;
    heart.style.top = `${e.clientY - 10}px`;
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

function showLoveMessage() {
    const footer = document.querySelector('footer');
    
    // Create multiple hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeart({
                clientX: footer.getBoundingClientRect().left + Math.random() * footer.offsetWidth,
                clientY: footer.getBoundingClientRect().top + Math.random() * footer.offsetHeight
            });
        }, i * 100);
    }
    
    // Show and hide message
    const message = document.getElementById('loveMessage');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    container.innerHTML = "";
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '💜';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.top = `${Math.random() * 100}vh`;
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.animationDuration = `${Math.random() * 20 + 10}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(heart);
    }
}

// Countdown Timer
function startCountdown() {
    const countDownDate = new Date();
    countDownDate.setMonth(5); // June
    countDownDate.setDate(6);
    countDownDate.setHours(0, 0, 0, 0);
    
    // Set to next year if birthday has passed
    if (countDownDate < new Date()) {
        countDownDate.setFullYear(countDownDate.getFullYear() + 1);
    }
    
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        // Handle countdown completion
        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = 
                "<div style='color:var(--secondary-purple);'>HAPPY BIRTHDAY!</div>";
        }
    }, 1000);
}

// Music Player
const songs = [
    {
        title: "Blue Hair - TV Girl",
        src: "TV Girl - Blue Hair (Lyrics).mp3"
    },
    {
        title: "See You Again - Tyler, The Creator, Kali Uchis",
        src: "SEE YOU AGAIN featuring Kali Uchis.mp3"
    },
    {
        title: "Can't Help Falling In Love - Elvis Presley",
        src: "Elvis Presley - Can't Help Falling in Love (Lyrics).mp3"
    },
    {
        title: "Mind Over Matter - Young The Giant",
        src: "Young the Giant： Mind Over Matter [OFFICIAL VIDEO].mp3"
    },
    {
        title: "I Love You So - The Walters",
        src: "The Walters -- I Love You So.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audioPlayer');

function renderSongList() {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    
    songs.forEach((song, i) => {
        const item = document.createElement('div');
        item.className = `song-item ${i === currentSongIndex ? 'active' : ''}`;
        item.innerHTML = `<i class="fas fa-music"></i> ${song.title}`;
        item.addEventListener('click', () => playSong(i));
        songList.appendChild(item);
    });
}

function playSong(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[index].src;
    audioPlayer.play()
        .then(() => {
            isPlaying = true;
            updatePlayerUI();
            renderSongList();
        })
        .catch(error => {
            console.error("Error playing song:", error);
        });
}

function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        if (audioPlayer.src) {
            audioPlayer.play().then(() => {
                isPlaying = true;
                updatePlayerUI();
            });
        } else {
            playSong(0);
        }
    }
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayerUI();
}

function updatePlayerUI() {
    const icon = document.getElementById('playPauseIcon');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    
    if (isPlaying) {
        document.getElementById('nowPlaying').textContent = 
            `Now Playing: ${songs[currentSongIndex].title}`;
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function seekSong(e) {
    const progressContainer = e.currentTarget;
    const seekPosition = e.offsetX / progressContainer.offsetWidth;
    audioPlayer.currentTime = seekPosition * audioPlayer.duration;
}

// Audio player event listeners
function setupAudioPlayer() {
    audioPlayer.addEventListener('timeupdate', () => {
        const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        document.getElementById('progressBar').style.width = `${progressPercent}%`;
        document.getElementById('currentTime').textContent = formatTime(audioPlayer.currentTime);
        
        if (!isNaN(audioPlayer.duration)) {
            document.getElementById('duration').textContent = formatTime(audioPlayer.duration);
        }
    });
    
    audioPlayer.addEventListener('ended', nextSong);
    audioPlayer.addEventListener('error', (e) => {
        console.error("Audio error:", e);
    });
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Surprise Functionality
function showSurprise() {
    document.getElementById('surpriseHint').classList.remove('hidden');
    createHeart({
        clientX: window.innerWidth / 2,
        clientY: window.innerHeight / 2
    });
    
    // Play a surprise sound
    const surpriseSound = new Audio('magic-chime.mp3');
    surpriseSound.volume = 0.5;
    surpriseSound.play();
}

// Initialize the site
function initializeSite() {
    // Hide all pages except about
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById('about').classList.remove('hidden');
    
    // Hide content until password is entered
    document.getElementById('siteContent').classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Initialize other features
    renderSongList();
    setupAudioPlayer();
    setupEventListeners();
    
    // Focus on password input
    document.getElementById('passwordInput').focus();
}

// Mobile Navigation Setup
function setupMobileNavigation() {
    const desktopNavItems = document.querySelectorAll('.nav-btn:not(.mobile-nav-toggle)');
    const mobileNavContainer = document.getElementById('mobileNavContainer');
    mobileNavContainer.innerHTML = '';
    
    desktopNavItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.addEventListener('click', () => {
            showPage(clone.getAttribute('onclick').split("'")[1]);
            mobileNavContainer.classList.remove('show');
        });
        mobileNavContainer.appendChild(clone);
    });
}

// Start everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSite);
// ========================================
// HoN Reborn - Main JavaScript
// ========================================

// ========================================
// 1. Seasonal Effect System
// ========================================
(function() {
    const month = new Date().getMonth(); // 0-11
    let season;
    
    // Determine season based on month
    if (month >= 2 && month <= 4) {
        season = 'spring'; // Mar-May: Sakura
    } else if (month >= 5 && month <= 7) {
        season = 'summer'; // Jun-Aug: Fireflies
    } else if (month >= 8 && month <= 10) {
        season = 'autumn'; // Sep-Nov: Falling Leaves
    } else {
        season = 'winter'; // Dec-Feb: Snow
    }
    
    // Apply season class to body
    document.body.classList.add('season-' + season);
    
    // Create particles
    const container = document.getElementById('particles');
    if (container) {
        const particleCount = season === 'summer' ? 20 : 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            
            const baseDuration = season === 'winter' ? 8 : 
                                season === 'spring' ? 10 : 
                                season === 'summer' ? 4 : 12;
            particle.style.animationDuration = (baseDuration + Math.random() * 5) + 's';

            if (season === 'winter') {
                const size = 3 + Math.random() * 5;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
            } else if (season === 'summer') {
                const size = 3 + Math.random() * 3;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
            }

            container.appendChild(particle);
        }
    }
    
    console.log('🎨 Current Season:', season);
})();

// ========================================
// 2. Gallery Functions
// ========================================
const gallery = document.getElementById('gallery');
let autoScrollInterval;
let scrollDirection = 1;

function scrollGallery(direction) {
    const scrollAmount = 340;
    if (gallery) {
        gallery.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
}

function startAutoScroll() {
    if (!gallery) return;
    autoScrollInterval = setInterval(() => {
        const maxScroll = gallery.scrollWidth - gallery.clientWidth;
        
        if (gallery.scrollLeft >= maxScroll - 10) {
            scrollDirection = -1;
        } else if (gallery.scrollLeft <= 10) {
            scrollDirection = 1;
        }
        
        gallery.scrollBy({ left: scrollDirection * 2, behavior: 'auto' });
    }, 30);
}

function stopAutoScroll() {
    clearInterval(autoScrollInterval);
}

// Start auto-scroll on page load
startAutoScroll();

// Pause on hover
if (gallery) {
    gallery.addEventListener('mouseenter', stopAutoScroll);
    gallery.addEventListener('mouseleave', startAutoScroll);
}

// ========================================
// 3. Loading Screen
// ========================================
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }, 800);
});

// ========================================
// 4. Back to Top Button
// ========================================
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================================
// 5. View Toggle
// ========================================
const scrollViewBtn = document.getElementById('scrollView');
const gridViewBtn = document.getElementById('gridView');
const galleryWrapper = document.getElementById('gallery');

if (scrollViewBtn && gridViewBtn && galleryWrapper) {
    scrollViewBtn.addEventListener('click', function() {
        scrollViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        galleryWrapper.classList.remove('grid-view');
        startAutoScroll();
    });

    gridViewBtn.addEventListener('click', function() {
        gridViewBtn.classList.add('active');
        scrollViewBtn.classList.remove('active');
        galleryWrapper.classList.add('grid-view');
        stopAutoScroll();
    });
}

// ========================================
// 6. FAQ Toggle
// ========================================
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// ========================================
// 7. Video Modal
// ========================================
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalClose = document.getElementById('modalClose');
const galleryItems = document.querySelectorAll('.gallery-item');

// Add click event to gallery items for modal
galleryItems.forEach(item => {
    const link = item.querySelector('.gallery-item-link');
    if (link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.href;
            const videoId = videoUrl.split('/').pop();
            if (modalVideo) {
                modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
            if (modal) {
                modal.classList.add('active');
            }
        });
    }
});

if (modalClose) {
    modalClose.addEventListener('click', function() {
        if (modal) modal.classList.remove('active');
        if (modalVideo) modalVideo.src = '';
    });
}

if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            if (modalVideo) modalVideo.src = '';
        }
    });
}

// Tutorial Video Function
function openTutorialVideo() {
    if (modalVideo) {
        modalVideo.src = 'https://www.youtube.com/embed/PwcwkUWqvR4?autoplay=1';
    }
    if (modal) {
        modal.classList.add('active');
    }
}

// ========================================
// 8. Progress Bar
// ========================================
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// ========================================
// 9. Fade In on Scroll
// ========================================
const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => {
    fadeInObserver.observe(el);
});

// ========================================
// 10. Cookie Consent
// ========================================
const cookieConsent = document.getElementById('cookieConsent');
const acceptCookieBtn = document.getElementById('acceptCookie');

if (!localStorage.getItem('cookieAccepted') && cookieConsent) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

if (acceptCookieBtn) {
    acceptCookieBtn.addEventListener('click', function() {
        localStorage.setItem('cookieAccepted', 'true');
        if (cookieConsent) cookieConsent.classList.remove('show');
    });
}

// ========================================
// 11. Language Switcher
// ========================================
let currentLang = localStorage.getItem('language') || 'th';
const langTH = document.getElementById('langTH');
const langEN = document.getElementById('langEN');

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    
    if (langTH) langTH.classList.toggle('active', lang === 'th');
    if (langEN) langEN.classList.toggle('active', lang === 'en');

    const t = translations[lang];

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.metaDesc) {
        metaDesc.setAttribute('content', t.metaDesc);
    }

    // Update cookie consent
    const cookieTextEl = document.querySelector('.cookie-text');
    if (cookieTextEl) {
        cookieTextEl.innerHTML = '<svg style="width:20px;height:20px;vertical-align:middle;margin-right:8px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#d4a373"/><circle cx="8" cy="10" r="1.5" fill="#5c4033"/><circle cx="14" cy="8" r="1.5" fill="#5c4033"/><circle cx="16" cy="13" r="1.5" fill="#5c4033"/><circle cx="10" cy="14" r="1.5" fill="#5c4033"/></svg> ' + t.cookieText;
    }
    
    if (acceptCookieBtn) {
        acceptCookieBtn.textContent = t.acceptBtn;
    }
}

// Initialize language
if (currentLang === 'en') {
    setLanguage('en');
}

if (langTH) langTH.addEventListener('click', () => setLanguage('th'));
if (langEN) langEN.addEventListener('click', () => setLanguage('en'));

// ========================================
// 12. Notification Bell
// ========================================
const notifBell = document.getElementById('notifBell');
const notifBadge = document.querySelector('.notif-badge');
const notifDropdown = document.getElementById('notifDropdown');

// Sample notifications
const notifications = [
    { text: 'Mod ใหม่! Guts Avatar', time: '2 ชั่วโมงที่แล้ว' },
    { text: 'อัปเดต Melusine Skin', time: '1 วันที่แล้ว' },
    { text: 'เข้าร่วม Discord เพื่อรับ Mod พิเศษ', time: '3 วันที่แล้ว' }
];

// Populate notifications
if (notifDropdown) {
    notifications.forEach(notif => {
        const item = document.createElement('div');
        item.className = 'notif-item';
        item.innerHTML = `<div>${notif.text}</div><small style="color:#888">${notif.time}</small>`;
        notifDropdown.appendChild(item);
    });
}

if (notifBell) {
    notifBell.addEventListener('click', function(e) {
        e.stopPropagation();
        if (notifDropdown) notifDropdown.classList.toggle('show');
        if (notifBadge) notifBadge.style.display = 'none';
        localStorage.setItem('notifRead', 'true');
    });
}

document.addEventListener('click', function() {
    if (notifDropdown) notifDropdown.classList.remove('show');
});

// Check if notifications were read
if (localStorage.getItem('notifRead') && notifBadge) {
    notifBadge.style.display = 'none';
}

// ========================================
// 13. Mobile Menu
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        if (mobileMenu) mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', function() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
}

document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', function() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ========================================
// 14. Copy Link Button
// ========================================
function copyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(function() {
        const btn = document.getElementById('copyLinkBtn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>คัดลอกแล้ว!';
            btn.style.background = 'var(--success)';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        }
    });
}

// ========================================
// 15. Swipe Gesture for Gallery
// ========================================
let touchStartX = 0;
let touchEndX = 0;

if (gallery) {
    gallery.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gallery.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            scrollGallery(1);
        } else {
            scrollGallery(-1);
        }
    }
}

// ========================================
// 16. Parallax Effect
// ========================================
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ========================================
// 17. Video Lazy Loading
// ========================================
const videoObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target;
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
            }
            videoObserver.unobserve(iframe);
        }
    });
}, { rootMargin: '100px' });

document.querySelectorAll('.gallery-item iframe').forEach(iframe => {
    videoObserver.observe(iframe);
});

// ========================================
// 18. Keyboard Shortcuts
// ========================================
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            if (modalVideo) modalVideo.src = '';
        }
        if (mobileMenu && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
});

// ========================================
// 19. Discord Login System
// ========================================

// ⚠️ เปลี่ยน URL นี้เป็น Vercel URL ของคุณ
const AUTH_API_URL = 'https://your-app.vercel.app';

function loginWithDiscord() {
    window.location.href = AUTH_API_URL + '/api/auth/discord';
}

function logout() {
    window.location.href = AUTH_API_URL + '/api/auth/logout';
}

async function checkLoginStatus() {
    try {
        const response = await fetch(AUTH_API_URL + '/api/auth/user', {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (data.loggedIn && data.user) {
            showUserProfile(data.user);
        } else {
            showLoginButton();
        }
    } catch (error) {
        console.log('Auth API not available');
        showLoginButton();
    }
}

function showUserProfile(user) {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    const memberBadge = document.getElementById('memberBadge');
    
    if (loginBtn) loginBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (userAvatar) userAvatar.src = user.avatar;
    if (userName) userName.textContent = user.displayName;
    if (memberBadge) memberBadge.style.display = user.isMember ? 'inline' : 'none';
    
    window.currentUser = user;
    
    if (user.isMember) {
        document.querySelectorAll('.member-only').forEach(el => {
            el.style.display = 'block';
        });
    }
}

function showLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userProfile) userProfile.style.display = 'none';
    
    window.currentUser = null;
}

function checkAuthParams() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('login') === 'success') {
        showAuthNotification('🎉 Login สำเร็จ! ยินดีต้อนรับ', 'success');
        window.history.replaceState({}, document.title, window.location.pathname);
        checkLoginStatus();
    } else if (params.get('login') === 'failed') {
        showAuthNotification('❌ Login ไม่สำเร็จ กรุณาลองใหม่', 'error');
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('logout') === 'success') {
        showAuthNotification('👋 Logout สำเร็จ', 'info');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

function showAuthNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = 'auth-notification';
    notif.innerHTML = message;
    notif.style.background = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6';
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Initialize Discord Auth
checkAuthParams();
checkLoginStatus();

// ========================================
// 15. Glassmorphism Navbar on Scroll
// ========================================
const glassNavbar = document.getElementById('glassNavbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (!glassNavbar) return;
    
    const currentScrollY = window.scrollY;
    
    // Show navbar after scrolling down 300px
    if (currentScrollY > 300) {
        glassNavbar.classList.add('visible');
        document.body.classList.add('has-navbar');
    } else {
        glassNavbar.classList.remove('visible');
        document.body.classList.remove('has-navbar');
    }
    
    lastScrollY = currentScrollY;
});

// Navbar link active state
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current || 
            (current === '' && link.getAttribute('data-section') === 'home')) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 16. Theme Color Picker
// ========================================
const themeToggle = document.getElementById('themeToggle');
const themePicker = document.getElementById('themePicker');
const themePickerClose = document.getElementById('themePickerClose');
const themeColors = document.querySelectorAll('.theme-color');

// Load saved theme
const savedTheme = localStorage.getItem('theme-color') || 'purple';
document.documentElement.setAttribute('data-theme', savedTheme);
themeColors.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
});

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        themePicker?.classList.toggle('show');
    });
}

if (themePickerClose) {
    themePickerClose.addEventListener('click', () => {
        themePicker?.classList.remove('show');
    });
}

themeColors.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme-color', theme);
        
        themeColors.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Close picker after selection
        setTimeout(() => themePicker?.classList.remove('show'), 300);
    });
});

// Close picker when clicking outside
document.addEventListener('click', (e) => {
    if (themePicker && !themePicker.contains(e.target) && !themeToggle?.contains(e.target)) {
        themePicker.classList.remove('show');
    }
});

// ========================================
// 17. Cursor Trail Effect
// ========================================
const cursorTrail = document.getElementById('cursorTrail');
let trailEnabled = true;

// Disable on mobile
if ('ontouchstart' in window) {
    trailEnabled = false;
}

if (cursorTrail && trailEnabled) {
    document.addEventListener('mousemove', (e) => {
        // Throttle the effect
        if (Math.random() > 0.7) return;
        
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        cursorTrail.appendChild(dot);
        
        // Remove dot after animation
        setTimeout(() => dot.remove(), 500);
    });
}

// ========================================
// 18. 3D Tilt Card Effect
// ========================================
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ========================================
// 19. Animated Counter
// ========================================
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const format = counter.getAttribute('data-format');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            let displayValue = Math.floor(current);
            if (format === 'k' && displayValue >= 1000) {
                displayValue = (displayValue / 1000).toFixed(1) + 'K';
            }
            counter.textContent = displayValue + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            let displayValue = target;
            if (format === 'k' && displayValue >= 1000) {
                displayValue = (displayValue / 1000).toFixed(0) + 'K';
            }
            counter.textContent = displayValue + suffix;
        }
    };
    
    updateCounter();
};

// Observe counters for animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// ========================================
// 20. Floating Quick Menu
// ========================================
const floatingMenu = document.getElementById('floatingMenu');
const floatingMenuToggle = document.getElementById('floatingMenuToggle');

if (floatingMenuToggle && floatingMenu) {
    floatingMenuToggle.addEventListener('click', () => {
        floatingMenu.classList.toggle('open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!floatingMenu.contains(e.target)) {
            floatingMenu.classList.remove('open');
        }
    });
}

// ========================================
// 21. Smooth Scroll for Nav Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const navbarHeight = glassNavbar?.classList.contains('visible') ? 70 : 0;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 22. Ripple Effect on Buttons
// ========================================
document.querySelectorAll('.btn, .floating-menu-item, .theme-color').forEach(btn => {
    btn.classList.add('ripple');
});

// ========================================
// 23. Dark/Light Mode Toggle
// ========================================
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

// Check for saved preference or default to dark
const savedMode = localStorage.getItem('colorMode') || 'dark';
htmlElement.setAttribute('data-mode', savedMode);

function toggleDarkMode() {
    const currentMode = htmlElement.getAttribute('data-mode');
    const newMode = currentMode === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-mode', newMode);
    localStorage.setItem('colorMode', newMode);
    
    // Update toggle icon
    if (darkModeToggle) {
        const sunIcon = darkModeToggle.querySelector('.sun-icon');
        const moonIcon = darkModeToggle.querySelector('.moon-icon');
        if (sunIcon && moonIcon) {
            sunIcon.style.display = newMode === 'dark' ? 'block' : 'none';
            moonIcon.style.display = newMode === 'dark' ? 'none' : 'block';
        }
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

// ========================================
// 24. Announcement Banner
// ========================================
const announcementBanner = document.getElementById('announcementBanner');
const announcementClose = document.querySelector('.announcement-close');

// Initialize announcement state
function initAnnouncement() {
    if (announcementBanner) {
        if (sessionStorage.getItem('announcementClosed') === 'true') {
            announcementBanner.classList.add('hidden');
            document.body.classList.add('announcement-hidden');
        } else {
            document.body.classList.add('has-announcement');
        }
    }
}

function closeAnnouncement() {
    if (announcementBanner) {
        announcementBanner.classList.add('hidden');
        document.body.classList.add('announcement-hidden');
        sessionStorage.setItem('announcementClosed', 'true');
    }
}

// Initialize on load
initAnnouncement();

if (announcementClose) {
    announcementClose.addEventListener('click', closeAnnouncement);
}

// ========================================
// 25. Search & Filter Gallery
// ========================================
const searchInput = document.getElementById('modSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const modCards = document.querySelectorAll('.mod-card');

let currentFilter = 'all';
let currentSearch = '';

function filterGallery() {
    modCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || 'all';
        const cardName = card.getAttribute('data-name')?.toLowerCase() || '';
        const cardHero = card.getAttribute('data-hero')?.toLowerCase() || '';
        
        const matchesFilter = currentFilter === 'all' || cardCategory === currentFilter;
        const matchesSearch = currentSearch === '' || 
            cardName.includes(currentSearch) || 
            cardHero.includes(currentSearch);
        
        if (matchesFilter && matchesSearch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        filterGallery();
    });
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        filterGallery();
    });
});

// ========================================
// 26. Random Mod Showcase
// ========================================
function showRandomMod() {
    const visibleCards = Array.from(modCards).filter(card => !card.classList.contains('hidden'));
    if (visibleCards.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * visibleCards.length);
    const randomCard = visibleCards[randomIndex];
    
    // Scroll to the random card
    randomCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Highlight effect
    randomCard.style.transform = 'scale(1.05)';
    randomCard.style.boxShadow = '0 0 40px var(--primary-glow)';
    
    setTimeout(() => {
        randomCard.style.transform = '';
        randomCard.style.boxShadow = '';
    }, 2000);
}

// ========================================
// 27. Image Lightbox
// ========================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
let lightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(imgSrc, caption, index) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxCaption) lightboxCaption.textContent = caption || '';
        currentLightboxIndex = index || 0;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateLightbox(direction) {
    if (lightboxImages.length === 0) return;
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
    if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;
    
    const img = lightboxImages[currentLightboxIndex];
    if (lightboxImg) lightboxImg.src = img.src;
    if (lightboxCaption) lightboxCaption.textContent = img.caption || '';
}

// Initialize lightbox for mod card images
modCards.forEach((card, index) => {
    const img = card.querySelector('img');
    if (img) {
        lightboxImages.push({ src: img.src, caption: card.getAttribute('data-name') });
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(img.src, card.getAttribute('data-name'), index);
        });
    }
});

// Close on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ========================================
// 28. Modal System (Request, Changelog, Hero Browser)
// ========================================
const modRequestModal = document.getElementById('modRequestModal');
const changelogModal = document.getElementById('changelogModal');
const heroBrowserModal = document.getElementById('heroBrowserModal');

function openModRequest() {
    if (modRequestModal) {
        modRequestModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModRequest() {
    if (modRequestModal) {
        modRequestModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openChangelog() {
    if (changelogModal) {
        changelogModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeChangelog() {
    if (changelogModal) {
        changelogModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openHeroBrowser() {
    if (heroBrowserModal) {
        heroBrowserModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadHeroes();
    }
}

function closeHeroBrowser() {
    if (heroBrowserModal) {
        heroBrowserModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modals on background click
[modRequestModal, changelogModal, heroBrowserModal].forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ========================================
// 29. Mod Request Form Handler
// ========================================
const modRequestForm = document.getElementById('modRequestForm');

if (modRequestForm) {
    modRequestForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(modRequestForm);
        const data = {
            heroName: formData.get('heroName'),
            modType: formData.get('modType'),
            description: formData.get('description'),
            reference: formData.get('reference'),
            discordUsername: formData.get('discordUsername')
        };
        
        // Here you would send to your backend/Discord webhook
        console.log('Mod Request:', data);
        
        // Show success message
        alert('🎉 ส่งคำขอเรียบร้อยแล้ว! เราจะพิจารณาและตอบกลับในเร็วๆ นี้');
        modRequestForm.reset();
        closeModRequest();
    });
}

// ========================================
// 30. Hero Browser (HoN Heroes)
// ========================================
const heroGrid = document.getElementById('heroGrid');
const heroSearch = document.getElementById('heroSearch');

// Sample HoN heroes data
const honHeroes = [
    { name: 'Chronos', icon: 'https://www.heroesofnewerth.com/images/heroes/110/icon_128.jpg' },
    { name: 'Deadwood', icon: 'https://www.heroesofnewerth.com/images/heroes/145/icon_128.jpg' },
    { name: 'Devourer', icon: 'https://www.heroesofnewerth.com/images/heroes/103/icon_128.jpg' },
    { name: 'Gladiator', icon: 'https://www.heroesofnewerth.com/images/heroes/143/icon_128.jpg' },
    { name: 'Hammerstorm', icon: 'https://www.heroesofnewerth.com/images/heroes/102/icon_128.jpg' },
    { name: 'Madman', icon: 'https://www.heroesofnewerth.com/images/heroes/141/icon_128.jpg' },
    { name: 'Moon Queen', icon: 'https://www.heroesofnewerth.com/images/heroes/107/icon_128.jpg' },
    { name: 'Pebbles', icon: 'https://www.heroesofnewerth.com/images/heroes/101/icon_128.jpg' },
    { name: 'Predator', icon: 'https://www.heroesofnewerth.com/images/heroes/146/icon_128.jpg' },
    { name: 'Pyromancer', icon: 'https://www.heroesofnewerth.com/images/heroes/109/icon_128.jpg' },
    { name: 'Scout', icon: 'https://www.heroesofnewerth.com/images/heroes/147/icon_128.jpg' },
    { name: 'Swiftblade', icon: 'https://www.heroesofnewerth.com/images/heroes/104/icon_128.jpg' },
    { name: 'Thunderbringer', icon: 'https://www.heroesofnewerth.com/images/heroes/108/icon_128.jpg' },
    { name: 'Valkyrie', icon: 'https://www.heroesofnewerth.com/images/heroes/142/icon_128.jpg' },
    { name: 'War Beast', icon: 'https://www.heroesofnewerth.com/images/heroes/105/icon_128.jpg' },
    { name: 'Wildsoul', icon: 'https://www.heroesofnewerth.com/images/heroes/144/icon_128.jpg' }
];

// Check which heroes have mods
function getHeroesWithMods() {
    const heroNames = [];
    modCards.forEach(card => {
        const hero = card.getAttribute('data-hero');
        if (hero) heroNames.push(hero.toLowerCase());
    });
    return heroNames;
}

function loadHeroes(searchTerm = '') {
    if (!heroGrid) return;
    
    const heroesWithMods = getHeroesWithMods();
    heroGrid.innerHTML = '';
    
    const filteredHeroes = honHeroes.filter(hero => 
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    filteredHeroes.forEach(hero => {
        const hasMod = heroesWithMods.includes(hero.name.toLowerCase());
        const heroItem = document.createElement('div');
        heroItem.className = `hero-item ${hasMod ? 'has-mod' : ''}`;
        heroItem.innerHTML = `
            <img src="${hero.icon}" alt="${hero.name}" loading="lazy">
            <span class="hero-name">${hero.name}</span>
        `;
        heroItem.addEventListener('click', () => {
            if (hasMod) {
                // Filter gallery to show this hero's mods
                if (searchInput) {
                    searchInput.value = hero.name;
                    currentSearch = hero.name.toLowerCase();
                    filterGallery();
                }
                closeHeroBrowser();
                document.getElementById('gallery-section')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
        heroGrid.appendChild(heroItem);
    });
}

if (heroSearch) {
    heroSearch.addEventListener('input', (e) => {
        loadHeroes(e.target.value);
    });
}

// ========================================
// 31. Live Discord Member Count
// ========================================
async function updateDiscordCount() {
    try {
        // Discord Server ID for Kim22
        const response = await fetch('https://discord.com/api/v9/invites/q5KjPGT2Hv?with_counts=true');
        const data = await response.json();
        
        const countElement = document.querySelector('.discord-live-count .count-number');
        if (countElement && data.approximate_member_count) {
            countElement.textContent = data.approximate_member_count.toLocaleString();
        }
    } catch (error) {
        console.log('Could not fetch Discord member count');
    }
}

// Update on page load and every 5 minutes
updateDiscordCount();
setInterval(updateDiscordCount, 300000);

// ========================================
// 32. Image Lazy Loading with Intersection Observer
// ========================================
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('lazy-loaded');
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

lazyImages.forEach(img => {
    img.classList.add('lazy-loading');
    imageObserver.observe(img);
});

// ========================================
// 33. PWA Install Prompt
// ========================================
let deferredPrompt;
const installPrompt = document.querySelector('.install-pwa-prompt');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install prompt if not dismissed before
    if (localStorage.getItem('pwaPromptDismissed') !== 'true' && installPrompt) {
        setTimeout(() => {
            installPrompt.classList.add('show');
        }, 3000);
    }
});

function installPWA() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA installed');
            }
            deferredPrompt = null;
            if (installPrompt) installPrompt.classList.remove('show');
        });
    }
}

function dismissPWAPrompt() {
    if (installPrompt) {
        installPrompt.classList.remove('show');
        localStorage.setItem('pwaPromptDismissed', 'true');
    }
}

console.log('🚀 All advanced effects loaded!');

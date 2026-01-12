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

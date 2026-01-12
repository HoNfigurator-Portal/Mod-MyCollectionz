// ========================================
// Discord Login - Frontend Code
// เพิ่มโค้ดนี้ใน index.html ของคุณ
// ========================================

// ⚠️ เปลี่ยน URL นี้เป็น Railway URL ของคุณ
const AUTH_API_URL = 'https://your-app.up.railway.app';

// ========================================
// 1. HTML - เพิ่มปุ่ม Login ใน Header
// ========================================
/*
<!-- เพิ่มใน header หรือตำแหน่งที่ต้องการ -->
<div class="user-auth" id="userAuth">
    <!-- ยังไม่ Login -->
    <button class="btn-discord-login" id="loginBtn" onclick="loginWithDiscord()">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.069.069 0 0 0-.032.027C.533 9.048-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Login with Discord
    </button>
    
    <!-- หลัง Login -->
    <div class="user-profile" id="userProfile" style="display: none;">
        <img class="user-avatar" id="userAvatar" src="" alt="Avatar">
        <span class="user-name" id="userName"></span>
        <span class="member-badge" id="memberBadge" style="display: none;">✓ Member</span>
        <button class="btn-logout" onclick="logout()">Logout</button>
    </div>
</div>
*/

// ========================================
// 2. CSS - Styles สำหรับ Login
// ========================================
/*
.user-auth {
    position: fixed;
    top: 20px;
    right: 140px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 10px;
}

.btn-discord-login {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    background: #5865f2;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.btn-discord-login:hover {
    background: #4752c4;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(88, 101, 242, 0.4);
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 50px;
}

.user-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--primary);
}

.user-name {
    color: var(--text);
    font-weight: 500;
}

.member-badge {
    background: linear-gradient(135deg, #22c55e, #16a34a);
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 600;
}

.btn-logout {
    padding: 6px 12px;
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border);
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
}

.btn-logout:hover {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
}

@media (max-width: 768px) {
    .user-auth {
        right: 70px;
        top: 15px;
    }
    
    .btn-discord-login span {
        display: none;
    }
    
    .user-name {
        display: none;
    }
}
*/

// ========================================
// 3. JavaScript - Login Functions
// ========================================

// Login with Discord
function loginWithDiscord() {
    window.location.href = AUTH_API_URL + '/auth/discord';
}

// Logout
function logout() {
    window.location.href = AUTH_API_URL + '/auth/logout';
}

// Check Login Status
async function checkLoginStatus() {
    try {
        const response = await fetch(AUTH_API_URL + '/auth/user', {
            credentials: 'include'
        });
        const data = await response.json();
        
        if (data.loggedIn && data.user) {
            showUserProfile(data.user);
        } else {
            showLoginButton();
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        showLoginButton();
    }
}

// Show User Profile
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
    
    // เก็บ user data ไว้ใช้
    window.currentUser = user;
    
    // ถ้าเป็น member ให้แสดง content พิเศษ
    if (user.isMember) {
        showMemberContent();
    }
}

// Show Login Button
function showLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const userProfile = document.getElementById('userProfile');
    
    if (loginBtn) loginBtn.style.display = 'flex';
    if (userProfile) userProfile.style.display = 'none';
    
    window.currentUser = null;
}

// Show Member-Only Content
function showMemberContent() {
    const memberContent = document.querySelectorAll('.member-only');
    memberContent.forEach(el => {
        el.style.display = 'block';
    });
}

// Hide Member-Only Content
function hideMemberContent() {
    const memberContent = document.querySelectorAll('.member-only');
    memberContent.forEach(el => {
        el.style.display = 'none';
    });
}

// Check URL params for login status
function checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('login') === 'success') {
        // แสดง notification
        showNotification('🎉 Login สำเร็จ! ยินดีต้อนรับ', 'success');
        // ลบ params ออกจาก URL
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('login') === 'failed') {
        showNotification('❌ Login ไม่สำเร็จ กรุณาลองใหม่', 'error');
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('logout') === 'success') {
        showNotification('👋 Logout สำเร็จ', 'info');
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Show Notification
function showNotification(message, type = 'info') {
    const notif = document.createElement('div');
    notif.className = `auth-notification ${type}`;
    notif.innerHTML = message;
    notif.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkURLParams();
    checkLoginStatus();
});

// ========================================
// 4. Member-Only Content Example
// ========================================
/*
<!-- เพิ่ม class "member-only" ให้กับ content ที่ต้อง login -->
<div class="member-only" style="display: none;">
    <h3>🎁 Mod พิเศษสำหรับสมาชิก</h3>
    <a href="..." class="btn">ดาวน์โหลด VIP Mod</a>
</div>
*/

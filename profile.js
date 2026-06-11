// ========== PROFILE MODULE WITH BEAUTIFUL CARD DESIGN ==========

function openProfileView() {
    const profileView = document.getElementById('profile-view');
    if (!profileView) return;
    
    const userId = localStorage.getItem('currentUserId');
    const isLoggedIn = userId && userId !== 'guest' && userId !== 'null' && userId !== 'undefined';
    const userName = localStorage.getItem('userDisplayName');
    const hasValidUser = isLoggedIn && userName && userName !== 'Student';
    
    if (hasValidUser) {
        renderProfileContent(profileView);
    } else {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('userDisplayName');
        localStorage.removeItem('userClass');
        localStorage.removeItem('userBoard');
        
        if (typeof AppState !== 'undefined') {
            AppState.currentUserId = 'guest';
        }
        
        renderLoginForm(profileView);
    }
}

function renderLoginForm(profileView) {
    profileView.innerHTML = `
        <div id="profile-setup-view" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
            <div class="card">
                <h4 class="title">Welcome!</h4>
                <form id="google-signin-form">
                    <div class="field">
                        <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
                        </svg>
                        <input autocomplete="off" id="logemail" placeholder="Email" class="input-field" name="logemail" type="email">
                    </div>
                    <div class="field">
                        <svg class="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                            <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
                        </svg>
                        <input autocomplete="off" id="logpass" placeholder="Password" class="input-field" name="logpass" type="password">
                    </div>
                    <button class="btn" type="submit">Login</button>
                    <a href="#" class="btn-link" id="google-signin-link">Continue with Google</a>
                </form>
            </div>
        </div>
    `;
    
    setupLoginListeners();
}

function renderProfileContent(profileView) {
    const userName = localStorage.getItem('userDisplayName') || 'Student';
    const savedAvatar = localStorage.getItem('userAvatar');
    const userClass = localStorage.getItem('userClass') || (AppState.selectedClass ? `Class ${AppState.selectedClass}` : 'Class 10');
    const userBoard = localStorage.getItem('userBoard') || (AppState.selectedBoard || 'CBSE Board');
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    
    profileView.innerHTML = `
        <div id="profile-content-view" style="display: flex; justify-content: center; align-items: flex-start; min-height: auto; padding: 16px 16px 100px 16px;">
            <div class="profile-card">
                <div class="card__img">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%">
                        <rect fill="#ffffff" width="540" height="450"></rect>
                        <defs>
                            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                                <stop offset="0" stop-color="#DC2626"></stop>
                                <stop offset="1" stop-color="#DC2626"></stop>
                            </linearGradient>
                            <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                                <g fill-opacity="0.2">
                                    <polygon fill="#000000" points="90 150 0 300 180 300"></polygon>
                                    <polygon points="90 150 180 0 0 0"></polygon>
                                    <polygon fill="#000000" points="270 150 360 0 180 0"></polygon>
                                    <polygon fill="#000000" points="450 150 360 300 540 300"></polygon>
                                    <polygon fill="#000000" points="450 150 540 0 360 0"></polygon>
                                    <polygon points="630 150 540 300 720 300"></polygon>
                                    <polygon fill="#000000" points="630 150 720 0 540 0"></polygon>
                                    <polygon fill="#000000" points="810 150 720 300 900 300"></polygon>
                                    <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
                                    <polygon fill="#000000" points="990 150 900 300 1080 300"></polygon>
                                    <polygon fill="#000000" points="990 150 1080 0 900 0"></polygon>
                                    <polygon fill="#000000" points="90 450 0 600 180 600"></polygon>
                                    <polygon points="90 450 180 300 0 300"></polygon>
                                    <polygon fill="#000000" points="270 450 180 600 360 600"></polygon>
                                    <polygon fill="#000000" points="270 450 360 300 180 300"></polygon>
                                    <polygon fill="#000000" points="450 450 360 600 540 600"></polygon>
                                    <polygon fill="#000000" points="450 450 540 300 360 300"></polygon>
                                    <polygon fill="#000000" points="630 450 540 600 720 600"></polygon>
                                    <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
                                    <polygon points="810 450 720 600 900 600"></polygon>
                                    <polygon fill="#000000" points="810 450 900 300 720 300"></polygon>
                                    <polygon fill="#000000" points="990 450 900 600 1080 600"></polygon>
                                    <polygon fill="#000000" points="990 450 1080 300 900 300"></polygon>
                                </g>
                            </pattern>
                        </defs>
                        <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
                        <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
                    </svg>
                </div>
                <div class="card__avatar" id="profile-avatar-container">
                    ${savedAvatar ? `<img src="${savedAvatar}" style="width: 78px; height: 78px; border-radius: 50%; object-fit: cover;">` : `
                        <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="64" cy="64" fill="#DC2626" r="60"></circle>
                            <circle cx="64" cy="64" fill="#DC2626" opacity=".4" r="48"></circle>
                            <path d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z" fill="#7f3838"></path>
                            <path d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z" fill="#000000" opacity=".4"></path>
                            <circle cx="89" cy="65" fill="#fbc0aa" r="7"></circle>
                            <path d="m64 124a59.67 59.67 0 0 0 34.69-11.06l-3.32-9.3a10 10 0 0 0 -9.37-6.64h-43.95a10 10 0 0 0 -9.42 6.64l-3.32 9.3a59.67 59.67 0 0 0 34.69 11.06z" fill="#DC2626"></path>
                            <path d="m45 110 5.55 2.92-2.55 8.92a60.14 60.14 0 0 0 9 1.74v-27.08l-12.38 10.25a2 2 0 0 0 .38 3.25z" fill="#DC2626" opacity=".3"></path>
                            <path d="m71 96.5v27.09a60.14 60.14 0 0 0 9-1.74l-2.54-8.93 5.54-2.92a2 2 0 0 0 .41-3.25z" fill="#DC2626" opacity=".3"></path>
                            <path d="m57 123.68a58.54 58.54 0 0 0 14 0v-25.68h-14z" fill="#fff"></path>
                            <path d="m64 88.75v9.75" fill="none" stroke="#fbc0aa" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"></path>
                            <circle cx="39" cy="65" fill="#fbc0aa" r="7"></circle>
                            <path d="m64 91a25 25 0 0 1 -25-25v-16.48a25 25 0 1 1 50 0v16.48a25 25 0 0 1 -25 25z" fill="#ffd8c9"></path>
                            <path d="m91.49 51.12v-4.72c0-14.95-11.71-27.61-26.66-28a27.51 27.51 0 0 0 -28.32 27.42v5.33a2 2 0 0 0 2 2h6.81a8 8 0 0 0 6.5-3.33l4.94-6.88a18.45 18.45 0 0 1 1.37 1.63 22.84 22.84 0 0 0 17.87 8.58h13.45a2 2 0 0 0 2.04-2.03z" fill="#bc5b57"></path>
                            <circle cx="76" cy="62.28" fill="#000000" r="3"></circle>
                            <circle cx="52" cy="62.28" fill="#000000" r="3"></circle>
                            <ellipse cx="50.42" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98"></ellipse>
                            <ellipse cx="77.58" cy="69.67" fill="#f85565" opacity=".1" rx="4.58" ry="2.98"></ellipse>
                            <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="m64 67v4" stroke="#fbc0aa" stroke-width="4"></path>
                                <path d="m55 56h-9.25" opacity=".2" stroke="#000000" stroke-width="2"></path>
                                <path d="m82 56h-9.25" opacity=".2" stroke="#000000" stroke-width="2"></path>
                            </g>
                            <path d="m64 84c5 0 7-3 7-3h-14s2 3 7 3z" fill="#f85565" opacity=".4"></path>
                            <path d="m65.07 78.93-.55.55a.73.73 0 0 1 -1 0l-.55-.55c-1.14-1.14-2.93-.93-4.27.47l-1.7 1.6h14l-1.66-1.6c-1.34-1.4-3.13-1.61-4.27-.47z" fill="#f85565"></path>
                        </svg>
                    `}
                    <button id="change-avatar-btn" class="avatar-edit-btn-small">
                        <i class="ph ph-camera" style="font-size: 12px;"></i>
                    </button>
                </div>
                <div class="card__title" id="profile-name-display">${escapeHtml(userName)}</div>
                <div class="card__subtitle" id="profile-meta-display">${escapeHtml(userClass)} • ${escapeHtml(userBoard)}</div>
                
                <!-- Stats Section -->
                <div class="profile-stats-row">
                    <div class="profile-stat">
                        <div class="profile-stat-value">12</div>
                        <div class="profile-stat-label">Tests</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">85%</div>
                        <div class="profile-stat-label">Avg Score</div>
                    </div>
                    <div class="profile-stat">
                        <div class="profile-stat-value">4</div>
                        <div class="profile-stat-label">Badges</div>
                    </div>
                </div>
                
                <div class="card__wrapper">
                    <button class="card__btn" id="edit-name-btn">
                        <i class="ph ph-pencil-simple"></i> EDIT NAME
                    </button>
                    <button class="card__btn card__btn-solid" id="logout-btn">
                        <i class="ph ph-sign-out"></i> LOGOUT
                    </button>
                </div>
                
                <!-- Notification Toggle -->
                <div class="notification-toggle-wrapper">
                    <span class="notification-label">Daily Reminders (7 PM)</span>
                    <label class="notification-switch">
                        <input type="checkbox" id="notification-toggle" ${notificationsEnabled ? 'checked' : ''}>
                        <span class="slider-round"></span>
                    </label>
                </div>
            </div>
        </div>
        
        <input type="file" id="avatar-file-input" accept="image/*" style="display: none;">
    `;
    
    setupProfileListeners();
    setupAvatarUpload();
    setupNotificationToggle();
}

function setupAvatarUpload() {
    const changeAvatarBtn = document.getElementById('change-avatar-btn');
    const avatarFileInput = document.getElementById('avatar-file-input');
    const avatarContainer = document.getElementById('profile-avatar-container');
    
    if (!changeAvatarBtn || !avatarFileInput) return;
    
    changeAvatarBtn.addEventListener('click', () => {
        avatarFileInput.click();
    });
    
    avatarFileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 2 * 1024 * 1024) {
            alert('Image too large! Please choose an image under 2MB.');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        
        avatarContainer.innerHTML = '<div style="width:78px; height:78px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:#000000;">⏳</div>';
        
        const userId = localStorage.getItem('currentUserId');
        if (!userId || userId === 'guest') {
            alert('Please login first to change profile picture.');
            avatarFileInput.value = '';
            renderProfileContent(document.getElementById('profile-view'));
            return;
        }
        
        if (typeof window.uploadAvatar === 'function') {
            const downloadURL = await window.uploadAvatar(file, userId);
            if (downloadURL) {
                avatarContainer.innerHTML = `
                    <img src="${downloadURL}" style="width: 78px; height: 78px; border-radius: 50%; object-fit: cover;">
                    <button id="change-avatar-btn" class="avatar-edit-btn-small">
                        <i class="ph ph-camera"></i>
                    </button>
                `;
                const headerAvatar = document.querySelector('.avatar');
                if (headerAvatar) {
                    headerAvatar.style.backgroundImage = `url(${downloadURL})`;
                    headerAvatar.style.backgroundSize = 'cover';
                    headerAvatar.style.backgroundPosition = 'center';
                    headerAvatar.textContent = '';
                }
                alert('Profile picture updated successfully!');
                setupAvatarUpload(); // Re-attach event listener
            } else {
                alert('Failed to upload image. Please try again.');
            }
        } else {
            alert('Upload function not available. Please refresh the page.');
        }
        
        avatarFileInput.value = '';
    });
}

function setupNotificationToggle() {
    const notificationToggle = document.getElementById('notification-toggle');
    if (notificationToggle && typeof toggleNotifications === 'function') {
        notificationToggle.addEventListener('change', (e) => {
            toggleNotifications(e.target.checked);
        });
    }
}

function setupLoginListeners() {
    const googleSigninLink = document.getElementById('google-signin-link');
    if (googleSigninLink) {
        const newLink = googleSigninLink.cloneNode(true);
        googleSigninLink.parentNode.replaceChild(newLink, googleSigninLink);
        
        newLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof window.signInWithGoogle === 'function') {
                window.signInWithGoogle();
            } else {
                window.location.href = 'google-signin.html';
            }
        });
    }
    
    const form = document.getElementById('google-signin-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof window.signInWithGoogle === 'function') {
                window.signInWithGoogle();
            } else {
                window.location.href = 'google-signin.html';
            }
        });
    }
}

function setupProfileListeners() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performLogout();
        });
    }
    
    const editNameBtn = document.getElementById('edit-name-btn');
    if (editNameBtn) {
        editNameBtn.addEventListener('click', () => startProfileNameEditing());
    }
}

async function performLogout() {
    try {
        if (typeof getAuth !== 'undefined') {
            const { getAuth, signOut } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
            const auth = getAuth();
            if (auth && auth.currentUser) {
                await signOut(auth);
            }
        }
    } catch(e) {
        console.warn('Firebase signOut error:', e);
    }
    
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('userDisplayName');
    localStorage.removeItem('userClass');
    localStorage.removeItem('userBoard');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('chapterProgressStateV1_guest');
    
    if (typeof AppState !== 'undefined') {
        AppState.currentUserId = 'guest';
        if (typeof loadProgressForCurrentUser === 'function') {
            loadProgressForCurrentUser();
        }
    }
    
    const displayNameElem = document.getElementById('display-name');
    if (displayNameElem) displayNameElem.innerHTML = '<i class="ph-fill ph-sparkle"></i>';
    
    const avatarElem = document.querySelector('.avatar');
    if (avatarElem) {
        avatarElem.style.backgroundImage = '';
        avatarElem.style.backgroundSize = '';
        avatarElem.textContent = 'A';
    }
    
    const tooltip = document.getElementById('profile-tooltip');
    if (tooltip) tooltip.classList.add('show');
    
    openProfileView();
}

function startProfileNameEditing() {
    const nameElem = document.getElementById('profile-name-display');
    if (!nameElem) return;
    
    const current = nameElem.innerText || 'Student';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = current;
    input.className = 'profile-name-edit-input';
    input.style.cssText = 'font-size:1rem; font-weight:500; background:#fff; border:2px solid #DC2626; border-radius:8px; color:#000; padding:4px 8px; outline:none; width:150px; text-align:center;';
    
    nameElem.style.display = 'none';
    nameElem.parentNode.insertBefore(input, nameElem);
    input.focus();
    input.select();
    
    const save = () => {
        const newName = input.value.trim() || 'Student';
        nameElem.innerText = newName;
        nameElem.style.display = 'block';
        input.remove();
        
        localStorage.setItem('userDisplayName', newName);
        
        const displayNameElem = document.getElementById('display-name');
        if (displayNameElem) displayNameElem.innerHTML = `${escapeHtml(newName)} <i class="ph-fill ph-sparkle"></i>`;
        
        input.removeEventListener('blur', save);
        input.removeEventListener('keydown', keyHandler);
    };
    
    const keyHandler = (e) => {
        if (e.key === 'Enter') save();
        else if (e.key === 'Escape') {
            nameElem.style.display = 'block';
            input.remove();
            input.removeEventListener('blur', save);
            input.removeEventListener('keydown', keyHandler);
        }
    };
    
    input.addEventListener('blur', save);
    input.addEventListener('keydown', keyHandler);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

window.addEventListener('google-signin-success', (ev) => {
    const user = ev.detail;
    if (!user) return;
    
    const name = user.displayName || 'Student';
    localStorage.setItem('userDisplayName', name);
    localStorage.setItem('currentUserId', user.uid);
    
    if (typeof AppState !== 'undefined') {
        if (AppState.selectedClass) {
            const cleanClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
            localStorage.setItem('userClass', `Class ${cleanClass}`);
        }
        if (AppState.selectedBoard) localStorage.setItem('userBoard', AppState.selectedBoard);
    }
    
    const displayNameElem = document.getElementById('display-name');
    if (displayNameElem) displayNameElem.innerHTML = `${escapeHtml(name)} <i class="ph-fill ph-sparkle"></i>`;
    
    const avatarElem = document.querySelector('.avatar');
    if (avatarElem) avatarElem.textContent = name.charAt(0).toUpperCase();
    
    if (typeof switchUser === 'function') {
        switchUser(user.uid);
    }
    
    openProfileView();
});

function updateProfileNameDisplay(name) {
    const el = document.getElementById('profile-name-display');
    if (el) el.innerText = name;
}

function updateProfileAvatarDisplay(char) {
    // Handled by avatar image
}

function updateProfileMetaDisplay(text) {
    const el = document.getElementById('profile-meta-display');
    if (el) el.innerHTML = text;
}

function showProfileContent() {
    openProfileView();
}
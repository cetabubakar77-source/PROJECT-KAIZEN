// ========== PROFILE MODULE ==========

function openProfileView() {
    const profileView = document.getElementById('profile-view');
    if (!profileView) return;
    
    profileView.innerHTML = `
        <div id="profile-setup-view" style="display: flex; justify-content: center; align-items: center; min-height: 60vh;">
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <p class="title"><i class="ph ph-google-logo"></i></p>
                        <p>Sign-up</p>
                    </div>
                    <div class="flip-card-back">
                        <button onclick="signInWithGoogle()"><i class="ph ph-google-logo"></i> Continue</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="profile-content-view" style="display: none;">
            <div class="profile-header"><h2>Profile</h2></div>
            <div class="profile-user-info">
                <div class="profile-avatar-large" id="profile-avatar-display">A</div>
                <div class="profile-name-wrapper">
                    <h3 id="profile-name-display">Student</h3>
                    <i class="ph ph-pencil-simple profile-edit-icon" id="profile-edit-icon" title="Edit profile name"></i>
                </div>
                <p id="profile-meta-display">Class 10 • Maharashtra</p>
            </div>
            <div class="profile-stats">
                <div class="stat-box"><h4>12</h4><p>Tests</p></div>
                <div class="stat-box"><h4>85%</h4><p>Avg Score</p></div>
                <div class="stat-box"><h4>4</h4><p>Badges</p></div>
            </div>
            <div class="profile-menu">
                <div class="menu-item" id="profile-google-login">
                    <div class="menu-icon-wrap" style="color: #2563eb; background: rgba(37, 99, 235, 0.12);"><i class="ph ph-google-logo"></i></div>
                    <span>Continue with Google</span>
                    <i class="ph ph-caret-right chevron"></i>
                </div>
                <div class="menu-item">
                    <div class="menu-icon-wrap" style="color: #3b82f6; background: rgba(59, 130, 246, 0.1);"><i class="ph ph-user"></i></div>
                    <span>Account Settings</span>
                    <i class="ph ph-caret-right chevron"></i>
                </div>
                <div class="menu-item">
                    <div class="menu-icon-wrap" style="color: #f59e0b; background: rgba(245, 158, 11, 0.1);"><i class="ph ph-bell"></i></div>
                    <span>Notifications</span>
                    <i class="ph ph-caret-right chevron"></i>
                </div>
                <div class="menu-item">
                    <div class="menu-icon-wrap" style="color: #10b981; background: rgba(16, 185, 129, 0.1);"><i class="ph ph-chart-line-up"></i></div>
                    <span>Learning Analytics</span>
                    <i class="ph ph-caret-right chevron"></i>
                </div>
                <div class="menu-item">
                    <div class="menu-icon-wrap" style="color: #a855f7; background: rgba(168, 85, 247, 0.1);"><i class="ph ph-gear"></i></div>
                    <span>App Settings</span>
                    <i class="ph ph-caret-right chevron"></i>
                </div>
                <div class="menu-item logout">
                    <div class="menu-icon-wrap" style="color: #ef4444; background: rgba(239, 68, 68, 0.1);"><i class="ph ph-sign-out"></i></div>
                    <span>Log Out</span>
                </div>
            </div>
        </div>
    `;
    
    // Setup profile event listeners
    setupProfileListeners();
}

function setupProfileListeners() {
    document.getElementById('profile-google-login')?.addEventListener('click', () => {
        window.location.href = 'google-signin.html';
    });
    
    document.querySelector('.menu-item.logout')?.addEventListener('click', () => {
        switchUser('guest');
        document.getElementById('profile-setup-view').style.display = 'flex';
        document.getElementById('profile-content-view').style.display = 'none';
        document.getElementById('display-name').innerHTML = '<i class="ph-fill ph-sparkle"></i>';
        document.getElementById('profile-name-display').innerText = 'Student';
        document.getElementById('profile-avatar-display').innerText = 'A';
        localStorage.removeItem('currentUserId');
        document.getElementById('profile-tooltip').classList.add('show');
    });
    
    document.getElementById('profile-edit-icon')?.addEventListener('click', () => startProfileNameEditing());
}

function startProfileNameEditing() {
    const nameElem = document.getElementById('profile-name-display');
    const wrapper = document.querySelector('.profile-name-wrapper');
    if (!nameElem || !wrapper) return;
    
    const current = nameElem.innerText || 'Student';
    const input = document.createElement('input');
    input.type = 'text'; input.value = current;
    input.className = 'profile-name-edit-input';
    input.style.cssText = 'font-size:24px; font-weight:600; background:transparent; border:2px solid #3b82f6; border-radius:8px; color:#fff; padding:4px 8px; outline:none; width:200px; margin-right:8px;';
    
    nameElem.style.display = 'none';
    wrapper.insertBefore(input, nameElem);
    input.focus(); input.select();
    
    const save = () => {
        const newName = input.value.trim() || 'Student';
        nameElem.innerText = newName;
        nameElem.style.display = 'block';
        input.remove();
        document.getElementById('display-name').innerHTML = `${newName} <i class="ph-fill ph-sparkle"></i>`;
        document.getElementById('profile-avatar-display').innerText = newName.charAt(0).toUpperCase();
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
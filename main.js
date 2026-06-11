// ========== CORE APP STATE & NAVIGATION ==========

// Global state
const AppState = {
    selectedState: '',
    selectedClass: '',
    selectedBoard: '',
    currentUserId: 'guest',
    chapterProgressState: {},
    continueLearningState: null,
    suppressChapterClickUntil: 0,
    youtubeApiReady: false,
    activeYouTubePlayers: [],
    playerProgressIntervals: []
};

const CHAPTER_PROGRESS_STORAGE_KEY_BASE = 'chapterProgressStateV1';
const CONTINUE_LEARNING_STORAGE_KEY_BASE = 'continueLearningStateV1';
const HOLD_TO_TICK_MS = 500;

// ========== CHECK FOR EXISTING ONBOARDING ==========
function checkExistingOnboarding() {
    const savedBoard = localStorage.getItem('userBoard');
    const savedClass = localStorage.getItem('userClass');
    const savedState = localStorage.getItem('userState');
    
    if (savedBoard && savedClass && savedState) {
        // Restore onboarding state
        AppState.selectedBoard = savedBoard;
        AppState.selectedClass = savedClass.replace('Class ', '');
        AppState.selectedState = savedState;
        
        // CRITICAL FIX: Ensure selectedBoard matches selectedState
        // This prevents board mismatch
        if (savedState === 'Maharashtra') {
            AppState.selectedBoard = 'MH Board';
        } else if (savedState === 'Delhi') {
            AppState.selectedBoard = 'CBSE Board';
        } else if (savedState === 'Tamil Nadu') {
            AppState.selectedBoard = 'Tamilnadu board';
        }
        
        // Hide onboarding, show main app
        onboardingOverlay.style.display = 'none';
        mainApp.style.display = 'block';
        
        // Update UI elements
        updateBoardExamCountdown();
        updateOverallSyllabusProgress();
        updateContinueLearningCard();
        
        // Initialize notifications for Class 10
        const cleanClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
        if (cleanClass === '10') {
            initNotificationSystem();
        }
        
        return true;
    }
    return false;
}

// Save onboarding completion
function saveOnboardingComplete() {
    localStorage.setItem('userBoard', AppState.selectedBoard);
    const cleanClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
    localStorage.setItem('userClass', `Class ${cleanClass}`);
    localStorage.setItem('userState', AppState.selectedState);
    localStorage.setItem('onboardingCompleted', 'true');
}

// ========== DOM ELEMENTS ==========
const stateSelect = document.getElementById('state-select');
const nextToClassBtn = document.getElementById('next-to-class');
const stepState = document.getElementById('step-state');
const stepClass = document.getElementById('step-class');
const classBtns = document.querySelectorAll('.class-btn');
const finishBtn = document.getElementById('finish-onboarding');
const onboardingOverlay = document.getElementById('onboarding');
const mainApp = document.getElementById('main-app');
const profileTooltip = document.getElementById('profile-tooltip');
const displayName = document.getElementById('display-name');
const navHome = document.getElementById('nav-home');
const navSubjects = document.getElementById('nav-subjects');
const navProfile = document.getElementById('nav-profile');
const navAi = null; // AI nav removed — accessible via homepage card only
const navTests = document.getElementById('nav-tests');
const homeView = document.getElementById('home-view');
const boardExamLabel = document.getElementById('board-exam-label');
const boardExamDaysLeft = document.getElementById('board-exam-days-left');
const overallSyllabusCircle = document.getElementById('overall-syllabus-circle');
const overallSyllabusPercentage = document.getElementById('overall-syllabus-percentage');
const continueLearningCard = document.getElementById('continue-learning-card');
const continueLearningImage = document.getElementById('continue-learning-image');
const continueLearningSubject = document.getElementById('continue-learning-subject');
const continueLearningVideoTitle = document.getElementById('continue-learning-video-title');
const continueLearningChapterMeta = document.getElementById('continue-learning-chapter-meta');
const continueLearningProgressFill = document.getElementById('continue-learning-progress-fill');
const continueLearningProgressText = document.getElementById('continue-learning-progress-text');
const continueLearningSection = document.getElementById('continue-learning-section');

// ========== STORAGE HELPERS ==========
function getChapterProgressStorageKey() { 
    return `${CHAPTER_PROGRESS_STORAGE_KEY_BASE}_${AppState.currentUserId}`; 
}
function getContinueLearningStorageKey() { 
    return `${CONTINUE_LEARNING_STORAGE_KEY_BASE}_${AppState.currentUserId}`; 
}

function loadProgressForCurrentUser() {
    try { 
        const saved = localStorage.getItem(getChapterProgressStorageKey()); 
        AppState.chapterProgressState = saved ? JSON.parse(saved) : {}; 
    } catch(e) { AppState.chapterProgressState = {}; }
    try { 
        const saved = localStorage.getItem(getContinueLearningStorageKey()); 
        AppState.continueLearningState = saved ? JSON.parse(saved) : null; 
    } catch(e) { AppState.continueLearningState = null; }
}

function saveChapterProgressState() { 
    localStorage.setItem(getChapterProgressStorageKey(), JSON.stringify(AppState.chapterProgressState)); 
}

function saveContinueLearningState() { 
    localStorage.setItem(getContinueLearningStorageKey(), JSON.stringify(AppState.continueLearningState)); 
}

function switchUser(userId) {
    AppState.currentUserId = userId;
    localStorage.setItem('currentUserId', userId);
    loadProgressForCurrentUser();
    if (AppState.selectedState && AppState.selectedClass) {
        updateOverallSyllabusProgress();
    }
}

// ========== CHAPTER PROGRESS ==========
function getChapterProgressKey(subjectName, chapterName) {
    return `${AppState.selectedState}|${AppState.selectedClass}|${subjectName}|${chapterName.toLowerCase()}`;
}
function isChapterCompleted(subjectName, chapterName) {
    return Boolean(AppState.chapterProgressState[getChapterProgressKey(subjectName, chapterName)]);
}
function toggleChapterCompleted(subjectName, chapterName) {
    const key = getChapterProgressKey(subjectName, chapterName);
    const wasCompleted = AppState.chapterProgressState[key];
    AppState.chapterProgressState[key] = !AppState.chapterProgressState[key];
    
    saveChapterProgressState();
}
function stripChapterMarkup(chapter) {
    return chapter.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// ========== YOUTUBE HELPERS ==========
function getYouTubeThumbnailFromEmbed(embedUrl) {
    if (!embedUrl) return 'chemistry_beakers.png';
    const match = embedUrl.match(/embed\/([^?&/]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : 'chemistry_beakers.png';
}
function updateContinueLearningCard() {
    if (!continueLearningCard) return;
    if (!AppState.continueLearningState) {
        if (continueLearningSection) continueLearningSection.style.display = 'none';
        return;
    }
    if (continueLearningSection) continueLearningSection.style.display = 'block';
    continueLearningCard.style.opacity = '1';
    continueLearningSubject.textContent = AppState.continueLearningState.subject.toUpperCase();
    continueLearningVideoTitle.textContent = `${AppState.continueLearningState.videoLabel} • ${AppState.continueLearningState.chapter}`;
    continueLearningChapterMeta.textContent = `Chapter ${AppState.continueLearningState.chapterNumber || '-'} • ${AppState.continueLearningState.videoLabel}`;
    continueLearningProgressFill.style.width = `${AppState.continueLearningState.progressPercent || 0}%`;
    continueLearningProgressText.textContent = `${AppState.continueLearningState.progressPercent || 0}% Completed`;
    if (continueLearningImage) continueLearningImage.src = getYouTubeThumbnailFromEmbed(AppState.continueLearningState.videoEmbedUrl);
}
function storeContinueLearningProgress(payload) {
    AppState.continueLearningState = { ...payload, lastUpdatedAt: Date.now() };
    saveContinueLearningState();
    updateContinueLearningCard();
}
function toEmbedWithApi(url) {
    try {
        const parsed = new URL(url, window.location.origin);
        if (window.location.protocol !== 'file:') {
            parsed.searchParams.set('enablejsapi', '1');
            if (window.location.origin && window.location.origin !== 'null') parsed.searchParams.set('origin', window.location.origin);
        }
        // CHANGED: playsinline from '1' to '0' - this enables fullscreen on mobile
        parsed.searchParams.set('playsinline', '0');
        parsed.searchParams.set('controls', '1');  // ADD THIS LINE
        parsed.searchParams.set('fs', '1');        // ADD THIS LINE
        parsed.searchParams.set('rel', '0');
        return parsed.toString();
    } catch(e) { return url; }
}
function clearYouTubeTracking() {
    AppState.playerProgressIntervals.forEach(clearInterval);
    AppState.playerProgressIntervals = [];
    AppState.activeYouTubePlayers.forEach(p => { try { p.destroy(); } catch(e) {} });
    AppState.activeYouTubePlayers = [];
}
function initializeYouTubeApi() {
    if (window.YT && window.YT.Player) { AppState.youtubeApiReady = true; return; }
    if (document.getElementById('youtube-iframe-api')) return;
    const tag = document.createElement('script');
    tag.id = 'youtube-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    const existing = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
        AppState.youtubeApiReady = true;
        if (typeof existing === 'function') existing();
    };
    document.head.appendChild(tag);
}

// ========== OVERALL PROGRESS ==========
function computeSubjectProgress(subjectName, chapters) {
    if (!chapters || chapters.length === 0) return { completed: 0, total: 0, percent: 0 };
    const completed = chapters.reduce((c, ch) => c + (isChapterCompleted(subjectName, stripChapterMarkup(ch)) ? 1 : 0), 0);
    return { completed, total: chapters.length, percent: Math.round((completed / chapters.length) * 100) };
}

function updateOverallSyllabusProgress() {
    if (!overallSyllabusCircle || !overallSyllabusPercentage) return;
    const subjects = getSubjectsList();
    if (!subjects || subjects.length === 0) {
        overallSyllabusCircle.setAttribute('stroke-dasharray', '0, 100');
        overallSyllabusPercentage.textContent = '0';
        return;
    }
    let total = 0, completed = 0;
    subjects.forEach(sub => {
        const ch = getChaptersForSubject(sub.name);
        const prog = computeSubjectProgress(sub.name, ch);
        total += prog.total;
        completed += prog.completed;
    });
    const percent = total ? Math.round((completed / total) * 100) : 0;
    overallSyllabusCircle.setAttribute('stroke-dasharray', `${percent}, 100`);
    overallSyllabusPercentage.textContent = percent;
}

// ========== BOARD EXAM COUNTDOWN ==========
function getDaysUntilBoardExam() {
    const now = new Date(), year = now.getFullYear();
    const exam = new Date(now > new Date(year, 1, 15) ? year + 1 : year, 1, 15);
    const days = Math.max(0, Math.ceil((exam - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / (24 * 3600 * 1000)));
    return { daysLeft: days, examYear: exam.getFullYear() };
}
function updateBoardExamCountdown() {
    if (boardExamLabel && boardExamDaysLeft) {
        const { daysLeft, examYear } = getDaysUntilBoardExam();
        boardExamLabel.textContent = `Board Exam ${examYear}`;
        boardExamDaysLeft.textContent = daysLeft;
    }
}
function scheduleMidnightBoardExamRefresh() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    setTimeout(() => { updateBoardExamCountdown(); scheduleMidnightBoardExamRefresh(); }, next - now);
}

// ========== BOARD/STATE MAPPING ==========
function getBoardStateMapping(board) {
    const boardMap = { 'CBSE Board': 'Delhi', 'MH Board': 'Maharashtra', 'Tamilnadu board': 'Tamil Nadu' };
    return boardMap[board] || board;
}
function getBoardLabelFromState(state) {
    const reverseMap = { 'Delhi': 'CBSE Board', 'Maharashtra': 'MH Board', 'Tamil Nadu': 'Tamilnadu board' };
    return reverseMap[state] || state;
}

// ========== NAVIGATION ==========
function switchView(viewId, activeNavBtn) {
    if (viewId !== 'chapter-detail-view') clearYouTubeTracking();
    
    const views = ['home-view', 'subjects-view', 'chapters-view', 'chapter-detail-view', 
                   'curriculum-view', 'progress-detail-view', 'profile-view', 'ai-view', 'notes-view', 'adaptive-view', 'tests-view'];
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    const target = document.getElementById(viewId);
    if (target) {
        if (viewId === 'ai-view') {
            target.style.display = 'flex';
        } else {
            target.style.display = 'block';
        }
    }
    
    // Reset scroll to top when switching views
    window.scrollTo(0, 0);
    document.querySelector('.app-container').scrollTop = 0;
    
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        const i = n.querySelector('i');
        i.classList.remove('ph-fill');
        i.classList.add('ph');
    });
    
    if (activeNavBtn) {
        activeNavBtn.classList.add('active');
        activeNavBtn.querySelector('i').classList.remove('ph');
        activeNavBtn.querySelector('i').classList.add('ph-fill');
    }
    
    if (profileTooltip) profileTooltip.classList.remove('show');
}

// ========== LOADING HELPERS ==========
function showLoading() { const ov = document.getElementById('loading-overlay'); if (ov) ov.classList.remove('hidden'); }
function hideLoading() { const ov = document.getElementById('loading-overlay'); if (ov) ov.classList.add('hidden'); }

// ========== INITIALIZATION ==========
const storedUid = localStorage.getItem('currentUserId');
if (storedUid) AppState.currentUserId = storedUid;
loadProgressForCurrentUser();


// ========== EVENT LISTENERS ==========
stateSelect.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val && val !== '') {
        AppState.selectedBoard = val;
        // Map board to state correctly
        if (val === 'CBSE Board') {
            AppState.selectedState = 'Delhi';
        } else if (val === 'MH Board') {
            AppState.selectedState = 'Maharashtra';
        } else if (val === 'Tamilnadu board') {
            AppState.selectedState = 'Tamil Nadu';
        } else {
            AppState.selectedState = getBoardStateMapping(val);
        }
        nextToClassBtn.disabled = false;
    } else {
        AppState.selectedBoard = '';
        AppState.selectedState = '';
        nextToClassBtn.disabled = true;
    }
});

nextToClassBtn.addEventListener('click', () => {
    if (!AppState.selectedState || !AppState.selectedBoard) {
        alert('Please select a board first');
        return;
    }
    stepState.classList.add('hidden');
    stepClass.classList.remove('hidden');
});

classBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) return;
        classBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        AppState.selectedClass = btn.getAttribute('data-class');
        finishBtn.disabled = false;
    });
});

finishBtn.addEventListener('click', () => {
    if (!AppState.selectedState || !AppState.selectedBoard) { alert('Please select your board first'); return; }
    if (!AppState.selectedClass) { alert('Please select your class'); return; }
    
    // Ensure selectedState is set correctly from selectedBoard
    if (AppState.selectedBoard === 'CBSE Board') {
        AppState.selectedState = 'Delhi';
    } else if (AppState.selectedBoard === 'MH Board') {
        AppState.selectedState = 'Maharashtra';
    } else if (AppState.selectedBoard === 'Tamilnadu board') {
        AppState.selectedState = 'Tamil Nadu';
    }
    
    // Save onboarding completion
    saveOnboardingComplete();
    
    showLoading();
    setTimeout(() => {
        onboardingOverlay.style.opacity = '0';
        setTimeout(() => {
            onboardingOverlay.style.display = 'none';
            mainApp.style.display = 'block';
            
            // 🔥 Set default continue learning state
            if (!AppState.continueLearningState) {
                const defaultSub = 'Science 1';
                const defaultChap = 'Chemical Reactions and Equations';
                const vcfg = typeof getChapterVideoConfig === 'function' ? getChapterVideoConfig(defaultChap, defaultSub) : null;
                if (vcfg) {
                    AppState.continueLearningState = {
                        board: AppState.selectedBoard,
                        state: AppState.selectedState,
                        class: AppState.selectedClass,
                        subject: defaultSub,
                        chapter: defaultChap,
                        chapterNumber: 1,
                        videoLabel: vcfg[0].label,
                        videoTitle: vcfg[0].title,
                        videoIndex: 0,
                        videoEmbedUrl: vcfg[0].embedUrl,
                        progressPercent: 0,
                        lastUpdatedAt: Date.now()
                    };
                    saveContinueLearningState();
                    updateContinueLearningCard();
                }
            }
            
            // 🆕 Initialize notification system for Class 10 students
            const cleanClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
            if (cleanClass === '10') {
                initNotificationSystem();
            }
            

            setTimeout(() => {
                profileTooltip.classList.add('show');
                hideLoading();
            }, 500);
        }, 300);
    }, 500);
});

// Google Sign-In success handler
window.addEventListener('google-signin-success', (ev) => {
    const user = ev.detail;
    if (!user) return;
    switchUser(user.uid);
    const name = user.displayName || 'Student';
    displayName.innerHTML = `${name} <i class="ph-fill ph-sparkle"></i>`;
    updateProfileNameDisplay(name);
    updateProfileAvatarDisplay(name.charAt(0).toUpperCase());
    if (AppState.selectedClass && AppState.selectedBoard) {
        const cleanClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
        updateProfileMetaDisplay(`Class ${cleanClass} • ${AppState.selectedBoard}`);
    }
    showProfileContent();
    switchView('profile-view', navProfile);
});

// Nav click handlers
navHome.addEventListener('click', (e) => { e.preventDefault(); switchView('home-view', navHome); });
navSubjects.addEventListener('click', (e) => { e.preventDefault(); openSubjects(); switchView('subjects-view', navSubjects); });
    document.getElementById('nav-adaptive')?.addEventListener('click', (e) => { e.preventDefault(); openAdaptiveView(); switchView('adaptive-view', document.getElementById('nav-adaptive')); });
    document.getElementById('nav-notes')?.addEventListener('click', (e) => { e.preventDefault(); openNotesView(); switchView('notes-view', document.getElementById('nav-notes')); });
    navProfile.addEventListener('click', (e) => { e.preventDefault(); openProfileView(); switchView('profile-view', navProfile); });

// Quick access
document.getElementById('quick-access-subjects')?.addEventListener('click', () => {
    openSubjects();
    switchView('subjects-view', navSubjects);
});
document.getElementById('quick-access-curriculum')?.addEventListener('click', () => {
    if (typeof openSmartStudyView === 'function') {
        openSmartStudyView();
        switchView('curriculum-view', null);
    } else {
        alert('Smart Study module loading...');
    }
});
document.getElementById('quick-access-notes')?.addEventListener('click', () => {
    openNotesView();
    switchView('notes-view', document.getElementById('nav-notes'));
});
document.getElementById('quick-access-progress')?.addEventListener('click', () => {
    openProgressView();
    switchView('progress-detail-view', null);
});

// Continue Learning card
continueLearningCard?.addEventListener('click', () => {
    if (!AppState.continueLearningState) return;
    AppState.selectedState = AppState.continueLearningState.state;
    AppState.selectedClass = String(AppState.continueLearningState.class).replace(/Class\s+/ig, '').trim();
    AppState.selectedBoard = AppState.continueLearningState.board || getBoardLabelFromState(AppState.selectedState);
    const cfg = getChapterVideoConfig(AppState.continueLearningState.chapter, AppState.continueLearningState.subject);
    if (cfg) {
        openChapterDetail(AppState.continueLearningState.chapter, AppState.continueLearningState.subject, cfg, AppState.continueLearningState.videoLabel || null);
        switchView('chapter-detail-view', navSubjects);  // ← ADD THIS LINE
    } else {
        switchView('chapters-view', navSubjects);
    }
});

// AI Homepage card
document.getElementById('ai-homepage-card')?.addEventListener('click', () => {
    openAiView();
    switchView('ai-view', null);
});

// Init
updateBoardExamCountdown();
scheduleMidnightBoardExamRefresh();
initializeYouTubeApi();
updateContinueLearningCard();

checkExistingOnboarding();

// At the end of main.js, replace the helper functions with:

// These functions are now defined in profile.js
// But we'll keep empty placeholders to avoid errors during load
function updateProfileNameDisplay(name) {}
function updateProfileAvatarDisplay(char) {}
function updateProfileMetaDisplay(text) {}
function showProfileContent() {}

// ========== DAILY STUDY REMINDER SYSTEM ==========

// Request notification permission when app loads
function initNotificationSystem() {
    // Only ask for permission if user is in Class 10
    const cleanClass = String(AppState.selectedClass).replace(/Class\s+/ig, '').trim();
    if (cleanClass === '10') {
        // Check if notifications are supported
        if ('Notification' in window) {
            // Check if we already asked for permission
            const notificationPermissionAsked = localStorage.getItem('notificationPermissionAsked');
            
            if (!notificationPermissionAsked) {
                // Wait 5 seconds after onboarding to ask for permission
                setTimeout(() => {
                    requestNotificationPermission();
                }, 5000);
            } else if (Notification.permission === 'granted') {
                // Permission already granted, schedule daily reminder
                scheduleDailyReminder();
            }
        }
    }
}

// Request notification permission
function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notification permission granted');
            localStorage.setItem('notificationPermissionAsked', 'true');
            localStorage.setItem('notificationsEnabled', 'true');
            scheduleDailyReminder();
            
            // Show welcome notification
            showNotification('Kaizen Study Reminder', '🎯 Notifications enabled! You will receive daily study reminders at 7 PM.');
        } else {
            console.log('Notification permission denied');
            localStorage.setItem('notificationsEnabled', 'false');
        }
    }).catch(err => {
        console.error('Notification error:', err);
    });
}

// Show a notification
function showNotification(title, body, icon = null) {
    if (Notification.permission !== 'granted') return;
    
    // For browsers that support service workers
    if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(title, {
                body: body,
                icon: icon || 'https://via.placeholder.com/192x192?text=K',
                badge: icon || 'https://via.placeholder.com/72x72?text=K',
                vibrate: [200, 100, 200],
                tag: 'kaizen-reminder',
                renotify: true,
                requireInteraction: true  // Notification stays until user interacts
            });
        });
    } else {
        // Fallback for browsers without service workers
        const notification = new Notification(title, {
            body: body,
            icon: icon || 'https://via.placeholder.com/192x192?text=K',
            vibrate: [200, 100, 200],
            requireInteraction: true
        });
        
        notification.onclick = function() {
            window.focus();
            notification.close();
            // Open AI view or dashboard when clicked
            if (typeof openAiView === 'function') {
                openAiView();
                if (typeof switchView === 'function') {
                    switchView('ai-view', null);
                }
            }
        };
    }
}

// Schedule daily reminder at 7 PM
function scheduleDailyReminder() {
    // Clear any existing scheduled reminders
    if (window.dailyReminderTimeout) {
        clearTimeout(window.dailyReminderTimeout);
    }
    
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(19, 0, 0, 0); // 7:00 PM
    
    // Calculate milliseconds until next 7 PM
    let timeUntilTarget = targetTime - now;
    
    // If time has passed today, schedule for tomorrow
    if (timeUntilTarget < 0) {
        targetTime.setDate(targetTime.getDate() + 1);
        timeUntilTarget = targetTime - now;
    }
    
    console.log(`📅 Daily reminder scheduled for ${targetTime.toLocaleString()}`);
    
    // Schedule the reminder
    window.dailyReminderTimeout = setTimeout(() => {
        sendDailyReminder();
        // After sending, schedule next day's reminder
        scheduleDailyReminder();
    }, timeUntilTarget);
}

// Send the daily study reminder
function sendDailyReminder() {
    // Only send for Class 10 students
    if (AppState.selectedClass !== '10') return;
    
    // Check if notifications are enabled
    if (localStorage.getItem('notificationsEnabled') !== 'true') return;
    
    // Different reminder messages for different days
    const reminders = [
        "📚 Want to get 90% in exams? Study smart with Kaizen! Open the app to continue your learning journey.",
        "🎯 Daily goal: Complete at least 2 chapters today! Remember, consistency is key to scoring 90%+.",
        "💡 Did you know? Students who study daily score 30% higher. Open Kaizen and boost your preparation!",
        "⭐ 7 PM Study Reminder! Your future self will thank you for the effort you put in today.",
        "🚀 Only 30 minutes of focused study daily = 90% in boards! Start now with Kaizen.",
        "📖 Don't break the chain! Study today and watch your progress grow on the dashboard.",
        "🎓 90% is achievable! Follow your Smart Study plan and use AI coach for doubts."
    ];
    
    // Pick a random reminder
    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
    
    // Get personalized message with day streak if available
    const streak = getStudyStreak();
    let message = randomReminder;
    
    if (streak > 0) {
        message = `🔥 ${streak} day streak! ${randomReminder}`;
    }
    
    // Show the notification
    showNotification(
        'Kaizen Study Reminder', 
        message,
        null
    );
    
    // Also log to console for debugging
    console.log(`🔔 Daily Reminder: ${message}`);
    
    // Optional: Play a subtle sound
    playReminderSound();
}

// Track study streak (bonus feature)
function getStudyStreak() {
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    const today = new Date().toDateString();
    
    if (!lastStudyDate) return 0;
    
    const lastDate = new Date(lastStudyDate);
    const currentDate = new Date();
    const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        // Already studied today, get streak
        return parseInt(localStorage.getItem('studyStreak') || '0');
    } else if (diffDays === 1) {
        // Streak continues
        const streak = parseInt(localStorage.getItem('studyStreak') || '0') + 1;
        localStorage.setItem('studyStreak', streak);
        return streak;
    } else {
        // Streak broken
        localStorage.setItem('studyStreak', '0');
        return 0;
    }
}

// Update study streak when user studies (call this in chapter completion)
function updateStudyStreak() {
    const today = new Date().toDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    
    if (lastStudyDate !== today) {
        localStorage.setItem('lastStudyDate', today);
        
        let streak = parseInt(localStorage.getItem('studyStreak') || '0');
        if (lastStudyDate) {
            const lastDate = new Date(lastStudyDate);
            const currentDate = new Date();
            const diffDays = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                streak++;
            } else if (diffDays > 1) {
                streak = 1;
            }
        } else {
            streak = 1;
        }
        
        localStorage.setItem('studyStreak', streak);
        
        // Show congratulatory notification for milestone streaks
        if (streak === 7) {
            showNotification('🎉 Amazing!', 'You\'ve completed 7 days of consistent study! Keep going for 90%!');
        } else if (streak === 30) {
            showNotification('🏆 Incredible!', '30-day study streak! You\'re on the path to 90%+ in boards!');
        }
    }
}

// Play a subtle reminder sound (optional)
function playReminderSound() {
    try {
        // Create a subtle 'ding' sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880; // A5 note
        gainNode.gain.value = 0.1; // Low volume
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        // Resume audio context (required by some browsers)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    } catch(e) {
        // Silently fail if audio not supported
        console.log('Audio notification not supported');
    }
}

// Function to toggle notifications on/off (add this to profile settings)
function toggleNotifications(enabled) {
    if (enabled) {
        if (Notification.permission === 'granted') {
            localStorage.setItem('notificationsEnabled', 'true');
            scheduleDailyReminder();
            showNotification('Notifications Enabled', 'You will now receive daily study reminders at 7 PM');
        } else {
            requestNotificationPermission();
        }
    } else {
        localStorage.setItem('notificationsEnabled', 'false');
        if (window.dailyReminderTimeout) {
            clearTimeout(window.dailyReminderTimeout);
        }
    }
}

// Initialize notification system after onboarding
// Add this to your finishBtn click handler in main.js

// Check existing onboarding when page loads (run immediately, fallback on DOMContentLoaded)
function runOnboardingCheck() {
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true') {
        checkExistingOnboarding();
    }
}
runOnboardingCheck();
document.addEventListener('DOMContentLoaded', runOnboardingCheck);
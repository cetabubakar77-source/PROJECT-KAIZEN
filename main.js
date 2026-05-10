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
const navAi = document.getElementById('nav-ai');
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
        parsed.searchParams.set('playsinline', '1');
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
                   'curriculum-view', 'progress-detail-view', 'profile-view', 'ai-view', 'tests-view'];
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    
    const target = document.getElementById(viewId);
    if (target) target.style.display = 'block';
    
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
        AppState.selectedState = getBoardStateMapping(val);
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
        classBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        AppState.selectedClass = btn.getAttribute('data-class');
        finishBtn.disabled = false;
    });
});

finishBtn.addEventListener('click', () => {
    if (!AppState.selectedState || !AppState.selectedBoard) { alert('Please select your board first'); return; }
    if (!AppState.selectedClass) { alert('Please select your class'); return; }
    showLoading();
    setTimeout(() => {
        onboardingOverlay.style.opacity = '0';
        setTimeout(() => {
            onboardingOverlay.style.display = 'none';
            mainApp.style.display = 'block';
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
        updateProfileMetaDisplay(`Class ${AppState.selectedClass} • ${AppState.selectedBoard}`);
    }
    showProfileContent();
    switchView('profile-view', navProfile);
});

// Nav click handlers
navHome.addEventListener('click', (e) => { e.preventDefault(); switchView('home-view', navHome); });
navSubjects.addEventListener('click', (e) => { e.preventDefault(); openSubjects(); switchView('subjects-view', navSubjects); });
navAi.addEventListener('click', (e) => { e.preventDefault(); openAiView(); switchView('ai-view', navAi); });
navTests.addEventListener('click', (e) => { e.preventDefault(); openTestsView(); switchView('tests-view', navTests); });
navProfile.addEventListener('click', (e) => { e.preventDefault(); openProfileView(); switchView('profile-view', navProfile); });

// Quick access
document.getElementById('quick-access-subjects')?.addEventListener('click', () => {
    openSubjects();
    switchView('subjects-view', navSubjects);
});
document.getElementById('quick-access-curriculum')?.addEventListener('click', () => {
    alert('Curriculum feature coming soon!');
});
document.getElementById('quick-access-tests')?.addEventListener('click', () => {
    openTestsView();
    switchView('tests-view', navTests);
});
document.getElementById('quick-access-progress')?.addEventListener('click', () => {
    openProgressView();
    switchView('progress-detail-view', null);
});

// Continue Learning card
continueLearningCard?.addEventListener('click', () => {
    if (!AppState.continueLearningState) return;
    AppState.selectedState = AppState.continueLearningState.state;
    AppState.selectedClass = AppState.continueLearningState.class;
    AppState.selectedBoard = AppState.continueLearningState.board || getBoardLabelFromState(AppState.selectedState);
    openSubjects();
    openChapters(AppState.continueLearningState.subject);
    const cfg = getChapterVideoConfig(AppState.continueLearningState.chapter, AppState.continueLearningState.subject);
    if (cfg) openChapterDetail(AppState.continueLearningState.chapter, AppState.continueLearningState.subject, cfg, AppState.continueLearningState.videoLabel || null);
    else switchView('chapters-view', navSubjects);
});

// AI Homepage card
document.getElementById('ai-homepage-card')?.addEventListener('click', () => {
    openAiView();
    switchView('ai-view', navAi);
});

// Init
updateBoardExamCountdown();
scheduleMidnightBoardExamRefresh();
initializeYouTubeApi();
updateContinueLearningCard();

// These functions will be defined in profile.js but we reference them here
// Will be populated after profile.js loads
function updateProfileNameDisplay(name) {
    const el = document.getElementById('profile-name-display');
    if (el) el.innerText = name;
}
function updateProfileAvatarDisplay(char) {
    const el = document.getElementById('profile-avatar-display');
    if (el) el.innerText = char;
}
function updateProfileMetaDisplay(text) {
    const el = document.getElementById('profile-meta-display');
    if (el) el.innerHTML = text;
}
function showProfileContent() {
    const setup = document.getElementById('profile-setup-view');
    const content = document.getElementById('profile-content-view');
    if (setup) setup.style.display = 'none';
    if (content) content.style.display = 'block';
}
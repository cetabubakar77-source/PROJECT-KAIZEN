// ========== TESTS MODULE ==========

let currentTestSubject = '';
let currentTestChapters = [];

function openTestsView() {
    const testsView = document.getElementById('tests-view');
    if (!testsView) return;
    
    testsView.innerHTML = `
        <div class="profile-header">
            <h2>Tests</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Practice and evaluate your knowledge</p>
        </div>
        <div id="tests-subject-selection">
            <h3 style="font-size: 14px; margin-bottom: 12px; color: var(--text-primary);">Select Subject</h3>
            <div id="tests-subjects-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;"></div>
        </div>
        <div id="tests-chapter-selection" style="display: none;"></div>
        <div id="tests-result-view" style="display: none;"></div>
    `;
    
    const grid = document.getElementById('tests-subjects-grid');
    const subs = getSubjectsList();
    
    subs.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="subject-icon" style="color:${sub.color}; background:${sub.color}20;"><i class="ph ${sub.icon}"></i></div>
            <h4>${sub.name}</h4>`;
        card.addEventListener('click', () => { 
            currentTestSubject = sub.name; 
            openTestChapters(sub.name); 
        });
        grid.appendChild(card);
    });
}

function openTestChapters(subjectName) {
    const chapters = getChaptersForSubject(subjectName);
    currentTestChapters = chapters;
    
    const chapterDiv = document.getElementById('tests-chapter-selection');
    chapterDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 16px;">
            <button id="back-to-subjects-test" style="border: none; background: none; cursor: pointer; color: var(--text-primary); font-size: 24px; padding: 0; margin-right: 8px;">
                <i class="ph ph-arrow-left"></i>
            </button>
            <div>
                <h3 style="font-size: 16px; margin-bottom: 4px; color: var(--text-primary);">${subjectName}</h3>
                <p style="font-size: 12px; color: var(--text-secondary);">Select chapters to test</p>
            </div>
        </div>
        <div id="tests-all-chapters-card" style="background-color: var(--card-bg); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 16px; margin-bottom: 16px; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="ph ph-book-open" style="font-size: 24px; color: #DC2626;"></i>
                <div style="flex: 1;">
                    <h4 style="font-size: 14px; color: var(--text-primary); margin-bottom: 4px;">All Chapters</h4>
                    <p style="font-size: 12px; color: var(--text-secondary);">Test all chapters of this subject</p>
                </div>
                <i class="ph ph-caret-right" style="color: var(--text-secondary);"></i>
            </div>
        </div>
        <h4 style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px; text-transform: uppercase;">Individual Chapters</h4>
        <div id="tests-chapters-list" style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 10px;"></div>
    `;
    
    document.getElementById('back-to-subjects-test').addEventListener('click', () => {
        document.getElementById('tests-subject-selection').style.display = 'block';
        document.getElementById('tests-chapter-selection').style.display = 'none';
        document.getElementById('tests-result-view').style.display = 'none';
        currentTestSubject = '';
        currentTestChapters = [];
    });
    
    document.getElementById('tests-all-chapters-card').addEventListener('click', () => startTest(subjectName, null, true));
    
    const container = document.getElementById('tests-chapters-list');
    chapters.forEach((ch, idx) => {
        const plain = stripChapterMarkup(ch);
        const card = document.createElement('div');
        card.style.cssText = 'background:var(--card-bg); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:12px; cursor:pointer; display:flex; align-items:center; gap:12px;';
        card.innerHTML = `
            <div style="flex:1;"><h4 style="font-size:14px; color:var(--text-primary);">${plain}</h4><p style="font-size:12px; color:var(--text-secondary);">Chapter ${idx + 1}</p></div>
            <i class="ph ph-caret-right chevron"></i>`;
        card.addEventListener('click', () => startTest(subjectName, plain, false));
        container.appendChild(card);
    });
    
    document.getElementById('tests-subject-selection').style.display = 'none';
    document.getElementById('tests-chapter-selection').style.display = 'block';
    document.getElementById('tests-result-view').style.display = 'none';
}

function startTest(subjectName, chapterName, all) {
    const total = all ? currentTestChapters.length * 5 : 20;
    const correct = Math.floor(total * (0.7 + Math.random() * 0.25));
    const score = Math.round((correct / total) * 100);
    const time = `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
    
    let message = 'Keep Practicing! 💪';
    let msgColor = '#ef4444';
    if (score >= 80) { message = 'Excellent Performance! 🎉'; msgColor = '#10b981'; }
    else if (score >= 60) { message = 'Good Job! 👍'; msgColor = '#f59e0b'; }
    
    const resultDiv = document.getElementById('tests-result-view');
    resultDiv.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
            <button id="back-to-chapters-test" style="border: none; background: none; cursor: pointer; color: var(--text-primary); font-size: 24px; padding: 0; margin-right: 8px;">
                <i class="ph ph-arrow-left"></i>
            </button>
            <h3 style="font-size: 16px; color: var(--text-primary);">Test Results</h3>
        </div>
        <div style="background-color: var(--card-bg); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 16px; padding: 24px; text-align: center; margin-bottom: 20px;">
            <div style="font-size: 48px; font-weight: 700; color: #DC2626; margin-bottom: 8px;">${score}%</div>
            <p style="font-size: 14px; color: ${msgColor}; margin-bottom: 16px;">${message}</p>
            <div style="display: flex; justify-content: space-around; padding: 16px 0; border-top: 1px solid rgba(255, 255, 255, 0.05); border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                <div><p style="font-size: 12px; color: var(--text-secondary);">Correct</p><p style="font-size: 18px; font-weight: 600; color: #10b981;">${correct}</p></div>
                <div><p style="font-size: 12px; color: var(--text-secondary);">Total</p><p style="font-size: 18px; font-weight: 600; color: var(--text-primary);">${total}</p></div>
                <div><p style="font-size: 12px; color: var(--text-secondary);">Time</p><p style="font-size: 18px; font-weight: 600; color: #f59e0b;">${time}</p></div>
            </div>
        </div>
        <button id="retake-test-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #DC2626, #991B1B); border: none; border-radius: 8px; color: white; font-weight: 600; cursor: pointer; margin-bottom: 12px; font-size: 14px;">Retake Test</button>
        <button id="back-to-subjects-result-btn" style="width: 100%; padding: 12px; background: transparent; border: 1px solid var(--border-color); border-radius: 8px; color: var(--text-primary); font-weight: 600; cursor: pointer; font-size: 14px;">Back to Subjects</button>
    `;
    
    document.getElementById('back-to-chapters-test').addEventListener('click', () => {
        document.getElementById('tests-subject-selection').style.display = 'block';
        document.getElementById('tests-chapter-selection').style.display = 'none';
        document.getElementById('tests-result-view').style.display = 'none';
    });
    document.getElementById('retake-test-btn').addEventListener('click', () => {
        if (currentTestSubject) openTestChapters(currentTestSubject);
    });
    document.getElementById('back-to-subjects-result-btn').addEventListener('click', () => {
        document.getElementById('tests-subject-selection').style.display = 'block';
        document.getElementById('tests-chapter-selection').style.display = 'none';
        document.getElementById('tests-result-view').style.display = 'none';
        currentTestSubject = '';
        currentTestChapters = [];
    });
    
    document.getElementById('tests-subject-selection').style.display = 'none';
    document.getElementById('tests-chapter-selection').style.display = 'none';
    document.getElementById('tests-result-view').style.display = 'block';
}
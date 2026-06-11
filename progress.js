// ========== PROGRESS MODULE ==========

function openProgressView() {
    const progressDetailView = document.getElementById('progress-detail-view');
    if (!progressDetailView) return;
    
    progressDetailView.innerHTML = `
        <div class="profile-header" style="display: flex; align-items: center; justify-content: center; position: relative;">
            <button id="back-from-progress" class="icon-btn" style="position: absolute; left: 0; border:none; background:none; cursor:pointer; color: var(--text-primary);">
                <i class="ph ph-arrow-left" style="font-size: 24px;"></i>
            </button>
            <div>
                <h2 style="margin-bottom: 0;">Your Progress</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Track your syllabus completion</p>
            </div>
        </div>
        <div class="progress-stats-row" id="progress-stats"></div>
        <div class="progress-subject-list" id="progress-subject-list"></div>
    `;
    
    document.getElementById('back-from-progress').addEventListener('click', () => {
        switchView('home-view', document.getElementById('nav-home'));
    });
    
    const subjects = getSubjectsList();
    if (subjects.length === 0) return;
    
    let totalC = 0, compC = 0;
    const statsDiv = document.getElementById('progress-stats');
    const listDiv = document.getElementById('progress-subject-list');
    listDiv.innerHTML = '';
    
    subjects.forEach(sub => {
        const ch = getChaptersForSubject(sub.name);
        const prog = computeSubjectProgress(sub.name, ch);
        totalC += prog.total;
        compC += prog.completed;
        
        const item = document.createElement('div');
        item.style.cssText = 'background:var(--card-bg); padding:16px; border-radius:12px; margin-bottom:12px; border:1px solid rgba(255,255,255,0.05);';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <div class="subject-icon" style="color:${sub.color}; background:${sub.color}20; width:32px; height:32px; font-size:16px; border-radius:8px; display:flex; align-items:center; justify-content:center;">
                        <i class="ph ${sub.icon}"></i>
                    </div>
                    <span style="font-weight:600; color:var(--text-primary); font-size:14px;">${sub.name}</span>
                </div>
                <span style="font-weight:600; color:var(--text-primary);">${prog.percent}%</span>
            </div>
            <div class="progress-bar" style="height:6px; background:var(--border-color); border-radius:4px; overflow:hidden; width:100%;">
                <div class="fill" style="width:${prog.percent}%; height:100%; background-color:${sub.color};"></div>
            </div>
            <div style="text-align:right; font-size:11px; color:var(--text-secondary);">${prog.completed} / ${prog.total} Chapters</div>`;
        listDiv.appendChild(item);
    });
    
    const overall = totalC ? Math.round((compC / totalC) * 100) : 0;
    statsDiv.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-bottom:24px;">
            <div style="background:var(--card-bg); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:16px; text-align:center;">
                <h3 style="font-size:24px; color:#DC2626; margin-bottom:4px;">${overall}%</h3>
                <p style="font-size:12px; color:var(--text-secondary);">Overall Completion</p>
            </div>
            <div style="background:var(--card-bg); border:1px solid rgba(255,255,255,0.05); border-radius:12px; padding:16px; text-align:center;">
                <h3 style="font-size:24px; color:#10b981; margin-bottom:4px;">${compC}/${totalC}</h3>
                <p style="font-size:12px; color:var(--text-secondary);">Chapters Done</p>
            </div>
        </div>`;
}
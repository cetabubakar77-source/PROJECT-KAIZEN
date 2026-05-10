// ========== SUBJECTS MODULE ==========

// Reference AppState from main.js (global scope)

// Curriculum data
const science1Chapters = {
    "Maharashtra": ["Gravitation", "Periodic Classification of Elements", "Chemical Reactions and Equations", "Effects of Electric Current", "Heat", "Refraction of Light", "Lenses", "Metallurgy", "Carbon Compounds", "Space Missions"],
    "Delhi": ["Light – Reflection and Refraction", "Human Eye and Colourful World", "Electricity", "Magnetic Effects of Electric Current", "Chemical Reactions and Equations", "Acids, Bases and Salts", "Metals and Non-metals", "Carbon and its Compounds", "Periodic Classification"]
};
const science2Chapters = {
    "Maharashtra": ["Life Processes in Living Organisms", "Heredity and Evolution", "Cell Biology and Biotechnology", "Introduction to Microbiology", "Animal Classification", "Environmental Management", "Social Health", "Towards Green Energy"],
    "Delhi": ["Life Processes", "Control and Coordination", "Reproduction", "Heredity and Evolution", "Our Environment", "Natural Resources"]
};
const maths1Chapters = {
    "Maharashtra": ["Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progression", "Financial Planning", "Statistics", "Probability"],
    "Delhi": ["Real Numbers", "Polynomials", "Linear Equations in Two Variables", "Quadratic Equations", "Arithmetic Progressions"]
};
const maths2Chapters = {
    "Maharashtra": ["Similarity", "Pythagoras Theorem", "Circle", "Constructions", "Coordinate Geometry", "Trigonometry", "Mensuration"],
    "Delhi": ["Triangles", "Coordinate Geometry", "Trigonometry", "Applications of Trigonometry", "Circles", "Areas Related to Circles", "Surface Areas and Volumes", "Statistics", "Probability"]
};
const historyChapters = {
    "Maharashtra": ["Applied History", "Heritage Management", "Mass Media and History", "Entertainment and History", "History of Indian Arts", "Tourism and History", "Sports and History", "Historiography"],
    "Delhi": ["Nationalism in India", "Nationalism in Europe", "Global World", "Industrialisation", "Print Culture"]
};
const geographyChapters = {
    "Maharashtra": ["Climate", "Physiography and Drainage", "Population", "Natural Vegetation and Wildlife", "Economy and Occupations", "Transport and Communication", "Location and Extent", "Settlements", "Field Visit"],
    "Delhi": ["Agriculture", "Manufacturing Industries", "Resources and Development", "Water Resources", "Minerals and Energy Resources", "Lifelines of National Economy"]
};
const civicsChapters = {
    "Maharashtra": ["Working of the Constitution", "Political Parties", "Social and Political Movements", "Challenges to Democracy", "Public Facilities"],
    "Delhi": ["Power Sharing", "Federalism", "Democracy and Diversity", "Political Parties", "Outcomes of Democracy", "Challenges to Democracy"]
};
const economicsChapters = {
    "Delhi": ["Sectors of the Economy", "Globalisation and the Indian Economy", "Development Experience of India", "Money and Credit", "Consumer Rights"],
    "Maharashtra": ["Sectors of the Economy", "Globalisation and the Indian Economy", "Development Experience of India", "Money and Credit", "Consumer Rights"]
};

function getSubjectsList() {
    if (!AppState.selectedState || !AppState.selectedClass) return [];
    let maths = (AppState.selectedState === 'Maharashtra')
        ? [{ name: 'Maths 1', icon: 'ph-calculator', color: '#10b981' }, { name: 'Maths 2', icon: 'ph-function', color: '#059669' }]
        : [{ name: 'Maths', icon: 'ph-calculator', color: '#10b981' }];
    
    if (AppState.selectedClass === '8') return [{ name: 'Science', icon: 'ph-flask', color: '#a855f7' }, ...maths, { name: 'History', icon: 'ph-scroll', color: '#ec4899' }, { name: 'Geography', icon: 'ph-globe-hemisphere-east', color: '#14b8a6' }, { name: 'Civics', icon: 'ph-bank', color: '#f59e0b' }];
    if (AppState.selectedClass === '9') return [{ name: 'Science', icon: 'ph-flask', color: '#a855f7' }, ...maths, { name: 'History', icon: 'ph-scroll', color: '#ec4899' }, { name: 'Geography', icon: 'ph-globe-hemisphere-east', color: '#14b8a6' }, { name: 'Civics', icon: 'ph-bank', color: '#f59e0b' }];
    return [{ name: 'Science 1', icon: 'ph-flask', color: '#a855f7' }, { name: 'Science 2', icon: 'ph-dna', color: '#8b5cf6' }, ...maths, { name: 'History', icon: 'ph-scroll', color: '#ec4899' }, { name: 'Geography', icon: 'ph-globe-hemisphere-east', color: '#14b8a6' }, { name: 'Civics', icon: 'ph-bank', color: '#f59e0b' }, { name: 'Economics', icon: 'ph-coin', color: '#f59e0b' }];
}

function getChaptersForSubject(subjectName) {
    if (AppState.selectedClass !== '10') return ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"];
    const state = AppState.selectedState;
    if (subjectName === 'Science 1') return science1Chapters[state] || science1Chapters["Delhi"];
    if (subjectName === 'Science 2') return science2Chapters[state] || science2Chapters["Delhi"];
    if (subjectName === 'Maths 1') return maths1Chapters[state] || maths1Chapters["Delhi"];
    if (subjectName === 'Maths 2') return maths2Chapters[state] || maths2Chapters["Delhi"];
    if (subjectName === 'Maths') return (maths1Chapters[state] || maths1Chapters["Delhi"]).concat(maths2Chapters[state] || maths2Chapters["Delhi"]);
    if (subjectName === 'History') return historyChapters[state] || historyChapters["Delhi"];
    if (subjectName === 'Geography') return geographyChapters[state] || geographyChapters["Delhi"];
    if (subjectName === 'Civics') return civicsChapters[state] || civicsChapters["Delhi"];
    if (subjectName === 'Economics') return economicsChapters[state] || economicsChapters["Delhi"];
    return ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"];
}

function getChapterVideoConfig(chapterName, subjectName) {
    const norm = chapterName.toLowerCase();
    const isMaths = ['Maths', 'Maths 1', 'Maths 2'].includes(subjectName);
    
    if (isMaths) {
        if (norm.includes('real numbers')) return [{ label: "One-shot", embedUrl: "https://www.youtube.com/embed/MX1iSpb4tRE", title: "Real Numbers One-shot" }, { label: "PYQs", embedUrl: "https://www.youtube.com/embed/jbpt9NJ2ZFo", title: "Real Numbers PYQs" }];
        if (norm.includes('quadratic')) return [{ label: "One-shot", embedUrl: "https://www.youtube.com/embed/hayFtYnAB-Q", title: "Quadratic Equations One-shot" }];
        if (norm.includes('trigonometry')) return [{ label: "One-shot", embedUrl: "https://www.youtube.com/embed/wdaBwIv7Jso", title: "Introduction to Trigonometry One-shot" }];
        if (norm.includes('triangles')) return [{ label: "One-shot", embedUrl: "https://www.youtube.com/embed/nxo1ItY3oTo", title: "Triangles One-shot" }];
    }
    
    if (subjectName === 'Science 1') {
        if (norm.includes('light')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8Rwv2hvdZFo", title: "Light – Reflection and Refraction One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/iE0Y27qDnRY", title: "Light – Reflection and Refraction PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/7WN1uzbgEac", title: "Light – Reflection and Refraction Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/IfWAhHZl1FY", title: "Light – Reflection and Refraction Revision" }
        ];
        if (norm.includes('human eye') || norm.includes('colourful world')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/VWNxgkOr55Y", title: "Human Eye and Colourful World One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/-MANeQgSyVo", title: "Human Eye and Colourful World PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/xgdYoZhyRj8", title: "Human Eye and Colourful World Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/ntvqlm2ZXqk", title: "Human Eye and Colourful World Revision" }
        ];
        if (norm.includes('electricity')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/J3DvsZfYEfs", title: "Electricity One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/zEOm4Fvye-A", title: "Electricity PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/dAOA_LF3xqU", title: "Electricity Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/UI8nM-dSfh4", title: "Electricity Revision" }
        ];
        if (norm.includes('magnetic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/5YMxdILh5II", title: "Magnetic Effects of Electric Current One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/f_9vj2dnGd8", title: "Magnetic Effects of Electric Current PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/7-gY8zZWu3E", title: "Magnetic Effects of Electric Current Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/D5rouymJ_UA", title: "Magnetic Effects of Electric Current Revision" }
        ];
        if (norm.includes('chemical reactions')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/gQ-X9wV8TXQ", title: "Chemical Reactions and Equations One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/G7QPE3rDnhY", title: "Chemical Reactions and Equations PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/_Wv97T-ekSM", title: "Chemical Reactions and Equations Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/TfXOwxXprtE", title: "Chemical Reactions and Equations Revision" }
        ];
        if (norm.includes('acids')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/qKl4mieovu0", title: "Acids, Bases and Salts One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/14ihi1h0dOg", title: "Acids, Bases and Salts PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/gVTM87Zpeec", title: "Acids, Bases and Salts Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/7k2rs5yGOFM", title: "Acids, Bases and Salts Revision" }
        ];
        if (norm.includes('metals')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/YV1BFWi-AWY", title: "Metals and Non-metals One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/1ndFVZiAAW4", title: "Metals and Non-metals PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/ERTeJFYDY-w", title: "Metals and Non-metals Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/NsbZY_b0D8k", title: "Metals and Non-metals Revision" }
        ];
        if (norm.includes('carbon')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/7pGHWkSRFU4", title: "Carbon and its Compounds One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/bbfH9cWedSo", title: "Carbon and its Compounds PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/6zIU7YebW10", title: "Carbon and its Compounds Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/Ff0t3zTzgR8", title: "Carbon and its Compounds Revision" }
        ];
        if (norm.includes('periodic')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8B9C0D1E2F", title: "Periodic Classification One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/9C0D1E2F3G", title: "Periodic Classification PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/0D1E2F3G4H", title: "Periodic Classification Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/1E2F3G4H5I", title: "Periodic Classification Revision" }
        ];
        if (norm.includes('gravitation')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/2F3G4H5I6J", title: "Gravitation One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/3G4H5I6J7K", title: "Gravitation PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/4H5I6J7K8L", title: "Gravitation Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/5I6J7K8L9M", title: "Gravitation Revision" }
        ];
        if (norm.includes('heat')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/6J7K8L9M0N", title: "Heat One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/7K8L9M0N1O", title: "Heat PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/8L9M0N1O2P", title: "Heat Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/9M0N1O2P3Q", title: "Heat Revision" }
        ];
        if (norm.includes('lenses')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/0N1O2P3Q4R", title: "Lenses One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/1O2P3Q4R5S", title: "Lenses PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/2P3Q4R5S6T", title: "Lenses Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/3Q4R5S6T7U", title: "Lenses Revision" }
        ];
        if (norm.includes('metallurgy')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/4R5S6T7U8V", title: "Metallurgy One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/5S6T7U8V9W", title: "Metallurgy PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/6T7U8V9W0X", title: "Metallurgy Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/7U8V9W0X1Y", title: "Metallurgy Revision" }
        ];
        if (norm.includes('space')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/8V9W0X1Y2Z", title: "Space Missions One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/9W0X1Y2Z3A", title: "Space Missions PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/0X1Y2Z3A4B", title: "Space Missions Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/1Y2Z3A4B5C", title: "Space Missions Revision" }
        ];
        if (norm.includes('effects of electric current')) return [
            { label: "One-shot", embedUrl: "https://www.youtube.com/embed/2Z3A4B5C6D", title: "Effects of Electric Current One-shot" },
            { label: "PYQs", embedUrl: "https://www.youtube.com/embed/3A4B5C6D7E", title: "Effects of Electric Current PYQs" },
            { label: "Question & Answers", embedUrl: "https://www.youtube.com/embed/4B5C6D7E8F", title: "Effects of Electric Current Question & Answers" },
            { label: "Revision", embedUrl: "https://www.youtube.com/embed/5C6D7E8F9G", title: "Effects of Electric Current Revision" }
        ];
    }
    
    return null;
}

function openSubjects() {
    if (!AppState.selectedState || !AppState.selectedClass) return;
    
    const subjectsView = document.getElementById('subjects-view');
    if (!subjectsView) return;
    
    subjectsView.innerHTML = `
        <div class="profile-header">
            <h2>Subjects</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${AppState.selectedBoard} • Class ${AppState.selectedClass}</p>
        </div>
        <div id="subjects-grid" class="subjects-grid"></div>
    `;
    
    const grid = document.getElementById('subjects-grid');
    const subjects = getSubjectsList();
    
    subjects.forEach(sub => {
        const chapters = getChaptersForSubject(sub.name);
        const prog = computeSubjectProgress(sub.name, chapters);
        const circ = 100.53, dash = (prog.percent / 100) * circ;
        
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <div class="subject-icon" style="color: ${sub.color}; background: ${sub.color}20;"><i class="ph ${sub.icon}"></i></div>
            <h4>${sub.name}</h4>
            <div class="subject-progress-circle" title="${prog.completed}/${prog.total} chapters">
                <svg viewBox="0 0 40 40" class="subject-progress-svg">
                    <circle class="subject-progress-bg" cx="20" cy="20" r="16"></circle>
                    <circle class="subject-progress-fg" cx="20" cy="20" r="16" style="stroke-dasharray: ${dash} ${circ};"></circle>
                </svg>
                <span class="subject-progress-text">${prog.percent}%</span>
            </div>`;
        card.addEventListener('click', () => {
            openChapters(sub.name);
            switchView('chapters-view', document.getElementById('nav-subjects'));
        });
        grid.appendChild(card);
    });
    
    updateOverallSyllabusProgress();
}

function openChapters(subjectName) {
    const chaptersView = document.getElementById('chapters-view');
    if (!chaptersView) return;
    
    chaptersView.innerHTML = `
        <div class="profile-header" style="display: flex; align-items: center; justify-content: center; position: relative;">
            <button id="back-to-subjects" class="icon-btn" style="position: absolute; left: 0; border:none; background:none; cursor:pointer; color: var(--text-primary);">
                <i class="ph ph-arrow-left" style="font-size: 24px;"></i>
            </button>
            <div>
                <h2 style="margin-bottom: 0;">${subjectName}</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${AppState.selectedBoard} • Class ${AppState.selectedClass}</p>
            </div>
        </div>
        <div id="chapters-list" class="profile-menu"></div>
    `;
    
    document.getElementById('back-to-subjects').addEventListener('click', () => {
        openSubjects();
        switchView('subjects-view', document.getElementById('nav-subjects'));
    });
    
    const list = document.getElementById('chapters-list');
    const chapters = getChaptersForSubject(subjectName);
    
    chapters.forEach((chapter, idx) => {
        const plain = stripChapterMarkup(chapter);
        const videoConf = getChapterVideoConfig(plain, subjectName);
        const hasVideo = Boolean(videoConf);
        const completed = isChapterCompleted(subjectName, plain);
        
        const item = document.createElement('div');
        item.className = 'menu-item chapter-menu-item';
        if (completed) item.classList.add('chapter-completed');
        
        item.innerHTML = `
            <div class="menu-icon-wrap" style="color:#a855f7; background:rgba(168,85,247,0.1); width:36px; height:36px; min-width:36px; border-radius:10px; display:flex; align-items:center; justify-content:center;"><span style="font-size:15px; font-weight:700; line-height:1;">${idx + 1}</span></div>
            <div class="chapter-text-wrap"><span style="line-height:1.3;">${chapter}</span><p class="chapter-hold-hint">Hold to Tick</p></div>
            ${completed ? '<i class="ph ph-check-circle chapter-check-icon"></i>' : '<i class="ph ph-caret-right chevron"></i>'}
        `;
        
        let timer = null, didHold = false;
        
        item.addEventListener('pointerdown', () => {
            didHold = false;
            timer = setTimeout(() => {
                didHold = true;
                AppState.suppressChapterClickUntil = Date.now() + 400;
                toggleChapterCompleted(subjectName, plain);
                openChapters(subjectName);
                openSubjects();
                updateOverallSyllabusProgress();
            }, HOLD_TO_TICK_MS);
        });
        
        const clearTimer = () => { if (timer) { clearTimeout(timer); timer = null; } };
        item.addEventListener('pointerup', clearTimer);
        item.addEventListener('click', () => {
            if (didHold) return;
            if (Date.now() < AppState.suppressChapterClickUntil) return;
            if (hasVideo) {
                openChapterDetail(plain, subjectName, videoConf);
                switchView('chapter-detail-view', document.getElementById('nav-subjects'));
            }
        });
        item.addEventListener('pointerleave', clearTimer);
        item.addEventListener('pointercancel', clearTimer);
        
        list.appendChild(item);
    });
}

function setupChapterVideoTracking(subjectName, chapterName, videoConfig) {
    if (!AppState.youtubeApiReady || !(window.YT && window.YT.Player)) return;
    clearYouTubeTracking();
    
    videoConfig.forEach((video, idx) => {
        const iframeId = `chapter-video-iframe-${idx}`;
        try {
            const player = new YT.Player(iframeId, {
                events: {
                    onStateChange: (event) => {
                        if (event.data === YT.PlayerState.PLAYING) {
                            const interval = setInterval(() => {
                                const dur = player.getDuration ? player.getDuration() : 0;
                                const cur = player.getCurrentTime ? player.getCurrentTime() : 0;
                                if (!dur) return;
                                const percent = Math.min(100, Math.round((cur / dur) * 100));
                                storeContinueLearningProgress({
                                    board: AppState.selectedBoard, state: AppState.selectedState, class: AppState.selectedClass,
                                    subject: subjectName, chapter: chapterName, chapterNumber: 1,
                                    videoLabel: video.label, videoTitle: video.title, videoIndex: idx,
                                    videoEmbedUrl: video.embedUrl, progressPercent: percent,
                                    currentSeconds: Math.round(cur), durationSeconds: Math.round(dur)
                                });
                            }, 2000);
                            AppState.playerProgressIntervals.push(interval);
                        }
                        if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            AppState.playerProgressIntervals.forEach(clearInterval);
                            AppState.playerProgressIntervals = [];
                        }
                    }
                }
            });
            AppState.activeYouTubePlayers.push(player);
        } catch(e) {
            console.warn('Failed to create YT player for', iframeId, e);
        }
    });
}

function openChapterDetail(chapterName, subjectName, videoConfig, preferred = null) {
    const chapterDetailView = document.getElementById('chapter-detail-view');
    if (!chapterDetailView) return;
    
    chapterDetailView.innerHTML = `
        <div class="profile-header" style="display: flex; align-items: center; justify-content: center; position: relative;">
            <button id="back-to-chapters" class="icon-btn" style="position: absolute; left: 0; border:none; background:none; cursor:pointer; color: var(--text-primary);">
                <i class="ph ph-arrow-left" style="font-size: 24px;"></i>
            </button>
            <div>
                <h2 style="margin-bottom: 0;">${chapterName}</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${subjectName} • ${AppState.selectedBoard} • Class ${AppState.selectedClass}</p>
            </div>
        </div>
        <div id="chapter-detail-content" class="profile-menu"></div>
    `;
    
    document.getElementById('back-to-chapters').addEventListener('click', () => {
        switchView('chapters-view', document.getElementById('nav-subjects'));
    });
    
    const content = document.getElementById('chapter-detail-content');
    let html = '<div style="display:grid; gap:14px;">';
    videoConfig.forEach((v, i) => {
        html += `
            <div data-video-label="${v.label}" style="margin-bottom:16px;">
                <p style="font-size:12px; color:var(--text-secondary); margin:0 0 8px;">${v.label}</p>
                <div style="position:relative; width:100%; padding-top:56.25%; border-radius:12px; overflow:hidden; background:#000;">
                    <iframe id="chapter-video-iframe-${i}" src="${toEmbedWithApi(v.embedUrl)}" 
                        title="${v.title}" style="position:absolute; inset:0; width:100%; height:100%; border:0;" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
            </div>`;
    });
    html += '</div>';
    content.innerHTML = html;
    
    setTimeout(() => {
        setupChapterVideoTracking(subjectName, chapterName, videoConfig);
        if (preferred) {
            const target = content.querySelector(`[data-video-label="${preferred}"]`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.style.outline = '1px solid rgba(139,92,246,0.6)';
                setTimeout(() => target.style.outline = 'none', 1200);
            }
        }
    }, 80);
}
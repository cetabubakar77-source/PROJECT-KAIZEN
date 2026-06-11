// ========== ADAPTIVE DASHBOARD UI ==========

function openAdaptiveView() {
    var container = document.getElementById('adaptive-view');
    if (!container) return;

    var profile = (typeof KAIZEN_ENGINE !== 'undefined') ? KAIZEN_ENGINE.getProfile() : null;
    if (!profile) {
        container.innerHTML = '<div style="padding:40px;text-align:center;color:#a0a0a0;">Adaptive engine loading...</div>';
        return;
    }

    var readiness = KAIZEN_ENGINE.getReadinessBreakdown(profile);
    var todaysPlan = KAIZEN_ENGINE.getTodaysPlan(profile);
    var dailyInsight = KAIZEN_ENGINE.getDailyInsight(profile);
    var revisionsNeeded = KAIZEN_ENGINE.getChaptersNeedingRevision(profile, { maxResults: 5 });
    var nextChapters = KAIZEN_ENGINE.getRecommendedNext(profile, { maxResults: 5 });
    var weakTopics = KAIZEN_ENGINE.getWeakTopics(profile).slice(0, 5);
    var recallList = KAIZEN_ENGINE.getTodaysRecallList(profile);

    var readinessColor = readiness.overall >= 80 ? '#22c55e' : readiness.overall >= 60 ? '#A6FF1F' : readiness.overall >= 40 ? '#f59e0b' : '#ef4444';

    var html = '';

    // Header
    html += '<div class="adaptive-header"><h2>Adaptive Learning</h2>';
    html += '<p class="adaptive-subtitle">Personalized insights for your board exam prep</p></div>';

    // Daily Insight Banner
    var iconMap = { celebration: 'ph-trophy', urgent: 'ph-warning', revision: 'ph-book-open', warning: 'ph-lightbulb', suggestion: 'ph-arrow-right-circle', progress: 'ph-chart-bar' };
    var iconClass = iconMap[dailyInsight.type] || 'ph-lightbulb';
    html += '<div class="adaptive-insight-card">';
    html += '<div class="adaptive-insight-icon"><i class="ph-fill ' + iconClass + '"></i></div>';
    html += '<div class="adaptive-insight-content">';
    html += '<p class="adaptive-insight-text">' + dailyInsight.message + '</p>';
    html += '<span class="adaptive-insight-action">' + dailyInsight.action + '</span>';
    html += '</div></div>';

    // Exam Readiness Score
    html += '<div class="adaptive-section"><h3>Exam Readiness</h3>';
    html += '<div class="adaptive-readiness-card">';
    html += '<div class="adaptive-readiness-circle"><svg viewBox="0 0 36 36">';
    html += '<path class="readiness-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>';
    html += '<path class="readiness-progress" stroke-dasharray="' + readiness.overall + ', 100" stroke="' + readinessColor + '" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>';
    html += '<text x="18" y="16" class="readiness-text">' + readiness.overall + '%</text>';
    html += '<text x="18" y="22" class="readiness-label">' + (readiness.label ? readiness.label.text : 'Starting') + '</text>';
    html += '</svg></div>';
    html += '<div class="adaptive-readiness-stats">';
    html += '<div class="adaptive-stat-item"><span class="adaptive-stat-value">' + readiness.completion + '%</span><span class="adaptive-stat-label">Completed</span></div>';
    html += '<div class="adaptive-stat-item"><span class="adaptive-stat-value">' + readiness.avgRetention + '%</span><span class="adaptive-stat-label">Retention</span></div>';
    html += '<div class="adaptive-stat-item"><span class="adaptive-stat-value">' + readiness.streak + '</span><span class="adaptive-stat-label">Streak</span></div>';
    var daysLeft = readiness.daysToExam !== null ? readiness.daysToExam + ' days' : '—';
    html += '<div class="adaptive-stat-item"><span class="adaptive-stat-value">' + daysLeft + '</span><span class="adaptive-stat-label">To Exam</span></div>';
    html += '</div></div></div>';

    // Today's Study Plan
    if (todaysPlan) {
        var pct = Math.min(100, Math.round((todaysPlan.todayHoursStudied / todaysPlan.dailyStudyGoal) * 100));
        html += '<div class="adaptive-section"><h3>Today\'s Plan</h3>';
        html += '<div class="adaptive-todays-card">';
        html += '<div class="adaptive-todays-info">';
        html += '<span class="adaptive-todays-week">Week ' + (todaysPlan.currentWeek || 1) + '</span>';
        html += '<span class="adaptive-todays-hours">Studied: ' + todaysPlan.todayHoursStudied.toFixed(1) + 'h / ' + todaysPlan.dailyStudyGoal + 'h</span>';
        html += '</div>';
        html += '<div class="adaptive-progress-bar"><div class="adaptive-progress-fill" style="width:' + pct + '%;"></div></div>';
        html += '</div></div>';
    }

    // Revisions Needed
    if (revisionsNeeded && revisionsNeeded.length > 0) {
        html += '<div class="adaptive-section"><h3>Needs Revision</h3>';
        for (var i = 0; i < revisionsNeeded.length; i++) {
            var ch = revisionsNeeded[i];
            html += '<div class="adaptive-chapter-card revision-needed">';
            html += '<div class="adaptive-chapter-info">';
            html += '<span class="adaptive-chapter-name">' + ch.chapter + '</span>';
            html += '<span class="adaptive-chapter-subject">' + (ch.subject || '') + '</span>';
            html += '</div>';
            html += '<div class="adaptive-chapter-badges">';
            html += '<span class="badges retention">' + ch.retention + '%</span>';
            html += '<span class="badges urgency">' + ch.daysSinceStudy + 'd ago</span>';
            html += '</div></div>';
        }
        html += '</div>';
    }

    // Recommended Next
    if (nextChapters && nextChapters.length > 0) {
        html += '<div class="adaptive-section"><h3>Study Next</h3>';
        for (var i = 0; i < nextChapters.length; i++) {
            var ch = nextChapters[i];
            var meta = (typeof window.CHAPTER_META !== 'undefined') ? (window.CHAPTER_META[ch.chapter] || null) : null;
            html += '<div class="adaptive-chapter-card recommended">';
            html += '<div class="adaptive-chapter-info">';
            html += '<span class="adaptive-chapter-name">' + ch.chapter + '</span>';
            html += '<span class="adaptive-chapter-subject">' + (ch.subject || '') + '</span>';
            html += '</div>';
            html += '<div class="adaptive-chapter-badges">';
            if (meta && meta.marks) html += '<span class="badges marks">' + meta.marks + ' marks</span>';
            html += '<span class="badges priority">Priority: ' + Math.round(ch.priority) + '</span>';
            html += '</div></div>';
        }
        html += '</div>';
    }

    // Weak Topics
    if (weakTopics && weakTopics.length > 0) {
        html += '<div class="adaptive-section"><h3>Weak Topics</h3>';
        for (var i = 0; i < weakTopics.length; i++) {
            var wt = weakTopics[i];
            var ch = wt.chapterData;
            var statusColor = wt.status ? wt.status.color : '#ef4444';
            html += '<div class="adaptive-chapter-card weak-topic">';
            html += '<div class="adaptive-chapter-info">';
            html += '<span class="adaptive-chapter-name">' + (ch ? ch.chapter : wt.chapter) + '</span>';
            html += '<span class="adaptive-chapter-subject">' + wt.reason + '</span>';
            html += '</div>';
            html += '<span class="badges retention" style="color:' + statusColor + '">' + wt.retention + '%</span>';
            html += '</div>';
        }
        html += '</div>';
    }

    // Active Recall Due
    if (recallList && recallList.length > 0) {
        html += '<div class="adaptive-section"><h3>Recall Due Today</h3>';
        for (var i = 0; i < recallList.length; i++) {
            var ch = recallList[i];
            html += '<div class="adaptive-chapter-card recall-due">';
            html += '<div class="adaptive-chapter-info">';
            html += '<span class="adaptive-chapter-name">' + ch.chapter + '</span>';
            html += '<span class="adaptive-chapter-subject">' + (ch.subject || '') + '</span>';
            html += '</div>';
            html += '<span class="badges recall">Recall Now</span>';
            html += '</div>';
        }
        html += '</div>';
    }

    // Subject-wise breakdown
    if (readiness.subjectWise) {
        html += '<div class="adaptive-section"><h3>Subject Analysis</h3>';
        var subjectKeys = Object.keys(readiness.subjectWise);
        for (var i = 0; i < subjectKeys.length; i++) {
            var subjectName = subjectKeys[i];
            var data = readiness.subjectWise[subjectName];
            var subRetention = Math.round(data.avgRetention);
            var subColor = subRetention >= 70 ? '#22c55e' : subRetention >= 40 ? '#f59e0b' : '#ef4444';
            html += '<div class="adaptive-subject-card">';
            html += '<span class="adaptive-subject-name">' + subjectName + '</span>';
            html += '<div class="adaptive-subject-stats">';
            html += '<span class="badges retention" style="color:' + subColor + '">Retention: ' + subRetention + '%</span>';
            html += '<span class="badges">Done: ' + data.completionPercent + '%</span>';
            html += '<span class="badges">Weak: ' + data.weakCount + '</span>';
            html += '</div></div>';
        }
        html += '</div>';
    }

    container.innerHTML = html;
}

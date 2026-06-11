// ========== ADAPTIVE ENGINE SYNC ==========
// Called after onboarding and on app load to sync all chapters

function syncProgressToAdaptiveEngine() {
    if (typeof KAIZEN_ENGINE === 'undefined') {
        console.warn('KAIZEN_ENGINE not loaded yet');
        return;
    }
    if (!AppState.selectedState || !AppState.selectedClass) return;

    var profile = KAIZEN_ENGINE.getProfile();
    var subjects = (typeof getSubjectsList === 'function') ? getSubjectsList() : [];
    var addedCount = 0;
    var updatedCount = 0;

    subjects.forEach(function(sub) {
        var chapters = (typeof getChaptersForSubject === 'function') ? getChaptersForSubject(sub.name) : [];
        if (!chapters) return;

        chapters.forEach(function(chapter) {
            var plain = (typeof stripChapterMarkup === 'function') ? stripChapterMarkup(chapter) : chapter;
            var chapterKey = sub.name + '|' + plain;
            var isCompleted = (typeof isChapterCompleted === 'function')
                ? isChapterCompleted(sub.name, plain) : false;

            if (!profile.chapters[chapterKey]) {
                // New chapter — initialize
                profile.chapters[chapterKey] = {
                    status: isCompleted ? 'completed' : 'not_started',
                    subject: sub.name,
                    chapter: plain,
                    firstStartedAt: isCompleted ? Date.now() : null,
                    completedAt: isCompleted ? Date.now() : null,
                    lastStudiedAt: isCompleted ? Date.now() : null,
                    studyCount: isCompleted ? 1 : 0,
                    totalStudyMinutes: 0,
                    videoWatchPercent: 0,
                    videoRewatchCount: 0,
                    quizScores: [],
                    recallResults: [],
                    revisionDates: [],
                    retentionScore: 0,
                    priorityScore: 0,
                    skipped: false
                };
                addedCount++;
            } else if (isCompleted && profile.chapters[chapterKey].status !== 'completed') {
                // Update existing chapter that was already completed in old data
                profile.chapters[chapterKey].status = 'completed';
                profile.chapters[chapterKey].completedAt = Date.now();
                if (!profile.chapters[chapterKey].studyCount) {
                    profile.chapters[chapterKey].studyCount = 1;
                }
                updatedCount++;
            }
        });
    });

    // Initialize study plan dates if not set
    if (!profile.studyPlan.startDate) {
        profile.studyPlan.startDate = Date.now();
    }
    if (!profile.studyPlan.targetExamDate) {
        var now = new Date();
        var examYear = now.getMonth() >= 2 ? now.getFullYear() + 1 : now.getFullYear();
        profile.studyPlan.targetExamDate = new Date(examYear, 2, 15).getTime();
    }

    // Save
    KAIZEN_ENGINE.saveProfile(profile);
    console.log('Adaptive engine synced: +' + addedCount + ' new, ' + updatedCount + ' updated, total: ' + Object.keys(profile.chapters).length);
}

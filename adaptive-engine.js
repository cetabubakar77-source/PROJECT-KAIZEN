// ============================================================
// KAIZEN ADAPTIVE LEARNING ENGINE v1.0
// ============================================================
// Lightweight, deterministic, rule-based adaptive learning system
// Minimal AI usage — core logic is algorithmic
// ============================================================

const KAIZEN_ENGINE = (() => {

  // ==========================================================
  // 1. CONSTANTS & CONFIG
  // ==========================================================

  const STORAGE_KEY = 'kaizen_adaptive';
  const MAX_STREAK_DAYS = 365;
  const RETENTION_HALF_LIFE = 7; // days for memory to decay to 50%
  const INACTIVITY_THRESHOLD = 3; // days before flagged inactive
  const BURNOUT_THRESHOLD = 6; // consecutive hours before burnout warning
  const RECALL_INTERVALS = [1, 3, 7, 14, 30]; // days between recall sessions
  const WEIGHTAGE_IMPORTANCE = 0.4;
  const WEAKNESS_IMPORTANCE = 0.3;
  const URGENCY_IMPORTANCE = 0.2;
  const DIFFICULTY_IMPORTANCE = 0.1;

  // ==========================================================
  // 2. DATA LAYER — Student Profile
  // ==========================================================

  function getProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const profile = JSON.parse(raw);
        if (profile.studyPlan && !profile.studyPlan.targetExamDate) {
          profile.studyPlan.targetExamDate = _getDefaultExamDate();
          saveProfile(profile);
        }
        return profile;
      }
    } catch (e) {}
    const profile = createDefaultProfile();
    profile.studyPlan.targetExamDate = _getDefaultExamDate();
    profile.studyPlan.startDate = Date.now();
    saveProfile(profile);
    return profile;
  }

  function _getDefaultExamDate() {
    const now = new Date();
    const year = now.getMonth() >= 2 ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(year, 2, 15).getTime();
  }

  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('KAIZEN_ENGINE: Failed to save profile', e);
    }
  }

  function createDefaultProfile() {
    const userId = localStorage.getItem('currentUserId') || 'guest';
    return {
      version: 1,
      userId,
      createdAt: Date.now(),

      // Study behavior
      studySessions: [],       // [{start, end, durationMinutes, chaptersCovered[], date}]
      dailyStudyHours: {},     // { "2025-06-15": 2.5 }
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      totalStudyMinutes: 0,
      avgSessionMinutes: 0,

      // Chapter-level tracking
      chapters: {},  // key = "Science 1|Chemical Reactions and Equations"
                       // value: see createDefaultChapterData()

      // Quiz / Recall tracking
      quizzes: [],           // [{chapter, score, total, timestamp, questions[]}]
      recallSessions: [],    // [{chapter, result: pass/fail, timestamp}]

      // Weak topics detection
      weakTopics: [],        // [{chapter, reason, score, timestamp}]

      // Study plan
      studyPlan: {
        startDate: null,
        targetExamDate: null,
        weeklySchedule: [],
        completedWeeks: 0,
        totalWeeks: 20,
        isCompressed: false,
        adjustmentHistory: [],
      },

      // AI usage tracking (for cost optimization)
      aiCalls: {
        total: 0,
        dailyCount: 0,
        lastResetDate: null,
        cache: {},  // { prompt_hash: { response, timestamp, ttl } }
      },

      // Settings
      dailyStudyGoalHours: 2,
      preferredStudyTime: null, // "morning" / "afternoon" / "evening"
      notificationsEnabled: false,
      adaptiveMode: true,
    };
  }

  function createDefaultChapterData() {
    return {
      status: 'not_started',     // not_started | in_progress | completed | revised
      firstStartedAt: null,
      completedAt: null,
      lastStudiedAt: null,
      studyCount: 0,             // how many times studied
      totalStudyMinutes: 0,
      videoWatchPercent: 0,
      videoRewatchCount: 0,
      lastWatchPosition: 0,
      summaryClicked: false,
      summaryTimestampClicks: [],
      revisionDates: [],         // timestamps of each revision
      quizScores: [],            // [80, 65, 90]
      recallResults: [],         // [true, false, true]
      confidenceLevel: 0,        // 0-100 self-reported or inferred
      difficulty: null,           // overridden by student feedback
      skipped: false,
      averageQuizScore: 0,
      retentionScore: 0,         // 0-100 calculated
      priorityScore: 0,          // 0-100 calculated
      nextRecallAt: null,
      nextRevisionAt: null,
    };
  }

  // ==========================================================
  // 3. EVENT TRACKING SYSTEM
  // ==========================================================

  const EVENTS = {
    CHAPTER_COMPLETED: 'chapter_completed',
    QUIZ_COMPLETED: 'quiz_completed',
    RECALL_FAILED: 'recall_failed',
    RECALL_PASSED: 'recall_passed',
    VIDEO_REWATCHED: 'video_rewatched',
    INACTIVITY_DETECTED: 'inactivity_detected',
    REVISION_COMPLETED: 'revision_completed',
    STUDY_SESSION_COMPLETED: 'study_session_completed',
    SUMMARY_CLICKED: 'summary_clicked',
    TIMESTAMP_CLICKED: 'timestamp_clicked',
    CHAPTER_SKIPPED: 'chapter_skipped',
    CONFIDENCE_UPDATED: 'confidence_updated',
    DAILY_GOAL_MET: 'daily_goal_met',
    STREAK_BROKEN: 'streak_broken',
    WEAK_TOPIC_DETECTED: 'weak_topic_detected',
  };

  /**
   * Track a learning event. This is the main entry point for all analytics.
   * @param {string} eventType — one of EVENTS constants
   * @param {object} payload — event-specific data
   */
  function trackEvent(eventType, payload = {}) {
    const profile = getProfile();
    const now = Date.now();
    const chapterKey = payload.subjectName && payload.chapterName
      ? `${payload.subjectName}|${payload.chapterName}`
      : null;

    switch (eventType) {

      case EVENTS.CHAPTER_COMPLETED:
        _ensureChapter(profile, chapterKey, payload);
        const ch = profile.chapters[chapterKey];
        ch.status = 'completed';
        ch.completedAt = now;
        ch.lastStudiedAt = now;
        ch.studyCount++;
        if (payload.studyMinutes) ch.totalStudyMinutes += payload.studyMinutes;
        if (payload.videoPercent) ch.videoWatchPercent = payload.videoPercent;
        break;

      case EVENTS.QUIZ_COMPLETED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          const qCh = profile.chapters[chapterKey];
          qCh.quizScores.push(payload.score);
          qCh.averageQuizScore = _average(qCh.quizScores);
        }
        profile.quizzes.push({
          chapter: chapterKey,
          score: payload.score,
          total: payload.total,
          timestamp: now,
          questions: payload.questions || [],
        });
        _updateWeakTopics(profile, chapterKey);
        break;

      case EVENTS.RECALL_PASSED:
      case EVENTS.RECALL_FAILED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          const rCh = profile.chapters[chapterKey];
          rCh.recallResults.push(eventType === EVENTS.RECALL_PASSED);
        }
        profile.recallSessions.push({
          chapter: chapterKey,
          result: eventType === EVENTS.RECALL_PASSED ? 'pass' : 'fail',
          timestamp: now,
        });
        break;

      case EVENTS.VIDEO_REWATCHED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          profile.chapters[chapterKey].videoRewatchCount++;
          profile.chapters[chapterKey].lastStudiedAt = now;
        }
        break;

      case EVENTS.SUMMARY_CLICKED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          profile.chapters[chapterKey].summaryClicked = true;
        }
        break;

      case EVENTS.TIMESTAMP_CLICKED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          profile.chapters[chapterKey].summaryTimestampClicks.push({
            timestamp: payload.videoTime,
            clickedAt: now,
          });
        }
        break;

      case EVENTS.REVISION_COMPLETED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          const revCh = profile.chapters[chapterKey];
          revCh.revisionDates.push(now);
          revCh.lastStudiedAt = now;
          revCh.status = 'revised';
        }
        break;

      case EVENTS.STUDY_SESSION_COMPLETED:
        _trackStudySession(profile, payload, now);
        break;

      case EVENTS.CHAPTER_SKIPPED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          profile.chapters[chapterKey].skipped = true;
        }
        break;

      case EVENTS.CONFIDENCE_UPDATED:
        if (chapterKey) {
          _ensureChapter(profile, chapterKey, payload);
          profile.chapters[chapterKey].confidenceLevel = payload.confidence || 0;
          profile.chapters[chapterKey].difficulty = payload.difficulty || null;
        }
        break;
    }

    // Post-event processing
    _postEventProcessing(profile, eventType, chapterKey, now);
    saveProfile(profile);
    return profile;
  }

  function _ensureChapter(profile, key, payload) {
    if (!key) return;
    if (!profile.chapters[key]) {
      profile.chapters[key] = createDefaultChapterData();
      profile.chapters[key] = Object.assign(profile.chapters[key], {
        subject: payload.subjectName || null,
        chapter: payload.chapterName || null,
        firstStartedAt: Date.now(),
      });
    }
  }

  function _trackStudySession(profile, payload, now) {
    const today = _dateKey(now);
    const duration = payload.durationMinutes || 0;

    profile.studySessions.push({
      start: payload.startAt || now - duration * 60000,
      end: now,
      durationMinutes: duration,
      chaptersCovered: payload.chaptersCovered || [],
      date: today,
    });

    profile.totalStudyMinutes += duration;
    profile.dailyStudyHours[today] = (profile.dailyStudyHours[today] || 0) + duration / 60;

    // Update streak
    const lastDate = profile.lastStudyDate;
    const todayDate = _dateKey(now);
    if (lastDate !== todayDate) {
      const yesterday = _dateKey(now - 86400000);
      if (lastDate === yesterday) {
        profile.currentStreak++;
        if (profile.currentStreak > profile.longestStreak) {
          profile.longestStreak = profile.currentStreak;
        }
      } else if (lastDate !== todayDate) {
        // Check if streak was broken
        if (profile.currentStreak > 0) {
          trackEvent(EVENTS.STREAK_BROKEN, { previousStreak: profile.currentStreak });
        }
        profile.currentStreak = 1;
      }
      profile.lastStudyDate = todayDate;
    }

    // Average session length
    profile.avgSessionMinutes = Math.round(
      profile.totalStudyMinutes / profile.studySessions.length
    );

    // Check daily goal
    if (profile.dailyStudyHours[today] >= profile.dailyStudyGoalHours) {
      trackEvent(EVENTS.DAILY_GOAL_MET, { hours: profile.dailyStudyHours[today] });
    }

    // Check for burnout (too many hours in one day)
    if (profile.dailyStudyHours[today] >= BURNOUT_THRESHOLD) {
      console.warn('KAIZEN_ENGINE: Burnout detected for student', profile.userId);
    }

    // Check for inactivity
    _checkInactivity(profile, now);
  }

  function _checkInactivity(profile, now) {
    if (!profile.lastStudyDate) return;
    const lastDate = new Date(profile.lastStudyDate);
    const daysSince = Math.floor((now - lastDate.getTime()) / 86400000);
    if (daysSince >= INACTIVITY_THRESHOLD && daysSince < 30) {
      trackEvent(EVENTS.INACTIVITY_DETECTED, { daysSince });
    }
  }

  function _postEventProcessing(profile, eventType, chapterKey, now) {
    // Recalculate retention for affected chapter
    if (chapterKey && profile.chapters[chapterKey]) {
      profile.chapters[chapterKey].retentionScore = calculateRetentionScore(
        profile, chapterKey
      );
    }

    // Recalculate priority scores periodically
    if (profile.studySessions.length % 3 === 0) {
      _recalcAllPriorities(profile);
    }

    // Study plan adjustments
    if (eventType === EVENTS.QUIZ_COMPLETED || eventType === EVENTS.RECALL_FAILED) {
      _adjustStudyPlanIfNeeded(profile);
    }
  }

  // ==========================================================
  // 4. RETENTION SCORE SYSTEM
  // ==========================================================

  /**
   * Calculate estimated memory strength for a chapter (0-100)
   * Uses exponential decay model based on:
   * - days since last revision
   * - quiz performance (weighted recent higher)
   * - recall success rate
   * - rewatch frequency (more rewatches = weaker memory)
   * - study consistency
   */
  function calculateRetentionScore(profile, chapterKey) {
    const ch = profile.chapters[chapterKey];
    if (!ch) return 0;

    const now = Date.now();

    // Time decay factor (exponential)
    // R = 100 * e^(-λt) where λ = ln(2) / half_life
    const daysSinceStudy = ch.lastStudiedAt
      ? (now - ch.lastStudiedAt) / 86400000
      : 999;
    const decayLambda = Math.log(2) / RETENTION_HALF_LIFE;
    const timeFactor = 100 * Math.exp(-decayLambda * daysSinceStudy);

    // Revision bonus (each review resets decay)
    const revisionBonus = Math.min(ch.revisionDates.length * 10, 30);

    // Quiz performance (weighted average, recent higher)
    let quizFactor = 0;
    if (ch.quizScores.length > 0) {
      const recent = ch.quizScores.slice(-3);
      quizFactor = _average(recent) * 0.3; // max 30 points
    }

    // Recall success rate
    let recallFactor = 0;
    if (ch.recallResults.length > 0) {
      const passRate = ch.recallResults.filter(Boolean).length / ch.recallResults.length;
      recallFactor = passRate * 20; // max 20 points
    }

    // Rewatch penalty (more rewatches = weaker memory)
    const rewatchPenalty = Math.min(ch.videoRewatchCount * 5, 20);

    // Confidence self-assessment
    const confidenceFactor = (ch.confidenceLevel || 0) * 0.2; // max 20 points

    // Study depth bonus
    const depthBonus = Math.min(ch.studyCount * 3, 15);

    const rawScore = timeFactor + revisionBonus + quizFactor + recallFactor
      - rewatchPenalty + confidenceFactor + depthBonus;

    return Math.max(0, Math.min(100, Math.round(rawScore)));
  }

  /**
   * Get retention status label for UI display
   */
  function getRetentionStatus(score) {
    if (score >= 80) return { label: 'Strong', color: '#22c55e' };
    if (score >= 50) return { label: 'Moderate', color: '#f59e0b' };
    if (score >= 25) return { label: 'Weak', color: '#ef4444' };
    return { label: 'Forgotten', color: '#6b7280' };
  }

  /**
   * Detect which chapters need revision NOW
   */
  function getChaptersNeedingRevision(profile, options = {}) {
    const now = Date.now();
    const maxResults = options.maxResults || 10;
    const subject = options.subject || null;

    const results = [];

    for (const [key, ch] of Object.entries(profile.chapters)) {
      if (ch.status === 'not_started') continue;
      if (subject && !key.startsWith(subject)) continue;

      const retention = calculateRetentionScore(profile, key);
      const daysSince = ch.lastStudiedAt
        ? (now - ch.lastStudiedAt) / 86400000
        : 999;

      // Check if recall is due
      const recallDue = _isRecallDue(ch, daysSince);

      if (retention < 60 || recallDue) {
        results.push({
          key,
          chapter: ch.chapter,
          subject: ch.subject,
          retention,
          daysSinceStudy: Math.round(daysSince),
          status: getRetentionStatus(retention),
          recallDue,
          urgency: _calculateUrgency(retention, daysSince),
          nextRecallIn: _nextRecallDays(ch, daysSince),
        });
      }
    }

    // Sort by urgency (highest first)
    results.sort((a, b) => b.urgency - a.urgency);
    return results.slice(0, maxResults);
  }

  function _isRecallDue(ch, daysSinceStudy) {
    if (ch.revisionDates.length === 0) {
      return daysSinceStudy >= RECALL_INTERVALS[0];
    }
    const nextInterval = RECALL_INTERVALS[Math.min(ch.revisionDates.length, RECALL_INTERVALS.length - 1)];
    return daysSinceStudy >= nextInterval;
  }

  function _nextRecallDays(ch, daysSinceStudy) {
    const nextInterval = RECALL_INTERVALS[Math.min(ch.revisionDates.length, RECALL_INTERVALS.length - 1)];
    return Math.max(0, Math.round(nextInterval - daysSinceStudy));
  }

  function _calculateUrgency(retention, daysSince) {
    // Lower retention + longer time = higher urgency
    const retentionUrgency = (100 - retention) / 100;
    const timeUrgency = Math.min(daysSince / 30, 1);
    return (retentionUrgency * 0.6 + timeUrgency * 0.4) * 100;
  }

  // ==========================================================
  // 5. PRIORITY ENGINE
  // ==========================================================

  /**
   * Calculate which chapter should be studied next (0-100 priority)
   * Factors:
   * - weakness score (low retention = high priority)
   * - exam weightage (high marks = high priority)
   * - urgency (close to exam = high priority)
   * - difficulty (hard chapters need more time)
   */
  function calculatePriorityScore(profile, chapterKey) {
    const ch = profile.chapters[chapterKey];
    if (!ch) return 0;

    const now = Date.now();

    // Get chapter weightage marks from global CHAPTER_META
    const meta = (typeof window.CHAPTER_META !== 'undefined')
      ? (window.CHAPTER_META[ch.chapter] || window.CHAPTER_META[ch.chapter.replace(/\s*–\s*/g, ' – ')] || null)
      : null;
    const marksWeight = meta ? (meta.marks / 10) * 100 : 50; // normalize to 0-100

    // Weakness score (inverse of retention)
    const retention = calculateRetentionScore(profile, chapterKey);
    const weaknessScore = 100 - retention;

    // Urgency (days until exam)
    const examDate = profile.studyPlan.targetExamDate;
    let urgencyScore = 50;
    if (examDate) {
      const daysToExam = (examDate - now) / 86400000;
      if (daysToExam <= 0) urgencyScore = 100;
      else if (daysToExam <= 7) urgencyScore = 90;
      else if (daysToExam <= 30) urgencyScore = 70;
      else if (daysToExam <= 60) urgencyScore = 50;
      else urgencyScore = 30;
    }

    // Difficulty score
    const difficultyMap = { Easy: 30, Medium: 60, Hard: 90 };
    const difficultyScore = difficultyMap[meta?.difficulty] || 50;

    // Combined weighted score
    const priority =
      weaknessScore * WEAKNESS_IMPORTANCE +
      marksWeight * WEIGHTAGE_IMPORTANCE +
      urgencyScore * URGENCY_IMPORTANCE +
      difficultyScore * DIFFICULTY_IMPORTANCE;

    return Math.round(Math.min(100, Math.max(0, priority)));
  }

  /**
   * Get recommended next chapters to study
   */
  function getRecommendedNext(profile, options = {}) {
    const subject = options.subject || null;
    const maxResults = options.maxResults || 5;
    const now = Date.now();

    const candidates = [];

    for (const [key, ch] of Object.entries(profile.chapters)) {
      if (ch.status === 'completed' || ch.status === 'revised') continue;
      if (subject && !key.startsWith(subject)) continue;

      // Find the subject name from the key
      const subjectName = key.split('|')[0];

      const priority = calculatePriorityScore(profile, key);
      const retention = ch.status === 'not_started' ? 0 : calculateRetentionScore(profile, key);

      // Calculate days since last study
      const daysSince = ch.lastStudiedAt ? (now - ch.lastStudiedAt) / 86400000 : 999;

      // Skip penalty (studied but skipped chapters get slight boost)
      const skipBoost = ch.skipped ? 10 : 0;

      candidates.push({
        key,
        chapter: ch.chapter,
        subject: subjectName,
        priority: priority + skipBoost,
        retention,
        status: ch.status,
        studyCount: ch.studyCount,
        daysSinceStudy: Math.round(daysSince),
      });
    }

    // Sort by priority (highest first)
    candidates.sort((a, b) => b.priority - a.priority);

    return candidates.slice(0, maxResults);
  }

  /**
   * Recalculate all priority scores
   */
  function _recalcAllPriorities(profile) {
    for (const key of Object.keys(profile.chapters)) {
      profile.chapters[key].priorityScore = calculatePriorityScore(profile, key);
    }
  }

  // ==========================================================
  // 6. WEAK TOPIC DETECTION
  // ==========================================================

  function _updateWeakTopics(profile, chapterKey) {
    if (!chapterKey) return;
    const ch = profile.chapters[chapterKey];
    if (!ch) return;

    const avgScore = ch.averageQuizScore;
    const retention = calculateRetentionScore(profile, chapterKey);

    let isWeak = false;
    let reason = '';

    if (avgScore > 0 && avgScore < 50) {
      isWeak = true;
      reason = 'Low quiz scores';
    } else if (retention < 30) {
      isWeak = true;
      reason = 'Low retention';
    } else if (ch.videoRewatchCount >= 3) {
      isWeak = true;
      reason = 'Frequent rewatches';
    } else if (ch.recallResults.length >= 2) {
      const recent = ch.recallResults.slice(-2);
      if (recent.every(r => !r)) {
        isWeak = true;
        reason = 'Repeated recall failures';
      }
    }

    // Update or add to weak topics
    const existingIdx = profile.weakTopics.findIndex(w => w.chapter === chapterKey);
    if (isWeak) {
      const entry = {
        chapter: chapterKey,
        reason,
        score: retention,
        timestamp: Date.now(),
      };
      if (existingIdx >= 0) {
        profile.weakTopics[existingIdx] = entry;
      } else {
        profile.weakTopics.push(entry);
        trackEvent(EVENTS.WEAK_TOPIC_DETECTED, {
          subjectName: ch.subject,
          chapterName: ch.chapter,
          reason,
        });
      }
    } else if (existingIdx >= 0) {
      // Remove from weak topics if improved
      profile.weakTopics.splice(existingIdx, 1);
    }
  }

  /**
   * Get all weak topics sorted by severity
   */
  function getWeakTopics(profile) {
    return [...profile.weakTopics]
      .sort((a, b) => a.score - b.score)
      .map(w => ({
        ...w,
        chapterData: profile.chapters[w.chapter] || null,
        retention: w.score,
        status: getRetentionStatus(w.score),
      }));
  }

  /**
   * Get subject-wise weakness analysis
   */
  function getSubjectWeakness(profile) {
    const subjects = {};
    for (const key of Object.keys(profile.chapters)) {
      const [subjectName, chapterName] = key.split('|');
      if (!subjects[subjectName]) {
        subjects[subjectName] = {
          chapters: 0,
          avgRetention: 0,
          avgQuizScore: 0,
          completedCount: 0,
          weakCount: 0,
          totalStudyMinutes: 0,
          retentionScores: [],
          quizScores: [],
        };
      }
      const s = subjects[subjectName];
      const ch = profile.chapters[key];
      s.chapters++;
      s.retentionScores.push(ch.retentionScore || calculateRetentionScore(profile, key));
      if (ch.averageQuizScore > 0) s.quizScores.push(ch.averageQuizScore);
      if (ch.status === 'completed' || ch.status === 'revised') s.completedCount++;
      s.totalStudyMinutes += ch.totalStudyMinutes || 0;
    }

    // Calculate averages
    for (const s of Object.values(subjects)) {
      s.avgRetention = _average(s.retentionScores);
      s.avgQuizScore = _average(s.quizScores);
      s.weakCount = s.retentionScores.filter(r => r < 50).length;
      s.completionPercent = Math.round((s.completedCount / s.chapters) * 100);
    }

    return subjects;
  }

  // ==========================================================
  // 7. ACTIVE RECALL ENGINE
  // ==========================================================

  /**
   * Check which chapters need active recall today
   */
  function getTodaysRecallList(profile) {
    const revisions = getChaptersNeedingRevision(profile, { maxResults: 5 });
    return revisions.filter(r => r.recallDue || r.retention < 40);
  }

  /**
   * Generate recall questions for a chapter
   * Uses cached AI calls with fallback to template questions
   */
  function generateRecallQuestions(chapterKey, count = 5) {
    const ch = window.CHAPTER_META ? window.CHAPTER_META[chapterKey.split('|')[1]] : null;
    const difficulty = ch ? ch.difficulty : 'Medium';

    // Template questions by subject type
    const templates = {
      science: [
        'What is the main concept of {chapter}?',
        'List the key formulae related to {chapter}.',
        'Explain the process of {chapter} in your own words.',
        'What are the common mistakes students make in {chapter}?',
        'Draw a labeled diagram for {chapter}.',
        'Why is {chapter} important for board exams?',
        'Compare and contrast the key terms in {chapter}.',
      ],
      maths: [
        'State the main formula/theorem for {chapter}.',
        'Solve one example problem from {chapter}.',
        'What are the steps to solve {chapter} problems?',
        'List the key identities used in {chapter}.',
        'What type of questions appear in {chapter} in board exams?',
      ],
      default: [
        'What are the key points of {chapter}?',
        'List the important dates/events in {chapter}.',
        'Explain the main concept of {chapter}.',
        'Why is {chapter} important?',
        'Summarize {chapter} in 5 bullet points.',
      ],
    };

    const subject = chapterKey.split('|')[0].toLowerCase();
    const chapterName = chapterKey.split('|')[1];
    const templateSet = subject.includes('science') ? templates.science
      : subject.includes('math') ? templates.maths
      : templates.default;

    // Shuffle and pick
    const shuffled = [...templateSet].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(t => t.replace('{chapter}', chapterName));
  }

  /**
   * Schedule next recall for a chapter
   */
  function scheduleNextRecall(profile, chapterKey, passed) {
    const ch = profile.chapters[chapterKey];
    if (!ch) return;

    const now = Date.now();
    const intervalIdx = Math.min(ch.revisionDates.length, RECALL_INTERVALS.length - 1);
    const baseInterval = RECALL_INTERVALS[intervalIdx];

    // If failed, schedule sooner
    const multiplier = passed ? 1 : 0.5;
    const nextDays = Math.max(1, Math.round(baseInterval * multiplier));

    ch.nextRecallAt = now + nextDays * 86400000;
    saveProfile(profile);
  }

  // ==========================================================
  // 8. DYNAMIC STUDY PLANNER
  // ==========================================================

  /**
   * Initialize or update the study plan
   */
  function initializeStudyPlan(profile, options = {}) {
    const now = Date.now();
    const examDate = options.examDate || _getDefaultExamDate();
    const totalWeeks = 20;

    profile.studyPlan = {
      startDate: now,
      targetExamDate: examDate,
      totalWeeks,
      completedWeeks: 0,
      weeklySchedule: [],
      isCompressed: false,
      adjustmentHistory: [],
    };

    // Generate initial weekly schedule
    _generateWeeklySchedule(profile);

    saveProfile(profile);
    return profile.studyPlan;
  }

  function _getDefaultExamDate() {
    // Default: March 15 of next year (typical board exam month)
    const now = new Date();
    let examYear = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();
    return new Date(examYear, 2, 15).getTime(); // March 15
  }

  /**
   * Generate weekly schedule based on available chapters and weightage
   */
  function _generateWeeklySchedule(profile) {
    const plan = profile.studyPlan;
    const allChapters = Object.entries(profile.chapters)
      .filter(([k, v]) => v.status !== 'completed')
      .map(([k, v]) => ({
        key: k,
        chapter: v.chapter,
        subject: v.subject,
        priority: v.priorityScore || calculatePriorityScore(profile, k),
        meta: window.CHAPTER_META ? (window.CHAPTER_META[v.chapter] || null) : null,
      }));

    // Sort by priority
    allChapters.sort((a, b) => b.priority - a.priority);

    // Distribute across weeks
    const chaptersPerWeek = Math.max(2, Math.ceil(allChapters.length / plan.totalWeeks));

    plan.weeklySchedule = [];
    for (let week = 0; week < plan.totalWeeks; week++) {
      const start = week * chaptersPerWeek;
      const end = start + chaptersPerWeek;
      const weekChapters = allChapters.slice(start, end).map(c => ({
        chapterKey: c.key,
        subject: c.subject,
        chapter: c.chapter,
        completed: false,
        marks: c.meta ? c.meta.marks : null,
      }));

      if (weekChapters.length > 0) {
        plan.weeklySchedule.push({
          week: week + 1,
          chapters: weekChapters,
          completed: false,
          revisionDay: week % 2 === 1, // Every other week is revision
        });
      }
    }
  }

  /**
   * Adjust study plan based on detected weaknesses, missed days, etc.
   */
  function _adjustStudyPlanIfNeeded(profile) {
    const plan = profile.studyPlan;
    if (!plan.startDate) return;

    const now = Date.now();
    const daysSinceStart = (now - plan.startDate) / 86400000;
    const expectedWeeks = Math.floor(daysSinceStart / 7);
    const actualWeeks = plan.completedWeeks;
    const behindBy = expectedWeeks - actualWeeks;

    // Check for missed days
    const missedDays = _getMissedDays(profile, 14);

    // Significant deviation detected
    if (behindBy >= 2 || missedDays >= 5) {
      console.log('KAIZEN_ENGINE: Adjusting study plan. Behind by', behindBy, 'weeks, missed', missedDays, 'days');

      // Compress remaining schedule
      const remainingWeeks = plan.totalWeeks - actualWeeks;
      const remainingChapters = Object.values(profile.chapters)
        .filter(ch => ch.status !== 'completed').length;

      if (remainingWeeks > 0 && remainingChapters > 0) {
        const newChaptersPerWeek = Math.ceil(remainingChapters / Math.max(remainingWeeks - 1, 1));

        plan.isCompressed = true;
        plan.adjustmentHistory.push({
          timestamp: now,
          reason: `Behind by ${behindBy} weeks, missed ${missedDays} days`,
          action: `Compressed to ${newChaptersPerWeek} chapters/week`,
        });

        // Regenerate remaining weeks
        _generateWeeklySchedule(profile);
      }
    }

    // Check for burnout — suggest lighter load
    const recentHours = _getRecentStudyHours(profile, 3);
    if (recentHours > 18) {
      plan.adjustmentHistory.push({
        timestamp: now,
        reason: 'Potential burnout detected',
        action: 'Suggested lighter study load',
      });
    }

    saveProfile(profile);
  }

  function _getMissedDays(profile, lookbackDays = 14) {
    const now = Date.now();
    let missed = 0;
    const today = _dateKey(now);

    for (let i = 1; i <= lookbackDays; i++) {
      const date = _dateKey(now - i * 86400000);
      if (profile.dailyStudyHours[date] < 0.5) { // less than 30 min
        missed++;
      }
    }
    return missed;
  }

  function _getRecentStudyHours(profile, days) {
    let total = 0;
    const now = Date.now();
    for (let i = 0; i < days; i++) {
      const date = _dateKey(now - i * 86400000);
      total += profile.dailyStudyHours[date] || 0;
    }
    return total;
  }

  /**
   * Get today's recommended study plan
   */
  function getTodaysPlan(profile) {
    const plan = profile.studyPlan;
    if (!plan.startDate) return null;

    const now = Date.now();
    const daysElapsed = Math.floor((now - plan.startDate) / 86400000);
    const currentWeek = Math.floor(daysElapsed / 7) + 1;
    const weekData = plan.weeklySchedule.find(w => w.week === currentWeek);

    const chaptersNeedingRevision = getChaptersNeedingRevision(profile, { maxResults: 3 });
    const nextChapters = getRecommendedNext(profile, { maxResults: 2 });
    const weakTopics = getWeakTopics(profile).slice(0, 3);

    return {
      currentWeek,
      weekData,
      chaptersNeedingRevision,
      nextChapters,
      weakTopics,
      isPlanCompressed: plan.isCompressed,
      daysToExam: plan.targetExamDate
        ? Math.max(0, Math.ceil((plan.targetExamDate - now) / 86400000))
        : null,
      dailyStudyGoal: profile.dailyStudyGoalHours,
      todayHoursStudied: profile.dailyStudyHours[_dateKey(now)] || 0,
      streak: profile.currentStreak,
    };
  }

  // ==========================================================
  // 9. EXAM READINESS SCORING
  // ==========================================================

  /**
   * Calculate overall exam readiness (0-100)
   */
  function calculateExamReadiness(profile) {
    const plan = profile.studyPlan;
    if (!plan.startDate) return 0;

    const now = Date.now();
    const totalChapters = Object.keys(profile.chapters).length;
    const completedChapters = Object.values(profile.chapters)
      .filter(ch => ch.status === 'completed' || ch.status === 'revised').length;
    const completionPercent = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

    // Average retention
    let totalRetention = 0;
    let retentionCount = 0;
    for (const key of Object.keys(profile.chapters)) {
      if (profile.chapters[key].status !== 'not_started') {
        totalRetention += calculateRetentionScore(profile, key);
        retentionCount++;
      }
    }
    const avgRetention = retentionCount > 0 ? totalRetention / retentionCount : 0;

    // Schedule adherence
    const daysSinceStart = (now - plan.startDate) / 86400000;
    const expectedProgress = plan.targetExamDate
      ? Math.min(100, (daysSinceStart / ((plan.targetExamDate - plan.startDate) / 86400000)) * 100)
      : 50;
    const scheduleAdherence = expectedProgress > 0
      ? Math.min(100, (completionPercent / expectedProgress) * 100)
      : 100;

    // Weak topics penalty
    const weakPenalty = Math.min(20, profile.weakTopics.length * 2);

    // Streak bonus
    const streakBonus = Math.min(10, profile.currentStreak);

    const readiness =
      completionPercent * 0.35 +
      avgRetention * 0.30 +
      scheduleAdherence * 0.20 +
      streakBonus -
      weakPenalty;

    return Math.max(0, Math.min(100, Math.round(readiness)));
  }

  /**
   * Get readiness breakdown for detailed UI
   */
  function getReadinessBreakdown(profile) {
    const readiness = calculateExamReadiness(profile);
    const subjectWeakness = getSubjectWeakness(profile);
    const weakTopics = getWeakTopics(profile);
    const revisionsNeeded = getChaptersNeedingRevision(profile);

    return {
      overall: readiness,
      label: _readinessLabel(readiness),
      completion: _getCompletionPercent(profile),
      avgRetention: _getAvgRetention(profile),
      scheduleAdherence: _getScheduleAdherence(profile),
      weakTopicsCount: weakTopics.length,
      revisionsNeededCount: revisionsNeeded.length,
      streak: profile.currentStreak,
      subjectWise: subjectWeakness,
      daysToExam: profile.studyPlan.targetExamDate
        ? Math.max(0, Math.ceil((profile.studyPlan.targetExamDate - Date.now()) / 86400000))
        : null,
    };
  }

  function _readinessLabel(score) {
    if (score >= 80) return { text: 'Exam Ready', color: '#22c55e' };
    if (score >= 60) return { text: 'Good Progress', color: '#A6FF1F' };
    if (score >= 40) return { text: 'Needs Work', color: '#f59e0b' };
    return { text: 'Behind Schedule', color: '#ef4444' };
  }

  function _getCompletionPercent(profile) {
    const total = Object.keys(profile.chapters).length;
    const done = Object.values(profile.chapters)
      .filter(c => c.status === 'completed' || c.status === 'revised').length;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  function _getAvgRetention(profile) {
    let total = 0, count = 0;
    for (const key of Object.keys(profile.chapters)) {
      if (profile.chapters[key].status !== 'not_started') {
        total += calculateRetentionScore(profile, key);
        count++;
      }
    }
    return count > 0 ? Math.round(total / count) : 0;
  }

  function _getScheduleAdherence(profile) {
    const plan = profile.studyPlan;
    if (!plan.startDate || !plan.targetExamDate) return 100;
    const elapsed = (Date.now() - plan.startDate) / 86400000;
    const total = (plan.targetExamDate - plan.startDate) / 86400000;
    return Math.min(100, Math.round((elapsed / total) * 100));
  }

  // ==========================================================
  // 10. AI PERSONALIZATION LAYER
  // ==========================================================

  /**
   * Check if we should use AI or use cached/template response
   */
  function shouldUseAI(profile, promptType) {
    // Reset daily counter
    const today = _dateKey(Date.now());
    if (profile.aiCalls.lastResetDate !== today) {
      profile.aiCalls.dailyCount = 0;
      profile.aiCalls.lastResetDate = today;
    }

    // Max 20 AI calls per day to control costs
    if (profile.aiCalls.dailyCount >= 20) return false;

    // Check cache for similar recent calls
    const cacheKey = _hashPrompt(promptType);
    const cached = profile.aiCalls.cache[cacheKey];
    if (cached && (Date.now() - cached.timestamp) < 3600000) { // 1 hour cache
      return false; // Use cache
    }

    return true;
  }

  /**
   * Record an AI call
   */
  function recordAICall(profile, promptType, response) {
    profile.aiCalls.total++;
    profile.aiCalls.dailyCount++;

    // Cache the response
    const cacheKey = _hashPrompt(promptType);
    profile.aiCalls.cache[cacheKey] = {
      response,
      timestamp: Date.now(),
      ttl: 3600000, // 1 hour
    };

    // Clean old cache entries
    _cleanAICache(profile);
    saveProfile(profile);
  }

  function _cleanAICache(profile) {
    const now = Date.now();
    for (const [key, val] of Object.entries(profile.aiCalls.cache)) {
      if (now - val.timestamp > val.ttl) {
        delete profile.aiCalls.cache[key];
      }
    }
  }

  /**
   * Generate a recovery plan for behind-schedule students
   * Uses template logic, only calls AI for personalization
   */
  function generateRecoveryPlan(profile) {
    const readiness = getReadinessBreakdown(profile);
    const weakSubjects = Object.entries(readiness.subjectWise)
      .filter(([_, s]) => s.avgRetention < 50)
      .map(([name, _]) => name);

    // Template-based recovery plan (no AI needed)
    const plan = {
      urgency: readiness.overall < 30 ? 'critical' : readiness.overall < 60 ? 'moderate' : 'normal',
      focusAreas: weakSubjects,
      dailyHoursNeeded: readiness.overall < 30 ? 4 : readiness.overall < 60 ? 3 : 2,
      keyActions: [],
      aiPrompt: null,
    };

    // Build template actions
    if (readiness.weakTopicsCount > 0) {
      plan.keyActions.push(`Revise ${readiness.weakTopicsCount} weak topics today`);
    }
    if (readiness.revisionsNeededCount > 0) {
      plan.keyActions.push(`${readiness.revisionsNeededCount} chapters need urgent revision`);
    }
    if (weakSubjects.length > 0) {
      plan.keyActions.push(`Extra focus needed on: ${weakSubjects.join(', ')}`);
    }
    if (readiness.streak === 0) {
      plan.keyActions.push('Start a new study streak today — even 30 minutes counts');
    }

    // Only use AI for personalization if needed and quota allows
    if (shouldUseAI(profile, 'recovery_plan')) {
      plan.aiPrompt = `Student has ${readiness.overall}% exam readiness with ${readiness.daysToExam} days left. Weak subjects: ${weakSubjects.join(', ')}. Generate a personalized 7-day recovery plan with daily chapter targets and motivational tips.`;

      // In real implementation, this would call Gemini API
      // recordAICall(profile, 'recovery_plan', response);
    }

    return plan;
  }

  /**
   * Adapt quiz difficulty based on student performance
   */
  function adaptQuizDifficulty(profile, chapterKey) {
    const ch = profile.chapters[chapterKey];
    if (!ch) return 'medium';

    const avgScore = ch.averageQuizScore;
    const retention = calculateRetentionScore(profile, chapterKey);

    if (avgScore >= 80 && retention >= 70) return 'hard';
    if (avgScore >= 50 || retention >= 40) return 'medium';
    return 'easy';
  }

  // ==========================================================
  // 11. PERSONALIZED INSIGHTS (Lightweight AI)
  // ==========================================================

  /**
   * Generate daily insight for the student
   * Rule-based, no AI needed for most cases
   */
  function getDailyInsight(profile) {
    const today = _dateKey(Date.now());
    const todayHours = profile.dailyStudyHours[today] || 0;
    const readiness = calculateExamReadiness(profile);
    const plan = getTodaysPlan(profile);

    // Rule-based insights
    if (todayHours === 0) {
      return {
        type: 'warning',
        message: `You haven't studied today. Your streak is ${profile.currentStreak} days. Even 30 minutes will keep it alive!`,
        action: 'Start a quick revision session',
        priority: 'high',
      };
    }

    if (plan && plan.chaptersNeedingRevision.length > 0) {
      const ch = plan.chaptersNeedingRevision[0];
      return {
        type: 'revision',
        message: `"${ch.chapter}" retention is low (${ch.retention}%). Time to revise!`,
        action: `Revise ${ch.chapter}`,
        priority: 'high',
      };
    }

    if (profile.currentStreak > 0 && profile.currentStreak % 7 === 0) {
      return {
        type: 'celebration',
        message: `Amazing! You've maintained a ${profile.currentStreak}-day study streak! 🔥`,
        action: 'Keep going!',
        priority: 'motivational',
      };
    }

    if (readiness < 30 && profile.studyPlan.daysToExam && profile.studyPlan.daysToExam < 60) {
      return {
        type: 'urgent',
        message: `Only ${profile.studyPlan.daysToExam} days to exam and readiness is ${readiness}%. Increase study hours now!`,
        action: 'Generate recovery plan',
        priority: 'urgent',
      };
    }

    if (plan && plan.nextChapters.length > 0) {
      const next = plan.nextChapters[0];
      return {
        type: 'suggestion',
        message: `Next recommended: "${next.chapter}" (Priority: ${next.priority}/100)`,
        action: `Start studying ${next.chapter}`,
        priority: 'normal',
      };
    }

    return {
      type: 'progress',
      message: `Great progress! Readiness: ${readiness}%. Keep it up!`,
      action: 'Continue your schedule',
      priority: 'normal',
    };
  }

  // ==========================================================
  // 12. UTILITY FUNCTIONS
  // ==========================================================

  function _dateKey(timestamp) {
    const d = new Date(timestamp);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function _average(arr) {
    if (!arr || arr.length === 0) return 0;
    return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
  }

  function _hashPrompt(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `ai_${Math.abs(hash)}`;
  }

  // ==========================================================
  // 13. PUBLIC API
  // ==========================================================

  return {
    // Data
    getProfile,
    saveProfile,
    createDefaultProfile,

    // Events
    EVENTS,
    trackEvent,

    // Retention
    calculateRetentionScore,
    getRetentionStatus,
    getChaptersNeedingRevision,

    // Priority
    calculatePriorityScore,
    getRecommendedNext,

    // Weak Topics
    getWeakTopics,
    getSubjectWeakness,

    // Active Recall
    getTodaysRecallList,
    generateRecallQuestions,
    scheduleNextRecall,

    // Study Plan
    initializeStudyPlan,
    getTodaysPlan,

    // Exam Readiness
    calculateExamReadiness,
    getReadinessBreakdown,

    // AI
    shouldUseAI,
    recordAICall,
    generateRecoveryPlan,
    adaptQuizDifficulty,

    // Insights
    getDailyInsight,

    // Constants
    RECALL_INTERVALS,
    RETENTION_HALF_LIFE,
  };

})();

// Export for global access
window.KAIZEN_ENGINE = KAIZEN_ENGINE;

console.log('KAIZEN Adaptive Learning Engine loaded v1.0');

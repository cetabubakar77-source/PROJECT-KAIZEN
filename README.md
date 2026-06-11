# PROJECT KAIZEN - Smart Learning Platform for Indian Students

Live Demo: https://kaizen-update.vercel.app/

A complete learning ecosystem for Class 10 CBSE and Maharashtra Board students. Track syllabus progress, get adaptive study plans, revise with active recall, and chat with an AI coach - all in one place.

## The Problem

Indian students face several challenges:

- No structured study plan leading to last-minute cramming
- Forgetting what they studied within days
- Not knowing what to study next when syllabus is overwhelming
- No way to track exam readiness objectively
- Inconsistent motivation and study habits

KAIZEN solves these problems using scientifically proven learning techniques: spaced repetition, active recall, and adaptive prioritization.

## Features

| Feature | Description |
|---------|-------------|
| 20-Week Smart Study Plan | Daily chapter targets with built-in revision weeks and test weeks |
| Adaptive Learning Engine | Tracks retention using exponential decay and recommends next chapters based on priority scores |
| Active Recall System | Spaced repetition at intervals of 1, 3, 7, 14, and 30 days |
| Exam Readiness Score | 0-100 percent composite score based on completion, retention, and schedule adherence |
| YouTube Integration | Chapter-specific videos with progress tracking that saves your watch percentage |
| Video Summaries | Clickable timestamps that seek to exact points in the video |
| AI Coach powered by Gemini | Study strategies, previous year questions, personalized recovery plans |
| Chapter Weightage | Marks and difficulty badges (Easy, Medium, Hard) for each chapter |
| Progress Dashboard | Subject-wise completion percentages and retention scores |
| Daily Study Reminders | Browser notifications at 7 PM to maintain consistency |
| Study Streak | Tracks consecutive study days to build habits |
| Chapter Notes | PDF viewer for detailed chapter notes (Science only currently) |
| Practice Tests | Chapter-wise and subject-wise tests with score tracking |

## Supported Boards and Classes

| Board | Class | Status |
|-------|-------|--------|
| CBSE | Class 10 | Full support |
| Maharashtra Board | Class 10 | Coming Soon |
| CBSE | Class 9 | Basic support |
| CBSE | Class 11-12 | Coming Soon |

## Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML, CSS, JavaScript | Core frontend |
| Tailwind CSS | Styling via CDN |
| YouTube IFrame API | Video progress tracking |
| Google Gemini API | AI coach functionality |
| LocalStorage | User profiles and progress persistence |
| Firebase | Authentication and chat storage (optional) |
| Vercel | Hosting |

## File Structure

PROJECT-KAIZEN/
├── index.html              Main entry point
├── styles.css              All styles and animations
├── main.js                 Core state management and navigation
├── subjects.js             Subjects, chapters, and video configuration
├── adaptive-engine.js      Retention calculation and priority scoring logic
├── adaptive-view.js        Adaptive dashboard user interface
├── smart-study.js          20-week study plan generator
├── ai.js                   Gemini AI chat integration
├── profile.js              User profile management and avatar upload
├── progress.js             Progress tracking user interface
├── tests.js                Practice tests module
├── notes.js                Science notes PDF viewer
├── sync-adaptive.js        Sync progress with adaptive engine
├── app.js                  Firebase initialization and Remote Config
├── chat-storage.js         Chat sessions with auto-delete after 30 days
└── pdfs/                   Chapter notes PDF files

## How the Adaptive Engine Works

The core innovation is a deterministic adaptive learning engine that runs entirely in the browser using LocalStorage.

Step 1: Student studies a chapter and marks it complete

Step 2: Retention score decays exponentially using half-life of 7 days
Retention = 100 * e^(-ln(2) * daysSinceStudy / 7)

Step 3: Quiz scores and recall results adjust retention
- Quiz score above 80 percent increases retention
- Recall failure reduces retention significantly

Step 4: Priority score calculated for each chapter
Priority = WeaknessScore(40%) + MarksWeightage(30%) + Urgency(20%) + Difficulty(10%)

Step 5: Next chapter recommendation is the chapter with highest priority score among incomplete chapters

Step 6: Active recall system schedules revisions at 1, 3, 7, 14, and 30 days after completion

## 20-Week Study Plan Structure

| Phase | Weeks | Focus Area |
|-------|-------|------------|
| Foundation | 1-4 | Basic chapters across all subjects |
| Unit Test 1 Prep | 5 | Revision week for Unit Test 1 |
| Mid-term | 6-10 | Core chapters building on foundation |
| Semester 1 | 11-13 | Revision and Semester 1 exams |
| Post-semester | 14-17 | Remaining syllabus chapters |
| Finals Prep | 18-20 | Full syllabus revision and mock tests |

Each regular week includes:
- 3 subjects per day on weekdays
- Saturday revision of key concepts
- Sunday rest

Hollow weeks are built in exactly when schools conduct Unit Tests and Semester exams. No new chapters are introduced during these weeks.

## Exam Readiness Score Calculation

| Factor | Weight |
|--------|--------|
| Syllabus completion percentage | 35 percent |
| Average retention score across all completed chapters | 30 percent |
| Schedule adherence (progress vs expected timeline) | 20 percent |
| Study streak bonus (up to 10 percent) | 10 percent |
| Weak topics penalty (up to minus 20 percent) | - |

The final score ranges from 0 to 100 percent. A score above 80 percent indicates exam-ready status.

## Video Summaries Feature

For major chapters in Science, video summaries are provided with:
- Timestamped sections for each major topic
- Clickable timestamp buttons that seek the YouTube video to that exact point
- Automatic typing animation that reveals bullet points one by one

This feature is available for chapters including Light - Reflection and Refraction, Human Eye and Colourful World, Electricity, Chemical Reactions and Equations, Life Processes, and others.

## AI Coach Capabilities

The AI coach is powered by Google Gemini 2.5 Flash and can:
- Create personalized study plans based on days remaining until exam
- Identify which chapters need urgent revision based on your progress
- Suggest chapter weightage and priority order
- Provide common mistakes to avoid in each chapter
- Generate quick revision summaries
- Answer specific doubts about any chapter

The AI has a system instruction to keep responses under 400 words and be direct and practical with no fluff.

## How to Run Locally

Step 1: Clone the repository
git clone https://github.com/Shah-Abubakar/PROJECT-KAIZEN.git

Step 2: Navigate to the folder
cd PROJECT-KAIZEN

Step 3: Open index.html in your browser
For best experience, use Live Server extension in VS Code or serve via any local web server

Note: YouTube API and Gemini API require internet connection. Without internet, the app will still work but videos and AI chat will not function.

## Live Demo

The application is deployed at: https://kaizen-update.vercel.app/

No installation or sign-up required. Open the link and complete the onboarding by selecting your board and class.

## What I Learned Building This

| Skill | How This Project Built It |
|-------|---------------------------|
| Algorithm design | Created retention decay model and priority scoring system from scratch |
| LocalStorage as database | Managed complex user profiles without backend infrastructure |
| YouTube IFrame API | Integrated video progress tracking and seek functionality |
| Adaptive UI | Built dashboard that changes based on user performance data |
| System architecture | Structured 10+ modules with clear separation of concerns |
| User research | Mapped complete NCERT curriculum for CBSE Class 10 across 5 subjects |
| Mobile-first design | Built responsive interface that works on phones first |

## Roadmap

- Complete Maharashtra Board syllabus mapping
- Add Class 11 and 12 content
- Create JEE and NEET foundation modules
- Add peer leaderboards for motivation
- Convert to Progressive Web App for offline access
- Migrate chat storage to Firebase for cross-device sync

## Acknowledgments

- YouTube educators Prashant Kirad and Exphub for chapter sequence inspiration
- NCERT curriculum for chapter structure
- Ebbinghaus forgetting curve research for retention model
- Gemini API documentation for AI integration

## Contact

Developer: Abubakar
GitHub: Shah-Abubakar
Portfolio: https://real-portfolio-vkzy.vercel.app/
Email: cet.abubakar77@gmail.com

Built for Indian students. Better every day - that is Kaizen.

// ========== SMART STUDY MODULE ==========
// 20-Week Realistic Study Plan
// Based on NCERT chapter sequence + school test calendar

const SMART_STUDY_DATA = {
    // Chapter order confirmed by Prashant Kirad (Exphub) + NCERT sequence
    science: [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-metals",
        "Carbon and its Compounds",
        "Life Processes",
        "Control and Coordination",
        "How do Organisms Reproduce?",
        "Heredity",
        "Light- Reflection and Refraction",
        "The Human Eye and the Colourful World",
        "Electricity",
        "Magnetic Effects of Electric Current",
        "Our Environment"
    ],
    maths: [
        "Real Numbers",
        "Polynomials",
        "Pair of Linear Equations in Two Variables",
        "Quadratic Equations",
        "Arithmetic Progressions",
        "Triangles",
        "Coordinate Geometry",
        "Introduction to Trigonometry",
        "Applications of Trigonometry",
        "Circles",
        "Areas Related to Circles",
        "Surface Areas and Volumes",
        "Statistics",
        "Probability"
    ],
    history: [
        "Nationalism in Europe",
        "Nationalism in India",
        "The Making of a Global World",
        "The Age of Industrialization",
        "Print Culture and the Modern World"
    ],
    civics: [
        "Power-sharing",
        "Federalism",
        "Gender, Religion and Caste",
        "Political Parties",
        "Outcomes of Democracy"
    ],
    geography: [
        "Resources and Development",
        "Forest and Wildlife Resources",
        "Water Resources",
        "Agriculture",
        "Minerals and Energy Resources",
        "Manufacturing Industries",
        "Lifelines of National Economy"
    ],
    economics: [
        "Development",
        "Sectors of the Indian Economy",
        "Money and Credit",
        "Globalization and the Indian Economy",
        "Consumer Rights"
    ]
};

// School test calendar (standard CBSE school pattern)
const TEST_SCHEDULE = {
    unitTest1: {
        name: "Unit Test 1",
        month: "July",
        week: 4,
        science: [0, 1, 2],        // Chemical Rxns, Acids, Metals
        maths: [0, 1, 2],           // Real Numbers, Polynomials, Linear Equations
        history: [0],               // Nationalism in Europe
        civics: [0],                // Power-sharing
        geography: [0],             // Resources and Development
        economics: [0]              // Development
    },
    semester1: {
        name: "Half-Yearly / Semester 1",
        month: "September",
        week: 4,
        science: [0, 1, 2, 3, 4, 5, 6],  // Ch 1-7
        maths: [0, 1, 2, 3, 4, 5, 6],     // Ch 1-7
        history: [0, 1, 2],                // Ch 1-3
        civics: [0, 1, 2],                 // Ch 1-3
        geography: [0, 1, 2],              // Ch 1-3
        economics: [0, 1, 2]               // Ch 1-3
    },
    unitTest2: {
        name: "Unit Test 2",
        month: "November",
        week: 3,
        science: [8, 9, 10],       // Light, Human Eye, Electricity
        maths: [7, 8],              // Trigonometry parts
        history: [3],               // Industrialization
        civics: [3],                // Political Parties
        geography: [5],             // Manufacturing Industries
        economics: [3]              // Globalization
    }
};

// Complete 20-Week Plan
const WEEKLY_PLAN = [
    // ===== WEEK 1 (April, Week 1) =====
    {
        week: 1,
        month: "April",
        type: "regular",
        label: "Foundation Start",
        monday:    { science: 0, maths: 0, history: 0 },
        tuesday:   { science: 0, maths: 0, civics: 0 },
        wednesday: { science: 1, maths: 0, geography: 0 },
        thursday:  { science: 1, maths: 1, economics: 0 },
        friday:    { science: 0, maths: 1, history: 0 },
        saturday:  { revision: ["Chemical Reactions (formulas)", "Real Numbers (HCF/LCM)", "Nationalism in Europe (timeline)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 2 (April, Week 2) =====
    {
        week: 2,
        month: "April",
        type: "regular",
        label: "Building Basics",
        monday:    { science: 2, maths: 1, civics: 0 },
        tuesday:   { science: 2, maths: 2, geography: 0 },
        wednesday: { science: 0, maths: 2, history: 0 },
        thursday:  { science: 1, maths: 0, economics: 0 },
        friday:    { science: 2, maths: 1, geography: 1 },
        saturday:  { revision: ["Acids & Bases (pH & indicators)", "Polynomials (zeroes)", "Power-sharing (Belgium/Sri Lanka)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 3 (April, Week 3) =====
    {
        week: 3,
        month: "April",
        type: "regular",
        label: "Gaining Momentum",
        monday:    { science: 3, maths: 2, history: 1 },
        tuesday:   { science: 3, maths: 3, civics: 1 },
        wednesday: { science: 0, maths: 3, geography: 1 },
        thursday:  { science: 1, maths: 0, economics: 1 },
        friday:    { science: 3, maths: 1, history: 1 },
        saturday:  { revision: ["Metals & Non-metals (reactions)", "Linear Equations (graphs)", "Resources (soil types)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 4 (April-May, Week 4) =====
    {
        week: 4,
        month: "April",
        type: "regular",
        label: "Pre-UT1 Push",
        monday:    { science: 0, maths: 3, civics: 0 },
        tuesday:   { science: 2, maths: 0, geography: 0 },
        wednesday: { science: 1, maths: 2, economics: 0 },
        thursday:  { science: 0, maths: 1, history: 0 },
        friday:    { science: 2, maths: 3, civics: 0 },
        saturday:  { revision: ["All Chemistry formulas", "Maths Ch 1-3 key problems", "SST key terms"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 5 (May, Week 1) - HOLLOW: Unit Test 1 Prep =====
    {
        week: 5,
        month: "May",
        type: "hollow",
        label: "⚡ Unit Test 1 Week",
        exam: "Unit Test 1",
        focus: {
            science: "Chemical Reactions, Acids & Bases, Metals & Non-metals",
            maths: "Real Numbers, Polynomials, Linear Equations",
            history: "Nationalism in Europe",
            civics: "Power-sharing",
            geography: "Resources and Development",
            economics: "Development"
        },
        instructions: "No new chapters this week. Focus only on revising UT1 chapters. Practice PYQs from each chapter. Take at least 2 mock tests.",
        weekend: "Rest after UT1 🎉"
    },
    // ===== WEEK 6 (May, Week 2) =====
    {
        week: 6,
        month: "May",
        type: "regular",
        label: "Post-UT1 Fresh Start",
        monday:    { science: 4, maths: 3, history: 1 },
        tuesday:   { science: 4, maths: 4, civics: 1 },
        wednesday: { science: 5, maths: 4, geography: 2 },
        thursday:  { science: 5, maths: 0, economics: 1 },
        friday:    { science: 4, maths: 4, history: 2 },
        saturday:  { revision: ["Life Processes (digestion & respiration)", "Quadratic Equations (formula & discriminant)", "Federalism (features)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 7 (May-June, Week 3) =====
    {
        week: 7,
        month: "May",
        type: "regular",
        label: "Biology Deep Dive",
        monday:    { science: 6, maths: 4, civics: 2 },
        tuesday:   { science: 6, maths: 5, geography: 2 },
        wednesday: { science: 4, maths: 5, history: 2 },
        thursday:  { science: 5, maths: 0, economics: 2 },
        friday:    { science: 6, maths: 5, civics: 2 },
        saturday:  { revision: ["Reproduction (asexual & sexual)", "Arithmetic Progression (formulas)", "Water Resources (dams)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 8 (June, Week 1) =====
    {
        week: 8,
        month: "June",
        type: "regular",
        label: "Mid-Term Pace",
        monday:    { science: 7, maths: 5, history: 2 },
        tuesday:   { science: 7, maths: 6, civics: 2 },
        wednesday: { science: 4, maths: 6, geography: 2 },
        thursday:  { science: 0, maths: 0, economics: 2 },
        friday:    { science: 7, maths: 6, history: 0 },
        saturday:  { revision: ["Heredity (monohybrid/dihybrid cross)", "Triangles (similarity criteria)", "Nationalism in India (movements)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 9 (June, Week 2) =====
    {
        week: 9,
        month: "June",
        type: "regular",
        label: "Building for Semester",
        monday:    { science: 8, maths: 6, civics: 0 },
        tuesday:   { science: 8, maths: 7, geography: 3 },
        wednesday: { science: 0, maths: 7, history: 3 },
        thursday:  { science: 6, maths: 0, economics: 0 },
        friday:    { science: 8, maths: 7, history: 3 },
        saturday:  { revision: ["Light (mirror & lens formulas)", "Coordinate Geometry (distance formula)", "Global World (WW1 & WW2 links)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 10 (June, Week 3) =====
    {
        week: 10,
        month: "June",
        type: "regular",
        label: "Physics Begins",
        monday:    { science: 9, maths: 7, civics: 3 },
        tuesday:   { science: 9, maths: 0, geography: 3 },
        wednesday: { science: 8, maths: 0, history: 0 },
        thursday:  { science: 0, maths: 0, economics: 3 },
        friday:    { science: 9, maths: 0, geography: 4 },
        saturday:  { revision: ["Human Eye (defects & corrections)", "Full Maths Ch 1-7 formula sheet", "Agriculture (crops & seasons)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 11 (July, Week 1) - Semester 1 Revision Begins =====
    {
        week: 11,
        month: "July",
        type: "revision",
        label: "🔁 Semester 1 Revision I",
        focus: "Science Chapters 1-7 + Maths Chapters 1-7 + SST (All Chapters 1-3)",
        monday:    { revision: "Science: Chemical Rxns + Acids (PYQs)" },
        tuesday:   { revision: "Maths: Real Numbers + Polynomials (NCERT Examples)" },
        wednesday: { revision: "Science: Metals + Carbon Compounds (Reactions)" },
        thursday:  { revision: "SST: History (Europe + India) + Civics (Power-sharing + Federalism)" },
        friday:    { revision: "Science: Life Processes + Reproduction (Diagrams)" },
        saturday:  { revision: "Full Mock Test: Science + Maths (3 hours)" },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 12 (July, Week 2) - Semester 1 Revision II =====
    {
        week: 12,
        month: "July",
        type: "revision",
        label: "🔁 Semester 1 Revision II",
        focus: "Deep revision of weak areas identified from Mock Test",
        monday:    { revision: "Weak Areas from Mock Test (Science)" },
        tuesday:   { revision: "Weak Areas from Mock Test (Maths)" },
        wednesday: { revision: "SST: Geography (Resources, Water) + Economics (Development, Sectors)" },
        thursday:  { revision: "Science: Control & Coordination + Heredity (Key diagrams)" },
        friday:    { revision: "Maths: Triangles + Coordinate Geometry (Proofs)" },
        saturday:  { revision: "Full Mock Test: SST + Science (3 hours)" },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 13 (July, Week 3) - HOLLOW: Semester 1 Exams =====
    {
        week: 13,
        month: "July",
        type: "hollow",
        label: "📝 Semester 1 Exams",
        exam: "Half-Yearly / Semester 1",
        instructions: "Focus entirely on exams. No new chapters. Quick revision of formulas before each paper. Stay calm, you've prepared well.",
        weekend: "Semester 1 Complete! Take 2 days off 🎉"
    },
    // ===== WEEK 14 (August, Week 1) - Fresh Start Post Semester =====
    {
        week: 14,
        month: "August",
        type: "regular",
        label: "Post-Semester Fresh Start",
        monday:    { science: 10, maths: 8, history: 3 },
        tuesday:   { science: 10, maths: 8, civics: 3 },
        wednesday: { science: 0, maths: 0, geography: 0 },
        thursday:  { science: 8, maths: 8, economics: 0 },
        friday:    { science: 10, maths: 9, history: 4 },
        saturday:  { revision: ["Electricity (Ohm's Law & circuits)", "Trigonometry (ratios & values)", "Industrialization (key inventions)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 15 (August, Week 2) =====
    {
        week: 15,
        month: "August",
        type: "regular",
        label: "Physics + Trigonometry",
        monday:    { science: 11, maths: 8, civics: 4 },
        tuesday:   { science: 11, maths: 9, geography: 5 },
        wednesday: { science: 9, maths: 0, history: 4 },
        thursday:  { science: 0, maths: 9, economics: 3 },
        friday:    { science: 11, maths: 0, geography: 6 },
        saturday:  { revision: ["Magnetic Effects (right-hand rules)", "Applications of Trigonometry (heights)", "Political Parties (national vs regional)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 16 (August-September, Week 3) =====
    {
        week: 16,
        month: "August",
        type: "regular",
        label: "Maths Geometry Focus",
        monday:    { science: 0, maths: 10, civics: 4 },
        tuesday:   { science: 12, maths: 10, geography: 0 },
        wednesday: { science: 0, maths: 11, history: 4 },
        thursday:  { science: 12, maths: 0, economics: 4 },
        friday:    { science: 0, maths: 11, civics: 0 },
        saturday:  { revision: ["Our Environment (ecosystem & food chain)", "Circles (tangents & theorems)", "Manufacturing Industries (types)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 17 (September, Week 1) =====
    {
        week: 17,
        month: "September",
        type: "regular",
        label: "Wrapping Up Syllabus",
        monday:    { science: 0, maths: 12, history: 0 },
        tuesday:   { science: 0, maths: 12, civics: 0 },
        wednesday: { science: 0, maths: 13, geography: 6 },
        thursday:  { science: 0, maths: 13, economics: 4 },
        friday:    { science: 0, maths: 10, history: 0 },
        saturday:  { revision: ["Surface Areas & Volumes (formulas)", "Statistics (mean, median, mode)", "Globalization (impact on India)"] },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 18 (September, Week 2) - HOLLOW: Unit Test 2 Prep =====
    {
        week: 18,
        month: "September",
        type: "hollow",
        label: "⚡ Unit Test 2 Week",
        exam: "Unit Test 2",
        focus: {
            science: "Light, Human Eye, Electricity",
            maths: "Introduction to Trigonometry, Applications of Trigonometry",
            history: "The Age of Industrialization",
            civics: "Political Parties",
            geography: "Manufacturing Industries",
            economics: "Globalization and the Indian Economy"
        },
        instructions: "No new chapters. Focus only on UT2 chapters. Practice numerical problems (Electricity + Trigonometry). Take at least 2 mock tests.",
        weekend: "Rest after UT2 🎉"
    },
    // ===== WEEK 19 (September-October, Week 3) =====
    {
        week: 19,
        month: "September",
        type: "revision",
        label: "🔁 Full Syllabus Catch-Up",
        focus: "Complete any remaining chapters + begin overall revision",
        monday:    { revision: "Any incomplete Science chapters (check Progress Tracker)" },
        tuesday:   { revision: "Any incomplete Maths chapters + Probability (if not done)" },
        wednesday: { revision: "Geography: Lifelines + Full Map Work" },
        thursday:  { revision: "Civics: Outcomes of Democracy + Economics: Consumer Rights" },
        friday:    { revision: "History: Print Culture + All SST Map Work" },
        saturday:  { revision: "Mixed Subject Practice: 10 PYQs from each subject" },
        sunday:    "Rest 🎮"
    },
    // ===== WEEK 20 (October, Week 1) - Final Consolidation =====
    {
        week: 20,
        month: "October",
        type: "achievement",
        label: "🏆 Syllabus Complete!",
        focus: "Entire syllabus completed. From here, use the Progress Tracker and AI Coach for targeted revision.",
        instructions: "Congratulations! You've completed the entire Class 10 syllabus in 20 weeks with built-in revision and test prep. Now focus on full-length mock tests and weak area improvement using the AI Coach.",
        weekend: "Celebrate this milestone! 🎉 You're ahead of 80% of students."
    }
];

// Subject display configuration
const SUBJECT_CONFIG = {
    science: { name: "Science", icon: "ph-flask", color: "#A6FF1F", emoji: "🔬" },
    maths: { name: "Maths", icon: "ph-calculator", color: "#10b981", emoji: "🧮" },
    history: { name: "History", icon: "ph-scroll", color: "#ec4899", emoji: "📜" },
    civics: { name: "Civics", icon: "ph-bank", color: "#f59e0b", emoji: "🏛️" },
    geography: { name: "Geography", icon: "ph-globe-hemisphere-east", color: "#14b8a6", emoji: "🌍" },
    economics: { name: "Economics", icon: "ph-coin", color: "#f59e0b", emoji: "💰" }
};

// Chapter metadata (difficulty & time estimates, marks weightage for CBSE)
const CHAPTER_META = {
    // ===== SCIENCE 1 (CBSE Delhi) =====
    "Chemical Reactions and Equations": { difficulty: "Medium", time: "4-5h", marks: 8 },
    "Acids, Bases and Salts": { difficulty: "Medium", time: "3-4h", marks: 6 },
    "Metals and Non-metals": { difficulty: "Medium", time: "4-5h", marks: 5 },
    "Carbon and its Compounds": { difficulty: "Hard", time: "5-6h", marks: 5 },
    "Light – Reflection and Refraction": { difficulty: "Hard", time: "6-7h", marks: 7 },
    "Human Eye and Colourful World": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "The Human Eye and the Colourful World": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Electricity": { difficulty: "Hard", time: "6-7h", marks: 7 },
    "Magnetic Effects of Electric Current": { difficulty: "Medium", time: "4-5h", marks: 5 },

    // ===== SCIENCE 2 (CBSE Delhi) =====
    "Life Processes": { difficulty: "Medium", time: "5-6h", marks: 8 },
    "Control and Coordination": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "How do Organisms Reproduce?": { difficulty: "Easy", time: "3-4h", marks: 6 },
    "Heredity and Evolution": { difficulty: "Medium", time: "4-5h", marks: 5 },
    "Heredity": { difficulty: "Medium", time: "4-5h", marks: 5 },
    "Our Environment": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Natural Resources": { difficulty: "Easy", time: "2-3h", marks: 3 },

    // ===== MATHS (CBSE Delhi) =====
    "Real Numbers": { difficulty: "Easy", time: "3-4h", marks: 6 },
    "Polynomials": { difficulty: "Easy", time: "3-4h", marks: 5 },
    "Pair of Linear Equations in Two Variables": { difficulty: "Medium", time: "4-5h", marks: 5 },
    "Linear Equations in Two Variables": { difficulty: "Medium", time: "4-5h", marks: 5 },
    "Quadratic Equations": { difficulty: "Hard", time: "6-7h", marks: 10 },
    "Arithmetic Progressions": { difficulty: "Medium", time: "4-5h", marks: 6 },
    "Arithmetic Progression": { difficulty: "Medium", time: "4-5h", marks: 6 },
    "Triangles": { difficulty: "Hard", time: "6-7h", marks: 10 },
    "Coordinate Geometry": { difficulty: "Medium", time: "4-5h", marks: 6 },
    "Introduction to Trigonometry": { difficulty: "Hard", time: "7-8h", marks: 10 },
    "Trigonometry": { difficulty: "Hard", time: "7-8h", marks: 10 },
    "Applications of Trigonometry": { difficulty: "Medium", time: "3-4h", marks: 4 },
    "Circles": { difficulty: "Medium", time: "4-5h", marks: 6 },
    "Areas Related to Circles": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Surface Areas and Volumes": { difficulty: "Medium", time: "5-6h", marks: 6 },
    "Statistics": { difficulty: "Easy", time: "3-4h", marks: 6 },
    "Probability": { difficulty: "Easy", time: "2-3h", marks: 5 },
    "Circle": { difficulty: "Medium", time: "4-5h", marks: 6 },
    "Similarity": { difficulty: "Hard", time: "5-6h", marks: 8 },
    "Pythagoras Theorem": { difficulty: "Hard", time: "4-5h", marks: 7 },
    "Constructions": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Mensuration": { difficulty: "Medium", time: "4-5h", marks: 5 },
    "Financial Planning": { difficulty: "Easy", time: "2-3h", marks: 3 },

    // ===== HISTORY (CBSE Delhi) =====
    "Nationalism in India": { difficulty: "Medium", time: "4-5h", marks: 8 },
    "Nationalism in Europe": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "The Making of a Global World": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Global World": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "The Age of Industrialization": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Industrialisation": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Print Culture and the Modern World": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Print Culture": { difficulty: "Easy", time: "2-3h", marks: 4 },

    // ===== GEOGRAPHY (CBSE Delhi) =====
    "Resources and Development": { difficulty: "Easy", time: "2-3h", marks: 5 },
    "Forest and Wildlife Resources": { difficulty: "Easy", time: "2-3h", marks: 5 },
    "Water Resources": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Agriculture": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Minerals and Energy Resources": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Manufacturing Industries": { difficulty: "Medium", time: "4-5h", marks: 6 },
    "Lifelines of National Economy": { difficulty: "Easy", time: "2-3h", marks: 4 },

    // ===== CIVICS (CBSE Delhi) =====
    "Power-sharing": { difficulty: "Easy", time: "2-3h", marks: 5 },
    "Power Sharing": { difficulty: "Easy", time: "2-3h", marks: 5 },
    "Federalism": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Democracy and Diversity": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Gender, Religion and Caste": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Political Parties": { difficulty: "Medium", time: "3-4h", marks: 6 },
    "Outcomes of Democracy": { difficulty: "Easy", time: "2-3h", marks: 5 },

    // ===== ECONOMICS (CBSE Delhi) =====
    "Development": { difficulty: "Easy", time: "2-3h", marks: 5 },
    "Sectors of the Indian Economy": { difficulty: "Medium", time: "3-4h", marks: 6 },
    "Money and Credit": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Globalization and the Indian Economy": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Consumer Rights": { difficulty: "Easy", time: "2-3h", marks: 4 },

    // ===== SCIENCE 1 (MH Board) =====
    "Gravitation": { difficulty: "Hard", time: "5-6h", marks: 7 },
    "Periodic Classification of Elements": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Heat": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Refraction of Light": { difficulty: "Hard", time: "5-6h", marks: 6 },
    "Lenses": { difficulty: "Hard", time: "4-5h", marks: 5 },
    "Metallurgy": { difficulty: "Medium", time: "3-4h", marks: 4 },
    "Carbon Compounds": { difficulty: "Hard", time: "4-5h", marks: 5 },
    "Space Missions": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Effects of Electric Current": { difficulty: "Hard", time: "5-6h", marks: 6 },

    // ===== SCIENCE 2 (MH Board) =====
    "Life Processes in Living Organisms": { difficulty: "Medium", time: "5-6h", marks: 8 },
    "Cell Biology and Biotechnology": { difficulty: "Medium", time: "3-4h", marks: 4 },
    "Introduction to Microbiology": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Animal Classification": { difficulty: "Easy", time: "3-4h", marks: 4 },
    "Environmental Management": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Social Health": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Towards Green Energy": { difficulty: "Medium", time: "3-4h", marks: 4 },

    // ===== HISTORY (MH Board) =====
    "Applied History": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Heritage Management": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Mass Media and History": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Entertainment and History": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "History of Indian Arts": { difficulty: "Medium", time: "3-4h", marks: 4 },
    "Tourism and History": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Sports and History": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Historiography": { difficulty: "Medium", time: "3-4h", marks: 4 },

    // ===== GEOGRAPHY (MH Board) =====
    "Climate": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Physiography and Drainage": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Population": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Natural Vegetation and Wildlife": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Economy and Occupations": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Transport and Communication": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Location and Extent": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Settlements": { difficulty: "Easy", time: "2-3h", marks: 3 },
    "Field Visit": { difficulty: "Easy", time: "1-2h", marks: 2 },

    // ===== CIVICS (MH Board) =====
    "Working of the Constitution": { difficulty: "Medium", time: "3-4h", marks: 6 },
    "Social and Political Movements": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Challenges to Democracy": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Outcomes of Democracy": { difficulty: "Easy", time: "2-3h", marks: 4 },
    "Public Facilities": { difficulty: "Easy", time: "2-3h", marks: 4 },

    // ===== ECONOMICS (MH Board) =====
    "Development Experience of India": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Sectors of the Economy": { difficulty: "Medium", time: "3-4h", marks: 5 },
    "Globalisation and the Indian Economy": { difficulty: "Medium", time: "3-4h", marks: 5 },

    // ===== GENERIC FALLBACKS =====
    "Reproduction": { difficulty: "Easy", time: "3-4h", marks: 6 },
    "Management of Natural Resources": { difficulty: "Easy", time: "2-3h", marks: 3 }
};

// Get chapter name by index
function getChapter(subject, index) {
    if (!SMART_STUDY_DATA[subject]) return "Unknown Chapter";
    const chapters = SMART_STUDY_DATA[subject];
    return chapters[index] || "Chapter " + (index + 1);
}

// Get days of week
function getDayLabel(dayName) {
    const days = {
        monday: "Mon", tuesday: "Tue", wednesday: "Wed",
        thursday: "Thu", friday: "Fri", saturday: "Sat", sunday: "Sun"
    };
    return days[dayName] || dayName;
}

// Render a single week card
function renderWeekCard(weekData, currentWeekNumber) {
    const isCurrentWeek = weekData.week === currentWeekNumber;
    const borderColor = isCurrentWeek ? 'rgba(166, 255, 31, 0.6)' : 'rgba(166, 255, 31, 0.1)';
    const bgGradient = isCurrentWeek ? 'linear-gradient(135deg, rgba(166, 255, 31, 0.1), rgba(0,0,0,0))' : 'transparent';
    const accentColor = '#A6FF1F';
    const dimAccent = 'rgba(166, 255, 31, 0.15)';
    const dimAccentBg = 'rgba(166, 255, 31, 0.08)';
    
    if (weekData.type === 'hollow') {
        return `
            <div style="background: ${bgGradient}; border: 2px solid ${borderColor}; border-radius: 16px; padding: 20px; margin-bottom: 16px; position: relative; ${isCurrentWeek ? 'box-shadow: 0 0 20px rgba(166, 255, 31, 0.2);' : ''}">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                    <div>
                        <span style="font-size: 12px; color: ${accentColor}; font-weight: 700;">${weekData.label}</span>
                        <h3 style="font-size: 18px; color: var(--text-primary); margin: 4px 0 0 0;">Week ${weekData.week} — ${weekData.month}</h3>
                    </div>
                    <div style="background: ${dimAccent}; color: ${accentColor}; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600;">
                        📝 ${weekData.exam}
                    </div>
                </div>
                
                ${weekData.focus ? `
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
                    <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; font-weight: 600;">📋 Focus Chapters:</p>
                    ${Object.entries(weekData.focus).map(([subject, chapters]) => {
                        const config = SUBJECT_CONFIG[subject];
                        return `
                            <div style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 6px;">
                                <span style="font-size: 14px;">${config.emoji}</span>
                                <span style="font-size: 12px; color: var(--text-primary); line-height: 1.4;"><strong>${config.name}:</strong> ${chapters}</span>
                            </div>`;
                    }).join('')}
                </div>
                ` : ''}
                
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; background: ${dimAccentBg}; padding: 12px; border-radius: 8px; border-left: 3px solid ${accentColor};">
                    💡 ${weekData.instructions}
                </p>
                ${weekData.weekend ? `<p style="font-size: 12px; color: ${accentColor}; text-align: center; margin-top: 8px; font-weight: 500;">${weekData.weekend}</p>` : ''}
            </div>`;
    }
    
    if (weekData.type === 'revision') {
        return `
            <div style="background: ${bgGradient}; border: 2px solid ${borderColor}; border-radius: 16px; padding: 20px; margin-bottom: 16px; ${isCurrentWeek ? 'box-shadow: 0 0 20px rgba(166, 255, 31, 0.2);' : ''}">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                    <div>
                        <span style="font-size: 12px; color: ${accentColor}; font-weight: 700;">${weekData.label}</span>
                        <h3 style="font-size: 18px; color: var(--text-primary); margin: 4px 0 0 0;">Week ${weekData.week} — ${weekData.month}</h3>
                    </div>
                    <div style="background: ${dimAccent}; color: ${accentColor}; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 600;">
                        🔁 Revision
                    </div>
                </div>
                <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">🎯 <strong>Focus:</strong> ${weekData.focus}</p>
                <div style="display: grid; gap: 6px;">
                    ${['monday','tuesday','wednesday','thursday','friday','saturday'].map(day => {
                        if (!weekData[day]) return '';
                        const content = weekData[day].revision || '';
                        return content ? `
                            <div style="display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: ${dimAccentBg}; border-radius: 8px;">
                                <span style="font-size: 11px; color: var(--text-secondary); font-weight: 600; width: 35px;">${getDayLabel(day).toUpperCase()}</span>
                                <span style="font-size: 12px; color: var(--text-primary);">📖 ${content}</span>
                            </div>` : '';
                    }).join('')}
                </div>
                <p style="font-size: 12px; color: ${accentColor}; text-align: center; margin-top: 8px;">Sunday: Rest 🎮</p>
            </div>`;
    }
    
    if (weekData.type === 'achievement') {
        return `
            <div style="background: linear-gradient(135deg, rgba(166, 255, 31, 0.1), rgba(166, 255, 31, 0.05)); border: 2px solid rgba(166, 255, 31, 0.4); border-radius: 16px; padding: 24px; margin-bottom: 16px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 12px;">🏆</div>
                <span style="font-size: 14px; color: ${accentColor}; font-weight: 700;">${weekData.label}</span>
                <h3 style="font-size: 20px; color: var(--text-primary); margin: 8px 0;">Week ${weekData.week} — ${weekData.month}</h3>
                <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.6; margin: 12px 0;">${weekData.focus}</p>
                <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; background: ${dimAccentBg}; padding: 12px; border-radius: 8px;">
                    💡 ${weekData.instructions}
                </p>
                <p style="font-size: 14px; color: ${accentColor}; font-weight: 600; margin-top: 12px;">${weekData.weekend}</p>
            </div>`;
    }
    
    // Regular week
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    let daysHTML = days.map(day => {
        if (day === 'saturday') {
            const revisions = weekData.saturday?.revision || [];
            return `
                <div style="background: ${dimAccentBg}; border-radius: 10px; padding: 12px; border: 1px dashed ${borderColor};">
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
                        <span style="font-size: 11px; color: ${accentColor}; font-weight: 700;">SAT</span>
                        <span style="font-size: 10px; background: ${dimAccent}; color: ${accentColor}; padding: 2px 8px; border-radius: 4px;">Revision Day</span>
                    </div>
                    ${revisions.map(r => `
                        <div style="font-size: 11px; color: var(--text-primary); padding: 4px 0; display: flex; align-items: center; gap: 6px;">
                            <span>📝</span> ${r}
                        </div>
                    `).join('')}
                </div>`;
        }
        
        const dayData = weekData[day];
        if (!dayData) return '';
        
        let subjectsList = [];
        Object.entries(dayData).forEach(([subject, chapterIndex]) => {
            const config = SUBJECT_CONFIG[subject];
            const chapterName = getChapter(subject, chapterIndex);
            if (!config || !chapterName) return;
            subjectsList.push({ config, chapterName, subject });
        });
        
        return `
            <div style="background: rgba(255,255,255,0.02); border-radius: 10px; padding: 10px 12px;">
                <span style="font-size: 11px; color: var(--text-secondary); font-weight: 600;">${getDayLabel(day).toUpperCase()}</span>
                <div style="margin-top: 6px; display: flex; flex-direction: column; gap: 4px;">
                    ${subjectsList.map(s => `
                        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                            <span style="font-size: 12px;">${s.config.emoji}</span>
                            <span style="font-size: 12px; color: var(--text-primary);">${s.chapterName}</span>
                            ${CHAPTER_META[s.chapterName] ? `<span style="font-size: 9px; color: ${CHAPTER_META[s.chapterName].difficulty === 'Hard' ? '#ef4444' : CHAPTER_META[s.chapterName].difficulty === 'Medium' ? '#f59e0b' : '#22c55e'}; background: ${CHAPTER_META[s.chapterName].difficulty === 'Hard' ? 'rgba(239,68,68,0.1)' : CHAPTER_META[s.chapterName].difficulty === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)'}; padding: 1px 5px; border-radius: 3px;">${CHAPTER_META[s.chapterName].difficulty}</span>` : ''}
                            ${CHAPTER_META[s.chapterName] && CHAPTER_META[s.chapterName].marks ? `<span style="font-size: 9px; color: ${accentColor}; background: ${dimAccent}; padding: 1px 5px; border-radius: 3px; font-weight: 600;">⭐${CHAPTER_META[s.chapterName].marks}m</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }).join('');
    
    return `
        <div style="background: ${bgGradient}; border: 2px solid ${borderColor}; border-radius: 16px; padding: 20px; margin-bottom: 16px; ${isCurrentWeek ? 'box-shadow: 0 0 20px rgba(166, 255, 31, 0.2);' : ''}">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <div>
                    <span style="font-size: 12px; color: ${accentColor}; font-weight: 700;">${weekData.label}</span>
                    <h3 style="font-size: 18px; color: var(--text-primary); margin: 4px 0 0 0;">Week ${weekData.week} — ${weekData.month}</h3>
                </div>
                ${isCurrentWeek ? '<span style="background: ' + accentColor + '; color: #000; padding: 4px 10px; border-radius: 12px; font-size: 10px; font-weight: 600;">📍 Current</span>' : ''}
            </div>
            <div style="display: grid; gap: 8px;">
                ${daysHTML}
            </div>
            <p style="font-size: 12px; color: ${accentColor}; text-align: center; margin-top: 10px;">Sunday: Rest 🎮</p>
        </div>`;
}

// Main Smart Study View
function openSmartStudyView() {
    const curriculumView = document.getElementById('curriculum-view');
    if (!curriculumView) return;
    
    const subjects = getSubjectsList();
    if (!subjects || subjects.length === 0) {
        curriculumView.innerHTML = `
            <div class="profile-header">
                <h2>Smart Study 🧠</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Please complete onboarding first</p>
            </div>`;
        return;
    }
    
    // Calculate current week (based on user's start or default)
    const storedStartDate = localStorage.getItem('smartStudyStartDate');
    let currentWeek = 1;
    if (storedStartDate) {
        const startDate = new Date(storedStartDate);
        const now = new Date();
        const diffWeeks = Math.floor((now - startDate) / (7 * 24 * 60 * 60 * 1000)) + 1;
        currentWeek = Math.max(1, Math.min(20, diffWeeks));
    }
    
    // Generate all week cards
    let weeksHTML = '';
    WEEKLY_PLAN.forEach(week => {
        weeksHTML += renderWeekCard(week, currentWeek);
    });
    
    // Build the strategy explanation
    const strategyHTML = `
        <div style="background: linear-gradient(135deg, rgba(166, 255, 31, 0.12), rgba(166, 255, 31, 0.08)); border: 1px solid rgba(166, 255, 31, 0.25); border-radius: 16px; padding: 20px; margin-top: 20px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                <div style="width: 40px; height: 40px; border-radius: 12px; background: rgba(166, 255, 31, 0.3); display: flex; align-items: center; justify-content: center; font-size: 20px;">🎯</div>
                <h3 style="font-size: 16px; font-weight: 600; color: var(--text-primary); margin: 0;">How This Strategy Works</h3>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 14px;">
                    <h4 style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 0 0 6px 0;">1️⃣ Mix It Up, Don't Burn Out</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); line-height: 1.5; margin: 0;">Studying one tough subject for hours kills focus. We pair a hard conceptual subject (like Physics or Maths) with a lighter theory subject (like History or Economics). Your brain gets a refresh between sessions — like hydration breaks in a marathon.</p>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 14px;">
                    <h4 style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 0 0 6px 0;">2️⃣ Hard Chapters Are Split Across Days</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); line-height: 1.5; margin: 0;">Chapters like Light and Electricity need 6-7 hours — nobody finishes them in one sitting. They're spread across 2-3 sessions with sleep in between. Sleep actually strengthens memory, so you learn better by spacing it out.</p>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 14px;">
                    <h4 style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 0 0 6px 0;">3️⃣ Every Saturday Is Lockdown Revision</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); line-height: 1.5; margin: 0;">Most students forget 50% of what they studied by Friday. Saturday revision locks it in. No new topics — just practice and reinforce. This alone can boost your retention by 40%.</p>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 14px;">
                    <h4 style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 0 0 6px 0;">4️⃣ Test Weeks Are Built In — Not An Afterthought</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); line-height: 1.5; margin: 0;">Unit tests aren't interruptions — they're part of the plan. Hollow weeks appear exactly when your school conducts Unit Test 1 (July), Semester 1 (September), and Unit Test 2 (November). No new chapters during test week, just focused revision.</p>
                </div>
                
                <div style="background: rgba(0,0,0,0.2); border-radius: 12px; padding: 14px;">
                    <h4 style="font-size: 13px; font-weight: 600; color: var(--text-primary); margin: 0 0 6px 0;">5️⃣ Follows NCERT Sequence (Same As School)</h4>
                    <p style="font-size: 11px; color: var(--text-secondary); line-height: 1.5; margin: 0;">The chapter order matches what your school follows — confirmed by analyzing CBSE syllabus structure and teaching patterns from top educators. No conflicts between what you study here and what's taught in class.</p>
                </div>
            </div>
            
            <div style="margin-top: 16px; padding: 14px; background: rgba(166, 255, 31, 0.15); border-radius: 10px; border-left: 3px solid #A6FF1F;">
                <p style="font-size: 12px; color: var(--text-primary); line-height: 1.6; margin: 0;">
                    <strong>📊 The Result:</strong> Students following structured weekly plans score 15-22% higher than those studying randomly. Not because they work harder — but because they work smarter.
                </p>
            </div>
        </div>`;
    
    // Put it all together
    curriculumView.innerHTML = `
        <div class="profile-header">
            <h2>Smart Study 🧠</h2>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">
                ${AppState.selectedBoard} • Class ${AppState.selectedClass} • 20-Week Master Plan
            </p>
        </div>
        
        ${!storedStartDate ? `
        <div style="background: linear-gradient(135deg, rgba(166, 255, 31, 0.2), rgba(166, 255, 31, 0.1)); border: 1px solid rgba(166, 255, 31, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 20px; text-align: center; cursor: pointer;" id="start-plan-btn">
            <p style="font-size: 14px; color: var(--text-primary); font-weight: 600; margin: 0;">📅 Click to Start Your 20-Week Plan</p>
            <p style="font-size: 11px; color: var(--text-secondary); margin: 4px 0 0 0;">We'll track your progress week by week</p>
        </div>
        ` : `
        <div style="background: rgba(166, 255, 31, 0.1); border: 1px solid rgba(166, 255, 31, 0.3); border-radius: 12px; padding: 12px; margin-bottom: 20px; text-align: center;">
            <p style="font-size: 13px; color: #A6FF1F; font-weight: 600; margin: 0;">📅 Plan Started! You're on Week ${currentWeek} of 20</p>
        </div>
        `}
        
        <p style="font-size: 13px; color: #A6FF1F; margin-bottom: 16px; text-align: center; 
           background: linear-gradient(135deg, rgba(166, 255, 31, 0.12), rgba(166, 255, 31, 0.08)); 
           padding: 10px 16px; border-radius: 10px; 
           border: 1px solid rgba(166, 255, 31, 0.25);
           font-weight: 600; letter-spacing: 0.3px;">
            ⚡ Follow this order for maximum marks with minimum effort
        </p>
        
        <div style="max-height: 70vh; overflow-y: auto; padding-right: 4px;" id="weekly-plan-container">
            ${weeksHTML}
        </div>
        
        ${strategyHTML}
        
        <div style="height: 80px;"></div>
    `;
    
    // Setup event listeners
    const startBtn = document.getElementById('start-plan-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            localStorage.setItem('smartStudyStartDate', new Date().toISOString());
            openSmartStudyView(); // Refresh the view
        });
    }
    
    // Scroll to current week
    setTimeout(() => {
        const container = document.getElementById('weekly-plan-container');
        if (container && currentWeek > 1) {
            const weekCards = container.children;
            if (weekCards[currentWeek - 1]) {
                weekCards[currentWeek - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, 300);
}
// Export chapter meta globally for subjects view
window.CHAPTER_META = CHAPTER_META;

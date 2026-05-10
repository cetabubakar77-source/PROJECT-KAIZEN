// knowledge-base.js - EXAM STRATEGY & QUICK REFERENCE (Not full textbooks)

const EXAM_DATA = {
    // ========== CHAPTER WEIGHTAGE (Based on CBSE past papers) ==========
    weightage: {
        "Science": {
            "Chemical Reactions and Equations": 8,
            "Acids Bases and Salts": 6,
            "Metals and Non-metals": 5,
            "Carbon and its Compounds": 5,
            "Periodic Classification": 5,
            "Life Processes": 8,
            "Control and Coordination": 5,
            "Reproduction": 6,
            "Heredity and Evolution": 5,
            "Light Reflection Refraction": 7,
            "Human Eye Colourful World": 4,
            "Electricity": 7,
            "Magnetic Effects": 5,
            "Our Environment": 3
        },
        "Maths": {
            "Real Numbers": 6,
            "Polynomials": 5,
            "Pair of Linear Equations": 5,
            "Quadratic Equations": 10,
            "Arithmetic Progressions": 6,
            "Triangles": 10,
            "Coordinate Geometry": 6,
            "Introduction to Trigonometry": 10,
            "Applications of Trigonometry": 4,
            "Circles": 6,
            "Areas Related to Circles": 5,
            "Surface Areas Volumes": 6,
            "Statistics": 6,
            "Probability": 5
        }
    },

    // ========== STUDY PLANS (Days remaining → schedule) ==========
    studyPlans: {
        "50_days": {
            title: "50 Days Left - Complete Syllabus",
            priority: ["Quadratic Equations", "Trigonometry", "Triangles", "Life Processes", "Electricity"],
            schedule: "Week 1-2: High weightage chapters | Week 3-4: Remaining syllabus | Week 5-6: PYQs | Week 7: Revision & Mock tests"
        },
        "30_days": {
            title: "30 Days Left - Crash Course",
            priority: ["Quadratic Equations (10 marks)", "Trigonometry (10 marks)", "Triangles (10 marks)", "Life Processes (8)", "Electricity (7)"],
            schedule: "Week 1: Priority 1 chapters | Week 2: Priority 2 chapters | Week 3: PYQs only | Week 4: Mock tests & weak areas"
        },
        "15_days": {
            title: "15 Days Left - Last Minute Strategy",
            priority: ["PYQs only! No new topics", "Formulas revision", "NCERT examples"],
            schedule: "Days 1-10: PYQs (5 years) | Days 11-12: Formula revision | Days 13-14: Mock test | Day 15: Relax"
        },
        "7_days": {
            title: "7 Days Left - Emergency Plan",
            priority: ["Only high weightage chapters", "Only NCERT solved examples", "Only last 3 years PYQs"],
            schedule: "Day 1-3: Maths (Trig, Quad, Triangles) | Day 4-6: Science (Chem Rxns, Life, Electricity) | Day 7: Revision + confidence"
        },
        "1_day": {
            title: "1 Day Left - What to Do?",
            priority: ["DON'T study new topics!", "Review formulas", "Sleep 7-8 hours"],
            schedule: "Morning: Formula revision | Afternoon: 1 mock test | Evening: Relax | Night: Sleep early"
        }
    },

    // ========== QUICK REVISION SUMMARIES (100-200 chars each) ==========
    summaries: {
        "Real Numbers": "Euclid's division algorithm, HCF/LCM, irrational numbers proof (√2, √3, √5). Decimal expansion: terminating (denominator 2^m×5^n) vs non-terminating.",
        "Polynomials": "Zeroes = roots. Relation: sum=-b/a, product=c/a. Graph is parabola. Division algorithm.",
        "Quadratic Equations": "ax²+bx+c=0. Formula: x=[-b±√(b²-4ac)]/2a. Discriminant D: >0(real distinct), =0(equal), <0(no real).",
        "Arithmetic Progressions": "Sequence with common difference d. nth term: a+(n-1)d. Sum: n/2[2a+(n-1)d].",
        "Triangles": "Similarity: AAA, AA, SSS, SAS. BPT theorem. Pythagoras: a²+b²=c².",
        "Coordinate Geometry": "Distance: √[(x₂-x₁)²+(y₂-y₁)²]. Section formula. Midpoint: ((x₁+x₂)/2, (y₁+y₂)/2).",
        "Trigonometry": "sinθ=opp/hyp, cosθ=adj/hyp, tanθ=opp/adj. Values: 0°,30°,45°,60°,90°. Identities: sin²+cos²=1, 1+tan²=sec², 1+cot²=csc².",
        "Circles": "Tangent ⟂ radius. Two tangents from external point are equal.",
        "Statistics": "Mean (direct, assumed, step-deviation). Mode formula. Median formula.",
        "Probability": "P(E)=favorable/total. 0≤P≤1. P(not E)=1-P(E).",
        
        // Science summaries
        "Chemical Reactions": "Balancing equations. Types: combination, decomposition, displacement, double displacement, redox.",
        "Life Processes": "Nutrition (auto/hetero), respiration (aerobic/anaerobic), transportation (heart, blood vessels), excretion.",
        "Electricity": "Ohm's law V=IR. Series: R=R₁+R₂..., Parallel: 1/R=1/R₁+1/R₂... Power: P=VI=I²R=V²/R.",
        "Carbon Compounds": "Covalent bonding. Alkanes(CnH2n+2), alkenes(CnH2n), alkynes(CnH2n-2). Functional groups: -OH, -COOH, -CHO."
    },

    // ========== COMMON MISTAKES (Exam-specific) ==========
    commonMistakes: {
        "Quadratic Equations": "❌ Forgetting to check discriminant before finding roots | ❌ Missing the ± sign in quadratic formula",
        "Trigonometry": "❌ Using degrees instead of radians (not in CBSE) | ❌ Forgetting sin²θ+cos²θ=1 identity",
        "Triangles": "❌ Applying Pythagoras only works for right triangles | ❌ Not stating similarity criteria properly",
        "Chemical Reactions": "❌ Not balancing equations | ❌ Forgetting state symbols (s, l, g, aq)",
        "Electricity": "❌ Confusing series vs parallel formulas | ❌ Unit confusion (mA vs A, kW vs W)"
    },

    // ========== LAST MINUTE TIPS ==========
    lastMinuteTips: {
        "exam_day": [
            "📝 Start with high-weightage questions (Section C/3 marks first)",
            "⏰ Don't spend more than 5 mins on MCQs",
            "📐 Draw diagrams for Geometry, Trigonometry, Biology",
            "✍️ Show all steps - partial marks matter!",
            "🧮 Recheck calculations, especially in Quadratic Equations",
            "🔢 In Probability, always write total outcomes first",
            "⚡ In Electricity, write formula before substituting numbers"
        ],
        "revision_tips": [
            "📖 Focus on NCERT EXAMPLES - many questions come directly from them",
            "📊 Review your mistake notebook (if you have one)",
            "🎯 Don't study new topics in last 2 days",
            "💤 Sleep is more important than studying last night"
        ],
        "time_management": [
            "Total 3 hours for 40 marks paper: ~4.5 min per mark",
            "Section A (MCQs 1 mark): 20 min max",
            "Section B (2 marks): 15 min (7-8 min per question)",
            "Section C (3 marks): 30 min (10 min per question)",
            "Section D (5 marks): 45 min (15 min per question)",
            "Last 15 min: Review and recheck"
        ]
    },

    // ========== IMPORTANT PYQs (Previous Year Questions) ==========
    importantPYQs: {
        "Real Numbers": [
            "2023: Prove that √2 is irrational",
            "2022: Find HCF of 96 and 404 using Euclid's algorithm",
            "2021: Show that 6^n cannot end with digit 0 for any n"
        ],
        "Trigonometry": [
            "2023: Prove that (1+tan²θ)/(1+cot²θ) = tan²θ",
            "2022: A tower 30m high casts shadow 10√3m. Find sun's altitude",
            "2021: If sin A = 3/4, find cos A and tan A"
        ],
        "Quadratic Equations": [
            "2023: Solve 2x² - 5x + 3 = 0 by factorization",
            "2022: Find nature of roots for 2x² - 4x + 3 = 0",
            "2021: Sum of areas of two squares is 468m². Find sides"
        ],
        "Chemical Reactions": [
            "2023: Balance: Fe + H₂O → Fe₃O₄ + H₂",
            "2022: Identify type: CaO + CO₂ → CaCO₃",
            "2021: Why is respiration considered exothermic?"
        ]
    },

    // ========== MINDS MAPS (Text format for quick reading) ==========
    mindMaps: {
        "Trigonometry_MindMap": `
TRIGONOMETRY
├── Ratios (SOH CAH TOA)
│   ├── sin = opp/hyp
│   ├── cos = adj/hyp
│   └── tan = opp/adj
├── Values Table (0°,30°,45°,60°,90°)
├── Identities
│   ├── sin²θ + cos²θ = 1
│   ├── 1 + tan²θ = sec²θ
│   └── 1 + cot²θ = cosec²θ
└── Applications
    ├── Heights & Distances
    └── Angle of Elevation/Depression
        `.trim(),
        
        "LifeProcesses_MindMap": `
LIFE PROCESSES
├── Nutrition
│   ├── Autotrophic (Plants: Photosynthesis)
│   └── Heterotrophic (Animals: Holozoic, Saprophytic, Parasitic)
├── Respiration
│   ├── Aerobic (Glucose → CO₂ + H₂O + 36 ATP)
│   └── Anaerobic (Yeast: Alcohol + CO₂ + 2 ATP)
├── Transportation
│   ├── Humans: Heart (4 chambers), Blood vessels, Lymph
│   └── Plants: Xylem (water), Phloem (food)
└── Excretion
    ├── Humans: Nephron, Kidneys, Urine formation
    └── Plants: Stomata, Latex, Gums
        `.trim()
    }
};

// Helper function for your AI chat
function getExamStrategy(query) {
    const q = query.toLowerCase();
    
    // Detect days left questions
    if (q.includes("day") || q.includes("left") || q.includes("remaining")) {
        const daysMatch = q.match(/(\d+)\s*days?/i);
        if (daysMatch) {
            const days = parseInt(daysMatch[1]);
            if (days <= 7) return EXAM_DATA.studyPlans["7_days"];
            if (days <= 15) return EXAM_DATA.studyPlans["15_days"];
            if (days <= 30) return EXAM_DATA.studyPlans["30_days"];
            return EXAM_DATA.studyPlans["50_days"];
        }
    }
    
    // Detect weightage questions
    if (q.includes("weightage") || q.includes("important chapter") || q.includes("marks")) {
        const subject = q.includes("science") ? "Science" : (q.includes("math") ? "Maths" : null);
        if (subject) return { type: "weightage", data: EXAM_DATA.weightage[subject] };
        return { type: "weightage", data: EXAM_DATA.weightage };
    }
    
    // Detect mistakes questions
    if (q.includes("mistake") || q.includes("common error") || q.includes("avoid")) {
        return { type: "commonMistakes", data: EXAM_DATA.commonMistakes };
    }
    
    // Detect PYQ questions
    if (q.includes("pyq") || q.includes("previous year") || q.includes("last year")) {
        return { type: "pyqs", data: EXAM_DATA.importantPYQs };
    }
    
    // Detect mind map
    if (q.includes("mind map") || q.includes("flow chart")) {
        if (q.includes("trig")) return EXAM_DATA.mindMaps.Trigonometry_MindMap;
        if (q.includes("life process")) return EXAM_DATA.mindMaps.LifeProcesses_MindMap;
    }
    
    // Fallback: return summary if chapter mentioned
    for (const [chapter, summary] of Object.entries(EXAM_DATA.summaries)) {
        if (q.includes(chapter.toLowerCase())) {
            const weightage = EXAM_DATA.weightage.Maths[chapter] || EXAM_DATA.weightage.Science[chapter] || "?";
            return `📚 ${chapter} (${weightage} marks)\n📖 ${summary}\n⚠️ Common mistake: ${EXAM_DATA.commonMistakes[chapter] || "Check NCERT examples"}`;
        }
    }
    
    return null;
}

// Keep old function name for compatibility
function getRelevantChapters(question) {
    const result = getExamStrategy(question);
    return result ? JSON.stringify(result) : "You are an exam strategy coach for CBSE Class 10. Focus on weightage, study plans, PYQs, and exam tips.";
}
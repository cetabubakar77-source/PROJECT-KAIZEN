// ========== NOTES MODULE ==========
// Science Notes — Chapter-wise

let notesInitialized = false;
let pdfDataStore = {}; // Store PDFs by chapter key

// Pre-load PDFs from file paths if available
if (typeof PRELOADED_PDFS !== 'undefined') {
    Object.keys(PRELOADED_PDFS).forEach(function(key) {
        pdfDataStore[key] = PRELOADED_PDFS[key];
    });
}

const SCIENCE_CHAPTERS = {
    "Science 1": [
        "Light – Reflection and Refraction",
        "Human Eye and Colourful World",
        "Electricity",
        "Magnetic Effects of Electric Current",
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-metals",
        "Carbon and its Compounds"
    ],
    "Science 2": [
        "Life Processes",
        "Control and Coordination",
        "How do Organisms Reproduce?",
        "Heredity and Evolution",
        "Our Environment",
        "Natural Resources"
    ]
};

function openNotesView() {
    const notesView = document.getElementById('notes-view');
    if (!notesView) return;

    if (!notesInitialized) {
        renderNotesHome(notesView);
        notesInitialized = true;
    }
}

function renderNotesHome(container) {
    let chaptersHTML = '';
    Object.keys(SCIENCE_CHAPTERS).forEach(part => {
        const partLabel = part.replace('Science ', 'Science — Part ');
        chaptersHTML += `<div class="notes-part-header">${partLabel}</div>`;
        chaptersHTML += `<div class="notes-chapter-grid">`;
        SCIENCE_CHAPTERS[part].forEach((ch, idx) => {
            chaptersHTML += `
                <div class="notes-chapter-card" data-part="${part}" data-chapter="${ch}">
                    <div class="notes-chapter-index">${idx + 1}</div>
                    <div class="notes-chapter-name">${ch}</div>
                    <div class="notes-chapter-action">
                        <i class="ph ph-caret-right"></i>
                    </div>
                </div>
            `;
        });
        chaptersHTML += `</div>`;
    });

    container.innerHTML = `
        <div class="notes-header">
            <h2>Science Notes</h2>
            <p class="notes-subtitle">Chapter-wise detailed notes</p>
        </div>
        <div class="notes-body">
            ${chaptersHTML}
        </div>
    `;

    // Attach click handlers
    container.querySelectorAll('.notes-chapter-card').forEach(card => {
        card.addEventListener('click', () => {
            const part = card.dataset.part;
            const chapter = card.dataset.chapter;
            openChapterNotes(part, chapter);
        });
    });
}

function openChapterNotes(part, chapter) {
    const container = document.getElementById('notes-view');
    if (!container) return;

    const chKey = part + '|' + chapter;
    const savedPdf = pdfDataStore[chKey];

    container.innerHTML = `
        <div class="notes-chapter-header">
            <button class="notes-back-btn" id="notes-back-btn">
                <i class="ph ph-arrow-left"></i>
            </button>
            <div class="notes-chapter-title-wrap">
                <span class="notes-chapter-part">${part}</span>
                <h2 class="notes-chapter-title">${chapter}</h2>
            </div>
        </div>

        <div class="notes-chapter-content">
            ${savedPdf ? `
                <div class="notes-pdf-viewer">
                    <iframe src="${savedPdf}" class="notes-pdf-frame" type="application/pdf" allowfullscreen></iframe>
                    <div class="notes-pdf-fallback">
                        <p>PDF not loading? Tap below to open:</p>
                        <a href="${savedPdf}" target="_blank" class="notes-pdf-open-btn">
                            <i class="ph ph-file-pdf"></i> Open PDF
                        </a>
                    </div>
                </div>
            ` : `
                <div class="notes-empty-state">
                    <div class="notes-empty-icon">
                        <i class="ph ph-file-pdf"></i>
                    </div>
                    <h3>Notes Coming Soon</h3>
                    <p>Detailed notes for this chapter are being prepared.</p>
                </div>
            `}
        </div>
    `;

    // Back button
    document.getElementById('notes-back-btn')?.addEventListener('click', () => {
        renderNotesHome(container);
    });

    // Fix: Make PDF viewer scrollable on mobile
    if (savedPdf) {
        setTimeout(() => {
            const viewer = document.querySelector('.notes-pdf-viewer');
            if (viewer) {
                viewer.style.overflow = 'auto';
                viewer.style.webkitOverflowScrolling = 'touch';
            }
        }, 100);
    }
}

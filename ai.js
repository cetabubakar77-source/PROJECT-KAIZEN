// ========== AI CHAT MODULE ==========

let selectedBase64Image = null;
let selectedFileText = null;
let conversationHistory = [];
let aiInitialized = false;
let chatLoaded = false;
let currentChatId = null; // Track current active chat session

function openAiView() {
    const aiView = document.getElementById('ai-view');
    if (!aiView) return;
    
    if (!aiInitialized) {
        aiView.innerHTML = `
            <!-- Sidebar Drawer for Chat History -->
            <div id="ai-sidebar" class="ai-sidebar">
                <div class="ai-sidebar-header">
                    <h3><i class="ph-fill ph-chat-circle-text"></i> Saved Chats</h3>
                    <button id="close-sidebar-btn" class="close-sidebar-btn" title="Close History">
                        <i class="ph ph-x"></i>
                    </button>
                </div>
                
                <button id="new-chat-btn" class="new-chat-btn">
                    <i class="ph ph-plus-circle"></i>
                    <span>New Chat</span>
                </button>
                
                <div class="sidebar-notice">
                    <i class="ph ph-info"></i>
                    <span>Chats are kept for 30 days and then automatically deleted.</span>
                </div>
                
                <div id="ai-sessions-list" class="sessions-list">
                    <div class="sidebar-loading">Loading saved chats...</div>
                </div>
            </div>
            
            <!-- Sidebar Overlay -->
            <div id="ai-sidebar-overlay" class="ai-sidebar-overlay"></div>
            
            <!-- Main Chat Area -->
            <div class="ai-main-chat">
                <div class="ai-chat-header">
                    <button class="history-toggle-btn" id="ai-history-btn" title="Chat History">
                        <i class="ph ph-list"></i>
                    </button>
                    <div class="header-info">
                        <h2>
                            <i class="ph-fill ph-sparkle"></i> 
                            KAIZEN AI Coach
                        </h2>
                        <div class="header-meta">
                            <span class="model-badge">Gemini 2.5 Flash</span>
                            <span id="chat-session-title" class="session-title-badge">New Chat</span>
                        </div>
                    </div>
                    <button class="clear-chat-btn" id="ai-clear-btn" title="Clear Conversation">
                        <i class="ph ph-trash"></i>
                        <span>Clear Chat</span>
                    </button>
                </div>
                
                <div id="chat-messages" class="chat-container">
                    <div class="chat-message ai">🎯 Hi! I'm your Exam Coach. I can help you with:<br><br>
📊 Chapter weightage & prioritization<br>
📅 Study plans (based on days left)<br>
⚠️ Common mistakes to avoid<br>
📝 PYQs and exam strategies<br>
🧠 Quick revision summaries<br><br>
Ask me: "Only 50 days left, what should I study?" or "Create a 30-day study plan"</div>
                </div>

                <div class="suggestion-container" id="suggestion-container">
                    <span class="suggestion-chip" data-prompt="Only 50 days left, what should I study in Science?">Only 50 days left? ⏳</span>
                    <span class="suggestion-chip" data-prompt="Create a 30-day study plan for my board exam.">30-day study plan 📅</span>
                    <span class="suggestion-chip" data-prompt="What are the common mistakes to avoid in Science class 10?">Common mistakes ⚠️</span>
                    <span class="suggestion-chip" data-prompt="Give me PYQs and preparation strategy for Science.">PYQs & strategy 📝</span>
                </div>

                <div class="ai-notice-banner">
                    <span><i class="ph ph-clock-counter-clockwise"></i> Note: Past chats are removed after 30 days.</span>
                </div>

                <div class="ai-input-wrapper">
                    <div id="image-preview-container" class="attachment-preview-area" style="display: none;">
                        <div class="preview-chip">
                            <img id="image-preview" src="" alt="preview" style="display: none;">
                            <span id="file-name-preview" style="display: none;"></span>
                            <button id="remove-image-btn" class="remove-preview">×</button>
                        </div>
                    </div>
                    <div class="input-row">
                        <input type="file" id="ai-file-input" accept="image/*, .txt" style="display: none;">
                        <textarea id="ai-message-input" placeholder="Ask Kaizen AI anything..." rows="1"></textarea>
                    </div>
                    <div class="action-row">
                        <div class="left-btns">
                            <button id="ai-attach-btn" class="icon-btn" title="Attach text file (.txt)">
                                <i class="ph ph-paperclip" style="font-size: 18px;"></i>
                            </button>
                            <button id="ai-image-btn" class="icon-btn" title="Upload image">
                                <i class="ph ph-image-square" style="font-size: 18px;"></i>
                            </button>
                        </div>
                        <button class="send-btn" id="ai-send-btn">
                            <span>Send</span>
                            <i class="ph ph-paper-plane" style="font-size: 14px;"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        setupAiListeners();
        aiInitialized = true;

        // Auto load recent session or start new chat
        setTimeout(async () => {
            const userId = localStorage.getItem('currentUserId') || 'guest';
            const sessions = await window.loadChatSessions(userId);
            if (sessions && sessions.length > 0) {
                loadSession(sessions[0].id, sessions[0].title);
            } else {
                renderWelcomeMessage();
            }
            refreshSessionsList();
        }, 300);
    } else {
        refreshSessionsList();
    }
}

function setupAiListeners() {
    const aiMessageInput = document.getElementById('ai-message-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiFileInput = document.getElementById('ai-file-input');
    const aiAttachBtn = document.getElementById('ai-attach-btn');
    const aiImageBtn = document.getElementById('ai-image-btn');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const fileNamePreview = document.getElementById('file-name-preview');
    const removeImageBtn = document.getElementById('remove-image-btn');
    const aiClearBtn = document.getElementById('ai-clear-btn');
    
    // Sidebar elements
    const aiHistoryBtn = document.getElementById('ai-history-btn');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarOverlay = document.getElementById('ai-sidebar-overlay');
    const newChatBtn = document.getElementById('new-chat-btn');

    if (!aiMessageInput) return;
    
    // Sidebar toggle events
    if (aiHistoryBtn) {
        aiHistoryBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar(true);
        });
    }
    if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', () => toggleSidebar(false));
    if (newChatBtn) {
        newChatBtn.addEventListener('click', () => {
            startNewChat();
            toggleSidebar(false);
        });
    }

    // Attach File Click Handlers
    if (aiAttachBtn) aiAttachBtn.addEventListener('click', () => aiFileInput.click());
    if (aiImageBtn) aiImageBtn.addEventListener('click', () => aiFileInput.click());
    
    // File Input Change handler
    aiFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                selectedBase64Image = ev.target.result;
                imagePreview.src = selectedBase64Image;
                imagePreview.style.display = 'block';
                fileNamePreview.style.display = 'none';
                imagePreviewContainer.style.display = 'flex';
                selectedFileText = null;
            };
            reader.readAsDataURL(file);
        } else if (file.name.endsWith('.txt')) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                selectedFileText = ev.target.result;
                imagePreview.style.display = 'none';
                fileNamePreview.textContent = file.name;
                fileNamePreview.style.display = 'inline';
                imagePreviewContainer.style.display = 'flex';
                selectedBase64Image = null;
            };
            reader.readAsText(file);
        } else {
            alert('Only image and .txt files are supported currently.');
        }
    });
    
    // Remove attachment preview handler
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', () => {
            selectedBase64Image = null;
            selectedFileText = null;
            imagePreviewContainer.style.display = 'none';
            aiFileInput.value = '';
        });
    }
    
    // Clear chat handler
    if (aiClearBtn) {
        aiClearBtn.addEventListener('click', async () => {
            if (currentChatId) {
                if (confirm('Are you sure you want to delete this chat history? This cannot be undone.')) {
                    await window.deleteChatSession(currentChatId);
                    startNewChat();
                    refreshSessionsList();
                }
            } else {
                startNewChat();
            }
        });
    }
    
    // Suggestion chips handler
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const promptText = chip.getAttribute('data-prompt');
            if (promptText) {
                aiMessageInput.value = promptText;
                aiMessageInput.focus();
                aiMessageInput.style.height = 'auto';
                aiMessageInput.style.height = Math.min(120, aiMessageInput.scrollHeight) + 'px';
            }
        });
    });
    
    // Send message handlers
    if (aiSendBtn) aiSendBtn.addEventListener('click', sendAiMessage);
    
    aiMessageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendAiMessage();
        }
    });
    
    // Textarea height auto-resizer
    aiMessageInput.addEventListener('input', () => {
        aiMessageInput.style.height = 'auto';
        aiMessageInput.style.height = Math.min(120, aiMessageInput.scrollHeight) + 'px';
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollChatToBottom() {
    const container = document.getElementById('chat-messages');
    if (container) container.scrollTop = container.scrollHeight;
}

// Render welcome default message
function renderWelcomeMessage() {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    chatMessages.innerHTML = `
        <div class="chat-message ai">🎯 Hi! I'm your Exam Coach. I can help you with:<br><br>
📊 Chapter weightage & prioritization<br>
📅 Study plans (based on days left)<br>
⚠️ Common mistakes to avoid<br>
📝 PYQs and exam strategies<br>
🧠 Quick revision summaries<br><br>
Ask me: "Only 50 days left, what should I study?" or "Create a 30-day study plan"</div>
    `;
    
    const titleBadge = document.getElementById('chat-session-title');
    if (titleBadge) {
        titleBadge.textContent = 'New Chat';
        titleBadge.classList.remove('active-session');
    }
    
    const suggestionContainer = document.getElementById('suggestion-container');
    if (suggestionContainer) suggestionContainer.style.display = 'flex';
    
    scrollChatToBottom();
}

// Toggle Sidebar Drawer visibility
function toggleSidebar(show) {
    const sidebar = document.getElementById('ai-sidebar');
    const overlay = document.getElementById('ai-sidebar-overlay');
    if (!sidebar || !overlay) return;
    
    if (show) {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        refreshSessionsList();
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    }
}

// Refresh Saved Chats Sessions List
async function refreshSessionsList() {
    const sessionsList = document.getElementById('ai-sessions-list');
    if (!sessionsList) return;
    
    const userId = localStorage.getItem('currentUserId') || 'guest';
    
    sessionsList.innerHTML = `<div class="sidebar-loading">Loading saved chats...</div>`;
    
    try {
        const sessions = await window.loadChatSessions(userId);
        
        if (!sessions || sessions.length === 0) {
            sessionsList.innerHTML = `<div class="sidebar-empty">No past chats yet. Start a conversation to save one!</div>`;
            return;
        }
        
        sessionsList.innerHTML = '';
        sessions.forEach(sess => {
            const item = document.createElement('div');
            item.className = `session-item ${currentChatId === sess.id ? 'active' : ''}`;
            item.dataset.id = sess.id;
            
            const truncatedTitle = sess.title.length > 28 ? sess.title.substring(0, 28) + '...' : sess.title;
            
            item.innerHTML = `
                <div class="session-info">
                    <i class="ph ph-chat-circle"></i>
                    <span class="session-title" title="${escapeHtml(sess.title)}">${escapeHtml(truncatedTitle)}</span>
                </div>
                <button class="delete-session-btn" title="Delete Chat">
                    <i class="ph ph-trash"></i>
                </button>
            `;
            
            // Load chat event
            item.querySelector('.session-info').addEventListener('click', () => {
                loadSession(sess.id, sess.title);
                toggleSidebar(false);
            });
            
            // Delete chat event
            item.querySelector('.delete-session-btn').addEventListener('click', async (e) => {
                e.stopPropagation();
                if (confirm('Delete this chat history?')) {
                    await window.deleteChatSession(sess.id);
                    if (currentChatId === sess.id) {
                        startNewChat();
                    }
                    refreshSessionsList();
                }
            });
            
            sessionsList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading sessions:', error);
        sessionsList.innerHTML = `<div class="sidebar-empty">Error loading chats. Please refresh.</div>`;
    }
}

// Load a specific chat session
async function loadSession(chatId, title) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    currentChatId = chatId;
    
    const titleBadge = document.getElementById('chat-session-title');
    if (titleBadge) {
        titleBadge.textContent = title.length > 18 ? title.substring(0, 18) + '...' : title;
        titleBadge.classList.add('active-session');
    }
    
    // Hide suggestions when viewing history
    const suggestionContainer = document.getElementById('suggestion-container');
    if (suggestionContainer) suggestionContainer.style.display = 'none';
    
    chatMessages.innerHTML = `<div class="chat-loading-history"><div class="dots-bounce"><span></span><span></span><span></span></div></div>`;
    
    try {
        const savedMessages = await window.loadChatMessageHistory(chatId);
        chatMessages.innerHTML = '';
        conversationHistory = [];
        
        if (savedMessages && savedMessages.length > 0) {
            savedMessages.forEach(msg => {
                const div = document.createElement('div');
                div.className = `chat-message ${msg.role}`;
                div.innerHTML = msg.role === 'ai' ? formatAiResponse(msg.message) : escapeHtml(msg.message);
                chatMessages.appendChild(div);
                
                conversationHistory.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.message }]
                });
            });
        } else {
            renderWelcomeMessage();
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        renderWelcomeMessage();
    }
    
    scrollChatToBottom();
}

// Start a fresh chat
function startNewChat() {
    currentChatId = null;
    conversationHistory = [];
    renderWelcomeMessage();
    
    const titleBadge = document.getElementById('chat-session-title');
    if (titleBadge) {
        titleBadge.textContent = 'New Chat';
        titleBadge.classList.remove('active-session');
    }
}

// Markdown-like text formatter for AI responses
function formatAiResponse(text) {
    if (!text) return '';
    
    let html = escapeHtml(text);
    
    const codeBlocks = [];
    html = html.replace(/```(\w*)\n([\s\S]*?)\n```/g, (match, lang, code) => {
        const index = codeBlocks.length;
        codeBlocks.push(`<pre><code class="language-${lang || 'none'}">${code}</code></pre>`);
        return `__CODE_BLOCK_PLACEHOLDER_${index}__`;
    });
    
    const inlineCodes = [];
    html = html.replace(/`([^`\n]+)`/g, (match, code) => {
        const index = inlineCodes.length;
        inlineCodes.push(`<code>${code}</code>`);
        return `__INLINE_CODE_PLACEHOLDER_${index}__`;
    });
    
    html = html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');
    
    const lines = html.split('\n');
    let inTable = false;
    let tableHtml = '';
    let processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('|') && line.endsWith('|')) {
            if (!inTable) {
                inTable = true;
                tableHtml = '<table>';
            }
            
            if (line.match(/^\|[\s:-|-]*\|$/)) {
                continue;
            }
            
            const cols = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
            const tag = tableHtml.includes('<thead>') ? 'td' : 'th';
            
            let rowHtml = '<tr>';
            cols.forEach(col => {
                rowHtml += `<${tag}>${col}</${tag}>`;
            });
            rowHtml += '</tr>';
            
            if (tag === 'th') {
                tableHtml += `<thead>${rowHtml}</thead><tbody>`;
            } else {
                tableHtml += rowHtml;
            }
        } else {
            if (inTable) {
                inTable = false;
                tableHtml += '</tbody></table>';
                processedLines.push(tableHtml);
                tableHtml = '';
            }
            processedLines.push(line);
        }
    }
    if (inTable) {
        tableHtml += '</tbody></table>';
        processedLines.push(tableHtml);
    }
    
    html = processedLines.join('\n');
    
    const finalLines = html.split('\n');
    let inList = false;
    let listHtml = '';
    processedLines = [];
    
    for (let i = 0; i < finalLines.length; i++) {
        const line = finalLines[i];
        const trimmed = line.trim();
        
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            if (!inList) {
                inList = true;
                listHtml = '<ul>';
            }
            const bulletContent = trimmed.replace(/^[\*\-]\s+/, '');
            listHtml += `<li>${bulletContent}</li>`;
        } else {
            if (inList) {
                inList = false;
                listHtml += '</ul>';
                processedLines.push(listHtml);
                listHtml = '';
            }
            processedLines.push(line);
        }
    }
    if (inList) {
        listHtml += '</ul>';
        processedLines.push(listHtml);
    }
    
    html = processedLines.join('\n');
    
    html = html.split('\n').map(line => {
        if (line.includes('__CODE_BLOCK_PLACEHOLDER_') || line.includes('<table>') || line.includes('<tr>') || line.includes('<ul>') || line.includes('</ul>') || line.startsWith('<tr>') || line.startsWith('<tr>') || line.startsWith('<th>')) {
            return line;
        }
        return line + '<br>';
    }).join('\n');
    
    html = html.replace(/(<br>){2,}/g, '<br><br>');
    
    codeBlocks.forEach((block, index) => {
        html = html.replace(`__CODE_BLOCK_PLACEHOLDER_${index}__`, block);
    });
    
    inlineCodes.forEach((code, index) => {
        html = html.replace(`__INLINE_CODE_PLACEHOLDER_${index}__`, code);
    });
    
    return html;
}

async function sendAiMessage() {
    const aiMessageInput = document.getElementById('ai-message-input');
    const chatMessages = document.getElementById('chat-messages');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const aiFileInput = document.getElementById('ai-file-input');
    
    if (!aiMessageInput || !chatMessages) return;
    
    const text = aiMessageInput.value.trim();
    if (!text && !selectedBase64Image && !selectedFileText) return;
    
    // Append User Message to UI
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    let content = '';
    if (text) content += `<div>${escapeHtml(text)}</div>`;
    if (selectedBase64Image) content += `<img src="${selectedBase64Image}" />`;
    if (selectedFileText) content += `<div style="font-size:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.1); padding:6px 10px; border-radius:8px; margin-top:6px; display:inline-flex; align-items:center; gap:6px;"><i class="ph ph-file-text"></i> File Attached</div>`;
    userDiv.innerHTML = content;
    chatMessages.appendChild(userDiv);

    // Hide suggestion chips on first message
    const suggestionContainer = document.getElementById('suggestion-container');
    if (suggestionContainer) suggestionContainer.style.display = 'none';

    const currentImg = selectedBase64Image;
    const currentTxt = selectedFileText;
    
    aiMessageInput.value = '';
    aiMessageInput.style.height = 'auto';
    selectedBase64Image = null;
    selectedFileText = null;
    if (imagePreviewContainer) imagePreviewContainer.style.display = 'none';
    if (aiFileInput) aiFileInput.value = '';
    scrollChatToBottom();
    
    const userId = localStorage.getItem('currentUserId') || 'guest';
    
    // Save to database / local storage
    if (text) {
        try {
            if (!currentChatId) {
                const titleText = text.substring(0, 40);
                currentChatId = await window.createChatSession(userId, titleText);
                
                const titleBadge = document.getElementById('chat-session-title');
                if (titleBadge) {
                    titleBadge.textContent = titleText.length > 18 ? titleText.substring(0, 18) + '...' : titleText;
                    titleBadge.classList.add('active-session');
                }
                refreshSessionsList();
            }
            
            await window.saveChatMessage(userId, text, 'user', currentChatId);
        } catch (dbErr) {
            console.error("Database error saving user message:", dbErr);
        }
    }
    
    conversationHistory.push({ role: "user", parts: [{ text: text || "What's in this image/file?" }] });
    
    // Thinking Animation Bubble
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai-typing-wrapper';
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.innerHTML = `
        <div class="thinking-bubble">
            <div class="thinking-avatar">
                <i class="ph-fill ph-sparkle"></i>
            </div>
            <div class="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollChatToBottom();
    
    // Activate neon border animation on the AI view
    const aiView = document.getElementById('ai-view');
    if (aiView) aiView.classList.add('ai-thinking');
    
    try {
        const API_KEY = await window.getGeminiApiKey();
        
        if (!API_KEY) {
            throw new Error('Could not get API key');
        }
        
        let parts = [];
        let prompt = text || "What's in this image/file?";
        if (currentTxt) prompt += `\n\n[File content]:\n${currentTxt}`;
        parts.push({ text: prompt });
        if (currentImg) {
            const b64 = currentImg.split(',')[1];
            const mime = currentImg.match(/data:(image\/\w+);/)?.[1] || 'image/png';
            parts.push({ inline_data: { mime_type: mime, data: b64 } });
        }
        
        const relevantChapters = typeof getRelevantChapters === 'function' ? getRelevantChapters(prompt) : '';
        
        const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [...conversationHistory.slice(-6), { role: "user", parts }],
                systemInstruction: {
                    parts: [{ text: `${relevantChapters}\n\nYou are a concise AI tutor for Class 10 CBSE students. **Keep all responses under 400 words unless asked for more details.** Use bullet points. Be direct and practical. No long introductions or fluff.` }]
                },
                generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
            })
        });
        
        const data = await resp.json();
        const typingElem = document.getElementById('ai-typing-indicator');
        if (typingElem) typingElem.remove();
        
        // Deactivate neon border animation
        const aiViewElem = document.getElementById('ai-view');
        if (aiViewElem) aiViewElem.classList.remove('ai-thinking');
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            const replyText = data.candidates[0].content.parts[0].text;
            
            const replyDiv = document.createElement('div');
            replyDiv.className = 'chat-message ai';
            replyDiv.innerHTML = formatAiResponse(replyText);
            chatMessages.appendChild(replyDiv);
            
            // Save AI reply to database / local storage
            if (currentChatId) {
                try {
                    await window.saveChatMessage(userId, replyText, 'ai', currentChatId);
                } catch (dbErr) {
                    console.error("Database error saving AI response:", dbErr);
                }
            }

            conversationHistory.push({ role: "model", parts: [{ text: replyText }] });
        } else {
            console.error("Invalid API Response format:", data);
            const errDiv = document.createElement('div');
            errDiv.className = 'chat-message ai';
            errDiv.textContent = 'Sorry, Kaizen AI coach encountered an issue. Please try again.';
            chatMessages.appendChild(errDiv);
        }
    } catch (err) {
        const typingElem = document.getElementById('ai-typing-indicator');
        if (typingElem) typingElem.remove();
        // Deactivate neon border animation on error
        const aiViewCatch = document.getElementById('ai-view');
        if (aiViewCatch) aiViewCatch.classList.remove('ai-thinking');
        const errDiv = document.createElement('div');
        errDiv.className = 'chat-message ai';
        errDiv.textContent = 'Error: Check your internet connection or API setup.';
        chatMessages.appendChild(errDiv);
        console.error("API Call error:", err);
    }
    scrollChatToBottom();
}
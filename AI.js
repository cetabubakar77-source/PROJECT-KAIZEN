// ========== AI CHAT MODULE ==========

let selectedBase64Image = null;
let selectedFileText = null;
let conversationHistory = [];
let aiInitialized = false;

function openAiView() {
    const aiView = document.getElementById('ai-view');
    if (!aiView) return;
    
    if (!aiInitialized) {
        aiView.innerHTML = `
            <div class="profile-header">
                <h2>KAIZEN AI</h2>
                <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Ask me anything, upload images or text files!</p>
            </div>
            <div id="chat-messages" class="chat-container" style="flex: 1; overflow-y: auto; padding: 8px 4px 16px 4px; display: flex; flex-direction: column; gap: 16px;">
                <div class="chat-message ai">🎯 Hi! I'm your CBSE Class 10 Exam Coach. I can help you with:<br><br>
    📊 Chapter weightage & prioritization<br>
    📅 Study plans (based on days left)<br>
    ⚠️ Common mistakes to avoid<br>
    📝 PYQs and exam strategies<br>
    🧠 Quick revision summaries<br><br>
    Ask me: "Only 50 days left, what should I study?" or "Create a 30-day study plan"</div>
            </div>
            <div class="container_chat_bot" style="flex-shrink: 0; margin-top: auto;">
                <div class="container-chat-options">
                    <div class="chat">
                        <div class="chat-bot">
                            <input type="file" id="ai-file-input" accept="image/*, .txt" style="display: none;">
                            <textarea id="ai-message-input" name="chat_bot" placeholder="Ask something..."></textarea>
                        </div>
                        <div class="options">
                            <div class="btns-add">
                                <button id="ai-attach-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"></path>
                                    </svg>
                                </button>
                                <button id="ai-image-btn">
                                    <svg viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6"
                                            stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" fill="none"></path>
                                    </svg>
                                </button>
                            </div>
                            <button class="btn-submit" id="ai-send-btn">
                                <i>
                                    <svg viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"></path>
                                    </svg>
                                </i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tags">
                    <span>Create An Image</span>
                    <span>Analyse Data</span>
                    <span>More</span>
                </div>
            </div>
            <div id="image-preview-container" style="display: none; position: fixed; bottom: 100px; left: 20px; background: #1e1e1e; border-radius: 12px; padding: 8px; z-index: 100;">
                <img id="image-preview" src="" alt="preview" style="max-height: 50px; border-radius: 8px; display: none;">
                <span id="file-name-preview" style="display: none; color: #fff; font-size: 12px;"></span>
                <button id="remove-image-btn" style="background: red; color: white; border: none; border-radius: 50%; width: 20px; height: 20px; cursor: pointer; margin-left: 8px;">×</button>
            </div>
        `;
        
        // Setup AI listeners
        setupAiListeners();
        aiInitialized = true;
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
    
    if (!aiAttachBtn || !aiFileInput) return;
    
    aiAttachBtn.addEventListener('click', () => aiFileInput.click());
    aiImageBtn.addEventListener('click', () => aiFileInput.click());
    
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
    
    removeImageBtn.addEventListener('click', () => {
        selectedBase64Image = null;
        selectedFileText = null;
        imagePreviewContainer.style.display = 'none';
        aiFileInput.value = '';
    });
    
    aiSendBtn.addEventListener('click', sendAiMessage);
    aiMessageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendAiMessage();
        }
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

async function sendAiMessage() {
    const aiMessageInput = document.getElementById('ai-message-input');
    const chatMessages = document.getElementById('chat-messages');
    const imagePreviewContainer = document.getElementById('image-preview-container');
    const aiFileInput = document.getElementById('ai-file-input');
    
    if (!aiMessageInput || !chatMessages) return;
    
    const text = aiMessageInput.value.trim();
    if (!text && !selectedBase64Image && !selectedFileText) return;
    
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    let content = '';
    if (text) content += `<div>${escapeHtml(text)}</div>`;
    if (selectedBase64Image) content += `<img src="${selectedBase64Image}" style="max-width:200px; border-radius:8px; margin-top:8px;" />`;
    if (selectedFileText) content += `<div style="font-size:12px; background:rgba(255,255,255,0.1); padding:4px; border-radius:4px; margin-top:4px;">📄 File attached</div>`;
    userDiv.innerHTML = content;
    chatMessages.appendChild(userDiv);
    
    conversationHistory.push({ role: "user", parts: [{ text: text || "What's in this image/file?" }] });
    
    aiMessageInput.value = '';
    const currentImg = selectedBase64Image;
    const currentTxt = selectedFileText;
    selectedBase64Image = null;
    selectedFileText = null;
    if (imagePreviewContainer) imagePreviewContainer.style.display = 'none';
    if (aiFileInput) aiFileInput.value = '';
    scrollChatToBottom();
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai';
    typingDiv.id = 'ai-typing-indicator';
    typingDiv.innerHTML = `<div style="display:flex;align-items:center;gap:8px;"><span>AI is thinking...</span></div>`;
    chatMessages.appendChild(typingDiv);
    scrollChatToBottom();
    
    try {
        const API_KEY = 'AIzaSyDQYVtr2Refpb4-EQJ4_Bz9_vLirnXBuG8';
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
                    parts: [{ text: `${relevantChapters}\n\nYou are a helpful AI tutor for students.` }]
                },
                generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
            })
        });
        
        const data = await resp.json();
        const typingElem = document.getElementById('ai-typing-indicator');
        if (typingElem) typingElem.remove();
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'chat-message ai';
            replyDiv.innerHTML = data.candidates[0].content.parts[0].text
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            chatMessages.appendChild(replyDiv);
            conversationHistory.push({ role: "model", parts: [{ text: data.candidates[0].content.parts[0].text }] });
        } else {
            const errDiv = document.createElement('div');
            errDiv.className = 'chat-message ai';
            errDiv.textContent = 'Sorry, something went wrong. Please try again.';
            chatMessages.appendChild(errDiv);
        }
    } catch (err) {
        const typingElem = document.getElementById('ai-typing-indicator');
        if (typingElem) typingElem.remove();
        const errDiv = document.createElement('div');
        errDiv.className = 'chat-message ai';
        errDiv.textContent = 'Error: Check your internet connection.';
        chatMessages.appendChild(errDiv);
        console.error(err);
    }
    scrollChatToBottom();
}
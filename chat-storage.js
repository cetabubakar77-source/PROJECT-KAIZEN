// ========== CHAT STORAGE WITH AUTO-DELETE & SESSIONS ==========

import { 
    collection, 
    addDoc, 
    query, 
    getDocs, 
    deleteDoc, 
    doc, 
    where, 
    writeBatch
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

let currentRetentionDays = 30;

// ================= LOCAL STORAGE FALLBACK HELPERS =================

function createLocalChatSession(title) {
    try {
        const expiresAt = Date.now() + (currentRetentionDays * 24 * 60 * 60 * 1000);
        const localSessions = JSON.parse(localStorage.getItem('local_chat_sessions') || '[]');
        const newSession = {
            id: 'local_sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            userId: 'guest',
            title: title,
            createdAt: Date.now(),
            expiresAt: expiresAt
        };
        localSessions.push(newSession);
        localStorage.setItem('local_chat_sessions', JSON.stringify(localSessions));
        console.log(`💾 Local chat session created: ${newSession.id}`);
        return newSession.id;
    } catch (e) {
        console.error("Error creating local session:", e);
        return null;
    }
}

function loadLocalChatSessions() {
    try {
        let localSessions = JSON.parse(localStorage.getItem('local_chat_sessions') || '[]');
        const now = Date.now();
        // Clean up expired and sort descending
        localSessions = localSessions
            .filter(sess => sess.expiresAt > now)
            .sort((a, b) => b.createdAt - a.createdAt);
        localStorage.setItem('local_chat_sessions', JSON.stringify(localSessions));
        return localSessions;
    } catch (e) {
        console.error("Error loading local sessions:", e);
        return [];
    }
}

function loadLocalChatMessageHistory(chatId) {
    try {
        let localMessages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        const now = Date.now();
        // Clean up expired, filter by chatId, sort ascending
        localMessages = localMessages
            .filter(msg => msg.expiresAt > now && msg.chatId === chatId)
            .sort((a, b) => a.createdAt - b.createdAt);
        return localMessages;
    } catch (e) {
        console.error("Error loading local messages:", e);
        return [];
    }
}

function saveLocalChatMessage(message, role, chatId) {
    try {
        const expiresAt = Date.now() + (currentRetentionDays * 24 * 60 * 60 * 1000);
        const localMessages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        const newMessage = {
            id: 'local_msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            userId: 'guest',
            chatId: chatId,
            message: message,
            role: role,
            createdAt: Date.now(),
            expiresAt: expiresAt
        };
        localMessages.push(newMessage);
        localStorage.setItem('local_chat_messages', JSON.stringify(localMessages));
        console.log(`💾 Local message saved: ${newMessage.id}`);
        return newMessage.id;
    } catch (e) {
        console.error("Error saving local message:", e);
        return null;
    }
}

function deleteLocalChatSession(chatId) {
    try {
        let localSessions = JSON.parse(localStorage.getItem('local_chat_sessions') || '[]');
        localSessions = localSessions.filter(sess => sess.id !== chatId);
        localStorage.setItem('local_chat_sessions', JSON.stringify(localSessions));
        
        let localMessages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        localMessages = localMessages.filter(msg => msg.chatId !== chatId);
        localStorage.setItem('local_chat_messages', JSON.stringify(localMessages));
        console.log(`🗑️ Deleted local session: ${chatId}`);
        return true;
    } catch (e) {
        console.error("Error deleting local session:", e);
        return false;
    }
}


// ================= CORE EXPORTED STORAGE FUNCTIONS =================

// Create a new chat session
async function createChatSession(userId, title) {
    if (!userId || userId === 'guest' || userId === 'null' || userId === 'undefined') {
        return createLocalChatSession(title);
    }
    try {
        const expiresAt = Date.now() + (currentRetentionDays * 24 * 60 * 60 * 1000);
        const docRef = await addDoc(collection(window.db, "chat_sessions"), {
            userId: userId,
            title: title,
            createdAt: Date.now(),
            expiresAt: expiresAt
        });
        console.log(`💾 Chat session created in Firestore: ${docRef.id}`);
        return docRef.id;
    } catch (error) {
        console.warn("Firestore error creating session, falling back to Local Storage:", error);
        return createLocalChatSession(title);
    }
}

// Load all chat sessions for a user
async function loadChatSessions(userId) {
    if (!userId || userId === 'guest' || userId === 'null' || userId === 'undefined') {
        return loadLocalChatSessions();
    }
    try {
        const q = query(
            collection(window.db, "chat_sessions"),
            where("userId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        let sessions = [];
        querySnapshot.forEach((doc) => {
            sessions.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        const now = Date.now();
        // Filter out expired chats and sort by createdAt descending
        sessions = sessions
            .filter(sess => !sess.expiresAt || sess.expiresAt > now)
            .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            
        console.log(`📥 Loaded & filtered ${sessions.length} Firestore chat sessions`);
        return sessions;
    } catch (error) {
        console.warn("Firestore error loading sessions, falling back to Local Storage:", error);
        return loadLocalChatSessions();
    }
}

// Load chat history for a specific session
async function loadChatMessageHistory(chatId) {
    if (!chatId) return [];
    if (String(chatId).startsWith('local_')) {
        return loadLocalChatMessageHistory(chatId);
    }
    try {
        const q = query(
            collection(window.db, "chat_messages"),
            where("chatId", "==", chatId)
        );
        const querySnapshot = await getDocs(q);
        let messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        const now = Date.now();
        // Filter out expired messages and sort by createdAt ascending
        messages = messages
            .filter(msg => !msg.expiresAt || msg.expiresAt > now)
            .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            
        console.log(`📥 Loaded & filtered ${messages.length} Firestore messages for session ${chatId}`);
        return messages;
    } catch (error) {
        console.warn("Firestore error loading message history, falling back to Local Storage:", error);
        return loadLocalChatMessageHistory(chatId);
    }
}

// Save a message linked to a chatId
async function saveChatMessage(userId, message, role, chatId = null) {
    if (!userId || userId === 'guest' || userId === 'null' || userId === 'undefined') {
        return saveLocalChatMessage(message, role, chatId);
    }
    if (chatId && String(chatId).startsWith('local_')) {
        return saveLocalChatMessage(message, role, chatId);
    }
    
    try {
        const expiresAt = Date.now() + (currentRetentionDays * 24 * 60 * 60 * 1000);
        
        const docRef = await addDoc(collection(window.db, "chat_messages"), {
            userId: userId,
            message: message,
            role: role,
            chatId: chatId,
            createdAt: Date.now(),
            expiresAt: expiresAt,
            retentionDays: currentRetentionDays
        });
        
        console.log(`💾 Message saved to Firestore: ${docRef.id} (chatId: ${chatId})`);
        return docRef.id;
    } catch (error) {
        console.warn("Firestore error saving message, falling back to Local Storage:", error);
        return saveLocalChatMessage(message, role, chatId);
    }
}

// Load chat history (deprecated backward compatibility helper)
async function loadChatHistory(userId) {
    if (!userId || userId === 'guest' || userId === 'null' || userId === 'undefined') {
        return [];
    }
    
    try {
        const q = query(
            collection(window.db, "chat_messages"),
            where("userId", "==", userId)
        );
        
        const querySnapshot = await getDocs(q);
        let messages = [];
        querySnapshot.forEach((doc) => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        const now = Date.now();
        messages = messages
            .filter(msg => !msg.expiresAt || msg.expiresAt > now)
            .sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
            
        console.log(`📥 Loaded ${messages.length} messages`);
        return messages;
    } catch (error) {
        console.error("Error loading chat:", error);
        return [];
    }
}

// Delete a chat session and all its messages
async function deleteChatSession(chatId) {
    if (!chatId) return false;
    if (String(chatId).startsWith('local_')) {
        return deleteLocalChatSession(chatId);
    }
    try {
        // Delete the session document
        await deleteDoc(doc(window.db, "chat_sessions", chatId));
        
        // Delete all messages linked to this session
        const q = query(
            collection(window.db, "chat_messages"),
            where("chatId", "==", chatId)
        );
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(window.db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        console.log(`🗑️ Deleted session ${chatId} from Firestore`);
        return true;
    } catch (error) {
        console.warn("Firestore error deleting session, falling back to Local Storage deletion:", error);
        return deleteLocalChatSession(chatId);
    }
}

// Clean up old messages and sessions
async function cleanupOldMessages() {
    try {
        // Local storage cleanup
        const now = Date.now();
        let localSessions = JSON.parse(localStorage.getItem('local_chat_sessions') || '[]');
        localSessions = localSessions.filter(sess => sess.expiresAt > now);
        localStorage.setItem('local_chat_sessions', JSON.stringify(localSessions));

        let localMessages = JSON.parse(localStorage.getItem('local_chat_messages') || '[]');
        localMessages = localMessages.filter(msg => msg.expiresAt > now);
        localStorage.setItem('local_chat_messages', JSON.stringify(localMessages));
        console.log("🧹 Cleaned up expired local messages and sessions");

        // Firestore cleanup (if database exists)
        if (window.db) {
            const expiredQuery = query(
                collection(window.db, "chat_messages"),
                where("expiresAt", "<", Date.now())
            );
            const expired = await getDocs(expiredQuery);
            if (expired.size > 0) {
                const batch = writeBatch(window.db);
                expired.forEach(doc => {
                    batch.delete(doc.ref);
                });
                await batch.commit();
                console.log(`🧹 Cleaned up ${expired.size} old Firestore messages`);
            }

            const expiredSessionsQuery = query(
                collection(window.db, "chat_sessions"),
                where("expiresAt", "<", Date.now())
            );
            const expiredSessions = await getDocs(expiredSessionsQuery);
            if (expiredSessions.size > 0) {
                const batch = writeBatch(window.db);
                expiredSessions.forEach(doc => {
                    batch.delete(doc.ref);
                });
                await batch.commit();
                console.log(`🧹 Cleaned up ${expiredSessions.size} old Firestore sessions`);
            }
        }
    } catch (error) {
        console.error("Cleanup error:", error);
    }
}

// Run cleanup every 6 hours
setInterval(() => {
    cleanupOldMessages();
}, 6 * 60 * 60 * 1000);

// Export functions globally
window.saveChatMessage = saveChatMessage;
window.loadChatHistory = loadChatHistory;
window.cleanupOldMessages = cleanupOldMessages;
window.createChatSession = createChatSession;
window.loadChatSessions = loadChatSessions;
window.loadChatMessageHistory = loadChatMessageHistory;
window.deleteChatSession = deleteChatSession;
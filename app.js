import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyApejZmi2ZDYkZerMVB8XxUA3-M65J32r4",
    authDomain: "project-kaizen77.firebaseapp.com",
    projectId: "project-kaizen77",
    storageBucket: "project-kaizen77.firebasestorage.app",
    messagingSenderId: "1053498716108",
    appId: "1:1053498716108:web:59b5aa26f50f0ea7e1f769"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

async function signInWithGoogle() {
    // Check if running on a supported protocol
    if (window.location.protocol === 'file:') {
        alert('Google Sign-In does not work when opening the HTML file directly. Please serve the app via a local web server (e.g., using Live Server) or deploy it to a web host.');
        console.error('File protocol detected. Firebase Auth requires HTTP/HTTPS.');
        return;
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Running on localhost, Firebase Auth should work if localhost is authorized.');
    }
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log("Google Sign-In user:", user);
        alert(`Welcome, ${user.displayName}`);
        window.dispatchEvent(new CustomEvent("google-signin-success", { detail: user }));
    } catch (error) {
        console.error("Google Sign-In error:", error);
        const code = error?.code || "unknown";
        const message = error?.message || "No details";
        console.error('Full error:', error);
        if (code === "auth/unauthorized-domain") {
            alert(`Login failed: unauthorized domain. Add "${window.location.origin}" to Firebase Auth > Settings > Authorized domains.`);
            return;
        }
        if (code === "auth/operation-not-allowed") {
            alert("Login failed: Google Sign-In is disabled. Enable Google provider in Firebase Auth > Sign-in method.");
            return;
        }
        if (code === "auth/popup-blocked") {
            alert("Login popup was blocked by your browser. Please allow popups for this site and try again.");
            return;
        }
        if (code === "auth/popup-closed-by-user") {
            alert("You closed the login popup. Please try again.");
            return;
        }
        alert(`Login failed (${code}): ${message}`);
    }
}

window.signInWithGoogle = signInWithGoogle;

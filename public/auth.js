import { auth } from './fireBaseConfig.js';
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Function to sign in with Google
export function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Google sign-in successful
            console.log("Google sign-in successful:", result.user.displayName);
            alert(`Welcome, ${result.user.displayName}! You are now logged in. Redirecting...`);
            handleAuthStateChange(result.user);
            // Redirect user to index.html after successful sign-in
            setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
            
        })
        .catch((error) => {
            // Handle errors
            const code = 2;
            error = code;
            console.error("Google sign-in error:", 'Error Logging in', error);
        });
}

// Function to sign out
export function logOut() {
    auth.signOut();
}

// Listener for authentication state changes
function handleAuthStateChange(user) {
    if (window.location.pathname !== '/login.html') {
        const loginButton = document.getElementById('login-btn');
        if (user) {
            const profilePic = user.photoURL;
            loginButton.innerHTML = `<img src="${profilePic}" alt="Profile Picture">`;
            loginButton.href = "profile.html"; // Link to profile page
            loginButton.textContent = "Log out"; // Change button text to "Log out"
            loginButton.addEventListener('click', logOut); // Add event listener for log out
        } else {
            loginButton.textContent = "Login"; // Change back to "Login" text
            loginButton.href = "login.html"; // Link to login page
        }
    }
}
